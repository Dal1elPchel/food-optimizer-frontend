export type OptimizeMode = 'Легко' | 'Средне' | 'Сытно';

export const modes: OptimizeMode[] = ['Легко', 'Средне', 'Сытно'];

export type Category = 'Основное блюдо' | 'Гарнир' | 'Десерт' | 'Напиток' | 'Завтрак' | 'Соус';

export const categories: Category[] = [
    'Основное блюдо',
    'Гарнир',
    'Напиток',
    'Соус',
    'Завтрак',
    'Десерт',
];

export interface preferencesData {
    desiredCategories: Category[];
    excludedCategories: Category[];
    satiationLevels: OptimizeMode[];
}

export interface SearchFilters {
    cityName: string;
    restaurantName: string;
    address: string;
    addressId: string;
    budget: number;
    generalPreferences: preferencesData[];
    count: number;
    personCount: number;
}
