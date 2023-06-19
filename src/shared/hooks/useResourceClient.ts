import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { onError as createErrorLink } from '@apollo/client/link/error';
import { createHttpLink } from '@apollo/client/link/http';
import { ResourceNames } from 'shared/types';

import { RESOURCES_LIST } from 'shared/constants';

const getErrorLink = () =>
  createErrorLink(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((graphQLError) => {
        console.warn(
          `[GraphQL error]: Message: ${graphQLError.message}, Location: ${graphQLError.locations}, Path: ${graphQLError.path}`,
        );
      });
    } else if (networkError) {
      console.warn(`[Network error]: ${networkError}`);
    }
  });

const getApolloClient = (
  apiEndpoint: string,
): ApolloClient<Record<string, unknown>> | null => {
  if (apiEndpoint) {
    const errorLink = getErrorLink();
    const apolloLinks = ApolloLink.from([
      errorLink,
      createHttpLink({ uri: apiEndpoint }),
    ]);

    return new ApolloClient({
      connectToDevTools: false,
      cache: new InMemoryCache(),
      link: apolloLinks,
    });
  }

  return null;
};

export const useResourceClient = (
  apiUrl,
): Record<ResourceNames, ApolloClient<Record<string, unknown>> | undefined> => {
  return getApolloClient(apiUrl);
};
