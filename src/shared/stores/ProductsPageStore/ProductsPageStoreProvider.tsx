'use client';

import { useLocalStore } from "mobx-react-lite";
import React from "react";
import ProductsPageStore, { ProductsPageStoreInitData } from "./ProductsPageStore";

type ProductsPageStoreContextProviderValue = React.PropsWithChildren<{
  initData: ProductsPageStoreInitData;
}>;

export const ProductsPageStoreContext = React.createContext<ProductsPageStore | null>(null);


export const ProductsPageStoreContextProvider: React.FC<
  ProductsPageStoreContextProviderValue
> = ({ children, initData }) => {
  console.log('ProductsPageStoreContextProvider', initData)
  const store = useLocalStore(() => ProductsPageStore.fromJson(initData));

  return (
    <ProductsPageStoreContext.Provider value={store}>
      {children}
    </ProductsPageStoreContext.Provider>
  );
};
