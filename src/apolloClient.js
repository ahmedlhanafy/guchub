/* @flow */

import { AsyncStorage, Platform } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { HttpLink, InMemoryCache, ApolloLink } from 'apollo-client-preset';
import { persistCache } from 'apollo-cache-persist';
import { withClientState } from 'apollo-link-state';

const cache = new InMemoryCache();

export const persistedCache = persistCache({
  cache,
  storage: AsyncStorage,
  trigger: Platform.OS === 'web' ? 'write' : 'background',
});

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      changeTheme: (_, { type }: { type: 'dark' | 'light' | 'automatic' }, { cache }) => {
        const data = {
          theme: {
            __typename: 'Theme',
            type,
          },
        };
        cache.writeData({ data });
        return null;
      },
      saveCredentials: (_, { username, password, isAuthorized }, { cache }) => {
        const data = {
          credentials: {
            __typename: 'Credentials',
            username,
            password,
            isAuthorized,
          },
        };
        cache.writeData({ data });
        return null;
      },
    },
  },
  defaults: {
    theme: {
      __typename: 'Theme',
      type: 'automatic',
    },
    credentials: {
      __typename: 'Credentials',
      username: null,
      password: null,
      isAuthorized: false,
    },
  },
});

export default new ApolloClient({
  connectToDevTools: process.env.NODE_ENV === 'development',
  link: ApolloLink.from([
    stateLink,
    new HttpLink({
      uri: 'https://graphql-guc.now.sh/graphql',
    }),
  ]),
  cache,
});
