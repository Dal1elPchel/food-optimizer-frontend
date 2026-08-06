import { queryOptions } from '@tanstack/react-query';

import { getAllDishes } from '@/features/searchDishes/api/getAllDishes';

interface QueryParamsProps {
    filters: object;
    isEnabled: boolean;
}

export const dishesQueryParams = ({ filters, isEnabled }: QueryParamsProps) => {
    return queryOptions({
        queryKey: ['dishes', filters],
        queryFn: () => getAllDishes(filters),
        enabled: isEnabled,
    });
};
