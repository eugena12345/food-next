'use client'

import MultiDropdown, { type Option } from "~/components/MultiDropdown";
import styles from './CategoriesFilter.module.scss';
import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { useLocalStore } from "~/utils/useLocalStore";
import { useRouter, useSearchParams } from "next/navigation";
import CatalogFiltersStore from "~/shared/stores/CatalogStore/CatalogFiltersStore/CatalogFiltersStore";
import MealCategoryStore from "~/shared/stores/MealCategoryStore/MealCategoryStore";

const CategoriesFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialQueryParams = {
        search: searchParams.get('search') || '',
        categories: searchParams.getAll('categories') || [],
    };

    const catalogFiltersStore = useLocalStore(() => new CatalogFiltersStore(initialQueryParams || {}))
    const { categories, setCategories } = catalogFiltersStore;
    const mealCategoryStore = useLocalStore(() => new MealCategoryStore());

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

        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete('categories');

        value.forEach((item) => {
            currentUrl.searchParams.append('categories', item.key);
        });

        router.push(currentUrl.toString());
    }, [mealCategoryStore]);
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