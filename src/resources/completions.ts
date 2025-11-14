// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../core';
import * as Core from '../core';
import * as CompletionsAPI from './completions';
import { Stream } from '../streaming';

export class Completions extends APIResource {
  /**
   * Create completion.
   *
   * Generate an OpenAI-compatible completion for the given prompt using the
   * specified model.
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
 *
 * :id: The ID of the completion :choices: List of choices :created: The Unix
 * timestamp in seconds when the completion was created :model: The model that was
 * used to generate the completion :object: The object type, which will be
 * "text_completion"
 */
export interface CompletionCreateResponse {
  id: string;

  choices: Array<CompletionCreateResponse.Choice>;

  created: number;

  model: string;

  object?: 'text_completion';
}

export namespace CompletionCreateResponse {
  /**
   * A choice from an OpenAI-compatible completion response.
   *
   * :finish_reason: The reason the model stopped generating :text: The text of the
   * choice :index: The index of the choice :logprobs: (Optional) The log
   * probabilities for the tokens in the choice
   */
  export interface Choice {
    finish_reason: string;

    index: number;

    text: string;

    /**
     * The log probabilities for the tokens in the message from an OpenAI-compatible
     * chat completion response.
     */
    logprobs?: Choice.Logprobs | null;
  }

  export namespace Choice {
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
}

export type CompletionCreateParams = CompletionCreateParamsNonStreaming | CompletionCreateParamsStreaming;

export interface CompletionCreateParamsBase {
  model: string;

  prompt: string | Array<string> | Array<number> | Array<Array<number>>;

  best_of?: number | null;

  echo?: boolean | null;

  frequency_penalty?: number | null;

  logit_bias?: { [key: string]: number } | null;

  logprobs?: boolean | null;

  max_tokens?: number | null;

  n?: number | null;

  presence_penalty?: number | null;

  seed?: number | null;

  stop?: string | Array<string> | null;

  stream?: boolean | null;

  stream_options?: { [key: string]: unknown } | null;

  suffix?: string | null;

  temperature?: number | null;

  top_p?: number | null;

  user?: string | null;

  [k: string]: unknown;
}

export namespace CompletionCreateParams {
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

export declare namespace Completions {
  export {
    type CompletionCreateResponse as CompletionCreateResponse,
    type CompletionCreateParams as CompletionCreateParams,
    type CompletionCreateParamsNonStreaming as CompletionCreateParamsNonStreaming,
    type CompletionCreateParamsStreaming as CompletionCreateParamsStreaming,
  };
}
