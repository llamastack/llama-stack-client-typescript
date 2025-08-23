// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Telemetry extends APIResource {
  /**
   * Get a span by its ID.
   */
  getSpan(
    traceId: string,
    spanId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TelemetryGetSpanResponse> {
    return this._client.get(`/v1/telemetry/traces/${traceId}/spans/${spanId}`, options);
  }

  /**
   * Get a span tree by its ID.
   */
  getSpanTree(
    spanId: string,
    body: TelemetryGetSpanTreeParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TelemetryGetSpanTreeResponse> {
    return (
      this._client.post(`/v1/telemetry/spans/${spanId}/tree`, { body, ...options }) as Core.APIPromise<{
        data: TelemetryGetSpanTreeResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Get a trace by its ID.
   */
  getTrace(traceId: string, options?: Core.RequestOptions): Core.APIPromise<Trace> {
    return this._client.get(`/v1/telemetry/traces/${traceId}`, options);
  }

  /**
   * Log an event.
   */
  logEvent(body: TelemetryLogEventParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/telemetry/events', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Query metrics.
   */
  queryMetrics(
    metricName: string,
    body: TelemetryQueryMetricsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TelemetryQueryMetricsResponse> {
    return (
      this._client.post(`/v1/telemetry/metrics/${metricName}`, { body, ...options }) as Core.APIPromise<{
        data: TelemetryQueryMetricsResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Query spans.
   */
  querySpans(
    body: TelemetryQuerySpansParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TelemetryQuerySpansResponse> {
    return (
      this._client.post('/v1/telemetry/spans', { body, ...options }) as Core.APIPromise<{
        data: TelemetryQuerySpansResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Query traces.
   */
  queryTraces(
    body: TelemetryQueryTracesParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TelemetryQueryTracesResponse> {
    return (
      this._client.post('/v1/telemetry/traces', { body, ...options }) as Core.APIPromise<{
        data: TelemetryQueryTracesResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Save spans to a dataset.
   */
  saveSpansToDataset(
    body: TelemetrySaveSpansToDatasetParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<void> {
    return this._client.post('/v1/telemetry/spans/export', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

/**
 * An unstructured log event containing a simple text message.
 */
export type Event = Event.UnstructuredLogEvent | Event.MetricEvent | Event.StructuredLogEvent;

export namespace Event {
  /**
   * An unstructured log event containing a simple text message.
   */
  export interface UnstructuredLogEvent {
    /**
     * The log message text
     */
    message: string;

    /**
     * The severity level of the log message
     */
    severity: 'verbose' | 'debug' | 'info' | 'warn' | 'error' | 'critical';

    /**
     * Unique identifier for the span this event belongs to
     */
    span_id: string;

    /**
     * Timestamp when the event occurred
     */
    timestamp: string;

    /**
     * Unique identifier for the trace this event belongs to
     */
    trace_id: string;

    /**
     * Event type identifier set to UNSTRUCTURED_LOG
     */
    type: 'unstructured_log';

    /**
     * (Optional) Key-value pairs containing additional metadata about the event
     */
    attributes?: { [key: string]: string | number | boolean | null };
  }

  /**
   * A metric event containing a measured value.
   */
  export interface MetricEvent {
    /**
     * The name of the metric being measured
     */
    metric: string;

    /**
     * Unique identifier for the span this event belongs to
     */
    span_id: string;

    /**
     * Timestamp when the event occurred
     */
    timestamp: string;

    /**
     * Unique identifier for the trace this event belongs to
     */
    trace_id: string;

    /**
     * Event type identifier set to METRIC
     */
    type: 'metric';

    /**
     * The unit of measurement for the metric value
     */
    unit: string;

    /**
     * The numeric value of the metric measurement
     */
    value: number;

    /**
     * (Optional) Key-value pairs containing additional metadata about the event
     */
    attributes?: { [key: string]: string | number | boolean | null };
  }

  /**
   * A structured log event containing typed payload data.
   */
  export interface StructuredLogEvent {
    /**
     * The structured payload data for the log event
     */
    payload: StructuredLogEvent.SpanStartPayload | StructuredLogEvent.SpanEndPayload;

    /**
     * Unique identifier for the span this event belongs to
     */
    span_id: string;

    /**
     * Timestamp when the event occurred
     */
    timestamp: string;

    /**
     * Unique identifier for the trace this event belongs to
     */
    trace_id: string;

    /**
     * Event type identifier set to STRUCTURED_LOG
     */
    type: 'structured_log';

    /**
     * (Optional) Key-value pairs containing additional metadata about the event
     */
    attributes?: { [key: string]: string | number | boolean | null };
  }

  export namespace StructuredLogEvent {
    /**
     * Payload for a span start event.
     */
    export interface SpanStartPayload {
      /**
       * Human-readable name describing the operation this span represents
       */
      name: string;

      /**
       * Payload type identifier set to SPAN_START
       */
      type: 'span_start';

      /**
       * (Optional) Unique identifier for the parent span, if this is a child span
       */
      parent_span_id?: string;
    }

    /**
     * Payload for a span end event.
     */
    export interface SpanEndPayload {
      /**
       * The final status of the span indicating success or failure
       */
      status: 'ok' | 'error';

      /**
       * Payload type identifier set to SPAN_END
       */
      type: 'span_end';
    }
  }
}

/**
 * A condition for filtering query results.
 */
export interface QueryCondition {
  /**
   * The attribute key to filter on
   */
  key: string;

  /**
   * The comparison operator to apply
   */
  op: 'eq' | 'ne' | 'gt' | 'lt';

  /**
   * The value to compare against
   */
  value: boolean | number | string | Array<unknown> | unknown | null;
}

/**
 * Response containing a list of spans.
 */
export interface QuerySpansResponse {
  /**
   * List of spans matching the query criteria
   */
  data: TelemetryQuerySpansResponse;
}

/**
 * A span that includes status information.
 */
export interface SpanWithStatus {
  /**
   * Human-readable name describing the operation this span represents
   */
  name: string;

  /**
   * Unique identifier for the span
   */
  span_id: string;

  /**
   * Timestamp when the operation began
   */
  start_time: string;

  /**
   * Unique identifier for the trace this span belongs to
   */
  trace_id: string;

  /**
   * (Optional) Key-value pairs containing additional metadata about the span
   */
  attributes?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * (Optional) Timestamp when the operation finished, if completed
   */
  end_time?: string;

  /**
   * (Optional) Unique identifier for the parent span, if this is a child span
   */
  parent_span_id?: string;

  /**
   * (Optional) The current status of the span
   */
  status?: 'ok' | 'error';
}

/**
 * A trace representing the complete execution path of a request across multiple
 * operations.
 */
export interface Trace {
  /**
   * Unique identifier for the root span that started this trace
   */
  root_span_id: string;

  /**
   * Timestamp when the trace began
   */
  start_time: string;

  /**
   * Unique identifier for the trace
   */
  trace_id: string;

  /**
   * (Optional) Timestamp when the trace finished, if completed
   */
  end_time?: string;
}

/**
 * A span representing a single operation within a trace.
 */
export interface TelemetryGetSpanResponse {
  /**
   * Human-readable name describing the operation this span represents
   */
  name: string;

  /**
   * Unique identifier for the span
   */
  span_id: string;

  /**
   * Timestamp when the operation began
   */
  start_time: string;

  /**
   * Unique identifier for the trace this span belongs to
   */
  trace_id: string;

  /**
   * (Optional) Key-value pairs containing additional metadata about the span
   */
  attributes?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * (Optional) Timestamp when the operation finished, if completed
   */
  end_time?: string;

  /**
   * (Optional) Unique identifier for the parent span, if this is a child span
   */
  parent_span_id?: string;
}

/**
 * Dictionary mapping span IDs to spans with status information
 */
export type TelemetryGetSpanTreeResponse = { [key: string]: SpanWithStatus };

/**
 * List of metric series matching the query criteria
 */
export type TelemetryQueryMetricsResponse =
  Array<TelemetryQueryMetricsResponse.TelemetryQueryMetricsResponseItem>;

export namespace TelemetryQueryMetricsResponse {
  /**
   * A time series of metric data points.
   */
  export interface TelemetryQueryMetricsResponseItem {
    /**
     * List of labels associated with this metric series
     */
    labels: Array<TelemetryQueryMetricsResponseItem.Label>;

    /**
     * The name of the metric
     */
    metric: string;

    /**
     * List of data points in chronological order
     */
    values: Array<TelemetryQueryMetricsResponseItem.Value>;
  }

  export namespace TelemetryQueryMetricsResponseItem {
    /**
     * A label associated with a metric.
     */
    export interface Label {
      /**
       * The name of the label
       */
      name: string;

      /**
       * The value of the label
       */
      value: string;
    }

    /**
     * A single data point in a metric time series.
     */
    export interface Value {
      /**
       * Unix timestamp when the metric value was recorded
       */
      timestamp: number;

      unit: string;

      /**
       * The numeric value of the metric at this timestamp
       */
      value: number;
    }
  }
}

/**
 * List of spans matching the query criteria
 */
export type TelemetryQuerySpansResponse = Array<TelemetryQuerySpansResponse.TelemetryQuerySpansResponseItem>;

export namespace TelemetryQuerySpansResponse {
  /**
   * A span representing a single operation within a trace.
   */
  export interface TelemetryQuerySpansResponseItem {
    /**
     * Human-readable name describing the operation this span represents
     */
    name: string;

    /**
     * Unique identifier for the span
     */
    span_id: string;

    /**
     * Timestamp when the operation began
     */
    start_time: string;

    /**
     * Unique identifier for the trace this span belongs to
     */
    trace_id: string;

    /**
     * (Optional) Key-value pairs containing additional metadata about the span
     */
    attributes?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

    /**
     * (Optional) Timestamp when the operation finished, if completed
     */
    end_time?: string;

    /**
     * (Optional) Unique identifier for the parent span, if this is a child span
     */
    parent_span_id?: string;
  }
}

/**
 * List of traces matching the query criteria
 */
export type TelemetryQueryTracesResponse = Array<Trace>;

export interface TelemetryGetSpanTreeParams {
  /**
   * The attributes to return in the tree.
   */
  attributes_to_return?: Array<string>;

  /**
   * The maximum depth of the tree.
   */
  max_depth?: number;
}

export interface TelemetryLogEventParams {
  /**
   * The event to log.
   */
  event: Event;

  /**
   * The time to live of the event.
   */
  ttl_seconds: number;
}

export interface TelemetryQueryMetricsParams {
  /**
   * The type of query to perform.
   */
  query_type: 'range' | 'instant';

  /**
   * The start time of the metric to query.
   */
  start_time: number;

  /**
   * The end time of the metric to query.
   */
  end_time?: number;

  /**
   * The granularity of the metric to query.
   */
  granularity?: string;

  /**
   * The label matchers to apply to the metric.
   */
  label_matchers?: Array<TelemetryQueryMetricsParams.LabelMatcher>;
}

export namespace TelemetryQueryMetricsParams {
  /**
   * A matcher for filtering metrics by label values.
   */
  export interface LabelMatcher {
    /**
     * The name of the label to match
     */
    name: string;

    /**
     * The comparison operator to use for matching
     */
    operator: '=' | '!=' | '=~' | '!~';

    /**
     * The value to match against
     */
    value: string;
  }
}

export interface TelemetryQuerySpansParams {
  /**
   * The attribute filters to apply to the spans.
   */
  attribute_filters: Array<QueryCondition>;

  /**
   * The attributes to return in the spans.
   */
  attributes_to_return: Array<string>;

  /**
   * The maximum depth of the tree.
   */
  max_depth?: number;
}

export interface TelemetryQueryTracesParams {
  /**
   * The attribute filters to apply to the traces.
   */
  attribute_filters?: Array<QueryCondition>;

  /**
   * The limit of traces to return.
   */
  limit?: number;

  /**
   * The offset of the traces to return.
   */
  offset?: number;

  /**
   * The order by of the traces to return.
   */
  order_by?: Array<string>;
}

export interface TelemetrySaveSpansToDatasetParams {
  /**
   * The attribute filters to apply to the spans.
   */
  attribute_filters: Array<QueryCondition>;

  /**
   * The attributes to save to the dataset.
   */
  attributes_to_save: Array<string>;

  /**
   * The ID of the dataset to save the spans to.
   */
  dataset_id: string;

  /**
   * The maximum depth of the tree.
   */
  max_depth?: number;
}

export declare namespace Telemetry {
  export {
    type Event as Event,
    type QueryCondition as QueryCondition,
    type QuerySpansResponse as QuerySpansResponse,
    type SpanWithStatus as SpanWithStatus,
    type Trace as Trace,
    type TelemetryGetSpanResponse as TelemetryGetSpanResponse,
    type TelemetryGetSpanTreeResponse as TelemetryGetSpanTreeResponse,
    type TelemetryQueryMetricsResponse as TelemetryQueryMetricsResponse,
    type TelemetryQuerySpansResponse as TelemetryQuerySpansResponse,
    type TelemetryQueryTracesResponse as TelemetryQueryTracesResponse,
    type TelemetryGetSpanTreeParams as TelemetryGetSpanTreeParams,
    type TelemetryLogEventParams as TelemetryLogEventParams,
    type TelemetryQueryMetricsParams as TelemetryQueryMetricsParams,
    type TelemetryQuerySpansParams as TelemetryQuerySpansParams,
    type TelemetryQueryTracesParams as TelemetryQueryTracesParams,
    type TelemetrySaveSpansToDatasetParams as TelemetrySaveSpansToDatasetParams,
  };
}
