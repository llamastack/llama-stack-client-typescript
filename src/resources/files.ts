// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';
import { OpenAICursorPage, type OpenAICursorPageParams } from '../pagination';

export class Files extends APIResource {
  /**
   * Upload a file that can be used across various endpoints. The file upload should
   * be a multipart form request with:
   *
   * - file: The File object (not file name) to be uploaded.
   * - purpose: The intended purpose of the uploaded file.
   * - expires_after: Optional form values describing expiration for the file.
   */
  create(body: FileCreateParams, options?: Core.RequestOptions): Core.APIPromise<File> {
    return this._client.post('/v1/files', Core.multipartFormRequestOptions({ body, ...options }));
  }

  /**
   * Returns information about a specific file.
   */
  retrieve(fileId: string, options?: Core.RequestOptions): Core.APIPromise<File> {
    return this._client.get(`/v1/files/${fileId}`, options);
  }

  /**
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
   * Delete a file.
   */
  delete(fileId: string, options?: Core.RequestOptions): Core.APIPromise<DeleteFileResponse> {
    return this._client.delete(`/v1/files/${fileId}`, options);
  }

  /**
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
  /**
   * The file identifier that was deleted
   */
  id: string;

  /**
   * Whether the file was successfully deleted
   */
  deleted: boolean;

  /**
   * The object type, which is always "file"
   */
  object: 'file';
}

/**
 * OpenAI File object as defined in the OpenAI Files API.
 */
export interface File {
  /**
   * The file identifier, which can be referenced in the API endpoints
   */
  id: string;

  /**
   * The size of the file, in bytes
   */
  bytes: number;

  /**
   * The Unix timestamp (in seconds) for when the file was created
   */
  created_at: number;

  /**
   * The Unix timestamp (in seconds) for when the file expires
   */
  expires_at: number;

  /**
   * The name of the file
   */
  filename: string;

  /**
   * The object type, which is always "file"
   */
  object: 'file';

  /**
   * The intended purpose of the file
   */
  purpose: 'assistants' | 'batch';
}

/**
 * Response for listing files in OpenAI Files API.
 */
export interface ListFilesResponse {
  /**
   * List of file objects
   */
  data: Array<File>;

  /**
   * ID of the first file in the list for pagination
   */
  first_id: string;

  /**
   * Whether there are more files available beyond this page
   */
  has_more: boolean;

  /**
   * ID of the last file in the list for pagination
   */
  last_id: string;

  /**
   * The object type, which is always "list"
   */
  object: 'list';
}

export type FileContentResponse = unknown;

export interface FileCreateParams {
  file: Core.Uploadable;
}

export interface FileListParams extends OpenAICursorPageParams {
  /**
   * Sort order by the `created_at` timestamp of the objects. `asc` for ascending
   * order and `desc` for descending order.
   */
  order?: 'asc' | 'desc';

  /**
   * Only return files with the given purpose.
   */
  purpose?: 'assistants' | 'batch';
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
