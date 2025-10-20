// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Moderations extends APIResource {
  /**
   * Classifies if text and/or image inputs are potentially harmful.
   */
  create(body: ModerationCreateParams, options?: Core.RequestOptions): Core.APIPromise<CreateResponse> {
    return this._client.post('/v1/openai/v1/moderations', { body, ...options });
  }
}

/**
 * A moderation object.
 */
export interface CreateResponse {
  /**
   * The unique identifier for the moderation request.
   */
  id: string;

  /**
   * The model used to generate the moderation results.
   */
  model: string;

  /**
   * A list of moderation objects
   */
  results: Array<CreateResponse.Result>;
}

export namespace CreateResponse {
  /**
   * A moderation object.
   */
  export interface Result {
    /**
     * Whether any of the below categories are flagged.
     */
    flagged: boolean;

    metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

    /**
     * A list of the categories, and whether they are flagged or not.
     */
    categories?: { [key: string]: boolean };

    /**
     * A list of the categories along with the input type(s) that the score applies to.
     */
    category_applied_input_types?: { [key: string]: Array<string> };

    /**
     * A list of the categories along with their scores as predicted by model.
     */
    category_scores?: { [key: string]: number };

    user_message?: string;
  }
}

export interface ModerationCreateParams {
  /**
   * Input (or inputs) to classify. Can be a single string, an array of strings, or
   * an array of multi-modal input objects similar to other models.
   */
  input: string | Array<string>;

  /**
   * The content moderation model you would like to use.
   */
  model: string;
}

export declare namespace Moderations {
  export { type CreateResponse as CreateResponse, type ModerationCreateParams as ModerationCreateParams };
}
