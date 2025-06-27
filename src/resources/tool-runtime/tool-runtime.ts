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

export interface ToolDef {
  name: string;

  description?: string;

  metadata?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  parameters?: Array<ToolDef.Parameter>;
}

export namespace ToolDef {
  export interface Parameter {
    description: string;

    name: string;

    parameter_type: string;

    required: boolean;

    default?: boolean | number | string | Array<unknown> | unknown | null;
  }
}

export interface ToolInvocationResult {
  /**
   * A image content item
   */
  content?: Shared.InterleavedContent;

  error_code?: number;

  error_message?: string;

  metadata?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };
}

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
