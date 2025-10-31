// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.
//
// This source code is licensed under the terms described in the LICENSE file in
// the root directory of this source tree.

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { type Agent } from './_shims/index';
import * as qs from './internal/qs';
import * as Core from './core';
import * as Errors from './error';
import * as Pagination from './pagination';
import {
  type DatasetsIterrowsParams,
  DatasetsIterrowsResponse,
  type OpenAICursorPageParams,
  OpenAICursorPageResponse,
} from './pagination';
import * as Uploads from './uploads';
import * as API from './resources/index';
import {
  CompletionCreateParams,
  CompletionCreateParamsNonStreaming,
  CompletionCreateParamsStreaming,
  CompletionCreateResponse,
  Completions,
} from './resources/completions';
import { CreateEmbeddingsResponse, EmbeddingCreateParams, Embeddings } from './resources/embeddings';
import {
  DeleteFileResponse,
  File,
  FileContentResponse,
  FileCreateParams,
  FileListParams,
  Files,
  FilesOpenAICursorPage,
  ListFilesResponse,
} from './resources/files';
import { HealthInfo, Inspect, ProviderInfo, RouteInfo, VersionInfo } from './resources/inspect';
import { CreateResponse, ModerationCreateParams, Moderations } from './resources/moderations';
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
  ListToolGroupsResponse,
  ToolGroup,
  ToolgroupListResponse,
  ToolgroupRegisterParams,
  Toolgroups,
} from './resources/toolgroups';
import { ToolListParams, ToolListResponse, Tools } from './resources/tools';
import {
  QueryChunksResponse,
  VectorIo,
  VectorIoInsertParams,
  VectorIoQueryParams,
} from './resources/vector-io';
import { Alpha } from './resources/alpha/alpha';
import { Beta } from './resources/beta/beta';
import { Chat, ChatCompletionChunk } from './resources/chat/chat';
import {
  ConversationCreateParams,
  ConversationDeleteResponse,
  ConversationObject,
  ConversationUpdateParams,
  Conversations,
} from './resources/conversations/conversations';
import {
  ListModelsResponse,
  Model,
  ModelListResponse,
  ModelRegisterParams,
  Models,
} from './resources/models/models';
import {
  ListPromptsResponse,
  Prompt,
  PromptCreateParams,
  PromptListResponse,
  PromptRetrieveParams,
  PromptSetDefaultVersionParams,
  PromptUpdateParams,
  Prompts,
} from './resources/prompts/prompts';
import {
  ResponseCreateParams,
  ResponseCreateParamsNonStreaming,
  ResponseCreateParamsStreaming,
  ResponseDeleteResponse,
  ResponseListParams,
  ResponseListResponse,
  ResponseListResponsesOpenAICursorPage,
  ResponseObject,
  ResponseObjectStream,
  Responses,
} from './resources/responses/responses';
import {
  ToolDef,
  ToolInvocationResult,
  ToolRuntime,
  ToolRuntimeInvokeToolParams,
  ToolRuntimeListToolsParams,
  ToolRuntimeListToolsResponse,
} from './resources/tool-runtime/tool-runtime';
import {
  ListVectorStoresResponse,
  VectorStore,
  VectorStoreCreateParams,
  VectorStoreDeleteResponse,
  VectorStoreListParams,
  VectorStoreSearchParams,
  VectorStoreSearchResponse,
  VectorStoreUpdateParams,
  VectorStores,
  VectorStoresOpenAICursorPage,
} from './resources/vector-stores/vector-stores';

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
   *
   * @unit milliseconds
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
      baseURLOverridden: baseURL ? baseURL !== 'http://any-hosted-llama-stack.com' : false,
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
  responses: API.Responses = new API.Responses(this);
  prompts: API.Prompts = new API.Prompts(this);
  conversations: API.Conversations = new API.Conversations(this);
  inspect: API.Inspect = new API.Inspect(this);
  embeddings: API.Embeddings = new API.Embeddings(this);
  chat: API.Chat = new API.Chat(this);
  completions: API.Completions = new API.Completions(this);
  vectorIo: API.VectorIo = new API.VectorIo(this);
  vectorStores: API.VectorStores = new API.VectorStores(this);
  models: API.Models = new API.Models(this);
  providers: API.Providers = new API.Providers(this);
  routes: API.Routes = new API.Routes(this);
  moderations: API.Moderations = new API.Moderations(this);
  safety: API.Safety = new API.Safety(this);
  shields: API.Shields = new API.Shields(this);
  syntheticDataGeneration: API.SyntheticDataGeneration = new API.SyntheticDataGeneration(this);
  scoring: API.Scoring = new API.Scoring(this);
  scoringFunctions: API.ScoringFunctions = new API.ScoringFunctions(this);
  files: API.Files = new API.Files(this);
  alpha: API.Alpha = new API.Alpha(this);
  beta: API.Beta = new API.Beta(this);

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== 'http://any-hosted-llama-stack.com';
  }

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
LlamaStackClient.Responses = Responses;
LlamaStackClient.ResponseListResponsesOpenAICursorPage = ResponseListResponsesOpenAICursorPage;
LlamaStackClient.Prompts = Prompts;
LlamaStackClient.Conversations = Conversations;
LlamaStackClient.Inspect = Inspect;
LlamaStackClient.Embeddings = Embeddings;
LlamaStackClient.Chat = Chat;
LlamaStackClient.Completions = Completions;
LlamaStackClient.VectorIo = VectorIo;
LlamaStackClient.VectorStores = VectorStores;
LlamaStackClient.VectorStoresOpenAICursorPage = VectorStoresOpenAICursorPage;
LlamaStackClient.Models = Models;
LlamaStackClient.Providers = Providers;
LlamaStackClient.Routes = Routes;
LlamaStackClient.Moderations = Moderations;
LlamaStackClient.Safety = Safety;
LlamaStackClient.Shields = Shields;
LlamaStackClient.SyntheticDataGeneration = SyntheticDataGeneration;
LlamaStackClient.Scoring = Scoring;
LlamaStackClient.ScoringFunctions = ScoringFunctions;
LlamaStackClient.Files = Files;
LlamaStackClient.FilesOpenAICursorPage = FilesOpenAICursorPage;
LlamaStackClient.Alpha = Alpha;
LlamaStackClient.Beta = Beta;

export declare namespace LlamaStackClient {
  export type RequestOptions = Core.RequestOptions;

  export import DatasetsIterrows = Pagination.DatasetsIterrows;
  export {
    type DatasetsIterrowsParams as DatasetsIterrowsParams,
    type DatasetsIterrowsResponse as DatasetsIterrowsResponse,
  };

  export import OpenAICursorPage = Pagination.OpenAICursorPage;
  export {
    type OpenAICursorPageParams as OpenAICursorPageParams,
    type OpenAICursorPageResponse as OpenAICursorPageResponse,
  };

  export {
    Toolgroups as Toolgroups,
    type ListToolGroupsResponse as ListToolGroupsResponse,
    type ToolGroup as ToolGroup,
    type ToolgroupListResponse as ToolgroupListResponse,
    type ToolgroupRegisterParams as ToolgroupRegisterParams,
  };

  export { Tools as Tools, type ToolListResponse as ToolListResponse, type ToolListParams as ToolListParams };

  export {
    ToolRuntime as ToolRuntime,
    type ToolDef as ToolDef,
    type ToolInvocationResult as ToolInvocationResult,
    type ToolRuntimeListToolsResponse as ToolRuntimeListToolsResponse,
    type ToolRuntimeInvokeToolParams as ToolRuntimeInvokeToolParams,
    type ToolRuntimeListToolsParams as ToolRuntimeListToolsParams,
  };

  export {
    Responses as Responses,
    type ResponseObject as ResponseObject,
    type ResponseObjectStream as ResponseObjectStream,
    type ResponseListResponse as ResponseListResponse,
    type ResponseDeleteResponse as ResponseDeleteResponse,
    ResponseListResponsesOpenAICursorPage as ResponseListResponsesOpenAICursorPage,
    type ResponseCreateParams as ResponseCreateParams,
    type ResponseCreateParamsNonStreaming as ResponseCreateParamsNonStreaming,
    type ResponseCreateParamsStreaming as ResponseCreateParamsStreaming,
    type ResponseListParams as ResponseListParams,
  };

  export {
    Prompts as Prompts,
    type ListPromptsResponse as ListPromptsResponse,
    type Prompt as Prompt,
    type PromptListResponse as PromptListResponse,
    type PromptCreateParams as PromptCreateParams,
    type PromptRetrieveParams as PromptRetrieveParams,
    type PromptUpdateParams as PromptUpdateParams,
    type PromptSetDefaultVersionParams as PromptSetDefaultVersionParams,
  };

  export {
    Conversations as Conversations,
    type ConversationObject as ConversationObject,
    type ConversationDeleteResponse as ConversationDeleteResponse,
    type ConversationCreateParams as ConversationCreateParams,
    type ConversationUpdateParams as ConversationUpdateParams,
  };

  export {
    Inspect as Inspect,
    type HealthInfo as HealthInfo,
    type ProviderInfo as ProviderInfo,
    type RouteInfo as RouteInfo,
    type VersionInfo as VersionInfo,
  };

  export {
    Embeddings as Embeddings,
    type CreateEmbeddingsResponse as CreateEmbeddingsResponse,
    type EmbeddingCreateParams as EmbeddingCreateParams,
  };

  export { Chat as Chat, type ChatCompletionChunk as ChatCompletionChunk };

  export {
    Completions as Completions,
    type CompletionCreateResponse as CompletionCreateResponse,
    type CompletionCreateParams as CompletionCreateParams,
    type CompletionCreateParamsNonStreaming as CompletionCreateParamsNonStreaming,
    type CompletionCreateParamsStreaming as CompletionCreateParamsStreaming,
  };

  export {
    VectorIo as VectorIo,
    type QueryChunksResponse as QueryChunksResponse,
    type VectorIoInsertParams as VectorIoInsertParams,
    type VectorIoQueryParams as VectorIoQueryParams,
  };

  export {
    VectorStores as VectorStores,
    type ListVectorStoresResponse as ListVectorStoresResponse,
    type VectorStore as VectorStore,
    type VectorStoreDeleteResponse as VectorStoreDeleteResponse,
    type VectorStoreSearchResponse as VectorStoreSearchResponse,
    VectorStoresOpenAICursorPage as VectorStoresOpenAICursorPage,
    type VectorStoreCreateParams as VectorStoreCreateParams,
    type VectorStoreUpdateParams as VectorStoreUpdateParams,
    type VectorStoreListParams as VectorStoreListParams,
    type VectorStoreSearchParams as VectorStoreSearchParams,
  };

  export {
    Models as Models,
    type ListModelsResponse as ListModelsResponse,
    type Model as Model,
    type ModelListResponse as ModelListResponse,
    type ModelRegisterParams as ModelRegisterParams,
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
    Moderations as Moderations,
    type CreateResponse as CreateResponse,
    type ModerationCreateParams as ModerationCreateParams,
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
    Files as Files,
    type DeleteFileResponse as DeleteFileResponse,
    type File as File,
    type ListFilesResponse as ListFilesResponse,
    type FileContentResponse as FileContentResponse,
    FilesOpenAICursorPage as FilesOpenAICursorPage,
    type FileCreateParams as FileCreateParams,
    type FileListParams as FileListParams,
  };

  export { Alpha as Alpha };

  export { Beta as Beta };

  export type AgentConfig = API.AgentConfig;
  export type CompletionMessage = API.CompletionMessage;
  export type Document = API.Document;
  export type InterleavedContent = API.InterleavedContent;
  export type InterleavedContentItem = API.InterleavedContentItem;
  export type Message = API.Message;
  export type ParamType = API.ParamType;
  export type QueryConfig = API.QueryConfig;
  export type QueryResult = API.QueryResult;
  export type ResponseFormat = API.ResponseFormat;
  export type SafetyViolation = API.SafetyViolation;
  export type SamplingParams = API.SamplingParams;
  export type ScoringResult = API.ScoringResult;
  export type SystemMessage = API.SystemMessage;
  export type ToolCall = API.ToolCall;
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
