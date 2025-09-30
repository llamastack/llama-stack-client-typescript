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

Files.VectorStoreFilesOpenAICursorPage = VectorStoreFilesOpenAICursorPage;

export declare namespace Files {
  export {
    type VectorStoreFile as VectorStoreFile,
    type FileDeleteResponse as FileDeleteResponse,
    VectorStoreFilesOpenAICursorPage as VectorStoreFilesOpenAICursorPage,
    type FileCreateParams as FileCreateParams,
    type FileUpdateParams as FileUpdateParams,
    type FileListParams as FileListParams,
  };
}
