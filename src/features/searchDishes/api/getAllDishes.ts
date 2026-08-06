import httpClient from '@/shared/api/httpClient';

export const getAllDishes = async (data: object): Promise<string[]> => {
    return await httpClient.post<string[]>('Orders/optimize', data);
};
