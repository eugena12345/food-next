import { action, computed, makeObservable, observable, toJS } from "mobx";
//import rootStore from "~/store/RootStore/instance";
import { getCategoryInit, getSearchInit } from "./config";

type PrivateFields = '_search' | '_categories' | '_tempSearch';

export default class CatalogFiltersStore {
    private _tempSearch: string = getSearchInit();
    private _search: string = getSearchInit();
    private _categories: string[] = getCategoryInit();

    constructor() {
        makeObservable<CatalogFiltersStore, PrivateFields>(this, {
            _search: observable,
            _categories: observable,
            _tempSearch: observable,
            search: computed,
            categories: computed,
            tempSearch: computed,
            setTempSearch: action.bound,
            setSearch: action.bound,
            setCategories: action.bound,
        });
    }


    get search(): string {
        return this._search;
    }

    get categories(): string[] {
        return this._categories;
    }

    get tempSearch(): string {
        return this._tempSearch;
    }

    setTempSearch(value: string): void {
        this._tempSearch = value;
    }

    setSearch(): void {
        this._search = this._tempSearch;
        console.log('setSearch', this._search)
       // rootStore.query.updateQueryParam('search', this._search);

    }

    setCategories(value: string[]): void {
        this._categories = value;
       // rootStore.query.updateQueryParam('categories', value);

    }

    resetFilters(): void {
        this._tempSearch = "";
        this._search = "";
        this._categories = [];
        //rootStore.query.setSearch("");
    }

    reset(): void {
        this._tempSearch = "";

        this._search = getSearchInit()
        this._categories = getCategoryInit();
    }

    destroy(): void {
        this.reset();
    }

}