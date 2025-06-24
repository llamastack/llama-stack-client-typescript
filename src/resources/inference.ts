// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ToolRuntimeAPI from './tool-runtime/tool-runtime';
import * as TurnAPI from './agents/session/turn/turn';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Inference extends APIResource {
  batchChatCompletion(
    body: InferenceBatchChatCompletionParams,
    options?: RequestOptions,
  ): APIPromise<InferenceBatchChatCompletionResponse> {
    return this._client.post('/v1/inference/batch-chat-completion', { body, ...options });
  }

  batchCompletion(
    body: InferenceBatchCompletionParams,
    options?: RequestOptions,
  ): APIPromise<InferenceBatchCompletionResponse> {
    return this._client.post('/v1/inference/batch-completion', { body, ...options });
  }

  /**
   * Generate a chat completion for the given messages using the specified model.
   */
  chatCompletion(
    body: InferenceChatCompletionParams,
    options?: RequestOptions,
  ): APIPromise<ChatCompletionResponse> {
    return this._client.post('/v1/inference/chat-completion', { body, ...options });
  }

  /**
   * Generate a completion for the given content using the specified model.
   */
  completion(body: InferenceCompletionParams, options?: RequestOptions): APIPromise<CompletionResponse> {
    return this._client.post('/v1/inference/completion', { body, ...options });
  }

  /**
   * Generate embeddings for content pieces using the specified model.
   */
  embeddings(
    body: InferenceEmbeddingsParams,
    options?: RequestOptions,
  ): APIPromise<InferenceEmbeddingsResponse> {
    return this._client.post('/v1/inference/embeddings', { body, ...options });
  }
}

/**
 * Response from a chat completion request.
 */
export interface ChatCompletionResponse {
  /**
   * The complete response message
   */
  completion_message: CompletionMessage;

  /**
   * Optional log probabilities for generated tokens
   */
  logprobs?: Array<TokenLogProbs>;

  metrics?: Array<MetricInResponse>;
}

/**
 * A message containing the model's (assistant) response in a chat conversation.
 */
export interface CompletionMessage {
  /**
   * The content of the model's response
   */
  content: InterleavedContent;

  /**
   * Must be "assistant" to identify this as the model's response
   */
  role: 'assistant';

  /**
   * Reason why the model stopped generating. Options are: -
   * `StopReason.end_of_turn`: The model finished generating the entire response. -
   * `StopReason.end_of_message`: The model finished generating but generated a
   * partial response -- usually, a tool call. The user may call the tool and
   * continue the conversation with the tool's response. -
   * `StopReason.out_of_tokens`: The model ran out of token budget.
   */
  stop_reason: 'end_of_turn' | 'end_of_message' | 'out_of_tokens';

  /**
   * List of tool calls. Each tool call is a ToolCall object.
   */
  tool_calls?: Array<ToolCall>;
}

/**
 * Response from a completion request.
 */
export interface CompletionResponse {
  /**
   * The generated completion text
   */
  content: string;

  /**
   * Reason why generation stopped
   */
  stop_reason: 'end_of_turn' | 'end_of_message' | 'out_of_tokens';

  /**
   * Optional log probabilities for generated tokens
   */
  logprobs?: Array<TokenLogProbs>;

  metrics?: Array<MetricInResponse>;
}

/**
 * A image content item
 */
export type InterleavedContent =
  | string
  | InterleavedContent.ImageContentItem
  | InterleavedContent.TextContentItem
  | Array<InterleavedContentItem>;

export namespace InterleavedContent {
  /**
   * A image content item
   */
  export interface ImageContentItem {
    /**
     * Image as a base64 encoded string or an URL
     */
    image: ImageContentItem.Image;

    /**
     * Discriminator type of the content item. Always "image"
     */
    type: 'image';
  }

  export namespace ImageContentItem {
    /**
     * Image as a base64 encoded string or an URL
     */
    export interface Image {
      /**
       * base64 encoded image data as string
       */
      data?: string;

      /**
       * A URL of the image or data URL in the format of data:image/{type};base64,{data}.
       * Note that URL could have length limits.
       */
      url?: ToolRuntimeAPI.URL;
    }
  }

  /**
   * A text content item
   */
  export interface TextContentItem {
    /**
     * Text content
     */
    text: string;

    /**
     * Discriminator type of the content item. Always "text"
     */
    type: 'text';
  }
}

/**
 * A image content item
 */
export type InterleavedContentItem =
  | InterleavedContentItem.ImageContentItem
  | InterleavedContentItem.TextContentItem;

export namespace InterleavedContentItem {
  /**
   * A image content item
   */
  export interface ImageContentItem {
    /**
     * Image as a base64 encoded string or an URL
     */
    image: ImageContentItem.Image;

    /**
     * Discriminator type of the content item. Always "image"
     */
    type: 'image';
  }

  export namespace ImageContentItem {
    /**
     * Image as a base64 encoded string or an URL
     */
    export interface Image {
      /**
       * base64 encoded image data as string
       */
      data?: string;

      /**
       * A URL of the image or data URL in the format of data:image/{type};base64,{data}.
       * Note that URL could have length limits.
       */
      url?: ToolRuntimeAPI.URL;
    }
  }

  /**
   * A text content item
   */
  export interface TextContentItem {
    /**
     * Text content
     */
    text: string;

    /**
     * Discriminator type of the content item. Always "text"
     */
    type: 'text';
  }
}

/**
 * A message from the user in a chat conversation.
 */
export type Message = TurnAPI.UserMessage | SystemMessage | TurnAPI.ToolResponseMessage | CompletionMessage;

export interface MetricInResponse {
  metric: string;

  value: number;

  unit?: string;
}

/**
 * Configuration for JSON schema-guided response generation.
 */
export type ResponseFormat = ResponseFormat.JsonSchemaResponseFormat | ResponseFormat.GrammarResponseFormat;

export namespace ResponseFormat {
  /**
   * Configuration for JSON schema-guided response generation.
   */
  export interface JsonSchemaResponseFormat {
    /**
     * The JSON schema the response should conform to. In a Python SDK, this is often a
     * `pydantic` model.
     */
    json_schema: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

    /**
     * Must be "json_schema" to identify this format type
     */
    type: 'json_schema';
  }

  /**
   * Configuration for grammar-guided response generation.
   */
  export interface GrammarResponseFormat {
    /**
     * The BNF grammar specification the response should conform to
     */
    bnf: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

    /**
     * Must be "grammar" to identify this format type
     */
    type: 'grammar';
  }
}

/**
 * Sampling parameters.
 */
export interface SamplingParams {
  /**
   * The sampling strategy.
   */
  strategy:
    | SamplingParams.GreedySamplingStrategy
    | SamplingParams.TopPSamplingStrategy
    | SamplingParams.TopKSamplingStrategy;

  /**
   * The maximum number of tokens that can be generated in the completion. The token
   * count of your prompt plus max_tokens cannot exceed the model's context length.
   */
  max_tokens?: number;

  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on
   * whether they appear in the text so far, increasing the model's likelihood to
   * talk about new topics.
   */
  repetition_penalty?: number;

  /**
   * Up to 4 sequences where the API will stop generating further tokens. The
   * returned text will not contain the stop sequence.
   */
  stop?: Array<string>;
}

export namespace SamplingParams {
  export interface GreedySamplingStrategy {
    type: 'greedy';
  }

  export interface TopPSamplingStrategy {
    type: 'top_p';

    temperature?: number;

    top_p?: number;
  }

  export interface TopKSamplingStrategy {
    top_k: number;

    type: 'top_k';
  }
}

/**
 * A system message providing instructions or context to the model.
 */
export interface SystemMessage {
  /**
   * The content of the "system prompt". If multiple system messages are provided,
   * they are concatenated. The underlying Llama Stack code may also add other system
   * messages (for example, for formatting tool definitions).
   */
  content: InterleavedContent;

  /**
   * Must be "system" to identify this as a system message
   */
  role: 'system';
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

export interface ToolCall {
  arguments:
    | string
    | {
        [key: string]:
          | string
          | number
          | boolean
          | Array<string | number | boolean | null>
          | { [key: string]: string | number | boolean | null }
          | null;
      };

  call_id: string;

  tool_name: 'brave_search' | 'wolfram_alpha' | 'photogen' | 'code_interpreter' | (string & {});

  arguments_json?: string;
}

/**
 * Configuration for tool use.
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

export interface ToolDefinition {
  tool_name: 'brave_search' | 'wolfram_alpha' | 'photogen' | 'code_interpreter' | (string & {});

  description?: string;

  parameters?: { [key: string]: ToolDefinition.Parameters };
}

export namespace ToolDefinition {
  export interface Parameters {
    param_type: string;

    default?: boolean | number | string | Array<unknown> | unknown | null;

    description?: string;

    required?: boolean;
  }
}

export interface InferenceBatchChatCompletionResponse {
  batch: Array<ChatCompletionResponse>;
}

export interface InferenceBatchCompletionResponse {
  batch: Array<CompletionResponse>;
}

/**
 * Response containing generated embeddings.
 */
export interface InferenceEmbeddingsResponse {
  /**
   * List of embedding vectors, one per input content. Each embedding is a list of
   * floats. The dimensionality of the embedding is model-specific; you can check
   * model metadata using /models/{model_id}
   */
  embeddings: Array<Array<number>>;
}

export interface InferenceBatchChatCompletionParams {
  messages_batch: Array<Array<Message>>;

  model_id: string;

  logprobs?: InferenceBatchChatCompletionParams.Logprobs;

  /**
   * Configuration for JSON schema-guided response generation.
   */
  response_format?: ResponseFormat;

  /**
   * Sampling parameters.
   */
  sampling_params?: SamplingParams;

  /**
   * Configuration for tool use.
   */
  tool_config?: ToolConfig;

  tools?: Array<ToolDefinition>;
}

export namespace InferenceBatchChatCompletionParams {
  export interface Logprobs {
    /**
     * How many tokens (for each position) to return log probabilities for.
     */
    top_k?: number;
  }
}

export interface InferenceBatchCompletionParams {
  content_batch: Array<InterleavedContent>;

  model_id: string;

  logprobs?: InferenceBatchCompletionParams.Logprobs;

  /**
   * Configuration for JSON schema-guided response generation.
   */
  response_format?: ResponseFormat;

  /**
   * Sampling parameters.
   */
  sampling_params?: SamplingParams;
}

export namespace InferenceBatchCompletionParams {
  export interface Logprobs {
    /**
     * How many tokens (for each position) to return log probabilities for.
     */
    top_k?: number;
  }
}

export interface InferenceChatCompletionParams {
  /**
   * List of messages in the conversation
   */
  messages: Array<Message>;

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
  response_format?: ResponseFormat;

  /**
   * Parameters to control the sampling strategy
   */
  sampling_params?: SamplingParams;

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
  tool_config?: ToolConfig;

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
   * (Optional) List of tool definitions available to the model
   */
  tools?: Array<ToolDefinition>;
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
}

export interface InferenceCompletionParams {
  /**
   * The content to generate a completion for
   */
  content: InterleavedContent;

  /**
   * The identifier of the model to use. The model must be registered with Llama
   * Stack and available via the /models endpoint.
   */
  model_id: string;

  /**
   * (Optional) If specified, log probabilities for each token position will be
   * returned.
   */
  logprobs?: InferenceCompletionParams.Logprobs;

  /**
   * (Optional) Grammar specification for guided (structured) decoding
   */
  response_format?: ResponseFormat;

  /**
   * (Optional) Parameters to control the sampling strategy
   */
  sampling_params?: SamplingParams;

  /**
   * (Optional) If True, generate an SSE event stream of the response. Defaults to
   * False.
   */
  stream?: boolean;
}

export namespace InferenceCompletionParams {
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
}

export interface InferenceEmbeddingsParams {
  /**
   * List of contents to generate embeddings for. Each content can be a string or an
   * InterleavedContentItem (and hence can be multimodal). The behavior depends on
   * the model and provider. Some models may only support text.
   */
  contents: Array<string> | Array<InterleavedContentItem>;

  /**
   * The identifier of the model to use. The model must be an embedding model
   * registered with Llama Stack and available via the /models endpoint.
   */
  model_id: string;

  /**
   * (Optional) Output dimensionality for the embeddings. Only supported by
   * Matryoshka models.
   */
  output_dimension?: number;

  /**
   * (Optional) How is the embedding being used? This is only supported by asymmetric
   * embedding models.
   */
  task_type?: 'query' | 'document';

  /**
   * (Optional) Config for how to truncate text for embedding when text is longer
   * than the model's max sequence length.
   */
  text_truncation?: 'none' | 'start' | 'end';
}

export declare namespace Inference {
  export {
    type ChatCompletionResponse as ChatCompletionResponse,
    type CompletionMessage as CompletionMessage,
    type CompletionResponse as CompletionResponse,
    type InterleavedContent as InterleavedContent,
    type InterleavedContentItem as InterleavedContentItem,
    type Message as Message,
    type MetricInResponse as MetricInResponse,
    type ResponseFormat as ResponseFormat,
    type SamplingParams as SamplingParams,
    type SystemMessage as SystemMessage,
    type TokenLogProbs as TokenLogProbs,
    type ToolCall as ToolCall,
    type ToolConfig as ToolConfig,
    type ToolDefinition as ToolDefinition,
    type InferenceBatchChatCompletionResponse as InferenceBatchChatCompletionResponse,
    type InferenceBatchCompletionResponse as InferenceBatchCompletionResponse,
    type InferenceEmbeddingsResponse as InferenceEmbeddingsResponse,
    type InferenceBatchChatCompletionParams as InferenceBatchChatCompletionParams,
    type InferenceBatchCompletionParams as InferenceBatchCompletionParams,
    type InferenceChatCompletionParams as InferenceChatCompletionParams,
    type InferenceCompletionParams as InferenceCompletionParams,
    type InferenceEmbeddingsParams as InferenceEmbeddingsParams,
  };
}
