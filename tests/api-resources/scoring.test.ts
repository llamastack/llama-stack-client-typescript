// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';
import { Response } from 'node-fetch';

const client = new LlamaStackClient({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource scoring', () => {
  test('score: only required params', async () => {
    const responsePromise = client.scoring.score({
      input_rows: [{ foo: true }],
      scoring_functions: { foo: { judge_model: 'judge_model', type: 'llm_as_judge' } },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('score: required and optional params', async () => {
    const response = await client.scoring.score({
      input_rows: [{ foo: true }],
      scoring_functions: {
        foo: {
          judge_model: 'judge_model',
          type: 'llm_as_judge',
          aggregation_functions: ['average'],
          judge_score_regexes: ['string'],
          prompt_template: 'prompt_template',
        },
      },
    });
  });

  test('scoreBatch: only required params', async () => {
    const responsePromise = client.scoring.scoreBatch({
      dataset_id: 'dataset_id',
      save_results_dataset: true,
      scoring_functions: { foo: { judge_model: 'judge_model', type: 'llm_as_judge' } },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('scoreBatch: required and optional params', async () => {
    const response = await client.scoring.scoreBatch({
      dataset_id: 'dataset_id',
      save_results_dataset: true,
      scoring_functions: {
        foo: {
          judge_model: 'judge_model',
          type: 'llm_as_judge',
          aggregation_functions: ['average'],
          judge_score_regexes: ['string'],
          prompt_template: 'prompt_template',
        },
      },
    });
  });
});
