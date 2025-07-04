import React from 'react';
import { View, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { ApolloProvider, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { NativeRouter as Router, Routes, Route } from 'react-router-native';
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

const GET_LOCAL_STATE = gql`
  {
    theme @client {
      type
    }
    auth @client {
      token
      isDemoUser
    }
  }
`;

const App = () => {
  const { data } = useQuery(GET_LOCAL_STATE);
  const theme = data?.theme;
  const auth = data?.auth || { token: null, isDemoUser: false };
  
  return (
    <ThemeProvider theme={themes[theme ? theme.type : 'automatic']}>
      <Router>
        <View style={{ flex: 1 }}>
          <StatusBar
            barStyle={(theme ? theme.type : 'light') === 'light' ? 'dark-content' : 'light-content'}
          />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/attendance" element={<PrivateRoute><Attendance /></PrivateRoute>} />
            <Route path="/transcript" element={<PrivateRoute><Transcript /></PrivateRoute>} />
            <Route path="/schedule" element={<PrivateRoute><Schedule /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
            <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
            <Route path="/why-guchub" element={<WhyGUCHub />} />
          </Routes>
          <DemoUserToast isDemoUser={auth.isDemoUser} />
        </View>
      </Router>
    </ThemeProvider>
  );
};

class AppContainer extends React.Component<
  null,
  {
    client: any | undefined | null;
  }
> {
  state = { client: null };
  async componentDidMount() {
    // mixpanel.track('App was opened');
    this.setState({ client: await setupApollo() });
  }
  render() {
    const client = this.state.client;
    const containerStyle: any = { flex: 1 };
    return (
      // <ErrorBoundary>
      <View style={containerStyle}>
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

export default AppContainer;
