// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class ScoringFunctions extends APIResource {
  /**
   * Get a scoring function by its ID.
   */
  retrieve(scoringFnId: string, options?: Core.RequestOptions): Core.APIPromise<ScoringFn> {
    return this._client.get(`/v1/scoring-functions/${scoringFnId}`, options);
  }

  /**
   * List all scoring functions.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ScoringFunctionListResponse> {
    return (
      this._client.get('/v1/scoring-functions', options) as Core.APIPromise<{
        data: ScoringFunctionListResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Register a scoring function.
   */
  register(body: ScoringFunctionRegisterParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/scoring-functions', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface ListScoringFunctionsResponse {
  data: ScoringFunctionListResponse;
}

export interface ScoringFn {
  identifier: string;

  metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  provider_id: string;

  return_type: Shared.ReturnType;

  type: 'scoring_function';

  description?: string;

  params?: ScoringFnParams;

  provider_resource_id?: string;
}

export type ScoringFnParams =
  | ScoringFnParams.LlmAsJudgeScoringFnParams
  | ScoringFnParams.RegexParserScoringFnParams
  | ScoringFnParams.BasicScoringFnParams;

export namespace ScoringFnParams {
  export interface LlmAsJudgeScoringFnParams {
    aggregation_functions: Array<
      'average' | 'weighted_average' | 'median' | 'categorical_count' | 'accuracy'
    >;

    judge_model: string;

    judge_score_regexes: Array<string>;

    type: 'llm_as_judge';

    prompt_template?: string;
  }

  export interface RegexParserScoringFnParams {
    aggregation_functions: Array<
      'average' | 'weighted_average' | 'median' | 'categorical_count' | 'accuracy'
    >;

    parsing_regexes: Array<string>;

    type: 'regex_parser';
  }

  export interface BasicScoringFnParams {
    aggregation_functions: Array<
      'average' | 'weighted_average' | 'median' | 'categorical_count' | 'accuracy'
    >;

    type: 'basic';
  }
}

export type ScoringFunctionListResponse = Array<ScoringFn>;

export interface ScoringFunctionRegisterParams {
  /**
   * The description of the scoring function.
   */
  description: string;

  return_type: Shared.ReturnType;

  /**
   * The ID of the scoring function to register.
   */
  scoring_fn_id: string;

  /**
   * The parameters for the scoring function for benchmark eval, these can be
   * overridden for app eval.
   */
  params?: ScoringFnParams;

  /**
   * The ID of the provider to use for the scoring function.
   */
  provider_id?: string;

  /**
   * The ID of the provider scoring function to use for the scoring function.
   */
  provider_scoring_fn_id?: string;
}

export declare namespace ScoringFunctions {
  export {
    type ListScoringFunctionsResponse as ListScoringFunctionsResponse,
    type ScoringFn as ScoringFn,
    type ScoringFnParams as ScoringFnParams,
    type ScoringFunctionListResponse as ScoringFunctionListResponse,
    type ScoringFunctionRegisterParams as ScoringFunctionRegisterParams,
  };
}
