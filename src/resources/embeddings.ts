// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Embeddings extends APIResource {
  /**
   * Create embeddings.
   *
   * Generate OpenAI-compatible embeddings for the given input using the specified
   * model.
   */
  create(
    body: EmbeddingCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<CreateEmbeddingsResponse> {
    return this._client.post('/v1/embeddings', { body, ...options });
  }
}

/**
 * Response from an OpenAI-compatible embeddings request.
 */
export interface CreateEmbeddingsResponse {
  data: Array<CreateEmbeddingsResponse.Data>;

  model: string;

  /**
   * Usage information for an OpenAI-compatible embeddings response.
   */
  usage: CreateEmbeddingsResponse.Usage;

  object?: 'list';
}

export namespace CreateEmbeddingsResponse {
  /**
   * A single embedding data object from an OpenAI-compatible embeddings response.
   */
  export interface Data {
    embedding: Array<number> | string;

    index: number;

    object?: 'embedding';
  }

  /**
   * Usage information for an OpenAI-compatible embeddings response.
   */
  export interface Usage {
    prompt_tokens: number;

    total_tokens: number;
  }
}

export interface EmbeddingCreateParams {
  input: string | Array<string>;

  model: string;

  dimensions?: number | null;

  encoding_format?: string | null;

  user?: string | null;

  [k: string]: unknown;
}

export declare namespace Embeddings {
  export {
    type CreateEmbeddingsResponse as CreateEmbeddingsResponse,
    type EmbeddingCreateParams as EmbeddingCreateParams,
  };
}
