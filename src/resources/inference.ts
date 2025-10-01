// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Inference extends APIResource {
  /**
   * Rerank a list of documents based on their relevance to a query.
   */
  rerank(
    body: InferenceRerankParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InferenceRerankResponse> {
    return (
      this._client.post('/v1alpha/inference/rerank', { body, ...options }) as Core.APIPromise<{
        data: InferenceRerankResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }
}

/**
 * List of rerank result objects, sorted by relevance score (descending)
 */
export type InferenceRerankResponse = Array<InferenceRerankResponse.InferenceRerankResponseItem>;

export namespace InferenceRerankResponse {
  /**
   * A single rerank result from a reranking response.
   */
  export interface InferenceRerankResponseItem {
    /**
     * The original index of the document in the input list
     */
    index: number;

    /**
     * The relevance score from the model output. Values are inverted when applicable
     * so that higher scores indicate greater relevance.
     */
    relevance_score: number;
  }
}

export interface InferenceRerankParams {
  /**
   * List of items to rerank. Each item can be a string, text content part, or image
   * content part. Each input must not exceed the model's max input token length.
   */
  items: Array<
    | string
    | InferenceRerankParams.OpenAIChatCompletionContentPartTextParam
    | InferenceRerankParams.OpenAIChatCompletionContentPartImageParam
  >;

  /**
   * The identifier of the reranking model to use.
   */
  model: string;

  /**
   * The search query to rank items against. Can be a string, text content part, or
   * image content part. The input must not exceed the model's max input token
   * length.
   */
  query:
    | string
    | InferenceRerankParams.OpenAIChatCompletionContentPartTextParam
    | InferenceRerankParams.OpenAIChatCompletionContentPartImageParam;

  /**
   * (Optional) Maximum number of results to return. Default: returns all.
   */
  max_num_results?: number;
}

export namespace InferenceRerankParams {
  /**
   * Text content part for OpenAI-compatible chat completion messages.
   */
  export interface OpenAIChatCompletionContentPartTextParam {
    /**
     * The text content of the message
     */
    text: string;

    /**
     * Must be "text" to identify this as text content
     */
    type: 'text';
  }

  /**
   * Image content part for OpenAI-compatible chat completion messages.
   */
  export interface OpenAIChatCompletionContentPartImageParam {
    /**
     * Image URL specification and processing details
     */
    image_url: OpenAIChatCompletionContentPartImageParam.ImageURL;

    /**
     * Must be "image_url" to identify this as image content
     */
    type: 'image_url';
  }

  export namespace OpenAIChatCompletionContentPartImageParam {
    /**
     * Image URL specification and processing details
     */
    export interface ImageURL {
      /**
       * URL of the image to include in the message
       */
      url: string;

      /**
       * (Optional) Level of detail for image processing. Can be "low", "high", or "auto"
       */
      detail?: string;
    }
  }

  /**
   * Text content part for OpenAI-compatible chat completion messages.
   */
  export interface OpenAIChatCompletionContentPartTextParam {
    /**
     * The text content of the message
     */
    text: string;

    /**
     * Must be "text" to identify this as text content
     */
    type: 'text';
  }

  /**
   * Image content part for OpenAI-compatible chat completion messages.
   */
  export interface OpenAIChatCompletionContentPartImageParam {
    /**
     * Image URL specification and processing details
     */
    image_url: OpenAIChatCompletionContentPartImageParam.ImageURL;

    /**
     * Must be "image_url" to identify this as image content
     */
    type: 'image_url';
  }

  export namespace OpenAIChatCompletionContentPartImageParam {
    /**
     * Image URL specification and processing details
     */
    export interface ImageURL {
      /**
       * URL of the image to include in the message
       */
      url: string;

      /**
       * (Optional) Level of detail for image processing. Can be "low", "high", or "auto"
       */
      detail?: string;
    }
  }
}

export declare namespace Inference {
  export {
    type InferenceRerankResponse as InferenceRerankResponse,
    type InferenceRerankParams as InferenceRerankParams,
  };
}
