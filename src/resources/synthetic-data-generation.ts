// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InferenceAPI from './inference';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class SyntheticDataGeneration extends APIResource {
  generate(
    body: SyntheticDataGenerationGenerateParams,
    options?: RequestOptions,
  ): APIPromise<SyntheticDataGenerationGenerateResponse> {
    return this._client.post('/v1/synthetic-data-generation/generate', { body, ...options });
  }
}

/**
 * Response from the synthetic data generation. Batch of (prompt, response, score)
 * tuples that pass the threshold.
 */
export interface SyntheticDataGenerationGenerateResponse {
  synthetic_data: Array<{ [key: string]: boolean | number | string | Array<unknown> | unknown | null }>;

  statistics?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };
}

export interface SyntheticDataGenerationGenerateParams {
  dialogs: Array<InferenceAPI.Message>;

  /**
   * The type of filtering function.
   */
  filtering_function: 'none' | 'random' | 'top_k' | 'top_p' | 'top_k_top_p' | 'sigmoid';

  model?: string;
}

export declare namespace SyntheticDataGeneration {
  export {
    type SyntheticDataGenerationGenerateResponse as SyntheticDataGenerationGenerateResponse,
    type SyntheticDataGenerationGenerateParams as SyntheticDataGenerationGenerateParams,
  };
}
