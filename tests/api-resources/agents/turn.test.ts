// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';
import { Response } from 'node-fetch';

const client = new LlamaStackClient({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource turn', () => {
  test('create: only required params', async () => {
    const responsePromise = client.agents.turn.create('agent_id', 'session_id', {
      messages: [{ content: 'string', role: 'user' }],
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
    const response = await client.agents.turn.create('agent_id', 'session_id', {
      messages: [{ content: 'string', role: 'user', context: 'string' }],
      documents: [{ content: 'string', mime_type: 'mime_type' }],
      stream: false,
      tool_config: { system_message_behavior: 'append', tool_choice: 'auto', tool_prompt_format: 'json' },
      toolgroups: ['string'],
    });
  });

  test('retrieve', async () => {
    const responsePromise = client.agents.turn.retrieve('agent_id', 'session_id', 'turn_id');
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
      client.agents.turn.retrieve('agent_id', 'session_id', 'turn_id', { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(LlamaStackClient.NotFoundError);
  });

  test('resume: only required params', async () => {
    const responsePromise = client.agents.turn.resume('agent_id', 'session_id', 'turn_id', {
      tool_responses: [{ call_id: 'call_id', content: 'string', tool_name: 'brave_search' }],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('resume: required and optional params', async () => {
    const response = await client.agents.turn.resume('agent_id', 'session_id', 'turn_id', {
      tool_responses: [
        { call_id: 'call_id', content: 'string', tool_name: 'brave_search', metadata: { foo: true } },
      ],
      stream: false,
    });
  });
});
