// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Shields extends APIResource {
  create(body: ShieldCreateParams, options?: RequestOptions): APIPromise<Shield> {
    return this._client.post('/v1/shields', { body, ...options });
  }

  retrieve(identifier: string, options?: RequestOptions): APIPromise<Shield> {
    return this._client.get(path`/v1/shields/${identifier}`, options);
  }

  list(options?: RequestOptions): APIPromise<ShieldListResponse> {
    return this._client.get('/v1/shields', options);
  }
}

/**
 * A safety shield resource that can be used to check content
 */
export interface Shield {
  identifier: string;

  provider_id: string;

  type: 'shield';

  params?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  provider_resource_id?: string;
}

export interface ShieldListResponse {
  data: Array<Shield>;
}

export interface ShieldCreateParams {
  shield_id: string;

  params?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  provider_id?: string;

  provider_shield_id?: string;
}

export declare namespace Shields {
  export {
    type Shield as Shield,
    type ShieldListResponse as ShieldListResponse,
    type ShieldCreateParams as ShieldCreateParams,
  };
}
