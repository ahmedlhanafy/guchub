/* @flow */

import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Redirect } from 'react-router-native';
import get from 'lodash.get';

type Props = {|
  data: any,
  render: any => any,
  selector: string,
|};

const WithData = ({ data, render, selector = 'student.schedule' }: Props) => {
  const selectedData = get(data, selector);
  //@TODO: Implement more generic checks with network status
  if (data.loading && selectedData === null)
    return <ActivityIndicator color="rgba(98, 205, 199, 1)" size="large" />;
  if (!get(data, 'student.isAuthorized') && selectedData === null) {
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  }
  //@TODO: Safely invoke the selector
  if (selectedData) return render(selectedData);
  return null;
};

export default WithData;
