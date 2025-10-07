import styles from "./page.module.scss";
import FavoriteStore from "~/shared/stores/FavoriteStore";
import FavoriteList from "~/shared/components/FavoriteList/FavoriteList";
import ApiStore from "~/shared/stores/ApiStore";
import ProtectedRoute from "~/shared/components/ProtectedRoute/ProtectedRoute";
import { cookies } from "next/headers";

export const baseUrl = 'https://front-school-strapi.ktsdev.ru/api';

export default async function FavoritePage() {

      const cookieStore = await cookies();
      const token = cookieStore.get('JWT');
      if (!token) {
        return;
      }
    
    const productsInitDataResponse = await FavoriteStore.getInitFavoriteRecipiesList(new ApiStore(baseUrl), token?.value);
    console.log('FAV SERVER productsInitDataResponse', productsInitDataResponse)

    return (
        <div>
            <ProtectedRoute>
                <FavoriteList initData={productsInitDataResponse || []}/>
            </ProtectedRoute>
        </div>
    )
}
