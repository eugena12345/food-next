import { enableStaticRendering } from 'mobx-react-lite';
import { RootStore, RootStoreInitData } from './RootStore';

const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

let clientStore: RootStore;

export const useCreateRootStore = (rootStoreInitData: RootStoreInitData): RootStore => {
  const initRootStore = (): RootStore => {
    return new RootStore(rootStoreInitData);
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
