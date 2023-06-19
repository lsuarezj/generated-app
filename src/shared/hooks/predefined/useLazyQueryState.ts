import { useCallback, useEffect, useState } from 'react';

import { OperationVariables, QueryLazyOptions, LazyQueryResult} from '@apollo/client';

type useLazyRequestArgs = {
  queryResult?: LazyQueryResult<any, OperationVariables>;
  onCompleted: unknown;
  onError?: unknown;
  run: () => (options?: QueryLazyOptions<OperationVariables> | undefined) => void;
};

type useLazyRequestReturn = {
  run: () => (options?: QueryLazyOptions<OperationVariables> | undefined) => void;
};

export const useLazyQueryState = ({
  queryResult,
  onCompleted,
  onError,
  run,
  transformer,
}: useLazyRequestArgs): useLazyRequestReturn => {
  const [data, setData] = useState()

  const fetchData = useCallback(
    async (options) => {
      try {
        const response = queryResult?.refetch(options?.variables).then(result => {
            const transformedData = transformer?.(result.data)
            setData(transformedData);
            return transformedData;
          });
        queryResult?.called && onCompleted(queryResult.data);
        queryResult.called && queryResult.error && onError();
        return response;
      } catch(error) {
        onError(error)
      }
    },
    [queryResult],
  );

  return {
    run: fetchData,
    data,
  };
};