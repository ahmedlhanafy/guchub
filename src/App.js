/* @flow */

import React from 'react';
import { View, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { NativeRouter as Router, Route } from 'react-router-native';
import { Home, Attendance, Login, Settings, Schedule, Transcript } from './screens';
import { DemoUserToast, PrivateRoute } from './components';
import apolloClient, { persistedCache } from './apolloClient';
import { themes } from './constants';

const App = graphql(
  gql`
    {
      theme @client {
        type
      }
      credentials @client {
        username
      }
    }
  `
)(({ data: { theme, credentials } }) => (
  <ThemeProvider theme={themes[theme ? theme.type : 'automatic']}>
    <Router>
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle={(theme ? theme.type : 'light') === 'light' ? 'dark-content' : 'light-content'}
        />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/attendance" component={Attendance} />
        <PrivateRoute exact path="/transcript" component={Transcript} />
        <PrivateRoute exact path="/schedule" component={Schedule} />
        <PrivateRoute exact path="/settings" component={Settings} />
        <DemoUserToast credentials={credentials} />
      </View>
    </Router>
  </ThemeProvider>
));

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
