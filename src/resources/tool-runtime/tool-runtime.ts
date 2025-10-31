// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as Shared from '../shared';
import * as RagToolAPI from './rag-tool';
import { RagTool, RagToolInsertParams, RagToolQueryParams } from './rag-tool';

export class ToolRuntime extends APIResource {
  ragTool: RagToolAPI.RagTool = new RagToolAPI.RagTool(this._client);

  /**
   * Run a tool with the given arguments.
   */
  invokeTool(
    body: ToolRuntimeInvokeToolParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<ToolInvocationResult> {
    return this._client.post('/v1/tool-runtime/invoke', { body, ...options });
  }

  /**
   * List all tools in the runtime.
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
  /**
   * Name of the tool
   */
  name: string;

  /**
   * (Optional) Human-readable description of what the tool does
   */
  description?: string;

  /**
   * (Optional) JSON Schema for tool inputs (MCP inputSchema)
   */
  input_schema?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * (Optional) Additional metadata about the tool
   */
  metadata?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * (Optional) JSON Schema for tool outputs (MCP outputSchema)
   */
  output_schema?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * (Optional) ID of the tool group this tool belongs to
   */
  toolgroup_id?: string;
}

/**
 * Result of a tool invocation.
 */
export interface ToolInvocationResult {
  /**
   * (Optional) The output content from the tool execution
   */
  content?: Shared.InterleavedContent;

  /**
   * (Optional) Numeric error code if the tool execution failed
   */
  error_code?: number;

  /**
   * (Optional) Error message if the tool execution failed
   */
  error_message?: string;

  /**
   * (Optional) Additional metadata about the tool execution
   */
  metadata?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };
}

/**
 * List of tool definitions
 */
export type ToolRuntimeListToolsResponse = Array<ToolDef>;

export interface ToolRuntimeInvokeToolParams {
  /**
   * A dictionary of arguments to pass to the tool.
   */
  kwargs: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * The name of the tool to invoke.
   */
  tool_name: string;
}

export interface ToolRuntimeListToolsParams {
  /**
   * The MCP endpoint to use for the tool group.
   */
  mcp_endpoint?: ToolRuntimeListToolsParams.McpEndpoint;

  /**
   * The ID of the tool group to list tools for.
   */
  tool_group_id?: string;
}

export namespace ToolRuntimeListToolsParams {
  /**
   * The MCP endpoint to use for the tool group.
   */
  export interface McpEndpoint {
    /**
     * The URL string pointing to the resource
     */
    uri: string;
  }
}

ToolRuntime.RagTool = RagTool;

export declare namespace ToolRuntime {
  export {
    type ToolDef as ToolDef,
    type ToolInvocationResult as ToolInvocationResult,
    type ToolRuntimeListToolsResponse as ToolRuntimeListToolsResponse,
    type ToolRuntimeInvokeToolParams as ToolRuntimeInvokeToolParams,
    type ToolRuntimeListToolsParams as ToolRuntimeListToolsParams,
  };

  export {
    RagTool as RagTool,
    type RagToolInsertParams as RagToolInsertParams,
    type RagToolQueryParams as RagToolQueryParams,
  };
}
