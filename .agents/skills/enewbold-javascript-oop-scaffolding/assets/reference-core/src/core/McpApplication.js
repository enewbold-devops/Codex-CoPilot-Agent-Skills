import { ApplicationError } from './ApplicationError.js';

/** Executes semantic tools independently of the HTTP/MCP transport. */
export class McpApplication {
  #registry;

  /** @param {import('./ToolRegistry.js').ToolRegistry} registry Approved tool registry. */
  constructor(registry) { this.#registry = registry; }

  /** @returns {object[]} Approved tool metadata. */
  listTools() { return this.#registry.list(); }

  /**
   * Validate both trust boundaries and normalize public errors.
   * @param {string} name Semantic tool identifier.
   * @param {unknown} input Untrusted tool arguments.
   * @returns {Promise<object>} Success data or safe error; no persistent request state.
   */
  async execute(name, input) {
    try {
      const tool = this.#registry.get(name);
      if (!tool) throw new ApplicationError('UNKNOWN_TOOL');
      const validated = tool.parseInput(input);
      const raw = await tool.execute(validated);
      return { ok: true, data: tool.parseOutput(raw) };
    } catch (error) {
      const safe = error instanceof ApplicationError ? error : new ApplicationError('INTERNAL_ERROR');
      return { ok: false, error: safe.toResult() };
    }
  }
}
