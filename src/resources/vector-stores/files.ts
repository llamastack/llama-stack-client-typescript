// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import { OpenAICursorPage, type OpenAICursorPageParams } from '../../pagination';

export class Files extends APIResource {
  /**
   * Attach a file to a vector store.
   */
  create(
    vectorStoreId: string,
    body: FileCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStoreFile> {
    return this._client.post(`/v1/vector_stores/${vectorStoreId}/files`, { body, ...options });
  }

  /**
   * Retrieves a vector store file.
   */
  retrieve(
    vectorStoreId: string,
    fileId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStoreFile> {
    return this._client.get(`/v1/vector_stores/${vectorStoreId}/files/${fileId}`, options);
  }

  /**
   * Updates a vector store file.
   */
  update(
    vectorStoreId: string,
    fileId: string,
    body: FileUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStoreFile> {
    return this._client.post(`/v1/vector_stores/${vectorStoreId}/files/${fileId}`, { body, ...options });
  }

  /**
   * List files in a vector store.
   */
  list(
    vectorStoreId: string,
    query?: FileListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<VectorStoreFilesOpenAICursorPage, VectorStoreFile>;
  list(
    vectorStoreId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<VectorStoreFilesOpenAICursorPage, VectorStoreFile>;
  list(
    vectorStoreId: string,
    query: FileListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<VectorStoreFilesOpenAICursorPage, VectorStoreFile> {
    if (isRequestOptions(query)) {
      return this.list(vectorStoreId, {}, query);
    }
    return this._client.getAPIList(
      `/v1/vector_stores/${vectorStoreId}/files`,
      VectorStoreFilesOpenAICursorPage,
      { query, ...options },
    );
  }

  /**
   * Delete a vector store file.
   */
  delete(
    vectorStoreId: string,
    fileId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileDeleteResponse> {
    return this._client.delete(`/v1/vector_stores/${vectorStoreId}/files/${fileId}`, options);
  }

  /**
   * Retrieves the contents of a vector store file.
   */
  content(
    vectorStoreId: string,
    fileId: string,
    query?: FileContentParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileContentResponse>;
  content(
    vectorStoreId: string,
    fileId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileContentResponse>;
  content(
    vectorStoreId: string,
    fileId: string,
    query: FileContentParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileContentResponse> {
    if (isRequestOptions(query)) {
      return this.content(vectorStoreId, fileId, {}, query);
    }
    return this._client.get(`/v1/vector_stores/${vectorStoreId}/files/${fileId}/content`, {
      query,
      ...options,
    });
  }
}

export class VectorStoreFilesOpenAICursorPage extends OpenAICursorPage<VectorStoreFile> {}

/**
 * OpenAI Vector Store File object.
 */
export interface VectorStoreFile {
  /**
   * Unique identifier for the file
   */
  id: string;

  /**
   * Key-value attributes associated with the file
   */
  attributes: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * Strategy used for splitting the file into chunks
   */
  chunking_strategy:
    | VectorStoreFile.VectorStoreChunkingStrategyAuto
    | VectorStoreFile.VectorStoreChunkingStrategyStatic;

  /**
   * Timestamp when the file was added to the vector store
   */
  created_at: number;

  /**
   * Object type identifier, always "vector_store.file"
   */
  object: string;

  /**
   * Current processing status of the file
   */
  status: 'completed' | 'in_progress' | 'cancelled' | 'failed';

  /**
   * Storage space used by this file in bytes
   */
  usage_bytes: number;

  /**
   * ID of the vector store containing this file
   */
  vector_store_id: string;

  /**
   * (Optional) Error information if file processing failed
   */
  last_error?: VectorStoreFile.LastError;
}

export namespace VectorStoreFile {
  /**
   * Automatic chunking strategy for vector store files.
   */
  export interface VectorStoreChunkingStrategyAuto {
    /**
     * Strategy type, always "auto" for automatic chunking
     */
    type: 'auto';
  }

  /**
   * Static chunking strategy with configurable parameters.
   */
  export interface VectorStoreChunkingStrategyStatic {
    /**
     * Configuration parameters for the static chunking strategy
     */
    static: VectorStoreChunkingStrategyStatic.Static;

    /**
     * Strategy type, always "static" for static chunking
     */
    type: 'static';
  }

  export namespace VectorStoreChunkingStrategyStatic {
    /**
     * Configuration parameters for the static chunking strategy
     */
    export interface Static {
      /**
       * Number of tokens to overlap between adjacent chunks
       */
      chunk_overlap_tokens: number;

      /**
       * Maximum number of tokens per chunk, must be between 100 and 4096
       */
      max_chunk_size_tokens: number;
    }
  }

  /**
   * (Optional) Error information if file processing failed
   */
  export interface LastError {
    /**
     * Error code indicating the type of failure
     */
    code: 'server_error' | 'rate_limit_exceeded';

    /**
     * Human-readable error message describing the failure
     */
    message: string;
  }
}

/**
 * Response from deleting a vector store file.
 */
export interface FileDeleteResponse {
  /**
   * Unique identifier of the deleted file
   */
  id: string;

  /**
   * Whether the deletion operation was successful
   */
  deleted: boolean;

  /**
   * Object type identifier for the deletion response
   */
  object: string;
}

/**
 * Represents the parsed content of a vector store file.
 */
export interface FileContentResponse {
  /**
   * Parsed content of the file
   */
  data: Array<FileContentResponse.Data>;

  /**
   * Indicates if there are more content pages to fetch
   */
  has_more: boolean;

  /**
   * The object type, which is always `vector_store.file_content.page`
   */
  object: 'vector_store.file_content.page';

  /**
   * The token for the next page, if any
   */
  next_page?: string;
}

export namespace FileContentResponse {
  /**
   * Content item from a vector store file or search result.
   */
  export interface Data {
    /**
     * The actual text content
     */
    text: string;

    /**
     * Content type, currently only "text" is supported
     */
    type: 'text';

    /**
     * Optional chunk metadata
     */
    chunk_metadata?: Data.ChunkMetadata;

    /**
     * Optional embedding vector for this content chunk
     */
    embedding?: Array<number>;

    /**
     * Optional user-defined metadata
     */
    metadata?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };
  }

  export namespace Data {
    /**
     * Optional chunk metadata
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

export interface FileCreateParams {
  /**
   * The ID of the file to attach to the vector store.
   */
  file_id: string;

  /**
   * The key-value attributes stored with the file, which can be used for filtering.
   */
  attributes?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * The chunking strategy to use for the file.
   */
  chunking_strategy?:
    | FileCreateParams.VectorStoreChunkingStrategyAuto
    | FileCreateParams.VectorStoreChunkingStrategyStatic;
}

export namespace FileCreateParams {
  /**
   * Automatic chunking strategy for vector store files.
   */
  export interface VectorStoreChunkingStrategyAuto {
    /**
     * Strategy type, always "auto" for automatic chunking
     */
    type: 'auto';
  }

  /**
   * Static chunking strategy with configurable parameters.
   */
  export interface VectorStoreChunkingStrategyStatic {
    /**
     * Configuration parameters for the static chunking strategy
     */
    static: VectorStoreChunkingStrategyStatic.Static;

    /**
     * Strategy type, always "static" for static chunking
     */
    type: 'static';
  }

  export namespace VectorStoreChunkingStrategyStatic {
    /**
     * Configuration parameters for the static chunking strategy
     */
    export interface Static {
      /**
       * Number of tokens to overlap between adjacent chunks
       */
      chunk_overlap_tokens: number;

      /**
       * Maximum number of tokens per chunk, must be between 100 and 4096
       */
      max_chunk_size_tokens: number;
    }
  }
}

export interface FileUpdateParams {
  /**
   * The updated key-value attributes to store with the file.
   */
  attributes: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };
}

export interface FileListParams extends OpenAICursorPageParams {
  /**
   * (Optional) A cursor for use in pagination. `before` is an object ID that defines
   * your place in the list.
   */
  before?: string;

  /**
   * (Optional) Filter by file status to only return files with the specified status.
   */
  filter?: 'completed' | 'in_progress' | 'cancelled' | 'failed';

  /**
   * (Optional) Sort order by the `created_at` timestamp of the objects. `asc` for
   * ascending order and `desc` for descending order.
   */
  order?: string;
}

export interface FileContentParams {
  /**
   * Whether to include embedding vectors in the response.
   */
  include_embeddings?: boolean;

  /**
   * Whether to include chunk metadata in the response.
   */
  include_metadata?: boolean;
}

Files.VectorStoreFilesOpenAICursorPage = VectorStoreFilesOpenAICursorPage;

export declare namespace Files {
  export {
    type VectorStoreFile as VectorStoreFile,
    type FileDeleteResponse as FileDeleteResponse,
    type FileContentResponse as FileContentResponse,
    VectorStoreFilesOpenAICursorPage as VectorStoreFilesOpenAICursorPage,
    type FileCreateParams as FileCreateParams,
    type FileUpdateParams as FileUpdateParams,
    type FileListParams as FileListParams,
    type FileContentParams as FileContentParams,
  };
}
