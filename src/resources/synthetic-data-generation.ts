// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class SyntheticDataGeneration extends APIResource {
  /**
   * Generate synthetic data based on input dialogs and apply filtering.
   */
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
  /**
   * List of generated synthetic data samples that passed the filtering criteria
   */
  synthetic_data: Array<{ [key: string]: boolean | number | string | Array<unknown> | unknown | null }>;

  /**
   * (Optional) Statistical information about the generation process and filtering
   * results
   */
  statistics?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };
}

export interface SyntheticDataGenerationGenerateParams {
  /**
   * List of conversation messages to use as input for synthetic data generation
   */
  dialogs: Array<Shared.Message>;

  /**
   * Type of filtering to apply to generated synthetic data samples
   */
  filtering_function: 'none' | 'random' | 'top_k' | 'top_p' | 'top_k_top_p' | 'sigmoid';

  /**
   * (Optional) The identifier of the model to use. The model must be registered with
   * Llama Stack and available via the /models endpoint
   */
  model?: string;
}

export declare namespace SyntheticDataGeneration {
  export {
    type SyntheticDataGenerationResponse as SyntheticDataGenerationResponse,
    type SyntheticDataGenerationGenerateParams as SyntheticDataGenerationGenerateParams,
  };
}
