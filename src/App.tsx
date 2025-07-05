import { ApolloProvider, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState, useEffect } from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { NativeRouter as Router, Routes, Route } from 'react-router-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';

// import mixpanel from 'mixpanel-browser';
import { DemoUserToast, PrivateRoute } from './components';
import { themes } from './constants';
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
import { setupApollo } from './utils';

// Import global CSS for web
if (Platform.OS === 'web') {
  require('../global.css');
}

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
    <SafeAreaProvider>
      <ThemeProvider theme={themes[theme ? theme.type : 'automatic']}>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <View style={{ flex: 1 }}>
            <StatusBar
              barStyle={(theme ? theme.type : 'light') === 'light' ? 'dark-content' : 'light-content'}
            />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/attendance"
                element={
                  <PrivateRoute>
                    <Attendance />
                  </PrivateRoute>
                }
              />
              <Route
                path="/transcript"
                element={
                  <PrivateRoute>
                    <Transcript />
                  </PrivateRoute>
                }
              />
              <Route
                path="/schedule"
                element={
                  <PrivateRoute>
                    <Schedule />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <PrivateRoute>
                    <About />
                  </PrivateRoute>
                }
              />
              <Route path="/why-guchub" element={<WhyGUCHub />} />
            </Routes>
            <DemoUserToast isDemoUser={auth.isDemoUser} />
          </View>
        </Router>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

// Add displayName for React DevTools
App.displayName = 'App';

const AppContainer = () => {
  const [client, setClient] = useState<any | null>(null);

  useEffect(() => {
    const initializeApollo = async () => {
      // mixpanel.track('App was opened');
      const apolloClient = await setupApollo();
      setClient(apolloClient);
    };

    initializeApollo();
  }, []);

  return (
    // <ErrorBoundary>
    <View style={{ flex: 1 }}>
      {client !== null ? (
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      ) : null}
    </View>
    // </ErrorBoundary>
  );
};

// Add displayName for React DevTools
AppContainer.displayName = 'AppContainer';

export default AppContainer;
