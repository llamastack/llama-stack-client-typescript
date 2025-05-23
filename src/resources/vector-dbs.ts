// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class VectorDBs extends APIResource {
  /**
   * Get a vector database by its identifier.
   */
  retrieve(vectorDBId: string, options?: Core.RequestOptions): Core.APIPromise<VectorDBRetrieveResponse> {
    return this._client.get(`/v1/vector-dbs/${vectorDBId}`, options);
  }

  /**
   * List all vector databases.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<VectorDBListResponse> {
    return (
      this._client.get('/v1/vector-dbs', options) as Core.APIPromise<{ data: VectorDBListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Register a vector database.
   */
  register(
    body: VectorDBRegisterParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorDBRegisterResponse> {
    return this._client.post('/v1/vector-dbs', { body, ...options });
  }

  /**
   * Unregister a vector database.
   */
  unregister(vectorDBId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/vector-dbs/${vectorDBId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

export interface ListVectorDBsResponse {
  data: VectorDBListResponse;
}

export interface VectorDBRetrieveResponse {
  embedding_dimension: number;

  embedding_model: string;

  identifier: string;

  provider_id: string;

  type: 'vector_db';

  provider_resource_id?: string;
}

export type VectorDBListResponse = Array<VectorDBListResponse.VectorDBListResponseItem>;

export namespace VectorDBListResponse {
  export interface VectorDBListResponseItem {
    embedding_dimension: number;

    embedding_model: string;

    identifier: string;

    provider_id: string;

    type: 'vector_db';

    provider_resource_id?: string;
  }
}

export interface VectorDBRegisterResponse {
  embedding_dimension: number;

  embedding_model: string;

  identifier: string;

  provider_id: string;

  type: 'vector_db';

  provider_resource_id?: string;
}

export interface VectorDBRegisterParams {
  /**
   * The embedding model to use.
   */
  embedding_model: string;

  /**
   * The identifier of the vector database to register.
   */
  vector_db_id: string;

  /**
   * The dimension of the embedding model.
   */
  embedding_dimension?: number;

  /**
   * The identifier of the provider.
   */
  provider_id?: string;

  /**
   * The identifier of the vector database in the provider.
   */
  provider_vector_db_id?: string;
}

export declare namespace VectorDBs {
  export {
    type ListVectorDBsResponse as ListVectorDBsResponse,
    type VectorDBRetrieveResponse as VectorDBRetrieveResponse,
    type VectorDBListResponse as VectorDBListResponse,
    type VectorDBRegisterResponse as VectorDBRegisterResponse,
    type VectorDBRegisterParams as VectorDBRegisterParams,
  };
}
