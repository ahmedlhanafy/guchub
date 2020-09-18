/* @flow */

import React from 'react';
import { View, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { NativeRouter as Router, Route } from 'react-router-native';
import bugsnag from 'bugsnag-js';
import createPlugin from 'bugsnag-react';
// import mixpanel from 'mixpanel-browser';
import {
  About,
  Attendance,
  Home,
  Login,
  Schedule,
  Settings,
  Transcript,
  WhyGUCHub,
} from './screens';
import { DemoUserToast, PrivateRoute } from './components';
import { setupApollo } from './utils';
import { themes } from './constants';

// Move these to setup file
if (process.env.NODE_ENV !== 'development') {
  // mixpanel.init(process.env.MIXPANEL_KEY);
}

// const bugsnagClient = bugsnag({
//   apiKey: process.env.BUGSNAG_KEY,
//   notifyReleaseStages: ['production'],
//   releaseStage: process.env.NODE_ENV,
// });
// const ErrorBoundary = bugsnagClient.use(createPlugin(React));

const App = graphql(
  gql`
    {
      theme @client {
        type
      }
      auth @client {
        token
        isDemoUser
      }
    }
  `
)(({ data: { theme, auth } }) => (
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
        <PrivateRoute exact path="/about" component={About} />
        <Route exact path="/why-guchub" component={WhyGUCHub} />
        <DemoUserToast isDemoUser={auth.isDemoUser} />
      </View>
    </Router>
  </ThemeProvider>
));

export default class extends React.Component<null, { client: ?Object }> {
  state = { client: null };
  async componentDidMount() {
    // mixpanel.track('App was opened');
    this.setState({ client: await setupApollo() });
  }
  render() {
    const client = this.state.client;
    return (
      // <ErrorBoundary>
      <View style={{ flex: 1, height: '100vh' }}>
        {client !== null ? (
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        ) : null}
      </View>
      // </ErrorBoundary>
    );
  }
}
