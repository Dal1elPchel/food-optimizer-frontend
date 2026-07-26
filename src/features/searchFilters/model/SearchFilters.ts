export type OptimizeMode = 'Легко' | 'Средне' | 'Сытно';

export const modes: OptimizeMode[] = ['Легко', 'Средне', 'Сытно'];

export type Category =
    'Основное блюдо' | 'Гарнир' | 'Десерт' | 'Напиток' | 'Завтрак' | 'Соус' | 'Комбо';

export const categories: Category[] = [
    'Основное блюдо',
    'Гарнир',
    'Напиток',
    'Соус',
    'Завтрак',
    'Десерт',
    'Комбо',
];

export interface SearchFilters {
    cityName: string;
    restaurantName: string;
    address: string;
    budget: number;
    desiredCategories: Category[];
    excludedCategories: Category[];
    mode: OptimizeMode[];
    count: number;
    personCount: number;
}
