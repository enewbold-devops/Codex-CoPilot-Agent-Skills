import test from 'node:test';
import assert from 'node:assert/strict';
import { createApplication } from '../src/createApplication.js';
import { RuntimeAdapter } from '../src/adapters/RuntimeAdapter.js';
import { ToolRegistry } from '../src/core/ToolRegistry.js';
import { PublicTopicTool } from '../src/tools/PublicTopicTool.js';

const tool = 'get_public_topic';
const fixture = async (url, options) => {
  assert.equal(url.origin, 'https://example.invalid');
  assert.equal(url.pathname, '/topics');
  assert.equal(options.method, 'GET');
  assert.equal(options.redirect, 'error');
  return Response.json({ topicId: url.searchParams.get('id'), title: 'Fixture topic', secret: 'never return' });
};
const call = (app, topicId = 'topic_123') => app.execute(tool, { topicId });
const errorCode = (result, code) => assert.equal(result.error?.code, code);

test('valid input returns only approved fields and provenance', async () => {
  assert.deepEqual(await call(createApplication(fixture)), {
    ok: true, data: { topicId: 'topic_123', title: 'Fixture topic', source: 'synthetic-fixture' }
  });
});
test('invalid input, arbitrary URLs and extra fields are rejected before fetch', async () => {
  let calls = 0;
  const app = createApplication(async () => { calls++; throw Error('unexpected'); });
  for (const input of [{ topicId: 'https://private.invalid' }, { topicId: 'x', url: 'https://private.invalid' },
    { topicId: '../x' }, { topicId: 'x'.repeat(81) }, {}, null, []]) {
    errorCode(await app.execute(tool, input), 'INVALID_INPUT');
  }
  errorCode(await app.execute('unapproved_tool', {}), 'UNKNOWN_TOOL');
  assert.equal(calls, 0);
});
test('concurrent calls carry independent inputs', async () => {
  const app = createApplication(fixture);
  const ids = ['a', 'b', 'c', 'd'];
  const results = await Promise.all(ids.map(id => call(app, id)));
  assert.deepEqual(results.map(result => result.data.topicId), ids);
});
test('404, 429, 503 and redirects are normalized', async () => {
  for (const [status, code] of [[404, 'NOT_FOUND'], [429, 'RATE_LIMITED'], [503, 'UPSTREAM_FAILURE'], [302, 'INVALID_UPSTREAM']]) {
    errorCode(await call(createApplication(async () => new Response(null, { status }))), code);
  }
});
test('reject malformed content type, JSON, mismatched ID and invalid output', async () => {
  for (const response of [new Response('text'), new Response('{', { headers: { 'content-type': 'application/json' } }),
    Response.json({ topicId: 'other', title: 'Valid' }), Response.json({ topicId: 'topic_123', title: 'x'.repeat(201) })]) {
    errorCode(await call(createApplication(async () => response)), 'INVALID_UPSTREAM');
  }
});
test('enforce byte bound without relying on content-length', async () => {
  const response = Response.json({ topicId: 'topic_123', title: 'a'.repeat(200) });
  errorCode(await call(createApplication(async () => response, { maxBytes: 32 })), 'INVALID_UPSTREAM');
});
test('network exceptions do not leak credentials', async () => {
  const result = await call(createApplication(async () => { throw new Error('private-key'); }));
  errorCode(result, 'UPSTREAM_FAILURE');
  assert.equal(JSON.stringify(result).includes('private-key'), false);
});
test('timeout is normalized when transport honors cancellation', async () => {
  const app = createApplication(async (_url, { signal }) => new Promise((_, reject) => {
    const timer = setTimeout(() => reject(Error('fixture deadline')), 500);
    signal.addEventListener('abort', () => { clearTimeout(timer); reject(signal.reason); }, { once: true });
  }), { timeoutMs: 10 });
  errorCode(await call(app), 'UPSTREAM_TIMEOUT');
});
test('registry rejects duplicates and discovery returns copies', () => {
  const t = new PublicTopicTool({});
  assert.throws(() => new ToolRegistry([t, t]));
  const app = createApplication(fixture);
  app.listTools()[0].name = 'changed';
  assert.equal(app.listTools()[0].name, tool);
});
test('runtime adapter delegates only the MCP path to a stub transport', async () => {
  let calls = 0;
  const adapter = new RuntimeAdapter({ fetch: async () => { calls++; return new Response('stub'); } });
  assert.equal((await adapter.fetch(new Request('https://example.invalid/health'))).status, 200);
  assert.equal((await adapter.fetch(new Request('https://example.invalid/other'))).status, 404);
  assert.equal(await (await adapter.fetch(new Request('https://example.invalid/mcp'))).text(), 'stub');
  assert.equal(calls, 1);
  assert.throws(() => new RuntimeAdapter({}));
});
test('composition requires explicit fetch injection', () => assert.throws(() => createApplication()));
