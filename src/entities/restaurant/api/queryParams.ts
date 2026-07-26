import { queryOptions } from '@tanstack/react-query';

import { getRestaurants } from '@/entities/restaurant/api/getRestaurants';

interface QueryParamsProps {
    city: string;
    isEnabled: boolean;
}

export const restaurantQueryParams = ({ city, isEnabled }: QueryParamsProps) => {
    return queryOptions({
        queryKey: ['restaurants', city],
        queryFn: () => getRestaurants(city),
        enabled: isEnabled,
    });
};
