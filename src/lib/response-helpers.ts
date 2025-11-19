// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

/**
 * Helper utilities for working with response objects.
 */

import type { ResponseObject } from '../resources/responses/responses';

/**
 * Extracts aggregated text output from a ResponseObject.
 * This concatenates all `output_text` entries from the response's output array.
 *
 * Useful for streaming responses where you want to get the final text from chunk.response:
 *
 * @example
 * ```ts
 * const stream = await client.responses.create({ stream: true, ... });
 * for await (const chunk of stream) {
 *   if (chunk.type === 'response.completed') {
 *     const text = getResponseOutputText(chunk.response);
 *     console.log(text);
 *   }
 * }
 * ```
 */
export function getResponseOutputText(response: ResponseObject): string {
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
