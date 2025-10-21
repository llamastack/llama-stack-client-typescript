// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';
import { Response } from 'node-fetch';

const client = new LlamaStackClient({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource ragTool', () => {
  test('insert: only required params', async () => {
    const responsePromise = client.toolRuntime.ragTool.insert({
      chunk_size_in_tokens: 0,
      documents: [{ content: 'string', document_id: 'document_id', metadata: { foo: true } }],
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

  test('insert: required and optional params', async () => {
    const response = await client.toolRuntime.ragTool.insert({
      chunk_size_in_tokens: 0,
      documents: [
        { content: 'string', document_id: 'document_id', metadata: { foo: true }, mime_type: 'mime_type' },
      ],
      vector_db_id: 'vector_db_id',
    });
  });

  test('query: only required params', async () => {
    const responsePromise = client.toolRuntime.ragTool.query({
      content: 'string',
      vector_db_ids: ['string'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('query: required and optional params', async () => {
    const response = await client.toolRuntime.ragTool.query({
      content: 'string',
      vector_db_ids: ['string'],
      query_config: {
        chunk_template: 'chunk_template',
        max_chunks: 0,
        max_tokens_in_context: 0,
        query_generator_config: { separator: 'separator', type: 'default' },
        mode: 'vector',
        ranker: { impact_factor: 0, type: 'rrf' },
      },
    });
  });
});
