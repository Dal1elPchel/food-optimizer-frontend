import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRightIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { restaurantQueryParams } from '@/entities/restaurant/api/queryParams';
import { getAllCities } from '@/features/searchFilters/api/getAllCities';
import { useFilterStore } from '@/features/searchFilters/model/search.store';
import { Category, OptimizeMode } from '@/features/searchFilters/model/SearchFilters';
import BudgetSection from '@/features/searchFilters/ui/BudgetSection.js';
import LocationSection from '@/features/searchFilters/ui/LocationSection.js';
import PreferenceSection from '@/features/searchFilters/ui/PreferenceSection.js';

import styles from './FiltersPage.module.scss';

const FILTER_ORDER = ['location', 'budget', 'preferences'] as const;
type FilterKey = (typeof FILTER_ORDER)[number];

const FILTER_LABELS: Record<FilterKey, string> = {
    location: 'Локация',
    budget: 'Бюджет',
    preferences: 'Категории',
};
interface Field<T> {
    value: T[];
    setValue: (arg0: T) => void;
}
interface Preference {
    optimizeModes: Field<OptimizeMode>;
    chosenCategories: Field<Category>;
    excludedCategories: Field<Category>;
}

const FiltersPage = () => {
    const navigate = useNavigate();

    const [currentFilter, setCurrentFilter] = useState<FilterKey>('location');
    const [isErrorDismissed, setIsErrorDismissed] = useState<boolean>(false);
    const [locationError, setLocationError] = useState<{
        city?: string;
        restaurant?: string;
        address?: string;
    }>({});

    const filters = useFilterStore((state) => state.filters);
    const update = useFilterStore((state) => state.update);
    const updatePersonCount = useFilterStore((state) => state.setPersonCount);

    const toggleInPerson = <
        K extends 'satiationLevels' | 'desiredCategories' | 'excludedCategories',
    >(
        index: number,
        key: K,
        value: (typeof filters.generalPreferences)[number][K][number],
    ) => {
        const next = filters.generalPreferences.map((person, i) => {
            if (i !== index) return person;
            const list = person[key] as unknown[];
            return {
                ...person,
                [key]: list.includes(value)
                    ? list.filter((item) => item !== value)
                    : [...list, value],
            };
        });
        update({ generalPreferences: next });
    };

    const generalPreferences: Preference[] = filters.generalPreferences.map((person, index) => ({
        optimizeModes: {
            value: person.satiationLevels,
            setValue: (value) => toggleInPerson(index, 'satiationLevels', value),
        },
        chosenCategories: {
            value: person.desiredCategories,
            setValue: (value) => toggleInPerson(index, 'desiredCategories', value),
        },
        excludedCategories: {
            value: person.excludedCategories,
            setValue: (value) => toggleInPerson(index, 'excludedCategories', value),
        },
    }));

    const {
        data: cities,
        isLoading: isCitiesLoading,
        error,
    } = useQuery({
        queryKey: ['cities'],
        queryFn: getAllCities,
    });

    const { data: restaurants, isLoading: isRestaurantsLoading } = useQuery(
        restaurantQueryParams({ city: filters.cityName, isEnabled: !!filters.cityName }),
    );

    const showError = error && !isErrorDismissed;

    const getAllRests = () => {
        const rest = restaurants?.find((item) => item.name === filters.restaurantName);
        return rest?.locations ?? [];
    };

    const getAddresses = () => {
        const allRests = getAllRests();
        return allRests.map((item) => item.address);
    };

    const getAddressIdOnName = (address: string) => {
        const allRests = getAllRests();
        return allRests.find((item) => item.address === address)?.id;
    };

    const currentIndex = FILTER_ORDER.indexOf(currentFilter);
    const isFirstFilter = currentIndex === 0;
    const isLastFilter = currentIndex === FILTER_ORDER.length - 1;

    const validateLocation = () => {
        const locationErrors: typeof locationError = {};
        if (filters.cityName.length === 0) locationErrors.city = 'Необходимо выбрать город!';
        if (filters.restaurantName.length === 0)
            locationErrors.restaurant = 'Необходимо выбрать ресторан!';
        if (filters.address.length === 0) locationErrors.address = 'Необходимо выбрать адрес!';

        if (Object.keys(locationErrors).length > 0) {
            setLocationError(locationErrors);
            return false;
        }
        setLocationError({});
        return true;
    };

    const goToNextFilter = () => {
        if (currentFilter === 'location' && !validateLocation()) return;

        if (isLastFilter) {
            navigate('/dishlist');
            return;
        }

        setCurrentFilter(FILTER_ORDER[currentIndex + 1]);
    };

    const goToPrevFilter = () => {
        if (isFirstFilter) {
            navigate(-1);
            return;
        }
        setCurrentFilter(FILTER_ORDER[currentIndex - 1]);
    };

    return (
        <>
            {showError && (
                <div className={styles.errorBox}>
                    {error.message}{' '}
                    <button onClick={() => setIsErrorDismissed(true)}>
                        <XIcon />
                    </button>
                </div>
            )}
            <div className={styles.filtersAdditionalInfo}>
                <h1 className={styles.filtersTitle} onClick={() => navigate(-1)}>
                    <span>
                        <ArrowLeft />
                    </span>
                    Настройте фильтры
                </h1>

                <div className={styles.filtersProgressBar}>
                    {FILTER_ORDER.map((key, index) => (
                        <span key={key} className={styles.filtersProgressGroup}>
                            <span
                                className={`${styles.filtersProgressLabel} ${
                                    currentFilter === key ? styles.filtersProgressLabelActive : ''
                                }`}
                            >
                                {FILTER_LABELS[key]}
                            </span>
                            {index < FILTER_ORDER.length - 1 && (
                                <span className={styles.filtersProgressDivider}>&mdash;</span>
                            )}
                        </span>
                    ))}
                </div>
            </div>

            <div className={styles.filtersMain}>
                <button className={styles.prevFilterButton} onClick={goToPrevFilter}>
                    <ArrowLeft />
                </button>

                <div className={styles.filterContent}>
                    {currentFilter === 'location' && (
                        <LocationSection
                            city={{
                                value: filters.cityName,
                                options: cities || [],
                                setValue: (value) => update({ cityName: value }),
                            }}
                            restaurant={{
                                value: filters.restaurantName,
                                options: restaurants?.map((item) => item.name) || [],
                                setValue: (value) => update({ restaurantName: value }),
                            }}
                            address={{
                                value: filters.address,
                                options: getAddresses(),
                                setValue: (value) =>
                                    update({
                                        address: value,
                                        addressId: getAddressIdOnName(value),
                                    }),
                            }}
                            citiesLoad={isCitiesLoading}
                            restaurantsLoad={isRestaurantsLoading}
                            error={locationError}
                        />
                    )}

                    {currentFilter === 'budget' && (
                        <BudgetSection
                            budget={{
                                value: filters.budget,
                                change: (value) => update({ budget: value }),
                            }}
                            personCount={{
                                value: filters.personCount,
                                change: (value) => updatePersonCount(value),
                            }}
                            count={{
                                value: filters.count,
                                change: (value) => update({ count: value }),
                            }}
                        />
                    )}

                    {currentFilter === 'preferences' && (
                        <PreferenceSection generalPreferences={generalPreferences} />
                    )}
                </div>

                <button className={styles.filtersNextButton} onClick={goToNextFilter}>
                    {isLastFilter ? 'Подтвердить' : 'Далее'} <ArrowRightIcon />
                </button>
            </div>
        </>
    );
};

export default FiltersPage;
