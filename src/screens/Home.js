/* @flow */

import React from 'react';
import { withTheme } from 'styled-components/native';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import get from 'lodash.get';
import {
  SequenceAnimator,
  Chart,
  Screen,
  IconButton,
  WithData,
  Card,
  Section,
  Actions,
} from '../components';
import { getSchedule, graphqlCredentialsOptions } from '../utils';

const Home = ({ data, theme, toggleTheme }) => {
  return (
    <Screen>
      <Screen.Header title="Feed">
        <IconButton hasOutline to="/settings" iconName="settings" />
      </Screen.Header>
      <Screen.Content>
        <WithData
          showLoadingIf={data =>
            get(data, 'authenticatedStudent.schedule[0].course.name', null) === null
          }
          data={data}
          selector="authenticatedStudent"
          render={renderFeed}
        />
      </Screen.Content>
    </Screen>
  );
};

const renderFeed = authenticatedStudent => {
  const scheduleData = getSchedule(get(authenticatedStudent, 'schedule', []));

  return (
    <SequenceAnimator>
      {scheduleData &&
        scheduleData.schedule.length > 0 && (
          <Section title={`${scheduleData.label} Classes`}>
            <SequenceAnimator>
              {scheduleData.schedule.map((course, index) => <Card course={course} key={index} />)}
            </SequenceAnimator>
          </Section>
        )}
      <Actions />
      {get(authenticatedStudent, 'transcript.semesters', null) ? (
        <Chart grades={get(authenticatedStudent, 'transcript.semesters')} />
      ) : null}
    </SequenceAnimator>
  );
};

const QUERY = gql`
  query feedQuery($token: String!) {
    authenticatedStudent(token: $token) {
      isAuthorized
      schedule {
        ...CourseFragment
        weekday
      }
      transcript {
        semesters {
          year
          gpa
        }
      }
    }
  }
  ${Card.fragment}
`;

export default compose(
  graphql(QUERY, {
    options: graphqlCredentialsOptions,
  }),
  withTheme
)(Home);
