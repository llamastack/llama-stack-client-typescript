// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import { APIPromise } from '../../core';
import * as Core from '../../core';
import * as CompletionsAPI from './completions';
import * as ChatAPI from './chat';
import { OpenAICursorPage, type OpenAICursorPageParams } from '../../pagination';
import { Stream } from '../../streaming';

export class Completions extends APIResource {
  /**
   * Create chat completions. Generate an OpenAI-compatible chat completion for the
   * given messages using the specified model.
   */
  create(
    body: CompletionCreateParamsNonStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<CompletionCreateResponse>;
  create(
    body: CompletionCreateParamsStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ChatAPI.ChatCompletionChunk>>;
  create(
    body: CompletionCreateParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ChatAPI.ChatCompletionChunk> | CompletionCreateResponse>;
  create(
    body: CompletionCreateParams,
    options?: Core.RequestOptions,
  ): APIPromise<CompletionCreateResponse> | APIPromise<Stream<ChatAPI.ChatCompletionChunk>> {
    return this._client.post('/v1/chat/completions', { body, ...options, stream: body.stream ?? false }) as
      | APIPromise<CompletionCreateResponse>
      | APIPromise<Stream<ChatAPI.ChatCompletionChunk>>;
  }

  /**
   * Get chat completion. Describe a chat completion by its ID.
   */
  retrieve(completionId: string, options?: Core.RequestOptions): Core.APIPromise<CompletionRetrieveResponse> {
    return this._client.get(`/v1/chat/completions/${completionId}`, options);
  }

  /**
   * List chat completions.
   */
  list(
    query?: CompletionListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<CompletionListResponsesOpenAICursorPage, CompletionListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<CompletionListResponsesOpenAICursorPage, CompletionListResponse>;
  list(
    query: CompletionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<CompletionListResponsesOpenAICursorPage, CompletionListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/chat/completions', CompletionListResponsesOpenAICursorPage, {
      query,
      ...options,
    });
  }
}

export class CompletionListResponsesOpenAICursorPage extends OpenAICursorPage<CompletionListResponse> {}

/**
 * Response from an OpenAI-compatible chat completion request.
 */
export type CompletionCreateResponse =
  | CompletionCreateResponse.OpenAIChatCompletion
  | ChatAPI.ChatCompletionChunk;

export namespace CompletionCreateResponse {
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

    /**
     * Token usage information for the completion
     */
    usage?: OpenAIChatCompletion.Usage;
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
      message:
        | Choice.OpenAIUserMessageParam
        | Choice.OpenAISystemMessageParam
        | Choice.OpenAIAssistantMessageParam
        | Choice.OpenAIToolMessageParam
        | Choice.OpenAIDeveloperMessageParam;

      /**
       * (Optional) The log probabilities for the tokens in the message
       */
      logprobs?: Choice.Logprobs;
    }

    export namespace Choice {
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

      /**
       * (Optional) The log probabilities for the tokens in the message
       */
      export interface Logprobs {
        /**
         * (Optional) The log probabilities for the tokens in the message
         */
        content?: Array<Logprobs.Content>;

        /**
         * (Optional) The log probabilities for the tokens in the message
         */
        refusal?: Array<Logprobs.Refusal>;
      }

      export namespace Logprobs {
        /**
         * The log probability for a token from an OpenAI-compatible chat completion
         * response.
         */
        export interface Content {
          token: string;

          logprob: number;

          top_logprobs: Array<Content.TopLogprob>;

          bytes?: Array<number>;
        }

        export namespace Content {
          /**
           * The top log probability for a token from an OpenAI-compatible chat completion
           * response.
           */
          export interface TopLogprob {
            token: string;

            logprob: number;

            bytes?: Array<number>;
          }
        }

        /**
         * The log probability for a token from an OpenAI-compatible chat completion
         * response.
         */
        export interface Refusal {
          token: string;

          logprob: number;

          top_logprobs: Array<Refusal.TopLogprob>;

          bytes?: Array<number>;
        }

        export namespace Refusal {
          /**
           * The top log probability for a token from an OpenAI-compatible chat completion
           * response.
           */
          export interface TopLogprob {
            token: string;

            logprob: number;

            bytes?: Array<number>;
          }
        }
      }
    }

    /**
     * Token usage information for the completion
     */
    export interface Usage {
      /**
       * Number of tokens in the completion
       */
      completion_tokens: number;

      /**
       * Number of tokens in the prompt
       */
      prompt_tokens: number;

      /**
       * Total tokens used (prompt + completion)
       */
      total_tokens: number;

      /**
       * Token details for output tokens in OpenAI chat completion usage.
       */
      completion_tokens_details?: Usage.CompletionTokensDetails;

      /**
       * Token details for prompt tokens in OpenAI chat completion usage.
       */
      prompt_tokens_details?: Usage.PromptTokensDetails;
    }

    export namespace Usage {
      /**
       * Token details for output tokens in OpenAI chat completion usage.
       */
      export interface CompletionTokensDetails {
        /**
         * Number of tokens used for reasoning (o1/o3 models)
         */
        reasoning_tokens?: number;
      }

      /**
       * Token details for prompt tokens in OpenAI chat completion usage.
       */
      export interface PromptTokensDetails {
        /**
         * Number of tokens retrieved from cache
         */
        cached_tokens?: number;
      }
    }
  }
}

export interface CompletionRetrieveResponse {
  /**
   * The ID of the chat completion
   */
  id: string;

  /**
   * List of choices
   */
  choices: Array<CompletionRetrieveResponse.Choice>;

  /**
   * The Unix timestamp in seconds when the chat completion was created
   */
  created: number;

  input_messages: Array<
    | CompletionRetrieveResponse.OpenAIUserMessageParam
    | CompletionRetrieveResponse.OpenAISystemMessageParam
    | CompletionRetrieveResponse.OpenAIAssistantMessageParam
    | CompletionRetrieveResponse.OpenAIToolMessageParam
    | CompletionRetrieveResponse.OpenAIDeveloperMessageParam
  >;

  /**
   * The model that was used to generate the chat completion
   */
  model: string;

  /**
   * The object type, which will be "chat.completion"
   */
  object: 'chat.completion';

  /**
   * Token usage information for the completion
   */
  usage?: CompletionRetrieveResponse.Usage;
}

export namespace CompletionRetrieveResponse {
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
    message:
      | Choice.OpenAIUserMessageParam
      | Choice.OpenAISystemMessageParam
      | Choice.OpenAIAssistantMessageParam
      | Choice.OpenAIToolMessageParam
      | Choice.OpenAIDeveloperMessageParam;

    /**
     * (Optional) The log probabilities for the tokens in the message
     */
    logprobs?: Choice.Logprobs;
  }

  export namespace Choice {
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

    /**
     * (Optional) The log probabilities for the tokens in the message
     */
    export interface Logprobs {
      /**
       * (Optional) The log probabilities for the tokens in the message
       */
      content?: Array<Logprobs.Content>;

      /**
       * (Optional) The log probabilities for the tokens in the message
       */
      refusal?: Array<Logprobs.Refusal>;
    }

    export namespace Logprobs {
      /**
       * The log probability for a token from an OpenAI-compatible chat completion
       * response.
       */
      export interface Content {
        token: string;

        logprob: number;

        top_logprobs: Array<Content.TopLogprob>;

        bytes?: Array<number>;
      }

      export namespace Content {
        /**
         * The top log probability for a token from an OpenAI-compatible chat completion
         * response.
         */
        export interface TopLogprob {
          token: string;

          logprob: number;

          bytes?: Array<number>;
        }
      }

      /**
       * The log probability for a token from an OpenAI-compatible chat completion
       * response.
       */
      export interface Refusal {
        token: string;

        logprob: number;

        top_logprobs: Array<Refusal.TopLogprob>;

        bytes?: Array<number>;
      }

      export namespace Refusal {
        /**
         * The top log probability for a token from an OpenAI-compatible chat completion
         * response.
         */
        export interface TopLogprob {
          token: string;

          logprob: number;

          bytes?: Array<number>;
        }
      }
    }
  }

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

  /**
   * Token usage information for the completion
   */
  export interface Usage {
    /**
     * Number of tokens in the completion
     */
    completion_tokens: number;

    /**
     * Number of tokens in the prompt
     */
    prompt_tokens: number;

    /**
     * Total tokens used (prompt + completion)
     */
    total_tokens: number;

    /**
     * Token details for output tokens in OpenAI chat completion usage.
     */
    completion_tokens_details?: Usage.CompletionTokensDetails;

    /**
     * Token details for prompt tokens in OpenAI chat completion usage.
     */
    prompt_tokens_details?: Usage.PromptTokensDetails;
  }

  export namespace Usage {
    /**
     * Token details for output tokens in OpenAI chat completion usage.
     */
    export interface CompletionTokensDetails {
      /**
       * Number of tokens used for reasoning (o1/o3 models)
       */
      reasoning_tokens?: number;
    }

    /**
     * Token details for prompt tokens in OpenAI chat completion usage.
     */
    export interface PromptTokensDetails {
      /**
       * Number of tokens retrieved from cache
       */
      cached_tokens?: number;
    }
  }
}

export interface CompletionListResponse {
  /**
   * The ID of the chat completion
   */
  id: string;

  /**
   * List of choices
   */
  choices: Array<CompletionListResponse.Choice>;

  /**
   * The Unix timestamp in seconds when the chat completion was created
   */
  created: number;

  input_messages: Array<
    | CompletionListResponse.OpenAIUserMessageParam
    | CompletionListResponse.OpenAISystemMessageParam
    | CompletionListResponse.OpenAIAssistantMessageParam
    | CompletionListResponse.OpenAIToolMessageParam
    | CompletionListResponse.OpenAIDeveloperMessageParam
  >;

  /**
   * The model that was used to generate the chat completion
   */
  model: string;

  /**
   * The object type, which will be "chat.completion"
   */
  object: 'chat.completion';

  /**
   * Token usage information for the completion
   */
  usage?: CompletionListResponse.Usage;
}

export namespace CompletionListResponse {
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
    message:
      | Choice.OpenAIUserMessageParam
      | Choice.OpenAISystemMessageParam
      | Choice.OpenAIAssistantMessageParam
      | Choice.OpenAIToolMessageParam
      | Choice.OpenAIDeveloperMessageParam;

    /**
     * (Optional) The log probabilities for the tokens in the message
     */
    logprobs?: Choice.Logprobs;
  }

  export namespace Choice {
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

    /**
     * (Optional) The log probabilities for the tokens in the message
     */
    export interface Logprobs {
      /**
       * (Optional) The log probabilities for the tokens in the message
       */
      content?: Array<Logprobs.Content>;

      /**
       * (Optional) The log probabilities for the tokens in the message
       */
      refusal?: Array<Logprobs.Refusal>;
    }

    export namespace Logprobs {
      /**
       * The log probability for a token from an OpenAI-compatible chat completion
       * response.
       */
      export interface Content {
        token: string;

        logprob: number;

        top_logprobs: Array<Content.TopLogprob>;

        bytes?: Array<number>;
      }

      export namespace Content {
        /**
         * The top log probability for a token from an OpenAI-compatible chat completion
         * response.
         */
        export interface TopLogprob {
          token: string;

          logprob: number;

          bytes?: Array<number>;
        }
      }

      /**
       * The log probability for a token from an OpenAI-compatible chat completion
       * response.
       */
      export interface Refusal {
        token: string;

        logprob: number;

        top_logprobs: Array<Refusal.TopLogprob>;

        bytes?: Array<number>;
      }

      export namespace Refusal {
        /**
         * The top log probability for a token from an OpenAI-compatible chat completion
         * response.
         */
        export interface TopLogprob {
          token: string;

          logprob: number;

          bytes?: Array<number>;
        }
      }
    }
  }

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

  /**
   * Token usage information for the completion
   */
  export interface Usage {
    /**
     * Number of tokens in the completion
     */
    completion_tokens: number;

    /**
     * Number of tokens in the prompt
     */
    prompt_tokens: number;

    /**
     * Total tokens used (prompt + completion)
     */
    total_tokens: number;

    /**
     * Token details for output tokens in OpenAI chat completion usage.
     */
    completion_tokens_details?: Usage.CompletionTokensDetails;

    /**
     * Token details for prompt tokens in OpenAI chat completion usage.
     */
    prompt_tokens_details?: Usage.PromptTokensDetails;
  }

  export namespace Usage {
    /**
     * Token details for output tokens in OpenAI chat completion usage.
     */
    export interface CompletionTokensDetails {
      /**
       * Number of tokens used for reasoning (o1/o3 models)
       */
      reasoning_tokens?: number;
    }

    /**
     * Token details for prompt tokens in OpenAI chat completion usage.
     */
    export interface PromptTokensDetails {
      /**
       * Number of tokens retrieved from cache
       */
      cached_tokens?: number;
    }
  }
}

export type CompletionCreateParams = CompletionCreateParamsNonStreaming | CompletionCreateParamsStreaming;

export interface CompletionCreateParamsBase {
  /**
   * List of messages in the conversation.
   */
  messages: Array<
    | CompletionCreateParams.OpenAIUserMessageParam
    | CompletionCreateParams.OpenAISystemMessageParam
    | CompletionCreateParams.OpenAIAssistantMessageParam
    | CompletionCreateParams.OpenAIToolMessageParam
    | CompletionCreateParams.OpenAIDeveloperMessageParam
  >;

  /**
   * The identifier of the model to use. The model must be registered with Llama
   * Stack and available via the /models endpoint.
   */
  model: string;

  /**
   * (Optional) The penalty for repeated tokens.
   */
  frequency_penalty?: number;

  /**
   * (Optional) The function call to use.
   */
  function_call?: string | { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * (Optional) List of functions to use.
   */
  functions?: Array<{ [key: string]: boolean | number | string | Array<unknown> | unknown | null }>;

  /**
   * (Optional) The logit bias to use.
   */
  logit_bias?: { [key: string]: number };

  /**
   * (Optional) The log probabilities to use.
   */
  logprobs?: boolean;

  /**
   * (Optional) The maximum number of tokens to generate.
   */
  max_completion_tokens?: number;

  /**
   * (Optional) The maximum number of tokens to generate.
   */
  max_tokens?: number;

  /**
   * (Optional) The number of completions to generate.
   */
  n?: number;

  /**
   * (Optional) Whether to parallelize tool calls.
   */
  parallel_tool_calls?: boolean;

  /**
   * (Optional) The penalty for repeated tokens.
   */
  presence_penalty?: number;

  /**
   * (Optional) The response format to use.
   */
  response_format?:
    | CompletionCreateParams.OpenAIResponseFormatText
    | CompletionCreateParams.OpenAIResponseFormatJsonSchema
    | CompletionCreateParams.OpenAIResponseFormatJsonObject;

  /**
   * (Optional) The seed to use.
   */
  seed?: number;

  /**
   * (Optional) The stop tokens to use.
   */
  stop?: string | Array<string>;

  /**
   * (Optional) Whether to stream the response.
   */
  stream?: boolean;

  /**
   * (Optional) The stream options to use.
   */
  stream_options?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * (Optional) The temperature to use.
   */
  temperature?: number;

  /**
   * (Optional) The tool choice to use.
   */
  tool_choice?: string | { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * (Optional) The tools to use.
   */
  tools?: Array<{ [key: string]: boolean | number | string | Array<unknown> | unknown | null }>;

  /**
   * (Optional) The top log probabilities to use.
   */
  top_logprobs?: number;

  /**
   * (Optional) The top p to use.
   */
  top_p?: number;

  /**
   * (Optional) The user to use.
   */
  user?: string;
}

export namespace CompletionCreateParams {
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

  /**
   * Text response format for OpenAI-compatible chat completion requests.
   */
  export interface OpenAIResponseFormatText {
    /**
     * Must be "text" to indicate plain text response format
     */
    type: 'text';
  }

  /**
   * JSON schema response format for OpenAI-compatible chat completion requests.
   */
  export interface OpenAIResponseFormatJsonSchema {
    /**
     * The JSON schema specification for the response
     */
    json_schema: OpenAIResponseFormatJsonSchema.JsonSchema;

    /**
     * Must be "json_schema" to indicate structured JSON response format
     */
    type: 'json_schema';
  }

  export namespace OpenAIResponseFormatJsonSchema {
    /**
     * The JSON schema specification for the response
     */
    export interface JsonSchema {
      /**
       * Name of the schema
       */
      name: string;

      /**
       * (Optional) Description of the schema
       */
      description?: string;

      /**
       * (Optional) The JSON schema definition
       */
      schema?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

      /**
       * (Optional) Whether to enforce strict adherence to the schema
       */
      strict?: boolean;
    }
  }

  /**
   * JSON object response format for OpenAI-compatible chat completion requests.
   */
  export interface OpenAIResponseFormatJsonObject {
    /**
     * Must be "json_object" to indicate generic JSON object response format
     */
    type: 'json_object';
  }

  export type CompletionCreateParamsNonStreaming = CompletionsAPI.CompletionCreateParamsNonStreaming;
  export type CompletionCreateParamsStreaming = CompletionsAPI.CompletionCreateParamsStreaming;
}

export interface CompletionCreateParamsNonStreaming extends CompletionCreateParamsBase {
  /**
   * (Optional) Whether to stream the response.
   */
  stream?: false;
}

export interface CompletionCreateParamsStreaming extends CompletionCreateParamsBase {
  /**
   * (Optional) Whether to stream the response.
   */
  stream: true;
}

export interface CompletionListParams extends OpenAICursorPageParams {
  /**
   * The model to filter by.
   */
  model?: string;

  /**
   * The order to sort the chat completions by: "asc" or "desc". Defaults to "desc".
   */
  order?: 'asc' | 'desc';
}

Completions.CompletionListResponsesOpenAICursorPage = CompletionListResponsesOpenAICursorPage;

export declare namespace Completions {
  export {
    type CompletionCreateResponse as CompletionCreateResponse,
    type CompletionRetrieveResponse as CompletionRetrieveResponse,
    type CompletionListResponse as CompletionListResponse,
    CompletionListResponsesOpenAICursorPage as CompletionListResponsesOpenAICursorPage,
    type CompletionCreateParams as CompletionCreateParams,
    type CompletionCreateParamsNonStreaming as CompletionCreateParamsNonStreaming,
    type CompletionCreateParamsStreaming as CompletionCreateParamsStreaming,
    type CompletionListParams as CompletionListParams,
  };
}
