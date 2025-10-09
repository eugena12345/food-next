import styles from './CatalogFilters.module.scss';
import SearchFilter from '~/components/CatalogFilters/SearchFilter';
import CategoriesFilter from '~/components/CatalogFilters/CategoriesFilter';

const CatalogFilters = () => {
    return (
        <div className={styles.container}>
            <SearchFilter />
            <div className={styles.filterandsort}>
                <CategoriesFilter />
            </div>
            <div className={styles.container__resultOrReset}>
                <div className={styles['container__result']}>
                </div>
            </div>
        </div>
    );
}
export default CatalogFilters;