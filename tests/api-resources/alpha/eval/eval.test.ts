// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';
import { Response } from 'node-fetch';

const client = new LlamaStackClient({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource eval', () => {
  test('evaluateRows: only required params', async () => {
    const responsePromise = client.alpha.eval.evaluateRows('benchmark_id', {
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

  test('evaluateRows: required and optional params', async () => {
    const response = await client.alpha.eval.evaluateRows('benchmark_id', {
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

  test('evaluateRowsAlpha: only required params', async () => {
    const responsePromise = client.alpha.eval.evaluateRowsAlpha('benchmark_id', {
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

  test('evaluateRowsAlpha: required and optional params', async () => {
    const response = await client.alpha.eval.evaluateRowsAlpha('benchmark_id', {
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

  test('runEval: only required params', async () => {
    const responsePromise = client.alpha.eval.runEval('benchmark_id', {
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

  test('runEval: required and optional params', async () => {
    const response = await client.alpha.eval.runEval('benchmark_id', {
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

  test('runEvalAlpha: only required params', async () => {
    const responsePromise = client.alpha.eval.runEvalAlpha('benchmark_id', {
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

  test('runEvalAlpha: required and optional params', async () => {
    const response = await client.alpha.eval.runEvalAlpha('benchmark_id', {
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
