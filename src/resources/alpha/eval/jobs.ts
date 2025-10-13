// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as Core from '../../../core';
import * as EvalAPI from './eval';

export class Jobs extends APIResource {
  /**
   * Get the result of a job.
   */
  retrieve(
    benchmarkId: string,
    jobId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<EvalAPI.EvaluateResponse> {
    return this._client.get(`/v1alpha/eval/benchmarks/${benchmarkId}/jobs/${jobId}/result`, options);
  }

  /**
   * Cancel a job.
   */
  cancel(benchmarkId: string, jobId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1alpha/eval/benchmarks/${benchmarkId}/jobs/${jobId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Get the status of a job.
   */
  status(benchmarkId: string, jobId: string, options?: Core.RequestOptions): Core.APIPromise<EvalAPI.Job> {
    return this._client.get(`/v1alpha/eval/benchmarks/${benchmarkId}/jobs/${jobId}`, options);
  }
}
