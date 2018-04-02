/* @flow */

import React from 'react';
import { View, Platform } from 'react-native';
import { withApollo, compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TextField } from 'react-native-material-textfield';
import styled, { withTheme } from 'styled-components/native';

import { Screen, Waves, Button, Toast } from '../components';
import { FEED_QUERY } from '../constants';

type Props = {
  client: Object,
  saveCredentials: ({ username: string, password: string }) => void,
  history: Object,
};

type State = {
  username: string,
  password: string,
  errorExists: boolean,
  isLoading: boolean,
};

class Login extends React.PureComponent<Props, State> {
  state = { username: '', password: '', errorExists: false, isLoading: false };

  _login = async () => {
    this.setState({ isLoading: true });
    const { username, password } = this.state;
    const { data } = await this.props.client.query({
      query: FEED_QUERY,
      variables: { username, password },
    });
    if (data.student.isAuthorized) {
      this.props.saveCredentials({ username, password });
      // Give Apollo's store a moment to update
      setTimeout(() => this.props.history.push('/'), 100);
    } else {
      this.setState({ isLoading: false, errorExists: true });
    }
  };

  _hideToast = () => this.setState({ errorExists: false });

  render() {
    const { username, password, isLoading, errorExists } = this.state;

    return (
      <Screen
        scrollable={false}
        style={{ alignItems: 'center', paddingTop: 40, overflow: 'hidden' }}>
        <Screen.Content style={{ alignItems: 'center', flex: 1 }}>
          <Logo source={require('../assets/logo.png')} />
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
          </View>
          <Waves />
        </Screen.Content>
      </Screen>
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
  mutation saveCredentials($username: String, $password: String) {
    saveCredentials(username: $username, password: $password) @client
  }
`;

export default compose(
  withTheme,
  withApollo,
  graphql(SAVE_CREDENTIALS, {
    props: ({ mutate }) => ({
      saveCredentials: ({ username, password }) => mutate({ variables: { username, password } }),
    }),
  })
)(Login);
