// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as BenchmarksAPI from './benchmarks';
import { Benchmarks } from './benchmarks';
import * as InferenceAPI from './inference';
import { Inference } from './inference';
import * as AgentsAPI from './agents/agents';
import { Agents } from './agents/agents';
import * as EvalAPI from './eval/eval';
import { Eval } from './eval/eval';
import * as PostTrainingAPI from './post-training/post-training';
import { PostTraining } from './post-training/post-training';

export class Alpha extends APIResource {
  inference: InferenceAPI.Inference = new InferenceAPI.Inference(this._client);
  postTraining: PostTrainingAPI.PostTraining = new PostTrainingAPI.PostTraining(this._client);
  benchmarks: BenchmarksAPI.Benchmarks = new BenchmarksAPI.Benchmarks(this._client);
  eval: EvalAPI.Eval = new EvalAPI.Eval(this._client);
  agents: AgentsAPI.Agents = new AgentsAPI.Agents(this._client);
}

Alpha.Inference = Inference;
Alpha.PostTraining = PostTraining;
Alpha.Benchmarks = Benchmarks;
Alpha.Eval = Eval;
Alpha.Agents = Agents;

export declare namespace Alpha {
  export { Inference as Inference };

  export { PostTraining as PostTraining };

  export { Benchmarks as Benchmarks };

  export { Eval as Eval };

  export { Agents as Agents };
}
