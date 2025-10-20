// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as DatasetsAPI from './datasets';
import {
  DatasetAppendrowsParams,
  DatasetIterrowsParams,
  DatasetIterrowsResponse,
  DatasetListResponse,
  DatasetRegisterParams,
  DatasetRegisterResponse,
  DatasetRetrieveResponse,
  Datasets,
  ListDatasetsResponse,
} from './datasets';

export class Beta extends APIResource {
  datasets: DatasetsAPI.Datasets = new DatasetsAPI.Datasets(this._client);
}

Beta.Datasets = Datasets;

export declare namespace Beta {
  export {
    Datasets as Datasets,
    type ListDatasetsResponse as ListDatasetsResponse,
    type DatasetRetrieveResponse as DatasetRetrieveResponse,
    type DatasetListResponse as DatasetListResponse,
    type DatasetIterrowsResponse as DatasetIterrowsResponse,
    type DatasetRegisterResponse as DatasetRegisterResponse,
    type DatasetAppendrowsParams as DatasetAppendrowsParams,
    type DatasetIterrowsParams as DatasetIterrowsParams,
    type DatasetRegisterParams as DatasetRegisterParams,
  };
}
