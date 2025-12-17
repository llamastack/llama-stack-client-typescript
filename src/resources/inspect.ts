// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Inspect extends APIResource {
  /**
   * Get health status.
   *
   * Get the current health status of the service.
   */
  health(options?: Core.RequestOptions): Core.APIPromise<HealthInfo> {
    return this._client.get('/v1/health', options);
  }

  /**
   * Get version.
   *
   * Get the version of the service.
   */
  version(options?: Core.RequestOptions): Core.APIPromise<VersionInfo> {
    return this._client.get('/v1/version', options);
  }
}

/**
 * Health status information for the service.
 */
export interface HealthInfo {
  status: 'OK' | 'Error' | 'Not Implemented';
}

/**
 * Information about a registered provider including its configuration and health
 * status.
 */
export interface ProviderInfo {
  /**
   * The API name this provider implements
   */
  api: string;

  /**
   * Configuration parameters for the provider
   */
  config: { [key: string]: unknown };

  /**
   * Current health status of the provider
   */
  health: { [key: string]: unknown };

  /**
   * Unique identifier for the provider
   */
  provider_id: string;

  /**
   * The type of provider implementation
   */
  provider_type: string;
}

/**
 * Information about an API route including its path, method, and implementing
 * providers.
 */
export interface RouteInfo {
  method: string;

  provider_types: Array<string>;

  route: string;
}

/**
 * Version information for the service.
 */
export interface VersionInfo {
  version: string;
}

export declare namespace Inspect {
  export {
    type HealthInfo as HealthInfo,
    type ProviderInfo as ProviderInfo,
    type RouteInfo as RouteInfo,
    type VersionInfo as VersionInfo,
  };
}
