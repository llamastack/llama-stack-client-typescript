// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as InferenceAPI from './inference';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class VectorIo extends APIResource {
  insert(body: VectorIoInsertParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/vector-io/insert', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  query(body: VectorIoQueryParams, options?: RequestOptions): APIPromise<VectorIoQueryResponse> {
    return this._client.post('/v1/vector-io/query', { body, ...options });
  }
}

export interface VectorIoQueryResponse {
  chunks: Array<VectorIoQueryResponse.Chunk>;

  scores: Array<number>;
}

export namespace VectorIoQueryResponse {
  export interface Chunk {
    /**
     * A image content item
     */
    content: InferenceAPI.InterleavedContent;

    metadata: Record<string, boolean | number | string | Array<unknown> | unknown | null>;
  }
}

export interface VectorIoInsertParams {
  chunks: Array<VectorIoInsertParams.Chunk>;

  vector_db_id: string;

  ttl_seconds?: number;
}

export namespace VectorIoInsertParams {
  export interface Chunk {
    /**
     * A image content item
     */
    content: InferenceAPI.InterleavedContent;

    metadata: Record<string, boolean | number | string | Array<unknown> | unknown | null>;
  }
}

export interface VectorIoQueryParams {
  /**
   * A image content item
   */
  query: InferenceAPI.InterleavedContent;

  vector_db_id: string;

  params?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;
}

export declare namespace VectorIo {
  export {
    type VectorIoQueryResponse as VectorIoQueryResponse,
    type VectorIoInsertParams as VectorIoInsertParams,
    type VectorIoQueryParams as VectorIoQueryParams,
  };
}
