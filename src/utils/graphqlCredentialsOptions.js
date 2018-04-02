import get from 'lodash.get';

export default props => ({
  fetchPolicy: 'cache-and-network',
  variables: {
    username: get(props, 'credentials.username'),
    password: get(props, 'credentials.password'),
  },
});
