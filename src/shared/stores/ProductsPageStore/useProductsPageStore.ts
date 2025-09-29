import { useStrictContext } from "../RootStore/useStrictContext";
import { ProductsPageStoreContext } from "./ProductsPageStoreProvider";

export const useProductsPageStore = () => {
    return useStrictContext({
        context: ProductsPageStoreContext,
        message: 'ProductsPageStoreContext was not provided',
    })
}