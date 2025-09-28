import Image from "next/image";
import styles from "./page.module.scss";
import titleImage from './../../public/images/titleImage.png';
import overlayImage from './../../public/images/Recipes.svg';
import InfoCard from "~/shared/components/InfoCard";
import { getIngradientsString } from "~/utils/helpers";
import Button from "~/shared/components/Button";
import Link from "next/link";
import { routes } from "~/shared/config/routes.config";


export default async function RecipesPage() {
  const res = await fetch('https://front-school-strapi.ktsdev.ru/api/recipes?populate[0]=images&populate[1]=category&populate[2]=ingradients', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  const resJson = await res.json();
  console.log('resJson?', resJson)
  const recipes = resJson.data;
  return (
    <div>
      <div className={styles['titleImage-container']}>
        <Image src={titleImage} alt='food' className={styles.titleImage} />
        <Image src={overlayImage} alt="Overlay" className={styles.overlay} />
      </div>
      <div className={styles.container}>

        <div className={styles[`container--maxWidth`]}>
          {/* {catalogStore.meta === Meta.error && <div className={styles.error}>Возникла непредвиденная ошибка. Не удалось загрузить данные. Попробуйте позже.</div>}

                    <SearchInfo />
                    <CatalogFilters totatItems={catalogStore.recepies.length} />

                    {catalogStore.meta === Meta.loading && <Loader />}
                    {
                        catalogStore.meta === Meta.success && catalogStore.recepies.length === 0
                        && <Text tag="h3">Nothing found matching your criteria. Try changing your filters.</Text>
                    } */}

          <div className={styles[`container__products`]}>
            {/* {catalogStore.recepies.length > 0 && catalogStore.recepies.map(rec => { */}
            {recipes.length > 0 && recipes.map(rec => {

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
          {/* {catalogStore.metaInfo.pagination.pageCount > 1
            && <Pagination pageCount={catalogStore.metaInfo.pagination.pageCount} actualPage={catalogStore.metaInfo.pagination.page} />} */}
        </div>
      </div>
    </div>
  )
}
