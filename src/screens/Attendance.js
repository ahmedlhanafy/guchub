import React from 'react';
import { withTheme } from 'styled-components/native';
import { Screen } from '../components';
import Actions from '../containers/Actions';

class Attendance extends React.Component {
  render() {
    return (
      <Screen>
        <Screen.Header title="Attendance" Header animated onBackPress={() => alert('Hey!')} />
        <Screen.Content Content>
          <Actions />
        </Screen.Content>
      </Screen>
    );
  }
}

export default withTheme(Attendance);
