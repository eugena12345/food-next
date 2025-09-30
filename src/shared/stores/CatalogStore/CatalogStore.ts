import { makeObservable, observable, computed, action, reaction, runInAction, IReactionDisposer } from 'mobx';
import { getInitialCollectionModel } from '~/stores/models/shared/collection';
import { Meta, metaInfoInitial } from '~/stores/CatalogStore';
import ApiStore, { HTTPMethod } from '~/shared/stores/ApiStore';
import QueryStore from '~/shared/stores/RootStore/QueryParamsStore/QueryParamsStore';
import type { ParamsFromQuery, PrivateFields } from "~/stores/CatalogStore";
import { createParamsForApi } from '~/utils/api';
import { Recipe } from '~/shared/types/recepies';



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
            this._recepies = initData;
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

    // static async getInitialData(apiStore: ApiStore, queryParams: ParamsFromQuery): Promise<Recipe[]> {
    //     //console.log('getInitialData queryParams', queryParams)
    //     const paramsForApi = createParamsForApi(queryParams);

    //     try {
    //         const response = await apiStore.request({
    //             method: HTTPMethod.GET,
    //             endpoint: '/recipes',
    //             params: paramsForApi,
    //             headers: {}, 
    //             data: undefined,
    //         });

    //         return response.data || [];
    //     } catch (error) {
    //         console.error('Failed to fetch initial data:', error);
    //         return [];
    //     }
    // }

    static async getInitialData(
        apiStore: ApiStore,
        queryParams: ParamsFromQuery // Используйте правильный тип
    ): Promise<Recipe[]> {
        const paramsForApi = createParamsForApi(queryParams);

        try {
            const response = await apiStore.request({
                method: HTTPMethod.GET,
                endpoint: '/recipes',
                params: paramsForApi,
                headers: {}, // Добавьте headers
                data: undefined, // Добавьте data
            });

            return response.data as Recipe[] || [];
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
                headers: {},
                data: undefined,

            });

            runInAction(() => {
                this._recepies = response.data as Recipe[] || [];
                this._meta = Meta.success;
                //this._metaInfo = response.meta || metaInfoInitial;
            });
        } catch (error) {
            runInAction(() => {
                this._meta = Meta.error;
                //this._metaInfo = { message: 'Failed to load recipes' };
            });
        }
    }

    reset(): void {
        this._recepies = [];//getInitialCollectionModel();
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
            if (typeof newPage === 'string') {
                const queryParams = this.queryStore.getQueryParams();
                this.getRecipiesList(this._convertToRecord(queryParams));
            }
        }
    );

    this._qpReactionName = reaction(
        () => this.queryStore.getParam('search'),
        (newSearch) => {
            if (typeof newSearch === 'string') {
                const queryParams = this.queryStore.getQueryParams();
                this.getRecipiesList(this._convertToRecord(queryParams));
            }
        }
    );

    this._qpReactionMealCategory = reaction(
        () => this.queryStore.getParam('categories'),
        (newCategory) => {
            if (typeof newCategory === 'string') {
                const queryParams = this.queryStore.getQueryParams();
                this.getRecipiesList(this._convertToRecord(queryParams));
            }
        }
    );
}

// Вспомогательный метод для преобразования ParsedQs в Record<string, string>
private _convertToRecord(parsedQs: qs.ParsedQs): Record<string, string> {
    const result: Record<string, string> = {};

    for (const key in parsedQs) {
        if (parsedQs.hasOwnProperty(key)) {
            const value = parsedQs[key];
            if (typeof value === 'string') {
                result[key] = value;
            } else if (Array.isArray(value)) {
                result[key] = value.map(String).join(','); // Преобразуем массив в строку
            } else if (value !== undefined && value !== null) {
                result[key] = String(value); // Преобразуем любое другое значение в строку
            }
        }
    }

    return result;
}


    private _qpReactionPage: IReactionDisposer = reaction(() => { }, () => { });
    private _qpReactionName: IReactionDisposer = reaction(() => { }, () => { });
    private _qpReactionMealCategory: IReactionDisposer = reaction(() => { }, () => { });
}
