// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

/**
 * A image content item
 */
export type InterleavedContent =
  | string
  | InterleavedContent.ImageContentItem
  | InterleavedContent.TextContentItem
  | Array<InterleavedContent.ImageContentItem | InterleavedContent.TextContentItem>;

export namespace InterleavedContent {
  /**
   * A image content item
   */
  export interface ImageContentItem {
    /**
     * A URL or a base64 encoded string
     */
    image: ImageContentItem.Image;

    type?: 'image';
  }

  export namespace ImageContentItem {
    /**
     * A URL or a base64 encoded string
     */
    export interface Image {
      data?: string | null;

      /**
       * A URL reference to external content.
       */
      url?: Image.URL | null;
    }

    export namespace Image {
      /**
       * A URL reference to external content.
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
    text: string;

    type?: 'text';
  }

  /**
   * A image content item
   */
  export interface ImageContentItem {
    /**
     * A URL or a base64 encoded string
     */
    image: ImageContentItem.Image;

    type?: 'image';
  }

  export namespace ImageContentItem {
    /**
     * A URL or a base64 encoded string
     */
    export interface Image {
      data?: string | null;

      /**
       * A URL reference to external content.
       */
      url?: Image.URL | null;
    }

    export namespace Image {
      /**
       * A URL reference to external content.
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
    text: string;

    type?: 'text';
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
     * A URL or a base64 encoded string
     */
    image: ImageContentItem.Image;

    type?: 'image';
  }

  export namespace ImageContentItem {
    /**
     * A URL or a base64 encoded string
     */
    export interface Image {
      data?: string | null;

      /**
       * A URL reference to external content.
       */
      url?: Image.URL | null;
    }

    export namespace Image {
      /**
       * A URL reference to external content.
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
    text: string;

    type?: 'text';
  }
}

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
  | ParamType.CompletionInputType;

export namespace ParamType {
  /**
   * Parameter type for string values.
   */
  export interface StringType {
    type?: 'string';
  }

  /**
   * Parameter type for numeric values.
   */
  export interface NumberType {
    type?: 'number';
  }

  /**
   * Parameter type for boolean values.
   */
  export interface BooleanType {
    type?: 'boolean';
  }

  /**
   * Parameter type for array values.
   */
  export interface ArrayType {
    type?: 'array';
  }

  /**
   * Parameter type for object values.
   */
  export interface ObjectType {
    type?: 'object';
  }

  /**
   * Parameter type for JSON values.
   */
  export interface JsonType {
    type?: 'json';
  }

  /**
   * Parameter type for union values.
   */
  export interface UnionType {
    type?: 'union';
  }

  /**
   * Parameter type for chat completion input.
   */
  export interface ChatCompletionInputType {
    type?: 'chat_completion_input';
  }

  /**
   * Parameter type for completion input.
   */
  export interface CompletionInputType {
    type?: 'completion_input';
  }
}

/**
 * Details of a safety violation detected by content moderation.
 */
export interface SafetyViolation {
  /**
   * Severity level of a safety violation.
   */
  violation_level: 'info' | 'warn' | 'error';

  metadata?: { [key: string]: unknown };

  user_message?: string | null;
}

/**
 * Sampling parameters.
 */
export interface SamplingParams {
  max_tokens?: number | null;

  repetition_penalty?: number | null;

  stop?: Array<string> | null;

  /**
   * Greedy sampling strategy that selects the highest probability token at each
   * step.
   */
  strategy?:
    | SamplingParams.GreedySamplingStrategy
    | SamplingParams.TopPSamplingStrategy
    | SamplingParams.TopKSamplingStrategy;
}

export namespace SamplingParams {
  /**
   * Greedy sampling strategy that selects the highest probability token at each
   * step.
   */
  export interface GreedySamplingStrategy {
    type?: 'greedy';
  }

  /**
   * Top-p (nucleus) sampling strategy that samples from the smallest set of tokens
   * with cumulative probability >= p.
   */
  export interface TopPSamplingStrategy {
    temperature: number | null;

    top_p?: number | null;

    type?: 'top_p';
  }

  /**
   * Top-k sampling strategy that restricts sampling to the k most likely tokens.
   */
  export interface TopKSamplingStrategy {
    top_k: number;

    type?: 'top_k';
  }
}

/**
 * A scoring result for a single row.
 */
export interface ScoringResult {
  aggregated_results: { [key: string]: unknown };

  score_rows: Array<{ [key: string]: unknown }>;
}

/**
 * A system message providing instructions or context to the model.
 */
export interface SystemMessage {
  /**
   * A image content item
   */
  content:
    | string
    | SystemMessage.ImageContentItemInput
    | SystemMessage.TextContentItem
    | Array<SystemMessage.ImageContentItemInput | SystemMessage.TextContentItem>;

  role?: 'system';
}

export namespace SystemMessage {
  /**
   * A image content item
   */
  export interface ImageContentItemInput {
    /**
     * A URL or a base64 encoded string
     */
    image: ImageContentItemInput.Image;

    type?: 'image';
  }

  export namespace ImageContentItemInput {
    /**
     * A URL or a base64 encoded string
     */
    export interface Image {
      data?: string | null;

      /**
       * A URL reference to external content.
       */
      url?: Image.URL | null;
    }

    export namespace Image {
      /**
       * A URL reference to external content.
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
    text: string;

    type?: 'text';
  }

  /**
   * A image content item
   */
  export interface ImageContentItemInput {
    /**
     * A URL or a base64 encoded string
     */
    image: ImageContentItemInput.Image;

    type?: 'image';
  }

  export namespace ImageContentItemInput {
    /**
     * A URL or a base64 encoded string
     */
    export interface Image {
      data?: string | null;

      /**
       * A URL reference to external content.
       */
      url?: Image.URL | null;
    }

    export namespace Image {
      /**
       * A URL reference to external content.
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
    text: string;

    type?: 'text';
  }
}
