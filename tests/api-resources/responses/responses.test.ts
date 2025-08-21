// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';
import { Response } from 'node-fetch';

const client = new LlamaStackClient({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource responses', () => {
  test('create: only required params', async () => {
    const responsePromise = client.responses.create({ input: 'string', model: 'model' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.responses.create({
      input: 'string',
      model: 'model',
      include: ['string'],
      instructions: 'instructions',
      max_infer_iters: 0,
      previous_response_id: 'previous_response_id',
      store: true,
      stream: false,
      temperature: 0,
      text: {
        format: {
          type: 'text',
          description: 'description',
          name: 'name',
          schema: { foo: true },
          strict: true,
        },
      },
      tools: [{ type: 'web_search', search_context_size: 'search_context_size' }],
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.responses.retrieve('response_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.responses.retrieve('response_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(LlamaStackClient.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.responses.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.responses.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      LlamaStackClient.NotFoundError,
    );
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.responses.list(
        { after: 'after', limit: 0, model: 'model', order: 'asc' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LlamaStackClient.NotFoundError);
  });
});
