// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../core';
import * as Core from '../core';
import * as InferenceAPI from './inference';
import * as Shared from './shared';
import { Stream } from '../streaming';

export class Inference extends APIResource {
  /**
   * Generate a chat completion for the given messages using the specified model.
   *
   * @deprecated /v1/inference/chat-completion is deprecated. Please use /v1/chat/completions.
   */
  chatCompletion(
    body: InferenceChatCompletionParamsNonStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Shared.ChatCompletionResponse>;
  chatCompletion(
    body: InferenceChatCompletionParamsStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ChatCompletionResponseStreamChunk>>;
  chatCompletion(
    body: InferenceChatCompletionParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ChatCompletionResponseStreamChunk> | Shared.ChatCompletionResponse>;
  chatCompletion(
    body: InferenceChatCompletionParams,
    options?: Core.RequestOptions,
  ): APIPromise<Shared.ChatCompletionResponse> | APIPromise<Stream<ChatCompletionResponseStreamChunk>> {
    return this._client.post('/v1/inference/chat-completion', {
      body,
      ...options,
      stream: body.stream ?? false,
    }) as APIPromise<Shared.ChatCompletionResponse> | APIPromise<Stream<ChatCompletionResponseStreamChunk>>;
  }
}

/**
 * A chunk of a streamed chat completion response.
 */
export interface ChatCompletionResponseStreamChunk {
  /**
   * The event containing the new content
   */
  event: ChatCompletionResponseStreamChunk.Event;

  /**
   * (Optional) List of metrics associated with the API response
   */
  metrics?: Array<Shared.Metric>;
}

export namespace ChatCompletionResponseStreamChunk {
  /**
   * The event containing the new content
   */
  export interface Event {
    /**
     * Content generated since last event. This can be one or more tokens, or a tool
     * call.
     */
    delta: Shared.ContentDelta;

    /**
     * Type of the event
     */
    event_type: 'start' | 'complete' | 'progress';

    /**
     * Optional log probabilities for generated tokens
     */
    logprobs?: Array<InferenceAPI.TokenLogProbs>;

    /**
     * Optional reason why generation stopped, if complete
     */
    stop_reason?: 'end_of_turn' | 'end_of_message' | 'out_of_tokens';
  }
}

/**
 * Log probabilities for generated tokens.
 */
export interface TokenLogProbs {
  /**
   * Dictionary mapping tokens to their log probabilities
   */
  logprobs_by_token: { [key: string]: number };
}

export type InferenceChatCompletionParams =
  | InferenceChatCompletionParamsNonStreaming
  | InferenceChatCompletionParamsStreaming;

export interface InferenceChatCompletionParamsBase {
  /**
   * List of messages in the conversation.
   */
  messages: Array<Shared.Message>;

  /**
   * The identifier of the model to use. The model must be registered with Llama
   * Stack and available via the /models endpoint.
   */
  model_id: string;

  /**
   * (Optional) If specified, log probabilities for each token position will be
   * returned.
   */
  logprobs?: InferenceChatCompletionParams.Logprobs;

  /**
   * (Optional) Grammar specification for guided (structured) decoding. There are two
   * options: - `ResponseFormat.json_schema`: The grammar is a JSON schema. Most
   * providers support this format. - `ResponseFormat.grammar`: The grammar is a BNF
   * grammar. This format is more flexible, but not all providers support it.
   */
  response_format?: Shared.ResponseFormat;

  /**
   * Parameters to control the sampling strategy.
   */
  sampling_params?: Shared.SamplingParams;

  /**
   * (Optional) If True, generate an SSE event stream of the response. Defaults to
   * False.
   */
  stream?: boolean;

  /**
   * (Optional) Whether tool use is required or automatic. Defaults to
   * ToolChoice.auto. .. deprecated:: Use tool_config instead.
   */
  tool_choice?: 'auto' | 'required' | 'none';

  /**
   * (Optional) Configuration for tool use.
   */
  tool_config?: InferenceChatCompletionParams.ToolConfig;

  /**
   * (Optional) Instructs the model how to format tool calls. By default, Llama Stack
   * will attempt to use a format that is best adapted to the model. -
   * `ToolPromptFormat.json`: The tool calls are formatted as a JSON object. -
   * `ToolPromptFormat.function_tag`: The tool calls are enclosed in a
   * <function=function_name> tag. - `ToolPromptFormat.python_list`: The tool calls
   * are output as Python syntax -- a list of function calls. .. deprecated:: Use
   * tool_config instead.
   */
  tool_prompt_format?: 'json' | 'function_tag' | 'python_list';

  /**
   * (Optional) List of tool definitions available to the model.
   */
  tools?: Array<InferenceChatCompletionParams.Tool>;
}

export namespace InferenceChatCompletionParams {
  /**
   * (Optional) If specified, log probabilities for each token position will be
   * returned.
   */
  export interface Logprobs {
    /**
     * How many tokens (for each position) to return log probabilities for.
     */
    top_k?: number;
  }

  /**
   * (Optional) Configuration for tool use.
   */
  export interface ToolConfig {
    /**
     * (Optional) Config for how to override the default system prompt. -
     * `SystemMessageBehavior.append`: Appends the provided system message to the
     * default system prompt. - `SystemMessageBehavior.replace`: Replaces the default
     * system prompt with the provided system message. The system message can include
     * the string '{{function_definitions}}' to indicate where the function definitions
     * should be inserted.
     */
    system_message_behavior?: 'append' | 'replace';

    /**
     * (Optional) Whether tool use is automatic, required, or none. Can also specify a
     * tool name to use a specific tool. Defaults to ToolChoice.auto.
     */
    tool_choice?: 'auto' | 'required' | 'none' | (string & {});

    /**
     * (Optional) Instructs the model how to format tool calls. By default, Llama Stack
     * will attempt to use a format that is best adapted to the model. -
     * `ToolPromptFormat.json`: The tool calls are formatted as a JSON object. -
     * `ToolPromptFormat.function_tag`: The tool calls are enclosed in a
     * <function=function_name> tag. - `ToolPromptFormat.python_list`: The tool calls
     * are output as Python syntax -- a list of function calls.
     */
    tool_prompt_format?: 'json' | 'function_tag' | 'python_list';
  }

  export interface Tool {
    tool_name: 'brave_search' | 'wolfram_alpha' | 'photogen' | 'code_interpreter' | (string & {});

    description?: string;

    parameters?: { [key: string]: Shared.ToolParamDefinition };
  }

  export type InferenceChatCompletionParamsNonStreaming =
    InferenceAPI.InferenceChatCompletionParamsNonStreaming;
  export type InferenceChatCompletionParamsStreaming = InferenceAPI.InferenceChatCompletionParamsStreaming;
}

export interface InferenceChatCompletionParamsNonStreaming extends InferenceChatCompletionParamsBase {
  /**
   * (Optional) If True, generate an SSE event stream of the response. Defaults to
   * False.
   */
  stream?: false;
}

export interface InferenceChatCompletionParamsStreaming extends InferenceChatCompletionParamsBase {
  /**
   * (Optional) If True, generate an SSE event stream of the response. Defaults to
   * False.
   */
  stream: true;
}

export declare namespace Inference {
  export {
    type ChatCompletionResponseStreamChunk as ChatCompletionResponseStreamChunk,
    type TokenLogProbs as TokenLogProbs,
    type InferenceChatCompletionParams as InferenceChatCompletionParams,
    type InferenceChatCompletionParamsNonStreaming as InferenceChatCompletionParamsNonStreaming,
    type InferenceChatCompletionParamsStreaming as InferenceChatCompletionParamsStreaming,
  };
}
