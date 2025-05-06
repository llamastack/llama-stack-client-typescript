// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Job extends APIResource {
  cancel(body: JobCancelParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/post-training/job/cancel', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  retrieveArtifacts(
    query: JobRetrieveArtifactsParams,
    options?: RequestOptions,
  ): APIPromise<JobRetrieveArtifactsResponse> {
    return this._client.get('/v1/post-training/job/artifacts', { query, ...options });
  }

  retrieveStatus(
    query: JobRetrieveStatusParams,
    options?: RequestOptions,
  ): APIPromise<JobRetrieveStatusResponse> {
    return this._client.get('/v1/post-training/job/status', { query, ...options });
  }
}

/**
 * Artifacts of a finetuning job.
 */
export interface JobRetrieveArtifactsResponse {
  checkpoints: Array<unknown>;

  job_uuid: string;
}

/**
 * Status of a finetuning job.
 */
export interface JobRetrieveStatusResponse {
  checkpoints: Array<unknown>;

  job_uuid: string;

  status: 'completed' | 'in_progress' | 'failed' | 'scheduled' | 'cancelled';

  completed_at?: string;

  resources_allocated?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  scheduled_at?: string;

  started_at?: string;
}

export interface JobCancelParams {
  job_uuid: string;
}

export interface JobRetrieveArtifactsParams {
  job_uuid: string;
}

export interface JobRetrieveStatusParams {
  job_uuid: string;
}

export declare namespace Job {
  export {
    type JobRetrieveArtifactsResponse as JobRetrieveArtifactsResponse,
    type JobRetrieveStatusResponse as JobRetrieveStatusResponse,
    type JobCancelParams as JobCancelParams,
    type JobRetrieveArtifactsParams as JobRetrieveArtifactsParams,
    type JobRetrieveStatusParams as JobRetrieveStatusParams,
  };
}
