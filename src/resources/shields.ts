// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Shields extends APIResource {
  /**
   * Get a shield by its identifier.
   */
  retrieve(identifier: string, options?: Core.RequestOptions): Core.APIPromise<Shield> {
    return this._client.get(`/v1/shields/${identifier}`, options);
  }

  /**
   * List all shields.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ShieldListResponse> {
    return (
      this._client.get('/v1/shields', options) as Core.APIPromise<{ data: ShieldListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export interface ListShieldsResponse {
  data: ShieldListResponse;
}

/**
 * A safety shield resource that can be used to check content.
 */
export interface Shield {
  identifier: string;

  provider_id: string;

  /**
   * The resource type, always shield
   */
  type: 'shield';

  /**
   * (Optional) Configuration parameters for the shield
   */
  params?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  provider_resource_id?: string;
}

export type ShieldListResponse = Array<Shield>;

export declare namespace Shields {
  export {
    type ListShieldsResponse as ListShieldsResponse,
    type Shield as Shield,
    type ShieldListResponse as ShieldListResponse,
  };
}
