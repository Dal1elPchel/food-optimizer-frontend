import { CircleAlert } from 'lucide-react';

import styles from '../styles/Filters.module.scss';

interface Field<T> {
    options: T[];
    value: T;
    setValue: (value: T) => void;
}

interface LocationProps {
    city: Field<string>;
    restaurant: Field<string>;
    address: Field<string>;

    citiesLoad: boolean;
    restaurantsLoad: boolean;
    error?: { city?: string; restaurant?: string; address?: string };
}

const LocationSection = ({
    city,
    restaurant,
    address,
    citiesLoad = false,
    restaurantsLoad = false,
    error,
}: LocationProps) => {
    return (
        <section className={styles.filterSection}>
            <div>
                <label className={styles.filterLabel} htmlFor="citySelect">
                    1. Выберите город
                </label>
                <select
                    id="citySelect"
                    className={styles.filterSelect}
                    disabled={citiesLoad}
                    value={city.value}
                    onChange={(e) => {
                        city.setValue(e.target.value);
                        restaurant.setValue('');
                        address.setValue('');
                    }}
                >
                    <option value="">
                        {citiesLoad ? 'Идет загрузка городов...' : 'Выберите город'}
                    </option>
                    {city.options.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
                {error?.city && (
                    <div className={styles.fieldError}>
                        <CircleAlert /> {error?.city}
                    </div>
                )}
            </div>

            <div>
                <label className={styles.filterLabel} htmlFor="restaurantSelect">
                    2. Выберите ресторан
                </label>
                <select
                    id="restaurantSelect"
                    disabled={!city.value || restaurantsLoad}
                    className={styles.filterSelect}
                    value={restaurant.value}
                    onChange={(e) => {
                        restaurant.setValue(e.target.value);
                        address.setValue('');
                    }}
                >
                    <option value="">
                        {' '}
                        {restaurantsLoad ? 'Идет загрука ресторанов...' : 'Выберите ресторан'}
                    </option>
                    {restaurant.options.map((restaurant) => (
                        <option key={restaurant} value={restaurant}>
                            {restaurant}
                        </option>
                    ))}
                </select>
                {error?.restaurant && (
                    <div className={styles.fieldError}>
                        <CircleAlert /> {error?.restaurant}
                    </div>
                )}
            </div>

            <div>
                <label className={styles.filterLabel} htmlFor="addressSelect">
                    3. Выберите адрес ресторана
                </label>
                <select
                    id="addressSelect"
                    disabled={!restaurant.value}
                    className={styles.filterSelect}
                    value={address.value}
                    onChange={(e) => address.setValue(e.target.value)}
                >
                    <option value="">Выберите адрес</option>
                    {address.options.map((address) => (
                        <option key={address} value={address}>
                            {address}
                        </option>
                    ))}
                </select>
                {error?.address && (
                    <div className={styles.fieldError}>
                        <CircleAlert /> {error?.address}
                    </div>
                )}
            </div>
        </section>
    );
};

export default LocationSection;
