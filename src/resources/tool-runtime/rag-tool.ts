// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as Shared from '../shared';

export class RagTool extends APIResource {
  /**
   * Index documents so they can be used by the RAG system
   */
  insert(body: RagToolInsertParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/tool-runtime/rag-tool/insert', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Query the RAG system for context; typically invoked by the agent
   */
  query(body: RagToolQueryParams, options?: Core.RequestOptions): Core.APIPromise<Shared.QueryResult> {
    return this._client.post('/v1/tool-runtime/rag-tool/query', { body, ...options });
  }
}

export interface RagToolInsertParams {
  chunk_size_in_tokens: number;

  documents: Array<Shared.Document>;

  vector_db_id: string;
}

export interface RagToolQueryParams {
  /**
   * A image content item
   */
  content: Shared.InterleavedContent;

  vector_db_ids: Array<string>;

  /**
   * Configuration for the RAG query generation.
   */
  query_config?: Shared.QueryConfig;
}

export declare namespace RagTool {
  export { type RagToolInsertParams as RagToolInsertParams, type RagToolQueryParams as RagToolQueryParams };
}
