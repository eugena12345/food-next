'use client';

import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { routes } from '~/shared/config/routes.config';
import { useProductsPageStore } from '~/shared/stores/ProductsPageStore/useProductsPageStore';
import InfoCard from '../InfoCard';
import { getIngradientsString } from '~/utils/helpers';
import Button from '../Button';
import styles from './ProductsList.module.scss';

const ProductsList = () => {
  const store = useProductsPageStore();
  console.log('local product store', store);
  return (
//     <div>
// {store.products.map((prod) => <div key={prod.id}>{prod.name}</div>)}
//     </div>

          <div className={styles.container__products}>
            {/* {catalogStore.recepies.length > 0 && catalogStore.recepies.map(rec => { */}
            {store.products.length > 0 && store.products.map(rec => {

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
                      <Button
                      //  onClick={(e) => addFavRecipe(e, rec.id)}
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

//   return (
//     <ul>
//       {store.products.map((product) => <ProductCard product={product} />}
//     </ul>
//   )
}
export default observer(ProductsList);