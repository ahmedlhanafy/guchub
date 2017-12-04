/* @flow */

import React from 'react';
import { StyleSheet, StatusBar, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import Header from './Components/Header';
import Classes from './Containers/Classes';
import Actions from './Containers/Actions';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://guc-api.herokuapp.com/graphql',
    credentials: 'include',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }),
  cache: new InMemoryCache(),
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <LinearGradient
          start={{ x: 0.2, y: 0.2 }}
          end={{ x: 1, y: 1 }}
          colors={['rgba(200,200,200,0.2)', 'transparent']}
          style={styles.container}
        >
          <StatusBar barStyle="light-content" />
          <ScrollView>
            <Header
              title="Ahmed Elhanafy"
              position="Engineering Student"
              profilePicUrl="https://randomuser.me/api/portraits/men/27.jpg"
            >
              <Header.NotificationsBtn />
            </Header>
            <Classes />
            <Actions />
          </ScrollView>
        </LinearGradient>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#032E46',
  },
});
