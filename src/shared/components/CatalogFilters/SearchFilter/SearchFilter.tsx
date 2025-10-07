'use client'

import Input from "~/components/Input";
import Button from "~/components/Button";
import styles from './SearchFilter.module.scss';
import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useLocalStore } from '~/utils/useLocalStore';
import { useSearchParams } from 'next/navigation';
import CatalogFiltersStore from "~/shared/stores/CatalogStore/CatalogFiltersStore/CatalogFiltersStore";
import { useRootStore } from "~/shared/stores/RootStore/RootStoreProvider";


const SearchFilter = () => {
    const {query} = useRootStore()
    const searchParams = useSearchParams();
    const initialQueryParams = {
        search: searchParams.get('search') || '',
        categories: searchParams.getAll('categories') || [],
    };
    const catalogFiltersStore = useLocalStore(() => new CatalogFiltersStore(initialQueryParams || {}))
    const { tempSearch, setTempSearch, setSearch } = catalogFiltersStore;
    const handleInputChange = useCallback((value: string) => {
        setTempSearch(value);
    }, [setTempSearch]);

    const handleButtonClick = useCallback(() => {
        setSearch();
        query.updateQueryParam('search', catalogFiltersStore.search);
    }, [setSearch, catalogFiltersStore]);

    return (
        <div className={styles['search__container']}>
            <Input
                placeholder="Search product"
                onChange={handleInputChange}
                value={tempSearch}
                className={styles['search__container--input']}
            />
            <Button onClick={handleButtonClick}>Find now</Button>
        </div>
    )
};

export default observer(SearchFilter);