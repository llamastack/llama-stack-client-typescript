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
import * as ToolRuntimeAPI from './tool-runtime';

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

export type ToolListResponse = Array<ToolRuntimeAPI.ToolDef>;

export interface ToolListParams {
  toolgroup_id?: string | null;
}

export declare namespace Tools {
  export { type ToolListResponse as ToolListResponse, type ToolListParams as ToolListParams };
}
