import { enableStaticRendering } from 'mobx-react-lite';
import { RootStore, RootStoreInitData } from './RootStore';
import QueryParamsStore from '~/stores/RootStore/QueryParamsStore/QueryParamsStore';
import ApiStore from '../ApiStore';
import AuthStore from '../AuthStore/AuthStore';
import FavoriteStore from '../FavoriteStore';
import DinnerPartyStore from '../DinnerPartyStore/DinnerPartyStore';
import { STRAPI_URL } from '../CatalogStore';

const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

let clientStore: RootStore;

export const useCreateRootStore = (rootStoreInitData: RootStoreInitData): RootStore => {
  const initRootStore = (): RootStore => {
    const queryStore = new QueryParamsStore();
    const apiStore = new ApiStore(STRAPI_URL);
    const authStore = new AuthStore(rootStoreInitData.token);
    const favoriteStore = new FavoriteStore();
    const dinnerPartyStore = new DinnerPartyStore();

    return new RootStore(queryStore, apiStore, authStore, favoriteStore, dinnerPartyStore, rootStoreInitData);
  };

  let result: RootStore;
  if (isServer) {
    result = initRootStore();
  } else {
    clientStore = clientStore ?? initRootStore();
    result = clientStore;
  }
  return result;
};
