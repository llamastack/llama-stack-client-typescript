// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import * as ToolRuntimeAPI from './tool-runtime/tool-runtime';

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
  get(toolName: string, options?: Core.RequestOptions): Core.APIPromise<ToolRuntimeAPI.ToolDef> {
    return this._client.get(`/v1/tools/${toolName}`, options);
  }
}

/**
 * List of tool definitions
 */
export type ToolListResponse = Array<ToolRuntimeAPI.ToolDef>;

export interface ToolListParams {
  /**
   * The ID of the tool group to list tools for.
   */
  toolgroup_id?: string;
}

export declare namespace Tools {
  export { type ToolListResponse as ToolListResponse, type ToolListParams as ToolListParams };
}
