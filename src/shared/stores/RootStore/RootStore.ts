import { makeAutoObservable } from 'mobx';
import QueryStore from '~/stores/RootStore/QueryParamsStore/QueryParamsStore';
import ApiStore from '../ApiStore';
export class RootStore {
  someData: string = '';
  query: QueryStore;
  apiStore: ApiStore;

  constructor(queryStore: QueryStore, apiStore: ApiStore, initialData?: Partial<RootStore>) {
    makeAutoObservable(this);

    this.query = queryStore;
    this.apiStore = apiStore;

    if (initialData) {
      Object.assign(this, initialData);
    }
  }

  setSomeData(data: string) {
    this.someData = data;
  }
}

export type RootStoreInitData = Partial<Omit<RootStore, 'query' | 'apiStore'>>;

export function createRootStore(apiBaseUrl: string, initialData?: RootStoreInitData) {
  const queryStore = new QueryStore();
  const apiStore = new ApiStore(apiBaseUrl);

  return new RootStore(queryStore, apiStore, initialData);
}