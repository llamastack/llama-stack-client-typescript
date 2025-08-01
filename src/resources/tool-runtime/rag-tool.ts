// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as Shared from '../shared';

export class RagTool extends APIResource {
  /**
   * Index documents so they can be used by the RAG system.
   */
  insert(body: RagToolInsertParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/tool-runtime/rag-tool/insert', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Query the RAG system for context; typically invoked by the agent.
   */
  query(body: RagToolQueryParams, options?: Core.RequestOptions): Core.APIPromise<Shared.QueryResult> {
    return this._client.post('/v1/tool-runtime/rag-tool/query', { body, ...options });
  }
}

export interface RagToolInsertParams {
  /**
   * (Optional) Size in tokens for document chunking during indexing
   */
  chunk_size_in_tokens: number;

  /**
   * List of documents to index in the RAG system
   */
  documents: Array<Shared.Document>;

  /**
   * ID of the vector database to store the document embeddings
   */
  vector_db_id: string;
}

export interface RagToolQueryParams {
  /**
   * The query content to search for in the indexed documents
   */
  content: Shared.InterleavedContent;

  /**
   * List of vector database IDs to search within
   */
  vector_db_ids: Array<string>;

  /**
   * (Optional) Configuration parameters for the query operation
   */
  query_config?: Shared.QueryConfig;
}

export declare namespace RagTool {
  export { type RagToolInsertParams as RagToolInsertParams, type RagToolQueryParams as RagToolQueryParams };
}
