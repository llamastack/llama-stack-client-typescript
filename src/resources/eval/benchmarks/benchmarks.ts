// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as InferenceAPI from '../../inference';
import * as ScoringFunctionsAPI from '../../scoring-functions';
import * as AgentsAPI from '../../agents/agents';
import * as JobsAPI from './jobs';
import { Job, JobCancelParams, JobResultParams, JobRetrieveParams, JobRunParams, Jobs } from './jobs';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Benchmarks extends APIResource {
  jobs: JobsAPI.Jobs = new JobsAPI.Jobs(this._client);

  create(body: BenchmarkCreateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/eval/benchmarks', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  retrieve(benchmarkID: string, options?: RequestOptions): APIPromise<Benchmark> {
    return this._client.get(path`/v1/eval/benchmarks/${benchmarkID}`, options);
  }

  list(options?: RequestOptions): APIPromise<BenchmarkListResponse> {
    return this._client.get('/v1/eval/benchmarks', options);
  }

  /**
   * Evaluate a list of rows on a benchmark.
   */
  evaluate(
    benchmarkID: string,
    body: BenchmarkEvaluateParams,
    options?: RequestOptions,
  ): APIPromise<EvaluateResponse> {
    return this._client.post(path`/v1/eval/benchmarks/${benchmarkID}/evaluations`, { body, ...options });
  }
}

export interface Benchmark {
  dataset_id: string;

  identifier: string;

  metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  provider_id: string;

  scoring_functions: Array<string>;

  type: 'benchmark';

  provider_resource_id?: string;
}

/**
 * A benchmark configuration for evaluation.
 */
export interface BenchmarkConfig {
  /**
   * The candidate to evaluate.
   */
  eval_candidate: BenchmarkConfig.ModelCandidate | BenchmarkConfig.AgentCandidate;

  /**
   * Map between scoring function id and parameters for each scoring function you
   * want to run
   */
  scoring_params: { [key: string]: ScoringFunctionsAPI.ScoringFnParams };

  /**
   * (Optional) The number of examples to evaluate. If not provided, all examples in
   * the dataset will be evaluated
   */
  num_examples?: number;
}

export namespace BenchmarkConfig {
  /**
   * A model candidate for evaluation.
   */
  export interface ModelCandidate {
    /**
     * The model ID to evaluate.
     */
    model: string;

    /**
     * The sampling parameters for the model.
     */
    sampling_params: InferenceAPI.SamplingParams;

    type: 'model';

    /**
     * (Optional) The system message providing instructions or context to the model.
     */
    system_message?: InferenceAPI.SystemMessage;
  }

  /**
   * An agent candidate for evaluation.
   */
  export interface AgentCandidate {
    /**
     * The configuration for the agent candidate.
     */
    config: AgentsAPI.AgentConfig;

    type: 'agent';
  }
}

/**
 * The response from an evaluation.
 */
export interface EvaluateResponse {
  /**
   * The generations from the evaluation.
   */
  generations: Array<{ [key: string]: boolean | number | string | Array<unknown> | unknown | null }>;

  /**
   * The scores from the evaluation.
   */
  scores: { [key: string]: EvaluateResponse.Scores };
}

export namespace EvaluateResponse {
  /**
   * A scoring result for a single row.
   */
  export interface Scores {
    /**
     * Map of metric name to aggregated value
     */
    aggregated_results: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

    /**
     * The scoring result for each row. Each row is a map of column name to value.
     */
    score_rows: Array<{ [key: string]: boolean | number | string | Array<unknown> | unknown | null }>;
  }
}

export interface BenchmarkListResponse {
  data: Array<Benchmark>;
}

export interface BenchmarkCreateParams {
  benchmark_id: string;

  dataset_id: string;

  scoring_functions: Array<string>;

  metadata?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  provider_benchmark_id?: string;

  provider_id?: string;
}

export interface BenchmarkEvaluateParams {
  /**
   * The configuration for the benchmark.
   */
  benchmark_config: BenchmarkConfig;

  /**
   * The rows to evaluate.
   */
  input_rows: Array<{ [key: string]: boolean | number | string | Array<unknown> | unknown | null }>;

  /**
   * The scoring functions to use for the evaluation.
   */
  scoring_functions: Array<string>;
}

Benchmarks.Jobs = Jobs;

export declare namespace Benchmarks {
  export {
    type Benchmark as Benchmark,
    type BenchmarkConfig as BenchmarkConfig,
    type EvaluateResponse as EvaluateResponse,
    type BenchmarkListResponse as BenchmarkListResponse,
    type BenchmarkCreateParams as BenchmarkCreateParams,
    type BenchmarkEvaluateParams as BenchmarkEvaluateParams,
  };

  export {
    Jobs as Jobs,
    type Job as Job,
    type JobRetrieveParams as JobRetrieveParams,
    type JobCancelParams as JobCancelParams,
    type JobResultParams as JobResultParams,
    type JobRunParams as JobRunParams,
  };
}
