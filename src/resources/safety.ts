// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Safety extends APIResource {
  /**
   * Classifies if text and/or image inputs are potentially harmful.
   */
  create(body: SafetyCreateParams, options?: Core.RequestOptions): Core.APIPromise<CreateResponse> {
    return this._client.post('/v1/openai/v1/moderations', { body, ...options });
  }

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

/**
 * Response from running a safety shield.
 */
export interface RunShieldResponse {
  /**
   * (Optional) Safety violation detected by the shield, if any
   */
  violation?: Shared.SafetyViolation;
}

export interface SafetyCreateParams {
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
    type CreateResponse as CreateResponse,
    type RunShieldResponse as RunShieldResponse,
    type SafetyCreateParams as SafetyCreateParams,
    type SafetyRunShieldParams as SafetyRunShieldParams,
  };
}
