export interface Image {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    url: string
}

export interface Ingredient {
    id: number;
    name: string;
    amount: number;
    unit: string | null;
}

export type Equipment = {
    id: number,
    name: string
}

export type Direction = {
    description: string,
    id: number,
    image: null | string
}

export type MealCategory = {

    id: number,
    documentId: string,
    title: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    image: {
        url: string,
    }
}

export interface Recipe {
    title: ReactNode;
    calories: number;
    cookingTime: number;
    createdAt: string;
    documentId: string;
    id: number;
    images: Image[];
    ingradients?: Ingredient[];
    likes: number;
    name: string;
    preparationTime: number;
    publishedAt: string;
    rating: number;
    servings: number;
    summary: string;
    totalTime: number;
    updatedAt: string;
    vegetarian: boolean;
    equipments?: Equipment[];
    directions?: Direction[];
    category?: MealCategory;
}

export interface FavRecipe {
    createdAt: string;
    documentId: string;
    id: number;
    locale?: null;
    originalRecipeId: number;
    publishedAt?: string;
    recipe: Recipe;
    updatedAt: string;
}