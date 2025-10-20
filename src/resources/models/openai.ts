// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';

export class OpenAI extends APIResource {
  /**
   * List models using the OpenAI API.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<OpenAIListResponse> {
    return (
      this._client.get('/v1/openai/v1/models', options) as Core.APIPromise<{ data: OpenAIListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}

export type OpenAIListResponse = Array<OpenAIListResponse.OpenAIListResponseItem>;

export namespace OpenAIListResponse {
  /**
   * A model from OpenAI.
   */
  export interface OpenAIListResponseItem {
    id: string;

    created: number;

    object: 'model';

    owned_by: string;
  }
}

export declare namespace OpenAI {
  export { type OpenAIListResponse as OpenAIListResponse };
}
