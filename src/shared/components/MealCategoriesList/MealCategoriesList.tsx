'use client'

import { observer } from "mobx-react-lite";
import styles from "./MealCategoriesList.module.scss";
import MealCategoryStore from "~/stores/MealCategoryStore";
import Text from "~/components/Text";
import Loader from "~/components/Loader";
import { routes } from "~/config/routes.config";
import { useLocalStore } from "~/utils/useLocalStore";
import { useRouter } from "next/navigation";
import { useRootStore } from "~/shared/stores/RootStore/RootStoreProvider";
import { MealCategory } from "~/shared/types/recepies";

interface MealCategoriesListProps {
    initData?: MealCategory[];
}

const MealCategoriesPage: React.FC<MealCategoriesListProps> = ({ initData }) => {
    const { apiStore } = useRootStore();

    const mealCategoryStore = useLocalStore(() => new MealCategoryStore(
        apiStore,
        initData
    ));
    const router = useRouter()

    const goToFiltredCategory = (categoryId: number) => {
        router.push(routes.mainWithCategory.create(categoryId))
    }

    return (
        <div className={styles.container}>

            <div className={styles.withMaxWidth}>

                <Text color="accent" tag="h3">Meals Categories</Text>
                {mealCategoryStore.mealCategory.length === 0 ? (
                    <Loader />
                ) : (
                    <div className={styles.grid}>
                        {mealCategoryStore.mealCategory.map((category) => (
                            <div key={category.id} className={styles.card} onClick={() => goToFiltredCategory(category.id)}>
                                <img
                                    src={category.image.url}
                                    alt={category.title}
                                    className={styles.image}
                                />
                                <h3 className={styles.title}>{category.title}</h3>
                            </div>
                        )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default observer(MealCategoriesPage);