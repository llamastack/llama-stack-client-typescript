// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as JobAPI from './job';
import {
  Job,
  JobCancelParams,
  JobRetrieveArtifactsParams,
  JobRetrieveArtifactsResponse,
  JobRetrieveStatusParams,
  JobRetrieveStatusResponse,
} from './job';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class PostTraining extends APIResource {
  job: JobAPI.Job = new JobAPI.Job(this._client);

  fineTuneSupervised(
    body: PostTrainingFineTuneSupervisedParams,
    options?: RequestOptions,
  ): APIPromise<PostTrainingJob> {
    return this._client.post('/v1/post-training/supervised-fine-tune', { body, ...options });
  }

  listJobs(options?: RequestOptions): APIPromise<PostTrainingListJobsResponse> {
    return this._client.get('/v1/post-training/jobs', options);
  }

  optimizePreferences(
    body: PostTrainingOptimizePreferencesParams,
    options?: RequestOptions,
  ): APIPromise<PostTrainingJob> {
    return this._client.post('/v1/post-training/preference-optimize', { body, ...options });
  }
}

export interface PostTrainingJob {
  job_uuid: string;
}

export interface TrainingConfig {
  gradient_accumulation_steps: number;

  max_steps_per_epoch: number;

  n_epochs: number;

  data_config?: TrainingConfig.DataConfig;

  dtype?: string;

  efficiency_config?: TrainingConfig.EfficiencyConfig;

  max_validation_steps?: number;

  optimizer_config?: TrainingConfig.OptimizerConfig;
}

export namespace TrainingConfig {
  export interface DataConfig {
    batch_size: number;

    data_format: 'instruct' | 'dialog';

    dataset_id: string;

    shuffle: boolean;

    packed?: boolean;

    train_on_input?: boolean;

    validation_dataset_id?: string;
  }

  export interface EfficiencyConfig {
    enable_activation_checkpointing?: boolean;

    enable_activation_offloading?: boolean;

    fsdp_cpu_offload?: boolean;

    memory_efficient_fsdp_wrap?: boolean;
  }

  export interface OptimizerConfig {
    lr: number;

    num_warmup_steps: number;

    optimizer_type: 'adam' | 'adamw' | 'sgd';

    weight_decay: number;
  }
}

export interface PostTrainingListJobsResponse {
  data: Array<PostTrainingListJobsResponse.Data>;
}

export namespace PostTrainingListJobsResponse {
  export interface Data {
    job_uuid: string;
  }
}

export interface PostTrainingFineTuneSupervisedParams {
  hyperparam_search_config: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  job_uuid: string;

  logger_config: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  training_config: TrainingConfig;

  algorithm_config?:
    | PostTrainingFineTuneSupervisedParams.LoraFinetuningConfig
    | PostTrainingFineTuneSupervisedParams.QatFinetuningConfig;

  checkpoint_dir?: string;

  model?: string;
}

export namespace PostTrainingFineTuneSupervisedParams {
  export interface LoraFinetuningConfig {
    alpha: number;

    apply_lora_to_mlp: boolean;

    apply_lora_to_output: boolean;

    lora_attn_modules: Array<string>;

    rank: number;

    type: 'LoRA';

    quantize_base?: boolean;

    use_dora?: boolean;
  }

  export interface QatFinetuningConfig {
    group_size: number;

    quantizer_name: string;

    type: 'QAT';
  }
}

export interface PostTrainingOptimizePreferencesParams {
  algorithm_config: PostTrainingOptimizePreferencesParams.AlgorithmConfig;

  finetuned_model: string;

  hyperparam_search_config: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  job_uuid: string;

  logger_config: { [key: string]: boolean | number | string | Array<unknown> | unknown | null };

  training_config: TrainingConfig;
}

export namespace PostTrainingOptimizePreferencesParams {
  export interface AlgorithmConfig {
    epsilon: number;

    gamma: number;

    reward_clip: number;

    reward_scale: number;
  }
}

PostTraining.Job = Job;

export declare namespace PostTraining {
  export {
    type PostTrainingJob as PostTrainingJob,
    type TrainingConfig as TrainingConfig,
    type PostTrainingListJobsResponse as PostTrainingListJobsResponse,
    type PostTrainingFineTuneSupervisedParams as PostTrainingFineTuneSupervisedParams,
    type PostTrainingOptimizePreferencesParams as PostTrainingOptimizePreferencesParams,
  };

  export {
    Job as Job,
    type JobRetrieveArtifactsResponse as JobRetrieveArtifactsResponse,
    type JobRetrieveStatusResponse as JobRetrieveStatusResponse,
    type JobCancelParams as JobCancelParams,
    type JobRetrieveArtifactsParams as JobRetrieveArtifactsParams,
    type JobRetrieveStatusParams as JobRetrieveStatusParams,
  };
}
