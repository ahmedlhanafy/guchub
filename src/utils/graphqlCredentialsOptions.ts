interface Props {
  token: string;
}

interface GraphQLOptions {
  fetchPolicy: 'cache-and-network';
  variables: {
    token: string;
  };
}

export default (props: Props): GraphQLOptions => ({
  fetchPolicy: 'cache-and-network',
  variables: {
    token: props.token,
  },
});
