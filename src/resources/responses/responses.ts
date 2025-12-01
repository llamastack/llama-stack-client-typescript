// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import { APIPromise } from '../../core';
import * as Core from '../../core';
import * as ResponsesAPI from './responses';
import * as InputItemsAPI from './input-items';
import { InputItemListParams, InputItemListResponse, InputItems } from './input-items';
import { OpenAICursorPage, type OpenAICursorPageParams } from '../../pagination';
import { Stream } from '../../streaming';

export class Responses extends APIResource {
  inputItems: InputItemsAPI.InputItems = new InputItemsAPI.InputItems(this._client);

  /**
   * Create a model response.
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
    return this._client.post('/v1/responses', { body, ...options, stream: body.stream ?? false }) as
      | APIPromise<ResponseObject>
      | APIPromise<Stream<ResponseObjectStream>>;
  }

  /**
   * Get a model response.
   */
  retrieve(responseId: string, options?: Core.RequestOptions): Core.APIPromise<ResponseObject> {
    return this._client.get(`/v1/responses/${responseId}`, options);
  }

  /**
   * List all responses.
   */
  list(
    query?: ResponseListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<ResponseListResponsesOpenAICursorPage, ResponseListResponse>;
  list(
    options?: Core.RequestOptions,
  ): Core.PagePromise<ResponseListResponsesOpenAICursorPage, ResponseListResponse>;
  list(
    query: ResponseListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<ResponseListResponsesOpenAICursorPage, ResponseListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/responses', ResponseListResponsesOpenAICursorPage, {
      query,
      ...options,
    });
  }

  /**
   * Delete a response.
   */
  delete(responseId: string, options?: Core.RequestOptions): Core.APIPromise<ResponseDeleteResponse> {
    return this._client.delete(`/v1/responses/${responseId}`, options);
  }
}

export class ResponseListResponsesOpenAICursorPage extends OpenAICursorPage<ResponseListResponse> {}

/**
 * Complete OpenAI response object containing generation results and metadata.
 */
export interface ResponseObject {
  id: string;

  created_at: number;

  model: string;

  output: Array<
    | ResponseObject.OpenAIResponseMessageOutput
    | ResponseObject.OpenAIResponseOutputMessageWebSearchToolCall
    | ResponseObject.OpenAIResponseOutputMessageFileSearchToolCall
    | ResponseObject.OpenAIResponseOutputMessageFunctionToolCall
    | ResponseObject.OpenAIResponseOutputMessageMcpCall
    | ResponseObject.OpenAIResponseOutputMessageMcpListTools
    | ResponseObject.OpenAIResponseMcpApprovalRequest
  >;

  status: string;

  /**
   * Error details for failed OpenAI response requests.
   */
  error?: ResponseObject.Error | null;

  instructions?: string | null;

  max_tool_calls?: number | null;

  metadata?: { [key: string]: string } | null;

  object?: 'response';

  parallel_tool_calls?: boolean | null;

  previous_response_id?: string | null;

  /**
   * OpenAI compatible Prompt object that is used in OpenAI responses.
   */
  prompt?: ResponseObject.Prompt | null;

  temperature?: number | null;

  /**
   * Text response configuration for OpenAI responses.
   */
  text?: ResponseObject.Text;

  tools?: Array<
    | ResponseObject.OpenAIResponseInputToolWebSearch
    | ResponseObject.OpenAIResponseInputToolFileSearch
    | ResponseObject.OpenAIResponseInputToolFunction
    | ResponseObject.OpenAIResponseToolMcp
  > | null;

  top_p?: number | null;

  truncation?: string | null;

  /**
   * Usage information for OpenAI response.
   */
  usage?: ResponseObject.Usage | null;
}

export namespace ResponseObject {
  /**
   * Corresponds to the various Message types in the Responses API. They are all
   * under one type because the Responses API gives them all the same "type" value,
   * and there is no way to tell them apart in certain scenarios.
   */
  export interface OpenAIResponseMessageOutput {
    content:
      | string
      | Array<
          | OpenAIResponseMessageOutput.OpenAIResponseInputMessageContentText
          | OpenAIResponseMessageOutput.OpenAIResponseInputMessageContentImage
          | OpenAIResponseMessageOutput.OpenAIResponseInputMessageContentFile
        >
      | Array<
          | OpenAIResponseMessageOutput.OpenAIResponseOutputMessageContentOutputText
          | OpenAIResponseMessageOutput.OpenAIResponseContentPartRefusal
        >;

    role: 'system' | 'developer' | 'user' | 'assistant';

    id?: string | null;

    status?: string | null;

    type?: 'message';
  }

  export namespace OpenAIResponseMessageOutput {
    /**
     * Text content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentText {
      text: string;

      type?: 'input_text';
    }

    /**
     * Image content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentImage {
      detail?: 'low' | 'high' | 'auto';

      file_id?: string | null;

      image_url?: string | null;

      type?: 'input_image';
    }

    /**
     * File content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentFile {
      file_data?: string | null;

      file_id?: string | null;

      file_url?: string | null;

      filename?: string | null;

      type?: 'input_file';
    }

    export interface OpenAIResponseOutputMessageContentOutputText {
      text: string;

      annotations?: Array<
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFileCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationContainerFileCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFilePath
      >;

      type?: 'output_text';
    }

    export namespace OpenAIResponseOutputMessageContentOutputText {
      /**
       * File citation annotation for referencing specific files in response content.
       */
      export interface OpenAIResponseAnnotationFileCitation {
        file_id: string;

        filename: string;

        index: number;

        type?: 'file_citation';
      }

      /**
       * URL citation annotation for referencing external web resources.
       */
      export interface OpenAIResponseAnnotationCitation {
        end_index: number;

        start_index: number;

        title: string;

        url: string;

        type?: 'url_citation';
      }

      export interface OpenAIResponseAnnotationContainerFileCitation {
        container_id: string;

        end_index: number;

        file_id: string;

        filename: string;

        start_index: number;

        type?: 'container_file_citation';
      }

      export interface OpenAIResponseAnnotationFilePath {
        file_id: string;

        index: number;

        type?: 'file_path';
      }
    }

    /**
     * Refusal content within a streamed response part.
     */
    export interface OpenAIResponseContentPartRefusal {
      refusal: string;

      type?: 'refusal';
    }
  }

  /**
   * Web search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageWebSearchToolCall {
    id: string;

    status: string;

    type?: 'web_search_call';
  }

  /**
   * File search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFileSearchToolCall {
    id: string;

    queries: Array<string>;

    status: string;

    results?: Array<OpenAIResponseOutputMessageFileSearchToolCall.Result> | null;

    type?: 'file_search_call';
  }

  export namespace OpenAIResponseOutputMessageFileSearchToolCall {
    /**
     * Search results returned by the file search operation.
     */
    export interface Result {
      attributes: { [key: string]: unknown };

      file_id: string;

      filename: string;

      score: number;

      text: string;
    }
  }

  /**
   * Function tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFunctionToolCall {
    arguments: string;

    call_id: string;

    name: string;

    id?: string | null;

    status?: string | null;

    type?: 'function_call';
  }

  /**
   * Model Context Protocol (MCP) call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageMcpCall {
    id: string;

    arguments: string;

    name: string;

    server_label: string;

    error?: string | null;

    output?: string | null;

    type?: 'mcp_call';
  }

  /**
   * MCP list tools output message containing available tools from an MCP server.
   */
  export interface OpenAIResponseOutputMessageMcpListTools {
    id: string;

    server_label: string;

    tools: Array<OpenAIResponseOutputMessageMcpListTools.Tool>;

    type?: 'mcp_list_tools';
  }

  export namespace OpenAIResponseOutputMessageMcpListTools {
    /**
     * Tool definition returned by MCP list tools operation.
     */
    export interface Tool {
      input_schema: { [key: string]: unknown };

      name: string;

      description?: string | null;
    }
  }

  /**
   * A request for human approval of a tool invocation.
   */
  export interface OpenAIResponseMcpApprovalRequest {
    id: string;

    arguments: string;

    name: string;

    server_label: string;

    type?: 'mcp_approval_request';
  }

  /**
   * Error details for failed OpenAI response requests.
   */
  export interface Error {
    code: string;

    message: string;
  }

  /**
   * OpenAI compatible Prompt object that is used in OpenAI responses.
   */
  export interface Prompt {
    id: string;

    variables?: {
      [key: string]:
        | Prompt.OpenAIResponseInputMessageContentText
        | Prompt.OpenAIResponseInputMessageContentImage
        | Prompt.OpenAIResponseInputMessageContentFile;
    } | null;

    version?: string | null;
  }

  export namespace Prompt {
    /**
     * Text content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentText {
      text: string;

      type?: 'input_text';
    }

    /**
     * Image content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentImage {
      detail?: 'low' | 'high' | 'auto';

      file_id?: string | null;

      image_url?: string | null;

      type?: 'input_image';
    }

    /**
     * File content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentFile {
      file_data?: string | null;

      file_id?: string | null;

      file_url?: string | null;

      filename?: string | null;

      type?: 'input_file';
    }
  }

  /**
   * Text response configuration for OpenAI responses.
   */
  export interface Text {
    /**
     * Configuration for Responses API text format.
     */
    format?: Text.Format | null;
  }

  export namespace Text {
    /**
     * Configuration for Responses API text format.
     */
    export interface Format {
      description?: string | null;

      name?: string | null;

      schema?: { [key: string]: unknown } | null;

      strict?: boolean | null;

      type?: 'text' | 'json_schema' | 'json_object';
    }
  }

  /**
   * Web search tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolWebSearch {
    search_context_size?: string | null;

    type?: 'web_search' | 'web_search_preview' | 'web_search_preview_2025_03_11' | 'web_search_2025_08_26';
  }

  /**
   * File search tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolFileSearch {
    vector_store_ids: Array<string>;

    filters?: { [key: string]: unknown } | null;

    max_num_results?: number | null;

    /**
     * Options for ranking and filtering search results.
     */
    ranking_options?: OpenAIResponseInputToolFileSearch.RankingOptions | null;

    type?: 'file_search';
  }

  export namespace OpenAIResponseInputToolFileSearch {
    /**
     * Options for ranking and filtering search results.
     */
    export interface RankingOptions {
      ranker?: string | null;

      score_threshold?: number | null;
    }
  }

  /**
   * Function tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolFunction {
    name: string;

    parameters: { [key: string]: unknown } | null;

    description?: string | null;

    strict?: boolean | null;

    type?: 'function';
  }

  /**
   * Model Context Protocol (MCP) tool configuration for OpenAI response object.
   */
  export interface OpenAIResponseToolMcp {
    server_label: string;

    /**
     * Filter configuration for restricting which MCP tools can be used.
     */
    allowed_tools?: Array<string> | OpenAIResponseToolMcp.AllowedToolsFilter | null;

    type?: 'mcp';
  }

  export namespace OpenAIResponseToolMcp {
    /**
     * Filter configuration for restricting which MCP tools can be used.
     */
    export interface AllowedToolsFilter {
      tool_names?: Array<string> | null;
    }
  }

  /**
   * Usage information for OpenAI response.
   */
  export interface Usage {
    input_tokens: number;

    output_tokens: number;

    total_tokens: number;

    /**
     * Token details for input tokens in OpenAI response usage.
     */
    input_tokens_details?: Usage.InputTokensDetails | null;

    /**
     * Token details for output tokens in OpenAI response usage.
     */
    output_tokens_details?: Usage.OutputTokensDetails | null;
  }

  export namespace Usage {
    /**
     * Token details for input tokens in OpenAI response usage.
     */
    export interface InputTokensDetails {
      cached_tokens?: number | null;
    }

    /**
     * Token details for output tokens in OpenAI response usage.
     */
    export interface OutputTokensDetails {
      reasoning_tokens?: number | null;
    }
  }
}

/**
 * Streaming event indicating a new response has been created.
 */
export type ResponseObjectStream =
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseCreated
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseInProgress
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
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseContentPartAdded
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseContentPartDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseReasoningTextDelta
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseReasoningTextDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseReasoningSummaryPartAdded
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseReasoningSummaryPartDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseReasoningSummaryTextDelta
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseReasoningSummaryTextDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseRefusalDelta
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseRefusalDone
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseOutputTextAnnotationAdded
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseFileSearchCallInProgress
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseFileSearchCallSearching
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseFileSearchCallCompleted
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseIncomplete
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseFailed
  | ResponseObjectStream.OpenAIResponseObjectStreamResponseCompleted;

export namespace ResponseObjectStream {
  /**
   * Streaming event indicating a new response has been created.
   */
  export interface OpenAIResponseObjectStreamResponseCreated {
    /**
     * Complete OpenAI response object containing generation results and metadata.
     */
    response: ResponsesAPI.ResponseObject;

    type?: 'response.created';
  }

  /**
   * Streaming event indicating the response remains in progress.
   */
  export interface OpenAIResponseObjectStreamResponseInProgress {
    /**
     * Complete OpenAI response object containing generation results and metadata.
     */
    response: ResponsesAPI.ResponseObject;

    sequence_number: number;

    type?: 'response.in_progress';
  }

  /**
   * Streaming event for when a new output item is added to the response.
   */
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
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseOutputMessageMcpListTools
      | OpenAIResponseObjectStreamResponseOutputItemAdded.OpenAIResponseMcpApprovalRequest;

    output_index: number;

    response_id: string;

    sequence_number: number;

    type?: 'response.output_item.added';
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
            | OpenAIResponseMessage.OpenAIResponseInputMessageContentFile
          >
        | Array<
            | OpenAIResponseMessage.OpenAIResponseOutputMessageContentOutputText
            | OpenAIResponseMessage.OpenAIResponseContentPartRefusal
          >;

      role: 'system' | 'developer' | 'user' | 'assistant';

      id?: string | null;

      status?: string | null;

      type?: 'message';
    }

    export namespace OpenAIResponseMessage {
      /**
       * Text content for input messages in OpenAI response format.
       */
      export interface OpenAIResponseInputMessageContentText {
        text: string;

        type?: 'input_text';
      }

      /**
       * Image content for input messages in OpenAI response format.
       */
      export interface OpenAIResponseInputMessageContentImage {
        detail?: 'low' | 'high' | 'auto';

        file_id?: string | null;

        image_url?: string | null;

        type?: 'input_image';
      }

      /**
       * File content for input messages in OpenAI response format.
       */
      export interface OpenAIResponseInputMessageContentFile {
        file_data?: string | null;

        file_id?: string | null;

        file_url?: string | null;

        filename?: string | null;

        type?: 'input_file';
      }

      export interface OpenAIResponseOutputMessageContentOutputText {
        text: string;

        annotations?: Array<
          | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFileCitation
          | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationCitation
          | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationContainerFileCitation
          | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFilePath
        >;

        type?: 'output_text';
      }

      export namespace OpenAIResponseOutputMessageContentOutputText {
        /**
         * File citation annotation for referencing specific files in response content.
         */
        export interface OpenAIResponseAnnotationFileCitation {
          file_id: string;

          filename: string;

          index: number;

          type?: 'file_citation';
        }

        /**
         * URL citation annotation for referencing external web resources.
         */
        export interface OpenAIResponseAnnotationCitation {
          end_index: number;

          start_index: number;

          title: string;

          url: string;

          type?: 'url_citation';
        }

        export interface OpenAIResponseAnnotationContainerFileCitation {
          container_id: string;

          end_index: number;

          file_id: string;

          filename: string;

          start_index: number;

          type?: 'container_file_citation';
        }

        export interface OpenAIResponseAnnotationFilePath {
          file_id: string;

          index: number;

          type?: 'file_path';
        }
      }

      /**
       * Refusal content within a streamed response part.
       */
      export interface OpenAIResponseContentPartRefusal {
        refusal: string;

        type?: 'refusal';
      }
    }

    /**
     * Web search tool call output message for OpenAI responses.
     */
    export interface OpenAIResponseOutputMessageWebSearchToolCall {
      id: string;

      status: string;

      type?: 'web_search_call';
    }

    /**
     * File search tool call output message for OpenAI responses.
     */
    export interface OpenAIResponseOutputMessageFileSearchToolCall {
      id: string;

      queries: Array<string>;

      status: string;

      results?: Array<OpenAIResponseOutputMessageFileSearchToolCall.Result> | null;

      type?: 'file_search_call';
    }

    export namespace OpenAIResponseOutputMessageFileSearchToolCall {
      /**
       * Search results returned by the file search operation.
       */
      export interface Result {
        attributes: { [key: string]: unknown };

        file_id: string;

        filename: string;

        score: number;

        text: string;
      }
    }

    /**
     * Function tool call output message for OpenAI responses.
     */
    export interface OpenAIResponseOutputMessageFunctionToolCall {
      arguments: string;

      call_id: string;

      name: string;

      id?: string | null;

      status?: string | null;

      type?: 'function_call';
    }

    /**
     * Model Context Protocol (MCP) call output message for OpenAI responses.
     */
    export interface OpenAIResponseOutputMessageMcpCall {
      id: string;

      arguments: string;

      name: string;

      server_label: string;

      error?: string | null;

      output?: string | null;

      type?: 'mcp_call';
    }

    /**
     * MCP list tools output message containing available tools from an MCP server.
     */
    export interface OpenAIResponseOutputMessageMcpListTools {
      id: string;

      server_label: string;

      tools: Array<OpenAIResponseOutputMessageMcpListTools.Tool>;

      type?: 'mcp_list_tools';
    }

    export namespace OpenAIResponseOutputMessageMcpListTools {
      /**
       * Tool definition returned by MCP list tools operation.
       */
      export interface Tool {
        input_schema: { [key: string]: unknown };

        name: string;

        description?: string | null;
      }
    }

    /**
     * A request for human approval of a tool invocation.
     */
    export interface OpenAIResponseMcpApprovalRequest {
      id: string;

      arguments: string;

      name: string;

      server_label: string;

      type?: 'mcp_approval_request';
    }
  }

  /**
   * Streaming event for when an output item is completed.
   */
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
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseOutputMessageMcpListTools
      | OpenAIResponseObjectStreamResponseOutputItemDone.OpenAIResponseMcpApprovalRequest;

    output_index: number;

    response_id: string;

    sequence_number: number;

    type?: 'response.output_item.done';
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
            | OpenAIResponseMessage.OpenAIResponseInputMessageContentFile
          >
        | Array<
            | OpenAIResponseMessage.OpenAIResponseOutputMessageContentOutputText
            | OpenAIResponseMessage.OpenAIResponseContentPartRefusal
          >;

      role: 'system' | 'developer' | 'user' | 'assistant';

      id?: string | null;

      status?: string | null;

      type?: 'message';
    }

    export namespace OpenAIResponseMessage {
      /**
       * Text content for input messages in OpenAI response format.
       */
      export interface OpenAIResponseInputMessageContentText {
        text: string;

        type?: 'input_text';
      }

      /**
       * Image content for input messages in OpenAI response format.
       */
      export interface OpenAIResponseInputMessageContentImage {
        detail?: 'low' | 'high' | 'auto';

        file_id?: string | null;

        image_url?: string | null;

        type?: 'input_image';
      }

      /**
       * File content for input messages in OpenAI response format.
       */
      export interface OpenAIResponseInputMessageContentFile {
        file_data?: string | null;

        file_id?: string | null;

        file_url?: string | null;

        filename?: string | null;

        type?: 'input_file';
      }

      export interface OpenAIResponseOutputMessageContentOutputText {
        text: string;

        annotations?: Array<
          | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFileCitation
          | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationCitation
          | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationContainerFileCitation
          | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFilePath
        >;

        type?: 'output_text';
      }

      export namespace OpenAIResponseOutputMessageContentOutputText {
        /**
         * File citation annotation for referencing specific files in response content.
         */
        export interface OpenAIResponseAnnotationFileCitation {
          file_id: string;

          filename: string;

          index: number;

          type?: 'file_citation';
        }

        /**
         * URL citation annotation for referencing external web resources.
         */
        export interface OpenAIResponseAnnotationCitation {
          end_index: number;

          start_index: number;

          title: string;

          url: string;

          type?: 'url_citation';
        }

        export interface OpenAIResponseAnnotationContainerFileCitation {
          container_id: string;

          end_index: number;

          file_id: string;

          filename: string;

          start_index: number;

          type?: 'container_file_citation';
        }

        export interface OpenAIResponseAnnotationFilePath {
          file_id: string;

          index: number;

          type?: 'file_path';
        }
      }

      /**
       * Refusal content within a streamed response part.
       */
      export interface OpenAIResponseContentPartRefusal {
        refusal: string;

        type?: 'refusal';
      }
    }

    /**
     * Web search tool call output message for OpenAI responses.
     */
    export interface OpenAIResponseOutputMessageWebSearchToolCall {
      id: string;

      status: string;

      type?: 'web_search_call';
    }

    /**
     * File search tool call output message for OpenAI responses.
     */
    export interface OpenAIResponseOutputMessageFileSearchToolCall {
      id: string;

      queries: Array<string>;

      status: string;

      results?: Array<OpenAIResponseOutputMessageFileSearchToolCall.Result> | null;

      type?: 'file_search_call';
    }

    export namespace OpenAIResponseOutputMessageFileSearchToolCall {
      /**
       * Search results returned by the file search operation.
       */
      export interface Result {
        attributes: { [key: string]: unknown };

        file_id: string;

        filename: string;

        score: number;

        text: string;
      }
    }

    /**
     * Function tool call output message for OpenAI responses.
     */
    export interface OpenAIResponseOutputMessageFunctionToolCall {
      arguments: string;

      call_id: string;

      name: string;

      id?: string | null;

      status?: string | null;

      type?: 'function_call';
    }

    /**
     * Model Context Protocol (MCP) call output message for OpenAI responses.
     */
    export interface OpenAIResponseOutputMessageMcpCall {
      id: string;

      arguments: string;

      name: string;

      server_label: string;

      error?: string | null;

      output?: string | null;

      type?: 'mcp_call';
    }

    /**
     * MCP list tools output message containing available tools from an MCP server.
     */
    export interface OpenAIResponseOutputMessageMcpListTools {
      id: string;

      server_label: string;

      tools: Array<OpenAIResponseOutputMessageMcpListTools.Tool>;

      type?: 'mcp_list_tools';
    }

    export namespace OpenAIResponseOutputMessageMcpListTools {
      /**
       * Tool definition returned by MCP list tools operation.
       */
      export interface Tool {
        input_schema: { [key: string]: unknown };

        name: string;

        description?: string | null;
      }
    }

    /**
     * A request for human approval of a tool invocation.
     */
    export interface OpenAIResponseMcpApprovalRequest {
      id: string;

      arguments: string;

      name: string;

      server_label: string;

      type?: 'mcp_approval_request';
    }
  }

  /**
   * Streaming event for incremental text content updates.
   */
  export interface OpenAIResponseObjectStreamResponseOutputTextDelta {
    content_index: number;

    delta: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.output_text.delta';
  }

  /**
   * Streaming event for when text output is completed.
   */
  export interface OpenAIResponseObjectStreamResponseOutputTextDone {
    content_index: number;

    item_id: string;

    output_index: number;

    sequence_number: number;

    text: string;

    type?: 'response.output_text.done';
  }

  /**
   * Streaming event for incremental function call argument updates.
   */
  export interface OpenAIResponseObjectStreamResponseFunctionCallArgumentsDelta {
    delta: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.function_call_arguments.delta';
  }

  /**
   * Streaming event for when function call arguments are completed.
   */
  export interface OpenAIResponseObjectStreamResponseFunctionCallArgumentsDone {
    arguments: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.function_call_arguments.done';
  }

  /**
   * Streaming event for web search calls in progress.
   */
  export interface OpenAIResponseObjectStreamResponseWebSearchCallInProgress {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.web_search_call.in_progress';
  }

  export interface OpenAIResponseObjectStreamResponseWebSearchCallSearching {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.web_search_call.searching';
  }

  /**
   * Streaming event for completed web search calls.
   */
  export interface OpenAIResponseObjectStreamResponseWebSearchCallCompleted {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.web_search_call.completed';
  }

  export interface OpenAIResponseObjectStreamResponseMcpListToolsInProgress {
    sequence_number: number;

    type?: 'response.mcp_list_tools.in_progress';
  }

  export interface OpenAIResponseObjectStreamResponseMcpListToolsFailed {
    sequence_number: number;

    type?: 'response.mcp_list_tools.failed';
  }

  export interface OpenAIResponseObjectStreamResponseMcpListToolsCompleted {
    sequence_number: number;

    type?: 'response.mcp_list_tools.completed';
  }

  export interface OpenAIResponseObjectStreamResponseMcpCallArgumentsDelta {
    delta: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.mcp_call.arguments.delta';
  }

  export interface OpenAIResponseObjectStreamResponseMcpCallArgumentsDone {
    arguments: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.mcp_call.arguments.done';
  }

  /**
   * Streaming event for MCP calls in progress.
   */
  export interface OpenAIResponseObjectStreamResponseMcpCallInProgress {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.mcp_call.in_progress';
  }

  /**
   * Streaming event for failed MCP calls.
   */
  export interface OpenAIResponseObjectStreamResponseMcpCallFailed {
    sequence_number: number;

    type?: 'response.mcp_call.failed';
  }

  /**
   * Streaming event for completed MCP calls.
   */
  export interface OpenAIResponseObjectStreamResponseMcpCallCompleted {
    sequence_number: number;

    type?: 'response.mcp_call.completed';
  }

  /**
   * Streaming event for when a new content part is added to a response item.
   */
  export interface OpenAIResponseObjectStreamResponseContentPartAdded {
    content_index: number;

    item_id: string;

    output_index: number;

    /**
     * Text content within a streamed response part.
     */
    part:
      | OpenAIResponseObjectStreamResponseContentPartAdded.OpenAIResponseContentPartOutputText
      | OpenAIResponseObjectStreamResponseContentPartAdded.OpenAIResponseContentPartRefusal
      | OpenAIResponseObjectStreamResponseContentPartAdded.OpenAIResponseContentPartReasoningText;

    response_id: string;

    sequence_number: number;

    type?: 'response.content_part.added';
  }

  export namespace OpenAIResponseObjectStreamResponseContentPartAdded {
    /**
     * Text content within a streamed response part.
     */
    export interface OpenAIResponseContentPartOutputText {
      text: string;

      annotations?: Array<
        | OpenAIResponseContentPartOutputText.OpenAIResponseAnnotationFileCitation
        | OpenAIResponseContentPartOutputText.OpenAIResponseAnnotationCitation
        | OpenAIResponseContentPartOutputText.OpenAIResponseAnnotationContainerFileCitation
        | OpenAIResponseContentPartOutputText.OpenAIResponseAnnotationFilePath
      >;

      logprobs?: Array<{ [key: string]: unknown }> | null;

      type?: 'output_text';
    }

    export namespace OpenAIResponseContentPartOutputText {
      /**
       * File citation annotation for referencing specific files in response content.
       */
      export interface OpenAIResponseAnnotationFileCitation {
        file_id: string;

        filename: string;

        index: number;

        type?: 'file_citation';
      }

      /**
       * URL citation annotation for referencing external web resources.
       */
      export interface OpenAIResponseAnnotationCitation {
        end_index: number;

        start_index: number;

        title: string;

        url: string;

        type?: 'url_citation';
      }

      export interface OpenAIResponseAnnotationContainerFileCitation {
        container_id: string;

        end_index: number;

        file_id: string;

        filename: string;

        start_index: number;

        type?: 'container_file_citation';
      }

      export interface OpenAIResponseAnnotationFilePath {
        file_id: string;

        index: number;

        type?: 'file_path';
      }
    }

    /**
     * Refusal content within a streamed response part.
     */
    export interface OpenAIResponseContentPartRefusal {
      refusal: string;

      type?: 'refusal';
    }

    /**
     * Reasoning text emitted as part of a streamed response.
     */
    export interface OpenAIResponseContentPartReasoningText {
      text: string;

      type?: 'reasoning_text';
    }
  }

  /**
   * Streaming event for when a content part is completed.
   */
  export interface OpenAIResponseObjectStreamResponseContentPartDone {
    content_index: number;

    item_id: string;

    output_index: number;

    /**
     * Text content within a streamed response part.
     */
    part:
      | OpenAIResponseObjectStreamResponseContentPartDone.OpenAIResponseContentPartOutputText
      | OpenAIResponseObjectStreamResponseContentPartDone.OpenAIResponseContentPartRefusal
      | OpenAIResponseObjectStreamResponseContentPartDone.OpenAIResponseContentPartReasoningText;

    response_id: string;

    sequence_number: number;

    type?: 'response.content_part.done';
  }

  export namespace OpenAIResponseObjectStreamResponseContentPartDone {
    /**
     * Text content within a streamed response part.
     */
    export interface OpenAIResponseContentPartOutputText {
      text: string;

      annotations?: Array<
        | OpenAIResponseContentPartOutputText.OpenAIResponseAnnotationFileCitation
        | OpenAIResponseContentPartOutputText.OpenAIResponseAnnotationCitation
        | OpenAIResponseContentPartOutputText.OpenAIResponseAnnotationContainerFileCitation
        | OpenAIResponseContentPartOutputText.OpenAIResponseAnnotationFilePath
      >;

      logprobs?: Array<{ [key: string]: unknown }> | null;

      type?: 'output_text';
    }

    export namespace OpenAIResponseContentPartOutputText {
      /**
       * File citation annotation for referencing specific files in response content.
       */
      export interface OpenAIResponseAnnotationFileCitation {
        file_id: string;

        filename: string;

        index: number;

        type?: 'file_citation';
      }

      /**
       * URL citation annotation for referencing external web resources.
       */
      export interface OpenAIResponseAnnotationCitation {
        end_index: number;

        start_index: number;

        title: string;

        url: string;

        type?: 'url_citation';
      }

      export interface OpenAIResponseAnnotationContainerFileCitation {
        container_id: string;

        end_index: number;

        file_id: string;

        filename: string;

        start_index: number;

        type?: 'container_file_citation';
      }

      export interface OpenAIResponseAnnotationFilePath {
        file_id: string;

        index: number;

        type?: 'file_path';
      }
    }

    /**
     * Refusal content within a streamed response part.
     */
    export interface OpenAIResponseContentPartRefusal {
      refusal: string;

      type?: 'refusal';
    }

    /**
     * Reasoning text emitted as part of a streamed response.
     */
    export interface OpenAIResponseContentPartReasoningText {
      text: string;

      type?: 'reasoning_text';
    }
  }

  /**
   * Streaming event for incremental reasoning text updates.
   */
  export interface OpenAIResponseObjectStreamResponseReasoningTextDelta {
    content_index: number;

    delta: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.reasoning_text.delta';
  }

  /**
   * Streaming event for when reasoning text is completed.
   */
  export interface OpenAIResponseObjectStreamResponseReasoningTextDone {
    content_index: number;

    item_id: string;

    output_index: number;

    sequence_number: number;

    text: string;

    type?: 'response.reasoning_text.done';
  }

  /**
   * Streaming event for when a new reasoning summary part is added.
   */
  export interface OpenAIResponseObjectStreamResponseReasoningSummaryPartAdded {
    item_id: string;

    output_index: number;

    /**
     * Reasoning summary part in a streamed response.
     */
    part: OpenAIResponseObjectStreamResponseReasoningSummaryPartAdded.Part;

    sequence_number: number;

    summary_index: number;

    type?: 'response.reasoning_summary_part.added';
  }

  export namespace OpenAIResponseObjectStreamResponseReasoningSummaryPartAdded {
    /**
     * Reasoning summary part in a streamed response.
     */
    export interface Part {
      text: string;

      type?: 'summary_text';
    }
  }

  /**
   * Streaming event for when a reasoning summary part is completed.
   */
  export interface OpenAIResponseObjectStreamResponseReasoningSummaryPartDone {
    item_id: string;

    output_index: number;

    /**
     * Reasoning summary part in a streamed response.
     */
    part: OpenAIResponseObjectStreamResponseReasoningSummaryPartDone.Part;

    sequence_number: number;

    summary_index: number;

    type?: 'response.reasoning_summary_part.done';
  }

  export namespace OpenAIResponseObjectStreamResponseReasoningSummaryPartDone {
    /**
     * Reasoning summary part in a streamed response.
     */
    export interface Part {
      text: string;

      type?: 'summary_text';
    }
  }

  /**
   * Streaming event for incremental reasoning summary text updates.
   */
  export interface OpenAIResponseObjectStreamResponseReasoningSummaryTextDelta {
    delta: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    summary_index: number;

    type?: 'response.reasoning_summary_text.delta';
  }

  /**
   * Streaming event for when reasoning summary text is completed.
   */
  export interface OpenAIResponseObjectStreamResponseReasoningSummaryTextDone {
    item_id: string;

    output_index: number;

    sequence_number: number;

    summary_index: number;

    text: string;

    type?: 'response.reasoning_summary_text.done';
  }

  /**
   * Streaming event for incremental refusal text updates.
   */
  export interface OpenAIResponseObjectStreamResponseRefusalDelta {
    content_index: number;

    delta: string;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.refusal.delta';
  }

  /**
   * Streaming event for when refusal text is completed.
   */
  export interface OpenAIResponseObjectStreamResponseRefusalDone {
    content_index: number;

    item_id: string;

    output_index: number;

    refusal: string;

    sequence_number: number;

    type?: 'response.refusal.done';
  }

  /**
   * Streaming event for when an annotation is added to output text.
   */
  export interface OpenAIResponseObjectStreamResponseOutputTextAnnotationAdded {
    /**
     * File citation annotation for referencing specific files in response content.
     */
    annotation:
      | OpenAIResponseObjectStreamResponseOutputTextAnnotationAdded.OpenAIResponseAnnotationFileCitation
      | OpenAIResponseObjectStreamResponseOutputTextAnnotationAdded.OpenAIResponseAnnotationCitation
      | OpenAIResponseObjectStreamResponseOutputTextAnnotationAdded.OpenAIResponseAnnotationContainerFileCitation
      | OpenAIResponseObjectStreamResponseOutputTextAnnotationAdded.OpenAIResponseAnnotationFilePath;

    annotation_index: number;

    content_index: number;

    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.output_text.annotation.added';
  }

  export namespace OpenAIResponseObjectStreamResponseOutputTextAnnotationAdded {
    /**
     * File citation annotation for referencing specific files in response content.
     */
    export interface OpenAIResponseAnnotationFileCitation {
      file_id: string;

      filename: string;

      index: number;

      type?: 'file_citation';
    }

    /**
     * URL citation annotation for referencing external web resources.
     */
    export interface OpenAIResponseAnnotationCitation {
      end_index: number;

      start_index: number;

      title: string;

      url: string;

      type?: 'url_citation';
    }

    export interface OpenAIResponseAnnotationContainerFileCitation {
      container_id: string;

      end_index: number;

      file_id: string;

      filename: string;

      start_index: number;

      type?: 'container_file_citation';
    }

    export interface OpenAIResponseAnnotationFilePath {
      file_id: string;

      index: number;

      type?: 'file_path';
    }
  }

  /**
   * Streaming event for file search calls in progress.
   */
  export interface OpenAIResponseObjectStreamResponseFileSearchCallInProgress {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.file_search_call.in_progress';
  }

  /**
   * Streaming event for file search currently searching.
   */
  export interface OpenAIResponseObjectStreamResponseFileSearchCallSearching {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.file_search_call.searching';
  }

  /**
   * Streaming event for completed file search calls.
   */
  export interface OpenAIResponseObjectStreamResponseFileSearchCallCompleted {
    item_id: string;

    output_index: number;

    sequence_number: number;

    type?: 'response.file_search_call.completed';
  }

  /**
   * Streaming event emitted when a response ends in an incomplete state.
   */
  export interface OpenAIResponseObjectStreamResponseIncomplete {
    /**
     * Complete OpenAI response object containing generation results and metadata.
     */
    response: ResponsesAPI.ResponseObject;

    sequence_number: number;

    type?: 'response.incomplete';
  }

  /**
   * Streaming event emitted when a response fails.
   */
  export interface OpenAIResponseObjectStreamResponseFailed {
    /**
     * Complete OpenAI response object containing generation results and metadata.
     */
    response: ResponsesAPI.ResponseObject;

    sequence_number: number;

    type?: 'response.failed';
  }

  /**
   * Streaming event indicating a response has been completed.
   */
  export interface OpenAIResponseObjectStreamResponseCompleted {
    /**
     * Complete OpenAI response object containing generation results and metadata.
     */
    response: ResponsesAPI.ResponseObject;

    type?: 'response.completed';
  }
}

/**
 * OpenAI response object extended with input context information.
 */
export interface ResponseListResponse {
  id: string;

  created_at: number;

  input: Array<
    | ResponseListResponse.OpenAIResponseMessageOutput
    | ResponseListResponse.OpenAIResponseOutputMessageWebSearchToolCall
    | ResponseListResponse.OpenAIResponseOutputMessageFileSearchToolCall
    | ResponseListResponse.OpenAIResponseOutputMessageFunctionToolCall
    | ResponseListResponse.OpenAIResponseOutputMessageMcpCall
    | ResponseListResponse.OpenAIResponseOutputMessageMcpListTools
    | ResponseListResponse.OpenAIResponseMcpApprovalRequest
    | ResponseListResponse.OpenAIResponseInputFunctionToolCallOutput
    | ResponseListResponse.OpenAIResponseMcpApprovalResponse
    | ResponseListResponse.OpenAIResponseMessageOutput
  >;

  model: string;

  output: Array<
    | ResponseListResponse.OpenAIResponseMessageOutput
    | ResponseListResponse.OpenAIResponseOutputMessageWebSearchToolCall
    | ResponseListResponse.OpenAIResponseOutputMessageFileSearchToolCall
    | ResponseListResponse.OpenAIResponseOutputMessageFunctionToolCall
    | ResponseListResponse.OpenAIResponseOutputMessageMcpCall
    | ResponseListResponse.OpenAIResponseOutputMessageMcpListTools
    | ResponseListResponse.OpenAIResponseMcpApprovalRequest
  >;

  status: string;

  /**
   * Error details for failed OpenAI response requests.
   */
  error?: ResponseListResponse.Error | null;

  instructions?: string | null;

  max_tool_calls?: number | null;

  metadata?: { [key: string]: string } | null;

  object?: 'response';

  parallel_tool_calls?: boolean | null;

  previous_response_id?: string | null;

  /**
   * OpenAI compatible Prompt object that is used in OpenAI responses.
   */
  prompt?: ResponseListResponse.Prompt | null;

  temperature?: number | null;

  /**
   * Text response configuration for OpenAI responses.
   */
  text?: ResponseListResponse.Text;

  tools?: Array<
    | ResponseListResponse.OpenAIResponseInputToolWebSearch
    | ResponseListResponse.OpenAIResponseInputToolFileSearch
    | ResponseListResponse.OpenAIResponseInputToolFunction
    | ResponseListResponse.OpenAIResponseToolMcp
  > | null;

  top_p?: number | null;

  truncation?: string | null;

  /**
   * Usage information for OpenAI response.
   */
  usage?: ResponseListResponse.Usage | null;
}

export namespace ResponseListResponse {
  /**
   * Corresponds to the various Message types in the Responses API. They are all
   * under one type because the Responses API gives them all the same "type" value,
   * and there is no way to tell them apart in certain scenarios.
   */
  export interface OpenAIResponseMessageOutput {
    content:
      | string
      | Array<
          | OpenAIResponseMessageOutput.OpenAIResponseInputMessageContentText
          | OpenAIResponseMessageOutput.OpenAIResponseInputMessageContentImage
          | OpenAIResponseMessageOutput.OpenAIResponseInputMessageContentFile
        >
      | Array<
          | OpenAIResponseMessageOutput.OpenAIResponseOutputMessageContentOutputText
          | OpenAIResponseMessageOutput.OpenAIResponseContentPartRefusal
        >;

    role: 'system' | 'developer' | 'user' | 'assistant';

    id?: string | null;

    status?: string | null;

    type?: 'message';
  }

  export namespace OpenAIResponseMessageOutput {
    /**
     * Text content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentText {
      text: string;

      type?: 'input_text';
    }

    /**
     * Image content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentImage {
      detail?: 'low' | 'high' | 'auto';

      file_id?: string | null;

      image_url?: string | null;

      type?: 'input_image';
    }

    /**
     * File content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentFile {
      file_data?: string | null;

      file_id?: string | null;

      file_url?: string | null;

      filename?: string | null;

      type?: 'input_file';
    }

    export interface OpenAIResponseOutputMessageContentOutputText {
      text: string;

      annotations?: Array<
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFileCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationContainerFileCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFilePath
      >;

      type?: 'output_text';
    }

    export namespace OpenAIResponseOutputMessageContentOutputText {
      /**
       * File citation annotation for referencing specific files in response content.
       */
      export interface OpenAIResponseAnnotationFileCitation {
        file_id: string;

        filename: string;

        index: number;

        type?: 'file_citation';
      }

      /**
       * URL citation annotation for referencing external web resources.
       */
      export interface OpenAIResponseAnnotationCitation {
        end_index: number;

        start_index: number;

        title: string;

        url: string;

        type?: 'url_citation';
      }

      export interface OpenAIResponseAnnotationContainerFileCitation {
        container_id: string;

        end_index: number;

        file_id: string;

        filename: string;

        start_index: number;

        type?: 'container_file_citation';
      }

      export interface OpenAIResponseAnnotationFilePath {
        file_id: string;

        index: number;

        type?: 'file_path';
      }
    }

    /**
     * Refusal content within a streamed response part.
     */
    export interface OpenAIResponseContentPartRefusal {
      refusal: string;

      type?: 'refusal';
    }
  }

  /**
   * Web search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageWebSearchToolCall {
    id: string;

    status: string;

    type?: 'web_search_call';
  }

  /**
   * File search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFileSearchToolCall {
    id: string;

    queries: Array<string>;

    status: string;

    results?: Array<OpenAIResponseOutputMessageFileSearchToolCall.Result> | null;

    type?: 'file_search_call';
  }

  export namespace OpenAIResponseOutputMessageFileSearchToolCall {
    /**
     * Search results returned by the file search operation.
     */
    export interface Result {
      attributes: { [key: string]: unknown };

      file_id: string;

      filename: string;

      score: number;

      text: string;
    }
  }

  /**
   * Function tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFunctionToolCall {
    arguments: string;

    call_id: string;

    name: string;

    id?: string | null;

    status?: string | null;

    type?: 'function_call';
  }

  /**
   * Model Context Protocol (MCP) call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageMcpCall {
    id: string;

    arguments: string;

    name: string;

    server_label: string;

    error?: string | null;

    output?: string | null;

    type?: 'mcp_call';
  }

  /**
   * MCP list tools output message containing available tools from an MCP server.
   */
  export interface OpenAIResponseOutputMessageMcpListTools {
    id: string;

    server_label: string;

    tools: Array<OpenAIResponseOutputMessageMcpListTools.Tool>;

    type?: 'mcp_list_tools';
  }

  export namespace OpenAIResponseOutputMessageMcpListTools {
    /**
     * Tool definition returned by MCP list tools operation.
     */
    export interface Tool {
      input_schema: { [key: string]: unknown };

      name: string;

      description?: string | null;
    }
  }

  /**
   * A request for human approval of a tool invocation.
   */
  export interface OpenAIResponseMcpApprovalRequest {
    id: string;

    arguments: string;

    name: string;

    server_label: string;

    type?: 'mcp_approval_request';
  }

  /**
   * This represents the output of a function call that gets passed back to the
   * model.
   */
  export interface OpenAIResponseInputFunctionToolCallOutput {
    call_id: string;

    output: string;

    id?: string | null;

    status?: string | null;

    type?: 'function_call_output';
  }

  /**
   * A response to an MCP approval request.
   */
  export interface OpenAIResponseMcpApprovalResponse {
    approval_request_id: string;

    approve: boolean;

    id?: string | null;

    reason?: string | null;

    type?: 'mcp_approval_response';
  }

  /**
   * Corresponds to the various Message types in the Responses API. They are all
   * under one type because the Responses API gives them all the same "type" value,
   * and there is no way to tell them apart in certain scenarios.
   */
  export interface OpenAIResponseMessageOutput {
    content:
      | string
      | Array<
          | OpenAIResponseMessageOutput.OpenAIResponseInputMessageContentText
          | OpenAIResponseMessageOutput.OpenAIResponseInputMessageContentImage
          | OpenAIResponseMessageOutput.OpenAIResponseInputMessageContentFile
        >
      | Array<
          | OpenAIResponseMessageOutput.OpenAIResponseOutputMessageContentOutputText
          | OpenAIResponseMessageOutput.OpenAIResponseContentPartRefusal
        >;

    role: 'system' | 'developer' | 'user' | 'assistant';

    id?: string | null;

    status?: string | null;

    type?: 'message';
  }

  export namespace OpenAIResponseMessageOutput {
    /**
     * Text content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentText {
      text: string;

      type?: 'input_text';
    }

    /**
     * Image content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentImage {
      detail?: 'low' | 'high' | 'auto';

      file_id?: string | null;

      image_url?: string | null;

      type?: 'input_image';
    }

    /**
     * File content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentFile {
      file_data?: string | null;

      file_id?: string | null;

      file_url?: string | null;

      filename?: string | null;

      type?: 'input_file';
    }

    export interface OpenAIResponseOutputMessageContentOutputText {
      text: string;

      annotations?: Array<
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFileCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationContainerFileCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFilePath
      >;

      type?: 'output_text';
    }

    export namespace OpenAIResponseOutputMessageContentOutputText {
      /**
       * File citation annotation for referencing specific files in response content.
       */
      export interface OpenAIResponseAnnotationFileCitation {
        file_id: string;

        filename: string;

        index: number;

        type?: 'file_citation';
      }

      /**
       * URL citation annotation for referencing external web resources.
       */
      export interface OpenAIResponseAnnotationCitation {
        end_index: number;

        start_index: number;

        title: string;

        url: string;

        type?: 'url_citation';
      }

      export interface OpenAIResponseAnnotationContainerFileCitation {
        container_id: string;

        end_index: number;

        file_id: string;

        filename: string;

        start_index: number;

        type?: 'container_file_citation';
      }

      export interface OpenAIResponseAnnotationFilePath {
        file_id: string;

        index: number;

        type?: 'file_path';
      }
    }

    /**
     * Refusal content within a streamed response part.
     */
    export interface OpenAIResponseContentPartRefusal {
      refusal: string;

      type?: 'refusal';
    }
  }

  /**
   * Corresponds to the various Message types in the Responses API. They are all
   * under one type because the Responses API gives them all the same "type" value,
   * and there is no way to tell them apart in certain scenarios.
   */
  export interface OpenAIResponseMessageOutput {
    content:
      | string
      | Array<
          | OpenAIResponseMessageOutput.OpenAIResponseInputMessageContentText
          | OpenAIResponseMessageOutput.OpenAIResponseInputMessageContentImage
          | OpenAIResponseMessageOutput.OpenAIResponseInputMessageContentFile
        >
      | Array<
          | OpenAIResponseMessageOutput.OpenAIResponseOutputMessageContentOutputText
          | OpenAIResponseMessageOutput.OpenAIResponseContentPartRefusal
        >;

    role: 'system' | 'developer' | 'user' | 'assistant';

    id?: string | null;

    status?: string | null;

    type?: 'message';
  }

  export namespace OpenAIResponseMessageOutput {
    /**
     * Text content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentText {
      text: string;

      type?: 'input_text';
    }

    /**
     * Image content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentImage {
      detail?: 'low' | 'high' | 'auto';

      file_id?: string | null;

      image_url?: string | null;

      type?: 'input_image';
    }

    /**
     * File content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentFile {
      file_data?: string | null;

      file_id?: string | null;

      file_url?: string | null;

      filename?: string | null;

      type?: 'input_file';
    }

    export interface OpenAIResponseOutputMessageContentOutputText {
      text: string;

      annotations?: Array<
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFileCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationContainerFileCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFilePath
      >;

      type?: 'output_text';
    }

    export namespace OpenAIResponseOutputMessageContentOutputText {
      /**
       * File citation annotation for referencing specific files in response content.
       */
      export interface OpenAIResponseAnnotationFileCitation {
        file_id: string;

        filename: string;

        index: number;

        type?: 'file_citation';
      }

      /**
       * URL citation annotation for referencing external web resources.
       */
      export interface OpenAIResponseAnnotationCitation {
        end_index: number;

        start_index: number;

        title: string;

        url: string;

        type?: 'url_citation';
      }

      export interface OpenAIResponseAnnotationContainerFileCitation {
        container_id: string;

        end_index: number;

        file_id: string;

        filename: string;

        start_index: number;

        type?: 'container_file_citation';
      }

      export interface OpenAIResponseAnnotationFilePath {
        file_id: string;

        index: number;

        type?: 'file_path';
      }
    }

    /**
     * Refusal content within a streamed response part.
     */
    export interface OpenAIResponseContentPartRefusal {
      refusal: string;

      type?: 'refusal';
    }
  }

  /**
   * Web search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageWebSearchToolCall {
    id: string;

    status: string;

    type?: 'web_search_call';
  }

  /**
   * File search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFileSearchToolCall {
    id: string;

    queries: Array<string>;

    status: string;

    results?: Array<OpenAIResponseOutputMessageFileSearchToolCall.Result> | null;

    type?: 'file_search_call';
  }

  export namespace OpenAIResponseOutputMessageFileSearchToolCall {
    /**
     * Search results returned by the file search operation.
     */
    export interface Result {
      attributes: { [key: string]: unknown };

      file_id: string;

      filename: string;

      score: number;

      text: string;
    }
  }

  /**
   * Function tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFunctionToolCall {
    arguments: string;

    call_id: string;

    name: string;

    id?: string | null;

    status?: string | null;

    type?: 'function_call';
  }

  /**
   * Model Context Protocol (MCP) call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageMcpCall {
    id: string;

    arguments: string;

    name: string;

    server_label: string;

    error?: string | null;

    output?: string | null;

    type?: 'mcp_call';
  }

  /**
   * MCP list tools output message containing available tools from an MCP server.
   */
  export interface OpenAIResponseOutputMessageMcpListTools {
    id: string;

    server_label: string;

    tools: Array<OpenAIResponseOutputMessageMcpListTools.Tool>;

    type?: 'mcp_list_tools';
  }

  export namespace OpenAIResponseOutputMessageMcpListTools {
    /**
     * Tool definition returned by MCP list tools operation.
     */
    export interface Tool {
      input_schema: { [key: string]: unknown };

      name: string;

      description?: string | null;
    }
  }

  /**
   * A request for human approval of a tool invocation.
   */
  export interface OpenAIResponseMcpApprovalRequest {
    id: string;

    arguments: string;

    name: string;

    server_label: string;

    type?: 'mcp_approval_request';
  }

  /**
   * Error details for failed OpenAI response requests.
   */
  export interface Error {
    code: string;

    message: string;
  }

  /**
   * OpenAI compatible Prompt object that is used in OpenAI responses.
   */
  export interface Prompt {
    id: string;

    variables?: {
      [key: string]:
        | Prompt.OpenAIResponseInputMessageContentText
        | Prompt.OpenAIResponseInputMessageContentImage
        | Prompt.OpenAIResponseInputMessageContentFile;
    } | null;

    version?: string | null;
  }

  export namespace Prompt {
    /**
     * Text content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentText {
      text: string;

      type?: 'input_text';
    }

    /**
     * Image content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentImage {
      detail?: 'low' | 'high' | 'auto';

      file_id?: string | null;

      image_url?: string | null;

      type?: 'input_image';
    }

    /**
     * File content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentFile {
      file_data?: string | null;

      file_id?: string | null;

      file_url?: string | null;

      filename?: string | null;

      type?: 'input_file';
    }
  }

  /**
   * Text response configuration for OpenAI responses.
   */
  export interface Text {
    /**
     * Configuration for Responses API text format.
     */
    format?: Text.Format | null;
  }

  export namespace Text {
    /**
     * Configuration for Responses API text format.
     */
    export interface Format {
      description?: string | null;

      name?: string | null;

      schema?: { [key: string]: unknown } | null;

      strict?: boolean | null;

      type?: 'text' | 'json_schema' | 'json_object';
    }
  }

  /**
   * Web search tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolWebSearch {
    search_context_size?: string | null;

    type?: 'web_search' | 'web_search_preview' | 'web_search_preview_2025_03_11' | 'web_search_2025_08_26';
  }

  /**
   * File search tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolFileSearch {
    vector_store_ids: Array<string>;

    filters?: { [key: string]: unknown } | null;

    max_num_results?: number | null;

    /**
     * Options for ranking and filtering search results.
     */
    ranking_options?: OpenAIResponseInputToolFileSearch.RankingOptions | null;

    type?: 'file_search';
  }

  export namespace OpenAIResponseInputToolFileSearch {
    /**
     * Options for ranking and filtering search results.
     */
    export interface RankingOptions {
      ranker?: string | null;

      score_threshold?: number | null;
    }
  }

  /**
   * Function tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolFunction {
    name: string;

    parameters: { [key: string]: unknown } | null;

    description?: string | null;

    strict?: boolean | null;

    type?: 'function';
  }

  /**
   * Model Context Protocol (MCP) tool configuration for OpenAI response object.
   */
  export interface OpenAIResponseToolMcp {
    server_label: string;

    /**
     * Filter configuration for restricting which MCP tools can be used.
     */
    allowed_tools?: Array<string> | OpenAIResponseToolMcp.AllowedToolsFilter | null;

    type?: 'mcp';
  }

  export namespace OpenAIResponseToolMcp {
    /**
     * Filter configuration for restricting which MCP tools can be used.
     */
    export interface AllowedToolsFilter {
      tool_names?: Array<string> | null;
    }
  }

  /**
   * Usage information for OpenAI response.
   */
  export interface Usage {
    input_tokens: number;

    output_tokens: number;

    total_tokens: number;

    /**
     * Token details for input tokens in OpenAI response usage.
     */
    input_tokens_details?: Usage.InputTokensDetails | null;

    /**
     * Token details for output tokens in OpenAI response usage.
     */
    output_tokens_details?: Usage.OutputTokensDetails | null;
  }

  export namespace Usage {
    /**
     * Token details for input tokens in OpenAI response usage.
     */
    export interface InputTokensDetails {
      cached_tokens?: number | null;
    }

    /**
     * Token details for output tokens in OpenAI response usage.
     */
    export interface OutputTokensDetails {
      reasoning_tokens?: number | null;
    }
  }
}

/**
 * Response object confirming deletion of an OpenAI response.
 */
export interface ResponseDeleteResponse {
  id: string;

  deleted?: boolean;

  object?: 'response';
}

export type ResponseCreateParams = ResponseCreateParamsNonStreaming | ResponseCreateParamsStreaming;

export interface ResponseCreateParamsBase {
  input:
    | string
    | Array<
        | ResponseCreateParams.OpenAIResponseMessageInput
        | ResponseCreateParams.OpenAIResponseOutputMessageWebSearchToolCall
        | ResponseCreateParams.OpenAIResponseOutputMessageFileSearchToolCall
        | ResponseCreateParams.OpenAIResponseOutputMessageFunctionToolCall
        | ResponseCreateParams.OpenAIResponseOutputMessageMcpCall
        | ResponseCreateParams.OpenAIResponseOutputMessageMcpListTools
        | ResponseCreateParams.OpenAIResponseMcpApprovalRequest
        | ResponseCreateParams.OpenAIResponseInputFunctionToolCallOutput
        | ResponseCreateParams.OpenAIResponseMcpApprovalResponse
        | ResponseCreateParams.OpenAIResponseMessageInput
      >;

  model: string;

  conversation?: string | null;

  include?: Array<string> | null;

  instructions?: string | null;

  max_infer_iters?: number | null;

  max_tool_calls?: number | null;

  metadata?: { [key: string]: string } | null;

  parallel_tool_calls?: boolean | null;

  previous_response_id?: string | null;

  /**
   * OpenAI compatible Prompt object that is used in OpenAI responses.
   */
  prompt?: ResponseCreateParams.Prompt | null;

  store?: boolean | null;

  stream?: boolean | null;

  temperature?: number | null;

  /**
   * Text response configuration for OpenAI responses.
   */
  text?: ResponseCreateParams.Text | null;

  tools?: Array<
    | ResponseCreateParams.OpenAIResponseInputToolWebSearch
    | ResponseCreateParams.OpenAIResponseInputToolFileSearch
    | ResponseCreateParams.OpenAIResponseInputToolFunction
    | ResponseCreateParams.OpenAIResponseInputToolMcp
  > | null;
}

export namespace ResponseCreateParams {
  /**
   * Corresponds to the various Message types in the Responses API. They are all
   * under one type because the Responses API gives them all the same "type" value,
   * and there is no way to tell them apart in certain scenarios.
   */
  export interface OpenAIResponseMessageInput {
    content:
      | string
      | Array<
          | OpenAIResponseMessageInput.OpenAIResponseInputMessageContentText
          | OpenAIResponseMessageInput.OpenAIResponseInputMessageContentImage
          | OpenAIResponseMessageInput.OpenAIResponseInputMessageContentFile
        >
      | Array<
          | OpenAIResponseMessageInput.OpenAIResponseOutputMessageContentOutputText
          | OpenAIResponseMessageInput.OpenAIResponseContentPartRefusal
        >;

    role: 'system' | 'developer' | 'user' | 'assistant';

    id?: string | null;

    status?: string | null;

    type?: 'message';
  }

  export namespace OpenAIResponseMessageInput {
    /**
     * Text content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentText {
      text: string;

      type?: 'input_text';
    }

    /**
     * Image content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentImage {
      detail?: 'low' | 'high' | 'auto';

      file_id?: string | null;

      image_url?: string | null;

      type?: 'input_image';
    }

    /**
     * File content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentFile {
      file_data?: string | null;

      file_id?: string | null;

      file_url?: string | null;

      filename?: string | null;

      type?: 'input_file';
    }

    export interface OpenAIResponseOutputMessageContentOutputText {
      text: string;

      annotations?: Array<
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFileCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationContainerFileCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFilePath
      >;

      type?: 'output_text';
    }

    export namespace OpenAIResponseOutputMessageContentOutputText {
      /**
       * File citation annotation for referencing specific files in response content.
       */
      export interface OpenAIResponseAnnotationFileCitation {
        file_id: string;

        filename: string;

        index: number;

        type?: 'file_citation';
      }

      /**
       * URL citation annotation for referencing external web resources.
       */
      export interface OpenAIResponseAnnotationCitation {
        end_index: number;

        start_index: number;

        title: string;

        url: string;

        type?: 'url_citation';
      }

      export interface OpenAIResponseAnnotationContainerFileCitation {
        container_id: string;

        end_index: number;

        file_id: string;

        filename: string;

        start_index: number;

        type?: 'container_file_citation';
      }

      export interface OpenAIResponseAnnotationFilePath {
        file_id: string;

        index: number;

        type?: 'file_path';
      }
    }

    /**
     * Refusal content within a streamed response part.
     */
    export interface OpenAIResponseContentPartRefusal {
      refusal: string;

      type?: 'refusal';
    }
  }

  /**
   * Web search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageWebSearchToolCall {
    id: string;

    status: string;

    type?: 'web_search_call';
  }

  /**
   * File search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFileSearchToolCall {
    id: string;

    queries: Array<string>;

    status: string;

    results?: Array<OpenAIResponseOutputMessageFileSearchToolCall.Result> | null;

    type?: 'file_search_call';
  }

  export namespace OpenAIResponseOutputMessageFileSearchToolCall {
    /**
     * Search results returned by the file search operation.
     */
    export interface Result {
      attributes: { [key: string]: unknown };

      file_id: string;

      filename: string;

      score: number;

      text: string;
    }
  }

  /**
   * Function tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFunctionToolCall {
    arguments: string;

    call_id: string;

    name: string;

    id?: string | null;

    status?: string | null;

    type?: 'function_call';
  }

  /**
   * Model Context Protocol (MCP) call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageMcpCall {
    id: string;

    arguments: string;

    name: string;

    server_label: string;

    error?: string | null;

    output?: string | null;

    type?: 'mcp_call';
  }

  /**
   * MCP list tools output message containing available tools from an MCP server.
   */
  export interface OpenAIResponseOutputMessageMcpListTools {
    id: string;

    server_label: string;

    tools: Array<OpenAIResponseOutputMessageMcpListTools.Tool>;

    type?: 'mcp_list_tools';
  }

  export namespace OpenAIResponseOutputMessageMcpListTools {
    /**
     * Tool definition returned by MCP list tools operation.
     */
    export interface Tool {
      input_schema: { [key: string]: unknown };

      name: string;

      description?: string | null;
    }
  }

  /**
   * A request for human approval of a tool invocation.
   */
  export interface OpenAIResponseMcpApprovalRequest {
    id: string;

    arguments: string;

    name: string;

    server_label: string;

    type?: 'mcp_approval_request';
  }

  /**
   * This represents the output of a function call that gets passed back to the
   * model.
   */
  export interface OpenAIResponseInputFunctionToolCallOutput {
    call_id: string;

    output: string;

    id?: string | null;

    status?: string | null;

    type?: 'function_call_output';
  }

  /**
   * A response to an MCP approval request.
   */
  export interface OpenAIResponseMcpApprovalResponse {
    approval_request_id: string;

    approve: boolean;

    id?: string | null;

    reason?: string | null;

    type?: 'mcp_approval_response';
  }

  /**
   * Corresponds to the various Message types in the Responses API. They are all
   * under one type because the Responses API gives them all the same "type" value,
   * and there is no way to tell them apart in certain scenarios.
   */
  export interface OpenAIResponseMessageInput {
    content:
      | string
      | Array<
          | OpenAIResponseMessageInput.OpenAIResponseInputMessageContentText
          | OpenAIResponseMessageInput.OpenAIResponseInputMessageContentImage
          | OpenAIResponseMessageInput.OpenAIResponseInputMessageContentFile
        >
      | Array<
          | OpenAIResponseMessageInput.OpenAIResponseOutputMessageContentOutputText
          | OpenAIResponseMessageInput.OpenAIResponseContentPartRefusal
        >;

    role: 'system' | 'developer' | 'user' | 'assistant';

    id?: string | null;

    status?: string | null;

    type?: 'message';
  }

  export namespace OpenAIResponseMessageInput {
    /**
     * Text content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentText {
      text: string;

      type?: 'input_text';
    }

    /**
     * Image content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentImage {
      detail?: 'low' | 'high' | 'auto';

      file_id?: string | null;

      image_url?: string | null;

      type?: 'input_image';
    }

    /**
     * File content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentFile {
      file_data?: string | null;

      file_id?: string | null;

      file_url?: string | null;

      filename?: string | null;

      type?: 'input_file';
    }

    export interface OpenAIResponseOutputMessageContentOutputText {
      text: string;

      annotations?: Array<
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFileCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationContainerFileCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFilePath
      >;

      type?: 'output_text';
    }

    export namespace OpenAIResponseOutputMessageContentOutputText {
      /**
       * File citation annotation for referencing specific files in response content.
       */
      export interface OpenAIResponseAnnotationFileCitation {
        file_id: string;

        filename: string;

        index: number;

        type?: 'file_citation';
      }

      /**
       * URL citation annotation for referencing external web resources.
       */
      export interface OpenAIResponseAnnotationCitation {
        end_index: number;

        start_index: number;

        title: string;

        url: string;

        type?: 'url_citation';
      }

      export interface OpenAIResponseAnnotationContainerFileCitation {
        container_id: string;

        end_index: number;

        file_id: string;

        filename: string;

        start_index: number;

        type?: 'container_file_citation';
      }

      export interface OpenAIResponseAnnotationFilePath {
        file_id: string;

        index: number;

        type?: 'file_path';
      }
    }

    /**
     * Refusal content within a streamed response part.
     */
    export interface OpenAIResponseContentPartRefusal {
      refusal: string;

      type?: 'refusal';
    }
  }

  /**
   * OpenAI compatible Prompt object that is used in OpenAI responses.
   */
  export interface Prompt {
    id: string;

    variables?: {
      [key: string]:
        | Prompt.OpenAIResponseInputMessageContentText
        | Prompt.OpenAIResponseInputMessageContentImage
        | Prompt.OpenAIResponseInputMessageContentFile;
    } | null;

    version?: string | null;
  }

  export namespace Prompt {
    /**
     * Text content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentText {
      text: string;

      type?: 'input_text';
    }

    /**
     * Image content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentImage {
      detail?: 'low' | 'high' | 'auto';

      file_id?: string | null;

      image_url?: string | null;

      type?: 'input_image';
    }

    /**
     * File content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentFile {
      file_data?: string | null;

      file_id?: string | null;

      file_url?: string | null;

      filename?: string | null;

      type?: 'input_file';
    }
  }

  /**
   * Text response configuration for OpenAI responses.
   */
  export interface Text {
    /**
     * Configuration for Responses API text format.
     */
    format?: Text.Format | null;
  }

  export namespace Text {
    /**
     * Configuration for Responses API text format.
     */
    export interface Format {
      description?: string | null;

      name?: string | null;

      schema?: { [key: string]: unknown } | null;

      strict?: boolean | null;

      type?: 'text' | 'json_schema' | 'json_object';
    }
  }

  /**
   * Web search tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolWebSearch {
    search_context_size?: string | null;

    type?: 'web_search' | 'web_search_preview' | 'web_search_preview_2025_03_11' | 'web_search_2025_08_26';
  }

  /**
   * File search tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolFileSearch {
    vector_store_ids: Array<string>;

    filters?: { [key: string]: unknown } | null;

    max_num_results?: number | null;

    /**
     * Options for ranking and filtering search results.
     */
    ranking_options?: OpenAIResponseInputToolFileSearch.RankingOptions | null;

    type?: 'file_search';
  }

  export namespace OpenAIResponseInputToolFileSearch {
    /**
     * Options for ranking and filtering search results.
     */
    export interface RankingOptions {
      ranker?: string | null;

      score_threshold?: number | null;
    }
  }

  /**
   * Function tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolFunction {
    name: string;

    parameters: { [key: string]: unknown } | null;

    description?: string | null;

    strict?: boolean | null;

    type?: 'function';
  }

  /**
   * Model Context Protocol (MCP) tool configuration for OpenAI response inputs.
   */
  export interface OpenAIResponseInputToolMcp {
    server_label: string;

    server_url: string;

    /**
     * Filter configuration for restricting which MCP tools can be used.
     */
    allowed_tools?: Array<string> | OpenAIResponseInputToolMcp.AllowedToolsFilter | null;

    authorization?: string | null;

    headers?: { [key: string]: unknown } | null;

    /**
     * Filter configuration for MCP tool approval requirements.
     */
    require_approval?: 'always' | 'never' | OpenAIResponseInputToolMcp.ApprovalFilter;

    type?: 'mcp';
  }

  export namespace OpenAIResponseInputToolMcp {
    /**
     * Filter configuration for restricting which MCP tools can be used.
     */
    export interface AllowedToolsFilter {
      tool_names?: Array<string> | null;
    }

    /**
     * Filter configuration for MCP tool approval requirements.
     */
    export interface ApprovalFilter {
      always?: Array<string> | null;

      never?: Array<string> | null;
    }
  }

  export type ResponseCreateParamsNonStreaming = ResponsesAPI.ResponseCreateParamsNonStreaming;
  export type ResponseCreateParamsStreaming = ResponsesAPI.ResponseCreateParamsStreaming;
}

export interface ResponseCreateParamsNonStreaming extends ResponseCreateParamsBase {
  stream?: false | null;
}

export interface ResponseCreateParamsStreaming extends ResponseCreateParamsBase {
  stream: true;
}

export interface ResponseListParams extends OpenAICursorPageParams {
  model?: string | null;

  /**
   * Sort order for paginated responses.
   */
  order?: 'asc' | 'desc' | null;
}

Responses.ResponseListResponsesOpenAICursorPage = ResponseListResponsesOpenAICursorPage;
Responses.InputItems = InputItems;

export declare namespace Responses {
  export {
    type ResponseObject as ResponseObject,
    type ResponseObjectStream as ResponseObjectStream,
    type ResponseListResponse as ResponseListResponse,
    type ResponseDeleteResponse as ResponseDeleteResponse,
    ResponseListResponsesOpenAICursorPage as ResponseListResponsesOpenAICursorPage,
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
