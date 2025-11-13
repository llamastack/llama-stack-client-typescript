// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
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

  /**
   * Unregister a shield.
   *
   * @deprecated
   */
  delete(identifier: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/shields/${identifier}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Register a shield.
   *
   * @deprecated
   */
  register(body: ShieldRegisterParams, options?: Core.RequestOptions): Core.APIPromise<Shield> {
    return this._client.post('/v1/shields', { body, ...options });
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

export interface ShieldRegisterParams {
  /**
   * The identifier of the shield to register.
   */
  shield_id: string;

  /**
   * The parameters of the shield.
   */
  params?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * The identifier of the provider.
   */
  provider_id?: string;

  /**
   * The identifier of the shield in the provider.
   */
  provider_shield_id?: string;
}

export declare namespace Shields {
  export {
    type ListShieldsResponse as ListShieldsResponse,
    type Shield as Shield,
    type ShieldListResponse as ShieldListResponse,
    type ShieldRegisterParams as ShieldRegisterParams,
  };
}
