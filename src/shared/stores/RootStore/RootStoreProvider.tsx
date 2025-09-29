'use client'; // добавила так как хуки

import React from 'react';
import { useCreateRootStore, RootStoreInitData } from './createStore';
import { useStrictContext } from './useStrictContext';
import { RootStore, RootStoreInitData } from './RootStore';


type RootStoreContextValue = RootStore;
type RootStoreProviderProps = {
  children: React.ReactNode;
  rootStoreInitData?: RootStoreInitData;
};

const RootStoreContext = React.createContext<RootStoreContextValue | null>(null);

export const RootStoreProvider: React.FC<RootStoreProviderProps> = ({ children, rootStoreInitData }) => {
  const store = useCreateRootStore(rootStoreInitData || {});
  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useRootStore = () => {
  return useStrictContext({
    context: RootStoreContext,
    message: 'RootStoreContext was not provided',
  });
};
