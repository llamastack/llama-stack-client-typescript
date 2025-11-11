// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

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
}

/**
 * Response containing a list of tool groups.
 */
export interface ListToolGroupsResponse {
  /**
   * List of tool groups
   */
  data: ToolgroupListResponse;
}

/**
 * A group of related tools managed together.
 */
export interface ToolGroup {
  identifier: string;

  provider_id: string;

  /**
   * Type of resource, always 'tool_group'
   */
  type: 'tool_group';

  /**
   * (Optional) Additional arguments for the tool group
   */
  args?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * (Optional) Model Context Protocol endpoint for remote tools
   */
  mcp_endpoint?: ToolGroup.McpEndpoint;

  provider_resource_id?: string;
}

export namespace ToolGroup {
  /**
   * (Optional) Model Context Protocol endpoint for remote tools
   */
  export interface McpEndpoint {
    /**
     * The URL string pointing to the resource
     */
    uri: string;
  }
}

/**
 * List of tool groups
 */
export type ToolgroupListResponse = Array<ToolGroup>;

export declare namespace Toolgroups {
  export {
    type ListToolGroupsResponse as ListToolGroupsResponse,
    type ToolGroup as ToolGroup,
    type ToolgroupListResponse as ToolgroupListResponse,
  };
}
