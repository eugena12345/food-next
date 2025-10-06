import styles from "./page.module.scss";
import FavoriteStore from "~/shared/stores/FavoriteStore";
import FavoriteList from "~/shared/components/FavoriteList/FavoriteList";
import ApiStore from "~/shared/stores/ApiStore";
import ProtectedRoute from "~/shared/components/ProtectedRoute/ProtectedRoute";

export const baseUrl = 'https://front-school-strapi.ktsdev.ru/api';

export default async function FavoritePage() {

    const productsInitDataResponse = await FavoriteStore.getInitFavoriteRecipiesList(new ApiStore(baseUrl));

    return (
        <div>
            <ProtectedRoute>
                <FavoriteList />
            </ProtectedRoute>
        </div>
    )
}
