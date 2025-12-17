// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
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

/**
 * Response containing a list of all available providers.
 */
export interface ListProvidersResponse {
  /**
   * List of provider information objects
   */
  data: ProviderListResponse;
}

/**
 * List of provider information objects
 */
export type ProviderListResponse = Array<InspectAPI.ProviderInfo>;

export declare namespace Providers {
  export {
    type ListProvidersResponse as ListProvidersResponse,
    type ProviderListResponse as ProviderListResponse,
  };
}
