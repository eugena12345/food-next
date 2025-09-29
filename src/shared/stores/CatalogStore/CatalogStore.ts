import { makeObservable, observable, computed, action, reaction, runInAction, IReactionDisposer } from 'mobx';
import { getInitialCollectionModel } from '~/stores/models/shared/collection';
import { Meta, metaInfoInitial } from '~/stores/CatalogStore';

import ApiStore, { HTTPMethod } from '~/shared/stores/ApiStore';
import QueryStore from '~/shared/stores/RootStore/QueryParamsStore/QueryParamsStore';
import type { Recipe } from "~/stores/models/recepies";
import type { ParamsFromQuery, PrivateFields } from "~/stores/CatalogStore";
import { createParamsForApi } from '~/utils/api';



export default class CatalogStore {
    private _recepies: Recipe[] = [];
    private _meta: Meta = Meta.initial;
    private _metaInfo = metaInfoInitial;

    constructor(
        private queryStore: QueryStore,
        private apiStore: ApiStore,
        initData?: Recipe[]
    ) {

        if (initData) {
            this._recepies = initData.initData;
            this._meta = Meta.success;
        }

        makeObservable<CatalogStore, PrivateFields>(this, {
            _recepies: observable.ref, // Важно! `observable.ref` позволяет сравнивать по ссылке
            _meta: observable,
            _metaInfo: observable,
            recepies: computed,
            meta: computed,
            getRecipiesList: action,
            reset: action,
        });

        this._setupQueryReactions();
    }

    get recepies() {
        return this._recepies;
    }

    get meta() {
        return this._meta;
    }

    get metaInfo() {
        return this._metaInfo;
    }

    static async getInitialData(apiStore: ApiStore, queryParams: Record<string, string>) {
        console.log('getInitialData queryParams', queryParams)
        const paramsForApi = createParamsForApi(queryParams);

        try {
            const response = await apiStore.request({
                method: HTTPMethod.GET,
                endpoint: '/recipes',
                params: paramsForApi,
            });

            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch initial data:', error);
            return [];
        }
    }


    async getRecipiesList(queryParams: Record<string, string>) {
        this._meta = Meta.loading;
        try {
            const response = await this.apiStore.request({
                method: HTTPMethod.GET,
                endpoint: '/recipes',
                params: queryParams,
            });

            runInAction(() => {
                this._recepies = response.data || [];
                this._meta = Meta.success;
                this._metaInfo = response.meta || metaInfoInitial;
            });
        } catch (error) {
            runInAction(() => {
                this._meta = Meta.error;
                this._metaInfo = { message: 'Failed to load recipes' };
            });
        }
    }

    reset(): void {
        this._recepies = getInitialCollectionModel();
        this._meta = Meta.initial;
        this._metaInfo = metaInfoInitial;
    }

    destroy(): void {
        this.reset();
        this._qpReactionPage();
        this._qpReactionName();
        this._qpReactionMealCategory();
    }

    private _setupQueryReactions() {
        this._qpReactionPage = reaction(
            () => this.queryStore.getParam('page'),
            (newPage) => {
                if (newPage !== undefined) {
                    this.getRecipiesList(this.queryStore.getQueryParams());
                }
            }
        );

        this._qpReactionName = reaction(
            () => this.queryStore.getParam('search'),
            (newSearch) => {
                if (newSearch !== undefined) {
                    this.getRecipiesList(this.queryStore.getQueryParams());
                }
            }
        );

        this._qpReactionMealCategory = reaction(
            () => this.queryStore.getParam('categories'),
            (newCategory) => {
                if (newCategory !== undefined) {
                    this.getRecipiesList(this.queryStore.getQueryParams());
                }
            }
        );
    }

    private _qpReactionPage: IReactionDisposer = reaction(() => { }, () => { });
    private _qpReactionName: IReactionDisposer = reaction(() => { }, () => { });
    private _qpReactionMealCategory: IReactionDisposer = reaction(() => { }, () => { });
}
