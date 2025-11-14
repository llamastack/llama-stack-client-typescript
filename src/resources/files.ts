// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { OpenAICursorPage, type OpenAICursorPageParams } from '../pagination';

export class Files extends APIResource {
  /**
   * Upload file.
   *
   * Upload a file that can be used across various endpoints.
   *
   * The file upload should be a multipart form request with:
   *
   * - file: The File object (not file name) to be uploaded.
   * - purpose: The intended purpose of the uploaded file.
   * - expires_after: Optional form values describing expiration for the file.
   */
  create(body: FileCreateParams, options?: Core.RequestOptions): Core.APIPromise<File> {
    return this._client.post('/v1/files', Core.multipartFormRequestOptions({ body, ...options }));
  }

  /**
   * Retrieve file.
   *
   * Returns information about a specific file.
   */
  retrieve(fileId: string, options?: Core.RequestOptions): Core.APIPromise<File> {
    return this._client.get(`/v1/files/${fileId}`, options);
  }

  /**
   * List files.
   *
   * Returns a list of files that belong to the user's organization.
   */
  list(query?: FileListParams, options?: Core.RequestOptions): Core.PagePromise<FilesOpenAICursorPage, File>;
  list(options?: Core.RequestOptions): Core.PagePromise<FilesOpenAICursorPage, File>;
  list(
    query: FileListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<FilesOpenAICursorPage, File> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.getAPIList('/v1/files', FilesOpenAICursorPage, { query, ...options });
  }

  /**
   * Delete file.
   */
  delete(fileId: string, options?: Core.RequestOptions): Core.APIPromise<DeleteFileResponse> {
    return this._client.delete(`/v1/files/${fileId}`, options);
  }

  /**
   * Retrieve file content.
   *
   * Returns the contents of the specified file.
   */
  content(fileId: string, options?: Core.RequestOptions): Core.APIPromise<unknown> {
    return this._client.get(`/v1/files/${fileId}/content`, options);
  }
}

export class FilesOpenAICursorPage extends OpenAICursorPage<File> {}

/**
 * Response for deleting a file in OpenAI Files API.
 */
export interface DeleteFileResponse {
  id: string;

  deleted: boolean;

  object?: 'file';
}

/**
 * OpenAI File object as defined in the OpenAI Files API.
 */
export interface File {
  id: string;

  bytes: number;

  created_at: number;

  expires_at: number;

  filename: string;

  /**
   * Valid purpose values for OpenAI Files API.
   */
  purpose: 'assistants' | 'batch';

  object?: 'file';
}

/**
 * Response for listing files in OpenAI Files API.
 */
export interface ListFilesResponse {
  data: Array<File>;

  first_id: string;

  has_more: boolean;

  last_id: string;

  object?: 'list';
}

export type FileContentResponse = unknown;

export interface FileCreateParams {
  file: Core.Uploadable;

  /**
   * Valid purpose values for OpenAI Files API.
   */
  purpose: 'assistants' | 'batch';

  /**
   * Control expiration of uploaded files.
   *
   * Params:
   *
   * - anchor, must be "created_at"
   * - seconds, must be int between 3600 and 2592000 (1 hour to 30 days)
   */
  expires_after?: FileCreateParams.ExpiresAfter | null;
}

export namespace FileCreateParams {
  /**
   * Control expiration of uploaded files.
   *
   * Params:
   *
   * - anchor, must be "created_at"
   * - seconds, must be int between 3600 and 2592000 (1 hour to 30 days)
   */
  export interface ExpiresAfter {
    anchor: 'created_at';

    seconds: number;
  }
}

export interface FileListParams extends OpenAICursorPageParams {
  /**
   * Sort order for paginated responses.
   */
  order?: 'asc' | 'desc' | null;

  /**
   * Valid purpose values for OpenAI Files API.
   */
  purpose?: 'assistants' | 'batch' | null;
}

Files.FilesOpenAICursorPage = FilesOpenAICursorPage;

export declare namespace Files {
  export {
    type DeleteFileResponse as DeleteFileResponse,
    type File as File,
    type ListFilesResponse as ListFilesResponse,
    type FileContentResponse as FileContentResponse,
    FilesOpenAICursorPage as FilesOpenAICursorPage,
    type FileCreateParams as FileCreateParams,
    type FileListParams as FileListParams,
  };
}
