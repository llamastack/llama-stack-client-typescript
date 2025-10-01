// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Tools extends APIResource {
  /**
   * List tools with optional tool group.
   */
  list(query?: ToolListParams, options?: Core.RequestOptions): Core.APIPromise<ToolListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<ToolListResponse>;
  list(
    query: ToolListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<ToolListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return (
      this._client.get('/v1/tools', { query, ...options }) as Core.APIPromise<{ data: ToolListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Get a tool by its name.
   */
  get(toolName: string, options?: Core.RequestOptions): Core.APIPromise<Tool> {
    return this._client.get(`/v1/tools/${toolName}`, options);
  }
}

/**
 * Response containing a list of tools.
 */
export interface ListToolsResponse {
  /**
   * List of tools
   */
  data: ToolListResponse;
}

/**
 * A tool that can be invoked by agents.
 */
export interface Tool {
  /**
   * Human-readable description of what the tool does
   */
  description: string;

  identifier: string;

  provider_id: string;

  /**
   * ID of the tool group this tool belongs to
   */
  toolgroup_id: string;

  /**
   * Type of resource, always 'tool'
   */
  type: 'tool';

  /**
   * JSON Schema for the tool's input parameters
   */
  input_schema?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * (Optional) Additional metadata about the tool
   */
  metadata?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * JSON Schema for the tool's output
   */
  output_schema?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  provider_resource_id?: string;
}

/**
 * List of tools
 */
export type ToolListResponse = Array<Tool>;

export interface ToolListParams {
  /**
   * The ID of the tool group to list tools for.
   */
  toolgroup_id?: string;
}

export declare namespace Tools {
  export {
    type ListToolsResponse as ListToolsResponse,
    type Tool as Tool,
    type ToolListResponse as ToolListResponse,
    type ToolListParams as ToolListParams,
  };
}
