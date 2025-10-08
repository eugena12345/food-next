import type { MenuItem } from './types';
import { routes } from '~/config/routes.config';
export const menuItems: MenuItem[] = [
    { label: 'Recipes', route: routes.recipes.create() },
    { label: 'Meals Categories', route: routes.categories.create() },
    // { label: 'Products', route: routes.products.create() },
    { label: 'Menu dinner party', route: routes.dinnerparty.create() }, //TODO сделать роуты
    // { label: 'Meal Planning', route: routes.main.create() }, //TODO сделать роуты
];