// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ScoringFunctionsAPI from './scoring-functions';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Scoring extends APIResource {
  /**
   * Score a list of rows.
   */
  score(body: ScoringScoreParams, options?: RequestOptions): APIPromise<ScoringScoreResponse> {
    return this._client.post('/v1/scoring/score', { body, ...options });
  }

  scoreBatch(body: ScoringScoreBatchParams, options?: RequestOptions): APIPromise<ScoringScoreBatchResponse> {
    return this._client.post('/v1/scoring/score-batch', { body, ...options });
  }
}

/**
 * The response from scoring.
 */
export interface ScoringScoreResponse {
  /**
   * A map of scoring function name to ScoringResult.
   */
  results: Record<string, ScoringScoreResponse.Results>;
}

export namespace ScoringScoreResponse {
  /**
   * A scoring result for a single row.
   */
  export interface Results {
    /**
     * Map of metric name to aggregated value
     */
    aggregated_results: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

    /**
     * The scoring result for each row. Each row is a map of column name to value.
     */
    score_rows: Array<Record<string, boolean | number | string | Array<unknown> | unknown | null>>;
  }
}

export interface ScoringScoreBatchResponse {
  results: Record<string, ScoringScoreBatchResponse.Results>;

  dataset_id?: string;
}

export namespace ScoringScoreBatchResponse {
  /**
   * A scoring result for a single row.
   */
  export interface Results {
    /**
     * Map of metric name to aggregated value
     */
    aggregated_results: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

    /**
     * The scoring result for each row. Each row is a map of column name to value.
     */
    score_rows: Array<Record<string, boolean | number | string | Array<unknown> | unknown | null>>;
  }
}

export interface ScoringScoreParams {
  /**
   * The rows to score.
   */
  input_rows: Array<Record<string, boolean | number | string | Array<unknown> | unknown | null>>;

  /**
   * The scoring functions to use for the scoring.
   */
  scoring_functions: Record<string, ScoringFunctionsAPI.ScoringFnParams | null>;
}

export interface ScoringScoreBatchParams {
  dataset_id: string;

  save_results_dataset: boolean;

  scoring_functions: Record<string, ScoringFunctionsAPI.ScoringFnParams | null>;
}

export declare namespace Scoring {
  export {
    type ScoringScoreResponse as ScoringScoreResponse,
    type ScoringScoreBatchResponse as ScoringScoreBatchResponse,
    type ScoringScoreParams as ScoringScoreParams,
    type ScoringScoreBatchParams as ScoringScoreBatchParams,
  };
}
