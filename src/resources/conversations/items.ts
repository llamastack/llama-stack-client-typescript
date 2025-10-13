// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class Items extends APIResource {
  /**
   * Create items in the conversation.
   */
  create(
    conversationId: string,
    body: ItemCreateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ItemCreateResponse> {
    return this._client.post(`/v1/conversations/${conversationId}/items`, { body, ...options });
  }

  /**
   * List items in the conversation.
   */
  list(
    conversationId: string,
    query: ItemListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ItemListResponse> {
    return this._client.get(`/v1/conversations/${conversationId}/items`, { query, ...options });
  }

  /**
   * Retrieve a conversation item.
   */
  get(
    conversationId: string,
    itemId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ItemGetResponse> {
    return this._client.get(`/v1/conversations/${conversationId}/items/${itemId}`, options);
  }
}

/**
 * List of conversation items with pagination.
 */
export interface ItemCreateResponse {
  data: Array<
    | ItemCreateResponse.OpenAIResponseMessage
    | ItemCreateResponse.OpenAIResponseOutputMessageFunctionToolCall
    | ItemCreateResponse.OpenAIResponseOutputMessageFileSearchToolCall
    | ItemCreateResponse.OpenAIResponseOutputMessageWebSearchToolCall
    | ItemCreateResponse.OpenAIResponseOutputMessageMcpCall
    | ItemCreateResponse.OpenAIResponseOutputMessageMcpListTools
  >;

  has_more: boolean;

  object: string;

  first_id?: string;

  last_id?: string;
}

export namespace ItemCreateResponse {
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

/**
 * List of conversation items with pagination.
 */
export interface ItemListResponse {
  data: Array<
    | ItemListResponse.OpenAIResponseMessage
    | ItemListResponse.OpenAIResponseOutputMessageFunctionToolCall
    | ItemListResponse.OpenAIResponseOutputMessageFileSearchToolCall
    | ItemListResponse.OpenAIResponseOutputMessageWebSearchToolCall
    | ItemListResponse.OpenAIResponseOutputMessageMcpCall
    | ItemListResponse.OpenAIResponseOutputMessageMcpListTools
  >;

  has_more: boolean;

  object: string;

  first_id?: string;

  last_id?: string;
}

export namespace ItemListResponse {
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

/**
 * Corresponds to the various Message types in the Responses API. They are all
 * under one type because the Responses API gives them all the same "type" value,
 * and there is no way to tell them apart in certain scenarios.
 */
export type ItemGetResponse =
  | ItemGetResponse.OpenAIResponseMessage
  | ItemGetResponse.OpenAIResponseOutputMessageFunctionToolCall
  | ItemGetResponse.OpenAIResponseOutputMessageFileSearchToolCall
  | ItemGetResponse.OpenAIResponseOutputMessageWebSearchToolCall
  | ItemGetResponse.OpenAIResponseOutputMessageMcpCall
  | ItemGetResponse.OpenAIResponseOutputMessageMcpListTools;

export namespace ItemGetResponse {
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

export interface ItemCreateParams {
  /**
   * Items to include in the conversation context.
   */
  items: Array<
    | ItemCreateParams.OpenAIResponseMessage
    | ItemCreateParams.OpenAIResponseOutputMessageFunctionToolCall
    | ItemCreateParams.OpenAIResponseOutputMessageFileSearchToolCall
    | ItemCreateParams.OpenAIResponseOutputMessageWebSearchToolCall
    | ItemCreateParams.OpenAIResponseOutputMessageMcpCall
    | ItemCreateParams.OpenAIResponseOutputMessageMcpListTools
  >;
}

export namespace ItemCreateParams {
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

export interface ItemListParams {
  /**
   * An item ID to list items after, used in pagination.
   */
  after: string | unknown;

  /**
   * Specify additional output data to include in the response.
   */
  include:
    | Array<
        | 'code_interpreter_call.outputs'
        | 'computer_call_output.output.image_url'
        | 'file_search_call.results'
        | 'message.input_image.image_url'
        | 'message.output_text.logprobs'
        | 'reasoning.encrypted_content'
      >
    | unknown;

  /**
   * A limit on the number of objects to be returned (1-100, default 20).
   */
  limit: number | unknown;

  /**
   * The order to return items in (asc or desc, default desc).
   */
  order: 'asc' | 'desc' | unknown;
}

export declare namespace Items {
  export {
    type ItemCreateResponse as ItemCreateResponse,
    type ItemListResponse as ItemListResponse,
    type ItemGetResponse as ItemGetResponse,
    type ItemCreateParams as ItemCreateParams,
    type ItemListParams as ItemListParams,
  };
}
