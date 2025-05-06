# Datasetio

Types:

- <code><a href="./src/resources/datasetio.ts">DatasetioIterateRowsResponse</a></code>

Methods:

- <code title="post /v1/datasetio/append-rows/{dataset_id}">client.datasetio.<a href="./src/resources/datasetio.ts">appendRows</a>(datasetID, { ...params }) -> void</code>
- <code title="get /v1/datasetio/iterrows/{dataset_id}">client.datasetio.<a href="./src/resources/datasetio.ts">iterateRows</a>(datasetID, { ...params }) -> DatasetioIterateRowsResponse</code>

# Inference

Types:

- <code><a href="./src/resources/inference.ts">ChatCompletionResponse</a></code>
- <code><a href="./src/resources/inference.ts">CompletionMessage</a></code>
- <code><a href="./src/resources/inference.ts">CompletionResponse</a></code>
- <code><a href="./src/resources/inference.ts">InterleavedContent</a></code>
- <code><a href="./src/resources/inference.ts">InterleavedContentItem</a></code>
- <code><a href="./src/resources/inference.ts">Message</a></code>
- <code><a href="./src/resources/inference.ts">MetricInResponse</a></code>
- <code><a href="./src/resources/inference.ts">ResponseFormat</a></code>
- <code><a href="./src/resources/inference.ts">SamplingParams</a></code>
- <code><a href="./src/resources/inference.ts">SystemMessage</a></code>
- <code><a href="./src/resources/inference.ts">TokenLogProbs</a></code>
- <code><a href="./src/resources/inference.ts">ToolCall</a></code>
- <code><a href="./src/resources/inference.ts">ToolConfig</a></code>
- <code><a href="./src/resources/inference.ts">ToolDefinition</a></code>
- <code><a href="./src/resources/inference.ts">InferenceBatchChatCompletionResponse</a></code>
- <code><a href="./src/resources/inference.ts">InferenceBatchCompletionResponse</a></code>
- <code><a href="./src/resources/inference.ts">InferenceEmbeddingsResponse</a></code>

Methods:

- <code title="post /v1/inference/batch-chat-completion">client.inference.<a href="./src/resources/inference.ts">batchChatCompletion</a>({ ...params }) -> InferenceBatchChatCompletionResponse</code>
- <code title="post /v1/inference/batch-completion">client.inference.<a href="./src/resources/inference.ts">batchCompletion</a>({ ...params }) -> InferenceBatchCompletionResponse</code>
- <code title="post /v1/inference/chat-completion">client.inference.<a href="./src/resources/inference.ts">chatCompletion</a>({ ...params }) -> ChatCompletionResponse</code>
- <code title="post /v1/inference/completion">client.inference.<a href="./src/resources/inference.ts">completion</a>({ ...params }) -> CompletionResponse</code>
- <code title="post /v1/inference/embeddings">client.inference.<a href="./src/resources/inference.ts">embeddings</a>({ ...params }) -> InferenceEmbeddingsResponse</code>

# PostTraining

Types:

- <code><a href="./src/resources/post-training/post-training.ts">PostTrainingJob</a></code>
- <code><a href="./src/resources/post-training/post-training.ts">TrainingConfig</a></code>
- <code><a href="./src/resources/post-training/post-training.ts">PostTrainingListJobsResponse</a></code>

Methods:

- <code title="post /v1/post-training/supervised-fine-tune">client.postTraining.<a href="./src/resources/post-training/post-training.ts">fineTuneSupervised</a>({ ...params }) -> PostTrainingJob</code>
- <code title="get /v1/post-training/jobs">client.postTraining.<a href="./src/resources/post-training/post-training.ts">listJobs</a>() -> PostTrainingListJobsResponse</code>
- <code title="post /v1/post-training/preference-optimize">client.postTraining.<a href="./src/resources/post-training/post-training.ts">optimizePreferences</a>({ ...params }) -> PostTrainingJob</code>

## Job

Types:

- <code><a href="./src/resources/post-training/job.ts">JobRetrieveArtifactsResponse</a></code>
- <code><a href="./src/resources/post-training/job.ts">JobRetrieveStatusResponse</a></code>

Methods:

- <code title="post /v1/post-training/job/cancel">client.postTraining.job.<a href="./src/resources/post-training/job.ts">cancel</a>({ ...params }) -> void</code>
- <code title="get /v1/post-training/job/artifacts">client.postTraining.job.<a href="./src/resources/post-training/job.ts">retrieveArtifacts</a>({ ...params }) -> JobRetrieveArtifactsResponse</code>
- <code title="get /v1/post-training/job/status">client.postTraining.job.<a href="./src/resources/post-training/job.ts">retrieveStatus</a>({ ...params }) -> JobRetrieveStatusResponse</code>

# Agents

Types:

- <code><a href="./src/resources/agents/agents.ts">Agent</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentConfig</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentCreateResponse</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentListResponse</a></code>
- <code><a href="./src/resources/agents/agents.ts">AgentListSessionsResponse</a></code>

Methods:

- <code title="post /v1/agents">client.agents.<a href="./src/resources/agents/agents.ts">create</a>({ ...params }) -> AgentCreateResponse</code>
- <code title="get /v1/agents/{agent_id}">client.agents.<a href="./src/resources/agents/agents.ts">retrieve</a>(agentID) -> Agent</code>
- <code title="get /v1/agents">client.agents.<a href="./src/resources/agents/agents.ts">list</a>() -> AgentListResponse</code>
- <code title="delete /v1/agents/{agent_id}">client.agents.<a href="./src/resources/agents/agents.ts">delete</a>(agentID) -> void</code>
- <code title="get /v1/agents/{agent_id}/sessions">client.agents.<a href="./src/resources/agents/agents.ts">listSessions</a>(agentID) -> AgentListSessionsResponse</code>

## Session

Types:

- <code><a href="./src/resources/agents/session/session.ts">Session</a></code>
- <code><a href="./src/resources/agents/session/session.ts">SessionCreateResponse</a></code>

Methods:

- <code title="post /v1/agents/{agent_id}/session">client.agents.session.<a href="./src/resources/agents/session/session.ts">create</a>(agentID, { ...params }) -> SessionCreateResponse</code>
- <code title="get /v1/agents/{agent_id}/session/{session_id}">client.agents.session.<a href="./src/resources/agents/session/session.ts">retrieve</a>(sessionID, { ...params }) -> Session</code>
- <code title="delete /v1/agents/{agent_id}/session/{session_id}">client.agents.session.<a href="./src/resources/agents/session/session.ts">delete</a>(sessionID, { ...params }) -> void</code>

### Turn

Types:

- <code><a href="./src/resources/agents/session/turn/turn.ts">AgentTool</a></code>
- <code><a href="./src/resources/agents/session/turn/turn.ts">InferenceStep</a></code>
- <code><a href="./src/resources/agents/session/turn/turn.ts">MemoryRetrievalStep</a></code>
- <code><a href="./src/resources/agents/session/turn/turn.ts">ShieldCallStep</a></code>
- <code><a href="./src/resources/agents/session/turn/turn.ts">ToolExecutionStep</a></code>
- <code><a href="./src/resources/agents/session/turn/turn.ts">ToolResponse</a></code>
- <code><a href="./src/resources/agents/session/turn/turn.ts">ToolResponseMessage</a></code>
- <code><a href="./src/resources/agents/session/turn/turn.ts">Turn</a></code>
- <code><a href="./src/resources/agents/session/turn/turn.ts">UserMessage</a></code>

Methods:

- <code title="post /v1/agents/{agent_id}/session/{session_id}/turn">client.agents.session.turn.<a href="./src/resources/agents/session/turn/turn.ts">create</a>(sessionID, { ...params }) -> Turn</code>
- <code title="get /v1/agents/{agent_id}/session/{session_id}/turn/{turn_id}">client.agents.session.turn.<a href="./src/resources/agents/session/turn/turn.ts">retrieve</a>(turnID, { ...params }) -> Turn</code>
- <code title="post /v1/agents/{agent_id}/session/{session_id}/turn/{turn_id}/resume">client.agents.session.turn.<a href="./src/resources/agents/session/turn/turn.ts">resume</a>(turnID, { ...params }) -> Turn</code>

#### Step

Types:

- <code><a href="./src/resources/agents/session/turn/step.ts">StepRetrieveResponse</a></code>

Methods:

- <code title="get /v1/agents/{agent_id}/session/{session_id}/turn/{turn_id}/step/{step_id}">client.agents.session.turn.step.<a href="./src/resources/agents/session/turn/step.ts">retrieve</a>(stepID, { ...params }) -> StepRetrieveResponse</code>

# OpenAI

## V1

Types:

- <code><a href="./src/resources/openai/v1/v1.ts">ChoiceLogprobs</a></code>
- <code><a href="./src/resources/openai/v1/v1.ts">TokenLogProb</a></code>
- <code><a href="./src/resources/openai/v1/v1.ts">V1GenerateCompletionResponse</a></code>
- <code><a href="./src/resources/openai/v1/v1.ts">V1ListModelsResponse</a></code>

Methods:

- <code title="post /v1/openai/v1/completions">client.openai.v1.<a href="./src/resources/openai/v1/v1.ts">generateCompletion</a>({ ...params }) -> V1GenerateCompletionResponse</code>
- <code title="get /v1/openai/v1/models">client.openai.v1.<a href="./src/resources/openai/v1/v1.ts">listModels</a>() -> V1ListModelsResponse</code>

### Responses

Types:

- <code><a href="./src/resources/openai/v1/responses.ts">OpenAIResponse</a></code>

Methods:

- <code title="post /v1/openai/v1/responses">client.openai.v1.responses.<a href="./src/resources/openai/v1/responses.ts">create</a>({ ...params }) -> OpenAIResponse</code>
- <code title="get /v1/openai/v1/responses/{id}">client.openai.v1.responses.<a href="./src/resources/openai/v1/responses.ts">retrieve</a>(id) -> OpenAIResponse</code>

### Chat

Types:

- <code><a href="./src/resources/openai/v1/chat.ts">ChatCompletionContentPart</a></code>
- <code><a href="./src/resources/openai/v1/chat.ts">ChatCompletionToolCall</a></code>
- <code><a href="./src/resources/openai/v1/chat.ts">MessageParam</a></code>
- <code><a href="./src/resources/openai/v1/chat.ts">ChatGenerateCompletionResponse</a></code>

Methods:

- <code title="post /v1/openai/v1/chat/completions">client.openai.v1.chat.<a href="./src/resources/openai/v1/chat.ts">generateCompletion</a>({ ...params }) -> ChatGenerateCompletionResponse</code>

# Files

Types:

- <code><a href="./src/resources/files/files.ts">File</a></code>
- <code><a href="./src/resources/files/files.ts">FileUpload</a></code>
- <code><a href="./src/resources/files/files.ts">FileListResponse</a></code>
- <code><a href="./src/resources/files/files.ts">FileListInBucketResponse</a></code>

Methods:

- <code title="get /v1/files/{bucket}/{key}">client.files.<a href="./src/resources/files/files.ts">retrieve</a>(key, { ...params }) -> File</code>
- <code title="get /v1/files">client.files.<a href="./src/resources/files/files.ts">list</a>({ ...params }) -> FileListResponse</code>
- <code title="delete /v1/files/{bucket}/{key}">client.files.<a href="./src/resources/files/files.ts">delete</a>(key, { ...params }) -> void</code>
- <code title="post /v1/files">client.files.<a href="./src/resources/files/files.ts">createUploadSession</a>({ ...params }) -> FileUpload</code>
- <code title="get /v1/files/{bucket}">client.files.<a href="./src/resources/files/files.ts">listInBucket</a>(bucket) -> FileListInBucketResponse</code>

## Session

Methods:

- <code title="get /v1/files/session:{upload_id}">client.files.session.<a href="./src/resources/files/session.ts">retrieve</a>(uploadID) -> FileUpload</code>
- <code title="post /v1/files/session:{upload_id}">client.files.session.<a href="./src/resources/files/session.ts">uploadContent</a>(uploadID, { ...params }) -> File | null</code>

# Eval

## Benchmarks

Types:

- <code><a href="./src/resources/eval/benchmarks/benchmarks.ts">Benchmark</a></code>
- <code><a href="./src/resources/eval/benchmarks/benchmarks.ts">BenchmarkConfig</a></code>
- <code><a href="./src/resources/eval/benchmarks/benchmarks.ts">EvaluateResponse</a></code>
- <code><a href="./src/resources/eval/benchmarks/benchmarks.ts">BenchmarkListResponse</a></code>

Methods:

- <code title="post /v1/eval/benchmarks">client.eval.benchmarks.<a href="./src/resources/eval/benchmarks/benchmarks.ts">create</a>({ ...params }) -> void</code>
- <code title="get /v1/eval/benchmarks/{benchmark_id}">client.eval.benchmarks.<a href="./src/resources/eval/benchmarks/benchmarks.ts">retrieve</a>(benchmarkID) -> Benchmark</code>
- <code title="get /v1/eval/benchmarks">client.eval.benchmarks.<a href="./src/resources/eval/benchmarks/benchmarks.ts">list</a>() -> BenchmarkListResponse</code>
- <code title="post /v1/eval/benchmarks/{benchmark_id}/evaluations">client.eval.benchmarks.<a href="./src/resources/eval/benchmarks/benchmarks.ts">evaluate</a>(benchmarkID, { ...params }) -> EvaluateResponse</code>

### Jobs

Types:

- <code><a href="./src/resources/eval/benchmarks/jobs.ts">Job</a></code>

Methods:

- <code title="get /v1/eval/benchmarks/{benchmark_id}/jobs/{job_id}">client.eval.benchmarks.jobs.<a href="./src/resources/eval/benchmarks/jobs.ts">retrieve</a>(jobID, { ...params }) -> Job</code>
- <code title="delete /v1/eval/benchmarks/{benchmark_id}/jobs/{job_id}">client.eval.benchmarks.jobs.<a href="./src/resources/eval/benchmarks/jobs.ts">cancel</a>(jobID, { ...params }) -> void</code>
- <code title="get /v1/eval/benchmarks/{benchmark_id}/jobs/{job_id}/result">client.eval.benchmarks.jobs.<a href="./src/resources/eval/benchmarks/jobs.ts">result</a>(jobID, { ...params }) -> EvaluateResponse</code>
- <code title="post /v1/eval/benchmarks/{benchmark_id}/jobs">client.eval.benchmarks.jobs.<a href="./src/resources/eval/benchmarks/jobs.ts">run</a>(benchmarkID, { ...params }) -> Job</code>

# Datasets

Types:

- <code><a href="./src/resources/datasets.ts">DataSource</a></code>
- <code><a href="./src/resources/datasets.ts">Dataset</a></code>
- <code><a href="./src/resources/datasets.ts">DatasetListResponse</a></code>

Methods:

- <code title="post /v1/datasets">client.datasets.<a href="./src/resources/datasets.ts">create</a>({ ...params }) -> Dataset</code>
- <code title="get /v1/datasets/{dataset_id}">client.datasets.<a href="./src/resources/datasets.ts">retrieve</a>(datasetID) -> Dataset</code>
- <code title="get /v1/datasets">client.datasets.<a href="./src/resources/datasets.ts">list</a>() -> DatasetListResponse</code>
- <code title="delete /v1/datasets/{dataset_id}">client.datasets.<a href="./src/resources/datasets.ts">delete</a>(datasetID) -> void</code>

# Models

Types:

- <code><a href="./src/resources/models.ts">Model</a></code>
- <code><a href="./src/resources/models.ts">ModelType</a></code>
- <code><a href="./src/resources/models.ts">ModelListResponse</a></code>

Methods:

- <code title="post /v1/models">client.models.<a href="./src/resources/models.ts">create</a>({ ...params }) -> Model</code>
- <code title="get /v1/models/{model_id}">client.models.<a href="./src/resources/models.ts">retrieve</a>(modelID) -> Model</code>
- <code title="get /v1/models">client.models.<a href="./src/resources/models.ts">list</a>() -> ModelListResponse</code>
- <code title="delete /v1/models/{model_id}">client.models.<a href="./src/resources/models.ts">delete</a>(modelID) -> void</code>

# ScoringFunctions

Types:

- <code><a href="./src/resources/scoring-functions.ts">AggregationFunctionType</a></code>
- <code><a href="./src/resources/scoring-functions.ts">ParamType</a></code>
- <code><a href="./src/resources/scoring-functions.ts">ScoringFn</a></code>
- <code><a href="./src/resources/scoring-functions.ts">ScoringFnParams</a></code>
- <code><a href="./src/resources/scoring-functions.ts">ScoringFnParamsType</a></code>
- <code><a href="./src/resources/scoring-functions.ts">ScoringFunctionListResponse</a></code>

Methods:

- <code title="post /v1/scoring-functions">client.scoringFunctions.<a href="./src/resources/scoring-functions.ts">create</a>({ ...params }) -> void</code>
- <code title="get /v1/scoring-functions/{scoring_fn_id}">client.scoringFunctions.<a href="./src/resources/scoring-functions.ts">retrieve</a>(scoringFnID) -> ScoringFn</code>
- <code title="get /v1/scoring-functions">client.scoringFunctions.<a href="./src/resources/scoring-functions.ts">list</a>() -> ScoringFunctionListResponse</code>

# Shields

Types:

- <code><a href="./src/resources/shields.ts">Shield</a></code>
- <code><a href="./src/resources/shields.ts">ShieldListResponse</a></code>

Methods:

- <code title="post /v1/shields">client.shields.<a href="./src/resources/shields.ts">create</a>({ ...params }) -> Shield</code>
- <code title="get /v1/shields/{identifier}">client.shields.<a href="./src/resources/shields.ts">retrieve</a>(identifier) -> Shield</code>
- <code title="get /v1/shields">client.shields.<a href="./src/resources/shields.ts">list</a>() -> ShieldListResponse</code>

# Telemetry

Types:

- <code><a href="./src/resources/telemetry/telemetry.ts">EventType</a></code>
- <code><a href="./src/resources/telemetry/telemetry.ts">StructuredLogType</a></code>

Methods:

- <code title="post /v1/telemetry/events">client.telemetry.<a href="./src/resources/telemetry/telemetry.ts">createEvent</a>({ ...params }) -> void</code>

## Traces

Types:

- <code><a href="./src/resources/telemetry/traces.ts">Span</a></code>
- <code><a href="./src/resources/telemetry/traces.ts">Trace</a></code>
- <code><a href="./src/resources/telemetry/traces.ts">TraceCreateResponse</a></code>

Methods:

- <code title="post /v1/telemetry/traces">client.telemetry.traces.<a href="./src/resources/telemetry/traces.ts">create</a>({ ...params }) -> TraceCreateResponse</code>
- <code title="get /v1/telemetry/traces/{trace_id}/spans/{span_id}">client.telemetry.traces.<a href="./src/resources/telemetry/traces.ts">retrieveSpan</a>(spanID, { ...params }) -> Span</code>
- <code title="get /v1/telemetry/traces/{trace_id}">client.telemetry.traces.<a href="./src/resources/telemetry/traces.ts">retrieveTrace</a>(traceID) -> Trace</code>

## Spans

Types:

- <code><a href="./src/resources/telemetry/spans.ts">QueryCondition</a></code>
- <code><a href="./src/resources/telemetry/spans.ts">SpanCreateResponse</a></code>
- <code><a href="./src/resources/telemetry/spans.ts">SpanBuildTreeResponse</a></code>

Methods:

- <code title="post /v1/telemetry/spans">client.telemetry.spans.<a href="./src/resources/telemetry/spans.ts">create</a>({ ...params }) -> SpanCreateResponse</code>
- <code title="post /v1/telemetry/spans/{span_id}/tree">client.telemetry.spans.<a href="./src/resources/telemetry/spans.ts">buildTree</a>(spanID, { ...params }) -> SpanBuildTreeResponse</code>
- <code title="post /v1/telemetry/spans/export">client.telemetry.spans.<a href="./src/resources/telemetry/spans.ts">export</a>({ ...params }) -> void</code>

# Tools

Types:

- <code><a href="./src/resources/tools.ts">Tool</a></code>
- <code><a href="./src/resources/tools.ts">ToolParameter</a></code>
- <code><a href="./src/resources/tools.ts">ToolListResponse</a></code>

Methods:

- <code title="get /v1/tools/{tool_name}">client.tools.<a href="./src/resources/tools.ts">retrieve</a>(toolName) -> Tool</code>
- <code title="get /v1/tools">client.tools.<a href="./src/resources/tools.ts">list</a>({ ...params }) -> ToolListResponse</code>

# Toolgroups

Types:

- <code><a href="./src/resources/toolgroups.ts">ToolGroup</a></code>
- <code><a href="./src/resources/toolgroups.ts">ToolgroupListResponse</a></code>

Methods:

- <code title="get /v1/toolgroups/{toolgroup_id}">client.toolgroups.<a href="./src/resources/toolgroups.ts">retrieve</a>(toolgroupID) -> ToolGroup</code>
- <code title="get /v1/toolgroups">client.toolgroups.<a href="./src/resources/toolgroups.ts">list</a>() -> ToolgroupListResponse</code>
- <code title="post /v1/toolgroups">client.toolgroups.<a href="./src/resources/toolgroups.ts">register</a>({ ...params }) -> void</code>
- <code title="delete /v1/toolgroups/{toolgroup_id}">client.toolgroups.<a href="./src/resources/toolgroups.ts">unregister</a>(toolgroupID) -> void</code>

# VectorDBs

Types:

- <code><a href="./src/resources/vector-dbs.ts">VectorDB</a></code>
- <code><a href="./src/resources/vector-dbs.ts">VectorDBListResponse</a></code>

Methods:

- <code title="post /v1/vector-dbs">client.vectorDBs.<a href="./src/resources/vector-dbs.ts">create</a>({ ...params }) -> VectorDB</code>
- <code title="get /v1/vector-dbs/{vector_db_id}">client.vectorDBs.<a href="./src/resources/vector-dbs.ts">retrieve</a>(vectorDBID) -> VectorDB</code>
- <code title="get /v1/vector-dbs">client.vectorDBs.<a href="./src/resources/vector-dbs.ts">list</a>() -> VectorDBListResponse</code>
- <code title="delete /v1/vector-dbs/{vector_db_id}">client.vectorDBs.<a href="./src/resources/vector-dbs.ts">delete</a>(vectorDBID) -> void</code>

# Health

Types:

- <code><a href="./src/resources/health.ts">HealthCheckResponse</a></code>

Methods:

- <code title="get /v1/health">client.health.<a href="./src/resources/health.ts">check</a>() -> HealthCheckResponse</code>

# ToolRuntime

Types:

- <code><a href="./src/resources/tool-runtime/tool-runtime.ts">ToolDef</a></code>
- <code><a href="./src/resources/tool-runtime/tool-runtime.ts">URL</a></code>
- <code><a href="./src/resources/tool-runtime/tool-runtime.ts">ToolRuntimeInvokeToolResponse</a></code>
- <code><a href="./src/resources/tool-runtime/tool-runtime.ts">ToolRuntimeListToolsResponse</a></code>

Methods:

- <code title="post /v1/tool-runtime/invoke">client.toolRuntime.<a href="./src/resources/tool-runtime/tool-runtime.ts">invokeTool</a>({ ...params }) -> ToolRuntimeInvokeToolResponse</code>
- <code title="get /v1/tool-runtime/list-tools">client.toolRuntime.<a href="./src/resources/tool-runtime/tool-runtime.ts">listTools</a>({ ...params }) -> ToolRuntimeListToolsResponse</code>

## RagTool

Types:

- <code><a href="./src/resources/tool-runtime/rag-tool.ts">RagToolQueryContextResponse</a></code>

Methods:

- <code title="post /v1/tool-runtime/rag-tool/insert">client.toolRuntime.ragTool.<a href="./src/resources/tool-runtime/rag-tool.ts">insertDocuments</a>({ ...params }) -> void</code>
- <code title="post /v1/tool-runtime/rag-tool/query">client.toolRuntime.ragTool.<a href="./src/resources/tool-runtime/rag-tool.ts">queryContext</a>({ ...params }) -> RagToolQueryContextResponse</code>

# VectorIo

Types:

- <code><a href="./src/resources/vector-io.ts">VectorIoQueryResponse</a></code>

Methods:

- <code title="post /v1/vector-io/insert">client.vectorIo.<a href="./src/resources/vector-io.ts">insert</a>({ ...params }) -> void</code>
- <code title="post /v1/vector-io/query">client.vectorIo.<a href="./src/resources/vector-io.ts">query</a>({ ...params }) -> VectorIoQueryResponse</code>

# Providers

Types:

- <code><a href="./src/resources/providers.ts">ProviderInfo</a></code>
- <code><a href="./src/resources/providers.ts">ProviderListResponse</a></code>

Methods:

- <code title="get /v1/providers/{provider_id}">client.providers.<a href="./src/resources/providers.ts">retrieve</a>(providerID) -> ProviderInfo</code>
- <code title="get /v1/providers">client.providers.<a href="./src/resources/providers.ts">list</a>() -> ProviderListResponse</code>

# Inspect

Types:

- <code><a href="./src/resources/inspect.ts">InspectListRoutesResponse</a></code>

Methods:

- <code title="get /v1/inspect/routes">client.inspect.<a href="./src/resources/inspect.ts">listRoutes</a>() -> InspectListRoutesResponse</code>

# Safety

Types:

- <code><a href="./src/resources/safety.ts">SafetyViolation</a></code>
- <code><a href="./src/resources/safety.ts">SafetyRunShieldResponse</a></code>

Methods:

- <code title="post /v1/safety/run-shield">client.safety.<a href="./src/resources/safety.ts">runShield</a>({ ...params }) -> SafetyRunShieldResponse</code>

# Scoring

Types:

- <code><a href="./src/resources/scoring.ts">ScoringScoreResponse</a></code>
- <code><a href="./src/resources/scoring.ts">ScoringScoreBatchResponse</a></code>

Methods:

- <code title="post /v1/scoring/score">client.scoring.<a href="./src/resources/scoring.ts">score</a>({ ...params }) -> ScoringScoreResponse</code>
- <code title="post /v1/scoring/score-batch">client.scoring.<a href="./src/resources/scoring.ts">scoreBatch</a>({ ...params }) -> ScoringScoreBatchResponse</code>

# SyntheticDataGeneration

Types:

- <code><a href="./src/resources/synthetic-data-generation.ts">SyntheticDataGenerationGenerateResponse</a></code>

Methods:

- <code title="post /v1/synthetic-data-generation/generate">client.syntheticDataGeneration.<a href="./src/resources/synthetic-data-generation.ts">generate</a>({ ...params }) -> SyntheticDataGenerationGenerateResponse</code>

# Version

Types:

- <code><a href="./src/resources/version.ts">VersionRetrieveResponse</a></code>

Methods:

- <code title="get /v1/version">client.version.<a href="./src/resources/version.ts">retrieve</a>() -> VersionRetrieveResponse</code>
