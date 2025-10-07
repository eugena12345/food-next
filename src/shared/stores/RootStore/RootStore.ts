import { makeAutoObservable } from 'mobx';
import QueryStore from '~/stores/RootStore/QueryParamsStore/QueryParamsStore';
import ApiStore from '../ApiStore';
import AuthStore from '../AuthStore/AuthStore';
import FavoriteStore from '../FavoriteStore';
export class RootStore {
  someData: string = '';
  query: QueryStore;
  apiStore: ApiStore;
  authStore: AuthStore;
  favoriteStore: FavoriteStore;
  token?: string;

  constructor(queryStore: QueryStore, apiStore: ApiStore, authStore: AuthStore, favoriteStore: FavoriteStore, initialData?: Partial<RootStore>) {
    makeAutoObservable(this);

    this.query = queryStore;
    this.apiStore = apiStore;
    this.authStore = authStore;
    this.favoriteStore = favoriteStore;
    this.token = initialData?.token;

    if (initialData) {
      Object.assign(this, initialData);
    }
  }

  setSomeData(data: string) {
    this.someData = data;
  }
}

export type RootStoreInitData = Partial<Omit<RootStore, 'query' | 'apiStore'| 'authStore'>>;








// export function createRootStore(apiBaseUrl: string, initialData?: RootStoreInitData) {
//   const queryStore = new QueryStore();
//   const apiStore = new ApiStore(apiBaseUrl);
//   const authStore =  new AuthStore();

//   return new RootStore(queryStore, apiStore, authStore, initialData);
// }