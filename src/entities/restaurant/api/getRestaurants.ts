import { Restaurant } from '@/entities/restaurant/model/types';
import httpClient from '@/shared/api/httpClient';

export const getRestaurants = async (city: string): Promise<Restaurant[]> => {
    const params = 'city=' + city;
    return await httpClient.get<Restaurant[]>('Brands', params);
};
