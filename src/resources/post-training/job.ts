// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

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
  /**
   * List of model checkpoints created during training
   */
  checkpoints: Array<JobArtifactsResponse.Checkpoint>;

  /**
   * Unique identifier for the training job
   */
  job_uuid: string;
}

export namespace JobArtifactsResponse {
  /**
   * Checkpoint created during training runs.
   */
  export interface Checkpoint {
    /**
     * Timestamp when the checkpoint was created
     */
    created_at: string;

    /**
     * Training epoch when the checkpoint was saved
     */
    epoch: number;

    /**
     * Unique identifier for the checkpoint
     */
    identifier: string;

    /**
     * File system path where the checkpoint is stored
     */
    path: string;

    /**
     * Identifier of the training job that created this checkpoint
     */
    post_training_job_id: string;

    /**
     * (Optional) Training metrics associated with this checkpoint
     */
    training_metrics?: Checkpoint.TrainingMetrics;
  }

  export namespace Checkpoint {
    /**
     * (Optional) Training metrics associated with this checkpoint
     */
    export interface TrainingMetrics {
      /**
       * Training epoch number
       */
      epoch: number;

      /**
       * Perplexity metric indicating model confidence
       */
      perplexity: number;

      /**
       * Loss value on the training dataset
       */
      train_loss: number;

      /**
       * Loss value on the validation dataset
       */
      validation_loss: number;
    }
  }
}

/**
 * Status of a finetuning job.
 */
export interface JobStatusResponse {
  /**
   * List of model checkpoints created during training
   */
  checkpoints: Array<JobStatusResponse.Checkpoint>;

  /**
   * Unique identifier for the training job
   */
  job_uuid: string;

  /**
   * Current status of the training job
   */
  status: 'completed' | 'in_progress' | 'failed' | 'scheduled' | 'cancelled';

  /**
   * (Optional) Timestamp when the job finished, if completed
   */
  completed_at?: string;

  /**
   * (Optional) Information about computational resources allocated to the job
   */
  resources_allocated?: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * (Optional) Timestamp when the job was scheduled
   */
  scheduled_at?: string;

  /**
   * (Optional) Timestamp when the job execution began
   */
  started_at?: string;
}

export namespace JobStatusResponse {
  /**
   * Checkpoint created during training runs.
   */
  export interface Checkpoint {
    /**
     * Timestamp when the checkpoint was created
     */
    created_at: string;

    /**
     * Training epoch when the checkpoint was saved
     */
    epoch: number;

    /**
     * Unique identifier for the checkpoint
     */
    identifier: string;

    /**
     * File system path where the checkpoint is stored
     */
    path: string;

    /**
     * Identifier of the training job that created this checkpoint
     */
    post_training_job_id: string;

    /**
     * (Optional) Training metrics associated with this checkpoint
     */
    training_metrics?: Checkpoint.TrainingMetrics;
  }

  export namespace Checkpoint {
    /**
     * (Optional) Training metrics associated with this checkpoint
     */
    export interface TrainingMetrics {
      /**
       * Training epoch number
       */
      epoch: number;

      /**
       * Perplexity metric indicating model confidence
       */
      perplexity: number;

      /**
       * Loss value on the training dataset
       */
      train_loss: number;

      /**
       * Loss value on the validation dataset
       */
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
