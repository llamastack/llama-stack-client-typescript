// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as Shared from '../shared';
import * as SessionAPI from './session';
import {
  Session,
  SessionCreateParams,
  SessionCreateResponse,
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
  TurnResponseEventPayload,
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

export interface ToolResponse {
  call_id: string;

  /**
   * A image content item
   */
  content: Shared.InterleavedContent;

  tool_name: 'brave_search' | 'wolfram_alpha' | 'photogen' | 'code_interpreter' | (string & {});

  metadata?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;
}

export interface AgentCreateResponse {
  agent_id: string;
}

export interface AgentCreateParams {
  /**
   * The configuration for the agent.
   */
  agent_config: Shared.AgentConfig;
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
    type AgentCreateParams as AgentCreateParams,
  };

  export {
    SessionResource as SessionResource,
    type Session as Session,
    type SessionCreateResponse as SessionCreateResponse,
    type SessionCreateParams as SessionCreateParams,
    type SessionRetrieveParams as SessionRetrieveParams,
  };

  export { Steps as Steps, type StepRetrieveResponse as StepRetrieveResponse };

  export {
    TurnResource as TurnResource,
    type AgentTurnResponseStreamChunk as AgentTurnResponseStreamChunk,
    type Turn as Turn,
    type TurnResponseEvent as TurnResponseEvent,
    type TurnResponseEventPayload as TurnResponseEventPayload,
    type TurnCreateParams as TurnCreateParams,
    type TurnCreateParamsNonStreaming as TurnCreateParamsNonStreaming,
    type TurnCreateParamsStreaming as TurnCreateParamsStreaming,
    type TurnResumeParams as TurnResumeParams,
    type TurnResumeParamsNonStreaming as TurnResumeParamsNonStreaming,
    type TurnResumeParamsStreaming as TurnResumeParamsStreaming,
  };
}
