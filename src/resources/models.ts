// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Models extends APIResource {
  create(body: ModelCreateParams, options?: RequestOptions): APIPromise<Model> {
    return this._client.post('/v1/models', { body, ...options });
  }

  retrieve(modelID: string, options?: RequestOptions): APIPromise<Model> {
    return this._client.get(path`/v1/models/${modelID}`, options);
  }

  list(options?: RequestOptions): APIPromise<ModelListResponse> {
    return this._client.get('/v1/models', options);
  }

  delete(modelID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/models/${modelID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface Model {
  identifier: string;

  metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  model_type: ModelType;

  provider_id: string;

  type: 'model';

  provider_resource_id?: string;
}

export type ModelType = 'llm' | 'embedding';

export interface ModelListResponse {
  data: Array<Model>;
}

export interface ModelCreateParams {
  model_id: string;

  metadata?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  model_type?: ModelType;

  provider_id?: string;

  provider_model_id?: string;
}

export declare namespace Models {
  export {
    type Model as Model,
    type ModelType as ModelType,
    type ModelListResponse as ModelListResponse,
    type ModelCreateParams as ModelCreateParams,
  };
}
