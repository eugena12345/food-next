import { action, makeObservable, observable } from 'mobx';
import * as qs from 'qs';

type PrivateFields = '_params' | '_categories';

export default class QueryParamsStore {
    private _params: qs.ParsedQs = {};
    private _search: string = '';
    private _categories: string = '';

    constructor() {
        makeObservable<QueryParamsStore, PrivateFields>(this, {
            _params: observable.ref,
            _categories: observable.ref,
            setSearch: action,
            setСategories: action,
            updateQueryParam: action,
        });
    }

    getParam(key: string): string | qs.ParsedQs | (string | qs.ParsedQs)[] | undefined {
        return this._params[key];
    }

    setSearch(search: string) {
        search = search.startsWith('?') ? search.slice(1) : search;

        if (this._search !== search) {
            this._search = search;
            this._params = qs.parse(search);
            this.updateBrowserUrl();
        }
    }

    setСategories(categories: string) {
        categories = categories.startsWith('?')
            ? categories.slice(1)
            : categories;

        if (this._categories !== categories) {
            this._categories = categories;
            this._params = qs.parse(categories);
            this.updateBrowserUrl();
        }
    }

    updateQueryParam(key: string, value: string | string[] | null) {
        const newParams = { ...this._params };

        if (value === null || value === undefined) {
            delete newParams[key];
        } else {
            newParams[key] = value;
        }

        this._params = newParams;
        this.updateBrowserUrl();
    }

    private updateBrowserUrl() {
        const queryString = qs.stringify(this._params, { addQueryPrefix: true });
        window.history.replaceState(null, '', queryString);
    }

    getQueryParams() {
        return this._params;
    }
}