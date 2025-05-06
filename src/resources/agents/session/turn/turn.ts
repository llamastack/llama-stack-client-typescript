// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as InferenceAPI from '../../../inference';
import * as SafetyAPI from '../../../safety';
import * as ToolRuntimeAPI from '../../../tool-runtime/tool-runtime';
import * as StepAPI from './step';
import { Step, StepRetrieveParams, StepRetrieveResponse } from './step';
import { APIPromise } from '../../../../core/api-promise';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

export class TurnResource extends APIResource {
  step: StepAPI.Step = new StepAPI.Step(this._client);

  /**
   * Create a new turn for an agent.
   */
  create(sessionID: string, params: TurnCreateParams, options?: RequestOptions): APIPromise<Turn> {
    const { agent_id, ...body } = params;
    return this._client.post(path`/v1/agents/${agent_id}/session/${sessionID}/turn`, { body, ...options });
  }

  /**
   * Retrieve an agent turn by its ID.
   */
  retrieve(turnID: string, params: TurnRetrieveParams, options?: RequestOptions): APIPromise<Turn> {
    const { agent_id, session_id } = params;
    return this._client.get(path`/v1/agents/${agent_id}/session/${session_id}/turn/${turnID}`, options);
  }

  /**
   * Resume an agent turn with executed tool call responses. When a Turn has the
   * status `awaiting_input` due to pending input from client side tool calls, this
   * endpoint can be used to submit the outputs from the tool calls once they are
   * ready.
   */
  resume(turnID: string, params: TurnResumeParams, options?: RequestOptions): APIPromise<Turn> {
    const { agent_id, session_id, ...body } = params;
    return this._client.post(path`/v1/agents/${agent_id}/session/${session_id}/turn/${turnID}/resume`, {
      body,
      ...options,
    });
  }
}

export type AgentTool = string | AgentTool.AgentToolGroupWithArgs;

export namespace AgentTool {
  export interface AgentToolGroupWithArgs {
    args: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

    name: string;
  }
}

/**
 * An inference step in an agent turn.
 */
export interface InferenceStep {
  /**
   * The response from the LLM.
   */
  model_response: InferenceAPI.CompletionMessage;

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
  inserted_context: InferenceAPI.InterleavedContent;

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
  violation?: SafetyAPI.SafetyViolation;
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
  tool_calls: Array<InferenceAPI.ToolCall>;

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
  content: InferenceAPI.InterleavedContent;

  tool_name: 'brave_search' | 'wolfram_alpha' | 'photogen' | 'code_interpreter' | (string & {});

  metadata?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;
}

/**
 * A message representing the result of a tool invocation.
 */
export interface ToolResponseMessage {
  /**
   * Unique identifier for the tool call this response is for
   */
  call_id: string;

  /**
   * The response content from the tool
   */
  content: InferenceAPI.InterleavedContent;

  /**
   * Must be "tool" to identify this as a tool response
   */
  role: 'tool';
}

/**
 * A single turn in an interaction with an Agentic System.
 */
export interface Turn {
  input_messages: Array<UserMessage | ToolResponseMessage>;

  /**
   * A message containing the model's (assistant) response in a chat conversation.
   */
  output_message: InferenceAPI.CompletionMessage;

  session_id: string;

  started_at: string;

  steps: Array<InferenceStep | ToolExecutionStep | ShieldCallStep | MemoryRetrievalStep>;

  turn_id: string;

  completed_at?: string;

  output_attachments?: Array<Turn.OutputAttachment>;
}

export namespace Turn {
  /**
   * An attachment to an agent turn.
   */
  export interface OutputAttachment {
    /**
     * The content of the attachment.
     */
    content:
      | string
      | OutputAttachment.ImageContentItem
      | OutputAttachment.TextContentItem
      | Array<InferenceAPI.InterleavedContentItem>
      | ToolRuntimeAPI.URL;

    /**
     * The MIME type of the attachment.
     */
    mime_type: string;
  }

  export namespace OutputAttachment {
    /**
     * A image content item
     */
    export interface ImageContentItem {
      /**
       * Image as a base64 encoded string or an URL
       */
      image: ImageContentItem.Image;

      /**
       * Discriminator type of the content item. Always "image"
       */
      type: 'image';
    }

    export namespace ImageContentItem {
      /**
       * Image as a base64 encoded string or an URL
       */
      export interface Image {
        /**
         * base64 encoded image data as string
         */
        data?: string;

        /**
         * A URL of the image or data URL in the format of data:image/{type};base64,{data}.
         * Note that URL could have length limits.
         */
        url?: ToolRuntimeAPI.URL;
      }
    }

    /**
     * A text content item
     */
    export interface TextContentItem {
      /**
       * Text content
       */
      text: string;

      /**
       * Discriminator type of the content item. Always "text"
       */
      type: 'text';
    }
  }
}

/**
 * A message from the user in a chat conversation.
 */
export interface UserMessage {
  /**
   * The content of the message, which can include text and other media
   */
  content: InferenceAPI.InterleavedContent;

  /**
   * Must be "user" to identify this as a user message
   */
  role: 'user';

  /**
   * (Optional) This field is used internally by Llama Stack to pass RAG context.
   * This field may be removed in the API in the future.
   */
  context?: InferenceAPI.InterleavedContent;
}

export interface TurnCreateParams {
  /**
   * Path param: The ID of the agent to create the turn for.
   */
  agent_id: string;

  /**
   * Body param: List of messages to start the turn with.
   */
  messages: Array<UserMessage | ToolResponseMessage>;

  /**
   * Body param: (Optional) List of documents to create the turn with.
   */
  documents?: Array<TurnCreateParams.Document>;

  /**
   * Body param: (Optional) If True, generate an SSE event stream of the response.
   * Defaults to False.
   */
  stream?: boolean;

  /**
   * Body param: (Optional) The tool configuration to create the turn with, will be
   * used to override the agent's tool_config.
   */
  tool_config?: InferenceAPI.ToolConfig;

  /**
   * Body param: (Optional) List of toolgroups to create the turn with, will be used
   * in addition to the agent's config toolgroups for the request.
   */
  toolgroups?: Array<AgentTool>;
}

export namespace TurnCreateParams {
  /**
   * A document to be used by an agent.
   */
  export interface Document {
    /**
     * The content of the document.
     */
    content:
      | string
      | Document.ImageContentItem
      | Document.TextContentItem
      | Array<InferenceAPI.InterleavedContentItem>
      | ToolRuntimeAPI.URL;

    /**
     * The MIME type of the document.
     */
    mime_type: string;
  }

  export namespace Document {
    /**
     * A image content item
     */
    export interface ImageContentItem {
      /**
       * Image as a base64 encoded string or an URL
       */
      image: ImageContentItem.Image;

      /**
       * Discriminator type of the content item. Always "image"
       */
      type: 'image';
    }

    export namespace ImageContentItem {
      /**
       * Image as a base64 encoded string or an URL
       */
      export interface Image {
        /**
         * base64 encoded image data as string
         */
        data?: string;

        /**
         * A URL of the image or data URL in the format of data:image/{type};base64,{data}.
         * Note that URL could have length limits.
         */
        url?: ToolRuntimeAPI.URL;
      }
    }

    /**
     * A text content item
     */
    export interface TextContentItem {
      /**
       * Text content
       */
      text: string;

      /**
       * Discriminator type of the content item. Always "text"
       */
      type: 'text';
    }
  }
}

export interface TurnRetrieveParams {
  /**
   * The ID of the agent to get the turn for.
   */
  agent_id: string;

  /**
   * The ID of the session to get the turn for.
   */
  session_id: string;
}

export interface TurnResumeParams {
  /**
   * Path param: The ID of the agent to resume.
   */
  agent_id: string;

  /**
   * Path param: The ID of the session to resume.
   */
  session_id: string;

  /**
   * Body param: The tool call responses to resume the turn with.
   */
  tool_responses: Array<ToolResponse>;

  /**
   * Body param: Whether to stream the response.
   */
  stream?: boolean;
}

TurnResource.Step = Step;

export declare namespace TurnResource {
  export {
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

  export {
    Step as Step,
    type StepRetrieveResponse as StepRetrieveResponse,
    type StepRetrieveParams as StepRetrieveParams,
  };
}
