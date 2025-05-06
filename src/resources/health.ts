// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Health extends APIResource {
  check(options?: RequestOptions): APIPromise<HealthCheckResponse> {
    return this._client.get('/v1/health', options);
  }
}

export interface HealthCheckResponse {
  status: 'OK' | 'Error' | 'Not Implemented';
}

export declare namespace Health {
  export { type HealthCheckResponse as HealthCheckResponse };
}
