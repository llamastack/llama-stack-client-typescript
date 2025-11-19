// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

/**
 * Side-effectful module that installs convenience helpers.
 * Imported once from the entry point so the helpers survive regeneration.
 */

import { Responses } from '../resources/responses/responses';
import type { ResponseObject } from '../resources/responses/responses';
import type { APIPromise } from '../core';

// Augment the generated types with the convenience accessor.
declare module '../resources/responses/responses' {
  interface ResponseObject {
    /**
     * Convenience property mirroring the Python client's `output_text`
     * aggregation. This concatenates every `output_text` entry under the
     * response's `output` list.
     */
    readonly output_text: string;
  }
}

const OUTPUT_TEXT_PROPERTY = 'output_text';

function collectOutputText(response: ResponseObject): string {
  const pieces: string[] = [];

  for (const output of response.output ?? []) {
    if (!output || output.type !== 'message') {
      continue;
    }

    const content = output.content;
    if (typeof content === 'string') {
      pieces.push(content);
      continue;
    }

    if (!Array.isArray(content)) {
      continue;
    }

    for (const item of content) {
      if (typeof item === 'string') {
        pieces.push(item);
        continue;
      }
      if (item && item.type === 'output_text' && 'text' in item && typeof item.text === 'string') {
        pieces.push(item.text);
      }
    }
  }

  return pieces.join('');
}

function isResponseObject(obj: unknown): obj is ResponseObject {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    'object' in obj &&
    (obj as { object?: unknown }).object === 'response' &&
    'output' in obj &&
    Array.isArray((obj as { output?: unknown }).output)
  );
}

function addOutputTextGetter(response: ResponseObject): void {
  if (OUTPUT_TEXT_PROPERTY in response) {
    return;
  }

  Object.defineProperty(response, OUTPUT_TEXT_PROPERTY, {
    get() {
      const value = collectOutputText(response);
      Object.defineProperty(response, OUTPUT_TEXT_PROPERTY, {
        value,
        enumerable: true,
        configurable: true,
        writable: false,
      });
      return value;
    },
    enumerable: false,
    configurable: true,
  });
}

function processResponse<T>(value: T): T {
  if (isResponseObject(value)) {
    addOutputTextGetter(value);
  }
  return value;
}

// Patch Responses class methods to automatically add output_text getter
const originalCreate = Responses.prototype.create;
const originalRetrieve = Responses.prototype.retrieve;

// Wrap create method
// @ts-expect-error - Preserving method signature while adding processing
Responses.prototype.create = function (...args: Parameters<typeof originalCreate>) {
  const result = originalCreate.apply(this, args);
  // Handle both streaming and non-streaming responses
  if (result && '_thenUnwrap' in result) {
    return result._thenUnwrap((value: any) => {
      // Only process if it's not a Stream
      if (value && typeof value.on !== 'function' && typeof value[Symbol.asyncIterator] !== 'function') {
        return processResponse(value);
      }
      return value;
    }) as typeof result;
  }
  return result;
};

// Wrap retrieve method
Responses.prototype.retrieve = function (...args: Parameters<typeof originalRetrieve>) {
  const result = originalRetrieve.apply(this, args) as APIPromise<any>;
  return result._thenUnwrap(processResponse) as typeof result;
};
