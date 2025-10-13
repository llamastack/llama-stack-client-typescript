// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Safety extends APIResource {
  /**
   * Run shield. Run a shield.
   */
  runShield(body: SafetyRunShieldParams, options?: Core.RequestOptions): Core.APIPromise<RunShieldResponse> {
    return this._client.post('/v1/safety/run-shield', { body, ...options });
  }
}

/**
 * Response from running a safety shield.
 */
export interface RunShieldResponse {
  /**
   * (Optional) Safety violation detected by the shield, if any
   */
  violation?: Shared.SafetyViolation;
}

export interface SafetyRunShieldParams {
  /**
   * The messages to run the shield on.
   */
  messages: Array<
    | SafetyRunShieldParams.OpenAIUserMessageParam
    | SafetyRunShieldParams.OpenAISystemMessageParam
    | SafetyRunShieldParams.OpenAIAssistantMessageParam
    | SafetyRunShieldParams.OpenAIToolMessageParam
    | SafetyRunShieldParams.OpenAIDeveloperMessageParam
  >;

  /**
   * The parameters of the shield.
   */
  params: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * The identifier of the shield to run.
   */
  shield_id: string;
}

export namespace SafetyRunShieldParams {
  /**
   * A message from the user in an OpenAI-compatible chat completion request.
   */
  export interface OpenAIUserMessageParam {
    /**
     * The content of the message, which can include text and other media
     */
    content:
      | string
      | Array<
          | OpenAIUserMessageParam.OpenAIChatCompletionContentPartTextParam
          | OpenAIUserMessageParam.OpenAIChatCompletionContentPartImageParam
          | OpenAIUserMessageParam.OpenAIFile
        >;

    /**
     * Must be "user" to identify this as a user message
     */
    role: 'user';

    /**
     * (Optional) The name of the user message participant.
     */
    name?: string;
  }

  export namespace OpenAIUserMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface OpenAIChatCompletionContentPartTextParam {
      /**
       * The text content of the message
       */
      text: string;

      /**
       * Must be "text" to identify this as text content
       */
      type: 'text';
    }

    /**
     * Image content part for OpenAI-compatible chat completion messages.
     */
    export interface OpenAIChatCompletionContentPartImageParam {
      /**
       * Image URL specification and processing details
       */
      image_url: OpenAIChatCompletionContentPartImageParam.ImageURL;

      /**
       * Must be "image_url" to identify this as image content
       */
      type: 'image_url';
    }

    export namespace OpenAIChatCompletionContentPartImageParam {
      /**
       * Image URL specification and processing details
       */
      export interface ImageURL {
        /**
         * URL of the image to include in the message
         */
        url: string;

        /**
         * (Optional) Level of detail for image processing. Can be "low", "high", or "auto"
         */
        detail?: string;
      }
    }

    export interface OpenAIFile {
      file: OpenAIFile.File;

      type: 'file';
    }

    export namespace OpenAIFile {
      export interface File {
        file_data?: string;

        file_id?: string;

        filename?: string;
      }
    }
  }

  /**
   * A system message providing instructions or context to the model.
   */
  export interface OpenAISystemMessageParam {
    /**
     * The content of the "system prompt". If multiple system messages are provided,
     * they are concatenated. The underlying Llama Stack code may also add other system
     * messages (for example, for formatting tool definitions).
     */
    content: string | Array<OpenAISystemMessageParam.UnionMember1>;

    /**
     * Must be "system" to identify this as a system message
     */
    role: 'system';

    /**
     * (Optional) The name of the system message participant.
     */
    name?: string;
  }

  export namespace OpenAISystemMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface UnionMember1 {
      /**
       * The text content of the message
       */
      text: string;

      /**
       * Must be "text" to identify this as text content
       */
      type: 'text';
    }
  }

  /**
   * A message containing the model's (assistant) response in an OpenAI-compatible
   * chat completion request.
   */
  export interface OpenAIAssistantMessageParam {
    /**
     * Must be "assistant" to identify this as the model's response
     */
    role: 'assistant';

    /**
     * The content of the model's response
     */
    content?: string | Array<OpenAIAssistantMessageParam.UnionMember1>;

    /**
     * (Optional) The name of the assistant message participant.
     */
    name?: string;

    /**
     * List of tool calls. Each tool call is an OpenAIChatCompletionToolCall object.
     */
    tool_calls?: Array<OpenAIAssistantMessageParam.ToolCall>;
  }

  export namespace OpenAIAssistantMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface UnionMember1 {
      /**
       * The text content of the message
       */
      text: string;

      /**
       * Must be "text" to identify this as text content
       */
      type: 'text';
    }

    /**
     * Tool call specification for OpenAI-compatible chat completion responses.
     */
    export interface ToolCall {
      /**
       * Must be "function" to identify this as a function call
       */
      type: 'function';

      /**
       * (Optional) Unique identifier for the tool call
       */
      id?: string;

      /**
       * (Optional) Function call details
       */
      function?: ToolCall.Function;

      /**
       * (Optional) Index of the tool call in the list
       */
      index?: number;
    }

    export namespace ToolCall {
      /**
       * (Optional) Function call details
       */
      export interface Function {
        /**
         * (Optional) Arguments to pass to the function as a JSON string
         */
        arguments?: string;

        /**
         * (Optional) Name of the function to call
         */
        name?: string;
      }
    }
  }

  /**
   * A message representing the result of a tool invocation in an OpenAI-compatible
   * chat completion request.
   */
  export interface OpenAIToolMessageParam {
    /**
     * The response content from the tool
     */
    content: string | Array<OpenAIToolMessageParam.UnionMember1>;

    /**
     * Must be "tool" to identify this as a tool response
     */
    role: 'tool';

    /**
     * Unique identifier for the tool call this response is for
     */
    tool_call_id: string;
  }

  export namespace OpenAIToolMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface UnionMember1 {
      /**
       * The text content of the message
       */
      text: string;

      /**
       * Must be "text" to identify this as text content
       */
      type: 'text';
    }
  }

  /**
   * A message from the developer in an OpenAI-compatible chat completion request.
   */
  export interface OpenAIDeveloperMessageParam {
    /**
     * The content of the developer message
     */
    content: string | Array<OpenAIDeveloperMessageParam.UnionMember1>;

    /**
     * Must be "developer" to identify this as a developer message
     */
    role: 'developer';

    /**
     * (Optional) The name of the developer message participant.
     */
    name?: string;
  }

  export namespace OpenAIDeveloperMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface UnionMember1 {
      /**
       * The text content of the message
       */
      text: string;

      /**
       * Must be "text" to identify this as text content
       */
      type: 'text';
    }
  }
}

export declare namespace Safety {
  export { type RunShieldResponse as RunShieldResponse, type SafetyRunShieldParams as SafetyRunShieldParams };
}
