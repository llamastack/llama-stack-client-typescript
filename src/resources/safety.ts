// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InferenceAPI from './inference';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Safety extends APIResource {
  runShield(body: SafetyRunShieldParams, options?: RequestOptions): APIPromise<SafetyRunShieldResponse> {
    return this._client.post('/v1/safety/run-shield', { body, ...options });
  }
}

export interface SafetyViolation {
  metadata: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  violation_level: 'info' | 'warn' | 'error';

  user_message?: string;
}

export interface SafetyRunShieldResponse {
  violation?: SafetyViolation;
}

export interface SafetyRunShieldParams {
  messages: Array<InferenceAPI.Message>;

  params: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  shield_id: string;
}

export declare namespace Safety {
  export {
    type SafetyViolation as SafetyViolation,
    type SafetyRunShieldResponse as SafetyRunShieldResponse,
    type SafetyRunShieldParams as SafetyRunShieldParams,
  };
}
