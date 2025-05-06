// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Datasets extends APIResource {
  /**
   * Register a new dataset.
   */
  create(body: DatasetCreateParams, options?: RequestOptions): APIPromise<Dataset> {
    return this._client.post('/v1/datasets', { body, ...options });
  }

  retrieve(datasetID: string, options?: RequestOptions): APIPromise<Dataset> {
    return this._client.get(path`/v1/datasets/${datasetID}`, options);
  }

  list(options?: RequestOptions): APIPromise<DatasetListResponse> {
    return this._client.get('/v1/datasets', options);
  }

  delete(datasetID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/datasets/${datasetID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * A dataset that can be obtained from a URI.
 */
export type DataSource = DataSource.UriDataSource | DataSource.RowsDataSource;

export namespace DataSource {
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

export interface Dataset {
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
  source: DataSource;

  type: 'dataset';

  provider_resource_id?: string;
}

export interface DatasetListResponse {
  data: Array<Dataset>;
}

export interface DatasetCreateParams {
  /**
   * The purpose of the dataset. One of - "post-training/messages": The dataset
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
  source: DataSource;

  /**
   * The ID of the dataset. If not provided, an ID will be generated.
   */
  dataset_id?: string;

  /**
   * The metadata for the dataset. - E.g. {"description": "My dataset"}
   */
  metadata?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;
}

export declare namespace Datasets {
  export {
    type DataSource as DataSource,
    type Dataset as Dataset,
    type DatasetListResponse as DatasetListResponse,
    type DatasetCreateParams as DatasetCreateParams,
  };
}
