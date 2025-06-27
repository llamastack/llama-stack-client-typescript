// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
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
  session_id: string;

  session_name: string;

  started_at: string;

  turns: Array<TurnAPI.Turn>;
}

export interface SessionCreateResponse {
  session_id: string;
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

export declare namespace SessionResource {
  export {
    type Session as Session,
    type SessionCreateResponse as SessionCreateResponse,
    type SessionCreateParams as SessionCreateParams,
    type SessionRetrieveParams as SessionRetrieveParams,
  };
}
