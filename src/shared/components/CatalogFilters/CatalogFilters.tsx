import styles from './CatalogFilters.module.scss';
//TODO import Button from '~components/Button';
import SearchFilter from '~/components/CatalogFilters/SearchFilter';
import CategoriesFilter from '~/components/CatalogFilters/CategoriesFilter';

const CatalogFilters = () => {
    //TODO const resetFilters = () => { }
    return (
        <div className={styles.container}>
            <SearchFilter />
            <div className={styles.filterandsort}>
                <CategoriesFilter />
            </div>
            <div className={styles.container__resultOrReset}>
                <div className={styles['container__result']}>
                    {/*TODO <Button onClick={resetFilters}>Reset filters</Button> */}
                </div>
            </div>
        </div>
    );
}
export default CatalogFilters;