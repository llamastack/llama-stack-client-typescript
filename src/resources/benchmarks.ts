// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';

export class Benchmarks extends APIResource {}

/**
 * A benchmark resource for evaluating model performance.
 */
export interface Benchmark {
  /**
   * Identifier of the dataset to use for the benchmark evaluation
   */
  dataset_id: string;

  identifier: string;

  /**
   * Metadata for this evaluation task
   */
  metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  provider_id: string;

  /**
   * List of scoring function identifiers to apply during evaluation
   */
  scoring_functions: Array<string>;

  /**
   * The resource type, always benchmark
   */
  type: 'benchmark';

  provider_resource_id?: string;
}

export interface ListBenchmarksResponse {
  data: Array<Benchmark>;
}

export declare namespace Benchmarks {
  export { type Benchmark as Benchmark, type ListBenchmarksResponse as ListBenchmarksResponse };
}
