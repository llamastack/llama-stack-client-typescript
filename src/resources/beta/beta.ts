// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as DatasetsAPI from './datasets';
import { Datasets } from './datasets';

export class Beta extends APIResource {
  datasets: DatasetsAPI.Datasets = new DatasetsAPI.Datasets(this._client);
}

Beta.Datasets = Datasets;

export declare namespace Beta {
  export { Datasets as Datasets };
}
