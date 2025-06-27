// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as InspectAPI from './inspect';

export class Providers extends APIResource {
  /**
   * Get detailed information about a specific provider.
   */
  retrieve(providerId: string, options?: Core.RequestOptions): Core.APIPromise<InspectAPI.ProviderInfo> {
    return this._client.get(`/v1/providers/${providerId}`, options);
  }

  /**
   * List all available providers.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ProviderListResponse> {
    return (
      this._client.get('/v1/providers', options) as Core.APIPromise<{ data: ProviderListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export interface ListProvidersResponse {
  data: ProviderListResponse;
}

export type ProviderListResponse = Array<InspectAPI.ProviderInfo>;

export declare namespace Providers {
  export {
    type ListProvidersResponse as ListProvidersResponse,
    type ProviderListResponse as ProviderListResponse,
  };
}
