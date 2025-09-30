// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';
import { Response } from 'node-fetch';

const client = new LlamaStackClient({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource steps', () => {
  test('retrieve', async () => {
    const responsePromise = client.alpha.agents.steps.retrieve(
      'agent_id',
      'session_id',
      'turn_id',
      'step_id',
    );
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
      client.alpha.agents.steps.retrieve('agent_id', 'session_id', 'turn_id', 'step_id', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(LlamaStackClient.NotFoundError);
  });
});
