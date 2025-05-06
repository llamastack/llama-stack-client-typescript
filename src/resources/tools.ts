// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Tools extends APIResource {
  retrieve(toolName: string, options?: RequestOptions): APIPromise<Tool> {
    return this._client.get(path`/v1/tools/${toolName}`, options);
  }

  /**
   * List tools with optional tool group
   */
  list(
    query: ToolListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ToolListResponse> {
    return this._client.get('/v1/tools', { query, ...options });
  }
}

export interface Tool {
  description: string;

  identifier: string;

  parameters: Array<ToolParameter>;

  provider_id: string;

  tool_host: 'distribution' | 'client' | 'model_context_protocol';

  toolgroup_id: string;

  type: 'tool';

  metadata?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  provider_resource_id?: string;
}

export interface ToolParameter {
  description: string;

  name: string;

  parameter_type: string;

  required: boolean;

  default?: boolean | number | string | Array<unknown> | unknown | null;
}

export interface ToolListResponse {
  data: Array<Tool>;
}

export interface ToolListParams {
  toolgroup_id?: string;
}

export declare namespace Tools {
  export {
    type Tool as Tool,
    type ToolParameter as ToolParameter,
    type ToolListResponse as ToolListResponse,
    type ToolListParams as ToolListParams,
  };
}
