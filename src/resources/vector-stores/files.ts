// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Files extends APIResource {
  /**
   * Attach a file to a vector store.
   */
  create(
    vectorStoreId: string,
    body: FileCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<VectorStoreFile> {
    return this._client.post(`/v1/openai/v1/vector_stores/${vectorStoreId}/files`, { body, ...options });
  }
}

/**
 * OpenAI Vector Store File object.
 */
export interface VectorStoreFile {
  id: string;

  attributes: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  chunking_strategy:
    | VectorStoreFile.VectorStoreChunkingStrategyAuto
    | VectorStoreFile.VectorStoreChunkingStrategyStatic;

  created_at: number;

  object: string;

  status: 'completed' | 'in_progress' | 'cancelled' | 'failed';

  usage_bytes: number;

  vector_store_id: string;

  last_error?: VectorStoreFile.LastError;
}

export namespace VectorStoreFile {
  export interface VectorStoreChunkingStrategyAuto {
    type: 'auto';
  }

  export interface VectorStoreChunkingStrategyStatic {
    static: VectorStoreChunkingStrategyStatic.Static;

    type: 'static';
  }

  export namespace VectorStoreChunkingStrategyStatic {
    export interface Static {
      chunk_overlap_tokens: number;

      max_chunk_size_tokens: number;
    }
  }

  export interface LastError {
    code: 'server_error' | 'rate_limit_exceeded';

    message: string;
  }
}

export interface FileCreateParams {
  /**
   * The ID of the file to attach to the vector store.
   */
  file_id: string;

  /**
   * The key-value attributes stored with the file, which can be used for filtering.
   */
  attributes?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * The chunking strategy to use for the file.
   */
  chunking_strategy?:
    | FileCreateParams.VectorStoreChunkingStrategyAuto
    | FileCreateParams.VectorStoreChunkingStrategyStatic;
}

export namespace FileCreateParams {
  export interface VectorStoreChunkingStrategyAuto {
    type: 'auto';
  }

  export interface VectorStoreChunkingStrategyStatic {
    static: VectorStoreChunkingStrategyStatic.Static;

    type: 'static';
  }

  export namespace VectorStoreChunkingStrategyStatic {
    export interface Static {
      chunk_overlap_tokens: number;

      max_chunk_size_tokens: number;
    }
  }
}

export declare namespace Files {
  export { type VectorStoreFile as VectorStoreFile, type FileCreateParams as FileCreateParams };
}
