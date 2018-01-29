/* @flow */

import React from 'react';
import { withTheme } from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import gql from 'graphql-tag';
import graphql from 'react-apollo/graphql';
import get from 'lodash.get';
import { SequenceAnimator, Chart, Screen, IconButton } from '../components';
import { Classes, Actions } from '../containers';
import transformSchedule from '../utils/transformSchedule';

const QUERY = gql`
  {
    student(username: "ahmed.elhanafy", password: "Fyfy12345") {
      ...Schedule
      courses {
        name
        exam {
          venue
          seat
        }
      }
      transcript {
        semesters {
          year
          gpa
        }
      }
    }
  }
  ${Classes.fragments.schedule}
`;

const Home = ({ data: { loading, student }, theme, toggleTheme }) => {
  var days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'SATURDAY'];

  const schedule = transformSchedule(get(student, 'schedule', []))[days[new Date().getDay()]] || [];
  return (
    <Screen>
      <Screen.Header title="Feed">
        <IconButton hasOutline to="/settings" iconName="settings" />
      </Screen.Header>
      <Screen.Content>
        {loading ? <ActivityIndicator size="large" /> : null}
        {student ? (
          <SequenceAnimator animationDelay={100}>
            {schedule.length > 0 && <Classes schedule={schedule} title="Today Classes" />}
            <Actions />
            <Chart grades={student.transcript.semesters} />
          </SequenceAnimator>
        ) : null}
      </Screen.Content>
    </Screen>
  );
};
export default graphql(QUERY)(withTheme(Home));
