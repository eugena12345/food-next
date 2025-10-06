import { enableStaticRendering } from 'mobx-react-lite';
import { RootStore, RootStoreInitData } from './RootStore';
import QueryParamsStore from '~/stores/RootStore/QueryParamsStore/QueryParamsStore';
import ApiStore from '../ApiStore';
import AuthStore from '../AuthStore/AuthStore';

//TODO заменить на переменные
const baseUrl = 'https://front-school-strapi.ktsdev.ru/api';


const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

let clientStore: RootStore;

export const useCreateRootStore = (rootStoreInitData: RootStoreInitData): RootStore => {
  const initRootStore = (): RootStore => {
    const queryStore = new QueryParamsStore();
    const apiStore = new ApiStore(baseUrl);
    const authStore = new AuthStore(rootStoreInitData.token);

    return new RootStore(queryStore, apiStore, authStore, rootStoreInitData);
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
