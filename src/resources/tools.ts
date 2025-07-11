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

export interface ListToolsResponse {
  data: ToolListResponse;
}

export interface Tool {
  description: string;

  identifier: string;

  parameters: Array<Tool.Parameter>;

  provider_id: string;

  toolgroup_id: string;

  type: 'tool';

  metadata?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  provider_resource_id?: string;
}

export namespace Tool {
  export interface Parameter {
    description: string;

    name: string;

    parameter_type: string;

    required: boolean;

    default?: boolean | number | string | Array<unknown> | unknown | null;
  }
}

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
