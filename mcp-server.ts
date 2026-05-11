import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from "node:http";
import { createMcpServer } from "./src/lib/mcp-server.js";

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

    const server = createMcpServer();
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
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  server.connect(transport).catch(console.error);
}
