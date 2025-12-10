// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Benchmarks extends APIResource {
  /**
   * Get a benchmark by its ID.
   */
  retrieve(benchmarkId: string, options?: Core.RequestOptions): Core.APIPromise<Benchmark> {
    return this._client.get(`/v1alpha/eval/benchmarks/${benchmarkId}`, options);
  }

  /**
   * List all benchmarks.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<BenchmarkListResponse> {
    return (
      this._client.get('/v1alpha/eval/benchmarks', options) as Core.APIPromise<{
        data: BenchmarkListResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Register a benchmark.
   *
   * @deprecated
   */
  register(body: BenchmarkRegisterParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1alpha/eval/benchmarks', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Unregister a benchmark.
   *
   * @deprecated
   */
  unregister(benchmarkId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1alpha/eval/benchmarks/${benchmarkId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

/**
 * A benchmark resource for evaluating model performance.
 */
export interface Benchmark {
  /**
   * Identifier of the dataset to use for the benchmark evaluation.
   */
  dataset_id: string;

  /**
   * Unique identifier for this resource in llama stack
   */
  identifier: string;

  /**
   * ID of the provider that owns this resource
   */
  provider_id: string;

  /**
   * List of scoring function identifiers to apply during evaluation.
   */
  scoring_functions: Array<string>;

  /**
   * Metadata for this evaluation task.
   */
  metadata?: { [key: string]: unknown };

  /**
   * Unique identifier for this resource in the provider
   */
  provider_resource_id?: string | null;

  /**
   * The resource type, always benchmark.
   */
  type?: 'benchmark';
}

/**
 * Response containing a list of benchmark objects.
 */
export interface ListBenchmarksResponse {
  /**
   * List of benchmark objects.
   */
  data: BenchmarkListResponse;
}

/**
 * List of benchmark objects.
 */
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
  metadata?: { [key: string]: unknown } | null;

  /**
   * The ID of the provider benchmark to use for the benchmark.
   */
  provider_benchmark_id?: string | null;

  /**
   * The ID of the provider to use for the benchmark.
   */
  provider_id?: string | null;
}

export declare namespace Benchmarks {
  export {
    type Benchmark as Benchmark,
    type ListBenchmarksResponse as ListBenchmarksResponse,
    type BenchmarkListResponse as BenchmarkListResponse,
    type BenchmarkRegisterParams as BenchmarkRegisterParams,
  };
}
