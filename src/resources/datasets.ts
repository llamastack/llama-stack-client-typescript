// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Datasets extends APIResource {
  /**
   * Get a dataset by its ID.
   */
  retrieve(datasetId: string, options?: Core.RequestOptions): Core.APIPromise<DatasetRetrieveResponse> {
    return this._client.get(`/v1/datasets/${datasetId}`, options);
  }

  /**
   * List all datasets.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<DatasetListResponse> {
    return (
      this._client.get('/v1/datasets', options) as Core.APIPromise<{ data: DatasetListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Get a paginated list of rows from a dataset. Uses offset-based pagination where:
   *
   * - start_index: The starting index (0-based). If None, starts from beginning.
   * - limit: Number of items to return. If None or -1, returns all items.
   *
   * The response includes:
   *
   * - data: List of items for the current page.
   * - has_more: Whether there are more items available after this set.
   */
  iterrows(
    datasetId: string,
    query?: DatasetIterrowsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DatasetIterrowsResponse>;
  iterrows(datasetId: string, options?: Core.RequestOptions): Core.APIPromise<DatasetIterrowsResponse>;
  iterrows(
    datasetId: string,
    query: DatasetIterrowsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<DatasetIterrowsResponse> {
    if (isRequestOptions(query)) {
      return this.iterrows(datasetId, {}, query);
    }
    return this._client.get(`/v1/datasetio/iterrows/${datasetId}`, { query, ...options });
  }

  /**
   * Register a new dataset.
   */
  register(
    body: DatasetRegisterParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<DatasetRegisterResponse> {
    return this._client.post('/v1/datasets', { body, ...options });
  }

  /**
   * Unregister a dataset by its ID.
   */
  unregister(datasetId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/datasets/${datasetId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface ListDatasetsResponse {
  data: DatasetListResponse;
}

export interface DatasetRetrieveResponse {
  identifier: string;

  metadata: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  provider_id: string;

  /**
   * Purpose of the dataset. Each purpose has a required input data schema.
   */
  purpose: 'post-training/messages' | 'eval/question-answer' | 'eval/messages-answer';

  /**
   * A dataset that can be obtained from a URI.
   */
  source: DatasetRetrieveResponse.UriDataSource | DatasetRetrieveResponse.RowsDataSource;

  type: 'dataset';

  provider_resource_id?: string;
}

export namespace DatasetRetrieveResponse {
  /**
   * A dataset that can be obtained from a URI.
   */
  export interface UriDataSource {
    type: 'uri';

    /**
     * The dataset can be obtained from a URI. E.g. -
     * "https://mywebsite.com/mydata.jsonl" - "lsfs://mydata.jsonl" -
     * "data:csv;base64,{base64_content}"
     */
    uri: string;
  }

  /**
   * A dataset stored in rows.
   */
  export interface RowsDataSource {
    /**
     * The dataset is stored in rows. E.g. - [ {"messages": [{"role": "user",
     * "content": "Hello, world!"}, {"role": "assistant", "content": "Hello, world!"}]}
     * ]
     */
    rows: Array<Record<string, boolean | number | string | Array<unknown> | unknown | null>>;

    type: 'rows';
  }
}

export type DatasetListResponse = Array<DatasetListResponse.DatasetListResponseItem>;

export namespace DatasetListResponse {
  export interface DatasetListResponseItem {
    identifier: string;

    metadata: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

    provider_id: string;

    /**
     * Purpose of the dataset. Each purpose has a required input data schema.
     */
    purpose: 'post-training/messages' | 'eval/question-answer' | 'eval/messages-answer';

    /**
     * A dataset that can be obtained from a URI.
     */
    source: DatasetListResponseItem.UriDataSource | DatasetListResponseItem.RowsDataSource;

    type: 'dataset';

    provider_resource_id?: string;
  }

  export namespace DatasetListResponseItem {
    /**
     * A dataset that can be obtained from a URI.
     */
    export interface UriDataSource {
      type: 'uri';

      /**
       * The dataset can be obtained from a URI. E.g. -
       * "https://mywebsite.com/mydata.jsonl" - "lsfs://mydata.jsonl" -
       * "data:csv;base64,{base64_content}"
       */
      uri: string;
    }

    /**
     * A dataset stored in rows.
     */
    export interface RowsDataSource {
      /**
       * The dataset is stored in rows. E.g. - [ {"messages": [{"role": "user",
       * "content": "Hello, world!"}, {"role": "assistant", "content": "Hello, world!"}]}
       * ]
       */
      rows: Array<Record<string, boolean | number | string | Array<unknown> | unknown | null>>;

      type: 'rows';
    }
  }
}

/**
 * A generic paginated response that follows a simple format.
 */
export interface DatasetIterrowsResponse {
  /**
   * The list of items for the current page
   */
  data: Array<Record<string, boolean | number | string | Array<unknown> | unknown | null>>;

  /**
   * Whether there are more items available after this set
   */
  has_more: boolean;

  /**
   * The URL for accessing this list
   */
  url?: string;
}

export interface DatasetRegisterResponse {
  identifier: string;

  metadata: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  provider_id: string;

  /**
   * Purpose of the dataset. Each purpose has a required input data schema.
   */
  purpose: 'post-training/messages' | 'eval/question-answer' | 'eval/messages-answer';

  /**
   * A dataset that can be obtained from a URI.
   */
  source: DatasetRegisterResponse.UriDataSource | DatasetRegisterResponse.RowsDataSource;

  type: 'dataset';

  provider_resource_id?: string;
}

export namespace DatasetRegisterResponse {
  /**
   * A dataset that can be obtained from a URI.
   */
  export interface UriDataSource {
    type: 'uri';

    /**
     * The dataset can be obtained from a URI. E.g. -
     * "https://mywebsite.com/mydata.jsonl" - "lsfs://mydata.jsonl" -
     * "data:csv;base64,{base64_content}"
     */
    uri: string;
  }

  /**
   * A dataset stored in rows.
   */
  export interface RowsDataSource {
    /**
     * The dataset is stored in rows. E.g. - [ {"messages": [{"role": "user",
     * "content": "Hello, world!"}, {"role": "assistant", "content": "Hello, world!"}]}
     * ]
     */
    rows: Array<Record<string, boolean | number | string | Array<unknown> | unknown | null>>;

    type: 'rows';
  }
}

export interface DatasetIterrowsParams {
  /**
   * The number of rows to get.
   */
  limit?: number;

  /**
   * Index into dataset for the first row to get. Get all rows if None.
   */
  start_index?: number;
}

export interface DatasetRegisterParams {
  /**
   * The purpose of the dataset. One of: - "post-training/messages": The dataset
   * contains a messages column with list of messages for post-training. {
   * "messages": [ {"role": "user", "content": "Hello, world!"}, {"role":
   * "assistant", "content": "Hello, world!"}, ] } - "eval/question-answer": The
   * dataset contains a question column and an answer column for evaluation. {
   * "question": "What is the capital of France?", "answer": "Paris" } -
   * "eval/messages-answer": The dataset contains a messages column with list of
   * messages and an answer column for evaluation. { "messages": [ {"role": "user",
   * "content": "Hello, my name is John Doe."}, {"role": "assistant", "content":
   * "Hello, John Doe. How can I help you today?"}, {"role": "user", "content":
   * "What's my name?"}, ], "answer": "John Doe" }
   */
  purpose: 'post-training/messages' | 'eval/question-answer' | 'eval/messages-answer';

  /**
   * The data source of the dataset. Ensure that the data source schema is compatible
   * with the purpose of the dataset. Examples: - { "type": "uri", "uri":
   * "https://mywebsite.com/mydata.jsonl" } - { "type": "uri", "uri":
   * "lsfs://mydata.jsonl" } - { "type": "uri", "uri":
   * "data:csv;base64,{base64_content}" } - { "type": "uri", "uri":
   * "huggingface://llamastack/simpleqa?split=train" } - { "type": "rows", "rows": [
   * { "messages": [ {"role": "user", "content": "Hello, world!"}, {"role":
   * "assistant", "content": "Hello, world!"}, ] } ] }
   */
  source: DatasetRegisterParams.UriDataSource | DatasetRegisterParams.RowsDataSource;

  /**
   * The ID of the dataset. If not provided, an ID will be generated.
   */
  dataset_id?: string;

  /**
   * The metadata for the dataset. - E.g. {"description": "My dataset"}.
   */
  metadata?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;
}

export namespace DatasetRegisterParams {
  /**
   * A dataset that can be obtained from a URI.
   */
  export interface UriDataSource {
    type: 'uri';

    /**
     * The dataset can be obtained from a URI. E.g. -
     * "https://mywebsite.com/mydata.jsonl" - "lsfs://mydata.jsonl" -
     * "data:csv;base64,{base64_content}"
     */
    uri: string;
  }

  /**
   * A dataset stored in rows.
   */
  export interface RowsDataSource {
    /**
     * The dataset is stored in rows. E.g. - [ {"messages": [{"role": "user",
     * "content": "Hello, world!"}, {"role": "assistant", "content": "Hello, world!"}]}
     * ]
     */
    rows: Array<Record<string, boolean | number | string | Array<unknown> | unknown | null>>;

    type: 'rows';
  }
}

export declare namespace Datasets {
  export {
    type ListDatasetsResponse as ListDatasetsResponse,
    type DatasetRetrieveResponse as DatasetRetrieveResponse,
    type DatasetListResponse as DatasetListResponse,
    type DatasetIterrowsResponse as DatasetIterrowsResponse,
    type DatasetRegisterResponse as DatasetRegisterResponse,
    type DatasetIterrowsParams as DatasetIterrowsParams,
    type DatasetRegisterParams as DatasetRegisterParams,
  };
}
