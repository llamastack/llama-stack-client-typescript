// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';

const client = new LlamaStackClient({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource spans', () => {
  // skipped: tests are disabled for the time being
  test.skip('create: only required params', async () => {
    const responsePromise = client.telemetry.spans.create({
      attribute_filters: [{ key: 'key', op: 'eq', value: true }],
      attributes_to_return: ['string'],
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
  test.skip('create: required and optional params', async () => {
    const response = await client.telemetry.spans.create({
      attribute_filters: [{ key: 'key', op: 'eq', value: true }],
      attributes_to_return: ['string'],
      max_depth: 0,
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('buildTree', async () => {
    const responsePromise = client.telemetry.spans.buildTree('span_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('export: only required params', async () => {
    const responsePromise = client.telemetry.spans.export({
      attribute_filters: [{ key: 'key', op: 'eq', value: true }],
      attributes_to_save: ['string'],
      dataset_id: 'dataset_id',
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
  test.skip('export: required and optional params', async () => {
    const response = await client.telemetry.spans.export({
      attribute_filters: [{ key: 'key', op: 'eq', value: true }],
      attributes_to_save: ['string'],
      dataset_id: 'dataset_id',
      max_depth: 0,
    });
  });
});
