import get from 'lodash.get';

type Params = {
  username: string,
  password: string,
  isDemoUser?: boolean,
};

export const login = async (
  { username, password, isDemoUser }: Params,
  success: () => void,
  failure: string => void
) => {
  try {
    const response = await doLogin({
      username,
      password,
    });
    const isAuthorized = get(response, 'data.login.isAuthorized');
    const token = get(response, 'data.login.token');

    if (isAuthorized) {
      success({ token, isDemoUser });
    } else {
      failure('Wrong Credentials!');
    }
  } catch (e) {
    failure('Internal Server Error. Try again later!');
  }
};

/* @FIXME: Should be done in Apollo, it's setup this way because apollo doesn't 
    provide an API for blacklisting mutations from being stored in the cache
*/
const doLogin = async ({ username, password }: { username: string, password: string }) => {
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
