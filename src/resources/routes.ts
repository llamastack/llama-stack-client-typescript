// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as InspectAPI from './inspect';

export class Routes extends APIResource {
  /**
   * List all routes.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<RouteListResponse> {
    return (
      this._client.get('/v1/inspect/routes', options) as Core.APIPromise<{ data: RouteListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export interface ListRoutesResponse {
  data: RouteListResponse;
}

export type RouteListResponse = Array<InspectAPI.RouteInfo>;

export declare namespace Routes {
  export { type ListRoutesResponse as ListRoutesResponse, type RouteListResponse as RouteListResponse };
}
