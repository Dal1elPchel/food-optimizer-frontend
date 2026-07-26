import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRightIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { restaurantQueryParams } from '@/entities/restaurant/api/queryParams';
import { getAllCities } from '@/features/searchFilters/api/getAllCities';
import { useFilterStore } from '@/features/searchFilters/model/search.store';
import BudgetSection from '@/features/searchFilters/ui/BudgetSection.js';
import LocationSection from '@/features/searchFilters/ui/LocationSection.js';
import PreferenceSection from '@/features/searchFilters/ui/PreferenceSection.js';

import styles from './FiltersPage.module.scss';

const FiltersPage = () => {
    const navigate = useNavigate();
    const [isErrorDismissed, setIsErrorDismissed] = useState<boolean>(false);
    const [locationError, setLocationError] = useState<{
        city?: string;
        restaurant?: string;
        address?: string;
    }>({});

    const filters = useFilterStore((state) => state.filters);
    const update = useFilterStore((state) => state.update);
    const toggleArrays = useFilterStore((state) => state.toggleArrayItems);

    const {
        data: cities,
        isLoading: isCitiesLoading,
        error: error,
    } = useQuery({
        queryKey: ['cities'],
        queryFn: getAllCities,
    });

    const { data: restaurants, isLoading: isRestaurantsLoading } = useQuery(
        restaurantQueryParams({ city: filters.cityName, isEnabled: !!filters.cityName }),
    );

    const showError = error && !isErrorDismissed;
    const getAddresses = () => {
        const rest = restaurants?.find((item) => item.name === filters.restaurantName);
        return rest?.locations.map((item) => item.address) ?? [];
    };

    const onSubmit = () => {
        const locationErrors: typeof locationError = {};
        if (filters.cityName.length === 0) locationErrors.city = 'Необходимо выбрать город!';
        if (filters.restaurantName.length === 0)
            locationErrors.restaurant = 'Необходимо выбрать ресторан!';
        if (filters.address.length === 0) locationErrors.address = 'Необходимо выбрать адрес!';

        if (Object.keys(locationErrors).length > 0) {
            setLocationError(locationErrors);
            return;
        }

        setLocationError({});
        navigate('/dishlist');
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
                    <span className={styles.filtersProgressPoint}>1</span>
                    <span> Фильтры &mdash; </span>
                    <span className={styles.filtersProgressPoint}>2</span>
                    <span> Результаты</span>
                </div>
            </div>

            <div className={styles.filtersMain}>
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
                        setValue: (value) => update({ address: value }),
                    }}

                    citiesLoad={isCitiesLoading}
                    restaurantsLoad={isRestaurantsLoading}
                    error={locationError}
                />

                <PreferenceSection
                    optimizeModes={{
                        value: filters.mode,
                        setValue: (value) => toggleArrays('mode', value),
                    }}
                    chosenCategories={{
                        value: filters.desiredCategories,
                        setValue: (value) => toggleArrays('desiredCategories', value),
                    }}
                    excludedCategories={{
                        value: filters.excludedCategories,
                        setValue: (value) => toggleArrays('excludedCategories', value),
                    }}
                />

                <BudgetSection
                    budget={{
                        value: filters.budget,
                        change: (value) => update({ budget: value }),
                    }}
                    personCount={{
                        value: filters.personCount,
                        change: (value) => update({ personCount: value }),
                    }}
                />
            </div>

            <button className={styles.filtersFinishButton} onClick={onSubmit}>
                Подтвердить <ArrowRightIcon />
            </button>
        </>
    );
};

export default FiltersPage;
