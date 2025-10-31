// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class VectorIo extends APIResource {
  /**
   * Insert chunks into a vector database.
   */
  insert(body: VectorIoInsertParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/vector-io/insert', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Query chunks from a vector database.
   */
  query(body: VectorIoQueryParams, options?: Core.RequestOptions): Core.APIPromise<QueryChunksResponse> {
    return this._client.post('/v1/vector-io/query', { body, ...options });
  }
}

/**
 * Response from querying chunks in a vector database.
 */
export interface QueryChunksResponse {
  /**
   * List of content chunks returned from the query
   */
  chunks: Array<QueryChunksResponse.Chunk>;

  /**
   * Relevance scores corresponding to each returned chunk
   */
  scores: Array<number>;
}

export namespace QueryChunksResponse {
  /**
   * A chunk of content that can be inserted into a vector database.
   */
  export interface Chunk {
    /**
     * The content of the chunk, which can be interleaved text, images, or other types.
     */
    content: Shared.InterleavedContent;

    /**
     * Metadata associated with the chunk that will be used in the model context during
     * inference.
     */
    metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

    /**
     * Metadata for the chunk that will NOT be used in the context during inference.
     * The `chunk_metadata` is required backend functionality.
     */
    chunk_metadata?: Chunk.ChunkMetadata;

    /**
     * Optional embedding for the chunk. If not provided, it will be computed later.
     */
    embedding?: Array<number>;

    /**
     * The chunk ID that is stored in the vector database. Used for backend
     * functionality.
     */
    stored_chunk_id?: string;
  }

  export namespace Chunk {
    /**
     * Metadata for the chunk that will NOT be used in the context during inference.
     * The `chunk_metadata` is required backend functionality.
     */
    export interface ChunkMetadata {
      /**
       * The dimension of the embedding vector for the chunk.
       */
      chunk_embedding_dimension?: number;

      /**
       * The embedding model used to create the chunk's embedding.
       */
      chunk_embedding_model?: string;

      /**
       * The ID of the chunk. If not set, it will be generated based on the document ID
       * and content.
       */
      chunk_id?: string;

      /**
       * The tokenizer used to create the chunk. Default is Tiktoken.
       */
      chunk_tokenizer?: string;

      /**
       * The window of the chunk, which can be used to group related chunks together.
       */
      chunk_window?: string;

      /**
       * The number of tokens in the content of the chunk.
       */
      content_token_count?: number;

      /**
       * An optional timestamp indicating when the chunk was created.
       */
      created_timestamp?: number;

      /**
       * The ID of the document this chunk belongs to.
       */
      document_id?: string;

      /**
       * The number of tokens in the metadata of the chunk.
       */
      metadata_token_count?: number;

      /**
       * The source of the content, such as a URL, file path, or other identifier.
       */
      source?: string;

      /**
       * An optional timestamp indicating when the chunk was last updated.
       */
      updated_timestamp?: number;
    }
  }
}

export interface VectorIoInsertParams {
  /**
   * The chunks to insert. Each `Chunk` should contain content which can be
   * interleaved text, images, or other types. `metadata`: `dict[str, Any]` and
   * `embedding`: `List[float]` are optional. If `metadata` is provided, you
   * configure how Llama Stack formats the chunk during generation. If `embedding` is
   * not provided, it will be computed later.
   */
  chunks: Array<VectorIoInsertParams.Chunk>;

  /**
   * The identifier of the vector database to insert the chunks into.
   */
  vector_store_id: string;

  /**
   * The time to live of the chunks.
   */
  ttl_seconds?: number;
}

export namespace VectorIoInsertParams {
  /**
   * A chunk of content that can be inserted into a vector database.
   */
  export interface Chunk {
    /**
     * The content of the chunk, which can be interleaved text, images, or other types.
     */
    content: Shared.InterleavedContent;

    /**
     * Metadata associated with the chunk that will be used in the model context during
     * inference.
     */
    metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

    /**
     * Metadata for the chunk that will NOT be used in the context during inference.
     * The `chunk_metadata` is required backend functionality.
     */
    chunk_metadata?: Chunk.ChunkMetadata;

    /**
     * Optional embedding for the chunk. If not provided, it will be computed later.
     */
    embedding?: Array<number>;

    /**
     * The chunk ID that is stored in the vector database. Used for backend
     * functionality.
     */
    stored_chunk_id?: string;
  }

  export namespace Chunk {
    /**
     * Metadata for the chunk that will NOT be used in the context during inference.
     * The `chunk_metadata` is required backend functionality.
     */
    export interface ChunkMetadata {
      /**
       * The dimension of the embedding vector for the chunk.
       */
      chunk_embedding_dimension?: number;

      /**
       * The embedding model used to create the chunk's embedding.
       */
      chunk_embedding_model?: string;

      /**
       * The ID of the chunk. If not set, it will be generated based on the document ID
       * and content.
       */
      chunk_id?: string;

      /**
       * The tokenizer used to create the chunk. Default is Tiktoken.
       */
      chunk_tokenizer?: string;

      /**
       * The window of the chunk, which can be used to group related chunks together.
       */
      chunk_window?: string;

      /**
       * The number of tokens in the content of the chunk.
       */
      content_token_count?: number;

      /**
       * An optional timestamp indicating when the chunk was created.
       */
      created_timestamp?: number;

      /**
       * The ID of the document this chunk belongs to.
       */
      document_id?: string;

      /**
       * The number of tokens in the metadata of the chunk.
       */
      metadata_token_count?: number;

      /**
       * The source of the content, such as a URL, file path, or other identifier.
       */
      source?: string;

      /**
       * An optional timestamp indicating when the chunk was last updated.
       */
      updated_timestamp?: number;
    }
  }
}

export interface VectorIoQueryParams {
  /**
   * The query to search for.
   */
  query: Shared.InterleavedContent;

  /**
   * The identifier of the vector database to query.
   */
  vector_store_id: string;

  /**
   * The parameters of the query.
   */
  params?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };
}

export declare namespace VectorIo {
  export {
    type QueryChunksResponse as QueryChunksResponse,
    type VectorIoInsertParams as VectorIoInsertParams,
    type VectorIoQueryParams as VectorIoQueryParams,
  };
}
