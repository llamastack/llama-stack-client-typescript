// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as ScoringFunctionsAPI from './scoring-functions';
import * as Shared from './shared';

export class Scoring extends APIResource {
  /**
   * Score a list of rows.
   */
  score(body: ScoringScoreParams, options?: Core.RequestOptions): Core.APIPromise<ScoringScoreResponse> {
    return this._client.post('/v1/scoring/score', { body, ...options });
  }

  /**
   * Score a batch of rows.
   */
  scoreBatch(
    body: ScoringScoreBatchParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ScoringScoreBatchResponse> {
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
  results: { [key: string]: Shared.ScoringResult };
}

/**
 * Response from batch scoring operations on datasets.
 */
export interface ScoringScoreBatchResponse {
  /**
   * A map of scoring function name to ScoringResult
   */
  results: { [key: string]: Shared.ScoringResult };

  /**
   * (Optional) The identifier of the dataset that was scored
   */
  dataset_id?: string;
}

export interface ScoringScoreParams {
  /**
   * The rows to score.
   */
  input_rows: Array<{ [key: string]: boolean | number | string | Array<unknown> | unknown | null }>;

  /**
   * The scoring functions to use for the scoring.
   */
  scoring_functions: { [key: string]: ScoringFunctionsAPI.ScoringFnParams | null };
}

export interface ScoringScoreBatchParams {
  /**
   * The ID of the dataset to score.
   */
  dataset_id: string;

  /**
   * Whether to save the results to a dataset.
   */
  save_results_dataset: boolean;

  /**
   * The scoring functions to use for the scoring.
   */
  scoring_functions: { [key: string]: ScoringFunctionsAPI.ScoringFnParams | null };
}

export declare namespace Scoring {
  export {
    type ScoringScoreResponse as ScoringScoreResponse,
    type ScoringScoreBatchResponse as ScoringScoreBatchResponse,
    type ScoringScoreParams as ScoringScoreParams,
    type ScoringScoreBatchParams as ScoringScoreBatchParams,
  };
}
