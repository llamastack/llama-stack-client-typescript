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
 * A moderation object.
 */
export interface OpenAPIModerationsResponse {
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
  results: Array<OpenAPIModerationsResponse.Result>;
}

export namespace OpenAPIModerationsResponse {
  /**
   * A moderation object.
   */
  export interface Result {
    /**
     * A list of the categories, and whether they are flagged or not.
     */
    categories: { [key: string]: boolean };

    category_applied_input_types: { [key: string]: Array<string> };

    category_messages: { [key: string]: string };

    /**
     * A list of the categories along with their scores as predicted by model.
     */
    category_scores: { [key: string]: number };

    /**
     * Whether any of the below categories are flagged.
     */
    flagged: boolean;
  }
}

export interface RunShieldResponse {
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
  export {
    type OpenAPIModerationsResponse as OpenAPIModerationsResponse,
    type RunShieldResponse as RunShieldResponse,
    type SafetyRunShieldParams as SafetyRunShieldParams,
  };
}
