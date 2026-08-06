import {
    Category,
    OptimizeMode,
    preferencesData,
} from '@/features/searchFilters/model/SearchFilters';

const CategoryToAPI: Record<Category, string> = {
    'Основное блюдо': 'MainDish',
    Гарнир: 'SideDish',
    Напиток: 'Drinks',
    Соус: 'Sauces',
    Завтрак: 'Breakfast',
    Десерт: 'Dessert',
};

const ModeToAPI: Record<OptimizeMode, string> = {
    Легко: 'Light',
    Средне: 'Medium',
    Сытно: 'Heavy',
};

export const PreferencesToAPI = (peoplePreference: preferencesData) => {
    return {
        desiredCategories: peoplePreference.desiredCategories.map((c) => CategoryToAPI[c]),
        excludedCategories: peoplePreference.excludedCategories.map((c) => CategoryToAPI[c]),
        satiationLevels: peoplePreference.satiationLevels.map((m) => ModeToAPI[m]),
    };
};
