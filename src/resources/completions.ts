// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../core';
import * as Core from '../core';
import * as CompletionsAPI from './completions';
import { Stream } from '../streaming';

export class Completions extends APIResource {
  /**
   * Create completion. Generate an OpenAI-compatible completion for the given prompt
   * using the specified model.
   */
  create(
    body: CompletionCreateParamsNonStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<CompletionCreateResponse>;
  create(
    body: CompletionCreateParamsStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<CompletionCreateResponse>>;
  create(
    body: CompletionCreateParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<CompletionCreateResponse> | CompletionCreateResponse>;
  create(
    body: CompletionCreateParams,
    options?: Core.RequestOptions,
  ): APIPromise<CompletionCreateResponse> | APIPromise<Stream<CompletionCreateResponse>> {
    return this._client.post('/v1/completions', { body, ...options, stream: body.stream ?? false }) as
      | APIPromise<CompletionCreateResponse>
      | APIPromise<Stream<CompletionCreateResponse>>;
  }
}

/**
 * Response from an OpenAI-compatible completion request.
 */
export interface CompletionCreateResponse {
  id: string;

  choices: Array<CompletionCreateResponse.Choice>;

  created: number;

  model: string;

  object: 'text_completion';
}

export namespace CompletionCreateResponse {
  /**
   * A choice from an OpenAI-compatible completion response.
   */
  export interface Choice {
    finish_reason: string;

    index: number;

    text: string;

    /**
     * The log probabilities for the tokens in the message from an OpenAI-compatible
     * chat completion response.
     */
    logprobs?: Choice.Logprobs;
  }

  export namespace Choice {
    /**
     * The log probabilities for the tokens in the message from an OpenAI-compatible
     * chat completion response.
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

export type CompletionCreateParams = CompletionCreateParamsNonStreaming | CompletionCreateParamsStreaming;

export interface CompletionCreateParamsBase {
  /**
   * The identifier of the model to use. The model must be registered with Llama
   * Stack and available via the /models endpoint.
   */
  model: string;

  /**
   * The prompt to generate a completion for.
   */
  prompt: string | Array<string> | Array<number> | Array<Array<number>>;

  /**
   * (Optional) The number of completions to generate.
   */
  best_of?: number;

  /**
   * (Optional) Whether to echo the prompt.
   */
  echo?: boolean;

  /**
   * (Optional) The penalty for repeated tokens.
   */
  frequency_penalty?: number;

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
  max_tokens?: number;

  /**
   * (Optional) The number of completions to generate.
   */
  n?: number;

  /**
   * (Optional) The penalty for repeated tokens.
   */
  presence_penalty?: number;

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
   * (Optional) The suffix that should be appended to the completion.
   */
  suffix?: string;

  /**
   * (Optional) The temperature to use.
   */
  temperature?: number;

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

export declare namespace Completions {
  export {
    type CompletionCreateResponse as CompletionCreateResponse,
    type CompletionCreateParams as CompletionCreateParams,
    type CompletionCreateParamsNonStreaming as CompletionCreateParamsNonStreaming,
    type CompletionCreateParamsStreaming as CompletionCreateParamsStreaming,
  };
}
