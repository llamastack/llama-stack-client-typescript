// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as ModelsAPI from './models';

export class OpenAI extends APIResource {
  /**
   * List all models.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<ModelsAPI.ModelListResponse> {
    return (
      this._client.get('/v1/models', options) as Core.APIPromise<{ data: ModelsAPI.ModelListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }
}
