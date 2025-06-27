// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';

export class Files extends APIResource {
  /**
   * Attach a file to a vector store.
   */
  create(
    vectorStoreId: string,
    body: FileCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStoreFile> {
    return this._client.post(`/v1/openai/v1/vector_stores/${vectorStoreId}/files`, { body, ...options });
  }

  /**
   * Retrieves a vector store file.
   */
  retrieve(
    vectorStoreId: string,
    fileId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStoreFile> {
    return this._client.get(`/v1/openai/v1/vector_stores/${vectorStoreId}/files/${fileId}`, options);
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
    return this._client.post(`/v1/openai/v1/vector_stores/${vectorStoreId}/files/${fileId}`, {
      body,
      ...options,
    });
  }

  /**
   * List files in a vector store.
   */
  list(
    vectorStoreId: string,
    query?: FileListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileListResponse>;
  list(vectorStoreId: string, options?: Core.RequestOptions): Core.APIPromise<FileListResponse>;
  list(
    vectorStoreId: string,
    query: FileListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileListResponse> {
    if (isRequestOptions(query)) {
      return this.list(vectorStoreId, {}, query);
    }
    return this._client.get(`/v1/openai/v1/vector_stores/${vectorStoreId}/files`, { query, ...options });
  }

  /**
   * Delete a vector store file.
   */
  delete(
    vectorStoreId: string,
    fileId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileDeleteResponse> {
    return this._client.delete(`/v1/openai/v1/vector_stores/${vectorStoreId}/files/${fileId}`, options);
  }

  /**
   * Retrieves the contents of a vector store file.
   */
  content(
    vectorStoreId: string,
    fileId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<FileContentResponse> {
    return this._client.get(`/v1/openai/v1/vector_stores/${vectorStoreId}/files/${fileId}/content`, options);
  }
}

/**
 * OpenAI Vector Store File object.
 */
export interface VectorStoreFile {
  id: string;

  attributes: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  chunking_strategy:
    | VectorStoreFile.VectorStoreChunkingStrategyAuto
    | VectorStoreFile.VectorStoreChunkingStrategyStatic;

  created_at: number;

  object: string;

  status: 'completed' | 'in_progress' | 'cancelled' | 'failed';

  usage_bytes: number;

  vector_store_id: string;

  last_error?: VectorStoreFile.LastError;
}

export namespace VectorStoreFile {
  export interface VectorStoreChunkingStrategyAuto {
    type: 'auto';
  }

  export interface VectorStoreChunkingStrategyStatic {
    static: VectorStoreChunkingStrategyStatic.Static;

    type: 'static';
  }

  export namespace VectorStoreChunkingStrategyStatic {
    export interface Static {
      chunk_overlap_tokens: number;

      max_chunk_size_tokens: number;
    }
  }

  export interface LastError {
    code: 'server_error' | 'rate_limit_exceeded';

    message: string;
  }
}

/**
 * Response from listing vector stores.
 */
export interface FileListResponse {
  data: Array<VectorStoreFile>;

  has_more: boolean;

  object: string;

  first_id?: string;

  last_id?: string;
}

/**
 * Response from deleting a vector store file.
 */
export interface FileDeleteResponse {
  id: string;

  deleted: boolean;

  object: string;
}

/**
 * Response from retrieving the contents of a vector store file.
 */
export interface FileContentResponse {
  attributes: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  content: Array<FileContentResponse.Content>;

  file_id: string;

  filename: string;
}

export namespace FileContentResponse {
  export interface Content {
    text: string;

    type: 'text';
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
  export interface VectorStoreChunkingStrategyAuto {
    type: 'auto';
  }

  export interface VectorStoreChunkingStrategyStatic {
    static: VectorStoreChunkingStrategyStatic.Static;

    type: 'static';
  }

  export namespace VectorStoreChunkingStrategyStatic {
    export interface Static {
      chunk_overlap_tokens: number;

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

export interface FileListParams {
  after?: string;

  before?: string;

  filter?: 'completed' | 'in_progress' | 'cancelled' | 'failed';

  limit?: number;

  order?: string;
}

export declare namespace Files {
  export {
    type VectorStoreFile as VectorStoreFile,
    type FileListResponse as FileListResponse,
    type FileDeleteResponse as FileDeleteResponse,
    type FileContentResponse as FileContentResponse,
    type FileCreateParams as FileCreateParams,
    type FileUpdateParams as FileUpdateParams,
    type FileListParams as FileListParams,
  };
}
