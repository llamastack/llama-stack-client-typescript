// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as PromptsAPI from './prompts';

export class Versions extends APIResource {
  /**
   * List prompt versions. List all versions of a specific prompt.
   */
  list(promptId: string, options?: Core.RequestOptions): Core.APIPromise<PromptsAPI.PromptListResponse> {
    return (
      this._client.get(`/v1/prompts/${promptId}/versions`, options) as Core.APIPromise<{
        data: PromptsAPI.PromptListResponse;
      }>
    )._thenUnwrap((obj) => obj.data);
  }
}
