 

import { withClientState } from 'apollo-link-state';
import type { ApolloCache } from 'apollo-cache';
import { getCredentials, getSettings } from './cache';

export default async (cache: ApolloCache) => {
  const [credentials, settings] = await Promise.all([getCredentials(), getSettings()]);
  return withClientState({
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
        saveToken: (
          _,
          { token, isDemoUser = false }: { token: ?string, isDemoUser?: boolean },
          { cache }
        ) => {
          const data = {
            auth: {
              __typename: 'Auth',
              token,
              isDemoUser,
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
        type: settings.theme,
      },
      auth: {
        __typename: 'Auth',
        ...credentials,
      },
    },
  });
};
