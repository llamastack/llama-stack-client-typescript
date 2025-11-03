// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as OpenAIAPI from './openai';
import { OpenAI, OpenAIListResponse } from './openai';

export class Models extends APIResource {
  openai: OpenAIAPI.OpenAI = new OpenAIAPI.OpenAI(this._client);

  /**
   * Get model. Get a model by its identifier.
   */
  retrieve(modelId: string, options?: Core.RequestOptions): Core.APIPromise<Model> {
    return this._client.get(`/v1/models/${modelId}`, options);
  }

  /**
   * List models using the OpenAI API.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ModelListResponse> {
    return (
      this._client.get('/v1/openai/v1/models', options) as Core.APIPromise<{ data: ModelListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Register model. Register a model.
   */
  register(body: ModelRegisterParams, options?: Core.RequestOptions): Core.APIPromise<Model> {
    return this._client.post('/v1/models', { body, ...options });
  }

  /**
   * Unregister model. Unregister a model.
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
 * A model resource representing an AI model registered in Llama Stack.
 */
export interface Model {
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

export type ModelListResponse = Array<ModelListResponse.ModelListResponseItem>;

export namespace ModelListResponse {
  /**
   * A model from OpenAI.
   */
  export interface ModelListResponseItem {
    id: string;

    created: number;

    object: 'model';

    owned_by: string;

    custom_metadata?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };
  }
}

export interface ModelRegisterParams {
  /**
   * The identifier of the model to register.
   */
  model_id: string;

  /**
   * Any additional metadata for this model.
   */
  metadata?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * The type of model to register.
   */
  model_type?: 'llm' | 'embedding' | 'rerank';

  /**
   * The identifier of the provider.
   */
  provider_id?: string;

  /**
   * The identifier of the model in the provider.
   */
  provider_model_id?: string;
}

Models.OpenAI = OpenAI;

export declare namespace Models {
  export {
    type ListModelsResponse as ListModelsResponse,
    type Model as Model,
    type ModelListResponse as ModelListResponse,
    type ModelRegisterParams as ModelRegisterParams,
  };

  export { OpenAI as OpenAI, type OpenAIListResponse as OpenAIListResponse };
}
