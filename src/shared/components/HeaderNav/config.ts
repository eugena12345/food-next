import type { MenuItem } from './types';
import { routes } from '~/config/routes.config';
export const menuItems: MenuItem[] = [
    { label: 'Recipes', route: routes.recipes.create() },
    { label: 'Meals Categories', route: routes.categories.create() },
    { label: 'About Us', route: routes.about.create() },
    { label: 'Menu dinner party', route: routes.dinnerparty.create() }
];