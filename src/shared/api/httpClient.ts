class httpClient {
    static #BASE_URL = 'http://localhost:5001/api/';

    static async get<T>(endPoint: string, init?: string): Promise<T> {
        const response = await fetch(`${this.#BASE_URL}${endPoint}${init ? '?' + init : ''}`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return (await response.json()) as Promise<T>;
    }

    static async post<T>(endPoint: string, body: object): Promise<T> {
        const response = await fetch(this.#BASE_URL + endPoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    }

    static async put<T>(endPoint: string, body: object): Promise<T> {
        const response = await fetch(this.#BASE_URL + endPoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    }

    static async delete<T>(endPoint: string, body?: object): Promise<T> {
        const response = await fetch(this.#BASE_URL + endPoint, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    }
}

export default httpClient;
