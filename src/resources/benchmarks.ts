// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Benchmarks extends APIResource {
  /**
   * Get a benchmark by its ID.
   */
  retrieve(benchmarkId: string, options?: Core.RequestOptions): Core.APIPromise<Benchmark> {
    return this._client.get(`/v1/eval/benchmarks/${benchmarkId}`, options);
  }

  /**
   * List all benchmarks.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<BenchmarkListResponse> {
    return (
      this._client.get('/v1/eval/benchmarks', options) as Core.APIPromise<{ data: BenchmarkListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Register a benchmark.
   */
  register(body: BenchmarkRegisterParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/eval/benchmarks', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface Benchmark {
  dataset_id: string;

  identifier: string;

  metadata: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  provider_id: string;

  scoring_functions: Array<string>;

  type: 'benchmark';

  provider_resource_id?: string;
}

export interface ListBenchmarksResponse {
  data: BenchmarkListResponse;
}

export type BenchmarkListResponse = Array<Benchmark>;

export interface BenchmarkRegisterParams {
  /**
   * The ID of the benchmark to register.
   */
  benchmark_id: string;

  /**
   * The ID of the dataset to use for the benchmark.
   */
  dataset_id: string;

  /**
   * The scoring functions to use for the benchmark.
   */
  scoring_functions: Array<string>;

  /**
   * The metadata to use for the benchmark.
   */
  metadata?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  /**
   * The ID of the provider benchmark to use for the benchmark.
   */
  provider_benchmark_id?: string;

  /**
   * The ID of the provider to use for the benchmark.
   */
  provider_id?: string;
}

export declare namespace Benchmarks {
  export {
    type Benchmark as Benchmark,
    type ListBenchmarksResponse as ListBenchmarksResponse,
    type BenchmarkListResponse as BenchmarkListResponse,
    type BenchmarkRegisterParams as BenchmarkRegisterParams,
  };
}
