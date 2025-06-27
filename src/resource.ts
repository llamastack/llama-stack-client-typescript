// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { LlamaStackClient } from './index';

export abstract class APIResource {
  protected _client: LlamaStackClient;

  constructor(client: LlamaStackClient) {
    this._client = client;
  }
}
