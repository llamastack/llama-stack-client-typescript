// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';
import { Response } from 'node-fetch';

const client = new LlamaStackClient({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource vectorIo', () => {
  test('insert: only required params', async () => {
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

  test('insert: required and optional params', async () => {
    const response = await client.vectorIo.insert({
      chunks: [
        {
          content: 'string',
          metadata: { foo: true },
          chunk_metadata: {
            chunk_embedding_dimension: 0,
            chunk_embedding_model: 'chunk_embedding_model',
            chunk_id: 'chunk_id',
            chunk_tokenizer: 'chunk_tokenizer',
            chunk_window: 'chunk_window',
            content_token_count: 0,
            created_timestamp: 0,
            document_id: 'document_id',
            metadata_token_count: 0,
            source: 'source',
            updated_timestamp: 0,
          },
          embedding: [0],
          stored_chunk_id: 'stored_chunk_id',
        },
      ],
      vector_db_id: 'vector_db_id',
      ttl_seconds: 0,
    });
  });

  test('query: only required params', async () => {
    const responsePromise = client.vectorIo.query({ query: 'string', vector_db_id: 'vector_db_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('query: required and optional params', async () => {
    const response = await client.vectorIo.query({
      query: 'string',
      vector_db_id: 'vector_db_id',
      params: { foo: true },
    });
  });
});
