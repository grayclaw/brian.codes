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

export default function useFetch<T = any>(): FetchResponse<T> {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

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

    const get = (url: string, options: FetchOptions = {}): void => {
        const config: FetchOptions = {
            method: 'GET',
            ...options,
        };
        fetchData(url, config);
    };

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
