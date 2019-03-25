import * as React from 'react';
import { QueryHookOptions, useQuery as apolloUseQuery, QueryHookResult } from 'react-apollo-hooks';
import get from 'lodash.get';
import { ActivityIndicator } from 'react-native';
import { Redirect } from 'react-router-native';

type UseQuery = <TData, TVariables = any, TCache = any>(
  query: any,
  apolloOptions?: QueryHookOptions<TVariables, TCache>,
  options?: { isLoading: (data: TData) => boolean }
) => QueryHookResult<TData, TVariables> & { loadingComp?: React.ReactElement };

const useQuery: UseQuery = (query, apolloOptions, options) => {
  const { data, loading, ...rest } = apolloUseQuery(query, apolloOptions);

  if (options && options.isLoading(data))
    return {
      loading: true,
      data,
      loadingComp: <ActivityIndicator color="rgba(98, 205, 199, 1)" size="large" />,
      ...rest,
    };

  if (!get(data, 'authenticatedStudent.isAuthorized'))
    return {
      loading: true,
      data,
      loadingComp: (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      ),
      ...rest,
    };

  return { data, loading: false, ...rest };
};

export default useQuery;
