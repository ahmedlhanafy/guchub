/* @flow */

import React from 'react';
import { StyleSheet, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo';
import gql from 'graphql-tag';
import graphql from 'react-apollo/graphql';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import Header from './components/Header';
import Classes from './containers/Classes';
import Actions from './containers/Actions';
import { SequenceAnimator } from './components';

const query = gql`
  {
    student(username: "ahmed.elhanafy", password: "Mymy12345") {
      ...Schedule
      ...ExamsSchedule
    }
  }
  ${Classes.fragments.schedule}
  ${Classes.fragments.examsSchedule}
`;

const Main = graphql(query)(({ data: { loading, student } }) => (
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
        profilePicUrl="https://randomuser.me/api/portraits/men/10.jpg">
        <Header.NotificationsBtn />
      </Header>
      {loading && <ActivityIndicator />}
      {student && (
        <SequenceAnimator animationDelay={900}>
          <Classes data={student.schedule} title="Today Classes" />
          <Classes data={student.examsSchedule} title="Exams Schedule" />
          <Actions />
        </SequenceAnimator>
      )}
    </ScrollView>
  </LinearGradient>
));

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

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Main />
      </ApolloProvider>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
