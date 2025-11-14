// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class VectorIo extends APIResource {
  /**
   * Insert chunks into a vector database.
   */
  insert(body: VectorIoInsertParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/vector-io/insert', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Query chunks from a vector database.
   */
  query(body: VectorIoQueryParams, options?: Core.RequestOptions): Core.APIPromise<QueryChunksResponse> {
    return this._client.post('/v1/vector-io/query', { body, ...options });
  }
}

/**
 * Response from querying chunks in a vector database.
 */
export interface QueryChunksResponse {
  chunks: Array<QueryChunksResponse.Chunk>;

  scores: Array<number>;
}

export namespace QueryChunksResponse {
  /**
   * A chunk of content that can be inserted into a vector database.
   */
  export interface Chunk {
    chunk_id: string;

    /**
     * A image content item
     */
    content:
      | string
      | Chunk.ImageContentItemOutput
      | Chunk.TextContentItem
      | Array<Chunk.ImageContentItemOutput | Chunk.TextContentItem>;

    /**
     * `ChunkMetadata` is backend metadata for a `Chunk` that is used to store
     * additional information about the chunk that will not be used in the context
     * during inference, but is required for backend functionality. The `ChunkMetadata`
     * is set during chunk creation in `MemoryToolRuntimeImpl().insert()`and is not
     * expected to change after. Use `Chunk.metadata` for metadata that will be used in
     * the context during inference.
     */
    chunk_metadata?: Chunk.ChunkMetadata | null;

    embedding?: Array<number> | null;

    metadata?: { [key: string]: unknown };
  }

  export namespace Chunk {
    /**
     * A image content item
     */
    export interface ImageContentItemOutput {
      /**
       * A URL or a base64 encoded string
       */
      image: ImageContentItemOutput.Image;

      type?: 'image';
    }

    export namespace ImageContentItemOutput {
      /**
       * A URL or a base64 encoded string
       */
      export interface Image {
        data?: string | null;

        /**
         * A URL reference to external content.
         */
        url?: Image.URL | null;
      }

      export namespace Image {
        /**
         * A URL reference to external content.
         */
        export interface URL {
          uri: string;
        }
      }
    }

    /**
     * A text content item
     */
    export interface TextContentItem {
      text: string;

      type?: 'text';
    }

    /**
     * A image content item
     */
    export interface ImageContentItemOutput {
      /**
       * A URL or a base64 encoded string
       */
      image: ImageContentItemOutput.Image;

      type?: 'image';
    }

    export namespace ImageContentItemOutput {
      /**
       * A URL or a base64 encoded string
       */
      export interface Image {
        data?: string | null;

        /**
         * A URL reference to external content.
         */
        url?: Image.URL | null;
      }

      export namespace Image {
        /**
         * A URL reference to external content.
         */
        export interface URL {
          uri: string;
        }
      }
    }

    /**
     * A text content item
     */
    export interface TextContentItem {
      text: string;

      type?: 'text';
    }

    /**
     * `ChunkMetadata` is backend metadata for a `Chunk` that is used to store
     * additional information about the chunk that will not be used in the context
     * during inference, but is required for backend functionality. The `ChunkMetadata`
     * is set during chunk creation in `MemoryToolRuntimeImpl().insert()`and is not
     * expected to change after. Use `Chunk.metadata` for metadata that will be used in
     * the context during inference.
     */
    export interface ChunkMetadata {
      chunk_embedding_dimension?: number | null;

      chunk_embedding_model?: string | null;

      chunk_id?: string | null;

      chunk_tokenizer?: string | null;

      chunk_window?: string | null;

      content_token_count?: number | null;

      created_timestamp?: number | null;

      document_id?: string | null;

      metadata_token_count?: number | null;

      source?: string | null;

      updated_timestamp?: number | null;
    }
  }
}

export interface VectorIoInsertParams {
  chunks: Array<VectorIoInsertParams.Chunk>;

  vector_store_id: string;

  ttl_seconds?: number | null;
}

export namespace VectorIoInsertParams {
  /**
   * A chunk of content that can be inserted into a vector database.
   */
  export interface Chunk {
    chunk_id: string;

    /**
     * A image content item
     */
    content:
      | string
      | Chunk.ImageContentItemInput
      | Chunk.TextContentItem
      | Array<Chunk.ImageContentItemInput | Chunk.TextContentItem>;

    /**
     * `ChunkMetadata` is backend metadata for a `Chunk` that is used to store
     * additional information about the chunk that will not be used in the context
     * during inference, but is required for backend functionality. The `ChunkMetadata`
     * is set during chunk creation in `MemoryToolRuntimeImpl().insert()`and is not
     * expected to change after. Use `Chunk.metadata` for metadata that will be used in
     * the context during inference.
     */
    chunk_metadata?: Chunk.ChunkMetadata | null;

    embedding?: Array<number> | null;

    metadata?: { [key: string]: unknown };
  }

  export namespace Chunk {
    /**
     * A image content item
     */
    export interface ImageContentItemInput {
      /**
       * A URL or a base64 encoded string
       */
      image: ImageContentItemInput.Image;

      type?: 'image';
    }

    export namespace ImageContentItemInput {
      /**
       * A URL or a base64 encoded string
       */
      export interface Image {
        data?: string | null;

        /**
         * A URL reference to external content.
         */
        url?: Image.URL | null;
      }

      export namespace Image {
        /**
         * A URL reference to external content.
         */
        export interface URL {
          uri: string;
        }
      }
    }

    /**
     * A text content item
     */
    export interface TextContentItem {
      text: string;

      type?: 'text';
    }

    /**
     * A image content item
     */
    export interface ImageContentItemInput {
      /**
       * A URL or a base64 encoded string
       */
      image: ImageContentItemInput.Image;

      type?: 'image';
    }

    export namespace ImageContentItemInput {
      /**
       * A URL or a base64 encoded string
       */
      export interface Image {
        data?: string | null;

        /**
         * A URL reference to external content.
         */
        url?: Image.URL | null;
      }

      export namespace Image {
        /**
         * A URL reference to external content.
         */
        export interface URL {
          uri: string;
        }
      }
    }

    /**
     * A text content item
     */
    export interface TextContentItem {
      text: string;

      type?: 'text';
    }

    /**
     * `ChunkMetadata` is backend metadata for a `Chunk` that is used to store
     * additional information about the chunk that will not be used in the context
     * during inference, but is required for backend functionality. The `ChunkMetadata`
     * is set during chunk creation in `MemoryToolRuntimeImpl().insert()`and is not
     * expected to change after. Use `Chunk.metadata` for metadata that will be used in
     * the context during inference.
     */
    export interface ChunkMetadata {
      chunk_embedding_dimension?: number | null;

      chunk_embedding_model?: string | null;

      chunk_id?: string | null;

      chunk_tokenizer?: string | null;

      chunk_window?: string | null;

      content_token_count?: number | null;

      created_timestamp?: number | null;

      document_id?: string | null;

      metadata_token_count?: number | null;

      source?: string | null;

      updated_timestamp?: number | null;
    }
  }
}

export interface VectorIoQueryParams {
  /**
   * A image content item
   */
  query:
    | string
    | VectorIoQueryParams.ImageContentItemInput
    | VectorIoQueryParams.TextContentItem
    | Array<VectorIoQueryParams.ImageContentItemInput | VectorIoQueryParams.TextContentItem>;

  vector_store_id: string;

  params?: { [key: string]: unknown } | null;
}

export namespace VectorIoQueryParams {
  /**
   * A image content item
   */
  export interface ImageContentItemInput {
    /**
     * A URL or a base64 encoded string
     */
    image: ImageContentItemInput.Image;

    type?: 'image';
  }

  export namespace ImageContentItemInput {
    /**
     * A URL or a base64 encoded string
     */
    export interface Image {
      data?: string | null;

      /**
       * A URL reference to external content.
       */
      url?: Image.URL | null;
    }

    export namespace Image {
      /**
       * A URL reference to external content.
       */
      export interface URL {
        uri: string;
      }
    }
  }

  /**
   * A text content item
   */
  export interface TextContentItem {
    text: string;

    type?: 'text';
  }

  /**
   * A image content item
   */
  export interface ImageContentItemInput {
    /**
     * A URL or a base64 encoded string
     */
    image: ImageContentItemInput.Image;

    type?: 'image';
  }

  export namespace ImageContentItemInput {
    /**
     * A URL or a base64 encoded string
     */
    export interface Image {
      data?: string | null;

      /**
       * A URL reference to external content.
       */
      url?: Image.URL | null;
    }

    export namespace Image {
      /**
       * A URL reference to external content.
       */
      export interface URL {
        uri: string;
      }
    }
  }

  /**
   * A text content item
   */
  export interface TextContentItem {
    text: string;

    type?: 'text';
  }
}

export declare namespace VectorIo {
  export {
    type QueryChunksResponse as QueryChunksResponse,
    type VectorIoInsertParams as VectorIoInsertParams,
    type VectorIoQueryParams as VectorIoQueryParams,
  };
}
