// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TracesAPI from './traces';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Spans extends APIResource {
  create(body: SpanCreateParams, options?: RequestOptions): APIPromise<SpanCreateResponse> {
    return this._client.post('/v1/telemetry/spans', { body, ...options });
  }

  buildTree(
    spanID: string,
    body: SpanBuildTreeParams,
    options?: RequestOptions,
  ): APIPromise<SpanBuildTreeResponse> {
    return this._client.post(path`/v1/telemetry/spans/${spanID}/tree`, { body, ...options });
  }

  export(body: SpanExportParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/telemetry/spans/export', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface QueryCondition {
  key: string;

  op: 'eq' | 'ne' | 'gt' | 'lt';

  value: boolean | number | string | Array<unknown> | unknown | null;
}

export interface SpanCreateResponse {
  data: Array<TracesAPI.Span>;
}

export interface SpanBuildTreeResponse {
  data: { [key: string]: SpanBuildTreeResponse.Data };
}

export namespace SpanBuildTreeResponse {
  export interface Data {
    name: string;

    span_id: string;

    start_time: string;

    trace_id: string;

    attributes?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

    end_time?: string;

    parent_span_id?: string;

    status?: 'ok' | 'error';
  }
}

export interface SpanCreateParams {
  attribute_filters: Array<QueryCondition>;

  attributes_to_return: Array<string>;

  max_depth?: number;
}

export interface SpanBuildTreeParams {
  attributes_to_return?: Array<string>;

  max_depth?: number;
}

export interface SpanExportParams {
  attribute_filters: Array<QueryCondition>;

  attributes_to_save: Array<string>;

  dataset_id: string;

  max_depth?: number;
}

export declare namespace Spans {
  export {
    type QueryCondition as QueryCondition,
    type SpanCreateResponse as SpanCreateResponse,
    type SpanBuildTreeResponse as SpanBuildTreeResponse,
    type SpanCreateParams as SpanCreateParams,
    type SpanBuildTreeParams as SpanBuildTreeParams,
    type SpanExportParams as SpanExportParams,
  };
}
