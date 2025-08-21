// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { AbstractPage, Response, APIClient, FinalRequestOptions, PageInfo } from './core';

export interface DatasetsIterrowsResponse<Item> {
  data: Array<Item>;

  next_index: number;
}

export interface DatasetsIterrowsParams {
  dataset_id?: string;

  start_index?: number;

  limit?: number;
}

export class DatasetsIterrows<Item> extends AbstractPage<Item> implements DatasetsIterrowsResponse<Item> {
  data: Array<Item>;

  next_index: number;

  constructor(
    client: APIClient,
    response: Response,
    body: DatasetsIterrowsResponse<Item>,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);

    this.data = body.data || [];
    this.next_index = body.next_index || 0;
  }

  getPaginatedItems(): Item[] {
    return this.data ?? [];
  }

  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams(): Partial<DatasetsIterrowsParams> | null {
    const info = this.nextPageInfo();
    if (!info) return null;
    if ('params' in info) return info.params;
    const params = Object.fromEntries(info.url.searchParams);
    if (!Object.keys(params).length) return null;
    return params;
  }

  nextPageInfo(): PageInfo | null {
    const offset = this.next_index;
    if (!offset) {
      return null;
    }

    const length = this.getPaginatedItems().length;
    const currentCount = offset + length;

    return { params: { start_index: currentCount } };
  }
}
