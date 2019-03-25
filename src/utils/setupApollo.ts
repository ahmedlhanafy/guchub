import { AsyncStorage, Platform } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { HttpLink, InMemoryCache, ApolloLink, NormalizedCacheObject } from 'apollo-client-preset';
import { CachePersistor } from 'apollo-cache-persist';
import { generateClientStateLink, getSchemaVersion, saveSchemaVersion } from '.';
import packageJson from '../../package.json';

const currentSchemaVersion = packageJson.schema_version;

const cache = new InMemoryCache();

const persistor = new CachePersistor({
  cache,
  storage: <any>AsyncStorage,
  trigger: Platform.OS === 'web' ? 'write' : 'background',
});

export default async (): Promise<ApolloClient<NormalizedCacheObject>> => {
  const cacheSchemaVersion = (await getSchemaVersion()) || 0;
  if (currentSchemaVersion === cacheSchemaVersion) {
    await persistor.restore();
  } else {
    await persistor.purge();
    await saveSchemaVersion(currentSchemaVersion);
  }

  const clientStateLink = await generateClientStateLink(cache);

  return new ApolloClient({
    connectToDevTools: process.env.NODE_ENV === 'development',
    link: ApolloLink.from([
      <any>clientStateLink,
      new HttpLink({
        uri: 'https://graphql-guc.now.sh/graphql',
      }),
    ]),
    cache,
  });
};
