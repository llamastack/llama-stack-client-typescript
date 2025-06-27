// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';
import { Response } from 'node-fetch';

const client = new LlamaStackClient({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource benchmarks', () => {
  test('retrieve', async () => {
    const responsePromise = client.benchmarks.retrieve('benchmark_id');
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
      client.benchmarks.retrieve('benchmark_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(LlamaStackClient.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.benchmarks.list();
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
    await expect(client.benchmarks.list({ path: '/_stainless_unknown_path' })).rejects.toThrow(
      LlamaStackClient.NotFoundError,
    );
  });

  test('register: only required params', async () => {
    const responsePromise = client.benchmarks.register({
      benchmark_id: 'benchmark_id',
      dataset_id: 'dataset_id',
      scoring_functions: ['string'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('register: required and optional params', async () => {
    const response = await client.benchmarks.register({
      benchmark_id: 'benchmark_id',
      dataset_id: 'dataset_id',
      scoring_functions: ['string'],
      metadata: { foo: true },
      provider_benchmark_id: 'provider_benchmark_id',
      provider_id: 'provider_id',
    });
  });
});
