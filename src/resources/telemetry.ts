// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Telemetry extends APIResource {
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
  data: Array<QuerySpansResponse.Data>;
}

export namespace QuerySpansResponse {
  /**
   * A span representing a single operation within a trace.
   */
  export interface Data {
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

export declare namespace Telemetry {
  export {
    type Event as Event,
    type QueryCondition as QueryCondition,
    type QuerySpansResponse as QuerySpansResponse,
    type SpanWithStatus as SpanWithStatus,
    type Trace as Trace,
    type TelemetryLogEventParams as TelemetryLogEventParams,
  };
}
