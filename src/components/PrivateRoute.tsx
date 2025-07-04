import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import gql from 'graphql-tag';
import { Navigate } from 'react-router-native';
import get from 'lodash.get';

interface PrivateRouteProps {
  data: any;
  children: React.ReactNode;
}

const PrivateRouteComponent = ({ data, children }: PrivateRouteProps) => {
  const token = get(data, 'auth.token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Pass token to children if they are React elements
  if (React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, { token });
  }
  
  return <>{children}</>;
};

const QUERY = gql`
  {
    auth @client {
      token
    }
  }
`;

// Properly type the HOC-wrapped component
const PrivateRoute = graphql(QUERY)(PrivateRouteComponent) as React.ComponentType<{ children: React.ReactNode }>;

export default PrivateRoute;
