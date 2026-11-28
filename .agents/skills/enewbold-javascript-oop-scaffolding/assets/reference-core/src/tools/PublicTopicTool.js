import { ApplicationError } from '../core/ApplicationError.js';

/** The semantic tool owns its input/output contract and approved operation mapping. */
export class PublicTopicTool {
  #service;
  name = 'get_public_topic';

  /** @param {import('../services/PublicApiService.js').PublicApiService} service */
  constructor(service) { this.#service = service; }

  /** @returns {object} Transport-neutral discovery metadata; fixture contract v1. */
  get definition() {
    return {
      name: this.name, version: '1.0.0', description: 'Retrieve a synthetic public topic by ID.',
      inputSchema: { type: 'object', additionalProperties: false, required: ['topicId'],
        properties: { topicId: { type: 'string', pattern: '^[a-zA-Z0-9_-]{1,80}$' } } },
      outputSchema: { type: 'object', additionalProperties: false, required: ['topicId', 'title', 'source'],
        properties: { topicId: { type: 'string', pattern: '^[a-zA-Z0-9_-]{1,80}$' },
          title: { type: 'string', minLength: 1, maxLength: 200 }, source: { const: 'synthetic-fixture' } } },
      annotations: { readOnlyHint: true }
    };
  }

  /** @param {unknown} input Untrusted caller data. @returns {{topicId: string}} */
  parseInput(input) {
    if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length !== 1 ||
        !Object.hasOwn(input, 'topicId') || typeof input.topicId !== 'string' ||
        !/^[a-zA-Z0-9_-]{1,80}$/.test(input.topicId)) throw new ApplicationError('INVALID_INPUT');
    return { topicId: input.topicId };
  }

  /** @param {{topicId: string}} input Validated input. @returns {Promise<object>} */
  async execute({ topicId }) {
    const raw = await this.#service.getTopic(topicId);
    if (!raw || typeof raw !== 'object' || Array.isArray(raw) || raw.topicId !== topicId ||
        typeof raw.title !== 'string') throw new ApplicationError('INVALID_UPSTREAM');
    // Select approved fields only; ignore untrusted upstream instructions and extra data.
    return { topicId, title: raw.title, source: 'synthetic-fixture' };
  }

  /** @param {unknown} value Candidate output. @returns {object} Validated result. */
  parseOutput(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).length !== 3 ||
        !Object.hasOwn(value, 'topicId') || !Object.hasOwn(value, 'title') || !Object.hasOwn(value, 'source') ||
        typeof value.topicId !== 'string' || !/^[a-zA-Z0-9_-]{1,80}$/.test(value.topicId) ||
        typeof value.title !== 'string' || [...value.title].length < 1 || [...value.title].length > 200 ||
        value.source !== 'synthetic-fixture') throw new ApplicationError('INVALID_UPSTREAM');
    return { topicId: value.topicId, title: value.title, source: value.source };
  }
}
