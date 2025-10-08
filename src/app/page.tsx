import Image from "next/image";
import styles from "./page.module.scss";
import titleImage from './../../public/images/titleImage.png';
import overlayImage from './../../public/images/Recipes.svg';
import ProductsList from "~/shared/components/ProductsList/ProductsList";
import SearchInfo from "~/shared/components/SearchInfo";
import CatalogFilters from "~/shared/components/CatalogFilters";
import CatalogStore from "~/shared/stores/CatalogStore";
import ApiStore from "~/shared/stores/ApiStore";
import { STRAPI_URL } from "~/shared/stores/CatalogStore";

export default async function RecipesPage({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const params = Object.fromEntries(
    Object.entries(await searchParams).map(([key, value]) => {
      if (key === 'categories') {
        return [key, Array.isArray(value) ? value.join(',') : [value].filter(Boolean).join(',')];
      }
      return [key, Array.isArray(value) ? value.join(',') : value || ''];
    })
  );

  const productsInitDataResponse = await CatalogStore.getInitialData(new ApiStore(STRAPI_URL), params);

  return (
    <div>
      <div className={styles['titleImage-container']}>
        <Image src={titleImage} alt='food' className={styles.titleImage} />
        <Image src={overlayImage} alt="Overlay" className={styles.overlay} />
      </div>
      <div className={styles.container}>
        <div className={styles[`container--maxWidth`]}>
          <SearchInfo />
          <CatalogFilters />
          <ProductsList initData={productsInitDataResponse || []} />
        </div>
      </div>
    </div>
  )
}
