/** Owns static tool definitions. No mutable per-user or request state. */
export class ToolRegistry {
  #tools = new Map();

  /** @param {Iterable<object>} tools Approved tool implementations. */
  constructor(tools) {
    for (const tool of tools) {
      if (typeof tool.name !== 'string' || this.#tools.has(tool.name) ||
          typeof tool.parseInput !== 'function' || typeof tool.parseOutput !== 'function' ||
          typeof tool.execute !== 'function') {
        throw new Error('Invalid or duplicate tool definition.');
      }
      this.#tools.set(tool.name, tool);
    }
  }

  /** @param {string} name Semantic tool identifier. @returns {object|undefined} */
  get(name) { return this.#tools.get(name); }

  /** @returns {object[]} Discovery metadata copies; callers cannot mutate definitions. */
  list() { return [...this.#tools.values()].map(tool => structuredClone(tool.definition)); }
}
