'use client'

import Input from "~/components/Input";
import Button from "~/components/Button";
import styles from './SearchFilter.module.scss';
import { useCallback, useState } from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import CatalogFiltersStore from "~/shared/stores/ProductsPageStore/CatalogFiltersStore/CatalogFiltersStore";
//import { useLocalStore } from "~/utils/useLocalStore";
//import CatalogFiltersStore from "~store/CatalogStore/CatalogFiltersStore/CatalogFiltersStore";

const SearchFilter = () => {
    // const [value, setValue] = useState('');

    const catalogFiltersStore = useLocalStore(() => new CatalogFiltersStore());
    const { tempSearch, setTempSearch, setSearch } = catalogFiltersStore;

    const handleInputChange = useCallback((value: string) => {
        setTempSearch(value);
    }, [setTempSearch]);

    const handleButtonClock = useCallback(() => {
        setSearch();
    }, [setSearch]);


    return (
        <div className={styles['search__container']}>
            <Input
                placeholder="Search product"
                onChange={handleInputChange}//{}
                value={tempSearch}//{tempSearch}
                className={styles['search__container--input']}
            />
            <Button onClick={handleButtonClock}>Find now</Button>
        </div>
    )
};

export default observer(SearchFilter);