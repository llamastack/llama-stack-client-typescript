// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Inspect extends APIResource {
  /**
   * Get the health of the service.
   */
  health(options?: Core.RequestOptions): Core.APIPromise<HealthInfo> {
    return this._client.get('/v1/health', options);
  }

  /**
   * Get the version of the service.
   */
  version(options?: Core.RequestOptions): Core.APIPromise<VersionInfo> {
    return this._client.get('/v1/version', options);
  }
}

export interface HealthInfo {
  status: 'OK' | 'Error' | 'Not Implemented';
}

export interface ProviderInfo {
  api: string;

  config: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  health: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  provider_id: string;

  provider_type: string;
}

export interface RouteInfo {
  method: string;

  provider_types: Array<string>;

  route: string;
}

export interface VersionInfo {
  version: string;
}

export declare namespace Inspect {
  export {
    type HealthInfo as HealthInfo,
    type ProviderInfo as ProviderInfo,
    type RouteInfo as RouteInfo,
    type VersionInfo as VersionInfo,
  };
}
