// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Toolgroups extends APIResource {
  /**
   * List tool groups with optional provider.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ToolgroupListResponse> {
    return (
      this._client.get('/v1/toolgroups', options) as Core.APIPromise<{ data: ToolgroupListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Get a tool group by its ID.
   */
  get(toolgroupId: string, options?: Core.RequestOptions): Core.APIPromise<ToolGroup> {
    return this._client.get(`/v1/toolgroups/${toolgroupId}`, options);
  }

  /**
   * Register a tool group.
   *
   * @deprecated
   */
  register(body: ToolgroupRegisterParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/toolgroups', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Unregister a tool group.
   *
   * @deprecated
   */
  unregister(toolgroupId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/toolgroups/${toolgroupId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }
}

/**
 * Response containing a list of tool groups.
 */
export interface ListToolGroupsResponse {
  data: ToolgroupListResponse;
}

/**
 * A group of related tools managed together.
 */
export interface ToolGroup {
  /**
   * Unique identifier for this resource in llama stack
   */
  identifier: string;

  /**
   * ID of the provider that owns this resource
   */
  provider_id: string;

  args?: { [key: string]: unknown } | null;

  /**
   * A URL reference to external content.
   */
  mcp_endpoint?: ToolGroup.McpEndpoint | null;

  /**
   * Unique identifier for this resource in the provider
   */
  provider_resource_id?: string | null;

  type?: 'tool_group';
}

export namespace ToolGroup {
  /**
   * A URL reference to external content.
   */
  export interface McpEndpoint {
    uri: string;
  }
}

export type ToolgroupListResponse = Array<ToolGroup>;

export interface ToolgroupRegisterParams {
  provider_id: string;

  toolgroup_id: string;

  args?: { [key: string]: unknown } | null;

  /**
   * A URL reference to external content.
   */
  mcp_endpoint?: ToolgroupRegisterParams.McpEndpoint | null;
}

export namespace ToolgroupRegisterParams {
  /**
   * A URL reference to external content.
   */
  export interface McpEndpoint {
    uri: string;
  }
}

export declare namespace Toolgroups {
  export {
    type ListToolGroupsResponse as ListToolGroupsResponse,
    type ToolGroup as ToolGroup,
    type ToolgroupListResponse as ToolgroupListResponse,
    type ToolgroupRegisterParams as ToolgroupRegisterParams,
  };
}
