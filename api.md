# Shared

Types:

- <code><a href="./src/resources/shared.ts">AgentConfig</a></code>
- <code><a href="./src/resources/shared.ts">ChatCompletionResponse</a></code>
- <code><a href="./src/resources/shared.ts">CompletionMessage</a></code>
- <code><a href="./src/resources/shared.ts">Document</a></code>
- <code><a href="./src/resources/shared.ts">InterleavedContent</a></code>
- <code><a href="./src/resources/shared.ts">InterleavedContentItem</a></code>
- <code><a href="./src/resources/shared.ts">Message</a></code>
- <code><a href="./src/resources/shared.ts">Metric</a></code>
- <code><a href="./src/resources/shared.ts">ParamType</a></code>
- <code><a href="./src/resources/shared.ts">QueryConfig</a></code>
- <code><a href="./src/resources/shared.ts">QueryResult</a></code>
- <code><a href="./src/resources/shared.ts">ResponseFormat</a></code>
- <code><a href="./src/resources/shared.ts">SafetyViolation</a></code>
- <code><a href="./src/resources/shared.ts">SamplingParams</a></code>
- <code><a href="./src/resources/shared.ts">ScoringResult</a></code>
- <code><a href="./src/resources/shared.ts">SystemMessage</a></code>
- <code><a href="./src/resources/shared.ts">ToolCall</a></code>
- <code><a href="./src/resources/shared.ts">ToolParamDefinition</a></code>
- <code><a href="./src/resources/shared.ts">ToolResponseMessage</a></code>
- <code><a href="./src/resources/shared.ts">UserMessage</a></code>

# Toolgroups

Types:

- <code><a href="./src/resources/toolgroups.ts">ListToolGroupsResponse</a></code>
- <code><a href="./src/resources/toolgroups.ts">ToolGroup</a></code>
- <code><a href="./src/resources/toolgroups.ts">ToolgroupListResponse</a></code>

Methods:

- <code title="get /v1/toolgroups">client.toolgroups.<a href="./src/resources/toolgroups.ts">list</a>() -> ToolgroupListResponse</code>
- <code title="get /v1/toolgroups/{toolgroup_id}">client.toolgroups.<a href="./src/resources/toolgroups.ts">get</a>(toolgroupId) -> ToolGroup</code>
- <code title="post /v1/toolgroups">client.toolgroups.<a href="./src/resources/toolgroups.ts">register</a>({ ...params }) -> void</code>
- <code title="delete /v1/toolgroups/{toolgroup_id}">client.toolgroups.<a href="./src/resources/toolgroups.ts">unregister</a>(toolgroupId) -> void</code>

# Tools

Types:

- <code><a href="./src/resources/tools.ts">ListToolsResponse</a></code>
- <code><a href="./src/resources/tools.ts">Tool</a></code>
- <code><a href="./src/resources/tools.ts">ToolListResponse</a></code>

Methods:

- <code title="get /v1/tools">client.tools.<a href="./src/resources/tools.ts">list</a>({ ...params }) -> ToolListResponse</code>
- <code title="get /v1/tools/{tool_name}">client.tools.<a href="./src/resources/tools.ts">get</a>(toolName) -> Tool</code>

# ToolRuntime

Types:

- <code><a href="./src/resources/tool-runtime/tool-runtime.ts">ToolDef</a></code>
- <code><a href="./src/resources/tool-runtime/tool-runtime.ts">ToolInvocationResult</a></code>
- <code><a href="./src/resources/tool-runtime/tool-runtime.ts">ToolRuntimeListToolsResponse</a></code>

Methods:

- <code title="post /v1/tool-runtime/invoke">client.toolRuntime.<a href="./src/resources/tool-runtime/tool-runtime.ts">invokeTool</a>({ ...params }) -> ToolInvocationResult</code>
- <code title="get /v1/tool-runtime/list-tools">client.toolRuntime.<a href="./src/resources/tool-runtime/tool-runtime.ts">listTools</a>({ ...params }) -> ToolRuntimeListToolsResponse</code>

## RagTool

Methods:

- <code title="post /v1/tool-runtime/rag-tool/insert">client.toolRuntime.ragTool.<a href="./src/resources/tool-runtime/rag-tool.ts">insert</a>({ ...params }) -> void</code>
- <code title="post /v1/tool-runtime/rag-tool/query">client.toolRuntime.ragTool.<a href="./src/resources/tool-runtime/rag-tool.ts">query</a>({ ...params }) -> QueryResult</code>

# Responses

Types:

- <code><a href="./src/resources/responses/responses.ts">ResponseObject</a></code>
- <code><a href="./src/resources/responses/responses.ts">ResponseObjectStream</a></code>
- <code><a href="./src/resources/responses/responses.ts">ResponseListResponse</a></code>
- <code><a href="./src/resources/responses/responses.ts">ResponseDeleteResponse</a></code>

Methods:

- <code title="post /v1/responses">client.responses.<a href="./src/resources/responses/responses.ts">create</a>({ ...params }) -> ResponseObject</code>
- <code title="get /v1/responses/{response_id}">client.responses.<a href="./src/resources/responses/responses.ts">retrieve</a>(responseId) -> ResponseObject</code>
- <code title="get /v1/responses">client.responses.<a href="./src/resources/responses/responses.ts">list</a>({ ...params }) -> ResponseListResponsesOpenAICursorPage</code>
- <code title="delete /v1/responses/{response_id}">client.responses.<a href="./src/resources/responses/responses.ts">delete</a>(responseId) -> ResponseDeleteResponse</code>

## InputItems

Types:

- <code><a href="./src/resources/responses/input-items.ts">InputItemListResponse</a></code>

Methods:

- <code title="get /v1/responses/{response_id}/input_items">client.responses.inputItems.<a href="./src/resources/responses/input-items.ts">list</a>(responseId, { ...params }) -> InputItemListResponse</code>

# Agents

Types:

- <code><a href="./src/resources/agents/agents.ts">InferenceStep</a></code>
- <code><a href="./src/resources/agents/agents.ts">MemoryRetrievalStep</a></code>
- <code><a href="./src/resources/agents/agents.ts">ShieldCallStep</a></code>
- <code><a href="./src/resources/agents/agents.ts">ToolExecutionStep</a></code>
- <code><a href="./src/resources/agents/agents.ts">ToolResponse</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentCreateResponse</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentRetrieveResponse</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentListResponse</a></code>

Methods:

- <code title="post /v1/agents">client.agents.<a href="./src/resources/agents/agents.ts">create</a>({ ...params }) -> AgentCreateResponse</code>
- <code title="get /v1/agents/{agent_id}">client.agents.<a href="./src/resources/agents/agents.ts">retrieve</a>(agentId) -> AgentRetrieveResponse</code>
- <code title="get /v1/agents">client.agents.<a href="./src/resources/agents/agents.ts">list</a>({ ...params }) -> AgentListResponse</code>
- <code title="delete /v1/agents/{agent_id}">client.agents.<a href="./src/resources/agents/agents.ts">delete</a>(agentId) -> void</code>

## Session

Types:

- <code><a href="./src/resources/agents/session.ts">Session</a></code>
- <code><a href="./src/resources/agents/session.ts">SessionCreateResponse</a></code>
- <code><a href="./src/resources/agents/session.ts">SessionListResponse</a></code>

Methods:

- <code title="post /v1/agents/{agent_id}/session">client.agents.session.<a href="./src/resources/agents/session.ts">create</a>(agentId, { ...params }) -> SessionCreateResponse</code>
- <code title="get /v1/agents/{agent_id}/session/{session_id}">client.agents.session.<a href="./src/resources/agents/session.ts">retrieve</a>(agentId, sessionId, { ...params }) -> Session</code>
- <code title="get /v1/agents/{agent_id}/sessions">client.agents.session.<a href="./src/resources/agents/session.ts">list</a>(agentId, { ...params }) -> SessionListResponse</code>
- <code title="delete /v1/agents/{agent_id}/session/{session_id}">client.agents.session.<a href="./src/resources/agents/session.ts">delete</a>(agentId, sessionId) -> void</code>

## Steps

Types:

- <code><a href="./src/resources/agents/steps.ts">StepRetrieveResponse</a></code>

Methods:

- <code title="get /v1/agents/{agent_id}/session/{session_id}/turn/{turn_id}/step/{step_id}">client.agents.steps.<a href="./src/resources/agents/steps.ts">retrieve</a>(agentId, sessionId, turnId, stepId) -> StepRetrieveResponse</code>

## Turn

Types:

- <code><a href="./src/resources/agents/turn.ts">AgentTurnResponseStreamChunk</a></code>
- <code><a href="./src/resources/agents/turn.ts">Turn</a></code>
- <code><a href="./src/resources/agents/turn.ts">TurnResponseEvent</a></code>

Methods:

- <code title="post /v1/agents/{agent_id}/session/{session_id}/turn">client.agents.turn.<a href="./src/resources/agents/turn.ts">create</a>(agentId, sessionId, { ...params }) -> Turn</code>
- <code title="get /v1/agents/{agent_id}/session/{session_id}/turn/{turn_id}">client.agents.turn.<a href="./src/resources/agents/turn.ts">retrieve</a>(agentId, sessionId, turnId) -> Turn</code>
- <code title="post /v1/agents/{agent_id}/session/{session_id}/turn/{turn_id}/resume">client.agents.turn.<a href="./src/resources/agents/turn.ts">resume</a>(agentId, sessionId, turnId, { ...params }) -> Turn</code>

# Datasets

Types:

- <code><a href="./src/resources/datasets.ts">ListDatasetsResponse</a></code>
- <code><a href="./src/resources/datasets.ts">DatasetRetrieveResponse</a></code>
- <code><a href="./src/resources/datasets.ts">DatasetListResponse</a></code>
- <code><a href="./src/resources/datasets.ts">DatasetIterrowsResponse</a></code>
- <code><a href="./src/resources/datasets.ts">DatasetRegisterResponse</a></code>

Methods:

- <code title="get /v1/datasets/{dataset_id}">client.datasets.<a href="./src/resources/datasets.ts">retrieve</a>(datasetId) -> DatasetRetrieveResponse</code>
- <code title="get /v1/datasets">client.datasets.<a href="./src/resources/datasets.ts">list</a>() -> DatasetListResponse</code>
- <code title="post /v1/datasetio/append-rows/{dataset_id}">client.datasets.<a href="./src/resources/datasets.ts">appendrows</a>(datasetId, { ...params }) -> void</code>
- <code title="get /v1/datasetio/iterrows/{dataset_id}">client.datasets.<a href="./src/resources/datasets.ts">iterrows</a>(datasetId, { ...params }) -> DatasetIterrowsResponse</code>
- <code title="post /v1/datasets">client.datasets.<a href="./src/resources/datasets.ts">register</a>({ ...params }) -> DatasetRegisterResponse</code>
- <code title="delete /v1/datasets/{dataset_id}">client.datasets.<a href="./src/resources/datasets.ts">unregister</a>(datasetId) -> void</code>

# Eval

Types:

- <code><a href="./src/resources/eval/eval.ts">BenchmarkConfig</a></code>
- <code><a href="./src/resources/eval/eval.ts">EvaluateResponse</a></code>
- <code><a href="./src/resources/eval/eval.ts">Job</a></code>

Methods:

- <code title="post /v1/eval/benchmarks/{benchmark_id}/evaluations">client.eval.<a href="./src/resources/eval/eval.ts">evaluateRows</a>(benchmarkId, { ...params }) -> EvaluateResponse</code>
- <code title="post /v1/eval/benchmarks/{benchmark_id}/evaluations">client.eval.<a href="./src/resources/eval/eval.ts">evaluateRowsAlpha</a>(benchmarkId, { ...params }) -> EvaluateResponse</code>
- <code title="post /v1/eval/benchmarks/{benchmark_id}/jobs">client.eval.<a href="./src/resources/eval/eval.ts">runEval</a>(benchmarkId, { ...params }) -> Job</code>
- <code title="post /v1/eval/benchmarks/{benchmark_id}/jobs">client.eval.<a href="./src/resources/eval/eval.ts">runEvalAlpha</a>(benchmarkId, { ...params }) -> Job</code>

## Jobs

Methods:

- <code title="get /v1/eval/benchmarks/{benchmark_id}/jobs/{job_id}/result">client.eval.jobs.<a href="./src/resources/eval/jobs.ts">retrieve</a>(benchmarkId, jobId) -> EvaluateResponse</code>
- <code title="delete /v1/eval/benchmarks/{benchmark_id}/jobs/{job_id}">client.eval.jobs.<a href="./src/resources/eval/jobs.ts">cancel</a>(benchmarkId, jobId) -> void</code>
- <code title="get /v1/eval/benchmarks/{benchmark_id}/jobs/{job_id}">client.eval.jobs.<a href="./src/resources/eval/jobs.ts">status</a>(benchmarkId, jobId) -> Job</code>

# Inspect

Types:

- <code><a href="./src/resources/inspect.ts">HealthInfo</a></code>
- <code><a href="./src/resources/inspect.ts">ProviderInfo</a></code>
- <code><a href="./src/resources/inspect.ts">RouteInfo</a></code>
- <code><a href="./src/resources/inspect.ts">VersionInfo</a></code>

Methods:

- <code title="get /v1/health">client.inspect.<a href="./src/resources/inspect.ts">health</a>() -> HealthInfo</code>
- <code title="get /v1/version">client.inspect.<a href="./src/resources/inspect.ts">version</a>() -> VersionInfo</code>

# Inference

Types:

- <code><a href="./src/resources/inference.ts">InferenceRerankResponse</a></code>

Methods:

- <code title="post /v1alpha/inference/rerank">client.inference.<a href="./src/resources/inference.ts">rerank</a>({ ...params }) -> InferenceRerankResponse</code>

# Embeddings

Types:

- <code><a href="./src/resources/embeddings.ts">CreateEmbeddingsResponse</a></code>

Methods:

- <code title="post /v1/embeddings">client.embeddings.<a href="./src/resources/embeddings.ts">create</a>({ ...params }) -> CreateEmbeddingsResponse</code>

# Chat

Types:

- <code><a href="./src/resources/chat/chat.ts">ChatCompletionChunk</a></code>

## Completions

Types:

- <code><a href="./src/resources/chat/completions.ts">CompletionCreateResponse</a></code>
- <code><a href="./src/resources/chat/completions.ts">CompletionRetrieveResponse</a></code>
- <code><a href="./src/resources/chat/completions.ts">CompletionListResponse</a></code>

Methods:

- <code title="post /v1/chat/completions">client.chat.completions.<a href="./src/resources/chat/completions.ts">create</a>({ ...params }) -> CompletionCreateResponse</code>
- <code title="get /v1/chat/completions/{completion_id}">client.chat.completions.<a href="./src/resources/chat/completions.ts">retrieve</a>(completionId) -> CompletionRetrieveResponse</code>
- <code title="get /v1/chat/completions">client.chat.completions.<a href="./src/resources/chat/completions.ts">list</a>({ ...params }) -> CompletionListResponsesOpenAICursorPage</code>

# Completions

Types:

- <code><a href="./src/resources/completions.ts">CompletionCreateResponse</a></code>

Methods:

- <code title="post /v1/completions">client.completions.<a href="./src/resources/completions.ts">create</a>({ ...params }) -> CompletionCreateResponse</code>

# VectorIo

Types:

- <code><a href="./src/resources/vector-io.ts">QueryChunksResponse</a></code>

Methods:

- <code title="post /v1/vector-io/insert">client.vectorIo.<a href="./src/resources/vector-io.ts">insert</a>({ ...params }) -> void</code>
- <code title="post /v1/vector-io/query">client.vectorIo.<a href="./src/resources/vector-io.ts">query</a>({ ...params }) -> QueryChunksResponse</code>

# VectorDBs

Types:

- <code><a href="./src/resources/vector-dbs.ts">ListVectorDBsResponse</a></code>
- <code><a href="./src/resources/vector-dbs.ts">VectorDBRetrieveResponse</a></code>
- <code><a href="./src/resources/vector-dbs.ts">VectorDBListResponse</a></code>
- <code><a href="./src/resources/vector-dbs.ts">VectorDBRegisterResponse</a></code>

Methods:

- <code title="get /v1/vector-dbs/{vector_db_id}">client.vectorDBs.<a href="./src/resources/vector-dbs.ts">retrieve</a>(vectorDBId) -> VectorDBRetrieveResponse</code>
- <code title="get /v1/vector-dbs">client.vectorDBs.<a href="./src/resources/vector-dbs.ts">list</a>() -> VectorDBListResponse</code>
- <code title="post /v1/vector-dbs">client.vectorDBs.<a href="./src/resources/vector-dbs.ts">register</a>({ ...params }) -> VectorDBRegisterResponse</code>
- <code title="delete /v1/vector-dbs/{vector_db_id}">client.vectorDBs.<a href="./src/resources/vector-dbs.ts">unregister</a>(vectorDBId) -> void</code>

# VectorStores

Types:

- <code><a href="./src/resources/vector-stores/vector-stores.ts">ListVectorStoresResponse</a></code>
- <code><a href="./src/resources/vector-stores/vector-stores.ts">VectorStore</a></code>
- <code><a href="./src/resources/vector-stores/vector-stores.ts">VectorStoreDeleteResponse</a></code>
- <code><a href="./src/resources/vector-stores/vector-stores.ts">VectorStoreSearchResponse</a></code>

Methods:

- <code title="post /v1/vector_stores">client.vectorStores.<a href="./src/resources/vector-stores/vector-stores.ts">create</a>({ ...params }) -> VectorStore</code>
- <code title="get /v1/vector_stores/{vector_store_id}">client.vectorStores.<a href="./src/resources/vector-stores/vector-stores.ts">retrieve</a>(vectorStoreId) -> VectorStore</code>
- <code title="post /v1/vector_stores/{vector_store_id}">client.vectorStores.<a href="./src/resources/vector-stores/vector-stores.ts">update</a>(vectorStoreId, { ...params }) -> VectorStore</code>
- <code title="get /v1/vector_stores">client.vectorStores.<a href="./src/resources/vector-stores/vector-stores.ts">list</a>({ ...params }) -> VectorStoresOpenAICursorPage</code>
- <code title="delete /v1/vector_stores/{vector_store_id}">client.vectorStores.<a href="./src/resources/vector-stores/vector-stores.ts">delete</a>(vectorStoreId) -> VectorStoreDeleteResponse</code>
- <code title="post /v1/vector_stores/{vector_store_id}/search">client.vectorStores.<a href="./src/resources/vector-stores/vector-stores.ts">search</a>(vectorStoreId, { ...params }) -> VectorStoreSearchResponse</code>

## Files

Types:

- <code><a href="./src/resources/vector-stores/files.ts">VectorStoreFile</a></code>
- <code><a href="./src/resources/vector-stores/files.ts">FileDeleteResponse</a></code>
- <code><a href="./src/resources/vector-stores/files.ts">FileContentResponse</a></code>

Methods:

- <code title="post /v1/vector_stores/{vector_store_id}/files">client.vectorStores.files.<a href="./src/resources/vector-stores/files.ts">create</a>(vectorStoreId, { ...params }) -> VectorStoreFile</code>
- <code title="get /v1/vector_stores/{vector_store_id}/files/{file_id}">client.vectorStores.files.<a href="./src/resources/vector-stores/files.ts">retrieve</a>(vectorStoreId, fileId) -> VectorStoreFile</code>
- <code title="post /v1/vector_stores/{vector_store_id}/files/{file_id}">client.vectorStores.files.<a href="./src/resources/vector-stores/files.ts">update</a>(vectorStoreId, fileId, { ...params }) -> VectorStoreFile</code>
- <code title="get /v1/vector_stores/{vector_store_id}/files">client.vectorStores.files.<a href="./src/resources/vector-stores/files.ts">list</a>(vectorStoreId, { ...params }) -> VectorStoreFilesOpenAICursorPage</code>
- <code title="delete /v1/vector_stores/{vector_store_id}/files/{file_id}">client.vectorStores.files.<a href="./src/resources/vector-stores/files.ts">delete</a>(vectorStoreId, fileId) -> FileDeleteResponse</code>
- <code title="get /v1/vector_stores/{vector_store_id}/files/{file_id}/content">client.vectorStores.files.<a href="./src/resources/vector-stores/files.ts">content</a>(vectorStoreId, fileId) -> FileContentResponse</code>

# Models

Types:

- <code><a href="./src/resources/models/models.ts">ListModelsResponse</a></code>
- <code><a href="./src/resources/models/models.ts">Model</a></code>
- <code><a href="./src/resources/models/models.ts">ModelListResponse</a></code>

Methods:

- <code title="get /v1/models/{model_id}">client.models.<a href="./src/resources/models/models.ts">retrieve</a>(modelId) -> Model</code>
- <code title="get /v1/models">client.models.<a href="./src/resources/models/models.ts">list</a>() -> ModelListResponse</code>
- <code title="post /v1/models">client.models.<a href="./src/resources/models/models.ts">register</a>({ ...params }) -> Model</code>
- <code title="delete /v1/models/{model_id}">client.models.<a href="./src/resources/models/models.ts">unregister</a>(modelId) -> void</code>

## OpenAI

Types:

- <code><a href="./src/resources/models/openai.ts">OpenAIListResponse</a></code>

Methods:

- <code title="get /v1/models">client.models.openai.<a href="./src/resources/models/openai.ts">list</a>() -> ModelListResponse</code>

# PostTraining

Types:

- <code><a href="./src/resources/post-training/post-training.ts">AlgorithmConfig</a></code>
- <code><a href="./src/resources/post-training/post-training.ts">ListPostTrainingJobsResponse</a></code>
- <code><a href="./src/resources/post-training/post-training.ts">PostTrainingJob</a></code>

Methods:

- <code title="post /v1/post-training/preference-optimize">client.postTraining.<a href="./src/resources/post-training/post-training.ts">preferenceOptimize</a>({ ...params }) -> PostTrainingJob</code>
- <code title="post /v1/post-training/supervised-fine-tune">client.postTraining.<a href="./src/resources/post-training/post-training.ts">supervisedFineTune</a>({ ...params }) -> PostTrainingJob</code>

## Job

Types:

- <code><a href="./src/resources/post-training/job.ts">JobListResponse</a></code>
- <code><a href="./src/resources/post-training/job.ts">JobArtifactsResponse</a></code>
- <code><a href="./src/resources/post-training/job.ts">JobStatusResponse</a></code>

Methods:

- <code title="get /v1/post-training/jobs">client.postTraining.job.<a href="./src/resources/post-training/job.ts">list</a>() -> Array&lt;ListPostTrainingJobsResponse.Data&gt;</code>
- <code title="get /v1/post-training/job/artifacts">client.postTraining.job.<a href="./src/resources/post-training/job.ts">artifacts</a>({ ...params }) -> JobArtifactsResponse</code>
- <code title="post /v1/post-training/job/cancel">client.postTraining.job.<a href="./src/resources/post-training/job.ts">cancel</a>({ ...params }) -> void</code>
- <code title="get /v1/post-training/job/status">client.postTraining.job.<a href="./src/resources/post-training/job.ts">status</a>({ ...params }) -> JobStatusResponse</code>

# Providers

Types:

- <code><a href="./src/resources/providers.ts">ListProvidersResponse</a></code>
- <code><a href="./src/resources/providers.ts">ProviderListResponse</a></code>

Methods:

- <code title="get /v1/providers/{provider_id}">client.providers.<a href="./src/resources/providers.ts">retrieve</a>(providerId) -> ProviderInfo</code>
- <code title="get /v1/providers">client.providers.<a href="./src/resources/providers.ts">list</a>() -> ProviderListResponse</code>

# Routes

Types:

- <code><a href="./src/resources/routes.ts">ListRoutesResponse</a></code>
- <code><a href="./src/resources/routes.ts">RouteListResponse</a></code>

Methods:

- <code title="get /v1/inspect/routes">client.routes.<a href="./src/resources/routes.ts">list</a>() -> RouteListResponse</code>

# Moderations

Types:

- <code><a href="./src/resources/moderations.ts">CreateResponse</a></code>

Methods:

- <code title="post /v1/moderations">client.moderations.<a href="./src/resources/moderations.ts">create</a>({ ...params }) -> CreateResponse</code>

# Safety

Types:

- <code><a href="./src/resources/safety.ts">RunShieldResponse</a></code>

Methods:

- <code title="post /v1/safety/run-shield">client.safety.<a href="./src/resources/safety.ts">runShield</a>({ ...params }) -> RunShieldResponse</code>

# Shields

Types:

- <code><a href="./src/resources/shields.ts">ListShieldsResponse</a></code>
- <code><a href="./src/resources/shields.ts">Shield</a></code>
- <code><a href="./src/resources/shields.ts">ShieldListResponse</a></code>

Methods:

- <code title="get /v1/shields/{identifier}">client.shields.<a href="./src/resources/shields.ts">retrieve</a>(identifier) -> Shield</code>
- <code title="get /v1/shields">client.shields.<a href="./src/resources/shields.ts">list</a>() -> ShieldListResponse</code>
- <code title="delete /v1/shields/{identifier}">client.shields.<a href="./src/resources/shields.ts">delete</a>(identifier) -> void</code>
- <code title="post /v1/shields">client.shields.<a href="./src/resources/shields.ts">register</a>({ ...params }) -> Shield</code>

# SyntheticDataGeneration

Types:

- <code><a href="./src/resources/synthetic-data-generation.ts">SyntheticDataGenerationResponse</a></code>

Methods:

- <code title="post /v1/synthetic-data-generation/generate">client.syntheticDataGeneration.<a href="./src/resources/synthetic-data-generation.ts">generate</a>({ ...params }) -> SyntheticDataGenerationResponse</code>

# Telemetry

Types:

- <code><a href="./src/resources/telemetry.ts">Event</a></code>
- <code><a href="./src/resources/telemetry.ts">QueryCondition</a></code>
- <code><a href="./src/resources/telemetry.ts">QuerySpansResponse</a></code>
- <code><a href="./src/resources/telemetry.ts">SpanWithStatus</a></code>
- <code><a href="./src/resources/telemetry.ts">Trace</a></code>
- <code><a href="./src/resources/telemetry.ts">TelemetryGetSpanResponse</a></code>
- <code><a href="./src/resources/telemetry.ts">TelemetryGetSpanTreeResponse</a></code>
- <code><a href="./src/resources/telemetry.ts">TelemetryQueryMetricsResponse</a></code>
- <code><a href="./src/resources/telemetry.ts">TelemetryQuerySpansResponse</a></code>
- <code><a href="./src/resources/telemetry.ts">TelemetryQueryTracesResponse</a></code>

Methods:

- <code title="get /v1/telemetry/traces/{trace_id}/spans/{span_id}">client.telemetry.<a href="./src/resources/telemetry.ts">getSpan</a>(traceId, spanId) -> TelemetryGetSpanResponse</code>
- <code title="post /v1/telemetry/spans/{span_id}/tree">client.telemetry.<a href="./src/resources/telemetry.ts">getSpanTree</a>(spanId, { ...params }) -> TelemetryGetSpanTreeResponse</code>
- <code title="get /v1/telemetry/traces/{trace_id}">client.telemetry.<a href="./src/resources/telemetry.ts">getTrace</a>(traceId) -> Trace</code>
- <code title="post /v1/telemetry/events">client.telemetry.<a href="./src/resources/telemetry.ts">logEvent</a>({ ...params }) -> void</code>
- <code title="post /v1/telemetry/metrics/{metric_name}">client.telemetry.<a href="./src/resources/telemetry.ts">queryMetrics</a>(metricName, { ...params }) -> TelemetryQueryMetricsResponse</code>
- <code title="post /v1/telemetry/spans">client.telemetry.<a href="./src/resources/telemetry.ts">querySpans</a>({ ...params }) -> TelemetryQuerySpansResponse</code>
- <code title="post /v1/telemetry/traces">client.telemetry.<a href="./src/resources/telemetry.ts">queryTraces</a>({ ...params }) -> TelemetryQueryTracesResponse</code>
- <code title="post /v1/telemetry/spans/export">client.telemetry.<a href="./src/resources/telemetry.ts">saveSpansToDataset</a>({ ...params }) -> void</code>

# Scoring

Types:

- <code><a href="./src/resources/scoring.ts">ScoringScoreResponse</a></code>
- <code><a href="./src/resources/scoring.ts">ScoringScoreBatchResponse</a></code>

Methods:

- <code title="post /v1/scoring/score">client.scoring.<a href="./src/resources/scoring.ts">score</a>({ ...params }) -> ScoringScoreResponse</code>
- <code title="post /v1/scoring/score-batch">client.scoring.<a href="./src/resources/scoring.ts">scoreBatch</a>({ ...params }) -> ScoringScoreBatchResponse</code>

# ScoringFunctions

Types:

- <code><a href="./src/resources/scoring-functions.ts">ListScoringFunctionsResponse</a></code>
- <code><a href="./src/resources/scoring-functions.ts">ScoringFn</a></code>
- <code><a href="./src/resources/scoring-functions.ts">ScoringFnParams</a></code>
- <code><a href="./src/resources/scoring-functions.ts">ScoringFunctionListResponse</a></code>

Methods:

- <code title="get /v1/scoring-functions/{scoring_fn_id}">client.scoringFunctions.<a href="./src/resources/scoring-functions.ts">retrieve</a>(scoringFnId) -> ScoringFn</code>
- <code title="get /v1/scoring-functions">client.scoringFunctions.<a href="./src/resources/scoring-functions.ts">list</a>() -> ScoringFunctionListResponse</code>
- <code title="post /v1/scoring-functions">client.scoringFunctions.<a href="./src/resources/scoring-functions.ts">register</a>({ ...params }) -> void</code>

# Benchmarks

Types:

- <code><a href="./src/resources/benchmarks.ts">Benchmark</a></code>
- <code><a href="./src/resources/benchmarks.ts">ListBenchmarksResponse</a></code>
- <code><a href="./src/resources/benchmarks.ts">BenchmarkListResponse</a></code>

Methods:

- <code title="get /v1/eval/benchmarks/{benchmark_id}">client.benchmarks.<a href="./src/resources/benchmarks.ts">retrieve</a>(benchmarkId) -> Benchmark</code>
- <code title="get /v1/eval/benchmarks">client.benchmarks.<a href="./src/resources/benchmarks.ts">list</a>() -> BenchmarkListResponse</code>
- <code title="post /v1/eval/benchmarks">client.benchmarks.<a href="./src/resources/benchmarks.ts">register</a>({ ...params }) -> void</code>

# Files

Types:

- <code><a href="./src/resources/files.ts">DeleteFileResponse</a></code>
- <code><a href="./src/resources/files.ts">File</a></code>
- <code><a href="./src/resources/files.ts">ListFilesResponse</a></code>
- <code><a href="./src/resources/files.ts">FileContentResponse</a></code>

Methods:

- <code title="post /v1/files">client.files.<a href="./src/resources/files.ts">create</a>({ ...params }) -> File</code>
- <code title="get /v1/files/{file_id}">client.files.<a href="./src/resources/files.ts">retrieve</a>(fileId) -> File</code>
- <code title="get /v1/files">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> FilesOpenAICursorPage</code>
- <code title="delete /v1/files/{file_id}">client.files.<a href="./src/resources/files.ts">delete</a>(fileId) -> DeleteFileResponse</code>
- <code title="get /v1/files/{file_id}/content">client.files.<a href="./src/resources/files.ts">content</a>(fileId) -> unknown</code>
