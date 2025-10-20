// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

import type { Format } from './types';

export const default_format: Format = 'RFC3986';
export const formatters: Record<Format, (str: PropertyKey) => string> = {
  RFC1738: (v: PropertyKey) => String(v).replace(/%20/g, '+'),
  RFC3986: (v: PropertyKey) => String(v),
};
export const RFC1738 = 'RFC1738';
export const RFC3986 = 'RFC3986';
