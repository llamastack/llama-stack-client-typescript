// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';

const client = new LlamaStackClient({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource telemetry', () => {
  // skipped: tests are disabled for the time being
  test.skip('createEvent: only required params', async () => {
    const responsePromise = client.telemetry.createEvent({
      event: {
        message: 'message',
        severity: 'verbose',
        span_id: 'span_id',
        timestamp: '2019-12-27T18:11:19.117Z',
        trace_id: 'trace_id',
        type: 'unstructured_log',
      },
      ttl_seconds: 0,
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
  test.skip('createEvent: required and optional params', async () => {
    const response = await client.telemetry.createEvent({
      event: {
        message: 'message',
        severity: 'verbose',
        span_id: 'span_id',
        timestamp: '2019-12-27T18:11:19.117Z',
        trace_id: 'trace_id',
        type: 'unstructured_log',
        attributes: { foo: 'string' },
      },
      ttl_seconds: 0,
    });
  });
});
