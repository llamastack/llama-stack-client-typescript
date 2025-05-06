// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as BenchmarksAPI from './benchmarks/benchmarks';
import {
  Benchmark,
  BenchmarkConfig,
  BenchmarkCreateParams,
  BenchmarkEvaluateParams,
  BenchmarkListResponse,
  Benchmarks,
  EvaluateResponse,
} from './benchmarks/benchmarks';

export class Eval extends APIResource {
  benchmarks: BenchmarksAPI.Benchmarks = new BenchmarksAPI.Benchmarks(this._client);
}

Eval.Benchmarks = Benchmarks;

export declare namespace Eval {
  export {
    Benchmarks as Benchmarks,
    type Benchmark as Benchmark,
    type BenchmarkConfig as BenchmarkConfig,
    type EvaluateResponse as EvaluateResponse,
    type BenchmarkListResponse as BenchmarkListResponse,
    type BenchmarkCreateParams as BenchmarkCreateParams,
    type BenchmarkEvaluateParams as BenchmarkEvaluateParams,
  };
}
