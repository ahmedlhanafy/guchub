import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import get from 'lodash.get';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Platform, Dimensions, TextInput as TextField } from 'react-native';
import { useNavigate } from 'react-router-native';
// import { TextField } from 'react-native-material-textfield';
import styled, { useTheme } from 'styled-components/native';

// import mixpanel from 'mixpanel-browser';
import { Screen, Waves, Button, Toast } from '../components';
import { saveCredentials } from '../utils';

const { width: windowWidth } = Dimensions.get('window');

const SAVE_TOKEN_MUTATION = gql`
  mutation saveToken($token: String, $isDemoUser: Boolean) {
    saveToken(token: $token, isDemoUser: $isDemoUser) @client
  }
`;

/* @FIXME: Should be done in Apollo, it's setup this way because apollo doesn't 
    provide an API for blacklisting mutations from being stored in the cache
*/
const login = async ({ username, password }: { username: string; password: string }) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const body = {
    operationName: 'login',
    variables: { username, password },
    query: `
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        isAuthorized
        token
      }
    }
  `,
  };

  const res = await fetch('https://graphql-guc.vercel.app/graphql', {
    body: JSON.stringify(body),
    method: 'POST',
    mode: 'cors',
    headers,
  });

  return await res.json();
};

const Login = () => {
  const navigate = useNavigate();
  const [saveTokenMutation] = useMutation(SAVE_TOKEN_MUTATION);

  const [state, setState] = useState({
    username: '',
    password: '',
    error: null as string | null,
    isLoading: false,
    isLoadingDemo: false,
  });

  const saveToken = ({
    token,
    isDemoUser,
  }: {
    token: string | undefined | null;
    isDemoUser?: boolean;
  }) => {
    return saveTokenMutation({ variables: { token, isDemoUser } });
  };

  useEffect(() => {
    saveToken({ token: null });
  }, []);

  const _loginAndRoute = async ({
    username,
    password,
    isDemoUser,
  }: {
    username: string;
    password: string;
    isDemoUser?: boolean;
  }) => {
    try {
      const response = await login({
        username,
        password,
      });
      const isAuthorized = get(response, 'data.login.isAuthorized');
      const token = get(response, 'data.login.token');

      if (isAuthorized) {
        // mixpanel.register({ username });
        // mixpanel.track('Logged in');
        await Promise.all([
          saveCredentials({
            token,
            isDemoUser,
          }),
          saveToken({
            token,
            isDemoUser,
          }),
        ]);
        navigate('/');
      } else {
        setState((prev) => ({
          ...prev,
          isLoadingDemo: false,
          isLoading: false,
          error: 'Wrong Credentials!',
        }));
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setState((prev) => ({
        ...prev,
        isLoadingDemo: false,
        isLoading: false,
        error: 'Internal Server Error. Try again later!',
      }));
    }
  };

  const _demoLogin = () => {
    setState((prev) => ({ ...prev, isLoadingDemo: true }));
    _loginAndRoute({ username: 'john.doe', password: '123456', isDemoUser: true });
  };

  const _login = () => {
    const { username, password } = state;
    setState((prev) => ({ ...prev, isLoading: true }));
    _loginAndRoute({ username, password });
  };

  const _handleSubmit = () => {
    _login();
  };

  const _hideToast = () => setState((prev) => ({ ...prev, error: null }));

  const { username, password, isLoading, isLoadingDemo, error } = state;

  return (
    <View style={{ flex: 1 }}>
      <Screen>
        <Screen.Content style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <Logo source={require('../assets/logo1-min.png')} />
          <Toast shown={error !== null} handleHiding={_hideToast} text={error || ''} />
          <Form onSubmit={_handleSubmit} style={{ minWidth: 300, zIndex: 10 }}>
            <StyledTextInput
              onChangeText={(text) => setState((prev) => ({ ...prev, username: text }))}
              value={username}
              label="Username"
            />
            <StyledTextInput
              onChangeText={(text) => setState((prev) => ({ ...prev, password: text }))}
              value={password}
              label="Password"
              containerStyle={{ marginBottom: 20 }}
              secureTextEntry
            />
            <Button
              submit
              onPress={_handleSubmit}
              disabled={username.length === 0 || password.length === 0 || isLoading}
              loading={isLoading}>
              Login
            </Button>
            <Button
              disabled={isLoading || isLoadingDemo}
              primary
              loading={isLoadingDemo}
              onPress={_demoLogin}>
              SEE A DEMO
            </Button>
          </Form>
        </Screen.Content>
      </Screen>
      {windowWidth > 600 || Platform.OS !== 'web' ? <Waves /> : null}
    </View>
  );
};

const Form = (props) => (Platform.OS === 'web' ? <form {...props} /> : <View {...props} />);

const Logo = styled.Image`
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
`;

const StyledTextInput = (props) => {
  const theme = useTheme();
  return (
    <TextField
      tintColor="rgba(98, 205, 199, 1)"
      textColor={theme.primaryTextColor}
      baseColor={theme.secondaryTextColor}
      style={{ ...Platform.select({ web: { outline: 'none' } }) }}
      {...props}
    />
  );
};

// Add displayName for React DevTools
Login.displayName = 'Login';

export default Login;
