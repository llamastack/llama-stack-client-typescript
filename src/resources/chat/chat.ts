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
