'use client';

import { observer } from 'mobx-react-lite';
import { useRootStore } from '~/shared/stores/RootStore/RootStoreProvider';
import { useProductsPageStore } from '~/shared/stores/ProductsPageStore/useProductsPageStore';
const Component = () => {
  const store = useProductsPageStore();
  const rootStore = useRootStore();

  return (
    <div>
      здесь была проверка для разработки, может еще понадобиться
    </div>
  )
}
export default observer(Component)