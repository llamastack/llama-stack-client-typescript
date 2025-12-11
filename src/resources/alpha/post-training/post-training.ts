// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.
//
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as Core from '../../../core';
import * as JobAPI from './job';
import {
  Job,
  JobArtifactsParams,
  JobArtifactsResponse,
  JobCancelParams,
  JobListResponse,
  JobStatusParams,
  JobStatusResponse,
} from './job';

export class PostTraining extends APIResource {
  job: JobAPI.Job = new JobAPI.Job(this._client);

  /**
   * Run preference optimization of a model.
   */
  preferenceOptimize(
    body: PostTrainingPreferenceOptimizeParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PostTrainingJob> {
    return this._client.post('/v1alpha/post-training/preference-optimize', { body, ...options });
  }

  /**
   * Run supervised fine-tuning of a model.
   */
  supervisedFineTune(
    body: PostTrainingSupervisedFineTuneParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PostTrainingJob> {
    return this._client.post('/v1alpha/post-training/supervised-fine-tune', { body, ...options });
  }
}

/**
 * Configuration for Low-Rank Adaptation (LoRA) fine-tuning.
 */
export type AlgorithmConfig = AlgorithmConfig.LoraFinetuningConfig | AlgorithmConfig.QatFinetuningConfig;

export namespace AlgorithmConfig {
  /**
   * Configuration for Low-Rank Adaptation (LoRA) fine-tuning.
   */
  export interface LoraFinetuningConfig {
    alpha: number;

    apply_lora_to_mlp: boolean;

    apply_lora_to_output: boolean;

    lora_attn_modules: Array<string>;

    rank: number;

    quantize_base?: boolean | null;

    type?: 'LoRA';

    use_dora?: boolean | null;
  }

  /**
   * Configuration for Quantization-Aware Training (QAT) fine-tuning.
   */
  export interface QatFinetuningConfig {
    group_size: number;

    quantizer_name: string;

    type?: 'QAT';
  }
}

export interface ListPostTrainingJobsResponse {
  data: JobAPI.JobListResponse;
}

export interface PostTrainingJob {
  job_uuid: string;
}

export interface PostTrainingPreferenceOptimizeParams {
  /**
   * Configuration for Direct Preference Optimization (DPO) alignment.
   */
  algorithm_config: PostTrainingPreferenceOptimizeParams.AlgorithmConfig;

  finetuned_model: string;

  hyperparam_search_config: { [key: string]: unknown };

  job_uuid: string;

  logger_config: { [key: string]: unknown };

  /**
   * Comprehensive configuration for the training process.
   */
  training_config: PostTrainingPreferenceOptimizeParams.TrainingConfig;
}

export namespace PostTrainingPreferenceOptimizeParams {
  /**
   * Configuration for Direct Preference Optimization (DPO) alignment.
   */
  export interface AlgorithmConfig {
    beta: number;

    loss_type?: 'sigmoid' | 'hinge' | 'ipo' | 'kto_pair';
  }

  /**
   * Comprehensive configuration for the training process.
   */
  export interface TrainingConfig {
    n_epochs: number;

    /**
     * Configuration for training data and data loading.
     */
    data_config?: TrainingConfig.DataConfig | null;

    dtype?: string | null;

    /**
     * Configuration for memory and compute efficiency optimizations.
     */
    efficiency_config?: TrainingConfig.EfficiencyConfig | null;

    gradient_accumulation_steps?: number;

    max_steps_per_epoch?: number;

    max_validation_steps?: number | null;

    /**
     * Configuration parameters for the optimization algorithm.
     */
    optimizer_config?: TrainingConfig.OptimizerConfig | null;
  }

  export namespace TrainingConfig {
    /**
     * Configuration for training data and data loading.
     */
    export interface DataConfig {
      batch_size: number;

      /**
       * Format of the training dataset.
       */
      data_format: 'instruct' | 'dialog';

      dataset_id: string;

      shuffle: boolean;

      packed?: boolean | null;

      train_on_input?: boolean | null;

      validation_dataset_id?: string | null;
    }

    /**
     * Configuration for memory and compute efficiency optimizations.
     */
    export interface EfficiencyConfig {
      enable_activation_checkpointing?: boolean | null;

      enable_activation_offloading?: boolean | null;

      fsdp_cpu_offload?: boolean | null;

      memory_efficient_fsdp_wrap?: boolean | null;
    }

    /**
     * Configuration parameters for the optimization algorithm.
     */
    export interface OptimizerConfig {
      lr: number;

      num_warmup_steps: number;

      /**
       * Available optimizer algorithms for training.
       */
      optimizer_type: 'adam' | 'adamw' | 'sgd';

      weight_decay: number;
    }
  }
}

export interface PostTrainingSupervisedFineTuneParams {
  hyperparam_search_config: { [key: string]: unknown };

  job_uuid: string;

  logger_config: { [key: string]: unknown };

  /**
   * Comprehensive configuration for the training process.
   */
  training_config: PostTrainingSupervisedFineTuneParams.TrainingConfig;

  /**
   * Configuration for Low-Rank Adaptation (LoRA) fine-tuning.
   */
  algorithm_config?:
    | PostTrainingSupervisedFineTuneParams.LoraFinetuningConfig
    | PostTrainingSupervisedFineTuneParams.QatFinetuningConfig
    | null;

  checkpoint_dir?: string | null;

  /**
   * Model descriptor for training if not in provider config`
   */
  model?: string | null;
}

export namespace PostTrainingSupervisedFineTuneParams {
  /**
   * Comprehensive configuration for the training process.
   */
  export interface TrainingConfig {
    n_epochs: number;

    /**
     * Configuration for training data and data loading.
     */
    data_config?: TrainingConfig.DataConfig | null;

    dtype?: string | null;

    /**
     * Configuration for memory and compute efficiency optimizations.
     */
    efficiency_config?: TrainingConfig.EfficiencyConfig | null;

    gradient_accumulation_steps?: number;

    max_steps_per_epoch?: number;

    max_validation_steps?: number | null;

    /**
     * Configuration parameters for the optimization algorithm.
     */
    optimizer_config?: TrainingConfig.OptimizerConfig | null;
  }

  export namespace TrainingConfig {
    /**
     * Configuration for training data and data loading.
     */
    export interface DataConfig {
      batch_size: number;

      /**
       * Format of the training dataset.
       */
      data_format: 'instruct' | 'dialog';

      dataset_id: string;

      shuffle: boolean;

      packed?: boolean | null;

      train_on_input?: boolean | null;

      validation_dataset_id?: string | null;
    }

    /**
     * Configuration for memory and compute efficiency optimizations.
     */
    export interface EfficiencyConfig {
      enable_activation_checkpointing?: boolean | null;

      enable_activation_offloading?: boolean | null;

      fsdp_cpu_offload?: boolean | null;

      memory_efficient_fsdp_wrap?: boolean | null;
    }

    /**
     * Configuration parameters for the optimization algorithm.
     */
    export interface OptimizerConfig {
      lr: number;

      num_warmup_steps: number;

      /**
       * Available optimizer algorithms for training.
       */
      optimizer_type: 'adam' | 'adamw' | 'sgd';

      weight_decay: number;
    }
  }

  /**
   * Configuration for Low-Rank Adaptation (LoRA) fine-tuning.
   */
  export interface LoraFinetuningConfig {
    alpha: number;

    apply_lora_to_mlp: boolean;

    apply_lora_to_output: boolean;

    lora_attn_modules: Array<string>;

    rank: number;

    quantize_base?: boolean | null;

    type?: 'LoRA';

    use_dora?: boolean | null;
  }

  /**
   * Configuration for Quantization-Aware Training (QAT) fine-tuning.
   */
  export interface QatFinetuningConfig {
    group_size: number;

    quantizer_name: string;

    type?: 'QAT';
  }
}

PostTraining.Job = Job;

export declare namespace PostTraining {
  export {
    type AlgorithmConfig as AlgorithmConfig,
    type ListPostTrainingJobsResponse as ListPostTrainingJobsResponse,
    type PostTrainingJob as PostTrainingJob,
    type PostTrainingPreferenceOptimizeParams as PostTrainingPreferenceOptimizeParams,
    type PostTrainingSupervisedFineTuneParams as PostTrainingSupervisedFineTuneParams,
  };

  export {
    Job as Job,
    type JobListResponse as JobListResponse,
    type JobArtifactsResponse as JobArtifactsResponse,
    type JobStatusResponse as JobStatusResponse,
    type JobArtifactsParams as JobArtifactsParams,
    type JobCancelParams as JobCancelParams,
    type JobStatusParams as JobStatusParams,
  };
}
