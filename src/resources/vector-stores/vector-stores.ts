// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as FilesAPI from './files';
import {
  FileContentResponse,
  FileCreateParams,
  FileDeleteResponse,
  FileListParams,
  FileUpdateParams,
  Files,
  VectorStoreFile,
  VectorStoreFilesOpenAICursorPage,
} from './files';
import { OpenAICursorPage, type OpenAICursorPageParams } from '../../pagination';

export class VectorStores extends APIResource {
  files: FilesAPI.Files = new FilesAPI.Files(this._client);

  /**
   * Creates a vector store.
   */
  create(body: VectorStoreCreateParams, options?: Core.RequestOptions): Core.APIPromise<VectorStore> {
    return this._client.post('/v1/openai/v1/vector_stores', { body, ...options });
  }

  /**
   * Retrieves a vector store.
   */
  retrieve(vectorStoreId: string, options?: Core.RequestOptions): Core.APIPromise<VectorStore> {
    return this._client.get(`/v1/openai/v1/vector_stores/${vectorStoreId}`, options);
  }

  /**
   * Updates a vector store.
   */
  update(
    vectorStoreId: string,
    body: VectorStoreUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStore> {
    return this._client.post(`/v1/openai/v1/vector_stores/${vectorStoreId}`, { body, ...options });
  }

  /**
   * Returns a list of vector stores.
   */
  list(
    query?: VectorStoreListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<VectorStoresOpenAICursorPage, VectorStore>;
  list(options?: Core.RequestOptions): Core.PagePromise<VectorStoresOpenAICursorPage, VectorStore>;
  list(
    query: VectorStoreListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<VectorStoresOpenAICursorPage, VectorStore> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/openai/v1/vector_stores', VectorStoresOpenAICursorPage, {
      query,
      ...options,
    });
  }

  /**
   * Delete a vector store.
   */
  delete(vectorStoreId: string, options?: Core.RequestOptions): Core.APIPromise<VectorStoreDeleteResponse> {
    return this._client.delete(`/v1/openai/v1/vector_stores/${vectorStoreId}`, options);
  }

  /**
   * Search for chunks in a vector store. Searches a vector store for relevant chunks
   * based on a query and optional file attribute filters.
   */
  search(
    vectorStoreId: string,
    body: VectorStoreSearchParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStoreSearchResponse> {
    return this._client.post(`/v1/openai/v1/vector_stores/${vectorStoreId}/search`, { body, ...options });
  }
}

export class VectorStoresOpenAICursorPage extends OpenAICursorPage<VectorStore> {}

/**
 * Response from listing vector stores.
 */
export interface ListVectorStoresResponse {
  /**
   * List of vector store objects
   */
  data: Array<VectorStore>;

  /**
   * Whether there are more vector stores available beyond this page
   */
  has_more: boolean;

  /**
   * Object type identifier, always "list"
   */
  object: string;

  /**
   * (Optional) ID of the first vector store in the list for pagination
   */
  first_id?: string;

  /**
   * (Optional) ID of the last vector store in the list for pagination
   */
  last_id?: string;
}

/**
 * OpenAI Vector Store object.
 */
export interface VectorStore {
  /**
   * Unique identifier for the vector store
   */
  id: string;

  /**
   * Timestamp when the vector store was created
   */
  created_at: number;

  /**
   * File processing status counts for the vector store
   */
  file_counts: VectorStore.FileCounts;

  /**
   * Set of key-value pairs that can be attached to the vector store
   */
  metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * Object type identifier, always "vector_store"
   */
  object: string;

  /**
   * Current status of the vector store
   */
  status: string;

  /**
   * Storage space used by the vector store in bytes
   */
  usage_bytes: number;

  /**
   * (Optional) Expiration policy for the vector store
   */
  expires_after?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * (Optional) Timestamp when the vector store will expire
   */
  expires_at?: number;

  /**
   * (Optional) Timestamp of last activity on the vector store
   */
  last_active_at?: number;

  /**
   * (Optional) Name of the vector store
   */
  name?: string;
}

export namespace VectorStore {
  /**
   * File processing status counts for the vector store
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

/**
 * Response from deleting a vector store.
 */
export interface VectorStoreDeleteResponse {
  /**
   * Unique identifier of the deleted vector store
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
 * Paginated response from searching a vector store.
 */
export interface VectorStoreSearchResponse {
  /**
   * List of search result objects
   */
  data: Array<VectorStoreSearchResponse.Data>;

  /**
   * Whether there are more results available beyond this page
   */
  has_more: boolean;

  /**
   * Object type identifier for the search results page
   */
  object: string;

  /**
   * The original search query that was executed
   */
  search_query: string;

  /**
   * (Optional) Token for retrieving the next page of results
   */
  next_page?: string;
}

export namespace VectorStoreSearchResponse {
  /**
   * Response from searching a vector store.
   */
  export interface Data {
    /**
     * List of content items matching the search query
     */
    content: Array<Data.Content>;

    /**
     * Unique identifier of the file containing the result
     */
    file_id: string;

    /**
     * Name of the file containing the result
     */
    filename: string;

    /**
     * Relevance score for this search result
     */
    score: number;

    /**
     * (Optional) Key-value attributes associated with the file
     */
    attributes?: { [key: string]: string | number | boolean };
  }

  export namespace Data {
    /**
     * Content item from a vector store file or search result.
     */
    export interface Content {
      /**
       * The actual text content
       */
      text: string;

      /**
       * Content type, currently only "text" is supported
       */
      type: 'text';
    }
  }
}

export interface VectorStoreCreateParams {
  /**
   * The chunking strategy used to chunk the file(s). If not set, will use the `auto`
   * strategy.
   */
  chunking_strategy?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * The dimension of the embedding vectors (default: 384).
   */
  embedding_dimension?: number;

  /**
   * The embedding model to use for this vector store.
   */
  embedding_model?: string;

  /**
   * The expiration policy for a vector store.
   */
  expires_after?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * A list of File IDs that the vector store should use. Useful for tools like
   * `file_search` that can access files.
   */
  file_ids?: Array<string>;

  /**
   * Set of 16 key-value pairs that can be attached to an object.
   */
  metadata?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * A name for the vector store.
   */
  name?: string;

  /**
   * The ID of the provider to use for this vector store.
   */
  provider_id?: string;
}

export interface VectorStoreUpdateParams {
  /**
   * The expiration policy for a vector store.
   */
  expires_after?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * Set of 16 key-value pairs that can be attached to an object.
   */
  metadata?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * The name of the vector store.
   */
  name?: string;
}

export interface VectorStoreListParams extends OpenAICursorPageParams {
  /**
   * A cursor for use in pagination. `before` is an object ID that defines your place
   * in the list.
   */
  before?: string;

  /**
   * Sort order by the `created_at` timestamp of the objects. `asc` for ascending
   * order and `desc` for descending order.
   */
  order?: string;
}

export interface VectorStoreSearchParams {
  /**
   * The query string or array for performing the search.
   */
  query: string | Array<string>;

  /**
   * Filters based on file attributes to narrow the search results.
   */
  filters?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * Maximum number of results to return (1 to 50 inclusive, default 10).
   */
  max_num_results?: number;

  /**
   * Ranking options for fine-tuning the search results.
   */
  ranking_options?: VectorStoreSearchParams.RankingOptions;

  /**
   * Whether to rewrite the natural language query for vector search (default false)
   */
  rewrite_query?: boolean;

  /**
   * The search mode to use - "keyword", "vector", or "hybrid" (default "vector")
   */
  search_mode?: string;
}

export namespace VectorStoreSearchParams {
  /**
   * Ranking options for fine-tuning the search results.
   */
  export interface RankingOptions {
    /**
     * (Optional) Name of the ranking algorithm to use
     */
    ranker?: string;

    /**
     * (Optional) Minimum relevance score threshold for results
     */
    score_threshold?: number;
  }
}

VectorStores.VectorStoresOpenAICursorPage = VectorStoresOpenAICursorPage;
VectorStores.Files = Files;
VectorStores.VectorStoreFilesOpenAICursorPage = VectorStoreFilesOpenAICursorPage;

export declare namespace VectorStores {
  export {
    type ListVectorStoresResponse as ListVectorStoresResponse,
    type VectorStore as VectorStore,
    type VectorStoreDeleteResponse as VectorStoreDeleteResponse,
    type VectorStoreSearchResponse as VectorStoreSearchResponse,
    VectorStoresOpenAICursorPage as VectorStoresOpenAICursorPage,
    type VectorStoreCreateParams as VectorStoreCreateParams,
    type VectorStoreUpdateParams as VectorStoreUpdateParams,
    type VectorStoreListParams as VectorStoreListParams,
    type VectorStoreSearchParams as VectorStoreSearchParams,
  };

  export {
    Files as Files,
    type VectorStoreFile as VectorStoreFile,
    type FileDeleteResponse as FileDeleteResponse,
    type FileContentResponse as FileContentResponse,
    VectorStoreFilesOpenAICursorPage as VectorStoreFilesOpenAICursorPage,
    type FileCreateParams as FileCreateParams,
    type FileUpdateParams as FileUpdateParams,
    type FileListParams as FileListParams,
  };
}
