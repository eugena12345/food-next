import styles from "./page.module.scss";
import FavoriteList from "~/shared/components/FavoriteList/FavoriteList";
import MealCategoriesList from "~/shared/components/MealCategoriesList";
import ApiStore from "~/shared/stores/ApiStore";
import { STRAPI_URL } from "~/shared/stores/CatalogStore";
import MealCategoryStore from "~/shared/stores/MealCategoryStore";

export default async function CategoryPage() {
    const categoriesInitDataResponse = await MealCategoryStore.getInitMealCategoryList(new ApiStore(STRAPI_URL));
    return (
        <div>
            <MealCategoriesList
                initData={categoriesInitDataResponse}
            />
        </div>
    )
}
