// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import { APIPromise } from '../../../core';
import * as Core from '../../../core';
import * as TurnAPI from './turn';
import * as Shared from '../../shared';
import * as AgentsAPI from './agents';
import { Stream } from '../../../streaming';

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
    return this._client.post(`/v1alpha/agents/${agentId}/session/${sessionId}/turn`, {
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
    return this._client.get(`/v1alpha/agents/${agentId}/session/${sessionId}/turn/${turnId}`, options);
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
    return this._client.post(`/v1alpha/agents/${agentId}/session/${sessionId}/turn/${turnId}/resume`, {
      body,
      ...options,
      stream: body.stream ?? false,
    }) as APIPromise<Turn> | APIPromise<Stream<AgentTurnResponseStreamChunk>>;
  }
}

/**
 * Streamed agent turn completion response.
 */
export interface AgentTurnResponseStreamChunk {
  /**
   * Individual event in the agent turn response stream
   */
  event: TurnResponseEvent;
}

/**
 * A single turn in an interaction with an Agentic System.
 */
export interface Turn {
  /**
   * List of messages that initiated this turn
   */
  input_messages: Array<Shared.UserMessage | Shared.ToolResponseMessage>;

  /**
   * The model's generated response containing content and metadata
   */
  output_message: Shared.CompletionMessage;

  /**
   * Unique identifier for the conversation session
   */
  session_id: string;

  /**
   * Timestamp when the turn began
   */
  started_at: string;

  /**
   * Ordered list of processing steps executed during this turn
   */
  steps: Array<
    | AgentsAPI.InferenceStep
    | AgentsAPI.ToolExecutionStep
    | AgentsAPI.ShieldCallStep
    | AgentsAPI.MemoryRetrievalStep
  >;

  /**
   * Unique identifier for the turn within a session
   */
  turn_id: string;

  /**
   * (Optional) Timestamp when the turn finished, if completed
   */
  completed_at?: string;

  /**
   * (Optional) Files or media attached to the agent's response
   */
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
          /**
           * The URL string pointing to the resource
           */
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

    /**
     * A URL reference to external content.
     */
    export interface URL {
      /**
       * The URL string pointing to the resource
       */
      uri: string;
    }
  }
}

/**
 * An event in an agent turn response stream.
 */
export interface TurnResponseEvent {
  /**
   * Event-specific payload containing event data
   */
  payload:
    | TurnResponseEvent.AgentTurnResponseStepStartPayload
    | TurnResponseEvent.AgentTurnResponseStepProgressPayload
    | TurnResponseEvent.AgentTurnResponseStepCompletePayload
    | TurnResponseEvent.AgentTurnResponseTurnStartPayload
    | TurnResponseEvent.AgentTurnResponseTurnCompletePayload
    | TurnResponseEvent.AgentTurnResponseTurnAwaitingInputPayload;
}

export namespace TurnResponseEvent {
  /**
   * Payload for step start events in agent turn responses.
   */
  export interface AgentTurnResponseStepStartPayload {
    /**
     * Type of event being reported
     */
    event_type: 'step_start';

    /**
     * Unique identifier for the step within a turn
     */
    step_id: string;

    /**
     * Type of step being executed
     */
    step_type: 'inference' | 'tool_execution' | 'shield_call' | 'memory_retrieval';

    /**
     * (Optional) Additional metadata for the step
     */
    metadata?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };
  }

  /**
   * Payload for step progress events in agent turn responses.
   */
  export interface AgentTurnResponseStepProgressPayload {
    /**
     * Incremental content changes during step execution
     */
    delta:
      | AgentTurnResponseStepProgressPayload.TextDelta
      | AgentTurnResponseStepProgressPayload.ImageDelta
      | AgentTurnResponseStepProgressPayload.ToolCallDelta;

    /**
     * Type of event being reported
     */
    event_type: 'step_progress';

    /**
     * Unique identifier for the step within a turn
     */
    step_id: string;

    /**
     * Type of step being executed
     */
    step_type: 'inference' | 'tool_execution' | 'shield_call' | 'memory_retrieval';
  }

  export namespace AgentTurnResponseStepProgressPayload {
    /**
     * A text content delta for streaming responses.
     */
    export interface TextDelta {
      /**
       * The incremental text content
       */
      text: string;

      /**
       * Discriminator type of the delta. Always "text"
       */
      type: 'text';
    }

    /**
     * An image content delta for streaming responses.
     */
    export interface ImageDelta {
      /**
       * The incremental image data as bytes
       */
      image: string;

      /**
       * Discriminator type of the delta. Always "image"
       */
      type: 'image';
    }

    /**
     * A tool call content delta for streaming responses.
     */
    export interface ToolCallDelta {
      /**
       * Current parsing status of the tool call
       */
      parse_status: 'started' | 'in_progress' | 'failed' | 'succeeded';

      /**
       * Either an in-progress tool call string or the final parsed tool call
       */
      tool_call: string | Shared.ToolCall;

      /**
       * Discriminator type of the delta. Always "tool_call"
       */
      type: 'tool_call';
    }
  }

  /**
   * Payload for step completion events in agent turn responses.
   */
  export interface AgentTurnResponseStepCompletePayload {
    /**
     * Type of event being reported
     */
    event_type: 'step_complete';

    /**
     * Complete details of the executed step
     */
    step_details:
      | AgentsAPI.InferenceStep
      | AgentsAPI.ToolExecutionStep
      | AgentsAPI.ShieldCallStep
      | AgentsAPI.MemoryRetrievalStep;

    /**
     * Unique identifier for the step within a turn
     */
    step_id: string;

    /**
     * Type of step being executed
     */
    step_type: 'inference' | 'tool_execution' | 'shield_call' | 'memory_retrieval';
  }

  /**
   * Payload for turn start events in agent turn responses.
   */
  export interface AgentTurnResponseTurnStartPayload {
    /**
     * Type of event being reported
     */
    event_type: 'turn_start';

    /**
     * Unique identifier for the turn within a session
     */
    turn_id: string;
  }

  /**
   * Payload for turn completion events in agent turn responses.
   */
  export interface AgentTurnResponseTurnCompletePayload {
    /**
     * Type of event being reported
     */
    event_type: 'turn_complete';

    /**
     * Complete turn data including all steps and results
     */
    turn: TurnAPI.Turn;
  }

  /**
   * Payload for turn awaiting input events in agent turn responses.
   */
  export interface AgentTurnResponseTurnAwaitingInputPayload {
    /**
     * Type of event being reported
     */
    event_type: 'turn_awaiting_input';

    /**
     * Turn data when waiting for external tool responses
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
          /**
           * The URL string pointing to the resource
           */
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

    /**
     * A URL reference to external content.
     */
    export interface URL {
      /**
       * The URL string pointing to the resource
       */
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
    args: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

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
   * The tool call responses to resume the turn with.
   */
  tool_responses: Array<AgentsAPI.ToolResponse>;

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
    type TurnCreateParams as TurnCreateParams,
    type TurnCreateParamsNonStreaming as TurnCreateParamsNonStreaming,
    type TurnCreateParamsStreaming as TurnCreateParamsStreaming,
    type TurnResumeParams as TurnResumeParams,
    type TurnResumeParamsNonStreaming as TurnResumeParamsNonStreaming,
    type TurnResumeParamsStreaming as TurnResumeParamsStreaming,
  };
}
