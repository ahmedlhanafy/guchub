/* @flow */

import React from 'react';
import { View, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { NativeRouter as Router, Route, Redirect } from 'react-router-native';
import { Home, Attendance, Login, Settings, Schedule } from './screens';
import { PrivateRoute } from './components';
import apolloClient, { persistedCache } from './apolloClient';
import { themes } from './constants';

const App = graphql(
  gql`
    {
      theme @client {
        type
      }
    }
  `
)(({ data: { theme } }) => [
  <StatusBar barStyle={theme.type === 'light' ? 'dark-content' : 'light-content'} />,
  <ThemeProvider theme={themes[theme.type]}>
    <Router>
      <View style={{ flex: 1 }}>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/feed" component={Home} />
        <PrivateRoute exact path="/attendance" component={Attendance} />
        <PrivateRoute exact path="/transcript" component={Attendance} />
        <PrivateRoute exact path="/schedule" component={Schedule} />
        <PrivateRoute exact path="/settings" component={() => <Settings />} />
      </View>
    </Router>
  </ThemeProvider>,
]);

export default class extends React.Component<null, { didCacheResolve: boolean }> {
  state = { didCacheResolve: false };
  async componentDidMount() {
    await persistedCache;
    this.setState({ didCacheResolve: true });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.didCacheResolve ? (
          <ApolloProvider client={apolloClient}>
            <App />
          </ApolloProvider>
        ) : null}
      </View>
    );
  }
}
