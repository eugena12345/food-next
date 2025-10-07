export type RecipiesListParams = {
    populate: string[],
    pagination: {
        page: number,
        pageSize: number,
    }
};

export enum Meta {
    initial = 'initial', // Процесс не начат
    loading = 'loading', // В процессе загрузки
    error = 'error', // Завершилось с ошибкой
    success = 'success' // Завершилось успешно
};

export type PrivateFields = '_recepies' | '_meta' | '_metaInfo';

export type ParamsFromQuery = {
    page?: number | string,
    categories?: string,//[],//string,
    search?: string,
    sort?: string,
}

export type ParamsForApi = {
    populate: string[],
    pagination: {
        page?: number | string,
        pageSize?: number,

    }
    filters?: {
        category?: {
            id: {
                $in: string[]
            }
        },
        name?: {
            $containsi: string,
        },

    }
    sort?: string,
}
