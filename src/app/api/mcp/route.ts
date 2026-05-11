import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { createMcpServer } from "@/lib/mcp-server";
import { NextRequest, NextResponse } from "next/server";

const MCP_API_KEY = process.env.MCP_API_KEY ?? "";

function authenticateRequest(req: NextRequest): boolean {
  if (!MCP_API_KEY) return true;
  const key = req.headers.get("x-api-key");
  return key === MCP_API_KEY;
}

async function handleMcpRequest(req: NextRequest): Promise<Response> {
  if (!authenticateRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fhirContext = {
    serverUrl: req.headers.get("x-fhir-server-url") ?? undefined,
    accessToken: req.headers.get("x-fhir-access-token") ?? undefined,
    patientId: req.headers.get("x-patient-id") ?? undefined,
  };

  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  const server = createMcpServer(fhirContext);
  await server.connect(transport);

  try {
    return await transport.handleRequest(req);
  } finally {
    await server.close();
    await transport.close();
  }
}

export async function GET(req: NextRequest) {
  return handleMcpRequest(req);
}

export async function POST(req: NextRequest) {
  return handleMcpRequest(req);
}

export async function DELETE(req: NextRequest) {
  return handleMcpRequest(req);
}
