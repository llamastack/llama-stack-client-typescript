// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as V1API from './v1/v1';
import {
  ChoiceLogprobs,
  TokenLogProb,
  V1,
  V1GenerateCompletionParams,
  V1GenerateCompletionResponse,
  V1ListModelsResponse,
} from './v1/v1';

export class OpenAI extends APIResource {
  v1: V1API.V1 = new V1API.V1(this._client);
}

OpenAI.V1 = V1;

export declare namespace OpenAI {
  export {
    V1 as V1,
    type ChoiceLogprobs as ChoiceLogprobs,
    type TokenLogProb as TokenLogProb,
    type V1GenerateCompletionResponse as V1GenerateCompletionResponse,
    type V1ListModelsResponse as V1ListModelsResponse,
    type V1GenerateCompletionParams as V1GenerateCompletionParams,
  };
}
