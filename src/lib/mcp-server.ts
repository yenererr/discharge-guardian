import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { callGemini } from "./gemini.js";

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "discharge-guardian",
    version: "1.0.0",
  });

  server.tool(
    "generate_discharge_plan",
    "Generate a discharge transition plan for a patient. Provide patient details such as diagnosis, medications, labs, and social context.",
    {
      patient_info: z.string().describe("Patient clinical information: diagnosis, medications, labs, social situation, etc."),
    },
    async ({ patient_info }) => {
      const result = await callGemini(
        `Generate discharge transition plan for the following patient:\n\n${patient_info}`
      );
      return { content: [{ type: "text" as const, text: result }] };
    }
  );

  server.tool(
    "analyze_readmission_risk",
    "Analyze readmission risk factors for a patient based on their clinical profile.",
    {
      patient_info: z.string().describe("Patient clinical information to assess readmission risk"),
    },
    async ({ patient_info }) => {
      const result = await callGemini(
        `Analyze readmission risk factors and provide preventive recommendations for:\n\n${patient_info}`
      );
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
