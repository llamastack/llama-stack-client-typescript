// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Embeddings extends APIResource {
  /**
   * Create embeddings. Generate OpenAI-compatible embeddings for the given input
   * using the specified model.
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
  /**
   * List of embedding data objects
   */
  data: Array<CreateEmbeddingsResponse.Data>;

  /**
   * The model that was used to generate the embeddings
   */
  model: string;

  /**
   * The object type, which will be "list"
   */
  object: 'list';

  /**
   * Usage information
   */
  usage: CreateEmbeddingsResponse.Usage;
}

export namespace CreateEmbeddingsResponse {
  /**
   * A single embedding data object from an OpenAI-compatible embeddings response.
   */
  export interface Data {
    /**
     * The embedding vector as a list of floats (when encoding_format="float") or as a
     * base64-encoded string (when encoding_format="base64")
     */
    embedding: Array<number> | string;

    /**
     * The index of the embedding in the input list
     */
    index: number;

    /**
     * The object type, which will be "embedding"
     */
    object: 'embedding';
  }

  /**
   * Usage information
   */
  export interface Usage {
    /**
     * The number of tokens in the input
     */
    prompt_tokens: number;

    /**
     * The total number of tokens used
     */
    total_tokens: number;
  }
}

export interface EmbeddingCreateParams {
  /**
   * Input text to embed, encoded as a string or array of strings. To embed multiple
   * inputs in a single request, pass an array of strings.
   */
  input: string | Array<string>;

  /**
   * The identifier of the model to use. The model must be an embedding model
   * registered with Llama Stack and available via the /models endpoint.
   */
  model: string;

  /**
   * (Optional) The number of dimensions the resulting output embeddings should have.
   * Only supported in text-embedding-3 and later models.
   */
  dimensions?: number;

  /**
   * (Optional) The format to return the embeddings in. Can be either "float" or
   * "base64". Defaults to "float".
   */
  encoding_format?: string;

  /**
   * (Optional) A unique identifier representing your end-user, which can help OpenAI
   * to monitor and detect abuse.
   */
  user?: string;
}

export declare namespace Embeddings {
  export {
    type CreateEmbeddingsResponse as CreateEmbeddingsResponse,
    type EmbeddingCreateParams as EmbeddingCreateParams,
  };
}
