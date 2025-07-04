import get from 'lodash.get';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Navigate } from 'react-router-native';

type Props = {
  data: any;
  render: (a: any) => any;
  selector: string;
  showLoadingIf?: (a: any) => boolean;
};

const WithData = ({
  data,
  render,
  selector = 'authenticatedStudent.schedule',
  showLoadingIf = () => true,
}: Props) => {
  // Add null check for data
  if (!data) {
    return <ActivityIndicator color="rgba(98, 205, 199, 1)" size="large" />;
  }

  const selectedData = get(data, selector);
  if (data.loading && showLoadingIf(data))
    return <ActivityIndicator color="rgba(98, 205, 199, 1)" size="large" />;
  if (!get(data, 'authenticatedStudent.isAuthorized')) {
    return <Navigate to="/login" replace />;
  }
  //@TODO: Safely invoke the selector
  if (selectedData) return render(selectedData);
  return null;
};

export default WithData;
