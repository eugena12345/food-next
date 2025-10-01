import { action, computed, makeObservable, observable, runInAction } from "mobx";
import type { PrivateFields } from "~/stores/FavoriteStore";
import { Meta, STRAPI_URL } from "~/stores/CatalogStore";
import type { CollectionModel } from '~/stores/models/shared/collection';
import {
    getInitialCollectionModel,
    normalizeCollection,
    linearizeCollection
} from '~/stores/models/shared/collection';
import { FavRecipe, Recipe } from "~/shared/types/recepies";
import ApiStore, { HTTPMethod } from "../ApiStore";

export default class FavoriteStore {
    private readonly _apiStore = new ApiStore(STRAPI_URL);
    private _favoriteRecepies: CollectionModel<number, FavRecipe> = getInitialCollectionModel();
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<FavoriteStore, PrivateFields>(this, {
            _favoriteRecepies: observable.ref, //Важно! реф позволяет сравнивать по ссылке
            _meta: observable,
            favoriteRecepies: computed,
            meta: computed,
            getFavoriteRecipiesList: action.bound,
            addFavoriteRecipe: action.bound,
            deleteFavoriteRecipe: action.bound,
            reset: action.bound,
        })
    }

    get favoriteRecepies() {
        return linearizeCollection(this._favoriteRecepies);
    }

    get meta() {
        return this._meta;
    }

    async getFavoriteRecipiesList(
    ): Promise<void> {
        this._meta = Meta.loading;
        this._favoriteRecepies = getInitialCollectionModel();

        let token: string | null = null;
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('JWT');
        }
        try {
            const response = await this._apiStore.request({
                method: HTTPMethod.GET,
                endpoint: '/favorites',
                //params: paramsForApi,
                headers: {
                    Authorization: `Bearer ${token}`,


                },
                data: {},
            });

            runInAction(() => {
                if (response.status === 200) {

                    this._favoriteRecepies = normalizeCollection(response.data as FavRecipe[], (el) => el.id);
                    this._meta = Meta.success;
                    return;
                } else {
                    this._meta = Meta.error;
                }
            })

        } catch (error) {
            console.error('Failed to fetch initial data:', error);
        }
    }

    async addFavoriteRecipe(
        id: number
    ): Promise<void> {
        let token: string | null = null;

        if (typeof window !== 'undefined') {
            token = localStorage.getItem('JWT');
        }

        try {
            const response = await this._apiStore.request({
                method: HTTPMethod.POST,
                endpoint: '/favorites/add',
                //params: paramsForApi,
                headers: {
                    Authorization: `Bearer ${token}`,


                },
                data: { recipe: id },
            });

        } catch (error) {
            console.error('Failed to fetch initial data:', error);
        }

    }

    async deleteFavoriteRecipe(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number
    ): Promise<void> {
        e.stopPropagation();
        let token: string | null = null;

        if (typeof window !== 'undefined') {
            token = localStorage.getItem('JWT');
        }

        try {
            const response = await this._apiStore.request({
                method: HTTPMethod.POST,
                endpoint: '/favorites/remove',
                //params: paramsForApi,
                headers: {
                    Authorization: `Bearer ${token}`,


                },
                data: { recipe: id },
            });

            this.getFavoriteRecipiesList();


        } catch (error) {
            console.error('Failed to fetch initial data:', error);
        }

    }

    reset(): void {
        this._favoriteRecepies = getInitialCollectionModel();
        this._meta = Meta.initial;
    }

    destroy(): void {
        this.reset();
    }
};

