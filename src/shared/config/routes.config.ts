export const routes = {
  main: {
    mask: "/",
    create: () => "/",
  },
  mainWithCategory: {
    mask: "/", //recipes/
    create: (categoryId: number) => `?categories=${categoryId}`, ///recipes
  },
  recipes: {
    mask: "/", //recipes
    create: () => "/", //recipes
  },
  recipe: {
    mask: "/:id", //recipes/
    create: (id: string) => `/${id}`, //recipes/
  },
  categories: {
    mask: "/categories",
    create: () => `/categories`,
  },
  products: {
    mask: "/products",
    create: () => `/products`,
  },
  favorite: {
    mask: "/favorite",
    create: () => `/favorite`,
  },
  login: {
    mask: "/authorization",
    create: () => `/authorization`,
  },
  registration: {
    mask: "/authorization",
    create: () => `/authorization`,
  },
}