import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import get from 'lodash.get';
import React from 'react';
import { Navigate } from 'react-router-native';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const QUERY = gql`
  {
    auth @client {
      token
    }
  }
`;

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { data } = useQuery(QUERY);
  const token = get(data, 'auth.token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
