import { create } from 'zustand';

import { SearchFilters } from '@/features/searchFilters/model/SearchFilters';

type ArrayKeys<T> = {
    [K in keyof T]: T[K] extends unknown[] ? K : never;
}[keyof T];

interface FilterStore {
    filters: SearchFilters;
    update: (state: Partial<SearchFilters>) => void;
    reset: () => void;
    toggleArrayItems: <K extends ArrayKeys<SearchFilters>>(
        key: K,
        value: SearchFilters[K][number],
    ) => void;
}

const primaryState: SearchFilters = {
    cityName: '',
    restaurantName: '',
    address: '',
    budget: 2000,
    desiredCategories: [],
    excludedCategories: [],
    mode: [],
    count: 1,
    personCount: 1,
};

export const useFilterStore = create<FilterStore>((set) => ({
    filters: primaryState,

    update: (data) =>
        set((store) => ({
            filters: {
                ...store.filters,
                ...data,
            },
        })),
    reset: () =>
        set({
            filters: primaryState,
        }),
    toggleArrayItems: (key, value) =>
        set((store) => {
            const list = store.filters[key] as unknown[];
            return {
                filters: {
                    ...store.filters,
                    [key]: list.includes(value)
                        ? list.filter((item) => item !== value)
                        : [...list, value],
                },
            };
        }),
}));
