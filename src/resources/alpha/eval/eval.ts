// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as Core from '../../../core';
import * as ScoringFunctionsAPI from '../../scoring-functions';
import * as Shared from '../../shared';
import * as JobsAPI from './jobs';
import { Jobs } from './jobs';

export class Eval extends APIResource {
  jobs: JobsAPI.Jobs = new JobsAPI.Jobs(this._client);

  /**
   * Evaluate a list of rows on a benchmark.
   */
  evaluateRows(
    benchmarkId: string,
    body: EvalEvaluateRowsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<EvaluateResponse> {
    return this._client.post(`/v1alpha/eval/benchmarks/${benchmarkId}/evaluations`, { body, ...options });
  }

  /**
   * Evaluate a list of rows on a benchmark.
   */
  evaluateRowsAlpha(
    benchmarkId: string,
    body: EvalEvaluateRowsAlphaParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<EvaluateResponse> {
    return this._client.post(`/v1alpha/eval/benchmarks/${benchmarkId}/evaluations`, { body, ...options });
  }

  /**
   * Run an evaluation on a benchmark.
   */
  runEval(benchmarkId: string, body: EvalRunEvalParams, options?: Core.RequestOptions): Core.APIPromise<Job> {
    return this._client.post(`/v1alpha/eval/benchmarks/${benchmarkId}/jobs`, { body, ...options });
  }

  /**
   * Run an evaluation on a benchmark.
   */
  runEvalAlpha(
    benchmarkId: string,
    body: EvalRunEvalAlphaParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Job> {
    return this._client.post(`/v1alpha/eval/benchmarks/${benchmarkId}/jobs`, { body, ...options });
  }
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
    sampling_params: Shared.SamplingParams;

    type: 'model';

    /**
     * (Optional) The system message providing instructions or context to the model.
     */
    system_message?: Shared.SystemMessage;
  }

  /**
   * An agent candidate for evaluation.
   */
  export interface AgentCandidate {
    /**
     * The configuration for the agent candidate.
     */
    config: Shared.AgentConfig;

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
  scores: { [key: string]: Shared.ScoringResult };
}

/**
 * A job execution instance with status tracking.
 */
export interface Job {
  /**
   * Unique identifier for the job
   */
  job_id: string;

  /**
   * Current execution status of the job
   */
  status: 'completed' | 'in_progress' | 'failed' | 'scheduled' | 'cancelled';
}

export interface EvalEvaluateRowsParams {
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

export interface EvalEvaluateRowsAlphaParams {
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

export interface EvalRunEvalParams {
  /**
   * The configuration for the benchmark.
   */
  benchmark_config: BenchmarkConfig;
}

export interface EvalRunEvalAlphaParams {
  /**
   * The configuration for the benchmark.
   */
  benchmark_config: BenchmarkConfig;
}

Eval.Jobs = Jobs;

export declare namespace Eval {
  export {
    type BenchmarkConfig as BenchmarkConfig,
    type EvaluateResponse as EvaluateResponse,
    type Job as Job,
    type EvalEvaluateRowsParams as EvalEvaluateRowsParams,
    type EvalEvaluateRowsAlphaParams as EvalEvaluateRowsAlphaParams,
    type EvalRunEvalParams as EvalRunEvalParams,
    type EvalRunEvalAlphaParams as EvalRunEvalAlphaParams,
  };

  export { Jobs as Jobs };
}
