export const STRAPI_BASE_URL = 'https://front-school-strapi.ktsdev.ru';
export const STRAPI_URL = `${STRAPI_BASE_URL}/api`;
export const PAGE_SIZE = 100;

export const metaInfoInitial = {
    pagination: {
        page: 1,
        pageCount: 1,
        pageSize: PAGE_SIZE,
        total: 0
    }
}