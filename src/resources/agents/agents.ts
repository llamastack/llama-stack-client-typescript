// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InferenceAPI from '../inference';
import * as ToolRuntimeAPI from '../tool-runtime/tool-runtime';
import * as SessionAPI from './session/session';
import {
  Session,
  SessionCreateParams,
  SessionCreateResponse,
  SessionDeleteParams,
  SessionResource,
  SessionRetrieveParams,
} from './session/session';
import * as TurnAPI from './session/turn/turn';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Agents extends APIResource {
  session: SessionAPI.SessionResource = new SessionAPI.SessionResource(this._client);

  /**
   * Create an agent with the given configuration.
   */
  create(body: AgentCreateParams, options?: RequestOptions): APIPromise<AgentCreateResponse> {
    return this._client.post('/v1/agents', { body, ...options });
  }

  /**
   * Describe an agent by its ID.
   */
  retrieve(agentID: string, options?: RequestOptions): APIPromise<Agent> {
    return this._client.get(path`/v1/agents/${agentID}`, options);
  }

  /**
   * List all agents.
   */
  list(options?: RequestOptions): APIPromise<AgentListResponse> {
    return this._client.get('/v1/agents', options);
  }

  /**
   * Delete an agent by its ID.
   */
  delete(agentID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/agents/${agentID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * List all session(s) of a given agent.
   */
  listSessions(agentID: string, options?: RequestOptions): APIPromise<AgentListSessionsResponse> {
    return this._client.get(path`/v1/agents/${agentID}/sessions`, options);
  }
}

export interface Agent {
  /**
   * Configuration for an agent.
   */
  agent_config: AgentConfig;

  agent_id: string;

  created_at: string;
}

/**
 * Configuration for an agent.
 */
export interface AgentConfig {
  /**
   * The system instructions for the agent
   */
  instructions: string;

  /**
   * The model identifier to use for the agent
   */
  model: string;

  client_tools?: Array<ToolRuntimeAPI.ToolDef>;

  /**
   * Optional flag indicating whether session data has to be persisted
   */
  enable_session_persistence?: boolean;

  input_shields?: Array<string>;

  max_infer_iters?: number;

  /**
   * Optional name for the agent, used in telemetry and identification
   */
  name?: string;

  output_shields?: Array<string>;

  /**
   * Optional response format configuration
   */
  response_format?: InferenceAPI.ResponseFormat;

  /**
   * Sampling parameters.
   */
  sampling_params?: InferenceAPI.SamplingParams;

  /**
   * @deprecated Whether tool use is required or automatic. This is a hint to the
   * model which may not be followed. It depends on the Instruction Following
   * capabilities of the model.
   */
  tool_choice?: 'auto' | 'required' | 'none';

  /**
   * Configuration for tool use.
   */
  tool_config?: InferenceAPI.ToolConfig;

  /**
   * @deprecated Prompt format for calling custom / zero shot tools.
   */
  tool_prompt_format?: 'json' | 'function_tag' | 'python_list';

  toolgroups?: Array<TurnAPI.AgentTool>;
}

export interface AgentCreateResponse {
  agent_id: string;
}

export interface AgentListResponse {
  data: Array<Agent>;
}

export interface AgentListSessionsResponse {
  data: Array<SessionAPI.Session>;
}

export interface AgentCreateParams {
  /**
   * The configuration for the agent.
   */
  agent_config: AgentConfig;
}

Agents.SessionResource = SessionResource;

export declare namespace Agents {
  export {
    type Agent as Agent,
    type AgentConfig as AgentConfig,
    type AgentCreateResponse as AgentCreateResponse,
    type AgentListResponse as AgentListResponse,
    type AgentListSessionsResponse as AgentListSessionsResponse,
    type AgentCreateParams as AgentCreateParams,
  };

  export {
    SessionResource as SessionResource,
    type Session as Session,
    type SessionCreateResponse as SessionCreateResponse,
    type SessionCreateParams as SessionCreateParams,
    type SessionRetrieveParams as SessionRetrieveParams,
    type SessionDeleteParams as SessionDeleteParams,
  };
}
