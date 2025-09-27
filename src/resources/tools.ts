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

  /**
   * List of parameters this tool accepts
   */
  parameters: Array<Tool.Parameter>;

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
   * (Optional) Additional metadata about the tool
   */
  metadata?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  provider_resource_id?: string;
}

export namespace Tool {
  /**
   * Parameter definition for a tool.
   */
  export interface Parameter {
    /**
     * Human-readable description of what the parameter does
     */
    description: string;

    /**
     * Name of the parameter
     */
    name: string;

    /**
     * Type of the parameter (e.g., string, integer)
     */
    parameter_type: string;

    /**
     * Whether this parameter is required for tool invocation
     */
    required: boolean;

    /**
     * (Optional) Default value for the parameter if not provided
     */
    default?: boolean | number | string | Array<unknown> | unknown | null;

    /**
     * Type of the elements when parameter_type is array
     */
    items?: unknown;

    /**
     * (Optional) Title of the parameter
     */
    title?: string;
  }
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
