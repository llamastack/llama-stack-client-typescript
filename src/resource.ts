// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { LlamaStackClient } from './index';

export abstract class APIResource {
  protected _client: LlamaStackClient;

  constructor(client: LlamaStackClient) {
    this._client = client;
  }
}
