import { ToolRegistry } from './core/ToolRegistry.js';
import { McpApplication } from './core/McpApplication.js';
import { PublicApiService } from './services/PublicApiService.js';
import { PublicTopicTool } from './tools/PublicTopicTool.js';

/**
 * Composition root: assemble approved services without starting a server.
 * @param {typeof fetch} fetchClient Explicit fixture transport.
 * @param {{timeoutMs?: number, maxBytes?: number}} [limits] Adapter limits.
 * @returns {McpApplication} Portable, request-independent application.
 */
export function createApplication(fetchClient, limits) {
  const service = new PublicApiService(fetchClient, limits);
  return new McpApplication(new ToolRegistry([new PublicTopicTool(service)]));
}
