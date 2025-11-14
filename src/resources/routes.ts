// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as InspectAPI from './inspect';

export class Routes extends APIResource {
  /**
   * List routes.
   *
   * List all available API routes with their methods and implementing providers.
   */
  list(query?: RouteListParams, options?: Core.RequestOptions): Core.APIPromise<RouteListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<RouteListResponse>;
  list(
    query: RouteListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<RouteListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return (
      this._client.get('/v1/inspect/routes', { query, ...options }) as Core.APIPromise<{
        data: RouteListResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }
}

/**
 * Response containing a list of all available API routes.
 */
export interface ListRoutesResponse {
  data: RouteListResponse;
}

export type RouteListResponse = Array<InspectAPI.RouteInfo>;

export interface RouteListParams {
  api_filter?: 'v1' | 'v1alpha' | 'v1beta' | 'deprecated' | null;
}

export declare namespace Routes {
  export {
    type ListRoutesResponse as ListRoutesResponse,
    type RouteListResponse as RouteListResponse,
    type RouteListParams as RouteListParams,
  };
}
