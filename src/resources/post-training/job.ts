// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import { ListPostTrainingJobsResponse } from './post-training';

export class Job extends APIResource {
  list(options?: Core.RequestOptions): Core.APIPromise<Array<ListPostTrainingJobsResponse.Data>> {
    return (
      this._client.get('/v1/post-training/jobs', options) as Core.APIPromise<{
        data: Array<ListPostTrainingJobsResponse.Data>;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  artifacts(
    query: JobArtifactsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<JobArtifactsResponse | null> {
    return this._client.get('/v1/post-training/job/artifacts', { query, ...options });
  }

  cancel(body: JobCancelParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/post-training/job/cancel', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  status(query: JobStatusParams, options?: Core.RequestOptions): Core.APIPromise<JobStatusResponse | null> {
    return this._client.get('/v1/post-training/job/status', { query, ...options });
  }
}

export type JobListResponse = Array<JobListResponse.JobListResponseItem>;

export namespace JobListResponse {
  export interface JobListResponseItem {
    job_uuid: string;
  }
}

export interface JobArtifactsResponse {
  checkpoints: Array<unknown>;

  job_uuid: string;
}

export interface JobStatusResponse {
  checkpoints: Array<unknown>;

  job_uuid: string;

  status: 'completed' | 'in_progress' | 'failed' | 'scheduled';

  completed_at?: string;

  resources_allocated?: Record<string, boolean | number | string | Array<unknown> | unknown | null>;

  scheduled_at?: string;

  started_at?: string;
}

export interface JobArtifactsParams {
  job_uuid: string;
}

export interface JobCancelParams {
  job_uuid: string;
}

export interface JobStatusParams {
  job_uuid: string;
}

export declare namespace Job {
  export {
    type JobListResponse as JobListResponse,
    type JobArtifactsResponse as JobArtifactsResponse,
    type JobStatusResponse as JobStatusResponse,
    type JobArtifactsParams as JobArtifactsParams,
    type JobCancelParams as JobCancelParams,
    type JobStatusParams as JobStatusParams,
  };
}
