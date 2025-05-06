// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';

const client = new LlamaStackClient({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource jobs', () => {
  // skipped: tests are disabled for the time being
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.eval.benchmarks.jobs.retrieve('job_id', { benchmark_id: 'benchmark_id' });
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
    const response = await client.eval.benchmarks.jobs.retrieve('job_id', { benchmark_id: 'benchmark_id' });
  });

  // skipped: tests are disabled for the time being
  test.skip('cancel: only required params', async () => {
    const responsePromise = client.eval.benchmarks.jobs.cancel('job_id', { benchmark_id: 'benchmark_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('cancel: required and optional params', async () => {
    const response = await client.eval.benchmarks.jobs.cancel('job_id', { benchmark_id: 'benchmark_id' });
  });

  // skipped: tests are disabled for the time being
  test.skip('result: only required params', async () => {
    const responsePromise = client.eval.benchmarks.jobs.result('job_id', { benchmark_id: 'benchmark_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('result: required and optional params', async () => {
    const response = await client.eval.benchmarks.jobs.result('job_id', { benchmark_id: 'benchmark_id' });
  });

  // skipped: tests are disabled for the time being
  test.skip('run: only required params', async () => {
    const responsePromise = client.eval.benchmarks.jobs.run('benchmark_id', {
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
  test.skip('run: required and optional params', async () => {
    const response = await client.eval.benchmarks.jobs.run('benchmark_id', {
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
    });
  });
});
