import { action, computed, makeObservable, observable, toJS } from "mobx";
import { getCategoryInit, getSearchInit } from "./config";

type PrivateFields = '_search' | '_categories' | '_tempSearch';
interface InitialQueryParams {
    search?: string;
    categories?: string[];
}

export default class CatalogFiltersStore {
    private _tempSearch: string = getSearchInit();
    private _search: string = getSearchInit();
    private _categories: string[] = getCategoryInit();

    constructor(initialQueryParams?: InitialQueryParams) {
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

        if (initialQueryParams) {
            this._tempSearch = initialQueryParams.search || '';
            this._search = initialQueryParams.search || '';
            this._categories = initialQueryParams.categories || [];

        }
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
    }

    setCategories(value: string[]): void {
        this._categories = value;
    }

    resetFilters(): void {
        this._tempSearch = "";
        this._search = "";
        this._categories = [];
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