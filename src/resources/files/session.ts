// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as FilesAPI from './files';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Session extends APIResource {
  /**
   * Returns information about an existsing upload session
   */
  retrieve(uploadID: string, options?: RequestOptions): APIPromise<FilesAPI.FileUpload> {
    return this._client.get(path`/v1/files/session:${uploadID}`, options);
  }

  /**
   * Upload file content to an existing upload session. On the server, request body
   * will have the raw bytes that are uploaded.
   */
  uploadContent(
    uploadID: string,
    params: SessionUploadContentParams,
    options?: RequestOptions,
  ): APIPromise<FilesAPI.File | null> {
    const { body } = params;
    return this._client.post(path`/v1/files/session:${uploadID}`, {
      body: body,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/octet-stream' }, options?.headers]),
    });
  }
}

export interface SessionUploadContentParams {
  body: string | ArrayBuffer | ArrayBufferView | Blob | DataView;
}

export declare namespace Session {
  export { type SessionUploadContentParams as SessionUploadContentParams };
}
