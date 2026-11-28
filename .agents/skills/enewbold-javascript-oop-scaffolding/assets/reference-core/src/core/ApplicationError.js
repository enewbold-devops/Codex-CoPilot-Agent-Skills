/** Safe public errors; never serialize upstream exceptions or raw responses. */
export class ApplicationError extends Error {
  static #messages = Object.freeze({
    INVALID_INPUT: 'Invalid tool input.',
    UNKNOWN_TOOL: 'Unknown tool.',
    NOT_FOUND: 'No matching topic.',
    RATE_LIMITED: 'The upstream service is rate limited.',
    UPSTREAM_TIMEOUT: 'The upstream request timed out.',
    UPSTREAM_FAILURE: 'The upstream service is unavailable.',
    INVALID_UPSTREAM: 'The upstream response did not satisfy the contract.',
    INTERNAL_ERROR: 'The operation could not be completed.'
  });

  /** @param {string} code A stable, approved public error code. */
  constructor(code) {
    const safeCode = Object.hasOwn(ApplicationError.#messages, code) ? code : 'INTERNAL_ERROR';
    super(ApplicationError.#messages[safeCode]);
    this.code = safeCode;
  }

  /** @returns {{code: string, message: string}} Safe structured error. */
  toResult() { return { code: this.code, message: this.message }; }
}
