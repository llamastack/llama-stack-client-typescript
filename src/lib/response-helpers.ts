// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

/**
 * Manual helpers for response objects.
 *
 * Stainless regenerates everything in `src/resources/**` which means we need a
 * separate module for convenience properties that should survive re-runs.
 */

import type { ResponseObject } from '../resources/responses/responses';

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

const OUTPUT_TEXT_SENTINEL = Symbol.for('llama_stack_client_output_text_installed');

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

/**
 * Define a lazy getter for `output_text` on `response`-like objects.
 */
export function installResponseHelpers(): void {
  const proto = Object.prototype as Record<symbol, unknown> & Record<string, unknown>;
  if (proto[OUTPUT_TEXT_SENTINEL]) {
    return;
  }

  proto[OUTPUT_TEXT_SENTINEL] = true;

  Object.defineProperty(Object.prototype, 'output_text', {
    get(this: unknown) {
      if (
        this &&
        typeof this === 'object' &&
        (this as { object?: unknown }).object === 'response' &&
        Array.isArray((this as { output?: unknown }).output)
      ) {
        const value = collectOutputText(this as ResponseObject);
        Object.defineProperty(this, 'output_text', {
          value,
          enumerable: true,
          configurable: true,
          writable: false,
        });
        return value;
      }
      return undefined;
    },
    enumerable: false,
    configurable: true,
  });
}
