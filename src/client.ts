// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { RequestInit, RequestInfo, BodyInit } from './internal/builtin-types';
import type { HTTPMethod, PromiseOrValue, MergedRequestInit, FinalizedRequestInit } from './internal/types';
import { uuid4 } from './internal/utils/uuid';
import { validatePositiveInteger, isAbsoluteURL, safeJSON } from './internal/utils/values';
import { sleep } from './internal/utils/sleep';
export type { Logger, LogLevel } from './internal/utils/log';
import { castToError, isAbortError } from './internal/errors';
import type { APIResponseProps } from './internal/parse';
import { getPlatformHeaders } from './internal/detect-platform';
import * as Shims from './internal/shims';
import * as Opts from './internal/request-options';
import * as qs from './internal/qs';
import { VERSION } from './version';
import * as Errors from './core/error';
import * as Uploads from './core/uploads';
import * as API from './resources/index';
import { APIPromise } from './core/api-promise';
import {
  Datasetio,
  DatasetioAppendRowsParams,
  DatasetioIterateRowsParams,
  DatasetioIterateRowsResponse,
} from './resources/datasetio';
import {
  DataSource,
  Dataset,
  DatasetCreateParams,
  DatasetListResponse,
  Datasets,
} from './resources/datasets';
import { Health, HealthCheckResponse } from './resources/health';
import {
  ChatCompletionResponse,
  CompletionMessage,
  CompletionResponse,
  Inference,
  InferenceBatchChatCompletionParams,
  InferenceBatchChatCompletionResponse,
  InferenceBatchCompletionParams,
  InferenceBatchCompletionResponse,
  InferenceChatCompletionParams,
  InferenceCompletionParams,
  InferenceEmbeddingsParams,
  InferenceEmbeddingsResponse,
  InterleavedContent,
  InterleavedContentItem,
  Message,
  MetricInResponse,
  ResponseFormat,
  SamplingParams,
  SystemMessage,
  TokenLogProbs,
  ToolCall,
  ToolConfig,
  ToolDefinition,
} from './resources/inference';
import { Inspect, InspectListRoutesResponse } from './resources/inspect';
import { Model, ModelCreateParams, ModelListResponse, ModelType, Models } from './resources/models';
import { ProviderInfo, ProviderListResponse, Providers } from './resources/providers';
import { Safety, SafetyRunShieldParams, SafetyRunShieldResponse, SafetyViolation } from './resources/safety';
import {
  Scoring,
  ScoringScoreBatchParams,
  ScoringScoreBatchResponse,
  ScoringScoreParams,
  ScoringScoreResponse,
} from './resources/scoring';
import {
  AggregationFunctionType,
  ParamType,
  ScoringFn,
  ScoringFnParams,
  ScoringFnParamsType,
  ScoringFunctionCreateParams,
  ScoringFunctionListResponse,
  ScoringFunctions,
} from './resources/scoring-functions';
import { Shield, ShieldCreateParams, ShieldListResponse, Shields } from './resources/shields';
import {
  SyntheticDataGeneration,
  SyntheticDataGenerationGenerateParams,
  SyntheticDataGenerationGenerateResponse,
} from './resources/synthetic-data-generation';
import {
  ToolGroup,
  ToolgroupListResponse,
  ToolgroupRegisterParams,
  Toolgroups,
} from './resources/toolgroups';
import { Tool, ToolListParams, ToolListResponse, ToolParameter, Tools } from './resources/tools';
import { VectorDB, VectorDBCreateParams, VectorDBListResponse, VectorDBs } from './resources/vector-dbs';
import {
  VectorIo,
  VectorIoInsertParams,
  VectorIoQueryParams,
  VectorIoQueryResponse,
} from './resources/vector-io';
import { Version, VersionRetrieveResponse } from './resources/version';
import {
  Agent,
  AgentConfig,
  AgentCreateParams,
  AgentCreateResponse,
  AgentListResponse,
  AgentListSessionsResponse,
  Agents,
} from './resources/agents/agents';
import { Eval } from './resources/eval/eval';
import {
  File,
  FileCreateUploadSessionParams,
  FileDeleteParams,
  FileListInBucketResponse,
  FileListParams,
  FileListResponse,
  FileRetrieveParams,
  FileUpload,
  Files,
} from './resources/files/files';
import { OpenAI } from './resources/openai/openai';
import {
  PostTraining,
  PostTrainingFineTuneSupervisedParams,
  PostTrainingJob,
  PostTrainingListJobsResponse,
  PostTrainingOptimizePreferencesParams,
  TrainingConfig,
} from './resources/post-training/post-training';
import {
  EventType,
  StructuredLogType,
  Telemetry,
  TelemetryCreateEventParams,
} from './resources/telemetry/telemetry';
import {
  ToolDef,
  ToolRuntime,
  ToolRuntimeInvokeToolParams,
  ToolRuntimeInvokeToolResponse,
  ToolRuntimeListToolsParams,
  ToolRuntimeListToolsResponse,
  URL,
} from './resources/tool-runtime/tool-runtime';
import { type Fetch } from './internal/builtin-types';
import { HeadersLike, NullableHeaders, buildHeaders } from './internal/headers';
import { FinalRequestOptions, RequestOptions } from './internal/request-options';
import { readEnv } from './internal/utils/env';
import {
  type LogLevel,
  type Logger,
  formatRequestDetails,
  loggerFor,
  parseLogLevel,
} from './internal/utils/log';
import { isEmptyObj } from './internal/utils/values';

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
   * Additional `RequestInit` options to be passed to `fetch` calls.
   * Properties will be overridden by per-request `fetchOptions`.
   */
  fetchOptions?: MergedRequestInit | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we expect that `fetch` is defined globally.
   */
  fetch?: Fetch | undefined;

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
   * header to `null` in request options.
   */
  defaultHeaders?: HeadersLike | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Record<string, string | undefined> | undefined;

  /**
   * Set the log level.
   *
   * Defaults to process.env['LLAMA_STACK_CLIENT_LOG'] or 'warn' if it isn't set.
   */
  logLevel?: LogLevel | undefined;

  /**
   * Set the logger.
   *
   * Defaults to globalThis.console.
   */
  logger?: Logger | undefined;
}

/**
 * API Client for interfacing with the Llama Stack Client API.
 */
export class LlamaStackClient {
  apiKey: string | null;

  baseURL: string;
  maxRetries: number;
  timeout: number;
  logger: Logger | undefined;
  logLevel: LogLevel | undefined;
  fetchOptions: MergedRequestInit | undefined;

  private fetch: Fetch;
  #encoder: Opts.RequestEncoder;
  protected idempotencyHeader?: string;
  private _options: ClientOptions;

  /**
   * API Client for interfacing with the Llama Stack Client API.
   *
   * @param {string | null | undefined} [opts.apiKey=process.env['LLAMA_STACK_CLIENT_API_KEY'] ?? null]
   * @param {string} [opts.baseURL=process.env['LLAMA_STACK_CLIENT_BASE_URL'] ?? http://any-hosted-llama-stack.com] - Override the default base URL for the API.
   * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {MergedRequestInit} [opts.fetchOptions] - Additional `RequestInit` options to be passed to `fetch` calls.
   * @param {Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {HeadersLike} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Record<string, string | undefined>} opts.defaultQuery - Default query parameters to include with every request to the API.
   */
  constructor({
    baseURL = readEnv('LLAMA_STACK_CLIENT_BASE_URL'),
    apiKey = readEnv('LLAMA_STACK_CLIENT_API_KEY') ?? null,
    ...opts
  }: ClientOptions = {}) {
    const options: ClientOptions = {
      apiKey,
      ...opts,
      baseURL: baseURL || `http://any-hosted-llama-stack.com`,
    };

    this.baseURL = options.baseURL!;
    this.timeout = options.timeout ?? LlamaStackClient.DEFAULT_TIMEOUT /* 1 minute */;
    this.logger = options.logger ?? console;
    const defaultLogLevel = 'warn';
    // Set default logLevel early so that we can log a warning in parseLogLevel.
    this.logLevel = defaultLogLevel;
    this.logLevel =
      parseLogLevel(options.logLevel, 'ClientOptions.logLevel', this) ??
      parseLogLevel(readEnv('LLAMA_STACK_CLIENT_LOG'), "process.env['LLAMA_STACK_CLIENT_LOG']", this) ??
      defaultLogLevel;
    this.fetchOptions = options.fetchOptions;
    this.maxRetries = options.maxRetries ?? 2;
    this.fetch = options.fetch ?? Shims.getDefaultFetch();
    this.#encoder = Opts.FallbackEncoder;

    this._options = options;

    this.apiKey = apiKey;
  }

  /**
   * Create a new client instance re-using the same options given to the current client with optional overriding.
   */
  withOptions(options: Partial<ClientOptions>): this {
    return new (this.constructor as any as new (props: ClientOptions) => typeof this)({
      ...this._options,
      baseURL: this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetch: this.fetch,
      fetchOptions: this.fetchOptions,
      apiKey: this.apiKey,
      ...options,
    });
  }

  /**
   * Check whether the base URL is set to its default.
   */
  #baseURLOverridden(): boolean {
    return this.baseURL !== 'http://any-hosted-llama-stack.com';
  }

  protected defaultQuery(): Record<string, string | undefined> | undefined {
    return this._options.defaultQuery;
  }

  protected validateHeaders({ values, nulls }: NullableHeaders) {
    if (this.apiKey && values.get('authorization')) {
      return;
    }
    if (nulls.has('authorization')) {
      return;
    }

    throw new Error(
      'Could not resolve authentication method. Expected the apiKey to be set. Or for the "Authorization" headers to be explicitly omitted',
    );
  }

  protected authHeaders(opts: FinalRequestOptions): NullableHeaders | undefined {
    if (this.apiKey == null) {
      return undefined;
    }
    return buildHeaders([{ Authorization: `Bearer ${this.apiKey}` }]);
  }

  protected stringifyQuery(query: Record<string, unknown>): string {
    return qs.stringify(query, { arrayFormat: 'comma' });
  }

  private getUserAgent(): string {
    return `${this.constructor.name}/JS ${VERSION}`;
  }

  protected defaultIdempotencyKey(): string {
    return `stainless-node-retry-${uuid4()}`;
  }

  protected makeStatusError(
    status: number,
    error: Object,
    message: string | undefined,
    headers: Headers,
  ): Errors.APIError {
    return Errors.APIError.generate(status, error, message, headers);
  }

  buildURL(
    path: string,
    query: Record<string, unknown> | null | undefined,
    defaultBaseURL?: string | undefined,
  ): string {
    const baseURL = (!this.#baseURLOverridden() && defaultBaseURL) || this.baseURL;
    const url =
      isAbsoluteURL(path) ?
        new URL(path)
      : new URL(baseURL + (baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path));

    const defaultQuery = this.defaultQuery();
    if (!isEmptyObj(defaultQuery)) {
      query = { ...defaultQuery, ...query };
    }

    if (typeof query === 'object' && query && !Array.isArray(query)) {
      url.search = this.stringifyQuery(query as Record<string, unknown>);
    }

    return url.toString();
  }

  /**
   * Used as a callback for mutating the given `FinalRequestOptions` object.
   */
  protected async prepareOptions(options: FinalRequestOptions): Promise<void> {}

  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  protected async prepareRequest(
    request: RequestInit,
    { url, options }: { url: string; options: FinalRequestOptions },
  ): Promise<void> {}

  get<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('get', path, opts);
  }

  post<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('post', path, opts);
  }

  patch<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('patch', path, opts);
  }

  put<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('put', path, opts);
  }

  delete<Rsp>(path: string, opts?: PromiseOrValue<RequestOptions>): APIPromise<Rsp> {
    return this.methodRequest('delete', path, opts);
  }

  private methodRequest<Rsp>(
    method: HTTPMethod,
    path: string,
    opts?: PromiseOrValue<RequestOptions>,
  ): APIPromise<Rsp> {
    return this.request(
      Promise.resolve(opts).then((opts) => {
        return { method, path, ...opts };
      }),
    );
  }

  request<Rsp>(
    options: PromiseOrValue<FinalRequestOptions>,
    remainingRetries: number | null = null,
  ): APIPromise<Rsp> {
    return new APIPromise(this, this.makeRequest(options, remainingRetries, undefined));
  }

  private async makeRequest(
    optionsInput: PromiseOrValue<FinalRequestOptions>,
    retriesRemaining: number | null,
    retryOfRequestLogID: string | undefined,
  ): Promise<APIResponseProps> {
    const options = await optionsInput;
    const maxRetries = options.maxRetries ?? this.maxRetries;
    if (retriesRemaining == null) {
      retriesRemaining = maxRetries;
    }

    await this.prepareOptions(options);

    const { req, url, timeout } = this.buildRequest(options, { retryCount: maxRetries - retriesRemaining });

    await this.prepareRequest(req, { url, options });

    /** Not an API request ID, just for correlating local log entries. */
    const requestLogID = 'log_' + ((Math.random() * (1 << 24)) | 0).toString(16).padStart(6, '0');
    const retryLogStr = retryOfRequestLogID === undefined ? '' : `, retryOf: ${retryOfRequestLogID}`;
    const startTime = Date.now();

    loggerFor(this).debug(
      `[${requestLogID}] sending request`,
      formatRequestDetails({
        retryOfRequestLogID,
        method: options.method,
        url,
        options,
        headers: req.headers,
      }),
    );

    if (options.signal?.aborted) {
      throw new Errors.APIUserAbortError();
    }

    const controller = new AbortController();
    const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
    const headersTime = Date.now();

    if (response instanceof Error) {
      const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
      if (options.signal?.aborted) {
        throw new Errors.APIUserAbortError();
      }
      // detect native connection timeout errors
      // deno throws "TypeError: error sending request for url (https://example/): client error (Connect): tcp connect error: Operation timed out (os error 60): Operation timed out (os error 60)"
      // undici throws "TypeError: fetch failed" with cause "ConnectTimeoutError: Connect Timeout Error (attempted address: example:443, timeout: 1ms)"
      // others do not provide enough information to distinguish timeouts from other connection errors
      const isTimeout =
        isAbortError(response) ||
        /timed? ?out/i.test(String(response) + ('cause' in response ? String(response.cause) : ''));
      if (retriesRemaining) {
        loggerFor(this).info(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - ${retryMessage}`,
        );
        loggerFor(this).debug(
          `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url,
            durationMs: headersTime - startTime,
            message: response.message,
          }),
        );
        return this.retryRequest(options, retriesRemaining, retryOfRequestLogID ?? requestLogID);
      }
      loggerFor(this).info(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} - error; no more retries left`,
      );
      loggerFor(this).debug(
        `[${requestLogID}] connection ${isTimeout ? 'timed out' : 'failed'} (error; no more retries left)`,
        formatRequestDetails({
          retryOfRequestLogID,
          url,
          durationMs: headersTime - startTime,
          message: response.message,
        }),
      );
      if (isTimeout) {
        throw new Errors.APIConnectionTimeoutError();
      }
      throw new Errors.APIConnectionError({ cause: response });
    }

    const responseInfo = `[${requestLogID}${retryLogStr}] ${req.method} ${url} ${
      response.ok ? 'succeeded' : 'failed'
    } with status ${response.status} in ${headersTime - startTime}ms`;

    if (!response.ok) {
      const shouldRetry = this.shouldRetry(response);
      if (retriesRemaining && shouldRetry) {
        const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;

        // We don't need the body of this response.
        await Shims.CancelReadableStream(response.body);
        loggerFor(this).info(`${responseInfo} - ${retryMessage}`);
        loggerFor(this).debug(
          `[${requestLogID}] response error (${retryMessage})`,
          formatRequestDetails({
            retryOfRequestLogID,
            url: response.url,
            status: response.status,
            headers: response.headers,
            durationMs: headersTime - startTime,
          }),
        );
        return this.retryRequest(
          options,
          retriesRemaining,
          retryOfRequestLogID ?? requestLogID,
          response.headers,
        );
      }

      const retryMessage = shouldRetry ? `error; no more retries left` : `error; not retryable`;

      loggerFor(this).info(`${responseInfo} - ${retryMessage}`);

      const errText = await response.text().catch((err: any) => castToError(err).message);
      const errJSON = safeJSON(errText);
      const errMessage = errJSON ? undefined : errText;

      loggerFor(this).debug(
        `[${requestLogID}] response error (${retryMessage})`,
        formatRequestDetails({
          retryOfRequestLogID,
          url: response.url,
          status: response.status,
          headers: response.headers,
          message: errMessage,
          durationMs: Date.now() - startTime,
        }),
      );

      const err = this.makeStatusError(response.status, errJSON, errMessage, response.headers);
      throw err;
    }

    loggerFor(this).info(responseInfo);
    loggerFor(this).debug(
      `[${requestLogID}] response start`,
      formatRequestDetails({
        retryOfRequestLogID,
        url: response.url,
        status: response.status,
        headers: response.headers,
        durationMs: headersTime - startTime,
      }),
    );

    return { response, options, controller, requestLogID, retryOfRequestLogID, startTime };
  }

  async fetchWithTimeout(
    url: RequestInfo,
    init: RequestInit | undefined,
    ms: number,
    controller: AbortController,
  ): Promise<Response> {
    const { signal, method, ...options } = init || {};
    if (signal) signal.addEventListener('abort', () => controller.abort());

    const timeout = setTimeout(() => controller.abort(), ms);

    const isReadableBody =
      ((globalThis as any).ReadableStream && options.body instanceof (globalThis as any).ReadableStream) ||
      (typeof options.body === 'object' && options.body !== null && Symbol.asyncIterator in options.body);

    const fetchOptions: RequestInit = {
      signal: controller.signal as any,
      ...(isReadableBody ? { duplex: 'half' } : {}),
      method: 'GET',
      ...options,
    };
    if (method) {
      // Custom methods like 'patch' need to be uppercased
      // See https://github.com/nodejs/undici/issues/2294
      fetchOptions.method = method.toUpperCase();
    }

    try {
      // use undefined this binding; fetch errors if bound to something else in browser/cloudflare
      return await this.fetch.call(undefined, url, fetchOptions);
    } finally {
      clearTimeout(timeout);
    }
  }

  private shouldRetry(response: Response): boolean {
    // Note this is not a standard header.
    const shouldRetryHeader = response.headers.get('x-should-retry');

    // If the server explicitly says whether or not to retry, obey.
    if (shouldRetryHeader === 'true') return true;
    if (shouldRetryHeader === 'false') return false;

    // Retry on request timeouts.
    if (response.status === 408) return true;

    // Retry on lock timeouts.
    if (response.status === 409) return true;

    // Retry on rate limits.
    if (response.status === 429) return true;

    // Retry internal errors.
    if (response.status >= 500) return true;

    return false;
  }

  private async retryRequest(
    options: FinalRequestOptions,
    retriesRemaining: number,
    requestLogID: string,
    responseHeaders?: Headers | undefined,
  ): Promise<APIResponseProps> {
    let timeoutMillis: number | undefined;

    // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
    const retryAfterMillisHeader = responseHeaders?.get('retry-after-ms');
    if (retryAfterMillisHeader) {
      const timeoutMs = parseFloat(retryAfterMillisHeader);
      if (!Number.isNaN(timeoutMs)) {
        timeoutMillis = timeoutMs;
      }
    }

    // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
    const retryAfterHeader = responseHeaders?.get('retry-after');
    if (retryAfterHeader && !timeoutMillis) {
      const timeoutSeconds = parseFloat(retryAfterHeader);
      if (!Number.isNaN(timeoutSeconds)) {
        timeoutMillis = timeoutSeconds * 1000;
      } else {
        timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
      }
    }

    // If the API asks us to wait a certain amount of time (and it's a reasonable amount),
    // just do what it says, but otherwise calculate a default
    if (!(timeoutMillis && 0 <= timeoutMillis && timeoutMillis < 60 * 1000)) {
      const maxRetries = options.maxRetries ?? this.maxRetries;
      timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
    }
    await sleep(timeoutMillis);

    return this.makeRequest(options, retriesRemaining - 1, requestLogID);
  }

  private calculateDefaultRetryTimeoutMillis(retriesRemaining: number, maxRetries: number): number {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 8.0;

    const numRetries = maxRetries - retriesRemaining;

    // Apply exponential backoff, but not more than the max.
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);

    // Apply some jitter, take up to at most 25 percent of the retry time.
    const jitter = 1 - Math.random() * 0.25;

    return sleepSeconds * jitter * 1000;
  }

  buildRequest(
    inputOptions: FinalRequestOptions,
    { retryCount = 0 }: { retryCount?: number } = {},
  ): { req: FinalizedRequestInit; url: string; timeout: number } {
    const options = { ...inputOptions };
    const { method, path, query, defaultBaseURL } = options;

    const url = this.buildURL(path!, query as Record<string, unknown>, defaultBaseURL);
    if ('timeout' in options) validatePositiveInteger('timeout', options.timeout);
    options.timeout = options.timeout ?? this.timeout;
    const { bodyHeaders, body } = this.buildBody({ options });
    const reqHeaders = this.buildHeaders({ options: inputOptions, method, bodyHeaders, retryCount });

    const req: FinalizedRequestInit = {
      method,
      headers: reqHeaders,
      ...(options.signal && { signal: options.signal }),
      ...((globalThis as any).ReadableStream &&
        body instanceof (globalThis as any).ReadableStream && { duplex: 'half' }),
      ...(body && { body }),
      ...((this.fetchOptions as any) ?? {}),
      ...((options.fetchOptions as any) ?? {}),
    };

    return { req, url, timeout: options.timeout };
  }

  private buildHeaders({
    options,
    method,
    bodyHeaders,
    retryCount,
  }: {
    options: FinalRequestOptions;
    method: HTTPMethod;
    bodyHeaders: HeadersLike;
    retryCount: number;
  }): Headers {
    let idempotencyHeaders: HeadersLike = {};
    if (this.idempotencyHeader && method !== 'get') {
      if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
      idempotencyHeaders[this.idempotencyHeader] = options.idempotencyKey;
    }

    const headers = buildHeaders([
      idempotencyHeaders,
      {
        Accept: 'application/json',
        'User-Agent': this.getUserAgent(),
        'X-Stainless-Retry-Count': String(retryCount),
        ...(options.timeout ? { 'X-Stainless-Timeout': String(Math.trunc(options.timeout / 1000)) } : {}),
        ...getPlatformHeaders(),
      },
      this.authHeaders(options),
      this._options.defaultHeaders,
      bodyHeaders,
      options.headers,
    ]);

    this.validateHeaders(headers);

    return headers.values;
  }

  private buildBody({ options: { body, headers: rawHeaders } }: { options: FinalRequestOptions }): {
    bodyHeaders: HeadersLike;
    body: BodyInit | undefined;
  } {
    if (!body) {
      return { bodyHeaders: undefined, body: undefined };
    }
    const headers = buildHeaders([rawHeaders]);
    if (
      // Pass raw type verbatim
      ArrayBuffer.isView(body) ||
      body instanceof ArrayBuffer ||
      body instanceof DataView ||
      (typeof body === 'string' &&
        // Preserve legacy string encoding behavior for now
        headers.values.has('content-type')) ||
      // `Blob` is superset of `File`
      body instanceof Blob ||
      // `FormData` -> `multipart/form-data`
      body instanceof FormData ||
      // `URLSearchParams` -> `application/x-www-form-urlencoded`
      body instanceof URLSearchParams ||
      // Send chunked stream (each chunk has own `length`)
      ((globalThis as any).ReadableStream && body instanceof (globalThis as any).ReadableStream)
    ) {
      return { bodyHeaders: undefined, body: body as BodyInit };
    } else if (
      typeof body === 'object' &&
      (Symbol.asyncIterator in body ||
        (Symbol.iterator in body && 'next' in body && typeof body.next === 'function'))
    ) {
      return { bodyHeaders: undefined, body: Shims.ReadableStreamFrom(body as AsyncIterable<Uint8Array>) };
    } else {
      return this.#encoder({ body, headers });
    }
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

  datasetio: API.Datasetio = new API.Datasetio(this);
  inference: API.Inference = new API.Inference(this);
  postTraining: API.PostTraining = new API.PostTraining(this);
  agents: API.Agents = new API.Agents(this);
  openai: API.OpenAI = new API.OpenAI(this);
  files: API.Files = new API.Files(this);
  eval: API.Eval = new API.Eval(this);
  datasets: API.Datasets = new API.Datasets(this);
  models: API.Models = new API.Models(this);
  scoringFunctions: API.ScoringFunctions = new API.ScoringFunctions(this);
  shields: API.Shields = new API.Shields(this);
  telemetry: API.Telemetry = new API.Telemetry(this);
  tools: API.Tools = new API.Tools(this);
  toolgroups: API.Toolgroups = new API.Toolgroups(this);
  vectorDBs: API.VectorDBs = new API.VectorDBs(this);
  health: API.Health = new API.Health(this);
  toolRuntime: API.ToolRuntime = new API.ToolRuntime(this);
  vectorIo: API.VectorIo = new API.VectorIo(this);
  providers: API.Providers = new API.Providers(this);
  inspect: API.Inspect = new API.Inspect(this);
  safety: API.Safety = new API.Safety(this);
  scoring: API.Scoring = new API.Scoring(this);
  syntheticDataGeneration: API.SyntheticDataGeneration = new API.SyntheticDataGeneration(this);
  version: API.Version = new API.Version(this);
}
LlamaStackClient.Datasetio = Datasetio;
LlamaStackClient.Inference = Inference;
LlamaStackClient.PostTraining = PostTraining;
LlamaStackClient.Agents = Agents;
LlamaStackClient.OpenAI = OpenAI;
LlamaStackClient.Files = Files;
LlamaStackClient.Eval = Eval;
LlamaStackClient.Datasets = Datasets;
LlamaStackClient.Models = Models;
LlamaStackClient.ScoringFunctions = ScoringFunctions;
LlamaStackClient.Shields = Shields;
LlamaStackClient.Telemetry = Telemetry;
LlamaStackClient.Tools = Tools;
LlamaStackClient.Toolgroups = Toolgroups;
LlamaStackClient.VectorDBs = VectorDBs;
LlamaStackClient.Health = Health;
LlamaStackClient.ToolRuntime = ToolRuntime;
LlamaStackClient.VectorIo = VectorIo;
LlamaStackClient.Providers = Providers;
LlamaStackClient.Inspect = Inspect;
LlamaStackClient.Safety = Safety;
LlamaStackClient.Scoring = Scoring;
LlamaStackClient.SyntheticDataGeneration = SyntheticDataGeneration;
LlamaStackClient.Version = Version;
export declare namespace LlamaStackClient {
  export type RequestOptions = Opts.RequestOptions;

  export {
    Datasetio as Datasetio,
    type DatasetioIterateRowsResponse as DatasetioIterateRowsResponse,
    type DatasetioAppendRowsParams as DatasetioAppendRowsParams,
    type DatasetioIterateRowsParams as DatasetioIterateRowsParams,
  };

  export {
    Inference as Inference,
    type ChatCompletionResponse as ChatCompletionResponse,
    type CompletionMessage as CompletionMessage,
    type CompletionResponse as CompletionResponse,
    type InterleavedContent as InterleavedContent,
    type InterleavedContentItem as InterleavedContentItem,
    type Message as Message,
    type MetricInResponse as MetricInResponse,
    type ResponseFormat as ResponseFormat,
    type SamplingParams as SamplingParams,
    type SystemMessage as SystemMessage,
    type TokenLogProbs as TokenLogProbs,
    type ToolCall as ToolCall,
    type ToolConfig as ToolConfig,
    type ToolDefinition as ToolDefinition,
    type InferenceBatchChatCompletionResponse as InferenceBatchChatCompletionResponse,
    type InferenceBatchCompletionResponse as InferenceBatchCompletionResponse,
    type InferenceEmbeddingsResponse as InferenceEmbeddingsResponse,
    type InferenceBatchChatCompletionParams as InferenceBatchChatCompletionParams,
    type InferenceBatchCompletionParams as InferenceBatchCompletionParams,
    type InferenceChatCompletionParams as InferenceChatCompletionParams,
    type InferenceCompletionParams as InferenceCompletionParams,
    type InferenceEmbeddingsParams as InferenceEmbeddingsParams,
  };

  export {
    PostTraining as PostTraining,
    type PostTrainingJob as PostTrainingJob,
    type TrainingConfig as TrainingConfig,
    type PostTrainingListJobsResponse as PostTrainingListJobsResponse,
    type PostTrainingFineTuneSupervisedParams as PostTrainingFineTuneSupervisedParams,
    type PostTrainingOptimizePreferencesParams as PostTrainingOptimizePreferencesParams,
  };

  export {
    Agents as Agents,
    type Agent as Agent,
    type AgentConfig as AgentConfig,
    type AgentCreateResponse as AgentCreateResponse,
    type AgentListResponse as AgentListResponse,
    type AgentListSessionsResponse as AgentListSessionsResponse,
    type AgentCreateParams as AgentCreateParams,
  };

  export { OpenAI as OpenAI };

  export {
    Files as Files,
    type File as File,
    type FileUpload as FileUpload,
    type FileListResponse as FileListResponse,
    type FileListInBucketResponse as FileListInBucketResponse,
    type FileRetrieveParams as FileRetrieveParams,
    type FileListParams as FileListParams,
    type FileDeleteParams as FileDeleteParams,
    type FileCreateUploadSessionParams as FileCreateUploadSessionParams,
  };

  export { Eval as Eval };

  export {
    Datasets as Datasets,
    type DataSource as DataSource,
    type Dataset as Dataset,
    type DatasetListResponse as DatasetListResponse,
    type DatasetCreateParams as DatasetCreateParams,
  };

  export {
    Models as Models,
    type Model as Model,
    type ModelType as ModelType,
    type ModelListResponse as ModelListResponse,
    type ModelCreateParams as ModelCreateParams,
  };

  export {
    ScoringFunctions as ScoringFunctions,
    type AggregationFunctionType as AggregationFunctionType,
    type ParamType as ParamType,
    type ScoringFn as ScoringFn,
    type ScoringFnParams as ScoringFnParams,
    type ScoringFnParamsType as ScoringFnParamsType,
    type ScoringFunctionListResponse as ScoringFunctionListResponse,
    type ScoringFunctionCreateParams as ScoringFunctionCreateParams,
  };

  export {
    Shields as Shields,
    type Shield as Shield,
    type ShieldListResponse as ShieldListResponse,
    type ShieldCreateParams as ShieldCreateParams,
  };

  export {
    Telemetry as Telemetry,
    type EventType as EventType,
    type StructuredLogType as StructuredLogType,
    type TelemetryCreateEventParams as TelemetryCreateEventParams,
  };

  export {
    Tools as Tools,
    type Tool as Tool,
    type ToolParameter as ToolParameter,
    type ToolListResponse as ToolListResponse,
    type ToolListParams as ToolListParams,
  };

  export {
    Toolgroups as Toolgroups,
    type ToolGroup as ToolGroup,
    type ToolgroupListResponse as ToolgroupListResponse,
    type ToolgroupRegisterParams as ToolgroupRegisterParams,
  };

  export {
    VectorDBs as VectorDBs,
    type VectorDB as VectorDB,
    type VectorDBListResponse as VectorDBListResponse,
    type VectorDBCreateParams as VectorDBCreateParams,
  };

  export { Health as Health, type HealthCheckResponse as HealthCheckResponse };

  export {
    ToolRuntime as ToolRuntime,
    type ToolDef as ToolDef,
    type URL as URL,
    type ToolRuntimeInvokeToolResponse as ToolRuntimeInvokeToolResponse,
    type ToolRuntimeListToolsResponse as ToolRuntimeListToolsResponse,
    type ToolRuntimeInvokeToolParams as ToolRuntimeInvokeToolParams,
    type ToolRuntimeListToolsParams as ToolRuntimeListToolsParams,
  };

  export {
    VectorIo as VectorIo,
    type VectorIoQueryResponse as VectorIoQueryResponse,
    type VectorIoInsertParams as VectorIoInsertParams,
    type VectorIoQueryParams as VectorIoQueryParams,
  };

  export {
    Providers as Providers,
    type ProviderInfo as ProviderInfo,
    type ProviderListResponse as ProviderListResponse,
  };

  export { Inspect as Inspect, type InspectListRoutesResponse as InspectListRoutesResponse };

  export {
    Safety as Safety,
    type SafetyViolation as SafetyViolation,
    type SafetyRunShieldResponse as SafetyRunShieldResponse,
    type SafetyRunShieldParams as SafetyRunShieldParams,
  };

  export {
    Scoring as Scoring,
    type ScoringScoreResponse as ScoringScoreResponse,
    type ScoringScoreBatchResponse as ScoringScoreBatchResponse,
    type ScoringScoreParams as ScoringScoreParams,
    type ScoringScoreBatchParams as ScoringScoreBatchParams,
  };

  export {
    SyntheticDataGeneration as SyntheticDataGeneration,
    type SyntheticDataGenerationGenerateResponse as SyntheticDataGenerationGenerateResponse,
    type SyntheticDataGenerationGenerateParams as SyntheticDataGenerationGenerateParams,
  };

  export { Version as Version, type VersionRetrieveResponse as VersionRetrieveResponse };
}
