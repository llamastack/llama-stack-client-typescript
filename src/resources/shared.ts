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
  /**
   * Greedy sampling strategy that selects the highest probability token at each
   * step.
   */
  export interface GreedySamplingStrategy {
    /**
     * Must be "greedy" to identify this sampling strategy
     */
    type: 'greedy';
  }

  /**
   * Top-p (nucleus) sampling strategy that samples from the smallest set of tokens
   * with cumulative probability >= p.
   */
  export interface TopPSamplingStrategy {
    /**
     * Must be "top_p" to identify this sampling strategy
     */
    type: 'top_p';

    /**
     * Controls randomness in sampling. Higher values increase randomness
     */
    temperature?: number;

    /**
     * Cumulative probability threshold for nucleus sampling. Defaults to 0.95
     */
    top_p?: number;
  }

  /**
   * Top-k sampling strategy that restricts sampling to the k most likely tokens.
   */
  export interface TopKSamplingStrategy {
    /**
     * Number of top tokens to consider for sampling. Must be at least 1
     */
    top_k: number;

    /**
     * Must be "top_k" to identify this sampling strategy
     */
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
