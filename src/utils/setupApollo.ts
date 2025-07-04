import { Platform } from 'react-native';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { CachePersistor } from 'apollo-cache-persist';
import generateClientState, { themeVar, authVar } from './apolloClientState';
import { getSchemaVersion, saveSchemaVersion } from './cache';

const currentSchemaVersion = '1.0';

export default async () => {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          theme: {
            read() {
              return themeVar();
            }
          },
          auth: {
            read() {
              return authVar();
            }
          }
        }
      }
    }
  });

  const persistor = new CachePersistor({
    cache,
    storage: Platform.OS === 'web' ? localStorage : require('@react-native-async-storage/async-storage').default,
    trigger: Platform.OS === 'web' ? 'write' : 'background',
  });

  const cacheSchemaVersion = (await getSchemaVersion()) || 0;
  if (currentSchemaVersion === cacheSchemaVersion) {
    await persistor.restore();
  } else {
    await persistor.purge();
    await saveSchemaVersion(currentSchemaVersion);
  }

  // Initialize client state
  const { typeDefs, resolvers } = await generateClientState(cache);

  return new ApolloClient({
    connectToDevTools: process.env.NODE_ENV === 'development',
    link: new HttpLink({
      uri: 'https://graphql-guc.now.sh/graphql',
    }),
    cache,
    typeDefs,
    resolvers,
  });
};
