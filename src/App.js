/* @flow */

import React, { Component } from 'react';
import { AsyncStorage, Platform } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import { persistCache } from 'apollo-cache-persist';
import { Home } from './screens';

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: AsyncStorage,
  trigger: Platform.OS === 'web' ? 'write' : 'background',
});

const client = new ApolloClient({
  connectToDevTools: process.env.NODE_ENV === 'development',
  link: new HttpLink({
    uri: 'https://graphql-guc.now.sh/graphql',
  }),
  cache,
});
export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    );
  }
}
