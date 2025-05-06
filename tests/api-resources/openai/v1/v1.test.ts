// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';

const client = new LlamaStackClient({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource v1', () => {
  // skipped: tests are disabled for the time being
  test.skip('generateCompletion: only required params', async () => {
    const responsePromise = client.openai.v1.generateCompletion({ model: 'model', prompt: 'string' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('generateCompletion: required and optional params', async () => {
    const response = await client.openai.v1.generateCompletion({
      model: 'model',
      prompt: 'string',
      best_of: 0,
      echo: true,
      frequency_penalty: 0,
      guided_choice: ['string'],
      logit_bias: { foo: 0 },
      logprobs: true,
      max_tokens: 0,
      n: 0,
      presence_penalty: 0,
      prompt_logprobs: 0,
      seed: 0,
      stop: 'string',
      stream: true,
      stream_options: { foo: true },
      temperature: 0,
      top_p: 0,
      user: 'user',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('listModels', async () => {
    const responsePromise = client.openai.v1.listModels();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
