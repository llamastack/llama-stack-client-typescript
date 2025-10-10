// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as CompletionsAPI from './completions';
import {
  CompletionCreateParams,
  CompletionCreateParamsNonStreaming,
  CompletionCreateParamsStreaming,
  CompletionCreateResponse,
  CompletionListParams,
  CompletionListResponse,
  CompletionListResponsesOpenAICursorPage,
  CompletionRetrieveResponse,
  Completions,
} from './completions';

export class Chat extends APIResource {
  completions: CompletionsAPI.Completions = new CompletionsAPI.Completions(this._client);
}

/**
 * Chunk from a streaming response to an OpenAI-compatible chat completion request.
 */
export interface ChatCompletionChunk {
  /**
   * The ID of the chat completion
   */
  id: string;

  /**
   * List of choices
   */
  choices: Array<ChatCompletionChunk.Choice>;

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

  /**
   * Token usage information (typically included in final chunk with stream_options)
   */
  usage?: ChatCompletionChunk.Usage;
}

export namespace ChatCompletionChunk {
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
    logprobs?: Choice.Logprobs;
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
      tool_calls?: Array<Delta.ToolCall>;
    }

    export namespace Delta {
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
   * Token usage information (typically included in final chunk with stream_options)
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

Chat.Completions = Completions;
Chat.CompletionListResponsesOpenAICursorPage = CompletionListResponsesOpenAICursorPage;

export declare namespace Chat {
  export { type ChatCompletionChunk as ChatCompletionChunk };

  export {
    Completions as Completions,
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
