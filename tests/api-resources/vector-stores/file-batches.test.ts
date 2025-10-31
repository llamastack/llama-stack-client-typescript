// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';
import { Response } from 'node-fetch';

const client = new LlamaStackClient({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource fileBatches', () => {
  test('create: only required params', async () => {
    const responsePromise = client.vectorStores.fileBatches.create('vector_store_id', {
      file_ids: ['string'],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.vectorStores.fileBatches.create('vector_store_id', {
      file_ids: ['string'],
      attributes: { foo: true },
      chunking_strategy: { type: 'auto' },
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.vectorStores.fileBatches.retrieve('vector_store_id', 'batch_id');
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
      client.vectorStores.fileBatches.retrieve('vector_store_id', 'batch_id', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(LlamaStackClient.NotFoundError);
  });

  test('cancel', async () => {
    const responsePromise = client.vectorStores.fileBatches.cancel('vector_store_id', 'batch_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('cancel: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.vectorStores.fileBatches.cancel('vector_store_id', 'batch_id', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(LlamaStackClient.NotFoundError);
  });

  test('listFiles', async () => {
    const responsePromise = client.vectorStores.fileBatches.listFiles('vector_store_id', 'batch_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listFiles: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.vectorStores.fileBatches.listFiles('vector_store_id', 'batch_id', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(LlamaStackClient.NotFoundError);
  });

  test('listFiles: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.vectorStores.fileBatches.listFiles(
        'vector_store_id',
        'batch_id',
        { after: 'after', before: 'before', filter: 'filter', limit: 0, order: 'order' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(LlamaStackClient.NotFoundError);
  });
});
