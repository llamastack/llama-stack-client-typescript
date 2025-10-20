// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as ItemsAPI from './items';
import {
  ItemCreateParams,
  ItemCreateResponse,
  ItemGetResponse,
  ItemListParams,
  ItemListResponse,
  Items,
} from './items';

export class Conversations extends APIResource {
  items: ItemsAPI.Items = new ItemsAPI.Items(this._client);

  /**
   * Create a conversation. Create a conversation.
   */
  create(body: ConversationCreateParams, options?: Core.RequestOptions): Core.APIPromise<ConversationObject> {
    return this._client.post('/v1/conversations', { body, ...options });
  }

  /**
   * Retrieve a conversation. Get a conversation with the given ID.
   */
  retrieve(conversationId: string, options?: Core.RequestOptions): Core.APIPromise<ConversationObject> {
    return this._client.get(`/v1/conversations/${conversationId}`, options);
  }

  /**
   * Update a conversation. Update a conversation's metadata with the given ID.
   */
  update(
    conversationId: string,
    body: ConversationUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ConversationObject> {
    return this._client.post(`/v1/conversations/${conversationId}`, { body, ...options });
  }

  /**
   * Delete a conversation. Delete a conversation with the given ID.
   */
  delete(conversationId: string, options?: Core.RequestOptions): Core.APIPromise<ConversationDeleteResponse> {
    return this._client.delete(`/v1/conversations/${conversationId}`, options);
  }
}

/**
 * OpenAI-compatible conversation object.
 */
export interface ConversationObject {
  id: string;

  created_at: number;

  object: 'conversation';

  items?: Array<unknown>;

  metadata?: { [key: string]: string };
}

/**
 * Response for deleted conversation.
 */
export interface ConversationDeleteResponse {
  id: string;

  deleted: boolean;

  object: string;
}

export interface ConversationCreateParams {
  /**
   * Initial items to include in the conversation context.
   */
  items?: Array<
    | ConversationCreateParams.OpenAIResponseMessage
    | ConversationCreateParams.OpenAIResponseOutputMessageWebSearchToolCall
    | ConversationCreateParams.OpenAIResponseOutputMessageFileSearchToolCall
    | ConversationCreateParams.OpenAIResponseOutputMessageFunctionToolCall
    | ConversationCreateParams.OpenAIResponseInputFunctionToolCallOutput
    | ConversationCreateParams.OpenAIResponseMcpApprovalRequest
    | ConversationCreateParams.OpenAIResponseMcpApprovalResponse
    | ConversationCreateParams.OpenAIResponseOutputMessageMcpCall
    | ConversationCreateParams.OpenAIResponseOutputMessageMcpListTools
  >;

  /**
   * Set of key-value pairs that can be attached to an object.
   */
  metadata?: { [key: string]: string };
}

export namespace ConversationCreateParams {
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
      | Array<
          | OpenAIResponseMessage.OpenAIResponseOutputMessageContentOutputText
          | OpenAIResponseMessage.OpenAIResponseContentPartRefusal
        >;

    role: 'system' | 'developer' | 'user' | 'assistant';

    type: 'message';

    id?: string;

    status?: string;
  }

  export namespace OpenAIResponseMessage {
    /**
     * Text content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentText {
      /**
       * The text content of the input message
       */
      text: string;

      /**
       * Content type identifier, always "input_text"
       */
      type: 'input_text';
    }

    /**
     * Image content for input messages in OpenAI response format.
     */
    export interface OpenAIResponseInputMessageContentImage {
      /**
       * Level of detail for image processing, can be "low", "high", or "auto"
       */
      detail: 'low' | 'high' | 'auto';

      /**
       * Content type identifier, always "input_image"
       */
      type: 'input_image';

      /**
       * (Optional) URL of the image content
       */
      image_url?: string;
    }

    export interface OpenAIResponseOutputMessageContentOutputText {
      annotations: Array<
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFileCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationContainerFileCitation
        | OpenAIResponseOutputMessageContentOutputText.OpenAIResponseAnnotationFilePath
      >;

      text: string;

      type: 'output_text';
    }

    export namespace OpenAIResponseOutputMessageContentOutputText {
      /**
       * File citation annotation for referencing specific files in response content.
       */
      export interface OpenAIResponseAnnotationFileCitation {
        /**
         * Unique identifier of the referenced file
         */
        file_id: string;

        /**
         * Name of the referenced file
         */
        filename: string;

        /**
         * Position index of the citation within the content
         */
        index: number;

        /**
         * Annotation type identifier, always "file_citation"
         */
        type: 'file_citation';
      }

      /**
       * URL citation annotation for referencing external web resources.
       */
      export interface OpenAIResponseAnnotationCitation {
        /**
         * End position of the citation span in the content
         */
        end_index: number;

        /**
         * Start position of the citation span in the content
         */
        start_index: number;

        /**
         * Title of the referenced web resource
         */
        title: string;

        /**
         * Annotation type identifier, always "url_citation"
         */
        type: 'url_citation';

        /**
         * URL of the referenced web resource
         */
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

    /**
     * Refusal content within a streamed response part.
     */
    export interface OpenAIResponseContentPartRefusal {
      /**
       * Refusal text supplied by the model
       */
      refusal: string;

      /**
       * Content part type identifier, always "refusal"
       */
      type: 'refusal';
    }
  }

  /**
   * Web search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageWebSearchToolCall {
    /**
     * Unique identifier for this tool call
     */
    id: string;

    /**
     * Current status of the web search operation
     */
    status: string;

    /**
     * Tool call type identifier, always "web_search_call"
     */
    type: 'web_search_call';
  }

  /**
   * File search tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFileSearchToolCall {
    /**
     * Unique identifier for this tool call
     */
    id: string;

    /**
     * List of search queries executed
     */
    queries: Array<string>;

    /**
     * Current status of the file search operation
     */
    status: string;

    /**
     * Tool call type identifier, always "file_search_call"
     */
    type: 'file_search_call';

    /**
     * (Optional) Search results returned by the file search operation
     */
    results?: Array<OpenAIResponseOutputMessageFileSearchToolCall.Result>;
  }

  export namespace OpenAIResponseOutputMessageFileSearchToolCall {
    /**
     * Search results returned by the file search operation.
     */
    export interface Result {
      /**
       * (Optional) Key-value attributes associated with the file
       */
      attributes: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

      /**
       * Unique identifier of the file containing the result
       */
      file_id: string;

      /**
       * Name of the file containing the result
       */
      filename: string;

      /**
       * Relevance score for this search result (between 0 and 1)
       */
      score: number;

      /**
       * Text content of the search result
       */
      text: string;
    }
  }

  /**
   * Function tool call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageFunctionToolCall {
    /**
     * JSON string containing the function arguments
     */
    arguments: string;

    /**
     * Unique identifier for the function call
     */
    call_id: string;

    /**
     * Name of the function being called
     */
    name: string;

    /**
     * Tool call type identifier, always "function_call"
     */
    type: 'function_call';

    /**
     * (Optional) Additional identifier for the tool call
     */
    id?: string;

    /**
     * (Optional) Current status of the function call execution
     */
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
   * A request for human approval of a tool invocation.
   */
  export interface OpenAIResponseMcpApprovalRequest {
    id: string;

    arguments: string;

    name: string;

    server_label: string;

    type: 'mcp_approval_request';
  }

  /**
   * A response to an MCP approval request.
   */
  export interface OpenAIResponseMcpApprovalResponse {
    approval_request_id: string;

    approve: boolean;

    type: 'mcp_approval_response';

    id?: string;

    reason?: string;
  }

  /**
   * Model Context Protocol (MCP) call output message for OpenAI responses.
   */
  export interface OpenAIResponseOutputMessageMcpCall {
    /**
     * Unique identifier for this MCP call
     */
    id: string;

    /**
     * JSON string containing the MCP call arguments
     */
    arguments: string;

    /**
     * Name of the MCP method being called
     */
    name: string;

    /**
     * Label identifying the MCP server handling the call
     */
    server_label: string;

    /**
     * Tool call type identifier, always "mcp_call"
     */
    type: 'mcp_call';

    /**
     * (Optional) Error message if the MCP call failed
     */
    error?: string;

    /**
     * (Optional) Output result from the successful MCP call
     */
    output?: string;
  }

  /**
   * MCP list tools output message containing available tools from an MCP server.
   */
  export interface OpenAIResponseOutputMessageMcpListTools {
    /**
     * Unique identifier for this MCP list tools operation
     */
    id: string;

    /**
     * Label identifying the MCP server providing the tools
     */
    server_label: string;

    /**
     * List of available tools provided by the MCP server
     */
    tools: Array<OpenAIResponseOutputMessageMcpListTools.Tool>;

    /**
     * Tool call type identifier, always "mcp_list_tools"
     */
    type: 'mcp_list_tools';
  }

  export namespace OpenAIResponseOutputMessageMcpListTools {
    /**
     * Tool definition returned by MCP list tools operation.
     */
    export interface Tool {
      /**
       * JSON schema defining the tool's input parameters
       */
      input_schema: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

      /**
       * Name of the tool
       */
      name: string;

      /**
       * (Optional) Description of what the tool does
       */
      description?: string;
    }
  }
}

export interface ConversationUpdateParams {
  /**
   * Set of key-value pairs that can be attached to an object.
   */
  metadata: { [key: string]: string };
}

Conversations.Items = Items;

export declare namespace Conversations {
  export {
    type ConversationObject as ConversationObject,
    type ConversationDeleteResponse as ConversationDeleteResponse,
    type ConversationCreateParams as ConversationCreateParams,
    type ConversationUpdateParams as ConversationUpdateParams,
  };

  export {
    Items as Items,
    type ItemCreateResponse as ItemCreateResponse,
    type ItemListResponse as ItemListResponse,
    type ItemGetResponse as ItemGetResponse,
    type ItemCreateParams as ItemCreateParams,
    type ItemListParams as ItemListParams,
  };
}
