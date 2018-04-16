/* @flow */

import React from 'react';
import { withTheme } from 'styled-components/native';
import gql from 'graphql-tag';
import get from 'lodash.get';
import capitalize from 'lodash.capitalize';
import { graphql, compose } from 'react-apollo';
import { Screen, Section, Card, WithData, SequenceAnimator } from '../components';
import { transformSchedule, graphqlCredentialsOptions } from '../utils';
import type { Course } from '../types/Course';

type Props = {
  data: {
    loading: boolean,
    networkStatus: number,
    authenticatedStudent?: {
      schedule: Array<Course>,
    },
  },
};

const Schedule = ({ data }: Props) => {
  return (
    <Screen>
      <Screen.Header title="Schedule" animated back />
      <Screen.Content>
        <WithData
          showLoadingIf={data =>
            get(data, 'authenticatedStudent.schedule[0].course.name', null) === null
          }
          data={data}
          selector="authenticatedStudent.schedule"
          render={renderSchedule}
        />
      </Screen.Content>
    </Screen>
  );
};

const renderSchedule = schedule => {
  const scheduleMap = transformSchedule(schedule);
  return (
    <SequenceAnimator>
      {Object.keys(scheduleMap).map(key => {
        const coursesArray = scheduleMap[key];
        return (
          <Section key={key} style={{ marginBottom: 8 }} title={capitalize(key)}>
            {coursesArray.map(course => <Card key={course.name} course={course} />)}
          </Section>
        );
      })}
    </SequenceAnimator>
  );
};

const QUERY = gql`
  query scheduleQuery($token: String!) {
    authenticatedStudent(token: $token) {
      isAuthorized
      schedule {
        weekday
        ...CourseFragment
      }
    }
  }
  ${Card.fragment}
`;

export default compose(
  withTheme,
  graphql(QUERY, {
    options: graphqlCredentialsOptions,
  })
)(Schedule);
