import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { callGemini } from "./gemini";

export interface FhirContext {
  serverUrl?: string;
  accessToken?: string;
  patientId?: string;
}

async function fetchFhirPatientSummary(ctx: FhirContext): Promise<string> {
  if (!ctx.serverUrl || !ctx.accessToken || !ctx.patientId) return "";

  try {
    const patientRes = await fetch(`${ctx.serverUrl}/Patient/${ctx.patientId}`, {
      headers: { Authorization: `Bearer ${ctx.accessToken}`, Accept: "application/fhir+json" },
    });
    if (!patientRes.ok) return "";
    const patient = await patientRes.json();

    const conditionsRes = await fetch(
      `${ctx.serverUrl}/Condition?patient=${ctx.patientId}&_sort=-date&_count=10`,
      { headers: { Authorization: `Bearer ${ctx.accessToken}`, Accept: "application/fhir+json" } }
    );
    const conditions = conditionsRes.ok ? await conditionsRes.json() : null;

    const medsRes = await fetch(
      `${ctx.serverUrl}/MedicationRequest?patient=${ctx.patientId}&status=active`,
      { headers: { Authorization: `Bearer ${ctx.accessToken}`, Accept: "application/fhir+json" } }
    );
    const meds = medsRes.ok ? await medsRes.json() : null;

    const labsRes = await fetch(
      `${ctx.serverUrl}/Observation?patient=${ctx.patientId}&category=laboratory&_sort=-date&_count=10`,
      { headers: { Authorization: `Bearer ${ctx.accessToken}`, Accept: "application/fhir+json" } }
    );
    const labs = labsRes.ok ? await labsRes.json() : null;

    return [
      `FHIR Patient: ${JSON.stringify(patient)}`,
      conditions ? `Conditions: ${JSON.stringify(conditions)}` : "",
      meds ? `Active Medications: ${JSON.stringify(meds)}` : "",
      labs ? `Recent Labs: ${JSON.stringify(labs)}` : "",
    ].filter(Boolean).join("\n\n");
  } catch {
    return "";
  }
}

export function createMcpServer(fhirContext?: FhirContext): McpServer {
  const server = new McpServer({
    name: "discharge-guardian",
    version: "1.0.0",
    extensions: {
      "ai.promptopinion/fhir-context": {
        scopes: [
          { name: "patient/Patient.read", required: true },
          { name: "patient/Condition.read", required: true },
          { name: "patient/MedicationRequest.read", required: true },
          { name: "patient/Observation.read", required: false },
          { name: "patient/AllergyIntolerance.read", required: false },
        ],
      },
    },
  });

  server.tool(
    "generate_discharge_plan",
    "Generate a discharge transition plan for a patient. Provide patient details or let the system use FHIR context automatically.",
    {
      patient_info: z.string().optional().describe("Patient clinical information. If empty, FHIR context will be used."),
    },
    async ({ patient_info }) => {
      let context = patient_info ?? "";
      if (fhirContext?.patientId) {
        const fhirData = await fetchFhirPatientSummary(fhirContext);
        if (fhirData) context = `${context}\n\n--- FHIR EHR Data ---\n${fhirData}`;
      }
      if (!context.trim()) {
        return { content: [{ type: "text" as const, text: "No patient information provided and no FHIR context available." }] };
      }
      const result = await callGemini(`Generate discharge transition plan for the following patient:\n\n${context}`);
      return { content: [{ type: "text" as const, text: result }] };
    }
  );

  server.tool(
    "analyze_readmission_risk",
    "Analyze readmission risk factors for a patient based on their clinical profile or FHIR context.",
    {
      patient_info: z.string().optional().describe("Patient clinical information. If empty, FHIR context will be used."),
    },
    async ({ patient_info }) => {
      let context = patient_info ?? "";
      if (fhirContext?.patientId) {
        const fhirData = await fetchFhirPatientSummary(fhirContext);
        if (fhirData) context = `${context}\n\n--- FHIR EHR Data ---\n${fhirData}`;
      }
      const result = await callGemini(`Analyze readmission risk factors and provide preventive recommendations for:\n\n${context}`);
      return { content: [{ type: "text" as const, text: result }] };
    }
  );

  server.tool(
    "generate_patient_education",
    "Generate patient-friendly education materials for their condition and care plan.",
    {
      condition: z.string().describe("Patient's primary condition/diagnosis"),
      language: z.enum(["en", "tr"]).default("en").describe("Language for the education material"),
    },
    async ({ condition, language }) => {
      const langNote = language === "tr" ? " Respond in Turkish." : "";
      const result = await callGemini(
        `Generate simple, patient-friendly education materials about: ${condition}.${langNote} Include warning signs, daily care tasks, and when to seek emergency help.`
      );
      return { content: [{ type: "text" as const, text: result }] };
    }
  );

  return server;
}
