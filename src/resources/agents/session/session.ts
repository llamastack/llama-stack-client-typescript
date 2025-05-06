// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as TurnAPI from './turn/turn';
import {
  AgentTool,
  InferenceStep,
  MemoryRetrievalStep,
  ShieldCallStep,
  ToolExecutionStep,
  ToolResponse,
  ToolResponseMessage,
  Turn,
  TurnCreateParams,
  TurnResource,
  TurnResumeParams,
  TurnRetrieveParams,
  UserMessage,
} from './turn/turn';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class SessionResource extends APIResource {
  turn: TurnAPI.TurnResource = new TurnAPI.TurnResource(this._client);

  /**
   * Create a new session for an agent.
   */
  create(
    agentID: string,
    body: SessionCreateParams,
    options?: RequestOptions,
  ): APIPromise<SessionCreateResponse> {
    return this._client.post(path`/v1/agents/${agentID}/session`, { body, ...options });
  }

  /**
   * Retrieve an agent session by its ID.
   */
  retrieve(sessionID: string, params: SessionRetrieveParams, options?: RequestOptions): APIPromise<Session> {
    const { agent_id, ...query } = params;
    return this._client.get(path`/v1/agents/${agent_id}/session/${sessionID}`, { query, ...options });
  }

  /**
   * Delete an agent session by its ID.
   */
  delete(sessionID: string, params: SessionDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { agent_id } = params;
    return this._client.delete(path`/v1/agents/${agent_id}/session/${sessionID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
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
   * Path param: The ID of the agent to get the session for.
   */
  agent_id: string;

  /**
   * Query param: (Optional) List of turn IDs to filter the session by.
   */
  turn_ids?: Array<string>;
}

export interface SessionDeleteParams {
  /**
   * The ID of the agent to delete the session for.
   */
  agent_id: string;
}

SessionResource.TurnResource = TurnResource;

export declare namespace SessionResource {
  export {
    type Session as Session,
    type SessionCreateResponse as SessionCreateResponse,
    type SessionCreateParams as SessionCreateParams,
    type SessionRetrieveParams as SessionRetrieveParams,
    type SessionDeleteParams as SessionDeleteParams,
  };

  export {
    TurnResource as TurnResource,
    type AgentTool as AgentTool,
    type InferenceStep as InferenceStep,
    type MemoryRetrievalStep as MemoryRetrievalStep,
    type ShieldCallStep as ShieldCallStep,
    type ToolExecutionStep as ToolExecutionStep,
    type ToolResponse as ToolResponse,
    type ToolResponseMessage as ToolResponseMessage,
    type Turn as Turn,
    type UserMessage as UserMessage,
    type TurnCreateParams as TurnCreateParams,
    type TurnRetrieveParams as TurnRetrieveParams,
    type TurnResumeParams as TurnResumeParams,
  };
}
