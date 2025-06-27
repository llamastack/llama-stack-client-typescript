// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import { APIPromise } from '../../core';
import * as Core from '../../core';
import * as ResponsesAPI from './responses';
import * as InputItemsAPI from './input-items';
import { InputItemListParams, InputItemListResponse, InputItems } from './input-items';
import { Stream } from '../../streaming';

export class Responses extends APIResource {
  inputItems: InputItemsAPI.InputItems = new InputItemsAPI.InputItems(this._client);

  /**
   * Create a new OpenAI response.
   */
  create(body: ResponseCreateParamsNonStreaming, options?: Core.RequestOptions): APIPromise<ResponseObject>;
  create(
    body: ResponseCreateParamsStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ResponseObjectStream>>;
  create(
    body: ResponseCreateParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<ResponseObjectStream> | ResponseObject>;
  create(
    body: ResponseCreateParams,
    options?: Core.RequestOptions,
  ): APIPromise<ResponseObject> | APIPromise<Stream<ResponseObjectStream>> {
    return this._client.post('/v1/openai/v1/responses', {
      body,
      ...options,
      stream: body.stream ?? false,
    }) as APIPromise<ResponseObject> | APIPromise<Stream<ResponseObjectStream>>;
  }

  /**
   * Retrieve an OpenAI response by its ID.
   */
  retrieve(responseId: string, options?: Core.RequestOptions): Core.APIPromise<ResponseObject> {
    return this._client.get(`/v1/openai/v1/responses/${responseId}`, options);
  }

  /**
   * List all OpenAI responses.
   */
  list(query?: ResponseListParams, options?: Core.RequestOptions): Core.APIPromise<ResponseListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<ResponseListResponse>;
  list(
    query: ResponseListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ResponseListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/v1/openai/v1/responses', { query, ...options });
  }
}

export interface ResponseObject {
  id: string;

  created_at: number;

  model: string;

  object: 'response';

  output: Array<
    | ResponseObject.OpenAIResponseMessage
    | ResponseObject.OpenAIResponseOutputMessageWebSearchToolCall
    | ResponseObject.OpenAIResponseOutputMessageFileSearchToolCall
    | ResponseObject.OpenAIResponseOutputMessageFunctionToolCall
    | ResponseObject.OpenAIResponseOutputMessageMcpCall
    | ResponseObject.OpenAIResponseOutputMessageMcpListTools
  >;

  parallel_tool_calls: boolean;

  status: string;

  text: ResponseObject.Text;

  error?: ResponseObject.Error;

  previous_response_id?: string;

  temperature?: number;

  top_p?: number;

  truncation?: string;

  user?: string;
}

export namespace ResponseObject {
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

  export interface OpenAIResponseOutputMessageMcpCall {
    id: string;

    arguments: string;

    name: string;

    server_label: string;

    type: 'mcp_call';

    error?: string;

    output?: string;
  }

  export interface OpenAIResponseOutputMessageMcpListTools {
    id: string;

    server_label: string;

    tools: Array<OpenAIResponseOutputMessageMcpListTools.Tool>;

    type: 'mcp_list_tools';
  }

  export namespace OpenAIResponseOutputMessageMcpListTools {
    export interface Tool {
      input_schema: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

      name: string;

      description?: string;
    }
  }

  export interface Text {
    /**
     * Configuration for Responses API text format.
     */
    format?: Text.Format;
  }

  export namespace Text {
    /**
     * Configuration for Responses API text format.
     */
    export interface Format {
      /**
       * Must be "text", "json_schema", or "json_object" to identify the format type
       */
      type: 'text' | 'json_schema' | 'json_object';

      /**
       * (Optional) A description of the response format. Only used for json_schema.
       */
      description?: string;

      /**
       * The name of the response format. Only used for json_schema.
       */
      name?: string;

      /**
       * The JSON schema the response should conform to. In a Python SDK, this is often a
       * `pydantic` model. Only used for json_schema.
       */
      schema?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

      /**
       * (Optional) Whether to strictly enforce the JSON schema. If true, the response
       * must match the schema exactly. Only used for json_schema.
       */
      strict?: boolean;
    }
  }

  export interface Error {
    code: string;

    message: string;
  }
}

export type ResponseObjectStream =
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseCreated
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseOutputItemAdded
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseOutputItemDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseOutputTextDelta
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseOutputTextDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseFunctionCallArgumentsDelta
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseFunctionCallArgumentsDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseWebSearchCallInProgress
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseWebSearchCallSearching
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseWebSearchCallCompleted
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpListToolsInProgress
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpListToolsFailed
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpListToolsCompleted
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpCallArgumentsDelta
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpCallArgumentsDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpCallInProgress
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpCallFailed
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseMcpCallCompleted
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseCompleted;

export namespace ResponseObjectStream {
  export interface OpenAIResponseObjectStreamResponseCreated {
    response: ResponsesAPI.ResponseObject;

    type: 'response.created';
  }

  export interface OpenAIResponseObjectStreamResponseOutputItemAdded {
    /**
     * Corresponds to the various Message types in the Responses API. They are all
     * under one type because the Responses API gives them all the same "type" value,
     * and there is no way to tell them apart in certain scenarios.
     */
    item:
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseMessage
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseOutputMessageWebSearchToolCall
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseOutputMessageFileSearchToolCall
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseOutputMessageFunctionToolCall
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseOutputMessageMcpCall
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseOutputMessageMcpListTools;

    output_index: number;

    response_id: string;

    sequence_number: number;

    type: 'response.output_item.added';
  }

  export namespace OpenAIResponseObjectStreamResponseOutputItemAdded {
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

    export interface OpenAIResponseOutputMessageMcpCall {
      id: string;

      arguments: string;

      name: string;

      server_label: string;

      type: 'mcp_call';

      error?: string;

      output?: string;
    }

    export interface OpenAIResponseOutputMessageMcpListTools {
      id: string;

      server_label: string;

      tools: Array<OpenAIResponseOutputMessageMcpListTools.Tool>;

      type: 'mcp_list_tools';
    }

    export namespace OpenAIResponseOutputMessageMcpListTools {
      export interface Tool {
        input_schema: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

        name: string;

        description?: string;
      }
    }
  }

  export interface OpenAIResponseObjectStreamResponseOutputItemDone {
    /**
     * Corresponds to the various Message types in the Responses API. They are all
     * under one type because the Responses API gives them all the same "type" value,
     * and there is no way to tell them apart in certain scenarios.
     */
    item:
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseMessage
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseOutputMessageWebSearchToolCall
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseOutputMessageFileSearchToolCall
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseOutputMessageFunctionToolCall
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseOutputMessageMcpCall
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseOutputMessageMcpListTools;

    output_index: number;

    response_id: string;

    sequence_number: number;

    type: 'response.output_item.done';
  }

  export namespace OpenAIResponseObjectStreamResponseOutputItemDone {
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

    export interface OpenAIResponseOutputMessageMcpCall {
      id: string;

      arguments: string;

      name: string;

      server_label: string;

      type: 'mcp_call';

      error?: string;

      output?: string;
    }

    export interface OpenAIResponseOutputMessageMcpListTools {
      id: string;

      server_label: string;

      tools: Array<OpenAIResponseOutputMessageMcpListTools.Tool>;

      type: 'mcp_list_tools';
    }

    export namespace OpenAIResponseOutputMessageMcpListTools {
      export interface Tool {
        input_schema: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

        name: string;

        description?: string;
      }
    }
  }

  export interface OpenAIResponseObjectStreamResponseOutputTextDelta {
    content_index: number;

    delta: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.output_text.delta';
  }

  export interface OpenAIResponseObjectStreamResponseOutputTextDone {
    content_index: number;

    item_id: string;

    output_index: number;

    sequence_number: number;

    text: string;

    type: 'response.output_text.done';
  }

  export interface OpenAIResponseObjectStreamResponseFunctionCallArgumentsDelta {
    delta: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.function_call_arguments.delta';
  }

  export interface OpenAIResponseObjectStreamResponseFunctionCallArgumentsDone {
    arguments: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.function_call_arguments.done';
  }

  export interface OpenAIResponseObjectStreamResponseWebSearchCallInProgress {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.web_search_call.in_progress';
  }

  export interface OpenAIResponseObjectStreamResponseWebSearchCallSearching {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.web_search_call.searching';
  }

  export interface OpenAIResponseObjectStreamResponseWebSearchCallCompleted {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.web_search_call.completed';
  }

  export interface OpenAIResponseObjectStreamResponseMcpListToolsInProgress {
    sequence_number: number;

    type: 'response.mcp_list_tools.in_progress';
  }

  export interface OpenAIResponseObjectStreamResponseMcpListToolsFailed {
    sequence_number: number;

    type: 'response.mcp_list_tools.failed';
  }

  export interface OpenAIResponseObjectStreamResponseMcpListToolsCompleted {
    sequence_number: number;

    type: 'response.mcp_list_tools.completed';
  }

  export interface OpenAIResponseObjectStreamResponseMcpCallArgumentsDelta {
    delta: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.mcp_call.arguments.delta';
  }

  export interface OpenAIResponseObjectStreamResponseMcpCallArgumentsDone {
    arguments: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.mcp_call.arguments.done';
  }

  export interface OpenAIResponseObjectStreamResponseMcpCallInProgress {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type: 'response.mcp_call.in_progress';
  }

  export interface OpenAIResponseObjectStreamResponseMcpCallFailed {
    sequence_number: number;

    type: 'response.mcp_call.failed';
  }

  export interface OpenAIResponseObjectStreamResponseMcpCallCompleted {
    sequence_number: number;

    type: 'response.mcp_call.completed';
  }

  export interface OpenAIResponseObjectStreamResponseCompleted {
    response: ResponsesAPI.ResponseObject;

    type: 'response.completed';
  }
}

export interface ResponseListResponse {
  data: Array<ResponseListResponse.Data>;

  first_id: string;

  has_more: boolean;

  last_id: string;

  object: 'list';
}

export namespace ResponseListResponse {
  export interface Data {
    id: string;

    created_at: number;

    input: Array<
      | Data.OpenAIResponseOutputMessageWebSearchToolCall
      | Data.OpenAIResponseOutputMessageFileSearchToolCall
      | Data.OpenAIResponseOutputMessageFunctionToolCall
      | Data.OpenAIResponseInputFunctionToolCallOutput
      | Data.OpenAIResponseMessage
    >;

    model: string;

    object: 'response';

    output: Array<
      | Data.OpenAIResponseMessage
      | Data.OpenAIResponseOutputMessageWebSearchToolCall
      | Data.OpenAIResponseOutputMessageFileSearchToolCall
      | Data.OpenAIResponseOutputMessageFunctionToolCall
      | Data.OpenAIResponseOutputMessageMcpCall
      | Data.OpenAIResponseOutputMessageMcpListTools
    >;

    parallel_tool_calls: boolean;

    status: string;

    text: Data.Text;

    error?: Data.Error;

    previous_response_id?: string;

    temperature?: number;

    top_p?: number;

    truncation?: string;

    user?: string;
  }

  export namespace Data {
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

    export interface OpenAIResponseOutputMessageMcpCall {
      id: string;

      arguments: string;

      name: string;

      server_label: string;

      type: 'mcp_call';

      error?: string;

      output?: string;
    }

    export interface OpenAIResponseOutputMessageMcpListTools {
      id: string;

      server_label: string;

      tools: Array<OpenAIResponseOutputMessageMcpListTools.Tool>;

      type: 'mcp_list_tools';
    }

    export namespace OpenAIResponseOutputMessageMcpListTools {
      export interface Tool {
        input_schema: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

        name: string;

        description?: string;
      }
    }

    export interface Text {
      /**
       * Configuration for Responses API text format.
       */
      format?: Text.Format;
    }

    export namespace Text {
      /**
       * Configuration for Responses API text format.
       */
      export interface Format {
        /**
         * Must be "text", "json_schema", or "json_object" to identify the format type
         */
        type: 'text' | 'json_schema' | 'json_object';

        /**
         * (Optional) A description of the response format. Only used for json_schema.
         */
        description?: string;

        /**
         * The name of the response format. Only used for json_schema.
         */
        name?: string;

        /**
         * The JSON schema the response should conform to. In a Python SDK, this is often a
         * `pydantic` model. Only used for json_schema.
         */
        schema?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

        /**
         * (Optional) Whether to strictly enforce the JSON schema. If true, the response
         * must match the schema exactly. Only used for json_schema.
         */
        strict?: boolean;
      }
    }

    export interface Error {
      code: string;

      message: string;
    }
  }
}

export type ResponseCreateParams = ResponseCreateParamsNonStreaming | ResponseCreateParamsStreaming;

export interface ResponseCreateParamsBase {
  /**
   * Input message(s) to create the response.
   */
  input:
    | string
    | Array<
        | ResponseCreateParams.OpenAIResponseOutputMessageWebSearchToolCall
        | ResponseCreateParams.OpenAIResponseOutputMessageFileSearchToolCall
        | ResponseCreateParams.OpenAIResponseOutputMessageFunctionToolCall
        | ResponseCreateParams.OpenAIResponseInputFunctionToolCallOutput
        | ResponseCreateParams.OpenAIResponseMessage
      >;

  /**
   * The underlying LLM used for completions.
   */
  model: string;

  instructions?: string;

  max_infer_iters?: number;

  /**
   * (Optional) if specified, the new response will be a continuation of the previous
   * response. This can be used to easily fork-off new responses from existing
   * responses.
   */
  previous_response_id?: string;

  store?: boolean;

  stream?: boolean;

  temperature?: number;

  text?: ResponseCreateParams.Text;

  tools?: Array<
    | ResponseCreateParams.OpenAIResponseInputToolWebSearch
    | ResponseCreateParams.OpenAIResponseInputToolFileSearch
    | ResponseCreateParams.OpenAIResponseInputToolFunction
    | ResponseCreateParams.OpenAIResponseInputToolMcp
  >;
}

export namespace ResponseCreateParams {
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

  export interface Text {
    /**
     * Configuration for Responses API text format.
     */
    format?: Text.Format;
  }

  export namespace Text {
    /**
     * Configuration for Responses API text format.
     */
    export interface Format {
      /**
       * Must be "text", "json_schema", or "json_object" to identify the format type
       */
      type: 'text' | 'json_schema' | 'json_object';

      /**
       * (Optional) A description of the response format. Only used for json_schema.
       */
      description?: string;

      /**
       * The name of the response format. Only used for json_schema.
       */
      name?: string;

      /**
       * The JSON schema the response should conform to. In a Python SDK, this is often a
       * `pydantic` model. Only used for json_schema.
       */
      schema?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

      /**
       * (Optional) Whether to strictly enforce the JSON schema. If true, the response
       * must match the schema exactly. Only used for json_schema.
       */
      strict?: boolean;
    }
  }

  export interface OpenAIResponseInputToolWebSearch {
    type: 'web_search' | 'web_search_preview' | 'web_search_preview_2025_03_11';

    search_context_size?: string;
  }

  export interface OpenAIResponseInputToolFileSearch {
    type: 'file_search';

    vector_store_ids: Array<string>;

    filters?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

    max_num_results?: number;

    ranking_options?: OpenAIResponseInputToolFileSearch.RankingOptions;
  }

  export namespace OpenAIResponseInputToolFileSearch {
    export interface RankingOptions {
      ranker?: string;

      score_threshold?: number;
    }
  }

  export interface OpenAIResponseInputToolFunction {
    name: string;

    type: 'function';

    description?: string;

    parameters?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

    strict?: boolean;
  }

  export interface OpenAIResponseInputToolMcp {
    require_approval: 'always' | 'never' | OpenAIResponseInputToolMcp.ApprovalFilter;

    server_label: string;

    server_url: string;

    type: 'mcp';

    allowed_tools?: Array<string> | OpenAIResponseInputToolMcp.AllowedToolsFilter;

    headers?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };
  }

  export namespace OpenAIResponseInputToolMcp {
    export interface ApprovalFilter {
      always?: Array<string>;

      never?: Array<string>;
    }

    export interface AllowedToolsFilter {
      tool_names?: Array<string>;
    }
  }

  export type ResponseCreateParamsNonStreaming = ResponsesAPI.ResponseCreateParamsNonStreaming;
  export type ResponseCreateParamsStreaming = ResponsesAPI.ResponseCreateParamsStreaming;
}

export interface ResponseCreateParamsNonStreaming extends ResponseCreateParamsBase {
  stream?: false;
}

export interface ResponseCreateParamsStreaming extends ResponseCreateParamsBase {
  stream: true;
}

export interface ResponseListParams {
  /**
   * The ID of the last response to return.
   */
  after?: string;

  /**
   * The number of responses to return.
   */
  limit?: number;

  /**
   * The model to filter responses by.
   */
  model?: string;

  /**
   * The order to sort responses by when sorted by created_at ('asc' or 'desc').
   */
  order?: 'asc' | 'desc';
}

Responses.InputItems = InputItems;

export declare namespace Responses {
  export {
    type ResponseObject as ResponseObject,
    type ResponseObjectStream as ResponseObjectStream,
    type ResponseListResponse as ResponseListResponse,
    type ResponseCreateParams as ResponseCreateParams,
    type ResponseCreateParamsNonStreaming as ResponseCreateParamsNonStreaming,
    type ResponseCreateParamsStreaming as ResponseCreateParamsStreaming,
    type ResponseListParams as ResponseListParams,
  };

  export {
    InputItems as InputItems,
    type InputItemListResponse as InputItemListResponse,
    type InputItemListParams as InputItemListParams,
  };
}
