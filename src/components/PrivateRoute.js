import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Route, Redirect } from 'react-router-native';
import get from 'lodash.get';

const PrivateRoute = ({ data, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      get(data, 'auth.token') ? (
        <Component token={get(data, 'auth.token')} {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const QUERY = gql`
  {
    auth @client {
      token
    }
  }
`;

export default graphql(QUERY)(PrivateRoute);
