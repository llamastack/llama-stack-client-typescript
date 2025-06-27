// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class SyntheticDataGeneration extends APIResource {
  generate(
    body: SyntheticDataGenerationGenerateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<SyntheticDataGenerationResponse> {
    return this._client.post('/v1/synthetic-data-generation/generate', { body, ...options });
  }
}

/**
 * Response from the synthetic data generation. Batch of (prompt, response, score)
 * tuples that pass the threshold.
 */
export interface SyntheticDataGenerationResponse {
  synthetic_data: Array<{ [key: string]: boolean | number | string | Array<unknown> | unknown | null }>;

  statistics?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };
}

export interface SyntheticDataGenerationGenerateParams {
  dialogs: Array<Shared.Message>;

  /**
   * The type of filtering function.
   */
  filtering_function: 'none' | 'random' | 'top_k' | 'top_p' | 'top_k_top_p' | 'sigmoid';

  model?: string;
}

export declare namespace SyntheticDataGeneration {
  export {
    type SyntheticDataGenerationResponse as SyntheticDataGenerationResponse,
    type SyntheticDataGenerationGenerateParams as SyntheticDataGenerationGenerateParams,
  };
}
