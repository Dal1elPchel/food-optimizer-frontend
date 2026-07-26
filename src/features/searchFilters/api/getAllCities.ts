import httpClient from '@/shared/api/httpClient';

export const getAllCities = async (): Promise<string[]> => {
    return await httpClient.get<string[]>('Cities');
};
