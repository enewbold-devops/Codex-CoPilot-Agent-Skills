/** Routes Web-standard requests to an injected, verified MCP SDK handler. */
export class RuntimeAdapter {
  #handler;

  /** @param {{fetch: (request: Request) => Promise<Response>}} handler SDK transport. */
  constructor(handler) {
    if (typeof handler?.fetch !== 'function') throw new Error('MCP transport required.');
    this.#handler = handler;
  }

  /** @param {Request} request Incoming request. @returns {Promise<Response>} */
  async fetch(request) {
    const path = new URL(request.url).pathname;
    if (path === '/health' && request.method === 'GET') return Response.json({ status: 'reference-core' });
    if (path !== '/mcp') return new Response('Not found', { status: 404 });
    // Actual host must enforce origin, request size, quota and other release gates.
    return this.#handler.fetch(request);
  }
}
