// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';

export class InputItems extends APIResource {
  /**
   * List input items for a given OpenAI response.
   */
  list(
    responseId: string,
    query?: InputItemListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<InputItemListResponse>;
  list(responseId: string, options?: Core.RequestOptions): Core.APIPromise<InputItemListResponse>;
  list(
    responseId: string,
    query: InputItemListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<InputItemListResponse> {
    if (isRequestOptions(query)) {
      return this.list(responseId, {}, query);
    }
    return this._client.get(`/v1/openai/v1/responses/${responseId}/input_items`, { query, ...options });
  }
}

export interface InputItemListResponse {
  data: Array<
    | InputItemListResponse.OpenAIResponseOutputMessageWebSearchToolCall
    | InputItemListResponse.OpenAIResponseOutputMessageFileSearchToolCall
    | InputItemListResponse.OpenAIResponseOutputMessageFunctionToolCall
    | InputItemListResponse.OpenAIResponseInputFunctionToolCallOutput
    | InputItemListResponse.OpenAIResponseMessage
  >;

  object: 'list';
}

export namespace InputItemListResponse {
  export interface OpenAIResponseOutputMessageWebSearchToolCall {
    id: string;

    status: string;

    type: 'web_search_call';
  }

  export interface OpenAIResponseOutputMessageFileSearchToolCall {
    id: string;

    queries: Array<string>;

    status: string;

    type: 'file_search_call';

    results?: Array<{ [key: string]: boolean | number | string | Array<unknown> | unknown | null }>;
  }

  export interface OpenAIResponseOutputMessageFunctionToolCall {
    arguments: string;

    call_id: string;

    name: string;

    type: 'function_call';

    id?: string;

    status?: string;
  }

  /**
   * This represents the output of a function call that gets passed back to the
   * model.
   */
  export interface OpenAIResponseInputFunctionToolCallOutput {
    call_id: string;

    output: string;

    type: 'function_call_output';

    id?: string;

    status?: string;
  }

  /**
   * Corresponds to the various Message types in the Responses API. They are all
   * under one type because the Responses API gives them all the same "type" value,
   * and there is no way to tell them apart in certain scenarios.
   */
  export interface OpenAIResponseMessage {
    content:
      | string
      | Array<
          | OpenAIResponseMessage.OpenAIResponseInputMessageContentText
          | OpenAIResponseMessage.OpenAIResponseInputMessageContentImage
        >
      | Array<OpenAIResponseMessage.UnionMember2>;

    role: 'system' | 'developer' | 'user' | 'assistant';

    type: 'message';

    id?: string;

    status?: string;
  }

  export namespace OpenAIResponseMessage {
    export interface OpenAIResponseInputMessageContentText {
      text: string;

      type: 'input_text';
    }

    export interface OpenAIResponseInputMessageContentImage {
      detail: 'low' | 'high' | 'auto';

      type: 'input_image';

      image_url?: string;
    }

    export interface UnionMember2 {
      annotations: Array<
        | UnionMember2.OpenAIResponseAnnotationFileCitation
        | UnionMember2.OpenAIResponseAnnotationCitation
        | UnionMember2.OpenAIResponseAnnotationContainerFileCitation
        | UnionMember2.OpenAIResponseAnnotationFilePath
      >;

      text: string;

      type: 'output_text';
    }

    export namespace UnionMember2 {
      export interface OpenAIResponseAnnotationFileCitation {
        file_id: string;

        filename: string;

        index: number;

        type: 'file_citation';
      }

      export interface OpenAIResponseAnnotationCitation {
        end_index: number;

        start_index: number;

        title: string;

        type: 'url_citation';

        url: string;
      }

      export interface OpenAIResponseAnnotationContainerFileCitation {
        container_id: string;

        end_index: number;

        file_id: string;

        filename: string;

        start_index: number;

        type: 'container_file_citation';
      }

      export interface OpenAIResponseAnnotationFilePath {
        file_id: string;

        index: number;

        type: 'file_path';
      }
    }
  }
}

export interface InputItemListParams {
  /**
   * An item ID to list items after, used for pagination.
   */
  after?: string;

  /**
   * An item ID to list items before, used for pagination.
   */
  before?: string;

  /**
   * Additional fields to include in the response.
   */
  include?: Array<string>;

  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and
   * 100, and the default is 20.
   */
  limit?: number;

  /**
   * The order to return the input items in. Default is desc.
   */
  order?: 'asc' | 'desc';
}

export declare namespace InputItems {
  export {
    type InputItemListResponse as InputItemListResponse,
    type InputItemListParams as InputItemListParams,
  };
}
