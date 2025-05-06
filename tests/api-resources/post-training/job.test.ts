// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import LlamaStackClient from 'llama-stack-client';

const client = new LlamaStackClient({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource job', () => {
  // skipped: tests are disabled for the time being
  test.skip('cancel: only required params', async () => {
    const responsePromise = client.postTraining.job.cancel({ job_uuid: 'job_uuid' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('cancel: required and optional params', async () => {
    const response = await client.postTraining.job.cancel({ job_uuid: 'job_uuid' });
  });

  // skipped: tests are disabled for the time being
  test.skip('retrieveArtifacts: only required params', async () => {
    const responsePromise = client.postTraining.job.retrieveArtifacts({ job_uuid: 'job_uuid' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('retrieveArtifacts: required and optional params', async () => {
    const response = await client.postTraining.job.retrieveArtifacts({ job_uuid: 'job_uuid' });
  });

  // skipped: tests are disabled for the time being
  test.skip('retrieveStatus: only required params', async () => {
    const responsePromise = client.postTraining.job.retrieveStatus({ job_uuid: 'job_uuid' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('retrieveStatus: required and optional params', async () => {
    const response = await client.postTraining.job.retrieveStatus({ job_uuid: 'job_uuid' });
  });
});
