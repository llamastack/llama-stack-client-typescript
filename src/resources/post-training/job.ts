// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as Core from '../../core';
import * as PostTrainingAPI from './post-training';

export class Job extends APIResource {
  /**
   * Get all training jobs.
   */
  list(
    options?: Core.RequestOptions,
  ): Core.APIPromise<Array<PostTrainingAPI.ListPostTrainingJobsResponse.Data>> {
    return (
      this._client.get('/v1/post-training/jobs', options) as Core.APIPromise<{
        data: Array<PostTrainingAPI.ListPostTrainingJobsResponse.Data>;
      }>
    )._thenUnwrap((obj) => obj.data);
  }

  /**
   * Get the artifacts of a training job.
   */
  artifacts(query: JobArtifactsParams, options?: Core.RequestOptions): Core.APIPromise<JobArtifactsResponse> {
    return this._client.get('/v1/post-training/job/artifacts', { query, ...options });
  }

  /**
   * Cancel a training job.
   */
  cancel(body: JobCancelParams, options?: Core.RequestOptions): Core.APIPromise<void> {
    return this._client.post('/v1/post-training/job/cancel', {
      body,
      ...options,
      headers: { Accept: '*/*', ...options?.headers },
    });
  }

  /**
   * Get the status of a training job.
   */
  status(query: JobStatusParams, options?: Core.RequestOptions): Core.APIPromise<JobStatusResponse> {
    return this._client.get('/v1/post-training/job/status', { query, ...options });
  }
}

export type JobListResponse = Array<JobListResponse.JobListResponseItem>;

export namespace JobListResponse {
  export interface JobListResponseItem {
    job_uuid: string;
  }
}

/**
 * Artifacts of a finetuning job.
 */
export interface JobArtifactsResponse {
  checkpoints: Array<JobArtifactsResponse.Checkpoint>;

  job_uuid: string;
}

export namespace JobArtifactsResponse {
  /**
   * Checkpoint created during training runs
   */
  export interface Checkpoint {
    created_at: string;

    epoch: number;

    identifier: string;

    path: string;

    post_training_job_id: string;

    training_metrics?: Checkpoint.TrainingMetrics;
  }

  export namespace Checkpoint {
    export interface TrainingMetrics {
      epoch: number;

      perplexity: number;

      train_loss: number;

      validation_loss: number;
    }
  }
}

/**
 * Status of a finetuning job.
 */
export interface JobStatusResponse {
  checkpoints: Array<JobStatusResponse.Checkpoint>;

  job_uuid: string;

  status: 'completed' | 'in_progress' | 'failed' | 'scheduled' | 'cancelled';

  completed_at?: string;

  resources_allocated?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  scheduled_at?: string;

  started_at?: string;
}

export namespace JobStatusResponse {
  /**
   * Checkpoint created during training runs
   */
  export interface Checkpoint {
    created_at: string;

    epoch: number;

    identifier: string;

    path: string;

    post_training_job_id: string;

    training_metrics?: Checkpoint.TrainingMetrics;
  }

  export namespace Checkpoint {
    export interface TrainingMetrics {
      epoch: number;

      perplexity: number;

      train_loss: number;

      validation_loss: number;
    }
  }
}

export interface JobArtifactsParams {
  /**
   * The UUID of the job to get the artifacts of.
   */
  job_uuid: string;
}

export interface JobCancelParams {
  /**
   * The UUID of the job to cancel.
   */
  job_uuid: string;
}

export interface JobStatusParams {
  /**
   * The UUID of the job to get the status of.
   */
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
