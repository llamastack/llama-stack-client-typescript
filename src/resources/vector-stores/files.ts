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
  id: string;

  /**
   * Automatic chunking strategy for vector store files.
   */
  chunking_strategy:
    | VectorStoreFile.VectorStoreChunkingStrategyAuto
    | VectorStoreFile.VectorStoreChunkingStrategyStatic;

  created_at: number;

  status: 'completed' | 'in_progress' | 'cancelled' | 'failed';

  vector_store_id: string;

  attributes?: { [key: string]: unknown };

  /**
   * Error information for failed vector store file processing.
   */
  last_error?: VectorStoreFile.LastError | null;

  object?: string;

  usage_bytes?: number;
}

export namespace VectorStoreFile {
  /**
   * Automatic chunking strategy for vector store files.
   */
  export interface VectorStoreChunkingStrategyAuto {
    type?: 'auto';
  }

  /**
   * Static chunking strategy with configurable parameters.
   */
  export interface VectorStoreChunkingStrategyStatic {
    /**
     * Configuration for static chunking strategy.
     */
    static: VectorStoreChunkingStrategyStatic.Static;

    type?: 'static';
  }

  export namespace VectorStoreChunkingStrategyStatic {
    /**
     * Configuration for static chunking strategy.
     */
    export interface Static {
      chunk_overlap_tokens?: number;

      max_chunk_size_tokens?: number;
    }
  }

  /**
   * Error information for failed vector store file processing.
   */
  export interface LastError {
    code: 'server_error' | 'rate_limit_exceeded';

    message: string;
  }
}

/**
 * Response from deleting a vector store file.
 */
export interface FileDeleteResponse {
  id: string;

  deleted?: boolean;

  object?: string;
}

/**
 * Represents the parsed content of a vector store file.
 */
export interface FileContentResponse {
  data: Array<FileContentResponse.Data>;

  has_more?: boolean;

  next_page?: string | null;

  object?: 'vector_store.file_content.page';
}

export namespace FileContentResponse {
  /**
   * Content item from a vector store file or search result.
   */
  export interface Data {
    text: string;

    type: 'text';

    /**
     * `ChunkMetadata` is backend metadata for a `Chunk` that is used to store
     * additional information about the chunk that will not be used in the context
     * during inference, but is required for backend functionality. The `ChunkMetadata`
     * is set during chunk creation in `MemoryToolRuntimeImpl().insert()`and is not
     * expected to change after. Use `Chunk.metadata` for metadata that will be used in
     * the context during inference.
     */
    chunk_metadata?: Data.ChunkMetadata | null;

    embedding?: Array<number> | null;

    metadata?: { [key: string]: unknown } | null;
  }

  export namespace Data {
    /**
     * `ChunkMetadata` is backend metadata for a `Chunk` that is used to store
     * additional information about the chunk that will not be used in the context
     * during inference, but is required for backend functionality. The `ChunkMetadata`
     * is set during chunk creation in `MemoryToolRuntimeImpl().insert()`and is not
     * expected to change after. Use `Chunk.metadata` for metadata that will be used in
     * the context during inference.
     */
    export interface ChunkMetadata {
      chunk_embedding_dimension?: number | null;

      chunk_embedding_model?: string | null;

      chunk_id?: string | null;

      chunk_tokenizer?: string | null;

      chunk_window?: string | null;

      content_token_count?: number | null;

      created_timestamp?: number | null;

      document_id?: string | null;

      metadata_token_count?: number | null;

      source?: string | null;

      updated_timestamp?: number | null;
    }
  }
}

export interface FileCreateParams {
  file_id: string;

  attributes?: { [key: string]: unknown } | null;

  /**
   * Automatic chunking strategy for vector store files.
   */
  chunking_strategy?:
    | FileCreateParams.VectorStoreChunkingStrategyAuto
    | FileCreateParams.VectorStoreChunkingStrategyStatic
    | null;
}

export namespace FileCreateParams {
  /**
   * Automatic chunking strategy for vector store files.
   */
  export interface VectorStoreChunkingStrategyAuto {
    type?: 'auto';
  }

  /**
   * Static chunking strategy with configurable parameters.
   */
  export interface VectorStoreChunkingStrategyStatic {
    /**
     * Configuration for static chunking strategy.
     */
    static: VectorStoreChunkingStrategyStatic.Static;

    type?: 'static';
  }

  export namespace VectorStoreChunkingStrategyStatic {
    /**
     * Configuration for static chunking strategy.
     */
    export interface Static {
      chunk_overlap_tokens?: number;

      max_chunk_size_tokens?: number;
    }
  }
}

export interface FileUpdateParams {
  attributes: { [key: string]: unknown };
}

export interface FileListParams extends OpenAICursorPageParams {
  before?: string | null;

  filter?: 'completed' | 'in_progress' | 'cancelled' | 'failed' | null;

  order?: string | null;
}

export interface FileContentParams {
  include_embeddings?: boolean | null;

  include_metadata?: boolean | null;
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
