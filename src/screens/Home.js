/* @flow */

import React from 'react';
import { ScrollView } from 'react-native';
import { withTheme } from 'styled-components/native';
import gql from 'graphql-tag';
import graphql from 'react-apollo/graphql';
import { LoadingLayout, SequenceAnimator, Header, Chart, Screen } from '../components';
import Classes from '../containers/Classes';
import Actions from '../containers/Actions';

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

const Home = ({ data: { loading, student }, theme, toggleTheme }) => (
  <Screen>
    <Screen.Header title="Feed" Header />
    <Screen.Content Content>
      {loading ? <LoadingLayout /> : null}
      {student ? (
        <SequenceAnimator animationDelay={900}>
          {student.schedule.length > 0 && (
            <Classes schedule={student.schedule} title="Today Classes" />
          )}
          {student.courses.length > 0 && <Classes exams={student.courses} title="Exams Schedule" />}
          <Actions />
          <Chart grades={student.transcript.semesters} />
        </SequenceAnimator>
      ) : null}
    </Screen.Content>
  </Screen>
);

export default graphql(QUERY)(withTheme(Home));
