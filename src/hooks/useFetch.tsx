import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosRequestConfig, Method } from 'axios';

type UseFetchProps = {
    url: string;
    method?: Method;
    body?: any;
    config?: AxiosRequestConfig;
};

function useFetch<T = any>({ url, method = 'GET', body = null, config = {} }: UseFetchProps, trigger: boolean | number) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const fetchData = useCallback(async () => {
        // const ourRequest = axios.CancelToken.source()

        if (!trigger) return;
        try {
            const response = await axios({
                url,
                method,
                data: body,
                ...config
                // cancelToken: ourRequest.token
            });

            setData(response.data);

        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsLoading(false);
        }
        return () => {
            // ourRequest.cancel()
        };
    }, [url, trigger]);

    let clean = false;

    useEffect(() => {
        if (!clean) fetchData();

        return (() => {
            clean = true
        })
    }, [fetchData]);


    return {
        data,
        isLoading,
        error,
    };
}

export const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export default useFetch;


