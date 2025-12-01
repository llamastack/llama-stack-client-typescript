// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class ToolRuntime extends APIResource {
  /**
   * Run a tool with the given arguments.
   *
   * @deprecated
   */
  invokeTool(
    body: ToolRuntimeInvokeToolParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ToolInvocationResult> {
    return this._client.post('/v1/tool-runtime/invoke', { body, ...options });
  }

  /**
   * List all tools in the runtime.
   *
   * @deprecated
   */
  listTools(
    query?: ToolRuntimeListToolsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ToolRuntimeListToolsResponse>;
  listTools(options?: Core.RequestOptions): Core.APIPromise<ToolRuntimeListToolsResponse>;
  listTools(
    query: ToolRuntimeListToolsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ToolRuntimeListToolsResponse> {
    if (isRequestOptions(query)) {
      return this.listTools({}, query);
    }
    return (
      this._client.get('/v1/tool-runtime/list-tools', { query, ...options }) as Core.APIPromise<{
        data: ToolRuntimeListToolsResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }
}

/**
 * Tool definition used in runtime contexts.
 */
export interface ToolDef {
  name: string;

  description?: string | null;

  input_schema?: { [key: string]: unknown } | null;

  metadata?: { [key: string]: unknown } | null;

  output_schema?: { [key: string]: unknown } | null;

  toolgroup_id?: string | null;
}

/**
 * Result of a tool invocation.
 */
export interface ToolInvocationResult {
  /**
   * A image content item
   */
  content?:
    | string
    | ToolInvocationResult.ImageContentItemOutput
    | ToolInvocationResult.TextContentItem
    | Array<ToolInvocationResult.ImageContentItemOutput | ToolInvocationResult.TextContentItem>
    | null;

  error_code?: number | null;

  error_message?: string | null;

  metadata?: { [key: string]: unknown } | null;
}

export namespace ToolInvocationResult {
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
}

export type ToolRuntimeListToolsResponse = Array<ToolDef>;

export interface ToolRuntimeInvokeToolParams {
  kwargs: { [key: string]: unknown };

  tool_name: string;

  authorization?: string | null;
}

export interface ToolRuntimeListToolsParams {
  authorization?: string | null;

  /**
   * A URL reference to external content.
   */
  mcp_endpoint?: ToolRuntimeListToolsParams.McpEndpoint | null;

  tool_group_id?: string | null;
}

export namespace ToolRuntimeListToolsParams {
  /**
   * A URL reference to external content.
   */
  export interface McpEndpoint {
    uri: string;
  }
}

export declare namespace ToolRuntime {
  export {
    type ToolDef as ToolDef,
    type ToolInvocationResult as ToolInvocationResult,
    type ToolRuntimeListToolsResponse as ToolRuntimeListToolsResponse,
    type ToolRuntimeInvokeToolParams as ToolRuntimeInvokeToolParams,
    type ToolRuntimeListToolsParams as ToolRuntimeListToolsParams,
  };
}
