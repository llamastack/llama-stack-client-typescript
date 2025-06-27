// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Models extends APIResource {
  /**
   * Get a model by its identifier.
   */
  retrieve(modelId: string, options?: Core.RequestOptions): Core.APIPromise<Model> {
    return this._client.get(`/v1/models/${modelId}`, options);
  }

  /**
   * List all models.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ModelListResponse> {
    return (
      this._client.get('/v1/models', options) as Core.APIPromise<{ data: ModelListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Register a model.
   */
  register(body: ModelRegisterParams, options?: Core.RequestOptions): Core.APIPromise<Model> {
    return this._client.post('/v1/models', { body, ...options });
  }

  /**
   * Unregister a model.
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

export interface Model {
  identifier: string;

  metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  model_type: 'llm' | 'embedding';

  provider_id: string;

  type: 'model';

  provider_resource_id?: string;
}

export type ModelListResponse = Array<Model>;

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
  model_type?: 'llm' | 'embedding';

  /**
   * The identifier of the provider.
   */
  provider_id?: string;

  /**
   * The identifier of the model in the provider.
   */
  provider_model_id?: string;
}

export declare namespace Models {
  export {
    type ListModelsResponse as ListModelsResponse,
    type Model as Model,
    type ModelListResponse as ModelListResponse,
    type ModelRegisterParams as ModelRegisterParams,
  };
}
