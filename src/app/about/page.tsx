'use client';

import { observer } from 'mobx-react-lite';
import { useRootStore } from '~/shared/stores/RootStore/RootStoreProvider';
const Component = () => {

  return (
    <div>
      здесь была проверка для разработки, может еще понадобиться
    </div>
  )
}
export default observer(Component)