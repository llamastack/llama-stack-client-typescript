// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SpansAPI from './spans';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Traces extends APIResource {
  create(body: TraceCreateParams, options?: RequestOptions): APIPromise<TraceCreateResponse> {
    return this._client.post('/v1/telemetry/traces', { body, ...options });
  }

  retrieveSpan(spanID: string, params: TraceRetrieveSpanParams, options?: RequestOptions): APIPromise<Span> {
    const { trace_id } = params;
    return this._client.get(path`/v1/telemetry/traces/${trace_id}/spans/${spanID}`, options);
  }

  retrieveTrace(traceID: string, options?: RequestOptions): APIPromise<Trace> {
    return this._client.get(path`/v1/telemetry/traces/${traceID}`, options);
  }
}

export interface Span {
  name: string;

  span_id: string;

  start_time: string;

  trace_id: string;

  attributes?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  end_time?: string;

  parent_span_id?: string;
}

export interface Trace {
  root_span_id: string;

  start_time: string;

  trace_id: string;

  end_time?: string;
}

export interface TraceCreateResponse {
  data: Array<Trace>;
}

export interface TraceCreateParams {
  attribute_filters?: Array<SpansAPI.QueryCondition>;

  limit?: number;

  offset?: number;

  order_by?: Array<string>;
}

export interface TraceRetrieveSpanParams {
  trace_id: string;
}

export declare namespace Traces {
  export {
    type Span as Span,
    type Trace as Trace,
    type TraceCreateResponse as TraceCreateResponse,
    type TraceCreateParams as TraceCreateParams,
    type TraceRetrieveSpanParams as TraceRetrieveSpanParams,
  };
}
