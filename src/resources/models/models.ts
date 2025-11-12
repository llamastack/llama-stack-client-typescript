// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as OpenAIAPI from './openai';
import { OpenAI } from './openai';

export class Models extends APIResource {
  openai: OpenAIAPI.OpenAI = new OpenAIAPI.OpenAI(this._client);

  /**
   * Get model. Get a model by its identifier.
   */
  retrieve(modelId: string, options?: Core.RequestOptions): Core.APIPromise<ModelRetrieveResponse> {
    return this._client.get(`/v1/models/${modelId}`, options);
  }

  /**
   * List models using the OpenAI API.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ModelListResponse> {
    return (
      this._client.get('/v1/models', options) as Core.APIPromise<{ data: ModelListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export interface ListModelsResponse {
  data: ModelListResponse;
}

/**
 * A model from OpenAI.
 */
export interface Model {
  id: string;

  created: number;

  object: 'model';

  owned_by: string;

  custom_metadata?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };
}

/**
 * A model resource representing an AI model registered in Llama Stack.
 */
export interface ModelRetrieveResponse {
  /**
   * Unique identifier for this resource in llama stack
   */
  identifier: string;

  /**
   * Any additional metadata for this model
   */
  metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * The type of model (LLM or embedding model)
   */
  model_type: 'llm' | 'embedding' | 'rerank';

  /**
   * ID of the provider that owns this resource
   */
  provider_id: string;

  /**
   * The resource type, always 'model' for model resources
   */
  type: 'model';

  /**
   * Unique identifier for this resource in the provider
   */
  provider_resource_id?: string;
}

export type ModelListResponse = Array<Model>;

Models.OpenAI = OpenAI;

export declare namespace Models {
  export {
    type ListModelsResponse as ListModelsResponse,
    type Model as Model,
    type ModelRetrieveResponse as ModelRetrieveResponse,
    type ModelListResponse as ModelListResponse,
  };

  export { OpenAI as OpenAI };
}
