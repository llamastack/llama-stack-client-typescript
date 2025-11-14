// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

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

export type InferenceRerankResponse = Array<InferenceRerankResponse.InferenceRerankResponseItem>;

export namespace InferenceRerankResponse {
  /**
   * A single rerank result from a reranking response.
   */
  export interface InferenceRerankResponseItem {
    index: number;

    relevance_score: number;
  }
}

export interface InferenceRerankParams {
  items: Array<
    | string
    | InferenceRerankParams.OpenAIChatCompletionContentPartTextParam
    | InferenceRerankParams.OpenAIChatCompletionContentPartImageParam
  >;

  model: string;

  /**
   * Text content part for OpenAI-compatible chat completion messages.
   */
  query:
    | string
    | InferenceRerankParams.OpenAIChatCompletionContentPartTextParam
    | InferenceRerankParams.OpenAIChatCompletionContentPartImageParam;

  max_num_results?: number | null;
}

export namespace InferenceRerankParams {
  /**
   * Text content part for OpenAI-compatible chat completion messages.
   */
  export interface OpenAIChatCompletionContentPartTextParam {
    text: string;

    type?: 'text';
  }

  /**
   * Image content part for OpenAI-compatible chat completion messages.
   */
  export interface OpenAIChatCompletionContentPartImageParam {
    /**
     * Image URL specification for OpenAI-compatible chat completion messages.
     */
    image_url: OpenAIChatCompletionContentPartImageParam.ImageURL;

    type?: 'image_url';
  }

  export namespace OpenAIChatCompletionContentPartImageParam {
    /**
     * Image URL specification for OpenAI-compatible chat completion messages.
     */
    export interface ImageURL {
      url: string;

      detail?: string | null;
    }
  }

  /**
   * Text content part for OpenAI-compatible chat completion messages.
   */
  export interface OpenAIChatCompletionContentPartTextParam {
    text: string;

    type?: 'text';
  }

  /**
   * Image content part for OpenAI-compatible chat completion messages.
   */
  export interface OpenAIChatCompletionContentPartImageParam {
    /**
     * Image URL specification for OpenAI-compatible chat completion messages.
     */
    image_url: OpenAIChatCompletionContentPartImageParam.ImageURL;

    type?: 'image_url';
  }

  export namespace OpenAIChatCompletionContentPartImageParam {
    /**
     * Image URL specification for OpenAI-compatible chat completion messages.
     */
    export interface ImageURL {
      url: string;

      detail?: string | null;
    }
  }
}

export declare namespace Inference {
  export {
    type InferenceRerankResponse as InferenceRerankResponse,
    type InferenceRerankParams as InferenceRerankParams,
  };
}
