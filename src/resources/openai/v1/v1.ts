// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as V1API from './v1';
import * as ChatAPI from './chat';
import {
  Chat,
  ChatCompletionContentPart,
  ChatCompletionToolCall,
  ChatGenerateCompletionParams,
  ChatGenerateCompletionResponse,
  MessageParam,
} from './chat';
import * as ResponsesAPI from './responses';
import { OpenAIResponse, ResponseCreateParams, Responses } from './responses';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

export class V1 extends APIResource {
  responses: ResponsesAPI.Responses = new ResponsesAPI.Responses(this._client);
  chat: ChatAPI.Chat = new ChatAPI.Chat(this._client);

  /**
   * Generate an OpenAI-compatible completion for the given prompt using the
   * specified model.
   */
  generateCompletion(
    body: V1GenerateCompletionParams,
    options?: RequestOptions,
  ): APIPromise<V1GenerateCompletionResponse> {
    return this._client.post('/v1/openai/v1/completions', { body, ...options });
  }

  listModels(options?: RequestOptions): APIPromise<V1ListModelsResponse> {
    return this._client.get('/v1/openai/v1/models', options);
  }
}

/**
 * The log probabilities for the tokens in the message from an OpenAI-compatible
 * chat completion response.
 */
export interface ChoiceLogprobs {
  /**
   * (Optional) The log probabilities for the tokens in the message
   */
  content?: Array<TokenLogProb>;

  /**
   * (Optional) The log probabilities for the tokens in the message
   */
  refusal?: Array<TokenLogProb>;
}

/**
 * The log probability for a token from an OpenAI-compatible chat completion
 * response.
 */
export interface TokenLogProb {
  token: string;

  logprob: number;

  top_logprobs: Array<TokenLogProb.TopLogprob>;

  bytes?: Array<number>;
}

export namespace TokenLogProb {
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
 * Response from an OpenAI-compatible completion request.
 */
export interface V1GenerateCompletionResponse {
  id: string;

  choices: Array<V1GenerateCompletionResponse.Choice>;

  created: number;

  model: string;

  object: 'text_completion';
}

export namespace V1GenerateCompletionResponse {
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
    logprobs?: V1API.ChoiceLogprobs;
  }
}

export interface V1ListModelsResponse {
  data: Array<V1ListModelsResponse.Data>;
}

export namespace V1ListModelsResponse {
  /**
   * A model from OpenAI.
   */
  export interface Data {
    id: string;

    created: number;

    object: 'model';

    owned_by: string;
  }
}

export interface V1GenerateCompletionParams {
  /**
   * The identifier of the model to use. The model must be registered with Llama
   * Stack and available via the /models endpoint.
   */
  model: string;

  /**
   * The prompt to generate a completion for
   */
  prompt: string | Array<string> | Array<number> | Array<Array<number>>;

  /**
   * (Optional) The number of completions to generate
   */
  best_of?: number;

  /**
   * (Optional) Whether to echo the prompt
   */
  echo?: boolean;

  /**
   * (Optional) The penalty for repeated tokens
   */
  frequency_penalty?: number;

  guided_choice?: Array<string>;

  /**
   * (Optional) The logit bias to use
   */
  logit_bias?: Record<string, number>;

  /**
   * (Optional) The log probabilities to use
   */
  logprobs?: boolean;

  /**
   * (Optional) The maximum number of tokens to generate
   */
  max_tokens?: number;

  /**
   * (Optional) The number of completions to generate
   */
  n?: number;

  /**
   * (Optional) The penalty for repeated tokens
   */
  presence_penalty?: number;

  prompt_logprobs?: number;

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
  stream_options?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  /**
   * (Optional) The temperature to use
   */
  temperature?: number;

  /**
   * (Optional) The top p to use
   */
  top_p?: number;

  /**
   * (Optional) The user to use
   */
  user?: string;
}

V1.Responses = Responses;
V1.Chat = Chat;

export declare namespace V1 {
  export {
    type ChoiceLogprobs as ChoiceLogprobs,
    type TokenLogProb as TokenLogProb,
    type V1GenerateCompletionResponse as V1GenerateCompletionResponse,
    type V1ListModelsResponse as V1ListModelsResponse,
    type V1GenerateCompletionParams as V1GenerateCompletionParams,
  };

  export {
    Responses as Responses,
    type OpenAIResponse as OpenAIResponse,
    type ResponseCreateParams as ResponseCreateParams,
  };

  export {
    Chat as Chat,
    type ChatCompletionContentPart as ChatCompletionContentPart,
    type ChatCompletionToolCall as ChatCompletionToolCall,
    type MessageParam as MessageParam,
    type ChatGenerateCompletionResponse as ChatGenerateCompletionResponse,
    type ChatGenerateCompletionParams as ChatGenerateCompletionParams,
  };
}
