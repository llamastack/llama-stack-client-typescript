// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TelemetryAPI from './telemetry';
import * as SpansAPI from './spans';
import {
  QueryCondition,
  SpanBuildTreeParams,
  SpanBuildTreeResponse,
  SpanCreateParams,
  SpanCreateResponse,
  SpanExportParams,
  Spans,
} from './spans';
import * as TracesAPI from './traces';
import {
  Span,
  Trace,
  TraceCreateParams,
  TraceCreateResponse,
  TraceRetrieveSpanParams,
  Traces,
} from './traces';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Telemetry extends APIResource {
  traces: TracesAPI.Traces = new TracesAPI.Traces(this._client);
  spans: SpansAPI.Spans = new SpansAPI.Spans(this._client);

  createEvent(body: TelemetryCreateEventParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/telemetry/events', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type EventType = 'unstructured_log' | 'structured_log' | 'metric';

export type StructuredLogType = 'span_start' | 'span_end';

export interface TelemetryCreateEventParams {
  event:
    | TelemetryCreateEventParams.UnstructuredLogEvent
    | TelemetryCreateEventParams.MetricEvent
    | TelemetryCreateEventParams.StructuredLogEvent;

  ttl_seconds: number;
}

export namespace TelemetryCreateEventParams {
  export interface UnstructuredLogEvent {
    message: string;

    severity: 'verbose' | 'debug' | 'info' | 'warn' | 'error' | 'critical';

    span_id: string;

    timestamp: string;

    trace_id: string;

    type: TelemetryAPI.EventType;

    attributes?: Record<string, string | number | boolean | null>;
  }

  export interface MetricEvent {
    metric: string;

    span_id: string;

    timestamp: string;

    trace_id: string;

    type: TelemetryAPI.EventType;

    unit: string;

    value: number;

    attributes?: Record<string, string | number | boolean | null>;
  }

  export interface StructuredLogEvent {
    payload: StructuredLogEvent.SpanStartPayload | StructuredLogEvent.SpanEndPayload;

    span_id: string;

    timestamp: string;

    trace_id: string;

    type: TelemetryAPI.EventType;

    attributes?: Record<string, string | number | boolean | null>;
  }

  export namespace StructuredLogEvent {
    export interface SpanStartPayload {
      name: string;

      type: TelemetryAPI.StructuredLogType;

      parent_span_id?: string;
    }

    export interface SpanEndPayload {
      status: 'ok' | 'error';

      type: TelemetryAPI.StructuredLogType;
    }
  }
}

Telemetry.Traces = Traces;
Telemetry.Spans = Spans;

export declare namespace Telemetry {
  export {
    type EventType as EventType,
    type StructuredLogType as StructuredLogType,
    type TelemetryCreateEventParams as TelemetryCreateEventParams,
  };

  export {
    Traces as Traces,
    type Span as Span,
    type Trace as Trace,
    type TraceCreateResponse as TraceCreateResponse,
    type TraceCreateParams as TraceCreateParams,
    type TraceRetrieveSpanParams as TraceRetrieveSpanParams,
  };

  export {
    Spans as Spans,
    type QueryCondition as QueryCondition,
    type SpanCreateResponse as SpanCreateResponse,
    type SpanBuildTreeResponse as SpanBuildTreeResponse,
    type SpanCreateParams as SpanCreateParams,
    type SpanBuildTreeParams as SpanBuildTreeParams,
    type SpanExportParams as SpanExportParams,
  };
}
