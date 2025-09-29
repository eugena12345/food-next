import styles from './CatalogFilters.module.scss';
//TODO import Button from '~components/Button';
//TODO import Text from '~components/Text';
import SearchFilter from '~/components/CatalogFilters/SearchFilter';
import CategoriesFilter from '~/components/CatalogFilters/CategoriesFilter';

const CatalogFilters = () => {
    //TODO const resetFilters = () => {
    //     console.log('reset filter. code it')
    // }
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