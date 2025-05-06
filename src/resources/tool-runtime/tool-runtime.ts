// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as InferenceAPI from '../inference';
import * as ToolsAPI from '../tools';
import * as RagToolAPI from './rag-tool';
import {
  RagTool,
  RagToolInsertDocumentsParams,
  RagToolQueryContextParams,
  RagToolQueryContextResponse,
} from './rag-tool';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class ToolRuntime extends APIResource {
  ragTool: RagToolAPI.RagTool = new RagToolAPI.RagTool(this._client);

  /**
   * Run a tool with the given arguments
   */
  invokeTool(
    body: ToolRuntimeInvokeToolParams,
    options?: RequestOptions,
  ): APIPromise<ToolRuntimeInvokeToolResponse> {
    return this._client.post('/v1/tool-runtime/invoke', { body, ...options });
  }

  listTools(
    query: ToolRuntimeListToolsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ToolRuntimeListToolsResponse> {
    return this._client.get('/v1/tool-runtime/list-tools', { query, ...options });
  }
}

export interface ToolDef {
  name: string;

  description?: string;

  metadata?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  parameters?: Array<ToolsAPI.ToolParameter>;
}

export interface URL {
  uri: string;
}

export interface ToolRuntimeInvokeToolResponse {
  /**
   * A image content item
   */
  content?: InferenceAPI.InterleavedContent;

  error_code?: number;

  error_message?: string;

  metadata?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;
}

export interface ToolRuntimeListToolsResponse {
  data: Array<ToolDef>;
}

export interface ToolRuntimeInvokeToolParams {
  kwargs: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  tool_name: string;
}

export interface ToolRuntimeListToolsParams {
  mcp_endpoint?: URL;

  tool_group_id?: string;
}

ToolRuntime.RagTool = RagTool;

export declare namespace ToolRuntime {
  export {
    type ToolDef as ToolDef,
    type URL as URL,
    type ToolRuntimeInvokeToolResponse as ToolRuntimeInvokeToolResponse,
    type ToolRuntimeListToolsResponse as ToolRuntimeListToolsResponse,
    type ToolRuntimeInvokeToolParams as ToolRuntimeInvokeToolParams,
    type ToolRuntimeListToolsParams as ToolRuntimeListToolsParams,
  };

  export {
    RagTool as RagTool,
    type RagToolQueryContextResponse as RagToolQueryContextResponse,
    type RagToolInsertDocumentsParams as RagToolInsertDocumentsParams,
    type RagToolQueryContextParams as RagToolQueryContextParams,
  };
}
