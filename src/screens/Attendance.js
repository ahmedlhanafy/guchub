import React from 'react';
import { withTheme } from 'styled-components/native';
import { Screen } from '../components';

class Attendance extends React.Component {
  render() {
    return (
      <Screen>
        <Screen.Header title="Coming Soon" animated back />
        <Screen.Content />
      </Screen>
    );
  }
}

export default withTheme(Attendance);
