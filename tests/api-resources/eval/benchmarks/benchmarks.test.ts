// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';

const client = new LlamaStackClient({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource benchmarks', () => {
  // skipped: tests are disabled for the time being
  test.skip('create: only required params', async () => {
    const responsePromise = client.eval.benchmarks.create({
      benchmark_id: 'benchmark_id',
      dataset_id: 'dataset_id',
      scoring_functions: ['string'],
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
    const response = await client.eval.benchmarks.create({
      benchmark_id: 'benchmark_id',
      dataset_id: 'dataset_id',
      scoring_functions: ['string'],
      metadata: { foo: true },
      provider_benchmark_id: 'provider_benchmark_id',
      provider_id: 'provider_id',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('retrieve', async () => {
    const responsePromise = client.eval.benchmarks.retrieve('benchmark_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('list', async () => {
    const responsePromise = client.eval.benchmarks.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('evaluate: only required params', async () => {
    const responsePromise = client.eval.benchmarks.evaluate('benchmark_id', {
      benchmark_config: {
        eval_candidate: { model: 'model', sampling_params: { strategy: { type: 'greedy' } }, type: 'model' },
        scoring_params: {
          foo: {
            aggregation_functions: ['average'],
            judge_model: 'judge_model',
            judge_score_regexes: ['string'],
            type: 'llm_as_judge',
          },
        },
      },
      input_rows: [{ foo: true }],
      scoring_functions: ['string'],
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
  test.skip('evaluate: required and optional params', async () => {
    const response = await client.eval.benchmarks.evaluate('benchmark_id', {
      benchmark_config: {
        eval_candidate: {
          model: 'model',
          sampling_params: {
            strategy: { type: 'greedy' },
            max_tokens: 0,
            repetition_penalty: 0,
            stop: ['string'],
          },
          type: 'model',
          system_message: { content: 'string', role: 'system' },
        },
        scoring_params: {
          foo: {
            aggregation_functions: ['average'],
            judge_model: 'judge_model',
            judge_score_regexes: ['string'],
            type: 'llm_as_judge',
            prompt_template: 'prompt_template',
          },
        },
        num_examples: 0,
      },
      input_rows: [{ foo: true }],
      scoring_functions: ['string'],
    });
  });
});
