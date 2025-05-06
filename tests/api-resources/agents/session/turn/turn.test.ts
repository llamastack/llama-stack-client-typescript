// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';

const client = new LlamaStackClient({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource turn', () => {
  // skipped: tests are disabled for the time being
  test.skip('create: only required params', async () => {
    const responsePromise = client.agents.session.turn.create('session_id', {
      agent_id: 'agent_id',
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

  // skipped: tests are disabled for the time being
  test.skip('create: required and optional params', async () => {
    const response = await client.agents.session.turn.create('session_id', {
      agent_id: 'agent_id',
      messages: [{ content: 'string', role: 'user', context: 'string' }],
      documents: [{ content: 'string', mime_type: 'mime_type' }],
      stream: true,
      tool_config: { system_message_behavior: 'append', tool_choice: 'auto', tool_prompt_format: 'json' },
      toolgroups: ['string'],
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.agents.session.turn.retrieve('turn_id', {
      agent_id: 'agent_id',
      session_id: 'session_id',
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
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.agents.session.turn.retrieve('turn_id', {
      agent_id: 'agent_id',
      session_id: 'session_id',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('resume: only required params', async () => {
    const responsePromise = client.agents.session.turn.resume('turn_id', {
      agent_id: 'agent_id',
      session_id: 'session_id',
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

  // skipped: tests are disabled for the time being
  test.skip('resume: required and optional params', async () => {
    const response = await client.agents.session.turn.resume('turn_id', {
      agent_id: 'agent_id',
      session_id: 'session_id',
      tool_responses: [
        { call_id: 'call_id', content: 'string', tool_name: 'brave_search', metadata: { foo: true } },
      ],
      stream: true,
    });
  });
});
