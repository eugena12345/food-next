'use client'

import MultiDropdown, { type Option } from "~/components/MultiDropdown";
import styles from './CategoriesFilter.module.scss';
//import MealCategoryStore from "~/store/MealCategoryStore/MealCategoryStore";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { useLocalStore } from "~/utils/useLocalStore";

const CategoriesFilter = () => {
   // const mealCategoryStore = useLocalStore(() => new MealCategoryStore());

    // useEffect(() => {
    //     const getCategory = async () => {
    //         await mealCategoryStore.getMealCategoryList();
    //     };

    //     getCategory();
    // }, [mealCategoryStore]);

    // const getOptions = useCallback((): Option[] => {
    //     if (mealCategoryStore.mealCategory.length > 0) {
    //         return mealCategoryStore.mealCategory.map((category) => ({ key: category.id.toString(), value: category.title }))
    //     }
    //     return []
    // }, [mealCategoryStore]);

    //const optionsForMulti = getOptions();

    const getTitle = useCallback((elements: Option[]) =>
        elements.map((el: Option) => el.value).join(', '), []);

    const onChange = useCallback((value: Option[]) => {
        // mealCategoryStore.setSelectedCategories(value);
    }, []); //mealCategoryStore

    return (
        <MultiDropdown
            options={[{key: '1', value: 'first'}, {key: '2', value: 'second'}]}//{optionsForMulti}
            value={[{key: '1', value: 'first'}]}//{mealCategoryStore.choosedCategory}
            onChange={onChange}
            getTitle={getTitle}
            className={styles.container__filter}
        />
    )
};

export default observer(CategoriesFilter);