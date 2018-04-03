/* @flow */

import React from 'react';
import { Screen } from '../components';

export default () => {
  return (
    <Screen>
      <Screen.Header title="Coming Soon" animated back />
      <Screen.Content />
    </Screen>
  );
};
