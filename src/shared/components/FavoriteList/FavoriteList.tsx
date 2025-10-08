'use client'

import InfoCard from "~/components/InfoCard";
import Button from "~/components/Button";
import { useEffect } from "react";
import styles from './FavoriteList.module.scss'
import Loader from "~/components/Loader";
import { observer } from "mobx-react-lite";
import { Meta } from "~/stores/CatalogStore/";
import { routes } from "~/config/routes.config";
import Text from "~/components/Text";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useRootStore } from "~/shared/stores/RootStore/RootStoreProvider";
import { FavRecipe } from "~/shared/types/recepies";

interface FavoritePageProps {
    initData: FavRecipe[];
}
const FavoritePage: React.FC<FavoritePageProps> = ({ initData }) => {
    const router = useRouter();
    const rootStore = useRootStore();
    const isAuthenticated = rootStore.authStore.isAuthenticated;
    useEffect(() => {
        if (!isAuthenticated) {
            router.push(routes.login.create());
        }
        rootStore.favoriteStore.setFavRecipiesFromInitial(initData);
    }, []);

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.titleFav}>
                    <Text tag="h1" color="accent">Favorite recipes</Text>
                </div>
                <div className={styles[`container--maxWidth`]}>
                    {rootStore.favoriteStore.meta === Meta.error && <div className={styles.error}>Возникла непредвиденная ошибка. Не удалось загрузить данные. Попробуйте позже.</div>}

                    {rootStore.favoriteStore.meta === Meta.loading && <Loader />}

                    <div className={styles.container__products}>
                        {rootStore.favoriteStore.favoriteRecepies.length > 0 && rootStore.favoriteStore.favoriteRecepies.map(rec => {
                            return (
                                <Link href={routes.recipe.create(rec.recipe.documentId)} key={rec.id} className={styles.link}>

                                    <InfoCard
                                        key={rec.recipe.id}
                                        image={rec.recipe.images[0].url}
                                        captionSlot={`${rec.recipe.cookingTime} minutes`}
                                        title={rec.recipe.name}
                                        subtitle=''// НЕТ ИНГРЕДИЕНТОВ в ответе?
                                        itemDocumentId={rec.recipe.documentId}
                                        contentSlot={`${Math.round(rec.recipe.calories)} kcal`}
                                        actionSlot={
                                            <Button
                                                onClick={(e) => rootStore.favoriteStore.deleteFavoriteRecipe(e, rec.recipe.id)}
                                            >Delete</Button>
                                        }
                                    />
                                </Link>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default observer(FavoritePage);
