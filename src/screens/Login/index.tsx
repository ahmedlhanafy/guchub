import React from 'react';
import { View, Platform, Dimensions } from 'react-native';
import { History } from 'history';
import { Screen, Waves, Button, Toast } from '../../components';
import { Logo, Form, TextInput } from './atoms';
import { useAuth } from '../../hooks';

const { width: windowWidth } = Dimensions.get('window');

const Login = ({ history }: { history: History }) => {
  const handleSuccessfulLogin = React.useCallback(() => {
    history.push('/');
  }, []);

  const {
    demoLogin,
    error,
    isLoading,
    isLoadingDemo,
    login,
    password,
    removeError,
    setPassword,
    setUsername,
    username,
  } = useAuth(handleSuccessfulLogin);

  return (
    <View style={{ overflow: 'hidden', flex: 1 }}>
      <Screen style={{ height: '100%', paddingTop: 40 }}>
        <Screen.Content style={{ alignItems: 'center', flex: 1 }}>
          <Logo source={require('../../assets/logo1-min.png')} />
          <Toast shown={error !== null} handleHiding={removeError} text={error || ''} />
          <Form onSubmit={login} style={{ minWidth: 300, zIndex: 10 }}>
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
              onPress={login}
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

export default Login;
