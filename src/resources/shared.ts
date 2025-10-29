// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

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
        /**
         * The URL string pointing to the resource
         */
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

  /**
   * A URL reference to external content.
   */
  export interface URL {
    /**
     * The URL string pointing to the resource
     */
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
        /**
         * The URL string pointing to the resource
         */
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
        /**
         * The URL string pointing to the resource
         */
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

/**
 * Parameter type for string values.
 */
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
  /**
   * Parameter type for string values.
   */
  export interface StringType {
    /**
     * Discriminator type. Always "string"
     */
    type: 'string';
  }

  /**
   * Parameter type for numeric values.
   */
  export interface NumberType {
    /**
     * Discriminator type. Always "number"
     */
    type: 'number';
  }

  /**
   * Parameter type for boolean values.
   */
  export interface BooleanType {
    /**
     * Discriminator type. Always "boolean"
     */
    type: 'boolean';
  }

  /**
   * Parameter type for array values.
   */
  export interface ArrayType {
    /**
     * Discriminator type. Always "array"
     */
    type: 'array';
  }

  /**
   * Parameter type for object values.
   */
  export interface ObjectType {
    /**
     * Discriminator type. Always "object"
     */
    type: 'object';
  }

  /**
   * Parameter type for JSON values.
   */
  export interface JsonType {
    /**
     * Discriminator type. Always "json"
     */
    type: 'json';
  }

  /**
   * Parameter type for union values.
   */
  export interface UnionType {
    /**
     * Discriminator type. Always "union"
     */
    type: 'union';
  }

  /**
   * Parameter type for chat completion input.
   */
  export interface ChatCompletionInputType {
    /**
     * Discriminator type. Always "chat_completion_input"
     */
    type: 'chat_completion_input';
  }

  /**
   * Parameter type for completion input.
   */
  export interface CompletionInputType {
    /**
     * Discriminator type. Always "completion_input"
     */
    type: 'completion_input';
  }

  /**
   * Parameter type for agent turn input.
   */
  export interface AgentTurnInputType {
    /**
     * Discriminator type. Always "agent_turn_input"
     */
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
  query_generator_config: QueryConfig.DefaultRagQueryGeneratorConfig | QueryConfig.LlmragQueryGeneratorConfig;

  /**
   * Search mode for retrieval—either "vector", "keyword", or "hybrid". Default
   * "vector".
   */
  mode?: 'vector' | 'keyword' | 'hybrid';

  /**
   * Configuration for the ranker to use in hybrid search. Defaults to RRF ranker.
   */
  ranker?: QueryConfig.RrfRanker | QueryConfig.WeightedRanker;
}

export namespace QueryConfig {
  /**
   * Configuration for the default RAG query generator.
   */
  export interface DefaultRagQueryGeneratorConfig {
    /**
     * String separator used to join query terms
     */
    separator: string;

    /**
     * Type of query generator, always 'default'
     */
    type: 'default';
  }

  /**
   * Configuration for the LLM-based RAG query generator.
   */
  export interface LlmragQueryGeneratorConfig {
    /**
     * Name of the language model to use for query generation
     */
    model: string;

    /**
     * Template string for formatting the query generation prompt
     */
    template: string;

    /**
     * Type of query generator, always 'llm'
     */
    type: 'llm';
  }

  /**
   * Reciprocal Rank Fusion (RRF) ranker configuration.
   */
  export interface RrfRanker {
    /**
     * The impact factor for RRF scoring. Higher values give more weight to
     * higher-ranked results. Must be greater than 0
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

/**
 * Result of a RAG query containing retrieved content and metadata.
 */
export interface QueryResult {
  /**
   * Additional metadata about the query result
   */
  metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * (Optional) The retrieved content from the query
   */
  content?: InterleavedContent;
}

/**
 * Details of a safety violation detected by content moderation.
 */
export interface SafetyViolation {
  /**
   * Additional metadata including specific violation codes for debugging and
   * telemetry
   */
  metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * Severity level of the violation
   */
  violation_level: 'info' | 'warn' | 'error';

  /**
   * (Optional) Message to convey to the user about the violation
   */
  user_message?: string;
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
  arguments: string;

  call_id: string;

  tool_name: 'brave_search' | 'wolfram_alpha' | 'photogen' | 'code_interpreter' | (string & {});
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
