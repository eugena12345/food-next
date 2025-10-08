export const routes = {
  main: {
    mask: "/",
    create: () => "/",
  },
  mainWithCategory: {
    mask: "/",
    create: (categoryId: number) => `/?categories=${categoryId}`,
  },
  recipes: {
    mask: "/",
    create: () => "/",
  },
  recipe: {
    mask: "/:id",
    create: (id: string) => `/${id}`,
  },
  categories: {
    mask: "/categories",
    create: () => "/categories",
  },
  products: {
    mask: "/products",
    create: () => "/products",
  },
  favorite: {
    mask: "/favorite",
    create: () => "/favorite",
  },
  login: {
    mask: "/authorization",
    create: () => "/authorization",
  },
  registration: {
    mask: "/authorization",
    create: () => "/authorization",
  },
  dinnerparty: {
    mask: '/dinnerparty',
    create: () => '/dinnerparty'
  }
}