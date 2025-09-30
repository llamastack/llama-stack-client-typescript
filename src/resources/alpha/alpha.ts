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

export class Alpha extends APIResource {
  inference: InferenceAPI.Inference = new InferenceAPI.Inference(this._client);
  agents: AgentsAPI.Agents = new AgentsAPI.Agents(this._client);
}

Alpha.Inference = Inference;
Alpha.Agents = Agents;

export declare namespace Alpha {
  export {
    Inference as Inference,
    type InferenceRerankResponse as InferenceRerankResponse,
    type InferenceRerankParams as InferenceRerankParams,
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
