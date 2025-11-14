// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

export class Safety extends APIResource {
  /**
   * Run shield.
   *
   * Run a shield.
   */
  runShield(body: SafetyRunShieldParams, options?: Core.RequestOptions): Core.APIPromise<RunShieldResponse> {
    return this._client.post('/v1/safety/run-shield', { body, ...options });
  }
}

/**
 * Response from running a safety shield.
 */
export interface RunShieldResponse {
  /**
   * Details of a safety violation detected by content moderation.
   */
  violation?: Shared.SafetyViolation | null;
}

export interface SafetyRunShieldParams {
  messages: Array<
    | SafetyRunShieldParams.OpenAIUserMessageParamInput
    | SafetyRunShieldParams.OpenAISystemMessageParam
    | SafetyRunShieldParams.OpenAIAssistantMessageParamInput
    | SafetyRunShieldParams.OpenAIToolMessageParam
    | SafetyRunShieldParams.OpenAIDeveloperMessageParam
  >;

  params: { [key: string]: unknown };

  shield_id: string;
}

export namespace SafetyRunShieldParams {
  /**
   * A message from the user in an OpenAI-compatible chat completion request.
   */
  export interface OpenAIUserMessageParamInput {
    content:
      | string
      | Array<
          | OpenAIUserMessageParamInput.OpenAIChatCompletionContentPartTextParam
          | OpenAIUserMessageParamInput.OpenAIChatCompletionContentPartImageParam
          | OpenAIUserMessageParamInput.OpenAIFile
        >;

    name?: string | null;

    role?: 'user';
  }

  export namespace OpenAIUserMessageParamInput {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface OpenAIChatCompletionContentPartTextParam {
      text: string;

      type?: 'text';
    }

    /**
     * Image content part for OpenAI-compatible chat completion messages.
     */
    export interface OpenAIChatCompletionContentPartImageParam {
      /**
       * Image URL specification for OpenAI-compatible chat completion messages.
       */
      image_url: OpenAIChatCompletionContentPartImageParam.ImageURL;

      type?: 'image_url';
    }

    export namespace OpenAIChatCompletionContentPartImageParam {
      /**
       * Image URL specification for OpenAI-compatible chat completion messages.
       */
      export interface ImageURL {
        url: string;

        detail?: string | null;
      }
    }

    export interface OpenAIFile {
      file: OpenAIFile.File;

      type?: 'file';
    }

    export namespace OpenAIFile {
      export interface File {
        file_data?: string | null;

        file_id?: string | null;

        filename?: string | null;
      }
    }
  }

  /**
   * A system message providing instructions or context to the model.
   */
  export interface OpenAISystemMessageParam {
    content: string | Array<OpenAISystemMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

    name?: string | null;

    role?: 'system';
  }

  export namespace OpenAISystemMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      text: string;

      type?: 'text';
    }
  }

  /**
   * A message containing the model's (assistant) response in an OpenAI-compatible
   * chat completion request.
   */
  export interface OpenAIAssistantMessageParamInput {
    content?:
      | string
      | Array<OpenAIAssistantMessageParamInput.ListOpenAIChatCompletionContentPartTextParam>
      | null;

    name?: string | null;

    role?: 'assistant';

    tool_calls?: Array<OpenAIAssistantMessageParamInput.ToolCall> | null;
  }

  export namespace OpenAIAssistantMessageParamInput {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      text: string;

      type?: 'text';
    }

    /**
     * Tool call specification for OpenAI-compatible chat completion responses.
     */
    export interface ToolCall {
      id?: string | null;

      /**
       * Function call details for OpenAI-compatible tool calls.
       */
      function?: ToolCall.Function | null;

      index?: number | null;

      type?: 'function';
    }

    export namespace ToolCall {
      /**
       * Function call details for OpenAI-compatible tool calls.
       */
      export interface Function {
        arguments?: string | null;

        name?: string | null;
      }
    }
  }

  /**
   * A message representing the result of a tool invocation in an OpenAI-compatible
   * chat completion request.
   */
  export interface OpenAIToolMessageParam {
    content: string | Array<OpenAIToolMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

    tool_call_id: string;

    role?: 'tool';
  }

  export namespace OpenAIToolMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      text: string;

      type?: 'text';
    }
  }

  /**
   * A message from the developer in an OpenAI-compatible chat completion request.
   */
  export interface OpenAIDeveloperMessageParam {
    content: string | Array<OpenAIDeveloperMessageParam.ListOpenAIChatCompletionContentPartTextParam>;

    name?: string | null;

    role?: 'developer';
  }

  export namespace OpenAIDeveloperMessageParam {
    /**
     * Text content part for OpenAI-compatible chat completion messages.
     */
    export interface ListOpenAIChatCompletionContentPartTextParam {
      text: string;

      type?: 'text';
    }
  }
}

export declare namespace Safety {
  export { type RunShieldResponse as RunShieldResponse, type SafetyRunShieldParams as SafetyRunShieldParams };
}
