// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';
import { Response } from 'node-fetch';

const client = new LlamaStackClient({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource agents', () => {
  test('create: only required params', async () => {
    const responsePromise = client.agents.create({
      agent_config: { instructions: 'instructions', model: 'model' },
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
    const response = await client.agents.create({
      agent_config: {
        instructions: 'instructions',
        model: 'model',
        client_tools: [
          {
            name: 'name',
            description: 'description',
            metadata: { foo: true },
            parameters: [
              {
                description: 'description',
                name: 'name',
                parameter_type: 'parameter_type',
                required: true,
                default: true,
              },
            ],
          },
        ],
        enable_session_persistence: true,
        input_shields: ['string'],
        max_infer_iters: 0,
        name: 'name',
        output_shields: ['string'],
        response_format: { json_schema: { foo: true }, type: 'json_schema' },
        sampling_params: {
          strategy: { type: 'greedy' },
          max_tokens: 0,
          repetition_penalty: 0,
          stop: ['string'],
        },
        tool_choice: 'auto',
        tool_config: { system_message_behavior: 'append', tool_choice: 'auto', tool_prompt_format: 'json' },
        tool_prompt_format: 'json',
        toolgroups: ['string'],
      },
    });
  });

  test('delete', async () => {
    const responsePromise = client.agents.delete('agent_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.agents.delete('agent_id', { path: '/_stainless_unknown_path' })).rejects.toThrow(
      LlamaStackClient.NotFoundError,
    );
  });
});
