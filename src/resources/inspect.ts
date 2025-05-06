// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Inspect extends APIResource {
  listRoutes(options?: RequestOptions): APIPromise<InspectListRoutesResponse> {
    return this._client.get('/v1/inspect/routes', options);
  }
}

export interface InspectListRoutesResponse {
  data: Array<InspectListRoutesResponse.Data>;
}

export namespace InspectListRoutesResponse {
  export interface Data {
    method: string;

    provider_types: Array<string>;

    route: string;
  }
}

export declare namespace Inspect {
  export { type InspectListRoutesResponse as InspectListRoutesResponse };
}
