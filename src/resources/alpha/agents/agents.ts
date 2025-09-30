// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { isRequestOptions } from '../../../core';
import * as Core from '../../../core';
import * as Shared from '../../shared';
import * as SessionAPI from './session';
import {
  Session,
  SessionCreateParams,
  SessionCreateResponse,
  SessionListParams,
  SessionListResponse,
  SessionResource,
  SessionRetrieveParams,
} from './session';
import * as StepsAPI from './steps';
import { StepRetrieveResponse, Steps } from './steps';
import * as TurnAPI from './turn';
import {
  AgentTurnResponseStreamChunk,
  Turn,
  TurnCreateParams,
  TurnCreateParamsNonStreaming,
  TurnCreateParamsStreaming,
  TurnResource,
  TurnResponseEvent,
  TurnResumeParams,
  TurnResumeParamsNonStreaming,
  TurnResumeParamsStreaming,
} from './turn';

export class Agents extends APIResource {
  session: SessionAPI.SessionResource = new SessionAPI.SessionResource(this._client);
  steps: StepsAPI.Steps = new StepsAPI.Steps(this._client);
  turn: TurnAPI.TurnResource = new TurnAPI.TurnResource(this._client);

  /**
   * Create an agent with the given configuration.
   */
  create(body: AgentCreateParams, options?: Core.RequestOptions): Core.APIPromise<AgentCreateResponse> {
    return this._client.post('/v1/agents', { body, ...options });
  }

  /**
   * Describe an agent by its ID.
   */
  retrieve(agentId: string, options?: Core.RequestOptions): Core.APIPromise<AgentRetrieveResponse> {
    return this._client.get(`/v1/agents/${agentId}`, options);
  }

  /**
   * List all agents.
   */
  list(query?: AgentListParams, options?: Core.RequestOptions): Core.APIPromise<AgentListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<AgentListResponse>;
  list(
    query: AgentListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<AgentListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/v1/agents', { query, ...options });
  }

  /**
   * Delete an agent by its ID and its associated sessions and turns.
   */
  delete(agentId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/agents/${agentId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

/**
 * An inference step in an agent turn.
 */
export interface InferenceStep {
  /**
   * The response from the LLM.
   */
  model_response: Shared.CompletionMessage;

  /**
   * The ID of the step.
   */
  step_id: string;

  /**
   * Type of the step in an agent turn.
   */
  step_type: 'inference';

  /**
   * The ID of the turn.
   */
  turn_id: string;

  /**
   * The time the step completed.
   */
  completed_at?: string;

  /**
   * The time the step started.
   */
  started_at?: string;
}

/**
 * A memory retrieval step in an agent turn.
 */
export interface MemoryRetrievalStep {
  /**
   * The context retrieved from the vector databases.
   */
  inserted_context: Shared.InterleavedContent;

  /**
   * The ID of the step.
   */
  step_id: string;

  /**
   * Type of the step in an agent turn.
   */
  step_type: 'memory_retrieval';

  /**
   * The ID of the turn.
   */
  turn_id: string;

  /**
   * The IDs of the vector databases to retrieve context from.
   */
  vector_db_ids: string;

  /**
   * The time the step completed.
   */
  completed_at?: string;

  /**
   * The time the step started.
   */
  started_at?: string;
}

/**
 * A shield call step in an agent turn.
 */
export interface ShieldCallStep {
  /**
   * The ID of the step.
   */
  step_id: string;

  /**
   * Type of the step in an agent turn.
   */
  step_type: 'shield_call';

  /**
   * The ID of the turn.
   */
  turn_id: string;

  /**
   * The time the step completed.
   */
  completed_at?: string;

  /**
   * The time the step started.
   */
  started_at?: string;

  /**
   * The violation from the shield call.
   */
  violation?: Shared.SafetyViolation;
}

/**
 * A tool execution step in an agent turn.
 */
export interface ToolExecutionStep {
  /**
   * The ID of the step.
   */
  step_id: string;

  /**
   * Type of the step in an agent turn.
   */
  step_type: 'tool_execution';

  /**
   * The tool calls to execute.
   */
  tool_calls: Array<Shared.ToolCall>;

  /**
   * The tool responses from the tool calls.
   */
  tool_responses: Array<ToolResponse>;

  /**
   * The ID of the turn.
   */
  turn_id: string;

  /**
   * The time the step completed.
   */
  completed_at?: string;

  /**
   * The time the step started.
   */
  started_at?: string;
}

/**
 * Response from a tool invocation.
 */
export interface ToolResponse {
  /**
   * Unique identifier for the tool call this response is for
   */
  call_id: string;

  /**
   * The response content from the tool
   */
  content: Shared.InterleavedContent;

  /**
   * Name of the tool that was invoked
   */
  tool_name: 'brave_search' | 'wolfram_alpha' | 'photogen' | 'code_interpreter' | (string & {});

  /**
   * (Optional) Additional metadata about the tool response
   */
  metadata?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };
}

/**
 * Response returned when creating a new agent.
 */
export interface AgentCreateResponse {
  /**
   * Unique identifier for the created agent
   */
  agent_id: string;
}

/**
 * An agent instance with configuration and metadata.
 */
export interface AgentRetrieveResponse {
  /**
   * Configuration settings for the agent
   */
  agent_config: Shared.AgentConfig;

  /**
   * Unique identifier for the agent
   */
  agent_id: string;

  /**
   * Timestamp when the agent was created
   */
  created_at: string;
}

/**
 * A generic paginated response that follows a simple format.
 */
export interface AgentListResponse {
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

export interface AgentCreateParams {
  /**
   * The configuration for the agent.
   */
  agent_config: Shared.AgentConfig;
}

export interface AgentListParams {
  /**
   * The number of agents to return.
   */
  limit?: number;

  /**
   * The index to start the pagination from.
   */
  start_index?: number;
}

Agents.SessionResource = SessionResource;
Agents.Steps = Steps;
Agents.TurnResource = TurnResource;

export declare namespace Agents {
  export {
    type InferenceStep as InferenceStep,
    type MemoryRetrievalStep as MemoryRetrievalStep,
    type ShieldCallStep as ShieldCallStep,
    type ToolExecutionStep as ToolExecutionStep,
    type ToolResponse as ToolResponse,
    type AgentCreateResponse as AgentCreateResponse,
    type AgentRetrieveResponse as AgentRetrieveResponse,
    type AgentListResponse as AgentListResponse,
    type AgentCreateParams as AgentCreateParams,
    type AgentListParams as AgentListParams,
  };

  export {
    SessionResource as SessionResource,
    type Session as Session,
    type SessionCreateResponse as SessionCreateResponse,
    type SessionListResponse as SessionListResponse,
    type SessionCreateParams as SessionCreateParams,
    type SessionRetrieveParams as SessionRetrieveParams,
    type SessionListParams as SessionListParams,
  };

  export { Steps as Steps, type StepRetrieveResponse as StepRetrieveResponse };

  export {
    TurnResource as TurnResource,
    type AgentTurnResponseStreamChunk as AgentTurnResponseStreamChunk,
    type Turn as Turn,
    type TurnResponseEvent as TurnResponseEvent,
    type TurnCreateParams as TurnCreateParams,
    type TurnCreateParamsNonStreaming as TurnCreateParamsNonStreaming,
    type TurnCreateParamsStreaming as TurnCreateParamsStreaming,
    type TurnResumeParams as TurnResumeParams,
    type TurnResumeParamsNonStreaming as TurnResumeParamsNonStreaming,
    type TurnResumeParamsStreaming as TurnResumeParamsStreaming,
  };
}
