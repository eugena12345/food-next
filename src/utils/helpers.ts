import { Ingredient } from "~/shared/types/recepies";

export const getNumberCountArr = (pageCount: number): number[] => {
    const result = [];
    for (let i = 1; i <= pageCount; i += 1) {
        result.push(i);
    }
    return result
};

export const getIngradientsString = (ingArr: Ingredient[]): string => {
    return ingArr.map((ing) => ing.name).join(' + ')
}
