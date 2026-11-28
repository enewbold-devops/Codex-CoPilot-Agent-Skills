import { ApplicationError } from '../core/ApplicationError.js';

/** Fixture-only reference adapter for one approved public read operation. */
export class PublicApiService {
  #fetch;
  #timeoutMs;
  #maxBytes;

  /**
   * Require explicit fetch injection: no accidental live network access.
   * @param {typeof fetch} fetchClient Injected fixture transport.
   * @param {{timeoutMs?: number, maxBytes?: number}} [limits] Bounded request limits.
   */
  constructor(fetchClient, { timeoutMs = 3000, maxBytes = 16384 } = {}) {
    if (typeof fetchClient !== 'function' || !Number.isSafeInteger(timeoutMs) || timeoutMs < 1 ||
        !Number.isSafeInteger(maxBytes) || maxBytes < 1) throw new Error('Invalid adapter configuration.');
    this.#fetch = fetchClient;
    this.#timeoutMs = timeoutMs;
    this.#maxBytes = maxBytes;
  }

  /**
   * Read one public topic. The caller cannot control origin, path or method.
   * @param {string} topicId Validated public topic identifier.
   * @returns {Promise<unknown>} Bounded upstream JSON; caller validates its schema.
   */
  async getTopic(topicId) {
    if (typeof topicId !== 'string' || !/^[a-zA-Z0-9_-]{1,80}$/.test(topicId)) {
      throw new ApplicationError('INVALID_INPUT');
    }
    const url = new URL('https://example.invalid/topics');
    url.searchParams.set('id', topicId);
    const signal = AbortSignal.timeout(this.#timeoutMs);
    let response;
    try {
      response = await this.#fetch(url, {
        method: 'GET', redirect: 'error', signal, headers: { Accept: 'application/json' }
      });
      if (response.redirected || (response.status >= 300 && response.status < 400)) {
        throw new ApplicationError('INVALID_UPSTREAM');
      }
      if (response.status === 404) throw new ApplicationError('NOT_FOUND');
      if (response.status === 429) throw new ApplicationError('RATE_LIMITED');
      if (!response.ok) throw new ApplicationError('UPSTREAM_FAILURE');
      const type = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
      if (type !== 'application/json' || !response.body) throw new ApplicationError('INVALID_UPSTREAM');
      const declared = response.headers.get('content-length');
      if (declared !== null && Number(declared) > this.#maxBytes) throw new ApplicationError('INVALID_UPSTREAM');
      const reader = response.body.getReader();
      const chunks = [];
      let size = 0;
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          size += value.byteLength;
          if (size > this.#maxBytes) throw new ApplicationError('INVALID_UPSTREAM');
          chunks.push(value);
        }
      } finally {
        // Do not await cancellation on an untrusted upstream stream.
        void reader.cancel().catch(() => {});
        reader.releaseLock();
      }
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
      try { return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)); }
      catch { throw new ApplicationError('INVALID_UPSTREAM'); }
    } catch (error) {
      if (error instanceof ApplicationError) throw error;
      throw new ApplicationError(signal.aborted ? 'UPSTREAM_TIMEOUT' : 'UPSTREAM_FAILURE');
    } finally {
      if (response?.body && !response.body.locked) void response.body.cancel().catch(() => {});
    }
  }
}
