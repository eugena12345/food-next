import { action, computed, makeObservable, observable, runInAction } from "mobx";
import type { PrivateFields } from "~/stores/MealCategoryStore/types";
import { STRAPI_URL } from "~/stores/CatalogStore";
import ApiStore, { HTTPMethod } from "~/stores/ApiStore";
// import type { MealCategory } from "~/stores/models/recepies";
import type { CollectionModel } from '~/stores/models/shared/collection';
import {
    getInitialCollectionModel,
    normalizeCollection,
    linearizeCollection
} from '~/stores/models/shared/collection';
import { createCategoryParamsForApi } from "~/utils/api";
import type { Option } from "~/components/MultiDropdown";
import CatalogFiltersStore from "~/stores/CatalogStore/CatalogFiltersStore/CatalogFiltersStore";
import { MealCategory } from "~/shared/types/recepies";

export default class MealCategoryStore {
    private readonly _apiStore = new ApiStore(STRAPI_URL);
    private readonly _catalogFiltersStore = new CatalogFiltersStore();

    private _mealCategory: CollectionModel<number, MealCategory> = getInitialCollectionModel();
    private _choosedCategory: Option[] = [];
    private _valueForMulti = '';
    chosedId = this._catalogFiltersStore.categories;

    constructor() {
        makeObservable<MealCategoryStore, PrivateFields>(this, {
            _mealCategory: observable.ref, //Важно! реф позволяет сравнивать по ссылке
            _choosedCategory: observable.ref,
            _valueForMulti: observable.ref,
            mealCategory: computed,
            choosedCategory: computed,
            valueForMulti: computed,
            getMealCategoryList: action,
            reset: action,
        })
    }

    get mealCategory() {
        return linearizeCollection(this._mealCategory);
    }

    get choosedCategory() {
        return this._choosedCategory;
    }
    get valueForMulti() {
        return this._valueForMulti;
    }

    getSelectedCategories(): void {
        const choosedCategoryId = this.chosedId;
        const selectedCategories = this.mealCategory.filter((categ) =>
            choosedCategoryId.includes(categ.id.toString())
        );

        this._choosedCategory = selectedCategories.map((category) => ({
            key: category.id.toString(),
            value: category.title,
        }));
    }

    setSelectedCategories(value: Option[]): void {
        const existingKeys = this._choosedCategory.map((item) => item.key);
        const uniqueNewCategories = value.filter((item) => !existingKeys.includes(item.key));
        this._choosedCategory = [...this._choosedCategory, ...uniqueNewCategories];
        const createRecepiesMealCategoryColl = (value: Option[]): string[] => {
            return value.map((item) => item.key.toString());
        };
        this._catalogFiltersStore.setCategories(createRecepiesMealCategoryColl(this._choosedCategory));
        this.updateValueForMulti();
    }

    updateValueForMulti() {
        this._valueForMulti = this.choosedCategory.map((category) => category.value).join(', ');
    }

    setSelectedCategoriesFromURL(categoryIds: string[]): void {
        if (!this.mealCategory.length) {
            console.warn('Meal categories are not loaded yet.');
            return;
        }

        const selectedCategories = this.mealCategory.filter((category) =>
            categoryIds.includes(category.id.toString())
        );

        this._choosedCategory = selectedCategories.map((category) => ({
            key: category.id.toString(),
            value: category.title,
        }));

        this.updateValueForMulti();
    }

    async getMealCategoryList(
    ): Promise<void> {
        this._mealCategory = getInitialCollectionModel();
        const response = await this._apiStore.request<MealCategory[]>({
            method: HTTPMethod.GET,
            params: createCategoryParamsForApi(),

            endpoint: '/meal-categories',
            headers: {}, // Добавьте headers
            data: {} as Record<string, unknown>, // Добавьте data
        });
        runInAction(() => {
            if (response.success) {
                this._mealCategory = normalizeCollection(response.data, (el) => el.id);
                this.getSelectedCategories();
                this.updateValueForMulti();
                return;
            }
        })
    }

    reset(): void {
        this._mealCategory = getInitialCollectionModel();
    }

    destroy(): void {
        this.reset();
    }
};

