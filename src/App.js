/* @flow */

import React from 'react';
import { StyleSheet, StatusBar, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import Header from './components/Header';
import Classes from './containers/Classes';
import Actions from './containers/Actions';

const client = new ApolloClient({
  connectToDevTools: process.env.NODE_ENV === 'development',
  link: new HttpLink({
    fetchOptions: {
      // mode: 'no-cors',
    },
    uri: 'https://guc-api.herokuapp.com/graphql',
  }),
  cache: new InMemoryCache(),
});

export default class Home extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <LinearGradient
          start={{ x: 0.2, y: 0.2 }}
          end={{ x: 1, y: 1 }}
          colors={['rgba(200,200,200,0.3)', 'transparent']}
          style={styles.container}>
          <StatusBar barStyle="light-content" />
          <ScrollView>
            <Header
              title="Abdelrahman Maged"
              position="Engineering Student"
              profilePicUrl="https://randomuser.me/api/portraits/men/27.jpg">
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
    backgroundColor: 'black',
  },
});
