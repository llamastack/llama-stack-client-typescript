// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SessionAPI from './session';
import { Session, SessionUploadContentParams } from './session';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Files extends APIResource {
  session: SessionAPI.Session = new SessionAPI.Session(this._client);

  /**
   * Get a file info identified by a bucket and key.
   */
  retrieve(key: string, params: FileRetrieveParams, options?: RequestOptions): APIPromise<File> {
    const { bucket } = params;
    return this._client.get(path`/v1/files/${bucket}/${key}`, options);
  }

  /**
   * List all buckets.
   */
  list(query: FileListParams, options?: RequestOptions): APIPromise<FileListResponse> {
    return this._client.get('/v1/files', { query, ...options });
  }

  /**
   * Delete a file identified by a bucket and key.
   */
  delete(key: string, params: FileDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { bucket } = params;
    return this._client.delete(path`/v1/files/${bucket}/${key}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Create a new upload session for a file identified by a bucket and key.
   */
  createUploadSession(body: FileCreateUploadSessionParams, options?: RequestOptions): APIPromise<FileUpload> {
    return this._client.post('/v1/files', { body, ...options });
  }

  /**
   * List all files in a bucket.
   */
  listInBucket(bucket: string, options?: RequestOptions): APIPromise<FileListInBucketResponse> {
    return this._client.get(path`/v1/files/${bucket}`, options);
  }
}

/**
 * Response representing a file entry.
 */
export interface File {
  /**
   * Bucket under which the file is stored (valid chars: a-zA-Z0-9\_-)
   */
  bucket: string;

  /**
   * Size of the file in bytes
   */
  bytes: number;

  /**
   * Timestamp of when the file was created
   */
  created_at: number;

  /**
   * Key under which the file is stored (valid chars: a-zA-Z0-9\_-/.)
   */
  key: string;

  /**
   * MIME type of the file
   */
  mime_type: string;

  /**
   * Upload URL for the file contents
   */
  url: string;
}

/**
 * Response after initiating a file upload session.
 */
export interface FileUpload {
  /**
   * ID of the upload session
   */
  id: string;

  /**
   * Upload content offset
   */
  offset: number;

  /**
   * Upload content size
   */
  size: number;

  /**
   * Upload URL for the file or file parts
   */
  url: string;
}

/**
 * Response representing a list of file entries.
 */
export interface FileListResponse {
  /**
   * List of FileResponse entries
   */
  data: Array<FileListResponse.Data>;
}

export namespace FileListResponse {
  export interface Data {
    name: string;
  }
}

/**
 * Response representing a list of file entries.
 */
export interface FileListInBucketResponse {
  /**
   * List of FileResponse entries
   */
  data: Array<File>;
}

export interface FileRetrieveParams {
  /**
   * Bucket name (valid chars: a-zA-Z0-9\_-)
   */
  bucket: string;
}

export interface FileListParams {
  bucket: string;
}

export interface FileDeleteParams {
  /**
   * Bucket name (valid chars: a-zA-Z0-9\_-)
   */
  bucket: string;
}

export interface FileCreateUploadSessionParams {
  /**
   * Bucket under which the file is stored (valid chars: a-zA-Z0-9\_-)
   */
  bucket: string;

  /**
   * Key under which the file is stored (valid chars: a-zA-Z0-9\_-/.)
   */
  key: string;

  /**
   * MIME type of the file
   */
  mime_type: string;

  /**
   * File size in bytes
   */
  size: number;
}

Files.Session = Session;

export declare namespace Files {
  export {
    type File as File,
    type FileUpload as FileUpload,
    type FileListResponse as FileListResponse,
    type FileListInBucketResponse as FileListInBucketResponse,
    type FileRetrieveParams as FileRetrieveParams,
    type FileListParams as FileListParams,
    type FileDeleteParams as FileDeleteParams,
    type FileCreateUploadSessionParams as FileCreateUploadSessionParams,
  };

  export { Session as Session, type SessionUploadContentParams as SessionUploadContentParams };
}
