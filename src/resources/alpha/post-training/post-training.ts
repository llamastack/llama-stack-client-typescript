// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as JobAPI from './job';
import { Job } from './job';

export class PostTraining extends APIResource {
  job: JobAPI.Job = new JobAPI.Job(this._client);
}

PostTraining.Job = Job;

export declare namespace PostTraining {
  export { Job as Job };
}
