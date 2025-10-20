// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';
import { Response } from 'node-fetch';

const client = new LlamaStackClient({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource postTraining', () => {
  test('preferenceOptimize: only required params', async () => {
    const responsePromise = client.postTraining.preferenceOptimize({
      algorithm_config: { beta: 0, loss_type: 'sigmoid' },
      finetuned_model: 'finetuned_model',
      hyperparam_search_config: { foo: true },
      job_uuid: 'job_uuid',
      logger_config: { foo: true },
      training_config: { gradient_accumulation_steps: 0, max_steps_per_epoch: 0, n_epochs: 0 },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('preferenceOptimize: required and optional params', async () => {
    const response = await client.postTraining.preferenceOptimize({
      algorithm_config: { beta: 0, loss_type: 'sigmoid' },
      finetuned_model: 'finetuned_model',
      hyperparam_search_config: { foo: true },
      job_uuid: 'job_uuid',
      logger_config: { foo: true },
      training_config: {
        gradient_accumulation_steps: 0,
        max_steps_per_epoch: 0,
        n_epochs: 0,
        data_config: {
          batch_size: 0,
          data_format: 'instruct',
          dataset_id: 'dataset_id',
          shuffle: true,
          packed: true,
          train_on_input: true,
          validation_dataset_id: 'validation_dataset_id',
        },
        dtype: 'dtype',
        efficiency_config: {
          enable_activation_checkpointing: true,
          enable_activation_offloading: true,
          fsdp_cpu_offload: true,
          memory_efficient_fsdp_wrap: true,
        },
        max_validation_steps: 0,
        optimizer_config: { lr: 0, num_warmup_steps: 0, optimizer_type: 'adam', weight_decay: 0 },
      },
    });
  });

  test('supervisedFineTune: only required params', async () => {
    const responsePromise = client.postTraining.supervisedFineTune({
      hyperparam_search_config: { foo: true },
      job_uuid: 'job_uuid',
      logger_config: { foo: true },
      training_config: { gradient_accumulation_steps: 0, max_steps_per_epoch: 0, n_epochs: 0 },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('supervisedFineTune: required and optional params', async () => {
    const response = await client.postTraining.supervisedFineTune({
      hyperparam_search_config: { foo: true },
      job_uuid: 'job_uuid',
      logger_config: { foo: true },
      training_config: {
        gradient_accumulation_steps: 0,
        max_steps_per_epoch: 0,
        n_epochs: 0,
        data_config: {
          batch_size: 0,
          data_format: 'instruct',
          dataset_id: 'dataset_id',
          shuffle: true,
          packed: true,
          train_on_input: true,
          validation_dataset_id: 'validation_dataset_id',
        },
        dtype: 'dtype',
        efficiency_config: {
          enable_activation_checkpointing: true,
          enable_activation_offloading: true,
          fsdp_cpu_offload: true,
          memory_efficient_fsdp_wrap: true,
        },
        max_validation_steps: 0,
        optimizer_config: { lr: 0, num_warmup_steps: 0, optimizer_type: 'adam', weight_decay: 0 },
      },
      algorithm_config: {
        alpha: 0,
        apply_lora_to_mlp: true,
        apply_lora_to_output: true,
        lora_attn_modules: ['string'],
        rank: 0,
        type: 'LoRA',
        quantize_base: true,
        use_dora: true,
      },
      checkpoint_dir: 'checkpoint_dir',
      model: 'model',
    });
  });
});
