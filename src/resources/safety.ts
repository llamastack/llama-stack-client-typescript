// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Safety extends APIResource {
  /**
   * Run a shield.
   */
  runShield(body: SafetyRunShieldParams, options?: Core.RequestOptions): Core.APIPromise<RunShieldResponse> {
    return this._client.post('/v1/safety/run-shield', { body, ...options });
  }
}

/**
 * Response from running a safety shield.
 */
export interface RunShieldResponse {
  /**
   * (Optional) Safety violation detected by the shield, if any
   */
  violation?: Shared.SafetyViolation;
}

export interface SafetyRunShieldParams {
  /**
   * The messages to run the shield on.
   */
  messages: Array<Shared.Message>;

  /**
   * The parameters of the shield.
   */
  params: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * The identifier of the shield to run.
   */
  shield_id: string;
}

export declare namespace Safety {
  export { type RunShieldResponse as RunShieldResponse, type SafetyRunShieldParams as SafetyRunShieldParams };
}
