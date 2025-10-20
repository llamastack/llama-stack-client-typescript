// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as InspectAPI from './inspect';

export class Routes extends APIResource {
  /**
   * List all available API routes with their methods and implementing providers.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<RouteListResponse> {
    return (
      this._client.get('/v1/inspect/routes', options) as Core.APIPromise<{ data: RouteListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

/**
 * Response containing a list of all available API routes.
 */
export interface ListRoutesResponse {
  /**
   * List of available route information objects
   */
  data: RouteListResponse;
}

/**
 * List of available route information objects
 */
export type RouteListResponse = Array<InspectAPI.RouteInfo>;

export declare namespace Routes {
  export { type ListRoutesResponse as ListRoutesResponse, type RouteListResponse as RouteListResponse };
}
