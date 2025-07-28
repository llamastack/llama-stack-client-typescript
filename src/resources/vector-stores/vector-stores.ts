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
  FileListResponse,
  FileUpdateParams,
  Files,
  VectorStoreFile,
} from './files';

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
  ): Core.APIPromise<ListVectorStoresResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<ListVectorStoresResponse>;
  list(
    query: VectorStoreListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ListVectorStoresResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/v1/openai/v1/vector_stores', { query, ...options });
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

/**
 * Response from listing vector stores.
 */
export interface ListVectorStoresResponse {
  data: Array<VectorStore>;

  has_more: boolean;

  object: string;

  first_id?: string;

  last_id?: string;
}

/**
 * OpenAI Vector Store object.
 */
export interface VectorStore {
  id: string;

  created_at: number;

  file_counts: VectorStore.FileCounts;

  metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  object: string;

  status: string;

  usage_bytes: number;

  expires_after?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  expires_at?: number;

  last_active_at?: number;

  name?: string;
}

export namespace VectorStore {
  export interface FileCounts {
    cancelled: number;

    completed: number;

    failed: number;

    in_progress: number;

    total: number;
  }
}

/**
 * Response from deleting a vector store.
 */
export interface VectorStoreDeleteResponse {
  id: string;

  deleted: boolean;

  object: string;
}

/**
 * Response from searching a vector store.
 */
export interface VectorStoreSearchResponse {
  data: Array<VectorStoreSearchResponse.Data>;

  has_more: boolean;

  object: string;

  search_query: string;

  next_page?: string;
}

export namespace VectorStoreSearchResponse {
  /**
   * Response from searching a vector store.
   */
  export interface Data {
    content: Array<Data.Content>;

    file_id: string;

    filename: string;

    score: number;

    attributes?: { [key: string]: string | number | boolean };
  }

  export namespace Data {
    export interface Content {
      text: string;

      type: 'text';
    }
  }
}

export interface VectorStoreCreateParams {
  /**
   * A name for the vector store.
   */
  name: string;

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

export interface VectorStoreListParams {
  /**
   * A cursor for use in pagination. `after` is an object ID that defines your place
   * in the list.
   */
  after?: string;

  /**
   * A cursor for use in pagination. `before` is an object ID that defines your place
   * in the list.
   */
  before?: string;

  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and
   * 100, and the default is 20.
   */
  limit?: number;

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
    ranker?: string;

    score_threshold?: number;
  }
}

VectorStores.Files = Files;

export declare namespace VectorStores {
  export {
    type ListVectorStoresResponse as ListVectorStoresResponse,
    type VectorStore as VectorStore,
    type VectorStoreDeleteResponse as VectorStoreDeleteResponse,
    type VectorStoreSearchResponse as VectorStoreSearchResponse,
    type VectorStoreCreateParams as VectorStoreCreateParams,
    type VectorStoreUpdateParams as VectorStoreUpdateParams,
    type VectorStoreListParams as VectorStoreListParams,
    type VectorStoreSearchParams as VectorStoreSearchParams,
  };

  export {
    Files as Files,
    type VectorStoreFile as VectorStoreFile,
    type FileListResponse as FileListResponse,
    type FileDeleteResponse as FileDeleteResponse,
    type FileContentResponse as FileContentResponse,
    type FileCreateParams as FileCreateParams,
    type FileUpdateParams as FileUpdateParams,
    type FileListParams as FileListParams,
  };
}
