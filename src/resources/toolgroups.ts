// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ToolRuntimeAPI from './tool-runtime/tool-runtime';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Toolgroups extends APIResource {
  retrieve(toolgroupID: string, options?: RequestOptions): APIPromise<ToolGroup> {
    return this._client.get(path`/v1/toolgroups/${toolgroupID}`, options);
  }

  /**
   * List tool groups with optional provider
   */
  list(options?: RequestOptions): APIPromise<ToolgroupListResponse> {
    return this._client.get('/v1/toolgroups', options);
  }

  /**
   * Register a tool group
   */
  register(body: ToolgroupRegisterParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/toolgroups', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Unregister a tool group
   */
  unregister(toolgroupID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/toolgroups/${toolgroupID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface ToolGroup {
  identifier: string;

  provider_id: string;

  type: 'tool_group';

  args?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  mcp_endpoint?: ToolRuntimeAPI.URL;

  provider_resource_id?: string;
}

export interface ToolgroupListResponse {
  data: Array<ToolGroup>;
}

export interface ToolgroupRegisterParams {
  provider_id: string;

  toolgroup_id: string;

  args?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  mcp_endpoint?: ToolRuntimeAPI.URL;
}

export declare namespace Toolgroups {
  export {
    type ToolGroup as ToolGroup,
    type ToolgroupListResponse as ToolgroupListResponse,
    type ToolgroupRegisterParams as ToolgroupRegisterParams,
  };
}
