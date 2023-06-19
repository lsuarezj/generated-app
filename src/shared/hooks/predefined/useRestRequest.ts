import { useState, useMemo, useCallback, useEffect } from 'react';

import axios, { AxiosRequestConfig } from 'axios';

import { buildUrl, splitParams } from 'shared/utils/predefined/url';

type RequestArguments = {
  method: AxiosRequestConfig['method'];
  params: AxiosRequestConfig['params'];
  headers: AxiosRequestConfig['headers'];
  url: AxiosRequestConfig['url'];
  body: AxiosRequestConfig['data'];
}

type useRestRequestArgs = {
  onCompleted?: (data: unknown) => void;
  transformer?: (data: unknown) => void;
  onError?: (error: unknown) => void;
  endpoint: string;
  requestArgs: RequestArguments;
  isTriggeredManually?: boolean;
};

type useRestRequestReturn = {
  data?: unknown;
  loading: boolean;
  error?: unknown;
  refetch: (fetchOptions?: RequestArguments) => Promise<void>;
  run: (fetchOptions?: RequestArguments) => Promise<void>;
  name: string;
  type: string;
  method: string;
  url: string;
  headers: unknown;
  params: unknown;
  body: unknown;
  setArgs: (args: unknown) => void
};

export const useRestRequest = ({
  onCompleted,
  onError,
  transformer,
  endpoint,
  requestArgs,
  isTriggeredManually,
}: useRestRequestArgs): useRestRequestReturn => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [args, setArguments] = useState(requestArgs);
  const setArgs = (newArgs) => setArguments(oldArgs => ({ ...oldArgs, ...newArgs }));
  const axiosInstance = useMemo(() => axios.create({ baseURL: endpoint }), [endpoint]);

  const fetchData = useCallback(async (fetchOptions?: RequestArguments) => {
    try {
      const newArgs = {
        ...requestArgs,
        ...fetchOptions,
        data: fetchOptions?.body || fetchOptions?.data || args.body,
      };
      setLoading(true);

      const path = newArgs?.url || '';
      const params = newArgs?.params;
      const { pathParams, queryParams } = splitParams(path, params);
      const url = buildUrl(path, { pathParams });

      const { data: response } = await axiosInstance({ ...newArgs, params: queryParams, url });
      const transformedData = transformer ? transformer?.(response) : response;

      onCompleted?.(transformedData);
      setData(transformedData);
      return Promise.resolve(transformedData);
    } catch (err) {
      onError?.(err);
      setError(err);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  }, [axiosInstance, onCompleted, onError, transformer, args, requestArgs]);

  useEffect(() => {
    if (!isTriggeredManually) {
      fetchData();
    }
  }, [fetchData, isTriggeredManually]);


  return {
    data,
    loading,
    error,
    refetch: fetchData,
    run: fetchData,
    method: args.method,
    url: args.url,
    headers: args.headers,
    params: args.params,
    body: args.body,
    setArgs,
  };
};
