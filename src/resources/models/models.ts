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
   * Get model.
   *
   * Get a model by its identifier.
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

  /**
   * Register model.
   *
   * Register a model.
   *
   * @deprecated
   */
  register(body: ModelRegisterParams, options?: Core.RequestOptions): Core.APIPromise<ModelRegisterResponse> {
    return this._client.post('/v1/models', { body, ...options });
  }

  /**
   * Unregister model.
   *
   * Unregister a model.
   *
   * @deprecated
   */
  unregister(modelId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/models/${modelId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface ListModelsResponse {
  data: ModelListResponse;
}

/**
 * A model from OpenAI.
 *
 * :id: The ID of the model :object: The object type, which will be "model"
 * :created: The Unix timestamp in seconds when the model was created :owned_by:
 * The owner of the model :custom_metadata: Llama Stack-specific metadata including
 * model_type, provider info, and additional metadata
 */
export interface Model {
  id: string;

  created: number;

  owned_by: string;

  custom_metadata?: { [key: string]: unknown } | null;

  object?: 'model';
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
   * ID of the provider that owns this resource
   */
  provider_id: string;

  /**
   * Any additional metadata for this model
   */
  metadata?: { [key: string]: unknown };

  /**
   * Enumeration of supported model types in Llama Stack.
   */
  model_type?: 'llm' | 'embedding' | 'rerank';

  /**
   * Unique identifier for this resource in the provider
   */
  provider_resource_id?: string | null;

  type?: 'model';
}

export type ModelListResponse = Array<Model>;

/**
 * A model resource representing an AI model registered in Llama Stack.
 */
export interface ModelRegisterResponse {
  /**
   * Unique identifier for this resource in llama stack
   */
  identifier: string;

  /**
   * ID of the provider that owns this resource
   */
  provider_id: string;

  /**
   * Any additional metadata for this model
   */
  metadata?: { [key: string]: unknown };

  /**
   * Enumeration of supported model types in Llama Stack.
   */
  model_type?: 'llm' | 'embedding' | 'rerank';

  /**
   * Unique identifier for this resource in the provider
   */
  provider_resource_id?: string | null;

  type?: 'model';
}

export interface ModelRegisterParams {
  model_id: string;

  metadata?: { [key: string]: unknown } | null;

  /**
   * Enumeration of supported model types in Llama Stack.
   */
  model_type?: 'llm' | 'embedding' | 'rerank' | null;

  provider_id?: string | null;

  provider_model_id?: string | null;
}

Models.OpenAI = OpenAI;

export declare namespace Models {
  export {
    type ListModelsResponse as ListModelsResponse,
    type Model as Model,
    type ModelRetrieveResponse as ModelRetrieveResponse,
    type ModelListResponse as ModelListResponse,
    type ModelRegisterResponse as ModelRegisterResponse,
    type ModelRegisterParams as ModelRegisterParams,
  };

  export { OpenAI as OpenAI };
}
