// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';
import { Response } from 'node-fetch';

const client = new LlamaStackClient({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource syntheticDataGeneration', () => {
  test('generate: only required params', async () => {
    const responsePromise = client.syntheticDataGeneration.generate({
      dialogs: [{ content: 'string', role: 'user' }],
      filtering_function: 'none',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('generate: required and optional params', async () => {
    const response = await client.syntheticDataGeneration.generate({
      dialogs: [{ content: 'string', role: 'user', context: 'string' }],
      filtering_function: 'none',
      model: 'model',
    });
  });
});
