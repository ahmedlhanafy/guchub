import React from 'react';
import { View, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider, useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { NativeRouter as Router, Route } from 'react-router-native';
import bugsnag from 'bugsnag-js';
import createPlugin from 'bugsnag-react';
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
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-client-preset';
import { Theme } from './constants/themes';

const bugsnagClient = bugsnag({
  apiKey: process.env.BUGSNAG_KEY as string,
  notifyReleaseStages: ['production'],
  releaseStage: process.env.NODE_ENV,
});

const ErrorBoundary = bugsnagClient.use(createPlugin(React));

const APP_QUERY = gql`
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

type Query = {
  data: {
    theme: Theme;
    auth: {
      token: string;
      isDemoUser: boolean;
    };
  };
};

const App = () => {
  const { data: { theme, auth } } = useQuery(APP_QUERY) as Query;

  return (
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
  );
};

export default () => {
  const [client, setClient] = React.useState<ApolloClient<NormalizedCacheObject>>();

  React.useEffect(() => {
    setupApollo().then(instance => {
      setClient(instance);
    });
  }, []);

  return (
    <ErrorBoundary>
      <View style={{ flex: 1, height: '100vh' }}>
        {client !== undefined ? (
          <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
              <App />
            </ApolloHooksProvider>
          </ApolloProvider>
        ) : null}
      </View>
    </ErrorBoundary>
  );
};
