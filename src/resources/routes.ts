// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as InspectAPI from './inspect';

export class Routes extends APIResource {
  /**
   * List routes. List all available API routes with their methods and implementing
   * providers.
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
  /**
   * List of available route information objects
   */
  data: RouteListResponse;
}

/**
 * List of available route information objects
 */
export type RouteListResponse = Array<InspectAPI.RouteInfo>;

export interface RouteListParams {
  /**
   * Optional filter to control which routes are returned. Can be an API level ('v1',
   * 'v1alpha', 'v1beta') to show non-deprecated routes at that level, or
   * 'deprecated' to show deprecated routes across all levels. If not specified,
   * returns only non-deprecated v1 routes.
   */
  api_filter?: 'v1' | 'v1alpha' | 'v1beta' | 'deprecated';
}

export declare namespace Routes {
  export {
    type ListRoutesResponse as ListRoutesResponse,
    type RouteListResponse as RouteListResponse,
    type RouteListParams as RouteListParams,
  };
}
