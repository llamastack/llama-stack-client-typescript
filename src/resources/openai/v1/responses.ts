// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Responses extends APIResource {
  /**
   * Create a new OpenAI response.
   */
  create(body: ResponseCreateParams, options?: RequestOptions): APIPromise<OpenAIResponse> {
    return this._client.post('/v1/openai/v1/responses', { body, ...options });
  }

  /**
   * Retrieve an OpenAI response by its ID.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<OpenAIResponse> {
    return this._client.get(path`/v1/openai/v1/responses/${id}`, options);
  }
}

export interface OpenAIResponse {
  id: string;

  created_at: number;

  model: string;

  object: 'response';

  output: Array<
    OpenAIResponse.OpenAIResponseOutputMessage | OpenAIResponse.OpenAIResponseOutputMessageWebSearchToolCall
  >;

  parallel_tool_calls: boolean;

  status: string;

  error?: OpenAIResponse.Error;

  previous_response_id?: string;

  temperature?: number;

  top_p?: number;

  truncation?: string;

  user?: string;
}

export namespace OpenAIResponse {
  export interface OpenAIResponseOutputMessage {
    id: string;

    content: Array<OpenAIResponseOutputMessage.Content>;

    role: 'assistant';

    status: string;

    type: 'message';
  }

  export namespace OpenAIResponseOutputMessage {
    export interface Content {
      text: string;

      type: 'output_text';
    }
  }

  export interface OpenAIResponseOutputMessageWebSearchToolCall {
    id: string;

    status: string;

    type: 'web_search_call';
  }

  export interface Error {
    code: string;

    message: string;
  }
}

export interface ResponseCreateParams {
  /**
   * Input message(s) to create the response.
   */
  input: string | Array<ResponseCreateParams.UnionMember1>;

  /**
   * The underlying LLM used for completions.
   */
  model: string;

  /**
   * (Optional) if specified, the new response will be a continuation of the previous
   * response. This can be used to easily fork-off new responses from existing
   * responses.
   */
  previous_response_id?: string;

  store?: boolean;

  stream?: boolean;

  temperature?: number;

  tools?: Array<ResponseCreateParams.Tool>;
}

export namespace ResponseCreateParams {
  export interface UnionMember1 {
    content:
      | string
      | Array<
          | UnionMember1.OpenAIResponseInputMessageContentText
          | UnionMember1.OpenAIResponseInputMessageContentImage
        >;

    role: 'system' | 'developer' | 'user' | 'assistant';

    type?: 'message';
  }

  export namespace UnionMember1 {
    export interface OpenAIResponseInputMessageContentText {
      text: string;

      type: 'input_text';
    }

    export interface OpenAIResponseInputMessageContentImage {
      detail: 'low' | 'high' | 'auto';

      type: 'input_image';

      image_url?: string;
    }
  }

  export interface Tool {
    type: 'web_search' | 'web_search_preview_2025_03_11';

    search_context_size?: string;
  }
}

export declare namespace Responses {
  export { type OpenAIResponse as OpenAIResponse, type ResponseCreateParams as ResponseCreateParams };
}
