// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';
import { Response } from 'node-fetch';

const client = new LlamaStackClient({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource completions', () => {
  test('create: only required params', async () => {
    const responsePromise = client.chat.completions.create({
      messages: [{ content: 'string', role: 'user' }],
      model: 'model',
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
    const response = await client.chat.completions.create({
      messages: [{ content: 'string', role: 'user', name: 'name' }],
      model: 'model',
      frequency_penalty: 0,
      function_call: 'string',
      functions: [{ foo: true }],
      logit_bias: { foo: 0 },
      logprobs: true,
      max_completion_tokens: 0,
      max_tokens: 0,
      n: 0,
      parallel_tool_calls: true,
      presence_penalty: 0,
      response_format: { type: 'text' },
      seed: 0,
      stop: 'string',
      stream: false,
      stream_options: { foo: true },
      temperature: 0,
      tool_choice: 'string',
      tools: [{ foo: true }],
      top_logprobs: 0,
      top_p: 0,
      user: 'user',
    });
  });
});
