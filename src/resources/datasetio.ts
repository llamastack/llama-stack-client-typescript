// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Datasetio extends APIResource {
  appendRows(datasetID: string, body: DatasetioAppendRowsParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/v1/datasetio/append-rows/${datasetID}`, {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Get a paginated list of rows from a dataset. Uses offset-based pagination where:
   *
   * - start_index: The starting index (0-based). If None, starts from beginning.
   * - limit: Number of items to return. If None or -1, returns all items.
   *
   * The response includes:
   *
   * - data: List of items for the current page
   * - has_more: Whether there are more items available after this set
   */
  iterateRows(
    datasetID: string,
    query: DatasetioIterateRowsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DatasetioIterateRowsResponse> {
    return this._client.get(path`/v1/datasetio/iterrows/${datasetID}`, { query, ...options });
  }
}

/**
 * A generic paginated response that follows a simple format.
 */
export interface DatasetioIterateRowsResponse {
  /**
   * The list of items for the current page
   */
  data: Array<Record<string, boolean | number | string | Array<unknown> | unknown | null>>;

  /**
   * Whether there are more items available after this set
   */
  has_more: boolean;
}

export interface DatasetioAppendRowsParams {
  rows: Array<Record<string, boolean | number | string | Array<unknown> | unknown | null>>;
}

export interface DatasetioIterateRowsParams {
  /**
   * The number of rows to get.
   */
  limit?: number;

  /**
   * Index into dataset for the first row to get. Get all rows if None.
   */
  start_index?: number;
}

export declare namespace Datasetio {
  export {
    type DatasetioIterateRowsResponse as DatasetioIterateRowsResponse,
    type DatasetioAppendRowsParams as DatasetioAppendRowsParams,
    type DatasetioIterateRowsParams as DatasetioIterateRowsParams,
  };
}
