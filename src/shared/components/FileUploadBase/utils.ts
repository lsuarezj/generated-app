import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

export const getServerUrl = (): string => process.env.REACT_APP_SERVER_URL || '';

export const APP_URL = {
  root: '/',
  public: {
    auth: {
      root: '/auth',
      callback: '/auth/callback',
    },
  },
  workspace: {
    root: '/workspace/:workspaceID',
    dashboard: '/workspace/:workspaceID/dashboard',
    preview: '/workspace/:workspaceID/preview',
  },
};

export const getApolloClient = (
  workspaceId: string,
  token: string,
): ApolloClient<NormalizedCacheObject> => {
  const apiEndpoint = `${getServerUrl()}/${workspaceId}`;
  const httpLink = createHttpLink({ uri: apiEndpoint });

  const authLink = new ApolloLink((operation, foward) => {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });

    return foward(operation);
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

  return client;
};
