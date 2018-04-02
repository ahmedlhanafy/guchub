/* @flow */

import React from 'react';
import { ActivityIndicator } from 'react-native';

type Props = {|
  data: any,
  render: any => any,
  selector: any => any,
|};

const WithData = ({ data, render, selector = data => data }: Props) => {
  if (data.loading) return <ActivityIndicator size="large" />;
  //@TODO: Safely invoke the selector
  if (selector(data)) return render(selector(data));
  return null;
};

export default WithData;
