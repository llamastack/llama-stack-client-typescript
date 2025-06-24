// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ChatAPI from './chat';
import * as V1API from './v1';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

export class Chat extends APIResource {
  /**
   * Generate an OpenAI-compatible chat completion for the given messages using the
   * specified model.
   */
  generateCompletion(
    body: ChatGenerateCompletionParams,
    options?: RequestOptions,
  ): APIPromise<ChatGenerateCompletionResponse> {
    return this._client.post('/v1/openai/v1/chat/completions', { body, ...options });
  }
}

export type ChatCompletionContentPart =
  | ChatCompletionContentPart.OpenAIChatCompletionContentPartTextParam
  | ChatCompletionContentPart.OpenAIChatCompletionContentPartImageParam;

export namespace ChatCompletionContentPart {
  export interface OpenAIChatCompletionContentPartTextParam {
    text: string;

    type: 'text';
  }

  export interface OpenAIChatCompletionContentPartImageParam {
    image_url: OpenAIChatCompletionContentPartImageParam.ImageURL;

    type: 'image_url';
  }

  export namespace OpenAIChatCompletionContentPartImageParam {
    export interface ImageURL {
      url: string;

      detail?: string;
    }
  }
}

export interface ChatCompletionToolCall {
  type: 'function';

  id?: string;

  function?: ChatCompletionToolCall.Function;

  index?: number;
}

export namespace ChatCompletionToolCall {
  export interface Function {
    arguments?: string;

    name?: string;
  }
}

/**
 * A message from the user in an OpenAI-compatible chat completion request.
 */
export type MessageParam =
  | MessageParam.OpenAIUserMessageParam
  | MessageParam.OpenAISystemMessageParam
  | MessageParam.OpenAIAssistantMessageParam
  | MessageParam.OpenAIToolMessageParam
  | MessageParam.OpenAIDeveloperMessageParam;

export namespace MessageParam {
  /**
   * A message from the user in an OpenAI-compatible chat completion request.
   */
  export interface OpenAIUserMessageParam {
    /**
     * The content of the message, which can include text and other media
     */
    content: string | Array<ChatAPI.ChatCompletionContentPart>;

    /**
     * Must be "user" to identify this as a user message
     */
    role: 'user';

    /**
     * (Optional) The name of the user message participant.
     */
    name?: string;
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
    content: string | Array<ChatAPI.ChatCompletionContentPart>;

    /**
     * Must be "system" to identify this as a system message
     */
    role: 'system';

    /**
     * (Optional) The name of the system message participant.
     */
    name?: string;
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
    content?: string | Array<ChatAPI.ChatCompletionContentPart>;

    /**
     * (Optional) The name of the assistant message participant.
     */
    name?: string;

    /**
     * List of tool calls. Each tool call is an OpenAIChatCompletionToolCall object.
     */
    tool_calls?: Array<ChatAPI.ChatCompletionToolCall>;
  }

  /**
   * A message representing the result of a tool invocation in an OpenAI-compatible
   * chat completion request.
   */
  export interface OpenAIToolMessageParam {
    /**
     * The response content from the tool
     */
    content: string | Array<ChatAPI.ChatCompletionContentPart>;

    /**
     * Must be "tool" to identify this as a tool response
     */
    role: 'tool';

    /**
     * Unique identifier for the tool call this response is for
     */
    tool_call_id: string;
  }

  /**
   * A message from the developer in an OpenAI-compatible chat completion request.
   */
  export interface OpenAIDeveloperMessageParam {
    /**
     * The content of the developer message
     */
    content: string | Array<ChatAPI.ChatCompletionContentPart>;

    /**
     * Must be "developer" to identify this as a developer message
     */
    role: 'developer';

    /**
     * (Optional) The name of the developer message participant.
     */
    name?: string;
  }
}

/**
 * Response from an OpenAI-compatible chat completion request.
 */
export type ChatGenerateCompletionResponse =
  | ChatGenerateCompletionResponse.OpenAIChatCompletion
  | ChatGenerateCompletionResponse.OpenAIChatCompletionChunk;

export namespace ChatGenerateCompletionResponse {
  /**
   * Response from an OpenAI-compatible chat completion request.
   */
  export interface OpenAIChatCompletion {
    /**
     * The ID of the chat completion
     */
    id: string;

    /**
     * List of choices
     */
    choices: Array<OpenAIChatCompletion.Choice>;

    /**
     * The Unix timestamp in seconds when the chat completion was created
     */
    created: number;

    /**
     * The model that was used to generate the chat completion
     */
    model: string;

    /**
     * The object type, which will be "chat.completion"
     */
    object: 'chat.completion';
  }

  export namespace OpenAIChatCompletion {
    /**
     * A choice from an OpenAI-compatible chat completion response.
     */
    export interface Choice {
      /**
       * The reason the model stopped generating
       */
      finish_reason: string;

      /**
       * The index of the choice
       */
      index: number;

      /**
       * The message from the model
       */
      message: ChatAPI.MessageParam;

      /**
       * (Optional) The log probabilities for the tokens in the message
       */
      logprobs?: V1API.ChoiceLogprobs;
    }
  }

  /**
   * Chunk from a streaming response to an OpenAI-compatible chat completion request.
   */
  export interface OpenAIChatCompletionChunk {
    /**
     * The ID of the chat completion
     */
    id: string;

    /**
     * List of choices
     */
    choices: Array<OpenAIChatCompletionChunk.Choice>;

    /**
     * The Unix timestamp in seconds when the chat completion was created
     */
    created: number;

    /**
     * The model that was used to generate the chat completion
     */
    model: string;

    /**
     * The object type, which will be "chat.completion.chunk"
     */
    object: 'chat.completion.chunk';
  }

  export namespace OpenAIChatCompletionChunk {
    /**
     * A chunk choice from an OpenAI-compatible chat completion streaming response.
     */
    export interface Choice {
      /**
       * The delta from the chunk
       */
      delta: Choice.Delta;

      /**
       * The reason the model stopped generating
       */
      finish_reason: string;

      /**
       * The index of the choice
       */
      index: number;

      /**
       * (Optional) The log probabilities for the tokens in the message
       */
      logprobs?: V1API.ChoiceLogprobs;
    }

    export namespace Choice {
      /**
       * The delta from the chunk
       */
      export interface Delta {
        /**
         * (Optional) The content of the delta
         */
        content?: string;

        /**
         * (Optional) The refusal of the delta
         */
        refusal?: string;

        /**
         * (Optional) The role of the delta
         */
        role?: string;

        /**
         * (Optional) The tool calls of the delta
         */
        tool_calls?: Array<ChatAPI.ChatCompletionToolCall>;
      }
    }
  }
}

export interface ChatGenerateCompletionParams {
  /**
   * List of messages in the conversation
   */
  messages: Array<MessageParam>;

  /**
   * The identifier of the model to use. The model must be registered with Llama
   * Stack and available via the /models endpoint.
   */
  model: string;

  /**
   * (Optional) The penalty for repeated tokens
   */
  frequency_penalty?: number;

  /**
   * (Optional) The function call to use
   */
  function_call?: string | { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * (Optional) List of functions to use
   */
  functions?: Array<{ [key: string]: boolean | number | string | Array<unknown> | unknown | null }>;

  /**
   * (Optional) The logit bias to use
   */
  logit_bias?: { [key: string]: number };

  /**
   * (Optional) The log probabilities to use
   */
  logprobs?: boolean;

  /**
   * (Optional) The maximum number of tokens to generate
   */
  max_completion_tokens?: number;

  /**
   * (Optional) The maximum number of tokens to generate
   */
  max_tokens?: number;

  /**
   * (Optional) The number of completions to generate
   */
  n?: number;

  /**
   * (Optional) Whether to parallelize tool calls
   */
  parallel_tool_calls?: boolean;

  /**
   * (Optional) The penalty for repeated tokens
   */
  presence_penalty?: number;

  /**
   * (Optional) The response format to use
   */
  response_format?:
    | ChatGenerateCompletionParams.OpenAIResponseFormatText
    | ChatGenerateCompletionParams.OpenAIResponseFormatJsonSchema
    | ChatGenerateCompletionParams.OpenAIResponseFormatJsonObject;

  /**
   * (Optional) The seed to use
   */
  seed?: number;

  /**
   * (Optional) The stop tokens to use
   */
  stop?: string | Array<string>;

  /**
   * (Optional) Whether to stream the response
   */
  stream?: boolean;

  /**
   * (Optional) The stream options to use
   */
  stream_options?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * (Optional) The temperature to use
   */
  temperature?: number;

  /**
   * (Optional) The tool choice to use
   */
  tool_choice?: string | { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * (Optional) The tools to use
   */
  tools?: Array<{ [key: string]: boolean | number | string | Array<unknown> | unknown | null }>;

  /**
   * (Optional) The top log probabilities to use
   */
  top_logprobs?: number;

  /**
   * (Optional) The top p to use
   */
  top_p?: number;

  /**
   * (Optional) The user to use
   */
  user?: string;
}

export namespace ChatGenerateCompletionParams {
  export interface OpenAIResponseFormatText {
    type: 'text';
  }

  export interface OpenAIResponseFormatJsonSchema {
    json_schema: OpenAIResponseFormatJsonSchema.JsonSchema;

    type: 'json_schema';
  }

  export namespace OpenAIResponseFormatJsonSchema {
    export interface JsonSchema {
      name: string;

      description?: string;

      schema?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

      strict?: boolean;
    }
  }

  export interface OpenAIResponseFormatJsonObject {
    type: 'json_object';
  }
}

export declare namespace Chat {
  export {
    type ChatCompletionContentPart as ChatCompletionContentPart,
    type ChatCompletionToolCall as ChatCompletionToolCall,
    type MessageParam as MessageParam,
    type ChatGenerateCompletionResponse as ChatGenerateCompletionResponse,
    type ChatGenerateCompletionParams as ChatGenerateCompletionParams,
  };
}
