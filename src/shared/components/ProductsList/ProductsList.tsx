'use client';

import { observer } from 'mobx-react-lite';
import { useRootStore } from '~/shared/stores/RootStore/RootStoreProvider';
import { useLocalStore } from '~/utils/useLocalStore';
import CatalogStore from '~/shared/stores/CatalogStore';
import { Recipe } from '~/shared/types/recepies';
import styles from './ProductsList.module.scss';
import Link from 'next/link';
import { routes } from '~/shared/config/routes.config';
import InfoCard from '../InfoCard';
import { getIngradientsString } from '~/utils/helpers';
import Button from '../Button';
import Text from '~/components/Text';
import { useCallback } from 'react';
import FavoriteStore from '~/shared/stores/FavoriteStore';

interface ProductsListProps {
  initData: Recipe[];
}

const ProductsList: React.FC<ProductsListProps> = ({ initData }) => {
  const rootStore = useRootStore();
  const store = useLocalStore(() =>
    new CatalogStore(
      rootStore.query,
      rootStore.apiStore,
      initData,
    ));
  const favoriteStore = useLocalStore(() => new FavoriteStore());

  const addFavRecipe = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, recipeId: number) => {
      e.preventDefault();
      e.stopPropagation();
      favoriteStore.addFavoriteRecipe(recipeId);
    }, [favoriteStore])

  return (
    <div className={styles.container__products}>
      {store.recepies.length === 0
        && <div className={styles.noMatching}>
          <Text tag="h3">Nothing found matching your criteria. Try changing your filters.</Text>
        </div>
      }
      {store.recepies.length > 0 && store.recepies.map(rec => {

        return (
          <Link href={routes.recipe.create(rec.documentId)} key={rec.id} className={styles.link}>
            <InfoCard
              key={rec.id}
              image={rec.images[0].url}
              captionSlot={`${rec.cookingTime} minutes`}
              title={rec.name}
              subtitle={getIngradientsString(rec.ingradients || [])}
              itemDocumentId={rec.documentId}
              contentSlot={`${Math.round(rec.calories)} kcal`}
              actionSlot={
                <Button onClick={(e) => addFavRecipe(e, rec.id)}
                >
                  Save
                </Button>
              }
            />
          </Link>

        )
      }
      )}
    </div>
  )
};

export default observer(ProductsList);