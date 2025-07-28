// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Safety extends APIResource {
  /**
   * Classifies if text and/or image inputs are potentially harmful.
   */
  openaiModerations(
    body: SafetyOpenAIModerationsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<OpenAIModerationsResponse> {
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
export interface OpenAIModerationsResponse {
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
  results: Array<OpenAIModerationsResponse.Result>;
}

export namespace OpenAIModerationsResponse {
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

export interface SafetyOpenAIModerationsParams {
  /**
   * Input (or inputs) to classify. Can be a single string, an array of strings, or
   * an array of multi-modal input objects similar to other models.
   */
  input: string | Array<string>;

  /**
   * The content moderation model you would like to use.
   */
  model?: string;
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
    type OpenAIModerationsResponse as OpenAIModerationsResponse,
    type RunShieldResponse as RunShieldResponse,
    type SafetyOpenAIModerationsParams as SafetyOpenAIModerationsParams,
    type SafetyRunShieldParams as SafetyRunShieldParams,
  };
}
