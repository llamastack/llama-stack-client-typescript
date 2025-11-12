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
import * as FilesAPI from './files';
import { VectorStoreFilesOpenAICursorPage } from './files';
import { type OpenAICursorPageParams } from '../../pagination';

export class FileBatches extends APIResource {
  /**
   * Create a vector store file batch. Generate an OpenAI-compatible vector store
   * file batch for the given vector store.
   */
  create(
    vectorStoreId: string,
    body: FileBatchCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStoreFileBatches> {
    return this._client.post(`/v1/vector_stores/${vectorStoreId}/file_batches`, { body, ...options });
  }

  /**
   * Retrieve a vector store file batch.
   */
  retrieve(
    vectorStoreId: string,
    batchId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStoreFileBatches> {
    return this._client.get(`/v1/vector_stores/${vectorStoreId}/file_batches/${batchId}`, options);
  }

  /**
   * Cancels a vector store file batch.
   */
  cancel(
    vectorStoreId: string,
    batchId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStoreFileBatches> {
    return this._client.post(`/v1/vector_stores/${vectorStoreId}/file_batches/${batchId}/cancel`, options);
  }

  /**
   * Returns a list of vector store files in a batch.
   */
  listFiles(
    vectorStoreId: string,
    batchId: string,
    query?: FileBatchListFilesParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<VectorStoreFilesOpenAICursorPage, FilesAPI.VectorStoreFile>;
  listFiles(
    vectorStoreId: string,
    batchId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<VectorStoreFilesOpenAICursorPage, FilesAPI.VectorStoreFile>;
  listFiles(
    vectorStoreId: string,
    batchId: string,
    query: FileBatchListFilesParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<VectorStoreFilesOpenAICursorPage, FilesAPI.VectorStoreFile> {
    if (isRequestOptions(query)) {
      return this.listFiles(vectorStoreId, batchId, {}, query);
    }
    return this._client.getAPIList(
      `/v1/vector_stores/${vectorStoreId}/file_batches/${batchId}/files`,
      VectorStoreFilesOpenAICursorPage,
      { query, ...options },
    );
  }
}

/**
 * Response from listing files in a vector store file batch.
 */
export interface ListVectorStoreFilesInBatchResponse {
  /**
   * List of vector store file objects in the batch
   */
  data: Array<FilesAPI.VectorStoreFile>;

  /**
   * Whether there are more files available beyond this page
   */
  has_more: boolean;

  /**
   * Object type identifier, always "list"
   */
  object: string;

  /**
   * (Optional) ID of the first file in the list for pagination
   */
  first_id?: string;

  /**
   * (Optional) ID of the last file in the list for pagination
   */
  last_id?: string;
}

/**
 * OpenAI Vector Store File Batch object.
 */
export interface VectorStoreFileBatches {
  /**
   * Unique identifier for the file batch
   */
  id: string;

  /**
   * Timestamp when the file batch was created
   */
  created_at: number;

  /**
   * File processing status counts for the batch
   */
  file_counts: VectorStoreFileBatches.FileCounts;

  /**
   * Object type identifier, always "vector_store.file_batch"
   */
  object: string;

  /**
   * Current processing status of the file batch
   */
  status: 'completed' | 'in_progress' | 'cancelled' | 'failed';

  /**
   * ID of the vector store containing the file batch
   */
  vector_store_id: string;
}

export namespace VectorStoreFileBatches {
  /**
   * File processing status counts for the batch
   */
  export interface FileCounts {
    /**
     * Number of files that had their processing cancelled
     */
    cancelled: number;

    /**
     * Number of files that have been successfully processed
     */
    completed: number;

    /**
     * Number of files that failed to process
     */
    failed: number;

    /**
     * Number of files currently being processed
     */
    in_progress: number;

    /**
     * Total number of files in the vector store
     */
    total: number;
  }
}

export interface FileBatchCreateParams {
  /**
   * A list of File IDs that the vector store should use
   */
  file_ids: Array<string>;

  /**
   * (Optional) Key-value attributes to store with the files
   */
  attributes?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * (Optional) The chunking strategy used to chunk the file(s). Defaults to auto
   */
  chunking_strategy?:
    | FileBatchCreateParams.VectorStoreChunkingStrategyAuto
    | FileBatchCreateParams.VectorStoreChunkingStrategyStatic;
}

export namespace FileBatchCreateParams {
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

export interface FileBatchListFilesParams extends OpenAICursorPageParams {
  /**
   * A cursor for use in pagination. `before` is an object ID that defines your place
   * in the list.
   */
  before?: string;

  /**
   * Filter by file status. One of in_progress, completed, failed, cancelled.
   */
  filter?: string;

  /**
   * Sort order by the `created_at` timestamp of the objects. `asc` for ascending
   * order and `desc` for descending order.
   */
  order?: string;
}

export declare namespace FileBatches {
  export {
    type ListVectorStoreFilesInBatchResponse as ListVectorStoreFilesInBatchResponse,
    type VectorStoreFileBatches as VectorStoreFileBatches,
    type FileBatchCreateParams as FileBatchCreateParams,
    type FileBatchListFilesParams as FileBatchListFilesParams,
  };
}

export { VectorStoreFilesOpenAICursorPage };
