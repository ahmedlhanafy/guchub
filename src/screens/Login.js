/* @flow */

import React from 'react';
import { View, Platform } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import styled, { withTheme } from 'styled-components/native';

import { Screen, Waves, Button } from '../components';

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

const Login = ({ theme }) => (
  <Screen style={{ alignItems: 'center', paddingTop: 80, overflow: 'hidden' }}>
    <Logo source={require('../assets/logo.png')} />
    <View style={{ minWidth: 300 }}>
      <TextInput label="Username" />
      <TextInput label="Password" containerStyle={{ marginBottom: 20 }} secureTextEntry />
      <Button>Login</Button>
    </View>
    <Waves />
  </Screen>
);

export default withTheme(Login);
