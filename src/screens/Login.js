/* @flow */

import React from 'react';
import { View, Platform, Dimensions } from 'react-native';
import gql from 'graphql-tag';
import { TextField } from 'react-native-material-textfield';
import styled, { withTheme } from 'styled-components/native';
import { useMutation } from 'react-apollo-hooks';
import ApolloClient from 'apollo-client';
import { Screen, Waves, Button, Toast } from '../components';
import { saveCredentials, login } from '../utils';

const { width: windowWidth } = Dimensions.get('window');

const SAVE_TOKEN_MUTATION = gql`
  mutation saveToken($token: String, $isDemoUser: Boolean) {
    saveToken(token: $token, isDemoUser: $isDemoUser) @client
  }
`;

const Login = ({ client, history }: { client: ApolloClient }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoadingDemo, setIsLoadingDemo] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const saveToken = useMutation(SAVE_TOKEN_MUTATION);

  React.useEffect(() => {
    saveToken({ variables: { token: null } });
    saveCredentials({
      token: null,
    });
  }, []);

  const doLogin = React.useCallback(
    async params =>
      login(
        params,
        async ({ token, isDemoUser }) => {
          await Promise.all([
            saveCredentials({
              token,
              isDemoUser,
            }),
            saveToken({
              variables: {
                token,
                isDemoUser,
              },
            }),
          ]);
          history.push('/');
        },
        errorMsg => {
          setIsLoading(false);
          setIsLoadingDemo(false);
          setError(errorMsg);
        }
      ),
    []
  );

  const demoLogin = React.useCallback(() => {
    setIsLoadingDemo(true);
    doLogin({ username: 'john.doe', password: '123456', isDemoUser: true });
  }, []);

  const handleLogin = React.useCallback(
    () => {
      setIsLoading(true);
      doLogin({ username, password });
    },
    [username, password]
  );

  const handleSubmit = React.useCallback(e => {
    e.preventDefault();
    handleLogin();
  }, []);

  const hideToast = React.useCallback(() => setError(null), []);

  return (
    <View style={{ overflow: 'hidden', flex: 1 }}>
      <Screen style={{ height: '100%', paddingTop: 40 }}>
        <Screen.Content style={{ alignItems: 'center', flex: 1 }}>
          <Logo source={require('../assets/logo1-min.png')} />
          <Toast shown={error !== null} handleHiding={hideToast} text={error || ''} />
          <Form onSubmit={handleSubmit} style={{ minWidth: 300, zIndex: 10 }}>
            <TextInput onChangeText={setUsername} value={username} label="Username" />
            <TextInput
              onChangeText={setPassword}
              value={password}
              label="Password"
              containerStyle={{ marginBottom: 20 }}
              secureTextEntry
            />
            <Button
              submit
              onPress={handleSubmit}
              disabled={username.length === 0 || password.length === 0 || isLoading}
              loading={isLoading}>
              Login
            </Button>
            <Button
              disabled={isLoading || isLoadingDemo}
              primary
              loading={isLoadingDemo}
              onPress={demoLogin}>
              SEE A DEMO
            </Button>
          </Form>
        </Screen.Content>
      </Screen>
      {windowWidth > 600 || Platform.OS !== 'web' ? <Waves /> : null}
    </View>
  );
};

const Form = props => (Platform.OS === 'web' ? <form {...props} /> : <View {...props} />);

const Logo = styled.Image`
  width: 120;
  height: 120;
  margin-bottom: 20;
`;

const TextInput = withTheme(props => (
  <TextField
    tintColor="rgba(98, 205, 199, 1)"
    textColor={props.theme.primaryTextColor}
    baseColor={props.theme.secondaryTextColor}
    style={{ ...Platform.select({ web: { outline: 'none' } }) }}
    {...props}
  />
));

export default Login;
