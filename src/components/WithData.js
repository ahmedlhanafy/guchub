/* @flow */

import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Redirect } from 'react-router-native';
import get from 'lodash.get';

type Props = {|
  data: any,
  render: any => any,
  selector: string,
  showLoadingIf?: Object => boolean,
|};

const WithData = ({
  data,
  render,
  selector = 'student.schedule',
  showLoadingIf = () => true,
}: Props) => {
  const selectedData = get(data, selector);
  if (data.loading && showLoadingIf(data))
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
