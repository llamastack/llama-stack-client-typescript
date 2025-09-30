// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as InferenceAPI from './inference';
import { Inference, InferenceRerankParams, InferenceRerankResponse } from './inference';
import * as AgentsAPI from './agents/agents';
import {
  AgentCreateParams,
  AgentCreateResponse,
  AgentListParams,
  AgentListResponse,
  AgentRetrieveResponse,
  Agents,
  InferenceStep,
  MemoryRetrievalStep,
  ShieldCallStep,
  ToolExecutionStep,
  ToolResponse,
} from './agents/agents';
import * as EvalAPI from './eval/eval';
import {
  BenchmarkConfig,
  Eval,
  EvalEvaluateRowsAlphaParams,
  EvalEvaluateRowsParams,
  EvalRunEvalAlphaParams,
  EvalRunEvalParams,
  EvaluateResponse,
  Job,
} from './eval/eval';
import * as PostTrainingAPI from './post-training/post-training';
import {
  AlgorithmConfig,
  ListPostTrainingJobsResponse,
  PostTraining,
  PostTrainingJob,
  PostTrainingPreferenceOptimizeParams,
  PostTrainingSupervisedFineTuneParams,
} from './post-training/post-training';

export class Alpha extends APIResource {
  inference: InferenceAPI.Inference = new InferenceAPI.Inference(this._client);
  postTraining: PostTrainingAPI.PostTraining = new PostTrainingAPI.PostTraining(this._client);
  eval: EvalAPI.Eval = new EvalAPI.Eval(this._client);
  agents: AgentsAPI.Agents = new AgentsAPI.Agents(this._client);
}

Alpha.Inference = Inference;
Alpha.PostTraining = PostTraining;
Alpha.Eval = Eval;
Alpha.Agents = Agents;

export declare namespace Alpha {
  export {
    Inference as Inference,
    type InferenceRerankResponse as InferenceRerankResponse,
    type InferenceRerankParams as InferenceRerankParams,
  };

  export {
    PostTraining as PostTraining,
    type AlgorithmConfig as AlgorithmConfig,
    type ListPostTrainingJobsResponse as ListPostTrainingJobsResponse,
    type PostTrainingJob as PostTrainingJob,
    type PostTrainingPreferenceOptimizeParams as PostTrainingPreferenceOptimizeParams,
    type PostTrainingSupervisedFineTuneParams as PostTrainingSupervisedFineTuneParams,
  };

  export {
    Eval as Eval,
    type BenchmarkConfig as BenchmarkConfig,
    type EvaluateResponse as EvaluateResponse,
    type Job as Job,
    type EvalEvaluateRowsParams as EvalEvaluateRowsParams,
    type EvalEvaluateRowsAlphaParams as EvalEvaluateRowsAlphaParams,
    type EvalRunEvalParams as EvalRunEvalParams,
    type EvalRunEvalAlphaParams as EvalRunEvalAlphaParams,
  };

  export {
    Agents as Agents,
    type InferenceStep as InferenceStep,
    type MemoryRetrievalStep as MemoryRetrievalStep,
    type ShieldCallStep as ShieldCallStep,
    type ToolExecutionStep as ToolExecutionStep,
    type ToolResponse as ToolResponse,
    type AgentCreateResponse as AgentCreateResponse,
    type AgentRetrieveResponse as AgentRetrieveResponse,
    type AgentListResponse as AgentListResponse,
    type AgentCreateParams as AgentCreateParams,
    type AgentListParams as AgentListParams,
  };
}
