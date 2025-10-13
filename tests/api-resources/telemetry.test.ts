// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';
import { Response } from 'node-fetch';

const client = new LlamaStackClient({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource telemetry', () => {
  test('getSpan', async () => {
    const responsePromise = client.telemetry.getSpan('trace_id', 'span_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getSpan: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.telemetry.getSpan('trace_id', 'span_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(LlamaStackClient.NotFoundError);
  });

  test('getSpanTree', async () => {
    const responsePromise = client.telemetry.getSpanTree('span_id', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getTrace', async () => {
    const responsePromise = client.telemetry.getTrace('trace_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getTrace: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.telemetry.getTrace('trace_id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      LlamaStackClient.NotFoundError,
    );
  });

  // unsupported query params in java / kotlin
  test.skip('queryMetrics: only required params', async () => {
    const responsePromise = client.telemetry.queryMetrics('metric_name', {
      query_type: 'range',
      start_time: 0,
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // unsupported query params in java / kotlin
  test.skip('queryMetrics: required and optional params', async () => {
    const response = await client.telemetry.queryMetrics('metric_name', {
      query_type: 'range',
      start_time: 0,
      end_time: 0,
      granularity: 'granularity',
      label_matchers: [{ name: 'name', operator: '=', value: 'value' }],
    });
  });

  // unsupported query params in java / kotlin
  test.skip('querySpans: only required params', async () => {
    const responsePromise = client.telemetry.querySpans({
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

  // unsupported query params in java / kotlin
  test.skip('querySpans: required and optional params', async () => {
    const response = await client.telemetry.querySpans({
      attribute_filters: [{ key: 'key', op: 'eq', value: true }],
      attributes_to_return: ['string'],
      max_depth: 0,
    });
  });

  // unsupported query params in java / kotlin
  test.skip('queryTraces', async () => {
    const responsePromise = client.telemetry.queryTraces({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('saveSpansToDataset: only required params', async () => {
    const responsePromise = client.telemetry.saveSpansToDataset({
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

  test('saveSpansToDataset: required and optional params', async () => {
    const response = await client.telemetry.saveSpansToDataset({
      attribute_filters: [{ key: 'key', op: 'eq', value: true }],
      attributes_to_save: ['string'],
      dataset_id: 'dataset_id',
      max_depth: 0,
    });
  });
});
