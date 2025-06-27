// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ScoringFunctionsAPI from './scoring-functions';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class ScoringFunctions extends APIResource {
  create(body: ScoringFunctionCreateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/scoring-functions', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  retrieve(scoringFnID: string, options?: RequestOptions): APIPromise<ScoringFn> {
    return this._client.get(path`/v1/scoring-functions/${scoringFnID}`, options);
  }

  list(options?: RequestOptions): APIPromise<ScoringFunctionListResponse> {
    return this._client.get('/v1/scoring-functions', options);
  }
}

export type AggregationFunctionType =
  | 'average'
  | 'weighted_average'
  | 'median'
  | 'categorical_count'
  | 'accuracy';

export type ParamType =
  | ParamType.StringType
  | ParamType.NumberType
  | ParamType.BooleanType
  | ParamType.ArrayType
  | ParamType.ObjectType
  | ParamType.JsonType
  | ParamType.UnionType
  | ParamType.ChatCompletionInputType
  | ParamType.CompletionInputType
  | ParamType.AgentTurnInputType;

export namespace ParamType {
  export interface StringType {
    type: 'string';
  }

  export interface NumberType {
    type: 'number';
  }

  export interface BooleanType {
    type: 'boolean';
  }

  export interface ArrayType {
    type: 'array';
  }

  export interface ObjectType {
    type: 'object';
  }

  export interface JsonType {
    type: 'json';
  }

  export interface UnionType {
    type: 'union';
  }

  export interface ChatCompletionInputType {
    type: 'chat_completion_input';
  }

  export interface CompletionInputType {
    type: 'completion_input';
  }

  export interface AgentTurnInputType {
    type: 'agent_turn_input';
  }
}

export interface ScoringFn {
  identifier: string;

  metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  provider_id: string;

  return_type: ParamType;

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
    aggregation_functions: Array<ScoringFunctionsAPI.AggregationFunctionType>;

    judge_model: string;

    judge_score_regexes: Array<string>;

    type: ScoringFunctionsAPI.ScoringFnParamsType;

    prompt_template?: string;
  }

  export interface RegexParserScoringFnParams {
    aggregation_functions: Array<ScoringFunctionsAPI.AggregationFunctionType>;

    parsing_regexes: Array<string>;

    type: ScoringFunctionsAPI.ScoringFnParamsType;
  }

  export interface BasicScoringFnParams {
    aggregation_functions: Array<ScoringFunctionsAPI.AggregationFunctionType>;

    type: ScoringFunctionsAPI.ScoringFnParamsType;
  }
}

export type ScoringFnParamsType = 'llm_as_judge' | 'regex_parser' | 'basic';

export interface ScoringFunctionListResponse {
  data: Array<ScoringFn>;
}

export interface ScoringFunctionCreateParams {
  description: string;

  return_type: ParamType;

  scoring_fn_id: string;

  params?: ScoringFnParams;

  provider_id?: string;

  provider_scoring_fn_id?: string;
}

export declare namespace ScoringFunctions {
  export {
    type AggregationFunctionType as AggregationFunctionType,
    type ParamType as ParamType,
    type ScoringFn as ScoringFn,
    type ScoringFnParams as ScoringFnParams,
    type ScoringFnParamsType as ScoringFnParamsType,
    type ScoringFunctionListResponse as ScoringFunctionListResponse,
    type ScoringFunctionCreateParams as ScoringFunctionCreateParams,
  };
}
