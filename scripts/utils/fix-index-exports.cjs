/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');
const path = require('path');

const indexJs =
  process.env['DIST_PATH'] ?
    path.resolve(process.env['DIST_PATH'], 'index.js')
  : path.resolve(__dirname, '..', '..', 'dist', 'index.js');

let before = fs.readFileSync(indexJs, 'utf8');
let after = before.replace(
  /^\s*exports\.default\s*=\s*(\w+)/m,
  'exports = module.exports = $1;\nexports.default = $1',
);
fs.writeFileSync(indexJs, after, 'utf8');
