import { action, computed, makeObservable, observable, runInAction } from "mobx";
import type { PrivateFields } from "~/stores/FavoriteStore";
import { Meta, STRAPI_URL } from "~/stores/CatalogStore";
import type { CollectionModel } from '~/stores/models/shared/collection';
import {
    getInitialCollectionModel,
    normalizeCollection,
    linearizeCollection
} from '~/stores/models/shared/collection';
import { FavRecipe } from "~/shared/types/recepies";
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
            //getFavoriteRecipiesList: action,
            addFavoriteRecipe: action,
            //deleteFavoriteRecipe: action,
            reset: action,
        })
    }

    get favoriteRecepies() {
        return linearizeCollection(this._favoriteRecepies);
    }

    get meta() {
        return this._meta;
    }

    // async getFavoriteRecipiesList(
    // ): Promise<void> {
    //     this._meta = Meta.loading;
    //     this._favoriteRecepies = getInitialCollectionModel();

    //     //TODO const token = localStorage.getItem('JWT')



    //     const response = await axios.get(
    //         `${STRAPI_URL}/favorites`,
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    //                 //TODO `Bearer ${token}`,
    //             },
    //         }
    //     );

    //     runInAction(() => {
    //         if (response.status === 200) {
    //             this._favoriteRecepies = normalizeCollection(response.data, (el) => el.id);
    //             this._meta = Meta.success;
    //             return;
    //         } else {
    //             this._meta = Meta.error;
    //         }
    //     })
    // }

    async addFavoriteRecipe(
        id: number
    ): Promise<void> {
        const token = localStorage.getItem('JWT');

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

            console.log('response добавить рецепт в избранное', response)

        } catch (error) {
            console.error('Failed to fetch initial data:', error);
        }

    }

    // async deleteFavoriteRecipe(
    //     e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number
    // ): Promise<void> {
    //     e.stopPropagation();
    //     const token = localStorage.getItem('JWT');
    //     try {
    //         const response = await axios.post(
    //             `${STRAPI_URL}/favorites/remove`,
    //             { recipe: id },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );
    //         if (response.status === 200) {
    //             this.getFavoriteRecipiesList();
    //         }
    //     } catch (error) {
    //         console.error('Error details:', error.response?.data);
    //         console.error('Status code:', error.response?.status);
    //     }
    // }

    reset(): void {
        this._favoriteRecepies = getInitialCollectionModel();
        this._meta = Meta.initial;
    }

    destroy(): void {
        this.reset();
    }
};

