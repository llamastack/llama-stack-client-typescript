// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import * as TurnAPI from './turn';

export class SessionResource extends APIResource {
  /**
   * Create a new session for an agent.
   */
  create(
    agentId: string,
    body: SessionCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SessionCreateResponse> {
    return this._client.post(`/v1/agents/${agentId}/session`, { body, ...options });
  }

  /**
   * Retrieve an agent session by its ID.
   */
  retrieve(
    agentId: string,
    sessionId: string,
    query?: SessionRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Session>;
  retrieve(agentId: string, sessionId: string, options?: Core.RequestOptions): Core.APIPromise<Session>;
  retrieve(
    agentId: string,
    sessionId: string,
    query: SessionRetrieveParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Session> {
    if (isRequestOptions(query)) {
      return this.retrieve(agentId, sessionId, {}, query);
    }
    return this._client.get(`/v1/agents/${agentId}/session/${sessionId}`, { query, ...options });
  }

  /**
   * List all session(s) of a given agent.
   */
  list(
    agentId: string,
    query?: SessionListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SessionListResponse>;
  list(agentId: string, options?: Core.RequestOptions): Core.APIPromise<SessionListResponse>;
  list(
    agentId: string,
    query: SessionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<SessionListResponse> {
    if (isRequestOptions(query)) {
      return this.list(agentId, {}, query);
    }
    return this._client.get(`/v1/agents/${agentId}/sessions`, { query, ...options });
  }

  /**
   * Delete an agent session by its ID and its associated turns.
   */
  delete(agentId: string, sessionId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/agents/${agentId}/session/${sessionId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

/**
 * A single session of an interaction with an Agentic System.
 */
export interface Session {
  /**
   * Unique identifier for the conversation session
   */
  session_id: string;

  /**
   * Human-readable name for the session
   */
  session_name: string;

  /**
   * Timestamp when the session was created
   */
  started_at: string;

  /**
   * List of all turns that have occurred in this session
   */
  turns: Array<TurnAPI.Turn>;
}

/**
 * Response returned when creating a new agent session.
 */
export interface SessionCreateResponse {
  /**
   * Unique identifier for the created session
   */
  session_id: string;
}

/**
 * A generic paginated response that follows a simple format.
 */
export interface SessionListResponse {
  /**
   * The list of items for the current page
   */
  data: Array<{ [key: string]: boolean | number | string | Array<unknown> | unknown | null }>;

  /**
   * Whether there are more items available after this set
   */
  has_more: boolean;

  /**
   * The URL for accessing this list
   */
  url?: string;
}

export interface SessionCreateParams {
  /**
   * The name of the session to create.
   */
  session_name: string;
}

export interface SessionRetrieveParams {
  /**
   * (Optional) List of turn IDs to filter the session by.
   */
  turn_ids?: Array<string>;
}

export interface SessionListParams {
  /**
   * The number of sessions to return.
   */
  limit?: number;

  /**
   * The index to start the pagination from.
   */
  start_index?: number;
}

export declare namespace SessionResource {
  export {
    type Session as Session,
    type SessionCreateResponse as SessionCreateResponse,
    type SessionListResponse as SessionListResponse,
    type SessionCreateParams as SessionCreateParams,
    type SessionRetrieveParams as SessionRetrieveParams,
    type SessionListParams as SessionListParams,
  };
}
