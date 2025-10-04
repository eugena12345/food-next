'use client'

import InfoCard from "~/components/InfoCard";
import Button from "~/components/Button";
import { useEffect } from "react";
import styles from './page.module.scss'
import Loader from "~/components/Loader";
//TODO? import Pagination from "~App/components/Pagination";
//TODO? если есть import { getIngradientsString } from '~utils/helpers';
import { observer } from "mobx-react-lite";
import { Meta } from "~/stores/CatalogStore/";
import FavoriteStore from "~/stores/FavoriteStore";
import { authStore } from "~/stores/AuthStore";
import { routes } from "~/config/routes.config";
import Text from "~/components/Text";
import { useLocalStore } from "~/utils/useLocalStore";
import { useRouter } from 'next/navigation';
import Link from "next/link";

const favoriteStore = new FavoriteStore();

const FavoritePage = () => {
    const router = useRouter();

    // const favoriteStore = useLocalStore(() => new FavoriteStore());
    
    // const isAuthenticated = authStore.isAuthenticated;
    // if (!isAuthenticated) {
    //     router.push(routes.login.create());
    // }

    useEffect(() => {
        favoriteStore.getFavoriteRecipiesList();
    }, []);

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.titleFav}>
                <Text tag="h1" color="accent">Favorite recipes</Text>
                </div>
                <div className={styles[`container--maxWidth`]}>
                    {favoriteStore.meta === Meta.error && <div className={styles.error}>Возникла непредвиденная ошибка. Не удалось загрузить данные. Попробуйте позже.</div>}

                    {favoriteStore.meta === Meta.loading && <Loader />}

                    <div className={styles.container__products}>
                        {favoriteStore.favoriteRecepies.length > 0 && favoriteStore.favoriteRecepies.map(rec => {
                            return (
                                <Link href={routes.recipe.create(rec.recipe.documentId)} key={rec.id} className={styles.link}>

                                    <InfoCard
                                        key={rec.recipe.id}
                                        image={rec.recipe.images[0].url}
                                        captionSlot={`${rec.recipe.cookingTime} minutes`}
                                        title={rec.recipe.name}
                                        subtitle=''// НЕТ ИНГРЕДИЕНТОВ в ответе!!!  {getIngradientsString(rec.ingradients)}
                                        itemDocumentId={rec.recipe.documentId}
                                        contentSlot={`${Math.round(rec.recipe.calories)} kcal`}
                                        actionSlot={
                                            <Button
                                                onClick={(e) => favoriteStore.deleteFavoriteRecipe(e, rec.recipe.id)}
                                            >Delete</Button>
                                        }
                                    />
                                </Link>
                            )
                        }
                        )}
                    </div>
                    {/*TODO {favoriteStore.favoriteRecepies.length / PAGE_SIZE > 1
                        && <Pagination pageCount={favoriteStore.favoriteRecepies.length / PAGE_SIZE} actualPage={1} />} */}
                </div>
            </div>
        </div>
    )
};

export default observer(FavoritePage);
