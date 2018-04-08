export default props => ({
  fetchPolicy: 'cache-and-network',
  variables: {
    token: props.token,
  },
});
