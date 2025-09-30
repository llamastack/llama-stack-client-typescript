// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';
import { Response } from 'node-fetch';

const client = new LlamaStackClient({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource inference', () => {
  test('chatCompletion: only required params', async () => {
    const responsePromise = client.inference.chatCompletion({
      messages: [{ content: 'string', role: 'user' }],
      model_id: 'model_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('chatCompletion: required and optional params', async () => {
    const response = await client.inference.chatCompletion({
      messages: [{ content: 'string', role: 'user', context: 'string' }],
      model_id: 'model_id',
      logprobs: { top_k: 0 },
      response_format: { json_schema: { foo: true }, type: 'json_schema' },
      sampling_params: {
        strategy: { type: 'greedy' },
        max_tokens: 0,
        repetition_penalty: 0,
        stop: ['string'],
      },
      stream: false,
      tool_choice: 'auto',
      tool_config: { system_message_behavior: 'append', tool_choice: 'auto', tool_prompt_format: 'json' },
      tool_prompt_format: 'json',
      tools: [
        {
          tool_name: 'brave_search',
          description: 'description',
          parameters: {
            foo: {
              param_type: 'param_type',
              default: true,
              description: 'description',
              items: true,
              required: true,
              title: 'title',
            },
          },
        },
      ],
    });
  });
});
