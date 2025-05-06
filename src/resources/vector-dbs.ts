// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class VectorDBs extends APIResource {
  create(body: VectorDBCreateParams, options?: RequestOptions): APIPromise<VectorDB> {
    return this._client.post('/v1/vector-dbs', { body, ...options });
  }

  retrieve(vectorDBID: string, options?: RequestOptions): APIPromise<VectorDB> {
    return this._client.get(path`/v1/vector-dbs/${vectorDBID}`, options);
  }

  list(options?: RequestOptions): APIPromise<VectorDBListResponse> {
    return this._client.get('/v1/vector-dbs', options);
  }

  delete(vectorDBID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/vector-dbs/${vectorDBID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface VectorDB {
  embedding_dimension: number;

  embedding_model: string;

  identifier: string;

  provider_id: string;

  type: 'vector_db';

  provider_resource_id?: string;
}

export interface VectorDBListResponse {
  data: Array<VectorDB>;
}

export interface VectorDBCreateParams {
  embedding_model: string;

  vector_db_id: string;

  embedding_dimension?: number;

  provider_id?: string;

  provider_vector_db_id?: string;
}

export declare namespace VectorDBs {
  export {
    type VectorDB as VectorDB,
    type VectorDBListResponse as VectorDBListResponse,
    type VectorDBCreateParams as VectorDBCreateParams,
  };
}
