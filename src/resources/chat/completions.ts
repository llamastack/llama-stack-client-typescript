// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import { APIPromise } from '../../core';
import * as Core from '../../core';
import * as CompletionsAPI from './completions';
import * as ChatAPI from './chat';
import { Stream } from '../../streaming';

export class Completions extends APIResource {
  /**
   * Create chat completions.
   *
   * Generate an OpenAI-compatible chat completion for the given messages using the
   * specified model.
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
   * Get chat completion.
   *
   * Describe a chat completion by its ID.
   */
  retrieve(completionId: string, options?: Core.RequestOptions): Core.APIPromise<CompletionRetrieveResponse> {
    return this._client.get(`/v1/chat/completions/${completionId}`, options);
  }

  /**
   * List chat completions.
   */
  list(query?: CompletionListParams, options?: Core.RequestOptions): Core.APIPromise<CompletionListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<CompletionListResponse>;
  list(
    query: CompletionListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<CompletionListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/v1/chat/completions', { query, ...options });
  }
}

/**
 * Response from an OpenAI-compatible chat completion request.
 */
export interface CompletionCreateResponse {
  id: string;

  choices: Array<CompletionCreateResponse.Choice>;

  created: number;

  model: string;

  object?: 'chat.completion';

  /**
   * Usage information for OpenAI chat completion.
   */
  usage?: CompletionCreateResponse.Usage | null;
}

export namespace CompletionCreateResponse {
  /**
   * A choice from an OpenAI-compatible chat completion response.
   */
  export interface Choice {
    finish_reason: string;

    index: number;

    /**
     * A message from the user in an OpenAI-compatible chat completion request.
     */
    message:
      | Choice.OpenAIUserMessageParamOutput
      | Choice.OpenAISystemMessageParam
      | Choice.OpenAIAssistantMessageParamOutput
      | Choice.OpenAIToolMessageParam
      | Choice.OpenAIDeveloperMessageParam;

    /**
     * The log probabilities for the tokens in the message from an OpenAI-compatible
     * chat completion response.
     */
    logprobs?: Choice.Logprobs | null;
  }

  export namespace Choice {
    /**
     * A message from the user in an OpenAI-compatible chat completion request.
     */
    export interface OpenAIUserMessageParamOutput {
      content:
        | string
        | Array<
            | OpenAIUserMessageParamOutput.OpenAIChatCompletionContentPartTextParam
            | OpenAIUserMessageParamOutput.OpenAIChatCompletionContentPartImageParam
            | OpenAIUserMessageParamOutput.OpenAIFile
          >;

      name?: string | null;

      role?: 'user';
    }

    export namespace OpenAIUserMessageParamOutput {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface OpenAIChatCompletionContentPartTextParam {
        text: string;

        type?: 'text';
      }

      /**
       * Image content part for OpenAI-compatible chat completion messages.
       */
      export interface OpenAIChatCompletionContentPartImageParam {
        /**
         * Image URL specification for OpenAI-compatible chat completion messages.
         */
        image_url: OpenAIChatCompletionContentPartImageParam.ImageURL;

        type?: 'image_url';
      }

      export namespace OpenAIChatCompletionContentPartImageParam {
        /**
         * Image URL specification for OpenAI-compatible chat completion messages.
         */
        export interface ImageURL {
          url: string;

          detail?: string | null;
        }
      }

      export interface OpenAIFile {
        file: OpenAIFile.File;

        type?: 'file';
      }

      export namespace OpenAIFile {
        export interface File {
          file_data?: string | null;

          file_id?: string | null;

          filename?: string | null;
        }
      }
    }

    /**
     * A system message providing instructions or context to the model.
     */
    export interface OpenAISystemMessageParam {
      content: string | Array<OpenAISystemMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

      name?: string | null;

      role?: 'system';
    }

    export namespace OpenAISystemMessageParam {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface ListOpenAIChatCompletionContentPartTextParam {
        text: string;

        type?: 'text';
      }
    }

    /**
     * A message containing the model's (assistant) response in an OpenAI-compatible
     * chat completion request.
     */
    export interface OpenAIAssistantMessageParamOutput {
      content?:
        | string
        | Array<OpenAIAssistantMessageParamOutput.ListOpenAIChatCompletionContentPartTextParam>
        | null;

      name?: string | null;

      role?: 'assistant';

      tool_calls?: Array<OpenAIAssistantMessageParamOutput.ToolCall> | null;
    }

    export namespace OpenAIAssistantMessageParamOutput {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface ListOpenAIChatCompletionContentPartTextParam {
        text: string;

        type?: 'text';
      }

      /**
       * Tool call specification for OpenAI-compatible chat completion responses.
       */
      export interface ToolCall {
        id?: string | null;

        /**
         * Function call details for OpenAI-compatible tool calls.
         */
        function?: ToolCall.Function | null;

        index?: number | null;

        type?: 'function';
      }

      export namespace ToolCall {
        /**
         * Function call details for OpenAI-compatible tool calls.
         */
        export interface Function {
          arguments?: string | null;

          name?: string | null;
        }
      }
    }

    /**
     * A message representing the result of a tool invocation in an OpenAI-compatible
     * chat completion request.
     */
    export interface OpenAIToolMessageParam {
      content: string | Array<OpenAIToolMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

      tool_call_id: string;

      role?: 'tool';
    }

    export namespace OpenAIToolMessageParam {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface ListOpenAIChatCompletionContentPartTextParam {
        text: string;

        type?: 'text';
      }
    }

    /**
     * A message from the developer in an OpenAI-compatible chat completion request.
     */
    export interface OpenAIDeveloperMessageParam {
      content: string | Array<OpenAIDeveloperMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

      name?: string | null;

      role?: 'developer';
    }

    export namespace OpenAIDeveloperMessageParam {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface ListOpenAIChatCompletionContentPartTextParam {
        text: string;

        type?: 'text';
      }
    }

    /**
     * The log probabilities for the tokens in the message from an OpenAI-compatible
     * chat completion response.
     */
    export interface Logprobs {
      content?: Array<Logprobs.Content> | null;

      refusal?: Array<Logprobs.Refusal> | null;
    }

    export namespace Logprobs {
      /**
       * The log probability for a token from an OpenAI-compatible chat completion
       * response.
       *
       * :token: The token :bytes: (Optional) The bytes for the token :logprob: The log
       * probability of the token :top_logprobs: The top log probabilities for the token
       */
      export interface Content {
        token: string;

        logprob: number;

        top_logprobs: Array<Content.TopLogprob>;

        bytes?: Array<number> | null;
      }

      export namespace Content {
        /**
         * The top log probability for a token from an OpenAI-compatible chat completion
         * response.
         *
         * :token: The token :bytes: (Optional) The bytes for the token :logprob: The log
         * probability of the token
         */
        export interface TopLogprob {
          token: string;

          logprob: number;

          bytes?: Array<number> | null;
        }
      }

      /**
       * The log probability for a token from an OpenAI-compatible chat completion
       * response.
       *
       * :token: The token :bytes: (Optional) The bytes for the token :logprob: The log
       * probability of the token :top_logprobs: The top log probabilities for the token
       */
      export interface Refusal {
        token: string;

        logprob: number;

        top_logprobs: Array<Refusal.TopLogprob>;

        bytes?: Array<number> | null;
      }

      export namespace Refusal {
        /**
         * The top log probability for a token from an OpenAI-compatible chat completion
         * response.
         *
         * :token: The token :bytes: (Optional) The bytes for the token :logprob: The log
         * probability of the token
         */
        export interface TopLogprob {
          token: string;

          logprob: number;

          bytes?: Array<number> | null;
        }
      }
    }
  }

  /**
   * Usage information for OpenAI chat completion.
   */
  export interface Usage {
    completion_tokens: number;

    prompt_tokens: number;

    total_tokens: number;

    /**
     * Token details for output tokens in OpenAI chat completion usage.
     */
    completion_tokens_details?: Usage.CompletionTokensDetails | null;

    /**
     * Token details for prompt tokens in OpenAI chat completion usage.
     */
    prompt_tokens_details?: Usage.PromptTokensDetails | null;
  }

  export namespace Usage {
    /**
     * Token details for output tokens in OpenAI chat completion usage.
     */
    export interface CompletionTokensDetails {
      reasoning_tokens?: number | null;
    }

    /**
     * Token details for prompt tokens in OpenAI chat completion usage.
     */
    export interface PromptTokensDetails {
      cached_tokens?: number | null;
    }
  }
}

export interface CompletionRetrieveResponse {
  id: string;

  choices: Array<CompletionRetrieveResponse.Choice>;

  created: number;

  input_messages: Array<
    | CompletionRetrieveResponse.OpenAIUserMessageParamOutput
    | CompletionRetrieveResponse.OpenAISystemMessageParam
    | CompletionRetrieveResponse.OpenAIAssistantMessageParamOutput
    | CompletionRetrieveResponse.OpenAIToolMessageParam
    | CompletionRetrieveResponse.OpenAIDeveloperMessageParam
  >;

  model: string;

  object?: 'chat.completion';

  /**
   * Usage information for OpenAI chat completion.
   */
  usage?: CompletionRetrieveResponse.Usage | null;
}

export namespace CompletionRetrieveResponse {
  /**
   * A choice from an OpenAI-compatible chat completion response.
   */
  export interface Choice {
    finish_reason: string;

    index: number;

    /**
     * A message from the user in an OpenAI-compatible chat completion request.
     */
    message:
      | Choice.OpenAIUserMessageParamOutput
      | Choice.OpenAISystemMessageParam
      | Choice.OpenAIAssistantMessageParamOutput
      | Choice.OpenAIToolMessageParam
      | Choice.OpenAIDeveloperMessageParam;

    /**
     * The log probabilities for the tokens in the message from an OpenAI-compatible
     * chat completion response.
     */
    logprobs?: Choice.Logprobs | null;
  }

  export namespace Choice {
    /**
     * A message from the user in an OpenAI-compatible chat completion request.
     */
    export interface OpenAIUserMessageParamOutput {
      content:
        | string
        | Array<
            | OpenAIUserMessageParamOutput.OpenAIChatCompletionContentPartTextParam
            | OpenAIUserMessageParamOutput.OpenAIChatCompletionContentPartImageParam
            | OpenAIUserMessageParamOutput.OpenAIFile
          >;

      name?: string | null;

      role?: 'user';
    }

    export namespace OpenAIUserMessageParamOutput {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface OpenAIChatCompletionContentPartTextParam {
        text: string;

        type?: 'text';
      }

      /**
       * Image content part for OpenAI-compatible chat completion messages.
       */
      export interface OpenAIChatCompletionContentPartImageParam {
        /**
         * Image URL specification for OpenAI-compatible chat completion messages.
         */
        image_url: OpenAIChatCompletionContentPartImageParam.ImageURL;

        type?: 'image_url';
      }

      export namespace OpenAIChatCompletionContentPartImageParam {
        /**
         * Image URL specification for OpenAI-compatible chat completion messages.
         */
        export interface ImageURL {
          url: string;

          detail?: string | null;
        }
      }

      export interface OpenAIFile {
        file: OpenAIFile.File;

        type?: 'file';
      }

      export namespace OpenAIFile {
        export interface File {
          file_data?: string | null;

          file_id?: string | null;

          filename?: string | null;
        }
      }
    }

    /**
     * A system message providing instructions or context to the model.
     */
    export interface OpenAISystemMessageParam {
      content: string | Array<OpenAISystemMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

      name?: string | null;

      role?: 'system';
    }

    export namespace OpenAISystemMessageParam {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface ListOpenAIChatCompletionContentPartTextParam {
        text: string;

        type?: 'text';
      }
    }

    /**
     * A message containing the model's (assistant) response in an OpenAI-compatible
     * chat completion request.
     */
    export interface OpenAIAssistantMessageParamOutput {
      content?:
        | string
        | Array<OpenAIAssistantMessageParamOutput.ListOpenAIChatCompletionContentPartTextParam>
        | null;

      name?: string | null;

      role?: 'assistant';

      tool_calls?: Array<OpenAIAssistantMessageParamOutput.ToolCall> | null;
    }

    export namespace OpenAIAssistantMessageParamOutput {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface ListOpenAIChatCompletionContentPartTextParam {
        text: string;

        type?: 'text';
      }

      /**
       * Tool call specification for OpenAI-compatible chat completion responses.
       */
      export interface ToolCall {
        id?: string | null;

        /**
         * Function call details for OpenAI-compatible tool calls.
         */
        function?: ToolCall.Function | null;

        index?: number | null;

        type?: 'function';
      }

      export namespace ToolCall {
        /**
         * Function call details for OpenAI-compatible tool calls.
         */
        export interface Function {
          arguments?: string | null;

          name?: string | null;
        }
      }
    }

    /**
     * A message representing the result of a tool invocation in an OpenAI-compatible
     * chat completion request.
     */
    export interface OpenAIToolMessageParam {
      content: string | Array<OpenAIToolMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

      tool_call_id: string;

      role?: 'tool';
    }

    export namespace OpenAIToolMessageParam {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface ListOpenAIChatCompletionContentPartTextParam {
        text: string;

        type?: 'text';
      }
    }

    /**
     * A message from the developer in an OpenAI-compatible chat completion request.
     */
    export interface OpenAIDeveloperMessageParam {
      content: string | Array<OpenAIDeveloperMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

      name?: string | null;

      role?: 'developer';
    }

    export namespace OpenAIDeveloperMessageParam {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface ListOpenAIChatCompletionContentPartTextParam {
        text: string;

        type?: 'text';
      }
    }

    /**
     * The log probabilities for the tokens in the message from an OpenAI-compatible
     * chat completion response.
     */
    export interface Logprobs {
      content?: Array<Logprobs.Content> | null;

      refusal?: Array<Logprobs.Refusal> | null;
    }

    export namespace Logprobs {
      /**
       * The log probability for a token from an OpenAI-compatible chat completion
       * response.
       *
       * :token: The token :bytes: (Optional) The bytes for the token :logprob: The log
       * probability of the token :top_logprobs: The top log probabilities for the token
       */
      export interface Content {
        token: string;

        logprob: number;

        top_logprobs: Array<Content.TopLogprob>;

        bytes?: Array<number> | null;
      }

      export namespace Content {
        /**
         * The top log probability for a token from an OpenAI-compatible chat completion
         * response.
         *
         * :token: The token :bytes: (Optional) The bytes for the token :logprob: The log
         * probability of the token
         */
        export interface TopLogprob {
          token: string;

          logprob: number;

          bytes?: Array<number> | null;
        }
      }

      /**
       * The log probability for a token from an OpenAI-compatible chat completion
       * response.
       *
       * :token: The token :bytes: (Optional) The bytes for the token :logprob: The log
       * probability of the token :top_logprobs: The top log probabilities for the token
       */
      export interface Refusal {
        token: string;

        logprob: number;

        top_logprobs: Array<Refusal.TopLogprob>;

        bytes?: Array<number> | null;
      }

      export namespace Refusal {
        /**
         * The top log probability for a token from an OpenAI-compatible chat completion
         * response.
         *
         * :token: The token :bytes: (Optional) The bytes for the token :logprob: The log
         * probability of the token
         */
        export interface TopLogprob {
          token: string;

          logprob: number;

          bytes?: Array<number> | null;
        }
      }
    }
  }

  /**
   * A message from the user in an OpenAI-compatible chat completion request.
   */
  export interface OpenAIUserMessageParamOutput {
    content:
      | string
      | Array<
          | OpenAIUserMessageParamOutput.OpenAIChatCompletionContentPartTextParam
          | OpenAIUserMessageParamOutput.OpenAIChatCompletionContentPartImageParam
          | OpenAIUserMessageParamOutput.OpenAIFile
        >;

    name?: string | null;

    role?: 'user';
  }

  export namespace OpenAIUserMessageParamOutput {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface OpenAIChatCompletionContentPartTextParam {
      text: string;

      type?: 'text';
    }

    /**
     * Image content part for OpenAI-compatible chat completion messages.
     */
    export interface OpenAIChatCompletionContentPartImageParam {
      /**
       * Image URL specification for OpenAI-compatible chat completion messages.
       */
      image_url: OpenAIChatCompletionContentPartImageParam.ImageURL;

      type?: 'image_url';
    }

    export namespace OpenAIChatCompletionContentPartImageParam {
      /**
       * Image URL specification for OpenAI-compatible chat completion messages.
       */
      export interface ImageURL {
        url: string;

        detail?: string | null;
      }
    }

    export interface OpenAIFile {
      file: OpenAIFile.File;

      type?: 'file';
    }

    export namespace OpenAIFile {
      export interface File {
        file_data?: string | null;

        file_id?: string | null;

        filename?: string | null;
      }
    }
  }

  /**
   * A system message providing instructions or context to the model.
   */
  export interface OpenAISystemMessageParam {
    content: string | Array<OpenAISystemMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

    name?: string | null;

    role?: 'system';
  }

  export namespace OpenAISystemMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      text: string;

      type?: 'text';
    }
  }

  /**
   * A message containing the model's (assistant) response in an OpenAI-compatible
   * chat completion request.
   */
  export interface OpenAIAssistantMessageParamOutput {
    content?:
      | string
      | Array<OpenAIAssistantMessageParamOutput.ListOpenAIChatCompletionContentPartTextParam>
      | null;

    name?: string | null;

    role?: 'assistant';

    tool_calls?: Array<OpenAIAssistantMessageParamOutput.ToolCall> | null;
  }

  export namespace OpenAIAssistantMessageParamOutput {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      text: string;

      type?: 'text';
    }

    /**
     * Tool call specification for OpenAI-compatible chat completion responses.
     */
    export interface ToolCall {
      id?: string | null;

      /**
       * Function call details for OpenAI-compatible tool calls.
       */
      function?: ToolCall.Function | null;

      index?: number | null;

      type?: 'function';
    }

    export namespace ToolCall {
      /**
       * Function call details for OpenAI-compatible tool calls.
       */
      export interface Function {
        arguments?: string | null;

        name?: string | null;
      }
    }
  }

  /**
   * A message representing the result of a tool invocation in an OpenAI-compatible
   * chat completion request.
   */
  export interface OpenAIToolMessageParam {
    content: string | Array<OpenAIToolMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

    tool_call_id: string;

    role?: 'tool';
  }

  export namespace OpenAIToolMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      text: string;

      type?: 'text';
    }
  }

  /**
   * A message from the developer in an OpenAI-compatible chat completion request.
   */
  export interface OpenAIDeveloperMessageParam {
    content: string | Array<OpenAIDeveloperMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

    name?: string | null;

    role?: 'developer';
  }

  export namespace OpenAIDeveloperMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      text: string;

      type?: 'text';
    }
  }

  /**
   * Usage information for OpenAI chat completion.
   */
  export interface Usage {
    completion_tokens: number;

    prompt_tokens: number;

    total_tokens: number;

    /**
     * Token details for output tokens in OpenAI chat completion usage.
     */
    completion_tokens_details?: Usage.CompletionTokensDetails | null;

    /**
     * Token details for prompt tokens in OpenAI chat completion usage.
     */
    prompt_tokens_details?: Usage.PromptTokensDetails | null;
  }

  export namespace Usage {
    /**
     * Token details for output tokens in OpenAI chat completion usage.
     */
    export interface CompletionTokensDetails {
      reasoning_tokens?: number | null;
    }

    /**
     * Token details for prompt tokens in OpenAI chat completion usage.
     */
    export interface PromptTokensDetails {
      cached_tokens?: number | null;
    }
  }
}

/**
 * Response from listing OpenAI-compatible chat completions.
 */
export interface CompletionListResponse {
  data: Array<CompletionListResponse.Data>;

  first_id: string;

  has_more: boolean;

  last_id: string;

  object?: 'list';
}

export namespace CompletionListResponse {
  export interface Data {
    id: string;

    choices: Array<Data.Choice>;

    created: number;

    input_messages: Array<
      | Data.OpenAIUserMessageParamOutput
      | Data.OpenAISystemMessageParam
      | Data.OpenAIAssistantMessageParamOutput
      | Data.OpenAIToolMessageParam
      | Data.OpenAIDeveloperMessageParam
    >;

    model: string;

    object?: 'chat.completion';

    /**
     * Usage information for OpenAI chat completion.
     */
    usage?: Data.Usage | null;
  }

  export namespace Data {
    /**
     * A choice from an OpenAI-compatible chat completion response.
     */
    export interface Choice {
      finish_reason: string;

      index: number;

      /**
       * A message from the user in an OpenAI-compatible chat completion request.
       */
      message:
        | Choice.OpenAIUserMessageParamOutput
        | Choice.OpenAISystemMessageParam
        | Choice.OpenAIAssistantMessageParamOutput
        | Choice.OpenAIToolMessageParam
        | Choice.OpenAIDeveloperMessageParam;

      /**
       * The log probabilities for the tokens in the message from an OpenAI-compatible
       * chat completion response.
       */
      logprobs?: Choice.Logprobs | null;
    }

    export namespace Choice {
      /**
       * A message from the user in an OpenAI-compatible chat completion request.
       */
      export interface OpenAIUserMessageParamOutput {
        content:
          | string
          | Array<
              | OpenAIUserMessageParamOutput.OpenAIChatCompletionContentPartTextParam
              | OpenAIUserMessageParamOutput.OpenAIChatCompletionContentPartImageParam
              | OpenAIUserMessageParamOutput.OpenAIFile
            >;

        name?: string | null;

        role?: 'user';
      }

      export namespace OpenAIUserMessageParamOutput {
        /**
         * Text content part for OpenAI-compatible chat completion messages.
         */
        export interface OpenAIChatCompletionContentPartTextParam {
          text: string;

          type?: 'text';
        }

        /**
         * Image content part for OpenAI-compatible chat completion messages.
         */
        export interface OpenAIChatCompletionContentPartImageParam {
          /**
           * Image URL specification for OpenAI-compatible chat completion messages.
           */
          image_url: OpenAIChatCompletionContentPartImageParam.ImageURL;

          type?: 'image_url';
        }

        export namespace OpenAIChatCompletionContentPartImageParam {
          /**
           * Image URL specification for OpenAI-compatible chat completion messages.
           */
          export interface ImageURL {
            url: string;

            detail?: string | null;
          }
        }

        export interface OpenAIFile {
          file: OpenAIFile.File;

          type?: 'file';
        }

        export namespace OpenAIFile {
          export interface File {
            file_data?: string | null;

            file_id?: string | null;

            filename?: string | null;
          }
        }
      }

      /**
       * A system message providing instructions or context to the model.
       */
      export interface OpenAISystemMessageParam {
        content: string | Array<OpenAISystemMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

        name?: string | null;

        role?: 'system';
      }

      export namespace OpenAISystemMessageParam {
        /**
         * Text content part for OpenAI-compatible chat completion messages.
         */
        export interface ListOpenAIChatCompletionContentPartTextParam {
          text: string;

          type?: 'text';
        }
      }

      /**
       * A message containing the model's (assistant) response in an OpenAI-compatible
       * chat completion request.
       */
      export interface OpenAIAssistantMessageParamOutput {
        content?:
          | string
          | Array<OpenAIAssistantMessageParamOutput.ListOpenAIChatCompletionContentPartTextParam>
          | null;

        name?: string | null;

        role?: 'assistant';

        tool_calls?: Array<OpenAIAssistantMessageParamOutput.ToolCall> | null;
      }

      export namespace OpenAIAssistantMessageParamOutput {
        /**
         * Text content part for OpenAI-compatible chat completion messages.
         */
        export interface ListOpenAIChatCompletionContentPartTextParam {
          text: string;

          type?: 'text';
        }

        /**
         * Tool call specification for OpenAI-compatible chat completion responses.
         */
        export interface ToolCall {
          id?: string | null;

          /**
           * Function call details for OpenAI-compatible tool calls.
           */
          function?: ToolCall.Function | null;

          index?: number | null;

          type?: 'function';
        }

        export namespace ToolCall {
          /**
           * Function call details for OpenAI-compatible tool calls.
           */
          export interface Function {
            arguments?: string | null;

            name?: string | null;
          }
        }
      }

      /**
       * A message representing the result of a tool invocation in an OpenAI-compatible
       * chat completion request.
       */
      export interface OpenAIToolMessageParam {
        content: string | Array<OpenAIToolMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

        tool_call_id: string;

        role?: 'tool';
      }

      export namespace OpenAIToolMessageParam {
        /**
         * Text content part for OpenAI-compatible chat completion messages.
         */
        export interface ListOpenAIChatCompletionContentPartTextParam {
          text: string;

          type?: 'text';
        }
      }

      /**
       * A message from the developer in an OpenAI-compatible chat completion request.
       */
      export interface OpenAIDeveloperMessageParam {
        content: string | Array<OpenAIDeveloperMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

        name?: string | null;

        role?: 'developer';
      }

      export namespace OpenAIDeveloperMessageParam {
        /**
         * Text content part for OpenAI-compatible chat completion messages.
         */
        export interface ListOpenAIChatCompletionContentPartTextParam {
          text: string;

          type?: 'text';
        }
      }

      /**
       * The log probabilities for the tokens in the message from an OpenAI-compatible
       * chat completion response.
       */
      export interface Logprobs {
        content?: Array<Logprobs.Content> | null;

        refusal?: Array<Logprobs.Refusal> | null;
      }

      export namespace Logprobs {
        /**
         * The log probability for a token from an OpenAI-compatible chat completion
         * response.
         *
         * :token: The token :bytes: (Optional) The bytes for the token :logprob: The log
         * probability of the token :top_logprobs: The top log probabilities for the token
         */
        export interface Content {
          token: string;

          logprob: number;

          top_logprobs: Array<Content.TopLogprob>;

          bytes?: Array<number> | null;
        }

        export namespace Content {
          /**
           * The top log probability for a token from an OpenAI-compatible chat completion
           * response.
           *
           * :token: The token :bytes: (Optional) The bytes for the token :logprob: The log
           * probability of the token
           */
          export interface TopLogprob {
            token: string;

            logprob: number;

            bytes?: Array<number> | null;
          }
        }

        /**
         * The log probability for a token from an OpenAI-compatible chat completion
         * response.
         *
         * :token: The token :bytes: (Optional) The bytes for the token :logprob: The log
         * probability of the token :top_logprobs: The top log probabilities for the token
         */
        export interface Refusal {
          token: string;

          logprob: number;

          top_logprobs: Array<Refusal.TopLogprob>;

          bytes?: Array<number> | null;
        }

        export namespace Refusal {
          /**
           * The top log probability for a token from an OpenAI-compatible chat completion
           * response.
           *
           * :token: The token :bytes: (Optional) The bytes for the token :logprob: The log
           * probability of the token
           */
          export interface TopLogprob {
            token: string;

            logprob: number;

            bytes?: Array<number> | null;
          }
        }
      }
    }

    /**
     * A message from the user in an OpenAI-compatible chat completion request.
     */
    export interface OpenAIUserMessageParamOutput {
      content:
        | string
        | Array<
            | OpenAIUserMessageParamOutput.OpenAIChatCompletionContentPartTextParam
            | OpenAIUserMessageParamOutput.OpenAIChatCompletionContentPartImageParam
            | OpenAIUserMessageParamOutput.OpenAIFile
          >;

      name?: string | null;

      role?: 'user';
    }

    export namespace OpenAIUserMessageParamOutput {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface OpenAIChatCompletionContentPartTextParam {
        text: string;

        type?: 'text';
      }

      /**
       * Image content part for OpenAI-compatible chat completion messages.
       */
      export interface OpenAIChatCompletionContentPartImageParam {
        /**
         * Image URL specification for OpenAI-compatible chat completion messages.
         */
        image_url: OpenAIChatCompletionContentPartImageParam.ImageURL;

        type?: 'image_url';
      }

      export namespace OpenAIChatCompletionContentPartImageParam {
        /**
         * Image URL specification for OpenAI-compatible chat completion messages.
         */
        export interface ImageURL {
          url: string;

          detail?: string | null;
        }
      }

      export interface OpenAIFile {
        file: OpenAIFile.File;

        type?: 'file';
      }

      export namespace OpenAIFile {
        export interface File {
          file_data?: string | null;

          file_id?: string | null;

          filename?: string | null;
        }
      }
    }

    /**
     * A system message providing instructions or context to the model.
     */
    export interface OpenAISystemMessageParam {
      content: string | Array<OpenAISystemMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

      name?: string | null;

      role?: 'system';
    }

    export namespace OpenAISystemMessageParam {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface ListOpenAIChatCompletionContentPartTextParam {
        text: string;

        type?: 'text';
      }
    }

    /**
     * A message containing the model's (assistant) response in an OpenAI-compatible
     * chat completion request.
     */
    export interface OpenAIAssistantMessageParamOutput {
      content?:
        | string
        | Array<OpenAIAssistantMessageParamOutput.ListOpenAIChatCompletionContentPartTextParam>
        | null;

      name?: string | null;

      role?: 'assistant';

      tool_calls?: Array<OpenAIAssistantMessageParamOutput.ToolCall> | null;
    }

    export namespace OpenAIAssistantMessageParamOutput {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface ListOpenAIChatCompletionContentPartTextParam {
        text: string;

        type?: 'text';
      }

      /**
       * Tool call specification for OpenAI-compatible chat completion responses.
       */
      export interface ToolCall {
        id?: string | null;

        /**
         * Function call details for OpenAI-compatible tool calls.
         */
        function?: ToolCall.Function | null;

        index?: number | null;

        type?: 'function';
      }

      export namespace ToolCall {
        /**
         * Function call details for OpenAI-compatible tool calls.
         */
        export interface Function {
          arguments?: string | null;

          name?: string | null;
        }
      }
    }

    /**
     * A message representing the result of a tool invocation in an OpenAI-compatible
     * chat completion request.
     */
    export interface OpenAIToolMessageParam {
      content: string | Array<OpenAIToolMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

      tool_call_id: string;

      role?: 'tool';
    }

    export namespace OpenAIToolMessageParam {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface ListOpenAIChatCompletionContentPartTextParam {
        text: string;

        type?: 'text';
      }
    }

    /**
     * A message from the developer in an OpenAI-compatible chat completion request.
     */
    export interface OpenAIDeveloperMessageParam {
      content: string | Array<OpenAIDeveloperMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

      name?: string | null;

      role?: 'developer';
    }

    export namespace OpenAIDeveloperMessageParam {
      /**
       * Text content part for OpenAI-compatible chat completion messages.
       */
      export interface ListOpenAIChatCompletionContentPartTextParam {
        text: string;

        type?: 'text';
      }
    }

    /**
     * Usage information for OpenAI chat completion.
     */
    export interface Usage {
      completion_tokens: number;

      prompt_tokens: number;

      total_tokens: number;

      /**
       * Token details for output tokens in OpenAI chat completion usage.
       */
      completion_tokens_details?: Usage.CompletionTokensDetails | null;

      /**
       * Token details for prompt tokens in OpenAI chat completion usage.
       */
      prompt_tokens_details?: Usage.PromptTokensDetails | null;
    }

    export namespace Usage {
      /**
       * Token details for output tokens in OpenAI chat completion usage.
       */
      export interface CompletionTokensDetails {
        reasoning_tokens?: number | null;
      }

      /**
       * Token details for prompt tokens in OpenAI chat completion usage.
       */
      export interface PromptTokensDetails {
        cached_tokens?: number | null;
      }
    }
  }
}

export type CompletionCreateParams = CompletionCreateParamsNonStreaming | CompletionCreateParamsStreaming;

export interface CompletionCreateParamsBase {
  messages: Array<
    | CompletionCreateParams.OpenAIUserMessageParamInput
    | CompletionCreateParams.OpenAISystemMessageParam
    | CompletionCreateParams.OpenAIAssistantMessageParamInput
    | CompletionCreateParams.OpenAIToolMessageParam
    | CompletionCreateParams.OpenAIDeveloperMessageParam
  >;

  model: string;

  frequency_penalty?: number | null;

  function_call?: string | { [key: string]: unknown } | null;

  functions?: Array<{ [key: string]: unknown }> | null;

  logit_bias?: { [key: string]: number } | null;

  logprobs?: boolean | null;

  max_completion_tokens?: number | null;

  max_tokens?: number | null;

  n?: number | null;

  parallel_tool_calls?: boolean | null;

  presence_penalty?: number | null;

  /**
   * Text response format for OpenAI-compatible chat completion requests.
   */
  response_format?:
    | CompletionCreateParams.OpenAIResponseFormatText
    | CompletionCreateParams.OpenAIResponseFormatJsonSchema
    | CompletionCreateParams.OpenAIResponseFormatJsonObject
    | null;

  seed?: number | null;

  stop?: string | Array<string> | null;

  stream?: boolean | null;

  stream_options?: { [key: string]: unknown } | null;

  temperature?: number | null;

  tool_choice?: string | { [key: string]: unknown } | null;

  tools?: Array<{ [key: string]: unknown }> | null;

  top_logprobs?: number | null;

  top_p?: number | null;

  user?: string | null;

  [k: string]: unknown;
}

export namespace CompletionCreateParams {
  /**
   * A message from the user in an OpenAI-compatible chat completion request.
   */
  export interface OpenAIUserMessageParamInput {
    content:
      | string
      | Array<
          | OpenAIUserMessageParamInput.OpenAIChatCompletionContentPartTextParam
          | OpenAIUserMessageParamInput.OpenAIChatCompletionContentPartImageParam
          | OpenAIUserMessageParamInput.OpenAIFile
        >;

    name?: string | null;

    role?: 'user';
  }

  export namespace OpenAIUserMessageParamInput {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface OpenAIChatCompletionContentPartTextParam {
      text: string;

      type?: 'text';
    }

    /**
     * Image content part for OpenAI-compatible chat completion messages.
     */
    export interface OpenAIChatCompletionContentPartImageParam {
      /**
       * Image URL specification for OpenAI-compatible chat completion messages.
       */
      image_url: OpenAIChatCompletionContentPartImageParam.ImageURL;

      type?: 'image_url';
    }

    export namespace OpenAIChatCompletionContentPartImageParam {
      /**
       * Image URL specification for OpenAI-compatible chat completion messages.
       */
      export interface ImageURL {
        url: string;

        detail?: string | null;
      }
    }

    export interface OpenAIFile {
      file: OpenAIFile.File;

      type?: 'file';
    }

    export namespace OpenAIFile {
      export interface File {
        file_data?: string | null;

        file_id?: string | null;

        filename?: string | null;
      }
    }
  }

  /**
   * A system message providing instructions or context to the model.
   */
  export interface OpenAISystemMessageParam {
    content: string | Array<OpenAISystemMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

    name?: string | null;

    role?: 'system';
  }

  export namespace OpenAISystemMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      text: string;

      type?: 'text';
    }
  }

  /**
   * A message containing the model's (assistant) response in an OpenAI-compatible
   * chat completion request.
   */
  export interface OpenAIAssistantMessageParamInput {
    content?:
      | string
      | Array<OpenAIAssistantMessageParamInput.ListOpenAIChatCompletionContentPartTextParam>
      | null;

    name?: string | null;

    role?: 'assistant';

    tool_calls?: Array<OpenAIAssistantMessageParamInput.ToolCall> | null;
  }

  export namespace OpenAIAssistantMessageParamInput {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      text: string;

      type?: 'text';
    }

    /**
     * Tool call specification for OpenAI-compatible chat completion responses.
     */
    export interface ToolCall {
      id?: string | null;

      /**
       * Function call details for OpenAI-compatible tool calls.
       */
      function?: ToolCall.Function | null;

      index?: number | null;

      type?: 'function';
    }

    export namespace ToolCall {
      /**
       * Function call details for OpenAI-compatible tool calls.
       */
      export interface Function {
        arguments?: string | null;

        name?: string | null;
      }
    }
  }

  /**
   * A message representing the result of a tool invocation in an OpenAI-compatible
   * chat completion request.
   */
  export interface OpenAIToolMessageParam {
    content: string | Array<OpenAIToolMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

    tool_call_id: string;

    role?: 'tool';
  }

  export namespace OpenAIToolMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      text: string;

      type?: 'text';
    }
  }

  /**
   * A message from the developer in an OpenAI-compatible chat completion request.
   */
  export interface OpenAIDeveloperMessageParam {
    content: string | Array<OpenAIDeveloperMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

    name?: string | null;

    role?: 'developer';
  }

  export namespace OpenAIDeveloperMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      text: string;

      type?: 'text';
    }
  }

  /**
   * Text response format for OpenAI-compatible chat completion requests.
   */
  export interface OpenAIResponseFormatText {
    type?: 'text';
  }

  /**
   * JSON schema response format for OpenAI-compatible chat completion requests.
   */
  export interface OpenAIResponseFormatJsonSchema {
    /**
     * JSON schema specification for OpenAI-compatible structured response format.
     */
    json_schema: OpenAIResponseFormatJsonSchema.JsonSchema;

    type?: 'json_schema';
  }

  export namespace OpenAIResponseFormatJsonSchema {
    /**
     * JSON schema specification for OpenAI-compatible structured response format.
     */
    export interface JsonSchema {
      description?: string | null;

      name?: string;

      schema?: { [key: string]: unknown } | null;

      strict?: boolean | null;
    }
  }

  /**
   * JSON object response format for OpenAI-compatible chat completion requests.
   */
  export interface OpenAIResponseFormatJsonObject {
    type?: 'json_object';
  }

  export type CompletionCreateParamsNonStreaming = CompletionsAPI.CompletionCreateParamsNonStreaming;
  export type CompletionCreateParamsStreaming = CompletionsAPI.CompletionCreateParamsStreaming;
}

export interface CompletionCreateParamsNonStreaming extends CompletionCreateParamsBase {
  stream?: false | null;

  [k: string]: unknown;
}

export interface CompletionCreateParamsStreaming extends CompletionCreateParamsBase {
  stream: true;

  [k: string]: unknown;
}

export interface CompletionListParams {
  after?: string | null;

  limit?: number | null;

  model?: string | null;

  /**
   * Sort order for paginated responses.
   */
  order?: 'asc' | 'desc' | null;
}

export declare namespace Completions {
  export {
    type CompletionCreateResponse as CompletionCreateResponse,
    type CompletionRetrieveResponse as CompletionRetrieveResponse,
    type CompletionListResponse as CompletionListResponse,
    type CompletionCreateParams as CompletionCreateParams,
    type CompletionCreateParamsNonStreaming as CompletionCreateParamsNonStreaming,
    type CompletionCreateParamsStreaming as CompletionCreateParamsStreaming,
    type CompletionListParams as CompletionListParams,
  };
}
