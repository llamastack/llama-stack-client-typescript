// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';

const client = new LlamaStackClient({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource vectorIo', () => {
  // skipped: tests are disabled for the time being
  test.skip('insert: only required params', async () => {
    const responsePromise = client.vectorIo.insert({
      chunks: [{ content: 'string', metadata: { foo: true } }],
      vector_db_id: 'vector_db_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('insert: required and optional params', async () => {
    const response = await client.vectorIo.insert({
      chunks: [{ content: 'string', metadata: { foo: true } }],
      vector_db_id: 'vector_db_id',
      ttl_seconds: 0,
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('query: only required params', async () => {
    const responsePromise = client.vectorIo.query({ query: 'string', vector_db_id: 'vector_db_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('query: required and optional params', async () => {
    const response = await client.vectorIo.query({
      query: 'string',
      vector_db_id: 'vector_db_id',
      params: { foo: true },
    });
  });
});
