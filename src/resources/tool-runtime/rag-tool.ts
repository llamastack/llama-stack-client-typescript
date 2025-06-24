// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InferenceAPI from '../inference';
import * as ToolRuntimeAPI from './tool-runtime';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class RagTool extends APIResource {
  /**
   * Index documents so they can be used by the RAG system
   */
  insertDocuments(body: RagToolInsertDocumentsParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/tool-runtime/rag-tool/insert', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Query the RAG system for context; typically invoked by the agent
   */
  queryContext(
    body: RagToolQueryContextParams,
    options?: RequestOptions,
  ): APIPromise<RagToolQueryContextResponse> {
    return this._client.post('/v1/tool-runtime/rag-tool/query', { body, ...options });
  }
}

export interface RagToolQueryContextResponse {
  metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * A image content item
   */
  content?: InferenceAPI.InterleavedContent;
}

export interface RagToolInsertDocumentsParams {
  chunk_size_in_tokens: number;

  documents: Array<RagToolInsertDocumentsParams.Document>;

  vector_db_id: string;
}

export namespace RagToolInsertDocumentsParams {
  /**
   * A document to be used for document ingestion in the RAG Tool.
   */
  export interface Document {
    /**
     * The content of the document.
     */
    content:
      | string
      | Document.ImageContentItem
      | Document.TextContentItem
      | Array<InferenceAPI.InterleavedContentItem>
      | ToolRuntimeAPI.URL;

    /**
     * The unique identifier for the document.
     */
    document_id: string;

    /**
     * Additional metadata for the document.
     */
    metadata: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

    /**
     * The MIME type of the document.
     */
    mime_type?: string;
  }

  export namespace Document {
    /**
     * A image content item
     */
    export interface ImageContentItem {
      /**
       * Image as a base64 encoded string or an URL
       */
      image: ImageContentItem.Image;

      /**
       * Discriminator type of the content item. Always "image"
       */
      type: 'image';
    }

    export namespace ImageContentItem {
      /**
       * Image as a base64 encoded string or an URL
       */
      export interface Image {
        /**
         * base64 encoded image data as string
         */
        data?: string;

        /**
         * A URL of the image or data URL in the format of data:image/{type};base64,{data}.
         * Note that URL could have length limits.
         */
        url?: ToolRuntimeAPI.URL;
      }
    }

    /**
     * A text content item
     */
    export interface TextContentItem {
      /**
       * Text content
       */
      text: string;

      /**
       * Discriminator type of the content item. Always "text"
       */
      type: 'text';
    }
  }
}

export interface RagToolQueryContextParams {
  /**
   * A image content item
   */
  content: InferenceAPI.InterleavedContent;

  vector_db_ids: Array<string>;

  query_config?: RagToolQueryContextParams.QueryConfig;
}

export namespace RagToolQueryContextParams {
  export interface QueryConfig {
    max_chunks: number;

    max_tokens_in_context: number;

    query_generator_config:
      | QueryConfig.DefaultRagQueryGeneratorConfig
      | QueryConfig.LlmragQueryGeneratorConfig;
  }

  export namespace QueryConfig {
    export interface DefaultRagQueryGeneratorConfig {
      separator: string;

      type: 'default';
    }

    export interface LlmragQueryGeneratorConfig {
      model: string;

      template: string;

      type: 'llm';
    }
  }
}

export declare namespace RagTool {
  export {
    type RagToolQueryContextResponse as RagToolQueryContextResponse,
    type RagToolInsertDocumentsParams as RagToolInsertDocumentsParams,
    type RagToolQueryContextParams as RagToolQueryContextParams,
  };
}
