import { makeObservable, observable, computed, action, reaction, runInAction, IReactionDisposer } from 'mobx';
import { Meta, metaInfoInitial } from '~/stores/CatalogStore';
import ApiStore, { HTTPMethod } from '~/shared/stores/ApiStore';
import QueryStore from '~/shared/stores/RootStore/QueryParamsStore/QueryParamsStore';
import { createParamsForApi } from '~/utils/api';
import { Recipe } from '~/shared/types/recepies';

export type PrivateFields = '_recepiesDinner';


export default class DinnerPartyStore {
    private _recepiesDinner: Recipe[] = [];

    constructor(
    ) {
        makeObservable<DinnerPartyStore, PrivateFields>(this, {
            _recepiesDinner: observable.ref, // Важно! `observable.ref` позволяет сравнивать по ссылке
            recepiesDinner: computed,
            addRecepeForDinner: action,
            removeRecepeForDinner: action,
            reset: action,
        });

    }

    get recepiesDinner() {
        return this._recepiesDinner;
    }

    addRecepeForDinner(recipe: Recipe) {
        const exists = this._recepiesDinner.some(existingRecipe => existingRecipe.id === recipe.id);

        if (!exists) {
            this._recepiesDinner.push(recipe);
        }
    }

    removeRecepeForDinner(recipeId: number) {
        this._recepiesDinner = [...this._recepiesDinner].filter((item) => item.id !== recipeId)
    }


    reset(): void {
        this._recepiesDinner = [];

    }

    destroy(): void {
        this.reset();
    }

}
