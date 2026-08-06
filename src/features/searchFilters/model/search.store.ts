import { create } from 'zustand';

import { preferencesData, SearchFilters } from '@/features/searchFilters/model/SearchFilters';

type ArrayKeys<T> = {
    [K in keyof T]: T[K] extends unknown[] ? K : never;
}[keyof T];

interface FilterStore {
    filters: SearchFilters;
    update: (state: Partial<SearchFilters>) => void;
    reset: () => void;
    setPersonCount: (count: number) => void;
    togglePreferences: <K extends ArrayKeys<preferencesData>>(
        personIndex: number,
        key: K,
        value: preferencesData[K][number],
    ) => void;
}

const preferences: preferencesData[] = [
    {
        desiredCategories: [],
        excludedCategories: [],
        satiationLevels: [],
    },
];

const primaryState: SearchFilters = {
    cityName: '',
    restaurantName: '',
    address: '',
    addressId: '',
    budget: 2000,
    generalPreferences: preferences,
    count: 10,
    personCount: 1,
};

const emptyPreference = (): preferencesData => ({
    desiredCategories: [],
    excludedCategories: [],
    satiationLevels: [],
});

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
    setPersonCount: (count) =>
        set((store) => {
            const current = store.filters.generalPreferences;
            const next =
                count > current.length
                    ? [
                          ...current,
                          ...Array.from({ length: count - current.length }, emptyPreference),
                      ]
                    : current.slice(0, count);

            return {
                filters: {
                    ...store.filters,
                    personCount: count,
                    generalPreferences: next,
                },
            };
        }),
    togglePreferences: (personIndex, key, value) =>
        set((store) => {
            const preferences = [...store.filters.generalPreferences];

            const personPref = preferences[personIndex];
            const list = personPref[key] as unknown[];
            preferences[personIndex] = {
                ...personPref,
                [key]: list.includes(value)
                    ? list.filter((item) => item !== value)
                    : [...list, value],
            };
            return {
                filters: {
                    ...store.filters,
                    generalPreferences: preferences,
                },
            };
        }),
}));
