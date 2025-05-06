// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as BenchmarksAPI from './benchmarks';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Jobs extends APIResource {
  /**
   * Get the status of a job.
   */
  retrieve(jobID: string, params: JobRetrieveParams, options?: RequestOptions): APIPromise<Job> {
    const { benchmark_id } = params;
    return this._client.get(path`/v1/eval/benchmarks/${benchmark_id}/jobs/${jobID}`, options);
  }

  /**
   * Cancel a job.
   */
  cancel(jobID: string, params: JobCancelParams, options?: RequestOptions): APIPromise<void> {
    const { benchmark_id } = params;
    return this._client.delete(path`/v1/eval/benchmarks/${benchmark_id}/jobs/${jobID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get the result of a job.
   */
  result(
    jobID: string,
    params: JobResultParams,
    options?: RequestOptions,
  ): APIPromise<BenchmarksAPI.EvaluateResponse> {
    const { benchmark_id } = params;
    return this._client.get(path`/v1/eval/benchmarks/${benchmark_id}/jobs/${jobID}/result`, options);
  }

  /**
   * Run an evaluation on a benchmark.
   */
  run(benchmarkID: string, body: JobRunParams, options?: RequestOptions): APIPromise<Job> {
    return this._client.post(path`/v1/eval/benchmarks/${benchmarkID}/jobs`, { body, ...options });
  }
}

export interface Job {
  job_id: string;

  status: 'completed' | 'in_progress' | 'failed' | 'scheduled' | 'cancelled';
}

export interface JobRetrieveParams {
  /**
   * The ID of the benchmark to run the evaluation on.
   */
  benchmark_id: string;
}

export interface JobCancelParams {
  /**
   * The ID of the benchmark to run the evaluation on.
   */
  benchmark_id: string;
}

export interface JobResultParams {
  /**
   * The ID of the benchmark to run the evaluation on.
   */
  benchmark_id: string;
}

export interface JobRunParams {
  /**
   * The configuration for the benchmark.
   */
  benchmark_config: BenchmarksAPI.BenchmarkConfig;
}

export declare namespace Jobs {
  export {
    type Job as Job,
    type JobRetrieveParams as JobRetrieveParams,
    type JobCancelParams as JobCancelParams,
    type JobResultParams as JobResultParams,
    type JobRunParams as JobRunParams,
  };
}
