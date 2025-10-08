'use client'

import MultiDropdown, { type Option } from "~/components/MultiDropdown";
import styles from './CategoriesFilter.module.scss';
import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { useLocalStore } from "~/utils/useLocalStore";
import { useSearchParams } from "next/navigation";
import MealCategoryStore from "~/shared/stores/MealCategoryStore/MealCategoryStore";
import { useRootStore } from "~/shared/stores/RootStore/RootStoreProvider";

const CategoriesFilter = () => {
    const { query, apiStore } = useRootStore();
    const searchParams = useSearchParams();

    const initialQueryParams = {
        search: searchParams.get('search') || '',
        categories: searchParams.getAll('categories') || [],
    };

    const mealCategoryStore = useLocalStore(() => new MealCategoryStore(
        apiStore
    ));

    useEffect(() => {
        const getCategory = async () => {
            await mealCategoryStore.getMealCategoryList();
            mealCategoryStore.setSelectedCategoriesFromURL(initialQueryParams.categories);
        };
        getCategory();
    }, [mealCategoryStore]);

    const getOptions = useCallback((): Option[] => {
        if (mealCategoryStore.mealCategory.length > 0) {
            const result = mealCategoryStore.mealCategory.map((category) => ({ key: category.id.toString(), value: category.title }));
            return result
        }
        return []
    }, [mealCategoryStore]);

    const optionsForMulti = getOptions();

    const getTitle = useCallback((elements: Option[]) =>
        elements.map((el: Option) => el.value).join(', '), []);

    const onChange = useCallback((value: Option[]) => {
        mealCategoryStore.setSelectedCategories(value);
        const categories = value.map((item) => item.key);
        query.updateQueryParam('categories', categories);
    }, [mealCategoryStore, query]);
    return (
        <MultiDropdown
            options={optionsForMulti}
            value={mealCategoryStore.choosedCategory}
            onChange={onChange}
            getTitle={getTitle}
            className={styles.container__filter}
        />
    )
};

export default observer(CategoriesFilter);