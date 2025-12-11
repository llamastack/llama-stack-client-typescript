// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
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
  id: string;

  choices: Array<ChatCompletionChunk.Choice>;

  created: number;

  model: string;

  object?: 'chat.completion.chunk';

  /**
   * Usage information for OpenAI chat completion.
   */
  usage?: ChatCompletionChunk.Usage | null;
}

export namespace ChatCompletionChunk {
  /**
   * A chunk choice from an OpenAI-compatible chat completion streaming response.
   */
  export interface Choice {
    /**
     * A delta from an OpenAI-compatible chat completion streaming response.
     */
    delta: Choice.Delta;

    finish_reason: string;

    index: number;

    /**
     * The log probabilities for the tokens in the message from an OpenAI-compatible
     * chat completion response.
     */
    logprobs?: Choice.Logprobs | null;
  }

  export namespace Choice {
    /**
     * A delta from an OpenAI-compatible chat completion streaming response.
     */
    export interface Delta {
      content?: string | null;

      reasoning_content?: string | null;

      refusal?: string | null;

      role?: string | null;

      tool_calls?: Array<Delta.ToolCall> | null;
    }

    export namespace Delta {
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

        bytes?: Array<number> | null;

        top_logprobs?: Array<Content.TopLogprob> | null;
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

        bytes?: Array<number> | null;

        top_logprobs?: Array<Refusal.TopLogprob> | null;
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

Chat.Completions = Completions;

export declare namespace Chat {
  export { type ChatCompletionChunk as ChatCompletionChunk };

  export {
    Completions as Completions,
    type CompletionCreateResponse as CompletionCreateResponse,
    type CompletionRetrieveResponse as CompletionRetrieveResponse,
    type CompletionListResponse as CompletionListResponse,
    type CompletionCreateParams as CompletionCreateParams,
    type CompletionCreateParamsNonStreaming as CompletionCreateParamsNonStreaming,
    type CompletionCreateParamsStreaming as CompletionCreateParamsStreaming,
    type CompletionListParams as CompletionListParams,
  };
}
