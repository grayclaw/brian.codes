import { useState } from 'react';

// https://www.weather.gov/documentation/services-web-api

interface FetchOptions extends RequestInit {
    headers?: { [key: string]: string };
}

interface FetchResponse<T = any> {
    data: T | null;
    error: string | null;
    isLoading: boolean;
    get: (url: string, options?: FetchOptions) => void;
    post: (url: string, body: any, options?: FetchOptions) => void;
}

/**
 * A custom React hook for making HTTP requests with loading, error, and data state management.
 *
 * @template T - The expected type of the response data
 * @returns {FetchResponse<T>} An object containing data, error, loading state, and HTTP methods
 *
 * @example
 * ```typescript
 * const { data, error, isLoading, get, post } = useFetch<User>();
 *
 * // GET request
 * get('/api/users/1');
 *
 * // POST request
 * post('/api/users', { name: 'John', email: 'john@example.com' });
 * ```
 */
export default function useFetch<T = any>(): FetchResponse<T> {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

    /**
     * Internal function to handle the actual fetch request.
     *
     * @private
     * @param {string} url - The URL to fetch from
     * @param {FetchOptions} options - Fetch options including method, headers, body, etc.
     * @returns {Promise<void>} A promise that resolves when the request is complete
     * @throws {Error} When the network response is not ok or other fetch errors occur
     */
    const fetchData = async (url: string, options: FetchOptions): Promise<void> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result: T = await response.json();
            setData(result);
        } catch (error: any) {
            setError(error.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Performs a GET request to the specified URL.
     *
     * @param {string} url - The URL to send the GET request to
     * @param {FetchOptions} [options={}] - Additional fetch options (headers, etc.)
     * @returns {void}
     *
     * @example
     * ```typescript
     * get('/api/users');
     * get('/api/users/1', { headers: { 'Authorization': 'Bearer token' } });
     * ```
     */
    const get = (url: string, options: FetchOptions = {}): void => {
        const config: FetchOptions = {
            method: 'GET',
            ...options,
        };
        fetchData(url, config);
    };

    /**
     * Performs a POST request to the specified URL with JSON data.
     *
     * @param {string} url - The URL to send the POST request to
     * @param {any} body - The data to send in the request body (will be JSON stringified)
     * @param {FetchOptions} [options={}] - Additional fetch options (headers, etc.)
     * @returns {void}
     *
     * @example
     * ```typescript
     * post('/api/users', { name: 'John', email: 'john@example.com' });
     * post('/api/users', userData, {
     *   headers: { 'Authorization': 'Bearer token' }
     * });
     * ```
     */
    const post = (url: string, body: any, options: FetchOptions = {}): void => {
        const config: FetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: JSON.stringify(body),
            ...options,
        };
        fetchData(url, config);
    };

    return {
        data,
        error,
        isLoading,
        get,
        post,
    };
}
