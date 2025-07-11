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
    return this._client.post('/v1/openai/v1/chat/completions', {
      body,
      ...options,
      stream: body.stream ?? false,
    }) as APIPromise<CompletionCreateResponse> | APIPromise<Stream<ChatAPI.ChatCompletionChunk>>;
  }

  /**
   * Describe a chat completion by its ID.
   */
  retrieve(completionId: string, options?: Core.RequestOptions): Core.APIPromise<CompletionRetrieveResponse> {
    return this._client.get(`/v1/openai/v1/chat/completions/${completionId}`, options);
  }

  /**
   * List all chat completions.
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
    return this._client.get('/v1/openai/v1/chat/completions', { query, ...options });
  }
}

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

      /**
       * A system message providing instructions or context to the model.
       */
      export interface OpenAISystemMessageParam {
        /**
         * The content of the "system prompt". If multiple system messages are provided,
         * they are concatenated. The underlying Llama Stack code may also add other system
         * messages (for example, for formatting tool definitions).
         */
        content:
          | string
          | Array<
              | OpenAISystemMessageParam.OpenAIChatCompletionContentPartTextParam
              | OpenAISystemMessageParam.OpenAIChatCompletionContentPartImageParam
            >;

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
        content?:
          | string
          | Array<
              | OpenAIAssistantMessageParam.OpenAIChatCompletionContentPartTextParam
              | OpenAIAssistantMessageParam.OpenAIChatCompletionContentPartImageParam
            >;

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

        export interface ToolCall {
          type: 'function';

          id?: string;

          function?: ToolCall.Function;

          index?: number;
        }

        export namespace ToolCall {
          export interface Function {
            arguments?: string;

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
        content:
          | string
          | Array<
              | OpenAIToolMessageParam.OpenAIChatCompletionContentPartTextParam
              | OpenAIToolMessageParam.OpenAIChatCompletionContentPartImageParam
            >;

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

      /**
       * A message from the developer in an OpenAI-compatible chat completion request.
       */
      export interface OpenAIDeveloperMessageParam {
        /**
         * The content of the developer message
         */
        content:
          | string
          | Array<
              | OpenAIDeveloperMessageParam.OpenAIChatCompletionContentPartTextParam
              | OpenAIDeveloperMessageParam.OpenAIChatCompletionContentPartImageParam
            >;

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

    /**
     * A system message providing instructions or context to the model.
     */
    export interface OpenAISystemMessageParam {
      /**
       * The content of the "system prompt". If multiple system messages are provided,
       * they are concatenated. The underlying Llama Stack code may also add other system
       * messages (for example, for formatting tool definitions).
       */
      content:
        | string
        | Array<
            | OpenAISystemMessageParam.OpenAIChatCompletionContentPartTextParam
            | OpenAISystemMessageParam.OpenAIChatCompletionContentPartImageParam
          >;

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
      content?:
        | string
        | Array<
            | OpenAIAssistantMessageParam.OpenAIChatCompletionContentPartTextParam
            | OpenAIAssistantMessageParam.OpenAIChatCompletionContentPartImageParam
          >;

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

      export interface ToolCall {
        type: 'function';

        id?: string;

        function?: ToolCall.Function;

        index?: number;
      }

      export namespace ToolCall {
        export interface Function {
          arguments?: string;

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
      content:
        | string
        | Array<
            | OpenAIToolMessageParam.OpenAIChatCompletionContentPartTextParam
            | OpenAIToolMessageParam.OpenAIChatCompletionContentPartImageParam
          >;

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

    /**
     * A message from the developer in an OpenAI-compatible chat completion request.
     */
    export interface OpenAIDeveloperMessageParam {
      /**
       * The content of the developer message
       */
      content:
        | string
        | Array<
            | OpenAIDeveloperMessageParam.OpenAIChatCompletionContentPartTextParam
            | OpenAIDeveloperMessageParam.OpenAIChatCompletionContentPartImageParam
          >;

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

  /**
   * A system message providing instructions or context to the model.
   */
  export interface OpenAISystemMessageParam {
    /**
     * The content of the "system prompt". If multiple system messages are provided,
     * they are concatenated. The underlying Llama Stack code may also add other system
     * messages (for example, for formatting tool definitions).
     */
    content:
      | string
      | Array<
          | OpenAISystemMessageParam.OpenAIChatCompletionContentPartTextParam
          | OpenAISystemMessageParam.OpenAIChatCompletionContentPartImageParam
        >;

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
    content?:
      | string
      | Array<
          | OpenAIAssistantMessageParam.OpenAIChatCompletionContentPartTextParam
          | OpenAIAssistantMessageParam.OpenAIChatCompletionContentPartImageParam
        >;

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

    export interface ToolCall {
      type: 'function';

      id?: string;

      function?: ToolCall.Function;

      index?: number;
    }

    export namespace ToolCall {
      export interface Function {
        arguments?: string;

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
    content:
      | string
      | Array<
          | OpenAIToolMessageParam.OpenAIChatCompletionContentPartTextParam
          | OpenAIToolMessageParam.OpenAIChatCompletionContentPartImageParam
        >;

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

  /**
   * A message from the developer in an OpenAI-compatible chat completion request.
   */
  export interface OpenAIDeveloperMessageParam {
    /**
     * The content of the developer message
     */
    content:
      | string
      | Array<
          | OpenAIDeveloperMessageParam.OpenAIChatCompletionContentPartTextParam
          | OpenAIDeveloperMessageParam.OpenAIChatCompletionContentPartImageParam
        >;

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
}

export interface CompletionListResponse {
  data: Array<CompletionListResponse.Data>;

  first_id: string;

  has_more: boolean;

  last_id: string;

  object: 'list';
}

export namespace CompletionListResponse {
  export interface Data {
    /**
     * The ID of the chat completion
     */
    id: string;

    /**
     * List of choices
     */
    choices: Array<Data.Choice>;

    /**
     * The Unix timestamp in seconds when the chat completion was created
     */
    created: number;

    input_messages: Array<
      | Data.OpenAIUserMessageParam
      | Data.OpenAISystemMessageParam
      | Data.OpenAIAssistantMessageParam
      | Data.OpenAIToolMessageParam
      | Data.OpenAIDeveloperMessageParam
    >;

    /**
     * The model that was used to generate the chat completion
     */
    model: string;

    /**
     * The object type, which will be "chat.completion"
     */
    object: 'chat.completion';
  }

  export namespace Data {
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

      /**
       * A system message providing instructions or context to the model.
       */
      export interface OpenAISystemMessageParam {
        /**
         * The content of the "system prompt". If multiple system messages are provided,
         * they are concatenated. The underlying Llama Stack code may also add other system
         * messages (for example, for formatting tool definitions).
         */
        content:
          | string
          | Array<
              | OpenAISystemMessageParam.OpenAIChatCompletionContentPartTextParam
              | OpenAISystemMessageParam.OpenAIChatCompletionContentPartImageParam
            >;

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
        content?:
          | string
          | Array<
              | OpenAIAssistantMessageParam.OpenAIChatCompletionContentPartTextParam
              | OpenAIAssistantMessageParam.OpenAIChatCompletionContentPartImageParam
            >;

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

        export interface ToolCall {
          type: 'function';

          id?: string;

          function?: ToolCall.Function;

          index?: number;
        }

        export namespace ToolCall {
          export interface Function {
            arguments?: string;

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
        content:
          | string
          | Array<
              | OpenAIToolMessageParam.OpenAIChatCompletionContentPartTextParam
              | OpenAIToolMessageParam.OpenAIChatCompletionContentPartImageParam
            >;

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

      /**
       * A message from the developer in an OpenAI-compatible chat completion request.
       */
      export interface OpenAIDeveloperMessageParam {
        /**
         * The content of the developer message
         */
        content:
          | string
          | Array<
              | OpenAIDeveloperMessageParam.OpenAIChatCompletionContentPartTextParam
              | OpenAIDeveloperMessageParam.OpenAIChatCompletionContentPartImageParam
            >;

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

    /**
     * A system message providing instructions or context to the model.
     */
    export interface OpenAISystemMessageParam {
      /**
       * The content of the "system prompt". If multiple system messages are provided,
       * they are concatenated. The underlying Llama Stack code may also add other system
       * messages (for example, for formatting tool definitions).
       */
      content:
        | string
        | Array<
            | OpenAISystemMessageParam.OpenAIChatCompletionContentPartTextParam
            | OpenAISystemMessageParam.OpenAIChatCompletionContentPartImageParam
          >;

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
      content?:
        | string
        | Array<
            | OpenAIAssistantMessageParam.OpenAIChatCompletionContentPartTextParam
            | OpenAIAssistantMessageParam.OpenAIChatCompletionContentPartImageParam
          >;

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

      export interface ToolCall {
        type: 'function';

        id?: string;

        function?: ToolCall.Function;

        index?: number;
      }

      export namespace ToolCall {
        export interface Function {
          arguments?: string;

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
      content:
        | string
        | Array<
            | OpenAIToolMessageParam.OpenAIChatCompletionContentPartTextParam
            | OpenAIToolMessageParam.OpenAIChatCompletionContentPartImageParam
          >;

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

    /**
     * A message from the developer in an OpenAI-compatible chat completion request.
     */
    export interface OpenAIDeveloperMessageParam {
      /**
       * The content of the developer message
       */
      content:
        | string
        | Array<
            | OpenAIDeveloperMessageParam.OpenAIChatCompletionContentPartTextParam
            | OpenAIDeveloperMessageParam.OpenAIChatCompletionContentPartImageParam
          >;

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

  /**
   * A system message providing instructions or context to the model.
   */
  export interface OpenAISystemMessageParam {
    /**
     * The content of the "system prompt". If multiple system messages are provided,
     * they are concatenated. The underlying Llama Stack code may also add other system
     * messages (for example, for formatting tool definitions).
     */
    content:
      | string
      | Array<
          | OpenAISystemMessageParam.OpenAIChatCompletionContentPartTextParam
          | OpenAISystemMessageParam.OpenAIChatCompletionContentPartImageParam
        >;

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
    content?:
      | string
      | Array<
          | OpenAIAssistantMessageParam.OpenAIChatCompletionContentPartTextParam
          | OpenAIAssistantMessageParam.OpenAIChatCompletionContentPartImageParam
        >;

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

    export interface ToolCall {
      type: 'function';

      id?: string;

      function?: ToolCall.Function;

      index?: number;
    }

    export namespace ToolCall {
      export interface Function {
        arguments?: string;

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
    content:
      | string
      | Array<
          | OpenAIToolMessageParam.OpenAIChatCompletionContentPartTextParam
          | OpenAIToolMessageParam.OpenAIChatCompletionContentPartImageParam
        >;

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

  /**
   * A message from the developer in an OpenAI-compatible chat completion request.
   */
  export interface OpenAIDeveloperMessageParam {
    /**
     * The content of the developer message
     */
    content:
      | string
      | Array<
          | OpenAIDeveloperMessageParam.OpenAIChatCompletionContentPartTextParam
          | OpenAIDeveloperMessageParam.OpenAIChatCompletionContentPartImageParam
        >;

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

export interface CompletionListParams {
  /**
   * The ID of the last chat completion to return.
   */
  after?: string;

  /**
   * The maximum number of chat completions to return.
   */
  limit?: number;

  /**
   * The model to filter by.
   */
  model?: string;

  /**
   * The order to sort the chat completions by: "asc" or "desc". Defaults to "desc".
   */
  order?: 'asc' | 'desc';
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
