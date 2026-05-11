import { NextRequest, NextResponse } from "next/server";

const A2A_ENDPOINT =
  process.env.PO_A2A_ENDPOINT ??
  "https://app.promptopinion.ai/api/workspaces/019e121f-dfbd-77ac-82ea-0fba5d62101e/ai-agents/019e124e-b788-709d-8982-59b193701561/a2a-http-json";

const API_KEY = process.env.PO_API_KEY ?? "";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

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
            parts: [
              {
                kind: "text",
                text: prompt,
              },
            ],
          },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to reach Prompt Opinion API" },
      { status: 500 }
    );
  }
}
