// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Providers extends APIResource {
  retrieve(providerID: string, options?: RequestOptions): APIPromise<ProviderInfo> {
    return this._client.get(path`/v1/providers/${providerID}`, options);
  }

  list(options?: RequestOptions): APIPromise<ProviderListResponse> {
    return this._client.get('/v1/providers', options);
  }
}

export interface ProviderInfo {
  api: string;

  config: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  health: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  provider_id: string;

  provider_type: string;
}

export interface ProviderListResponse {
  data: Array<ProviderInfo>;
}

export declare namespace Providers {
  export { type ProviderInfo as ProviderInfo, type ProviderListResponse as ProviderListResponse };
}
