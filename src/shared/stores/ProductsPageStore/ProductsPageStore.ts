
export default class ProductsPageStore {
    // private readonly _apiStore = new ApiStore(STRAPI_URL);
    // private _recepies: CollectionModel<number, Recipe> = getInitialCollectionModel();
    // private _meta: Meta = Meta.initial;
    // private _metaInfo = metaInfoInitial;
    products: any = [] // Начальное состояние Products[] = [];
    constructor() {

    }


    // static async getInitData(): Promise<any> { //BaseResponse<Products[]>
    //     const response = await fetch('https://front-school-strapi.ktsdev.ru/api/recipes?populate[0]=images&populate[1]=category&populate[2]=ingradients', {
    //         method: 'GET',
    //         headers: {
    //             Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    //             'Content-Type': 'application/json',
    //         },
    //     });
    //     //     {
    //     //     method: Method.GET,
    //     //     url: apiUrls.products,
    //     // });

    //     if (response.isError) {
    //                 console.log('isError ProductsPageStore getInitData')

    //         return {
    //             isError: true,
    //         };
    //     }
    //     console.log('response ProductsPageStore getInitData', response.json());

    //     return {
    //         isError: false,
    //         data: response.data,
    //     };
    // }

    static async getInitData(): Promise<any> { // Уточните возвращаемый тип
        try {
            const response = await fetch('https://front-school-strapi.ktsdev.ru/api/recipes?populate[0]=images&populate[1]=category&populate[2]=ingradients', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            });

            // Проверяем, успешен ли ответ
            if (!response.ok) { // Если статус не в диапазоне 200-299
                console.error('Error fetching data', response.statusText);
                return {
                    isError: true,
                    message: response.statusText, // Сообщение об ошибке
                };
            }

            const data = await response.json(); // Разбираем response в JSON
            console.log('response ProductsPageStore getInitData', data); // Логируем данные

            return {
                isError: false,
                data: data.data, // Корректно извлекаем нужные данные
            };
        } catch (error) {
            console.error('Fetch error:', error);
            return {
                isError: true,
                message: error.message, // Сообщение об ошибке
            };
        }
    }
    static fromJson(data: ProductsPageStoreInitData): ProductsPageStore {
        const store = new ProductsPageStore();
        console.log('fromJson data', data)
        // Параметры инициализации, в зависимости от структуры данных
        store.products = data || []; // Заполняем массив продуктов //data.products || [];
        return store;
    }


    // static fromJson(data: any) { //(data: ProductsPageStoreInitData): ProductsPageStore {
    //     const store = new ProductsPageStore();
    //     console.log('init data data', data)
    //     // инициализируйте ваше хранилище из данных
    //     return store;
    // }
    // static async fromJson(data: any) {

    //     return await data.json();
    // }
}

export type ProductsPageStoreInitData = Partial<ProductsPageStore>;