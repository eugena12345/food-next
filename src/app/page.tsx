import Image from "next/image";
import styles from "./page.module.scss";
import titleImage from './../../public/images/titleImage.png';
import overlayImage from './../../public/images/Recipes.svg';
import ProductsList from "~/shared/components/ProductsList/ProductsList";
import SearchInfo from "~/shared/components/SearchInfo";
import CatalogFilters from "~/shared/components/CatalogFilters";
import CatalogStore from "~/shared/stores/CatalogStore";
import ApiStore from "~/shared/stores/ApiStore";

export const baseUrl = 'https://front-school-strapi.ktsdev.ru/api';

export default async function RecipesPage({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {


  const params = Object.fromEntries(
    Object.entries(await searchParams).map(([key, value]) => {
      if (key === 'categories') {
        return [key, Array.isArray(value) ? value : [value].filter(Boolean)];
      }
      return [key, Array.isArray(value) ? value.join(',') : value || ''];
    })
  );

  const productsInitDataResponse = await CatalogStore.getInitialData(new ApiStore(baseUrl), params);

  return (
    <div>
      <div className={styles['titleImage-container']}>
        <Image src={titleImage} alt='food' className={styles.titleImage} />
        <Image src={overlayImage} alt="Overlay" className={styles.overlay} />
      </div>
      <div className={styles.container}>

        <div className={styles[`container--maxWidth`]}>
          {/* {catalogStore.meta === Meta.error && <div className={styles.error}>Возникла непредвиденная ошибка. Не удалось загрузить данные. Попробуйте позже.</div>}*/}

          <SearchInfo />
          <CatalogFilters />
          {/* productsInitDataResponse.data.length */}

          {/* {catalogStore.meta === Meta.loading && <Loader />}
                    {
                        catalogStore.meta === Meta.success && catalogStore.recepies.length === 0
                        && <Text tag="h3">Nothing found matching your criteria. Try changing your filters.</Text>
                    } */}

          {/* <ProductsPageStoreContextProvider initData={productsInitDataResponse.data}>  */}
          <ProductsList initData={productsInitDataResponse} />
          {/* </ProductsPageStoreContextProvider> */}


          {/* {catalogStore.metaInfo.pagination.pageCount > 1
            && <Pagination pageCount={catalogStore.metaInfo.pagination.pageCount} actualPage={catalogStore.metaInfo.pagination.page} />} */}
        </div>
      </div>
    </div>
  )
}
