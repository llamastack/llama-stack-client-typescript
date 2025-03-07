// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { APIPromise } from '../../core';
import * as Core from '../../core';
import * as TurnAPI from './turn';
import * as Shared from '../shared';
import * as AgentsAPI from './agents';
import { Stream } from '../../streaming';

export class TurnResource extends APIResource {
  /**
   * Create a new turn for an agent.
   */
  create(
    agentId: string,
    sessionId: string,
    body: TurnCreateParamsNonStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Turn>;
  create(
    agentId: string,
    sessionId: string,
    body: TurnCreateParamsStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<AgentTurnResponseStreamChunk>>;
  create(
    agentId: string,
    sessionId: string,
    body: TurnCreateParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<AgentTurnResponseStreamChunk> | Turn>;
  create(
    agentId: string,
    sessionId: string,
    body: TurnCreateParams,
    options?: Core.RequestOptions,
  ): APIPromise<Turn> | APIPromise<Stream<AgentTurnResponseStreamChunk>> {
    return this._client.post(`/v1/agents/${agentId}/session/${sessionId}/turn`, {
      body,
      ...options,
      stream: body.stream ?? false,
    }) as APIPromise<Turn> | APIPromise<Stream<AgentTurnResponseStreamChunk>>;
  }

  /**
   * Retrieve an agent turn by its ID.
   */
  retrieve(
    agentId: string,
    sessionId: string,
    turnId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Turn> {
    return this._client.get(`/v1/agents/${agentId}/session/${sessionId}/turn/${turnId}`, options);
  }

  /**
   * Resume an agent turn with executed tool call responses. When a Turn has the
   * status `awaiting_input` due to pending input from client side tool calls, this
   * endpoint can be used to submit the outputs from the tool calls once they are
   * ready.
   */
  resume(
    agentId: string,
    sessionId: string,
    turnId: string,
    body: TurnResumeParamsNonStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Turn>;
  resume(
    agentId: string,
    sessionId: string,
    turnId: string,
    body: TurnResumeParamsStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<AgentTurnResponseStreamChunk>>;
  resume(
    agentId: string,
    sessionId: string,
    turnId: string,
    body: TurnResumeParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<AgentTurnResponseStreamChunk> | Turn>;
  resume(
    agentId: string,
    sessionId: string,
    turnId: string,
    body: TurnResumeParams,
    options?: Core.RequestOptions,
  ): APIPromise<Turn> | APIPromise<Stream<AgentTurnResponseStreamChunk>> {
    return this._client.post(`/v1/agents/${agentId}/session/${sessionId}/turn/${turnId}/resume`, {
      body,
      ...options,
      stream: body.stream ?? false,
    }) as APIPromise<Turn> | APIPromise<Stream<AgentTurnResponseStreamChunk>>;
  }
}

/**
 * streamed agent turn completion response.
 */
export interface AgentTurnResponseStreamChunk {
  event: TurnResponseEvent;
}

/**
 * A single turn in an interaction with an Agentic System.
 */
export interface Turn {
  input_messages: Array<Shared.UserMessage | Shared.ToolResponseMessage>;

  /**
   * A message containing the model's (assistant) response in a chat conversation.
   */
  output_message: Shared.CompletionMessage;

  session_id: string;

  started_at: string;

  steps: Array<
    | AgentsAPI.InferenceStep
    | AgentsAPI.ToolExecutionStep
    | AgentsAPI.ShieldCallStep
    | AgentsAPI.MemoryRetrievalStep
  >;

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
      | Array<Shared.InterleavedContentItem>
      | OutputAttachment.URL;

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
        url?: Image.URL;
      }

      export namespace Image {
        /**
         * A URL of the image or data URL in the format of data:image/{type};base64,{data}.
         * Note that URL could have length limits.
         */
        export interface URL {
          uri: string;
        }
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

    export interface URL {
      uri: string;
    }
  }
}

export interface TurnResponseEvent {
  payload: TurnResponseEventPayload;
}

export type TurnResponseEventPayload =
  | TurnResponseEventPayload.AgentTurnResponseStepStartPayload
  | TurnResponseEventPayload.AgentTurnResponseStepProgressPayload
  | TurnResponseEventPayload.AgentTurnResponseStepCompletePayload
  | TurnResponseEventPayload.AgentTurnResponseTurnStartPayload
  | TurnResponseEventPayload.AgentTurnResponseTurnCompletePayload
  | TurnResponseEventPayload.AgentTurnResponseTurnAwaitingInputPayload;

export namespace TurnResponseEventPayload {
  export interface AgentTurnResponseStepStartPayload {
    event_type: 'step_start';

    step_id: string;

    /**
     * Type of the step in an agent turn.
     */
    step_type: 'inference' | 'tool_execution' | 'shield_call' | 'memory_retrieval';

    metadata?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;
  }

  export interface AgentTurnResponseStepProgressPayload {
    delta: Shared.ContentDelta;

    event_type: 'step_progress';

    step_id: string;

    /**
     * Type of the step in an agent turn.
     */
    step_type: 'inference' | 'tool_execution' | 'shield_call' | 'memory_retrieval';
  }

  export interface AgentTurnResponseStepCompletePayload {
    event_type: 'step_complete';

    /**
     * An inference step in an agent turn.
     */
    step_details:
      | AgentsAPI.InferenceStep
      | AgentsAPI.ToolExecutionStep
      | AgentsAPI.ShieldCallStep
      | AgentsAPI.MemoryRetrievalStep;

    step_id: string;

    /**
     * Type of the step in an agent turn.
     */
    step_type: 'inference' | 'tool_execution' | 'shield_call' | 'memory_retrieval';
  }

  export interface AgentTurnResponseTurnStartPayload {
    event_type: 'turn_start';

    turn_id: string;
  }

  export interface AgentTurnResponseTurnCompletePayload {
    event_type: 'turn_complete';

    /**
     * A single turn in an interaction with an Agentic System.
     */
    turn: TurnAPI.Turn;
  }

  export interface AgentTurnResponseTurnAwaitingInputPayload {
    event_type: 'turn_awaiting_input';

    /**
     * A single turn in an interaction with an Agentic System.
     */
    turn: TurnAPI.Turn;
  }
}

export type TurnCreateParams = TurnCreateParamsNonStreaming | TurnCreateParamsStreaming;

export interface TurnCreateParamsBase {
  /**
   * List of messages to start the turn with.
   */
  messages: Array<Shared.UserMessage | Shared.ToolResponseMessage>;

  /**
   * (Optional) List of documents to create the turn with.
   */
  documents?: Array<TurnCreateParams.Document>;

  /**
   * (Optional) If True, generate an SSE event stream of the response. Defaults to
   * False.
   */
  stream?: boolean;

  /**
   * (Optional) The tool configuration to create the turn with, will be used to
   * override the agent's tool_config.
   */
  tool_config?: TurnCreateParams.ToolConfig;

  /**
   * (Optional) List of toolgroups to create the turn with, will be used in addition
   * to the agent's config toolgroups for the request.
   */
  toolgroups?: Array<string | TurnCreateParams.AgentToolGroupWithArgs>;
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
      | Array<Shared.InterleavedContentItem>
      | Document.URL;

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
        url?: Image.URL;
      }

      export namespace Image {
        /**
         * A URL of the image or data URL in the format of data:image/{type};base64,{data}.
         * Note that URL could have length limits.
         */
        export interface URL {
          uri: string;
        }
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

    export interface URL {
      uri: string;
    }
  }

  /**
   * (Optional) The tool configuration to create the turn with, will be used to
   * override the agent's tool_config.
   */
  export interface ToolConfig {
    /**
     * (Optional) Config for how to override the default system prompt. -
     * `SystemMessageBehavior.append`: Appends the provided system message to the
     * default system prompt. - `SystemMessageBehavior.replace`: Replaces the default
     * system prompt with the provided system message. The system message can include
     * the string '{{function_definitions}}' to indicate where the function definitions
     * should be inserted.
     */
    system_message_behavior?: 'append' | 'replace';

    /**
     * (Optional) Whether tool use is automatic, required, or none. Can also specify a
     * tool name to use a specific tool. Defaults to ToolChoice.auto.
     */
    tool_choice?: 'auto' | 'required' | 'none' | (string & {});

    /**
     * (Optional) Instructs the model how to format tool calls. By default, Llama Stack
     * will attempt to use a format that is best adapted to the model. -
     * `ToolPromptFormat.json`: The tool calls are formatted as a JSON object. -
     * `ToolPromptFormat.function_tag`: The tool calls are enclosed in a
     * <function=function_name> tag. - `ToolPromptFormat.python_list`: The tool calls
     * are output as Python syntax -- a list of function calls.
     */
    tool_prompt_format?: 'json' | 'function_tag' | 'python_list';
  }

  export interface AgentToolGroupWithArgs {
    args: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

    name: string;
  }

  export type TurnCreateParamsNonStreaming = TurnAPI.TurnCreateParamsNonStreaming;
  export type TurnCreateParamsStreaming = TurnAPI.TurnCreateParamsStreaming;
}

export interface TurnCreateParamsNonStreaming extends TurnCreateParamsBase {
  /**
   * (Optional) If True, generate an SSE event stream of the response. Defaults to
   * False.
   */
  stream?: false;
}

export interface TurnCreateParamsStreaming extends TurnCreateParamsBase {
  /**
   * (Optional) If True, generate an SSE event stream of the response. Defaults to
   * False.
   */
  stream: true;
}

export type TurnResumeParams = TurnResumeParamsNonStreaming | TurnResumeParamsStreaming;

export interface TurnResumeParamsBase {
  /**
   * The tool call responses to resume the turn with. NOTE: ToolResponseMessage will
   * be deprecated. Use ToolResponse.
   */
  tool_responses: Array<AgentsAPI.ToolResponse> | Array<Shared.ToolResponseMessage>;

  /**
   * Whether to stream the response.
   */
  stream?: boolean;
}

export namespace TurnResumeParams {
  export type TurnResumeParamsNonStreaming = TurnAPI.TurnResumeParamsNonStreaming;
  export type TurnResumeParamsStreaming = TurnAPI.TurnResumeParamsStreaming;
}

export interface TurnResumeParamsNonStreaming extends TurnResumeParamsBase {
  /**
   * Whether to stream the response.
   */
  stream?: false;
}

export interface TurnResumeParamsStreaming extends TurnResumeParamsBase {
  /**
   * Whether to stream the response.
   */
  stream: true;
}

export declare namespace TurnResource {
  export {
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
