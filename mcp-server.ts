import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from "node:http";
import { z } from "zod";

const A2A_ENDPOINT =
  process.env.PO_A2A_ENDPOINT ??
  "https://app.promptopinion.ai/api/workspaces/019e121f-dfbd-77ac-82ea-0fba5d62101e/ai-agents/019e124e-b788-709d-8982-59b193701561/a2a-http-json";

const API_KEY = process.env.PO_API_KEY ?? "";

async function callA2A(prompt: string): Promise<string> {
  const response = await fetch(A2A_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "message/send",
      id: crypto.randomUUID(),
      params: {
        message: {
          kind: "message",
          messageId: crypto.randomUUID(),
          role: "user",
          parts: [{ kind: "text", text: prompt }],
        },
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`A2A API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const textPart = data?.result?.artifacts?.[0]?.parts?.find(
    (p: { kind: string }) => p.kind === "text"
  );

  if (textPart?.text) return textPart.text;
  return JSON.stringify(data);
}

function registerTools(server: McpServer) {
  server.tool(
    "generate_discharge_plan",
    "Generate a discharge transition plan for a patient. Provide patient details such as diagnosis, medications, labs, and social context.",
    {
      patient_info: z.string().describe("Patient clinical information: diagnosis, medications, labs, social situation, etc."),
    },
    async ({ patient_info }) => {
      const prompt = `Generate discharge transition plan for the following patient:\n\n${patient_info}`;
      const result = await callA2A(prompt);
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
      const prompt = `Analyze readmission risk factors and provide preventive recommendations for:\n\n${patient_info}`;
      const result = await callA2A(prompt);
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
      const prompt = `Generate simple, patient-friendly education materials about: ${condition}.${langNote} Include warning signs, daily care tasks, and when to seek emergency help.`;
      const result = await callA2A(prompt);
      return { content: [{ type: "text" as const, text: result }] };
    }
  );
}

const mode = process.argv[2];

if (mode === "--http") {
  const PORT = parseInt(process.env.MCP_PORT ?? "3001", 10);

  const httpServer = createServer(async (req, res) => {
    if (req.url !== "/mcp") {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    const server = new McpServer({
      name: "discharge-guardian",
      version: "1.0.0",
    });
    registerTools(server);

    await server.connect(transport);

    try {
      await transport.handleRequest(req, res);
    } finally {
      await server.close();
      await transport.close();
    }
  });

  httpServer.listen(PORT, () => {
    console.log(`MCP HTTP server running at http://localhost:${PORT}/mcp`);
  });
} else {
  const server = new McpServer({
    name: "discharge-guardian",
    version: "1.0.0",
  });
  registerTools(server);

  const transport = new StdioServerTransport();
  server.connect(transport).catch(console.error);
}
