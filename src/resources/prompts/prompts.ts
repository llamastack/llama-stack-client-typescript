// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import { isRequestOptions } from '../../core';
import * as Core from '../../core';
import * as VersionsAPI from './versions';
import { Versions } from './versions';

export class Prompts extends APIResource {
  versions: VersionsAPI.Versions = new VersionsAPI.Versions(this._client);

  /**
   * Create prompt. Create a new prompt.
   */
  create(body: PromptCreateParams, options?: Core.RequestOptions): Core.APIPromise<Prompt> {
    return this._client.post('/v1/prompts', { body, ...options });
  }

  /**
   * Get prompt. Get a prompt by its identifier and optional version.
   */
  retrieve(
    promptId: string,
    query?: PromptRetrieveParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Prompt>;
  retrieve(promptId: string, options?: Core.RequestOptions): Core.APIPromise<Prompt>;
  retrieve(
    promptId: string,
    query: PromptRetrieveParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Prompt> {
    if (isRequestOptions(query)) {
      return this.retrieve(promptId, {}, query);
    }
    return this._client.get(`/v1/prompts/${promptId}`, { query, ...options });
  }

  /**
   * Update prompt. Update an existing prompt (increments version).
   */
  update(promptId: string, body: PromptUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Prompt> {
    return this._client.post(`/v1/prompts/${promptId}`, { body, ...options });
  }

  /**
   * List all prompts.
   */
  list(options?: Core.RequestOptions): Core.APIPromise<PromptListResponse> {
    return (
      this._client.get('/v1/prompts', options) as Core.APIPromise<{ data: PromptListResponse }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Delete prompt. Delete a prompt.
   */
  delete(promptId: string, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.delete(`/v1/prompts/${promptId}`, {
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Set prompt version. Set which version of a prompt should be the default in
   * get_prompt (latest).
   */
  setDefaultVersion(
    promptId: string,
    body: PromptSetDefaultVersionParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<Prompt> {
    return this._client.post(`/v1/prompts/${promptId}/set-default-version`, { body, ...options });
  }
}

/**
 * Response model to list prompts.
 */
export interface ListPromptsResponse {
  data: PromptListResponse;
}

/**
 * A prompt resource representing a stored OpenAI Compatible prompt template in
 * Llama Stack.
 */
export interface Prompt {
  /**
   * Boolean indicating whether this version is the default version for this prompt
   */
  is_default: boolean;

  /**
   * Unique identifier formatted as 'pmpt\_<48-digit-hash>'
   */
  prompt_id: string;

  /**
   * List of prompt variable names that can be used in the prompt template
   */
  variables: Array<string>;

  /**
   * Version (integer starting at 1, incremented on save)
   */
  version: number;

  /**
   * The system prompt text with variable placeholders. Variables are only supported
   * when using the Responses API.
   */
  prompt?: string;
}

export type PromptListResponse = Array<Prompt>;

export interface PromptCreateParams {
  /**
   * The prompt text content with variable placeholders.
   */
  prompt: string;

  /**
   * List of variable names that can be used in the prompt template.
   */
  variables?: Array<string>;
}

export interface PromptRetrieveParams {
  /**
   * The version of the prompt to get (defaults to latest).
   */
  version?: number;
}

export interface PromptUpdateParams {
  /**
   * The updated prompt text content.
   */
  prompt: string;

  /**
   * Set the new version as the default (default=True).
   */
  set_as_default: boolean;

  /**
   * The current version of the prompt being updated.
   */
  version: number;

  /**
   * Updated list of variable names that can be used in the prompt template.
   */
  variables?: Array<string>;
}

export interface PromptSetDefaultVersionParams {
  /**
   * The version to set as default.
   */
  version: number;
}

Prompts.Versions = Versions;

export declare namespace Prompts {
  export {
    type ListPromptsResponse as ListPromptsResponse,
    type Prompt as Prompt,
    type PromptListResponse as PromptListResponse,
    type PromptCreateParams as PromptCreateParams,
    type PromptRetrieveParams as PromptRetrieveParams,
    type PromptUpdateParams as PromptUpdateParams,
    type PromptSetDefaultVersionParams as PromptSetDefaultVersionParams,
  };

  export { Versions as Versions };
}
