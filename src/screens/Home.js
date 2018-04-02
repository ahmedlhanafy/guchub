/* @flow */

import React from 'react';
import { withTheme } from 'styled-components/native';
import gql from 'graphql-tag';
import { compose } from 'react-apollo';
import graphql from 'react-apollo/graphql';
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
import { getSchedule } from '../utils/transformSchedule';

const Home = ({ data, theme, toggleTheme }) => {
  return (
    <Screen>
      <Screen.Header title="Feed">
        <IconButton hasOutline to="/settings" iconName="settings" />
      </Screen.Header>
      <Screen.Content>
        <WithData data={data} selector={data => data.student} render={renderFeed} />
      </Screen.Content>
    </Screen>
  );
};

const renderFeed = student => {
  const scheduleData = getSchedule(get(student, 'schedule', []));

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
      <Chart grades={student.transcript.semesters} />
    </SequenceAnimator>
  );
};

const QUERY = gql`
  {
    student(username: "ahmed.elhanafy", password: "Zyzy12345") {
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

export default compose(graphql(QUERY), withTheme)(Home);
