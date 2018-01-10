/* @flow */

import React, { Component } from 'react';
import { AsyncStorage, Platform } from 'react-native';
import { ThemeProvider } from 'styled-components';
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

const darkTheme = {
  type: 'dark',
  primaryColor: 'blue',
  secondaryColor: 'blue',
  backgroundColor: '#3B4149',
  primaryTextColor: 'white',
  secondaryTextColor: 'rgba(255, 255, 255, 0.6)',
  sectionTitleColor: 'rgba(255,255,255,0.8)',
  cardBackgroundColor: '#767A80',
};

const lightTheme = {
  type: 'light',
  primaryColor: 'blue',
  secondaryColor: 'blue',
  backgroundColor: 'white',
  primaryTextColor: 'black',
  secondaryTextColor: 'rgba(0, 0, 0, 0.6)',
  sectionTitleColor: 'rgba(0,0,0,0.8)',
  cardBackgroundColor: 'white',
};

export default class App extends Component {
  state = { theme: darkTheme };
  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <ApolloProvider client={client}>
          <Home
            toggleTheme={() =>
              this.setState({ theme: this.state.theme == lightTheme ? darkTheme : lightTheme })
            }
          />
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}
