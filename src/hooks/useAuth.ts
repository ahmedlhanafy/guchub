import * as React from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { saveCredentials, login } from '../utils';

const SAVE_TOKEN_MUTATION = gql`
  mutation saveToken($token: String, $isDemoUser: Boolean) {
    saveToken(token: $token, isDemoUser: $isDemoUser) @client
  }
`;

export default (
  cb: () => void
): {
  login: () => void;
  demoLogin: () => void;
  username: string;
  password: string;
  setUsername: (val: string) => void;
  setPassword: (val: string) => void;
  isLoading: boolean;
  isLoadingDemo: boolean;
  error: string | null;
  removeError: () => void;
} => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoadingDemo, setIsLoadingDemo] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const saveToken = useMutation(SAVE_TOKEN_MUTATION);

  React.useEffect(() => {
    saveToken({ variables: { token: null } });
    saveCredentials({
      token: null,
    });
  }, []);

  const doLogin = React.useCallback(
    params =>
      login(
        params,
        async ({ token, isDemoUser }: { token: string; isDemoUser: boolean }) => {
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
          cb();
        },
        (errorMsg: string) => {
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

  const handleRemoveError = React.useCallback(() => setError(null), []);

  return {
    login: handleLogin,
    demoLogin,
    username,
    password,
    setUsername,
    setPassword,
    isLoading,
    isLoadingDemo,
    error,
    removeError: handleRemoveError,
  };
};
