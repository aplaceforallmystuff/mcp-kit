#!/usr/bin/env node

/**
 * Kit.com MCP Server (Broadcasts Only)
 * Provides MCP tools for managing Kit.com broadcasts
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { KitClient } from "./kit-client.js";

// Get API key from environment
const apiKey = process.env.KIT_API_KEY;
if (!apiKey) {
  console.error("Error: KIT_API_KEY environment variable is required");
  process.exit(1);
}

const client = new KitClient({ apiKey });

const server = new McpServer({
  name: "mcp-kit",
  version: "1.0.0",
});

// Helper to format responses
function formatResponse(data: unknown): { content: Array<{ type: "text"; text: string }> } {
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

function formatError(error: unknown): { content: Array<{ type: "text"; text: string }>; isError: true } {
  return {
    content: [
      {
        type: "text" as const,
        text: `Error: ${error instanceof Error ? error.message : String(error)}`,
      },
    ],
    isError: true,
  };
}

// ==================== BROADCASTS ====================

server.tool(
  "kit_list_broadcasts",
  "List all broadcasts (email campaigns) in Kit.com",
  {
    per_page: z.number().optional().describe("Number of results per page"),
    after: z.string().optional().describe("Cursor for pagination"),
  },
  async (params) => {
    try {
      const result = await client.listBroadcasts(params);
      return formatResponse(result);
    } catch (error) {
      return formatError(error);
    }
  }
);

server.tool(
  "kit_get_broadcast",
  "Get a specific broadcast by ID",
  {
    broadcast_id: z.string().describe("The broadcast ID"),
  },
  async ({ broadcast_id }) => {
    try {
      const result = await client.getBroadcast(broadcast_id);
      return formatResponse(result);
    } catch (error) {
      return formatError(error);
    }
  }
);

server.tool(
  "kit_create_broadcast",
  "Create a new broadcast (email campaign) in Kit.com",
  {
    subject: z.string().describe("The email subject line"),
    content: z.string().optional().describe("The email content (HTML supported)"),
    description: z.string().optional().describe("Internal description for the broadcast"),
    public: z.boolean().optional().describe("Whether the broadcast should be public"),
    preview_text: z.string().optional().describe("Preview text shown in email clients"),
    send_at: z.string().optional().describe("ISO date when to send the broadcast"),
  },
  async (params) => {
    try {
      const result = await client.createBroadcast(params);
      return formatResponse(result);
    } catch (error) {
      return formatError(error);
    }
  }
);

server.tool(
  "kit_update_broadcast",
  "Update an existing broadcast",
  {
    broadcast_id: z.string().describe("The broadcast ID to update"),
    subject: z.string().optional().describe("New subject line"),
    content: z.string().optional().describe("New content"),
    description: z.string().optional().describe("New description"),
    public: z.boolean().optional().describe("Whether the broadcast should be public"),
    preview_text: z.string().optional().describe("New preview text"),
    send_at: z.string().optional().describe("New send time (ISO date)"),
  },
  async ({ broadcast_id, ...data }) => {
    try {
      const result = await client.updateBroadcast(broadcast_id, data);
      return formatResponse(result);
    } catch (error) {
      return formatError(error);
    }
  }
);

server.tool(
  "kit_delete_broadcast",
  "Delete a broadcast from Kit.com",
  {
    broadcast_id: z.string().describe("The broadcast ID to delete"),
  },
  async ({ broadcast_id }) => {
    try {
      await client.deleteBroadcast(broadcast_id);
      return formatResponse({ success: true, message: "Broadcast deleted" });
    } catch (error) {
      return formatError(error);
    }
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Kit.com MCP server started (broadcasts only)");
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
