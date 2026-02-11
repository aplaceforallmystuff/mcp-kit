import { describe, it, expect } from "vitest";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { KitClient } from "../kit-client.js";

describe("KitClient", () => {
  it("instantiates with an API key", () => {
    const client = new KitClient({ apiKey: "test-key" });
    expect(client).toBeDefined();
  });
});

describe("McpServer", () => {
  it("creates a server instance", () => {
    const server = new McpServer({
      name: "mcp-kit",
      version: "1.0.0",
    });
    expect(server).toBeDefined();
  });

  it("registers tools via .tool()", () => {
    const server = new McpServer({
      name: "mcp-kit",
      version: "1.0.0",
    });

    // Verify tool registration doesn't throw
    expect(() => {
      server.tool("test_tool", "A test tool", {}, async () => ({
        content: [{ type: "text" as const, text: "ok" }],
      }));
    }).not.toThrow();
  });
});

describe("formatResponse pattern", () => {
  function formatResponse(data: unknown) {
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }

  it("wraps data in MCP content format", () => {
    const result = formatResponse({ foo: "bar" });
    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe("text");
    expect(JSON.parse(result.content[0].text)).toEqual({ foo: "bar" });
  });

  it("handles arrays", () => {
    const result = formatResponse([1, 2, 3]);
    expect(JSON.parse(result.content[0].text)).toEqual([1, 2, 3]);
  });

  it("handles null", () => {
    const result = formatResponse(null);
    expect(result.content[0].text).toBe("null");
  });
});
