import { ApolloClient, ApolloLink, InMemoryCache, useApolloClient } from '@apollo/client';
import { onError as createErrorLink } from '@apollo/client/link/error';
import { createHttpLink } from '@apollo/client/link/http';
import { APP_AUTH_RESOURCE, RESOURCES_LIST } from 'shared/constants';

const getErrorLink = () =>
  createErrorLink(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(graphQLError => {
        console.warn(
          `[GraphQL error]: Message: ${graphQLError.message}, Location: ${graphQLError.locations}, Path: ${graphQLError.path}`,
        );
      });
    } else if (networkError) {
      console.warn(`[Network error]: ${networkError}`);
    }
  });

const getApolloClient = (apiEndpoint: string): ApolloClient<Record<string, unknown>> | null => {
  if (apiEndpoint) {
    const errorLink = getErrorLink();
    const apolloLinks = ApolloLink.from([errorLink, createHttpLink({ uri: apiEndpoint })]);

    return new ApolloClient({
      connectToDevTools: false,
      cache: new InMemoryCache(),
      link: apolloLinks,
    });
  }

  return null;
};

const apolloClientsByResourceName = Object.values(RESOURCES_LIST).reduce(
  (clients, resource) => {
    if (resource.name === APP_AUTH_RESOURCE.name) {
      return clients;
    }

    return {
      ...clients,
      [resource.name]: getApolloClient(resource.endpoint),
    };
  },
  {},
);

export const useResourceClient = (
  resourceName?: string,
): ApolloClient<Record<string, unknown>> | undefined => {
  const authApolloClient = useApolloClient() as ApolloClient<Record<string, unknown>>;

  if (!resourceName || resourceName === APP_AUTH_RESOURCE.name) {
    return authApolloClient;
  }

  return apolloClientsByResourceName[resourceName];
};
