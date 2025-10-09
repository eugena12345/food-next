import type { ParamsFromQuery, ParamsForApi } from '~/stores/CatalogStore/types';
import { PAGE_SIZE } from '~/stores/CatalogStore//config';

export const createParamsForApi = (params: ParamsFromQuery): ParamsForApi => {
    const paramsForApi: ParamsForApi = {
        populate: ['images', 'category', 'ingradients'],
        pagination: {
            page: 1,
            pageSize: PAGE_SIZE,
        }
    };
    if (params.page) paramsForApi.pagination.page = params.page;
    if (params.categories && params.categories.length > 0) { 
        if (paramsForApi.filters) {
            paramsForApi.filters.category = {
                id: { $in: params.categories.split(',') }

            }
        } else {
            paramsForApi.filters = {
                category: {
                    id: { $in: params.categories.split(',') } 
                }
            }
        }
    }

    if (params.search && params.search !== '') {
        if (paramsForApi.filters) {
            paramsForApi.filters.name = { $containsi: params.search }
        } else {
            paramsForApi.filters = {
                name: {
                    $containsi: params.search
                }
            }
        }
    };

    return paramsForApi;
};

export const createCategoryParamsForApi = () => {
    const paramsForApi = {
        populate: ['image'],
    };
    return paramsForApi;
}

export const createRecipeParamsForApi = () => {
    const paramsForApi = {
        populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category']
    };
    return paramsForApi;
}
