//import type { Ingredient } from '~store/models/recepies';

export const getNumberCountArr = (pageCount: number): number[] => {
    const result = [];
    for (let i = 1; i <= pageCount; i += 1) {
        result.push(i);
    }
    return result
};

export const getIngradientsString = (ingArr): string => { //: Ingredient[]
    return ingArr.map((ing) => ing.name).join(' + ')
}
