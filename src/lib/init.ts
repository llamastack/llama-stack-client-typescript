// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

/**
 * Side-effectful module that installs convenience helpers.
 * Imported once from the entry point so the helpers survive regeneration.
 */

import { installResponseHelpers } from './response-helpers';

installResponseHelpers();
