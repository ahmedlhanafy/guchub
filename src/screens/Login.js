/* @flow */

import React, { Fragment } from 'react';
import { View, Platform, Dimensions } from 'react-native';
import { withApollo, compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TextField } from 'react-native-material-textfield';
import styled, { withTheme } from 'styled-components/native';

import { Screen, Waves, Button, Toast } from '../components';
import { FEED_QUERY } from '../constants';

const { width: windowWidth } = Dimensions.get('window');

type Props = {
  client: Object,
  saveCredentials: ({ username: ?string, password: ?string, isAuthorized: boolean }) => void,
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
    this.props.saveCredentials({ username: null, password: null, isAuthorized: false });
  }

  _loginAndRoute = async ({ username, password }) => {
    const { data } = await this.props.client.query({
      query: FEED_QUERY,
      variables: { username, password },
    });
    if (data.student.isAuthorized) {
      this.props.saveCredentials({
        username,
        password,
        isAuthorized: true,
      });
      // Give Apollo's store a moment to update
      setTimeout(() => this.props.history.push('/'), 200);
    } else {
      this.setState({ isLoadingDemo: false, isLoading: false, errorExists: true });
    }
  };

  _demoLogin = () => {
    this.setState({ isLoadingDemo: true });
    this._loginAndRoute({ username: 'john.doe', password: '123456' });
  };

  _login = () => {
    const { username, password } = this.state;
    this.setState({ isLoading: true });
    this._loginAndRoute({ username, password });
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
            <View style={{ minWidth: 300, zIndex: 10 }}>
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
                disabled={username.length === 0 || password.length === 0 || isLoading}
                loading={isLoading}
                onPress={this._login}>
                Login
              </Button>
              <Button
                disabled={isLoading || isLoadingDemo}
                primary
                loading={isLoadingDemo}
                onPress={this._demoLogin}>
                SEE A DEMO
              </Button>
            </View>
          </Screen.Content>
        </Screen>
        {windowWidth > 600 || Platform.OS !== 'web' ? <Waves /> : null}
      </View>
    );
  }
}

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

const SAVE_CREDENTIALS = gql`
  mutation saveCredentials($username: String, $password: String, $isAuthorized: Boolean) {
    saveCredentials(username: $username, password: $password, isAuthorized: $isAuthorized) @client
  }
`;

export default compose(
  withTheme,
  withApollo,
  graphql(SAVE_CREDENTIALS, {
    props: ({ mutate, ownProps: { client } }) => ({
      saveCredentials: ({ username, password, isAuthorized }) =>
        mutate({ variables: { username, password, isAuthorized } }),
      resetStore: async () => client.resetStore(),
    }),
  })
)(Login);
