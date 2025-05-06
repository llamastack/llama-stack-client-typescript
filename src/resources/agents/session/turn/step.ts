// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../core/resource';
import * as TurnAPI from './turn';
import { APIPromise } from '../../../../core/api-promise';
import { RequestOptions } from '../../../../internal/request-options';
import { path } from '../../../../internal/utils/path';

export class Step extends APIResource {
  /**
   * Retrieve an agent step by its ID.
   */
  retrieve(
    stepID: string,
    params: StepRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<StepRetrieveResponse> {
    const { agent_id, session_id, turn_id } = params;
    return this._client.get(
      path`/v1/agents/${agent_id}/session/${session_id}/turn/${turn_id}/step/${stepID}`,
      options,
    );
  }
}

export interface StepRetrieveResponse {
  /**
   * An inference step in an agent turn.
   */
  step:
    | TurnAPI.InferenceStep
    | TurnAPI.ToolExecutionStep
    | TurnAPI.ShieldCallStep
    | TurnAPI.MemoryRetrievalStep;
}

export interface StepRetrieveParams {
  /**
   * The ID of the agent to get the step for.
   */
  agent_id: string;

  /**
   * The ID of the session to get the step for.
   */
  session_id: string;

  /**
   * The ID of the turn to get the step for.
   */
  turn_id: string;
}

export declare namespace Step {
  export { type StepRetrieveResponse as StepRetrieveResponse, type StepRetrieveParams as StepRetrieveParams };
}
