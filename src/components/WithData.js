/* @flow */

import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Redirect } from 'react-router-native';
import get from 'lodash.get';

type Props = {|
  data: any,
  render: any => any,
  selector: any => any,
|};

const WithData = ({ data, render, selector = data => data }: Props) => {
  //@TODO: Implement more generic checks
  if (data.loading && get(data, 'student.schedule') === null)
    return <ActivityIndicator color="rgba(98, 205, 199, 1)" size="large" />;
  if (!get(data, 'student.isAuthorized') && get(data, 'student.schedule') === null) {
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  }
  //@TODO: Safely invoke the selector
  if (selector(data)) return render(selector(data));
  return null;
};

export default WithData;
