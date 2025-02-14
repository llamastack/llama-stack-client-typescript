// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as qs from './internal/qs';
import * as Core from './core';
import * as Errors from './error';
import * as Uploads from './uploads';
import * as API from './resources/index';
import {
  BatchInference,
  BatchInferenceChatCompletionParams,
  BatchInferenceChatCompletionResponse,
  BatchInferenceCompletionParams,
} from './resources/batch-inference';
import {
  Benchmark,
  BenchmarkListResponse,
  BenchmarkRegisterParams,
  Benchmarks,
  ListBenchmarksResponse,
} from './resources/benchmarks';
import {
  Datasetio,
  DatasetioAppendRowsParams,
  DatasetioGetRowsPaginatedParams,
  PaginatedRowsResult,
} from './resources/datasetio';
import {
  DatasetListResponse,
  DatasetRegisterParams,
  DatasetRetrieveResponse,
  Datasets,
  ListDatasetsResponse,
} from './resources/datasets';
import { EvalTaskListResponse, EvalTaskRegisterParams, EvalTasks } from './resources/eval-tasks';
import {
  ChatCompletionResponseStreamChunk,
  CompletionResponse,
  EmbeddingsResponse,
  Inference,
  InferenceChatCompletionParams,
  InferenceChatCompletionParamsNonStreaming,
  InferenceChatCompletionParamsStreaming,
  InferenceCompletionParams,
  InferenceCompletionParamsNonStreaming,
  InferenceCompletionParamsStreaming,
  InferenceEmbeddingsParams,
  TokenLogProbs,
} from './resources/inference';
import { HealthInfo, Inspect, ProviderInfo, RouteInfo, VersionInfo } from './resources/inspect';
import {
  ListModelsResponse,
  Model,
  ModelListResponse,
  ModelRegisterParams,
  Models,
} from './resources/models';
import { ListProvidersResponse, ProviderListResponse, Providers } from './resources/providers';
import { ListRoutesResponse, RouteListResponse, Routes } from './resources/routes';
import { RunShieldResponse, Safety, SafetyRunShieldParams } from './resources/safety';
import {
  Scoring,
  ScoringScoreBatchParams,
  ScoringScoreBatchResponse,
  ScoringScoreParams,
  ScoringScoreResponse,
} from './resources/scoring';
import {
  ListScoringFunctionsResponse,
  ScoringFn,
  ScoringFnParams,
  ScoringFunctionListResponse,
  ScoringFunctionRegisterParams,
  ScoringFunctions,
} from './resources/scoring-functions';
import {
  ListShieldsResponse,
  Shield,
  ShieldListResponse,
  ShieldRegisterParams,
  Shields,
} from './resources/shields';
import {
  SyntheticDataGeneration,
  SyntheticDataGenerationGenerateParams,
  SyntheticDataGenerationResponse,
} from './resources/synthetic-data-generation';
import {
  Event,
  QueryCondition,
  QuerySpansResponse,
  SpanWithStatus,
  Telemetry,
  TelemetryGetSpanResponse,
  TelemetryGetSpanTreeParams,
  TelemetryGetSpanTreeResponse,
  TelemetryLogEventParams,
  TelemetryQuerySpansParams,
  TelemetryQuerySpansResponse,
  TelemetryQueryTracesParams,
  TelemetryQueryTracesResponse,
  TelemetrySaveSpansToDatasetParams,
  Trace,
} from './resources/telemetry';
import {
  ListToolGroupsResponse,
  ToolGroup,
  ToolgroupListResponse,
  ToolgroupRegisterParams,
  Toolgroups,
} from './resources/toolgroups';
import { ListToolsResponse, Tool, ToolListParams, ToolListResponse, Tools } from './resources/tools';
import {
  ListVectorDBsResponse,
  VectorDBListResponse,
  VectorDBRegisterParams,
  VectorDBRegisterResponse,
  VectorDBRetrieveResponse,
  VectorDBs,
} from './resources/vector-dbs';
import {
  QueryChunksResponse,
  VectorIo,
  VectorIoInsertParams,
  VectorIoQueryParams,
} from './resources/vector-io';
import {
  AgentCreateParams,
  AgentCreateResponse,
  Agents,
  InferenceStep,
  MemoryRetrievalStep,
  ShieldCallStep,
  ToolExecutionStep,
  ToolResponse,
} from './resources/agents/agents';
import {
  Eval,
  EvalCandidate,
  EvalEvaluateRowsAlphaParams,
  EvalEvaluateRowsParams,
  EvalRunEvalAlphaParams,
  EvalRunEvalParams,
  EvalTaskConfig,
  EvaluateResponse,
  Job,
} from './resources/eval/eval';
import {
  AlgorithmConfig,
  ListPostTrainingJobsResponse,
  PostTraining,
  PostTrainingJob,
  PostTrainingPreferenceOptimizeParams,
  PostTrainingSupervisedFineTuneParams,
} from './resources/post-training/post-training';
import {
  ToolDef,
  ToolInvocationResult,
  ToolRuntime,
  ToolRuntimeInvokeToolParams,
  ToolRuntimeListToolsParams,
} from './resources/tool-runtime/tool-runtime';

export interface ClientOptions {
  /**
   * Defaults to process.env['LLAMA_STACK_CLIENT_API_KEY'].
   */
  apiKey?: string | null | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['LLAMA_STACK_CLIENT_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number | undefined;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery | undefined;
}

/**
 * API Client for interfacing with the Llama Stack Client API.
 */
export class LlamaStackClient extends Core.APIClient {
  apiKey: string | null;

  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Llama Stack Client API.
   *
   * @param {string | null | undefined} [opts.apiKey=process.env['LLAMA_STACK_CLIENT_API_KEY'] ?? null]
   * @param {string} [opts.baseURL=process.env['LLAMA_STACK_CLIENT_BASE_URL'] ?? http://any-hosted-llama-stack.com] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = Core.readEnv('LLAMA_STACK_CLIENT_BASE_URL'),
    apiKey = Core.readEnv('LLAMA_STACK_CLIENT_API_KEY') ?? null,
    ...opts
  }: ClientOptions = {}) {
    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL: baseURL || `http://any-hosted-llama-stack.com`,
    };

    super({
      baseURL: options.baseURL!,
      timeout: options.timeout ?? 60000 /* 1 minute */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });

    this._options = options;

    this.apiKey = apiKey;
  }

  toolgroups: API.Toolgroups = new API.Toolgroups(this);
  tools: API.Tools = new API.Tools(this);
  toolRuntime: API.ToolRuntime = new API.ToolRuntime(this);
  agents: API.Agents = new API.Agents(this);
  batchInference: API.BatchInference = new API.BatchInference(this);
  datasets: API.Datasets = new API.Datasets(this);
  eval: API.Eval = new API.Eval(this);
  inspect: API.Inspect = new API.Inspect(this);
  inference: API.Inference = new API.Inference(this);
  vectorIo: API.VectorIo = new API.VectorIo(this);
  vectorDBs: API.VectorDBs = new API.VectorDBs(this);
  models: API.Models = new API.Models(this);
  postTraining: API.PostTraining = new API.PostTraining(this);
  providers: API.Providers = new API.Providers(this);
  routes: API.Routes = new API.Routes(this);
  safety: API.Safety = new API.Safety(this);
  shields: API.Shields = new API.Shields(this);
  syntheticDataGeneration: API.SyntheticDataGeneration = new API.SyntheticDataGeneration(this);
  telemetry: API.Telemetry = new API.Telemetry(this);
  datasetio: API.Datasetio = new API.Datasetio(this);
  scoring: API.Scoring = new API.Scoring(this);
  scoringFunctions: API.ScoringFunctions = new API.ScoringFunctions(this);
  evalTasks: API.EvalTasks = new API.EvalTasks(this);
  benchmarks: API.Benchmarks = new API.Benchmarks(this);

  protected override defaultQuery(): Core.DefaultQuery | undefined {
    return this._options.defaultQuery;
  }

  protected override defaultHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    return {
      ...super.defaultHeaders(opts),
      ...this._options.defaultHeaders,
    };
  }

  protected override authHeaders(opts: Core.FinalRequestOptions): Core.Headers {
    if (this.apiKey == null) {
      return {};
    }
    return { Authorization: `Bearer ${this.apiKey}` };
  }

  protected override stringifyQuery(query: Record<string, unknown>): string {
    return qs.stringify(query, { arrayFormat: 'comma' });
  }

  static LlamaStackClient = this;
  static DEFAULT_TIMEOUT = 60000; // 1 minute

  static LlamaStackClientError = Errors.LlamaStackClientError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static RateLimitError = Errors.RateLimitError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static InternalServerError = Errors.InternalServerError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;

  static toFile = Uploads.toFile;
  static fileFromPath = Uploads.fileFromPath;
}

LlamaStackClient.Toolgroups = Toolgroups;
LlamaStackClient.Tools = Tools;
LlamaStackClient.ToolRuntime = ToolRuntime;
LlamaStackClient.Agents = Agents;
LlamaStackClient.BatchInference = BatchInference;
LlamaStackClient.Datasets = Datasets;
LlamaStackClient.Eval = Eval;
LlamaStackClient.Inspect = Inspect;
LlamaStackClient.Inference = Inference;
LlamaStackClient.VectorIo = VectorIo;
LlamaStackClient.VectorDBs = VectorDBs;
LlamaStackClient.Models = Models;
LlamaStackClient.PostTraining = PostTraining;
LlamaStackClient.Providers = Providers;
LlamaStackClient.Routes = Routes;
LlamaStackClient.Safety = Safety;
LlamaStackClient.Shields = Shields;
LlamaStackClient.SyntheticDataGeneration = SyntheticDataGeneration;
LlamaStackClient.Telemetry = Telemetry;
LlamaStackClient.Datasetio = Datasetio;
LlamaStackClient.Scoring = Scoring;
LlamaStackClient.ScoringFunctions = ScoringFunctions;
LlamaStackClient.EvalTasks = EvalTasks;
LlamaStackClient.Benchmarks = Benchmarks;
export declare namespace LlamaStackClient {
  export type RequestOptions = Core.RequestOptions;

  export {
    Toolgroups as Toolgroups,
    type ListToolGroupsResponse as ListToolGroupsResponse,
    type ToolGroup as ToolGroup,
    type ToolgroupListResponse as ToolgroupListResponse,
    type ToolgroupRegisterParams as ToolgroupRegisterParams,
  };

  export {
    Tools as Tools,
    type ListToolsResponse as ListToolsResponse,
    type Tool as Tool,
    type ToolListResponse as ToolListResponse,
    type ToolListParams as ToolListParams,
  };

  export {
    ToolRuntime as ToolRuntime,
    type ToolDef as ToolDef,
    type ToolInvocationResult as ToolInvocationResult,
    type ToolRuntimeInvokeToolParams as ToolRuntimeInvokeToolParams,
    type ToolRuntimeListToolsParams as ToolRuntimeListToolsParams,
  };

  export {
    Agents as Agents,
    type InferenceStep as InferenceStep,
    type MemoryRetrievalStep as MemoryRetrievalStep,
    type ShieldCallStep as ShieldCallStep,
    type ToolExecutionStep as ToolExecutionStep,
    type ToolResponse as ToolResponse,
    type AgentCreateResponse as AgentCreateResponse,
    type AgentCreateParams as AgentCreateParams,
  };

  export {
    BatchInference as BatchInference,
    type BatchInferenceChatCompletionResponse as BatchInferenceChatCompletionResponse,
    type BatchInferenceChatCompletionParams as BatchInferenceChatCompletionParams,
    type BatchInferenceCompletionParams as BatchInferenceCompletionParams,
  };

  export {
    Datasets as Datasets,
    type ListDatasetsResponse as ListDatasetsResponse,
    type DatasetRetrieveResponse as DatasetRetrieveResponse,
    type DatasetListResponse as DatasetListResponse,
    type DatasetRegisterParams as DatasetRegisterParams,
  };

  export {
    Eval as Eval,
    type EvalCandidate as EvalCandidate,
    type EvalTaskConfig as EvalTaskConfig,
    type EvaluateResponse as EvaluateResponse,
    type Job as Job,
    type EvalEvaluateRowsParams as EvalEvaluateRowsParams,
    type EvalEvaluateRowsAlphaParams as EvalEvaluateRowsAlphaParams,
    type EvalRunEvalParams as EvalRunEvalParams,
    type EvalRunEvalAlphaParams as EvalRunEvalAlphaParams,
  };

  export {
    Inspect as Inspect,
    type HealthInfo as HealthInfo,
    type ProviderInfo as ProviderInfo,
    type RouteInfo as RouteInfo,
    type VersionInfo as VersionInfo,
  };

  export {
    Inference as Inference,
    type ChatCompletionResponseStreamChunk as ChatCompletionResponseStreamChunk,
    type CompletionResponse as CompletionResponse,
    type EmbeddingsResponse as EmbeddingsResponse,
    type TokenLogProbs as TokenLogProbs,
    type InferenceChatCompletionParams as InferenceChatCompletionParams,
    type InferenceChatCompletionParamsNonStreaming as InferenceChatCompletionParamsNonStreaming,
    type InferenceChatCompletionParamsStreaming as InferenceChatCompletionParamsStreaming,
    type InferenceCompletionParams as InferenceCompletionParams,
    type InferenceCompletionParamsNonStreaming as InferenceCompletionParamsNonStreaming,
    type InferenceCompletionParamsStreaming as InferenceCompletionParamsStreaming,
    type InferenceEmbeddingsParams as InferenceEmbeddingsParams,
  };

  export {
    VectorIo as VectorIo,
    type QueryChunksResponse as QueryChunksResponse,
    type VectorIoInsertParams as VectorIoInsertParams,
    type VectorIoQueryParams as VectorIoQueryParams,
  };

  export {
    VectorDBs as VectorDBs,
    type ListVectorDBsResponse as ListVectorDBsResponse,
    type VectorDBRetrieveResponse as VectorDBRetrieveResponse,
    type VectorDBListResponse as VectorDBListResponse,
    type VectorDBRegisterResponse as VectorDBRegisterResponse,
    type VectorDBRegisterParams as VectorDBRegisterParams,
  };

  export {
    Models as Models,
    type ListModelsResponse as ListModelsResponse,
    type Model as Model,
    type ModelListResponse as ModelListResponse,
    type ModelRegisterParams as ModelRegisterParams,
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
    Providers as Providers,
    type ListProvidersResponse as ListProvidersResponse,
    type ProviderListResponse as ProviderListResponse,
  };

  export {
    Routes as Routes,
    type ListRoutesResponse as ListRoutesResponse,
    type RouteListResponse as RouteListResponse,
  };

  export {
    Safety as Safety,
    type RunShieldResponse as RunShieldResponse,
    type SafetyRunShieldParams as SafetyRunShieldParams,
  };

  export {
    Shields as Shields,
    type ListShieldsResponse as ListShieldsResponse,
    type Shield as Shield,
    type ShieldListResponse as ShieldListResponse,
    type ShieldRegisterParams as ShieldRegisterParams,
  };

  export {
    SyntheticDataGeneration as SyntheticDataGeneration,
    type SyntheticDataGenerationResponse as SyntheticDataGenerationResponse,
    type SyntheticDataGenerationGenerateParams as SyntheticDataGenerationGenerateParams,
  };

  export {
    Telemetry as Telemetry,
    type Event as Event,
    type QueryCondition as QueryCondition,
    type QuerySpansResponse as QuerySpansResponse,
    type SpanWithStatus as SpanWithStatus,
    type Trace as Trace,
    type TelemetryGetSpanResponse as TelemetryGetSpanResponse,
    type TelemetryGetSpanTreeResponse as TelemetryGetSpanTreeResponse,
    type TelemetryQuerySpansResponse as TelemetryQuerySpansResponse,
    type TelemetryQueryTracesResponse as TelemetryQueryTracesResponse,
    type TelemetryGetSpanTreeParams as TelemetryGetSpanTreeParams,
    type TelemetryLogEventParams as TelemetryLogEventParams,
    type TelemetryQuerySpansParams as TelemetryQuerySpansParams,
    type TelemetryQueryTracesParams as TelemetryQueryTracesParams,
    type TelemetrySaveSpansToDatasetParams as TelemetrySaveSpansToDatasetParams,
  };

  export {
    Datasetio as Datasetio,
    type PaginatedRowsResult as PaginatedRowsResult,
    type DatasetioAppendRowsParams as DatasetioAppendRowsParams,
    type DatasetioGetRowsPaginatedParams as DatasetioGetRowsPaginatedParams,
  };

  export {
    Scoring as Scoring,
    type ScoringScoreResponse as ScoringScoreResponse,
    type ScoringScoreBatchResponse as ScoringScoreBatchResponse,
    type ScoringScoreParams as ScoringScoreParams,
    type ScoringScoreBatchParams as ScoringScoreBatchParams,
  };

  export {
    ScoringFunctions as ScoringFunctions,
    type ListScoringFunctionsResponse as ListScoringFunctionsResponse,
    type ScoringFn as ScoringFn,
    type ScoringFnParams as ScoringFnParams,
    type ScoringFunctionListResponse as ScoringFunctionListResponse,
    type ScoringFunctionRegisterParams as ScoringFunctionRegisterParams,
  };

  export {
    EvalTasks as EvalTasks,
    type EvalTaskListResponse as EvalTaskListResponse,
    type EvalTaskRegisterParams as EvalTaskRegisterParams,
  };

  export {
    Benchmarks as Benchmarks,
    type Benchmark as Benchmark,
    type ListBenchmarksResponse as ListBenchmarksResponse,
    type BenchmarkListResponse as BenchmarkListResponse,
    type BenchmarkRegisterParams as BenchmarkRegisterParams,
  };

  export type AgentConfig = API.AgentConfig;
  export type BatchCompletion = API.BatchCompletion;
  export type ChatCompletionResponse = API.ChatCompletionResponse;
  export type CompletionMessage = API.CompletionMessage;
  export type ContentDelta = API.ContentDelta;
  export type Document = API.Document;
  export type InterleavedContent = API.InterleavedContent;
  export type InterleavedContentItem = API.InterleavedContentItem;
  export type Message = API.Message;
  export type ParamType = API.ParamType;
  export type QueryConfig = API.QueryConfig;
  export type QueryGeneratorConfig = API.QueryGeneratorConfig;
  export type QueryResult = API.QueryResult;
  export type ResponseFormat = API.ResponseFormat;
  export type ReturnType = API.ReturnType;
  export type SafetyViolation = API.SafetyViolation;
  export type SamplingParams = API.SamplingParams;
  export type ScoringResult = API.ScoringResult;
  export type SystemMessage = API.SystemMessage;
  export type ToolCall = API.ToolCall;
  export type ToolCallOrString = API.ToolCallOrString;
  export type ToolParamDefinition = API.ToolParamDefinition;
  export type ToolResponseMessage = API.ToolResponseMessage;
  export type UserMessage = API.UserMessage;
}

export { toFile, fileFromPath } from './uploads';
export {
  LlamaStackClientError,
  APIError,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIUserAbortError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  AuthenticationError,
  InternalServerError,
  PermissionDeniedError,
  UnprocessableEntityError,
} from './error';

export default LlamaStackClient;
