import { makeObservable, observable, computed, action, reaction, runInAction, IReactionDisposer } from 'mobx';
import { Meta, metaInfoInitial } from '~/stores/CatalogStore';
import ApiStore, { HTTPMethod } from '~/shared/stores/ApiStore';
import QueryStore from '~/shared/stores/RootStore/QueryParamsStore/QueryParamsStore';
import type { MetaInfoInitial, ParamsFromQuery, PrivateFields } from "~/stores/CatalogStore";
import { createParamsForApi } from '~/utils/api';
import { Recipe } from '~/shared/types/recepies';

export type ResponseWithMeta = {
    data: Recipe[],
    meta: MetaInfoInitial
}

export default class CatalogStore {
    private _recepies: Recipe[] = [];
    private _meta: Meta = Meta.initial;
    private _metaInfo = metaInfoInitial;

    constructor(
        private queryStore: QueryStore,
        private apiStore: ApiStore,
        initData?: ResponseWithMeta
    ) {

        if (initData) {
            this._recepies = initData.data;
            this._metaInfo = initData.meta;
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

    static async getInitialData(
        apiStore: ApiStore,
        queryParams: ParamsFromQuery
    ): Promise<ResponseWithMeta> {
        const paramsForApi = createParamsForApi(queryParams);
        try {
            const response = await apiStore.request({
                method: HTTPMethod.GET,
                endpoint: '/recipes',
                params: paramsForApi,
                headers: {
                },

                data: undefined,
            });

            return {
                data: response.data as Recipe[] || [],
                meta: response.meta as MetaInfoInitial
            }
        } catch (error) {
            console.error('Failed to fetch initial data:', error);
            return { data: [], meta: metaInfoInitial };
        }
    }

    async getRecipiesList(
        queryParams: ParamsFromQuery
    ) {
        this._meta = Meta.loading;
        const paramsForApi = createParamsForApi(queryParams);

        try {
            const response = await this.apiStore.request({
                method: HTTPMethod.GET,
                endpoint: '/recipes',
                params: paramsForApi,
                headers: {},
                data: undefined,

            });


            runInAction(() => {
                if (response.status === 200) {
                    this._recepies = response.data as Recipe[] || [];
                    this._meta = Meta.success;
                    this._metaInfo = response.meta! as MetaInfoInitial || metaInfoInitial;


                }
            });
        } catch (error) {
            runInAction(() => {
                this._meta = Meta.error;
            });
        }
    }

    reset(): void {
        this._recepies = [];
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
                if (Array.isArray(newCategory)) {
                    const queryParams = this.queryStore.getQueryParams();
                    this.getRecipiesList(this._convertToRecord(queryParams));
                }
            }
        );
    }

    private _convertToRecord(parsedQs: qs.ParsedQs): ParamsFromQuery {
        const result: Record<string, string> = {};

        for (const key in parsedQs) {
            if (parsedQs.hasOwnProperty(key)) {
                const value = parsedQs[key];
                if (typeof value === 'string') {
                    result[key] = value;
                } else if (Array.isArray(value)) {
                    result[key] = value.map(String).join(',');
                } else if (value !== undefined && value !== null) {
                    result[key] = String(value);
                }
            }
        }

        return result;
    }


    private _qpReactionPage: IReactionDisposer = reaction(() => { }, () => { });
    private _qpReactionName: IReactionDisposer = reaction(() => { }, () => { });
    private _qpReactionMealCategory: IReactionDisposer = reaction(() => { }, () => { });
}
