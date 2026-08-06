import { useQuery } from '@tanstack/react-query';

import { dishesQueryParams } from '@/features/searchDishes/api/queryParams';
import { PreferencesToAPI } from '@/features/searchDishes/lib/PreferencesToAPI';
import { useFilterStore } from '@/features/searchFilters/model/search.store';

const ResultPage = () => {
    const filters = useFilterStore((state) => state.filters);

    const reqBody = {
        restaurantId: filters.addressId,
        budget: filters.budget,
        peoplePreferences: filters.generalPreferences.map((item) => PreferencesToAPI(item)),
        variantsCount: filters.count,
    };

    const {
        data: allDishes,
        isLoading,
        error,
    } = useQuery(
        dishesQueryParams({
            filters: reqBody,
            isEnabled: !!filters.addressId,
        }),
    );

    return <></>;
};

export default ResultPage;
