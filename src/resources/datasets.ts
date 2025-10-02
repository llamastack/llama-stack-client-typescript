// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';

export class Datasets extends APIResource {}

/**
 * Response from listing datasets.
 */
export interface ListDatasetsResponse {
  /**
   * List of datasets
   */
  data: Array<ListDatasetsResponse.Data>;
}

export namespace ListDatasetsResponse {
  /**
   * Dataset resource for storing and accessing training or evaluation data.
   */
  export interface Data {
    identifier: string;

    /**
     * Additional metadata for the dataset
     */
    metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

    provider_id: string;

    /**
     * Purpose of the dataset indicating its intended use
     */
    purpose: 'post-training/messages' | 'eval/question-answer' | 'eval/messages-answer';

    /**
     * Data source configuration for the dataset
     */
    source: Data.UriDataSource | Data.RowsDataSource;

    /**
     * Type of resource, always 'dataset' for datasets
     */
    type: 'dataset';

    provider_resource_id?: string;
  }

  export namespace Data {
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
      rows: Array<{ [key: string]: boolean | number | string | Array<unknown> | unknown | null }>;

      type: 'rows';
    }
  }
}

export declare namespace Datasets {
  export { type ListDatasetsResponse as ListDatasetsResponse };
}
