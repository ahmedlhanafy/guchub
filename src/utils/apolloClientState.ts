import { InMemoryCache, makeVar } from '@apollo/client';
import gql from 'graphql-tag';

import { getCredentials, getSettings } from './cache';

// Create reactive variables for local state
export const themeVar = makeVar<{ __typename: string; type: 'dark' | 'light' | 'automatic' }>({
  __typename: 'Theme',
  type: 'light',
});

export const authVar = makeVar<{ __typename: string; token?: string | null; isDemoUser?: boolean }>(
  {
    __typename: 'Auth',
    token: null,
    isDemoUser: false,
  }
);

export default async (cache: InMemoryCache) => {
  const [credentials, settings] = await Promise.all([getCredentials(), getSettings()]);

  // Initialize reactive variables with stored data
  themeVar({
    __typename: 'Theme',
    type: (settings.theme as 'dark' | 'light' | 'automatic') || 'light',
  });

  authVar({
    __typename: 'Auth',
    ...credentials,
  });

  // Define local resolvers
  const typeDefs = `
    type Theme {
      type: String!
    }
    
    type Auth {
      token: String
      isDemoUser: Boolean
    }
    
    type Query {
      theme: Theme!
      auth: Auth!
    }
  `;

  // Add field policies for local state
  cache.writeQuery({
    query: gql`
      query GetLocalState {
        theme @client {
          type
        }
        auth @client {
          token
          isDemoUser
        }
      }
    `,
    data: {
      theme: themeVar(),
      auth: authVar(),
    },
  });

  return {
    typeDefs,
    resolvers: {
      Query: {
        theme: () => themeVar(),
        auth: () => authVar(),
      },
      Mutation: {
        changeTheme: (_: any, { type }: { type: 'dark' | 'light' | 'automatic' }) => {
          themeVar({
            __typename: 'Theme',
            type,
          });
          return themeVar();
        },
        saveToken: (
          _: any,
          { token, isDemoUser = false }: { token: string | undefined | null; isDemoUser?: boolean }
        ) => {
          authVar({
            __typename: 'Auth',
            token,
            isDemoUser,
          });
          return authVar();
        },
      },
    },
  };
};
