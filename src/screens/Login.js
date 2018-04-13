/* @flow */

import React from 'react';
import { View, Platform, Dimensions } from 'react-native';
import { withApollo, compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash.get';
import { TextField } from 'react-native-material-textfield';
import styled, { withTheme } from 'styled-components/native';

import { Screen, Waves, Button, Toast } from '../components';

const { width: windowWidth } = Dimensions.get('window');

type Props = {
  client: Object,
  saveToken: ({ token: ?string }) => void,
  login: ({ username: string, password: string }) => void,
  history: Object,
};

type State = {
  username: string,
  password: string,
  errorExists: boolean,
  isLoading: boolean,
  isLoadingDemo: boolean,
};

class Login extends React.PureComponent<Props, State> {
  state = {
    username: '',
    password: '',
    errorExists: false,
    isLoading: false,
    isLoadingDemo: false,
  };

  componentDidMount() {
    this.props.saveToken({ token: null });
  }

  _loginAndRoute = async ({
    username,
    password,
    isDemoUser,
  }: {
    username: string,
    password: string,
    isDemoUser?: boolean,
  }) => {
    const response = await login({
      username,
      password,
    });
    const isAuthorized = get(response, 'data.login.isAuthorized');
    const token = get(response, 'data.login.token');

    if (isAuthorized) {
      this.props.saveToken({
        token,
        isDemoUser,
      });
      // Give Apollo's store a moment to update
      setTimeout(() => this.props.history.push('/'), 200);
    } else {
      this.setState({ isLoadingDemo: false, isLoading: false, errorExists: true });
    }
  };

  _demoLogin = () => {
    this.setState({ isLoadingDemo: true });
    this._loginAndRoute({ username: 'john.doe', password: '123456', isDemoUser: true });
  };

  _login = () => {
    const { username, password } = this.state;
    this.setState({ isLoading: true });
    this._loginAndRoute({ username, password });
  };

  _handleSubmit = e => {
    e.preventDefault();
    this._login();
  };

  _hideToast = () => this.setState({ errorExists: false });

  render() {
    const { username, password, isLoading, isLoadingDemo, errorExists } = this.state;

    return (
      <View style={{ overflow: 'hidden', flex: 1 }}>
        <Screen style={{ height: '100%', paddingTop: 40 }}>
          <Screen.Content style={{ alignItems: 'center', flex: 1 }}>
            <Logo source={require('../assets/logo1-min.png')} />
            <Toast shown={errorExists} handleHiding={this._hideToast} text="Wrong Credentials!" />
            <Form onSubmit={this._handleSubmit} style={{ minWidth: 300, zIndex: 10 }}>
              <TextInput
                onChangeText={text => this.setState({ username: text })}
                value={username}
                label="Username"
              />
              <TextInput
                onChangeText={text => this.setState({ password: text })}
                value={password}
                label="Password"
                containerStyle={{ marginBottom: 20 }}
                secureTextEntry
              />
              <Button
                submit
                onPress={this._handleSubmit}
                disabled={username.length === 0 || password.length === 0 || isLoading}
                loading={isLoading}>
                Login
              </Button>
              <Button
                disabled={isLoading || isLoadingDemo}
                primary
                loading={isLoadingDemo}
                onPress={this._demoLogin}>
                SEE A DEMO
              </Button>
            </Form>
          </Screen.Content>
        </Screen>
        {windowWidth > 600 || Platform.OS !== 'web' ? <Waves /> : null}
      </View>
    );
  }
}

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

const SAVE_TOKEN_MUTATION = gql`
  mutation saveToken($token: String, $isDemoUser: Boolean) {
    saveToken(token: $token, isDemoUser: $isDemoUser) @client
  }
`;

/* @FIXME: Should be done in Apollo, it's setup this way because apollo doesn't 
    provide an API for blacklisting mutations from being stored in the cache
*/
const login = async ({ username, password }: { username: string, password: string }) => {
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

  const res = await fetch('https://graphql-guc.now.sh/graphql', {
    body: JSON.stringify(body),
    method: 'POST',
    mode: 'cors',
    headers,
  });

  return await res.json();
};

export default compose(
  withTheme,
  withApollo,
  graphql(SAVE_TOKEN_MUTATION, {
    props: ({ mutate, ownProps: { client } }) => ({
      saveToken: ({ token, isDemoUser }) => mutate({ variables: { token, isDemoUser } }),
      resetStore: async () => client.resetStore(),
    }),
  })
)(Login);
