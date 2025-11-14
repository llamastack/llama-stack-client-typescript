// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Moderations extends APIResource {
  /**
   * Create moderation.
   *
   * Classifies if text and/or image inputs are potentially harmful.
   */
  create(body: ModerationCreateParams, options?: Core.RequestOptions): Core.APIPromise<CreateResponse> {
    return this._client.post('/v1/moderations', { body, ...options });
  }
}

/**
 * A moderation object.
 */
export interface CreateResponse {
  id: string;

  model: string;

  results: Array<CreateResponse.Result>;
}

export namespace CreateResponse {
  /**
   * A moderation object.
   */
  export interface Result {
    flagged: boolean;

    categories?: { [key: string]: boolean } | null;

    category_applied_input_types?: { [key: string]: Array<string> } | null;

    category_scores?: { [key: string]: number } | null;

    metadata?: { [key: string]: unknown };

    user_message?: string | null;
  }
}

export interface ModerationCreateParams {
  input: string | Array<string>;

  model?: string | null;
}

export declare namespace Moderations {
  export { type CreateResponse as CreateResponse, type ModerationCreateParams as ModerationCreateParams };
}
