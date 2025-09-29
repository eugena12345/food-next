'use client';

import { observer } from 'mobx-react-lite';
import { useRootStore } from '~/shared/stores/RootStore/RootStoreProvider';
import { useProductsPageStore } from '~/shared/stores/ProductsPageStore/useProductsPageStore';
const Component = () => {
  const store = useProductsPageStore();
  const rootStore = useRootStore();

  console.log('about store product', store);
    console.log('about rootStore', rootStore);


  return (
    <div>

      {/* {store.observedField}  */}
      {/* {rootStore.observedField} */}
    </div>
  )
}
export default observer(Component)