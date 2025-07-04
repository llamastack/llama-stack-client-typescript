// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Shared from './shared';
import * as InferenceAPI from './inference';
import * as ToolRuntimeAPI from './tool-runtime/tool-runtime';

/**
 * Configuration for an agent.
 */
export interface AgentConfig {
  /**
   * The system instructions for the agent
   */
  instructions: string;

  /**
   * The model identifier to use for the agent
   */
  model: string;

  client_tools?: Array<ToolRuntimeAPI.ToolDef>;

  /**
   * Optional flag indicating whether session data has to be persisted
   */
  enable_session_persistence?: boolean;

  input_shields?: Array<string>;

  max_infer_iters?: number;

  /**
   * Optional name for the agent, used in telemetry and identification
   */
  name?: string;

  output_shields?: Array<string>;

  /**
   * Optional response format configuration
   */
  response_format?: ResponseFormat;

  /**
   * Sampling parameters.
   */
  sampling_params?: SamplingParams;

  /**
   * @deprecated Whether tool use is required or automatic. This is a hint to the
   * model which may not be followed. It depends on the Instruction Following
   * capabilities of the model.
   */
  tool_choice?: 'auto' | 'required' | 'none';

  /**
   * Configuration for tool use.
   */
  tool_config?: AgentConfig.ToolConfig;

  /**
   * @deprecated Prompt format for calling custom / zero shot tools.
   */
  tool_prompt_format?: 'json' | 'function_tag' | 'python_list';

  toolgroups?: Array<string | AgentConfig.AgentToolGroupWithArgs>;
}

export namespace AgentConfig {
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

  export interface AgentToolGroupWithArgs {
    args: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

    name: string;
  }
}

export interface BatchCompletion {
  batch: Array<InferenceAPI.CompletionResponse>;
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
  logprobs?: Array<InferenceAPI.TokenLogProbs>;

  metrics?: Array<ChatCompletionResponse.Metric>;
}

export namespace ChatCompletionResponse {
  export interface Metric {
    metric: string;

    value: number;

    unit?: string;
  }
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

export type ContentDelta = ContentDelta.TextDelta | ContentDelta.ImageDelta | ContentDelta.ToolCallDelta;

export namespace ContentDelta {
  export interface TextDelta {
    text: string;

    type: 'text';
  }

  export interface ImageDelta {
    image: string;

    type: 'image';
  }

  export interface ToolCallDelta {
    parse_status: 'started' | 'in_progress' | 'failed' | 'succeeded';

    tool_call: Shared.ToolCallOrString;

    type: 'tool_call';
  }
}

/**
 * A document to be used for document ingestion in the RAG Tool.
 */
export interface Document {
  /**
   * The content of the document.
   */
  content:
    | string
    | Document.ImageContentItem
    | Document.TextContentItem
    | Array<InterleavedContentItem>
    | Document.URL;

  /**
   * The unique identifier for the document.
   */
  document_id: string;

  /**
   * Additional metadata for the document.
   */
  metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * The MIME type of the document.
   */
  mime_type?: string;
}

export namespace Document {
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
      url?: Image.URL;
    }

    export namespace Image {
      /**
       * A URL of the image or data URL in the format of data:image/{type};base64,{data}.
       * Note that URL could have length limits.
       */
      export interface URL {
        uri: string;
      }
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

  export interface URL {
    uri: string;
  }
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
      url?: Image.URL;
    }

    export namespace Image {
      /**
       * A URL of the image or data URL in the format of data:image/{type};base64,{data}.
       * Note that URL could have length limits.
       */
      export interface URL {
        uri: string;
      }
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
      url?: Image.URL;
    }

    export namespace Image {
      /**
       * A URL of the image or data URL in the format of data:image/{type};base64,{data}.
       * Note that URL could have length limits.
       */
      export interface URL {
        uri: string;
      }
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
export type Message = UserMessage | SystemMessage | ToolResponseMessage | CompletionMessage;

export type ParamType =
  | ParamType.StringType
  | ParamType.NumberType
  | ParamType.BooleanType
  | ParamType.ArrayType
  | ParamType.ObjectType
  | ParamType.JsonType
  | ParamType.UnionType
  | ParamType.ChatCompletionInputType
  | ParamType.CompletionInputType
  | ParamType.AgentTurnInputType;

export namespace ParamType {
  export interface StringType {
    type: 'string';
  }

  export interface NumberType {
    type: 'number';
  }

  export interface BooleanType {
    type: 'boolean';
  }

  export interface ArrayType {
    type: 'array';
  }

  export interface ObjectType {
    type: 'object';
  }

  export interface JsonType {
    type: 'json';
  }

  export interface UnionType {
    type: 'union';
  }

  export interface ChatCompletionInputType {
    type: 'chat_completion_input';
  }

  export interface CompletionInputType {
    type: 'completion_input';
  }

  export interface AgentTurnInputType {
    type: 'agent_turn_input';
  }
}

/**
 * Configuration for the RAG query generation.
 */
export interface QueryConfig {
  /**
   * Template for formatting each retrieved chunk in the context. Available
   * placeholders: {index} (1-based chunk ordinal), {chunk.content} (chunk content
   * string), {metadata} (chunk metadata dict). Default: "Result {index}\nContent:
   * {chunk.content}\nMetadata: {metadata}\n"
   */
  chunk_template: string;

  /**
   * Maximum number of chunks to retrieve.
   */
  max_chunks: number;

  /**
   * Maximum number of tokens in the context.
   */
  max_tokens_in_context: number;

  /**
   * Configuration for the query generator.
   */
  query_generator_config: QueryGeneratorConfig;

  /**
   * Search mode for retrieval—either "vector", "keyword", or "hybrid". Default
   * "vector".
   */
  mode?: string;

  /**
   * Configuration for the ranker to use in hybrid search. Defaults to RRF ranker.
   */
  ranker?: QueryConfig.RrfRanker | QueryConfig.WeightedRanker;
}

export namespace QueryConfig {
  /**
   * Reciprocal Rank Fusion (RRF) ranker configuration.
   */
  export interface RrfRanker {
    /**
     * The impact factor for RRF scoring. Higher values give more weight to
     * higher-ranked results. Must be greater than 0. Default of 60 is from the
     * original RRF paper (Cormack et al., 2009).
     */
    impact_factor: number;

    /**
     * The type of ranker, always "rrf"
     */
    type: 'rrf';
  }

  /**
   * Weighted ranker configuration that combines vector and keyword scores.
   */
  export interface WeightedRanker {
    /**
     * Weight factor between 0 and 1. 0 means only use keyword scores, 1 means only use
     * vector scores, values in between blend both scores.
     */
    alpha: number;

    /**
     * The type of ranker, always "weighted"
     */
    type: 'weighted';
  }
}

export type QueryGeneratorConfig =
  | QueryGeneratorConfig.DefaultRagQueryGeneratorConfig
  | QueryGeneratorConfig.LlmragQueryGeneratorConfig;

export namespace QueryGeneratorConfig {
  export interface DefaultRagQueryGeneratorConfig {
    separator: string;

    type: 'default';
  }

  export interface LlmragQueryGeneratorConfig {
    model: string;

    template: string;

    type: 'llm';
  }
}

export interface QueryResult {
  metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * A image content item
   */
  content?: InterleavedContent;
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

export interface ReturnType {
  type:
    | 'string'
    | 'number'
    | 'boolean'
    | 'array'
    | 'object'
    | 'json'
    | 'union'
    | 'chat_completion_input'
    | 'completion_input'
    | 'agent_turn_input';
}

export interface SafetyViolation {
  metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  violation_level: 'info' | 'warn' | 'error';

  user_message?: string;
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
 * A scoring result for a single row.
 */
export interface ScoringResult {
  /**
   * Map of metric name to aggregated value
   */
  aggregated_results: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * The scoring result for each row. Each row is a map of column name to value.
   */
  score_rows: Array<{ [key: string]: boolean | number | string | Array<unknown> | unknown | null }>;
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

export type ToolCallOrString = string | ToolCall;

export interface ToolParamDefinition {
  param_type: string;

  default?: boolean | number | string | Array<unknown> | unknown | null;

  description?: string;

  required?: boolean;
}

/**
 * A message representing the result of a tool invocation.
 */
export interface ToolResponseMessage {
  /**
   * Unique identifier for the tool call this response is for
   */
  call_id: string;

  /**
   * The response content from the tool
   */
  content: InterleavedContent;

  /**
   * Must be "tool" to identify this as a tool response
   */
  role: 'tool';
}

/**
 * A message from the user in a chat conversation.
 */
export interface UserMessage {
  /**
   * The content of the message, which can include text and other media
   */
  content: InterleavedContent;

  /**
   * Must be "user" to identify this as a user message
   */
  role: 'user';

  /**
   * (Optional) This field is used internally by Llama Stack to pass RAG context.
   * This field may be removed in the API in the future.
   */
  context?: InterleavedContent;
}
