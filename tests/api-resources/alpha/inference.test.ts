// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';
import { Response } from 'node-fetch';

const client = new LlamaStackClient({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource inference', () => {
  test('rerank: only required params', async () => {
    const responsePromise = client.alpha.inference.rerank({
      items: ['string'],
      model: 'model',
      query: 'string',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('rerank: required and optional params', async () => {
    const response = await client.alpha.inference.rerank({
      items: ['string'],
      model: 'model',
      query: 'string',
      max_num_results: 0,
    });
  });
});
