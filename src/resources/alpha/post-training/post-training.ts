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
    /**
     * LoRA scaling parameter that controls adaptation strength
     */
    alpha: number;

    /**
     * Whether to apply LoRA to MLP layers
     */
    apply_lora_to_mlp: boolean;

    /**
     * Whether to apply LoRA to output projection layers
     */
    apply_lora_to_output: boolean;

    /**
     * List of attention module names to apply LoRA to
     */
    lora_attn_modules: Array<string>;

    /**
     * Rank of the LoRA adaptation (lower rank = fewer parameters)
     */
    rank: number;

    /**
     * Algorithm type identifier, always "LoRA"
     */
    type: 'LoRA';

    /**
     * (Optional) Whether to quantize the base model weights
     */
    quantize_base?: boolean;

    /**
     * (Optional) Whether to use DoRA (Weight-Decomposed Low-Rank Adaptation)
     */
    use_dora?: boolean;
  }

  /**
   * Configuration for Quantization-Aware Training (QAT) fine-tuning.
   */
  export interface QatFinetuningConfig {
    /**
     * Size of groups for grouped quantization
     */
    group_size: number;

    /**
     * Name of the quantization algorithm to use
     */
    quantizer_name: string;

    /**
     * Algorithm type identifier, always "QAT"
     */
    type: 'QAT';
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
   * The algorithm configuration.
   */
  algorithm_config: PostTrainingPreferenceOptimizeParams.AlgorithmConfig;

  /**
   * The model to fine-tune.
   */
  finetuned_model: string;

  /**
   * The hyperparam search configuration.
   */
  hyperparam_search_config: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * The UUID of the job to create.
   */
  job_uuid: string;

  /**
   * The logger configuration.
   */
  logger_config: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * The training configuration.
   */
  training_config: PostTrainingPreferenceOptimizeParams.TrainingConfig;
}

export namespace PostTrainingPreferenceOptimizeParams {
  /**
   * The algorithm configuration.
   */
  export interface AlgorithmConfig {
    /**
     * Temperature parameter for the DPO loss
     */
    beta: number;

    /**
     * The type of loss function to use for DPO
     */
    loss_type: 'sigmoid' | 'hinge' | 'ipo' | 'kto_pair';
  }

  /**
   * The training configuration.
   */
  export interface TrainingConfig {
    /**
     * Number of steps to accumulate gradients before updating
     */
    gradient_accumulation_steps: number;

    /**
     * Maximum number of steps to run per epoch
     */
    max_steps_per_epoch: number;

    /**
     * Number of training epochs to run
     */
    n_epochs: number;

    /**
     * (Optional) Configuration for data loading and formatting
     */
    data_config?: TrainingConfig.DataConfig;

    /**
     * (Optional) Data type for model parameters (bf16, fp16, fp32)
     */
    dtype?: string;

    /**
     * (Optional) Configuration for memory and compute optimizations
     */
    efficiency_config?: TrainingConfig.EfficiencyConfig;

    /**
     * (Optional) Maximum number of validation steps per epoch
     */
    max_validation_steps?: number;

    /**
     * (Optional) Configuration for the optimization algorithm
     */
    optimizer_config?: TrainingConfig.OptimizerConfig;
  }

  export namespace TrainingConfig {
    /**
     * (Optional) Configuration for data loading and formatting
     */
    export interface DataConfig {
      /**
       * Number of samples per training batch
       */
      batch_size: number;

      /**
       * Format of the dataset (instruct or dialog)
       */
      data_format: 'instruct' | 'dialog';

      /**
       * Unique identifier for the training dataset
       */
      dataset_id: string;

      /**
       * Whether to shuffle the dataset during training
       */
      shuffle: boolean;

      /**
       * (Optional) Whether to pack multiple samples into a single sequence for
       * efficiency
       */
      packed?: boolean;

      /**
       * (Optional) Whether to compute loss on input tokens as well as output tokens
       */
      train_on_input?: boolean;

      /**
       * (Optional) Unique identifier for the validation dataset
       */
      validation_dataset_id?: string;
    }

    /**
     * (Optional) Configuration for memory and compute optimizations
     */
    export interface EfficiencyConfig {
      /**
       * (Optional) Whether to use activation checkpointing to reduce memory usage
       */
      enable_activation_checkpointing?: boolean;

      /**
       * (Optional) Whether to offload activations to CPU to save GPU memory
       */
      enable_activation_offloading?: boolean;

      /**
       * (Optional) Whether to offload FSDP parameters to CPU
       */
      fsdp_cpu_offload?: boolean;

      /**
       * (Optional) Whether to use memory-efficient FSDP wrapping
       */
      memory_efficient_fsdp_wrap?: boolean;
    }

    /**
     * (Optional) Configuration for the optimization algorithm
     */
    export interface OptimizerConfig {
      /**
       * Learning rate for the optimizer
       */
      lr: number;

      /**
       * Number of steps for learning rate warmup
       */
      num_warmup_steps: number;

      /**
       * Type of optimizer to use (adam, adamw, or sgd)
       */
      optimizer_type: 'adam' | 'adamw' | 'sgd';

      /**
       * Weight decay coefficient for regularization
       */
      weight_decay: number;
    }
  }
}

export interface PostTrainingSupervisedFineTuneParams {
  /**
   * The hyperparam search configuration.
   */
  hyperparam_search_config: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * The UUID of the job to create.
   */
  job_uuid: string;

  /**
   * The logger configuration.
   */
  logger_config: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  /**
   * The training configuration.
   */
  training_config: PostTrainingSupervisedFineTuneParams.TrainingConfig;

  /**
   * The algorithm configuration.
   */
  algorithm_config?: AlgorithmConfig;

  /**
   * The directory to save checkpoint(s) to.
   */
  checkpoint_dir?: string;

  /**
   * The model to fine-tune.
   */
  model?: string;
}

export namespace PostTrainingSupervisedFineTuneParams {
  /**
   * The training configuration.
   */
  export interface TrainingConfig {
    /**
     * Number of steps to accumulate gradients before updating
     */
    gradient_accumulation_steps: number;

    /**
     * Maximum number of steps to run per epoch
     */
    max_steps_per_epoch: number;

    /**
     * Number of training epochs to run
     */
    n_epochs: number;

    /**
     * (Optional) Configuration for data loading and formatting
     */
    data_config?: TrainingConfig.DataConfig;

    /**
     * (Optional) Data type for model parameters (bf16, fp16, fp32)
     */
    dtype?: string;

    /**
     * (Optional) Configuration for memory and compute optimizations
     */
    efficiency_config?: TrainingConfig.EfficiencyConfig;

    /**
     * (Optional) Maximum number of validation steps per epoch
     */
    max_validation_steps?: number;

    /**
     * (Optional) Configuration for the optimization algorithm
     */
    optimizer_config?: TrainingConfig.OptimizerConfig;
  }

  export namespace TrainingConfig {
    /**
     * (Optional) Configuration for data loading and formatting
     */
    export interface DataConfig {
      /**
       * Number of samples per training batch
       */
      batch_size: number;

      /**
       * Format of the dataset (instruct or dialog)
       */
      data_format: 'instruct' | 'dialog';

      /**
       * Unique identifier for the training dataset
       */
      dataset_id: string;

      /**
       * Whether to shuffle the dataset during training
       */
      shuffle: boolean;

      /**
       * (Optional) Whether to pack multiple samples into a single sequence for
       * efficiency
       */
      packed?: boolean;

      /**
       * (Optional) Whether to compute loss on input tokens as well as output tokens
       */
      train_on_input?: boolean;

      /**
       * (Optional) Unique identifier for the validation dataset
       */
      validation_dataset_id?: string;
    }

    /**
     * (Optional) Configuration for memory and compute optimizations
     */
    export interface EfficiencyConfig {
      /**
       * (Optional) Whether to use activation checkpointing to reduce memory usage
       */
      enable_activation_checkpointing?: boolean;

      /**
       * (Optional) Whether to offload activations to CPU to save GPU memory
       */
      enable_activation_offloading?: boolean;

      /**
       * (Optional) Whether to offload FSDP parameters to CPU
       */
      fsdp_cpu_offload?: boolean;

      /**
       * (Optional) Whether to use memory-efficient FSDP wrapping
       */
      memory_efficient_fsdp_wrap?: boolean;
    }

    /**
     * (Optional) Configuration for the optimization algorithm
     */
    export interface OptimizerConfig {
      /**
       * Learning rate for the optimizer
       */
      lr: number;

      /**
       * Number of steps for learning rate warmup
       */
      num_warmup_steps: number;

      /**
       * Type of optimizer to use (adam, adamw, or sgd)
       */
      optimizer_type: 'adam' | 'adamw' | 'sgd';

      /**
       * Weight decay coefficient for regularization
       */
      weight_decay: number;
    }
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
