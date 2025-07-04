import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import capitalize from 'lodash.capitalize';
import get from 'lodash.get';
import React from 'react';

import { Screen, Section, Card, WithData, SequenceAnimator } from '../components';
import { transformSchedule } from '../utils';

const GET_AUTH = gql`
  {
    auth @client {
      token
    }
  }
`;

const Schedule = () => {
  const { data: authData } = useQuery(GET_AUTH);
  const token = get(authData, 'auth.token');

  const { data } = useQuery(QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      token,
    },
    skip: !token,
  });

  return (
    <Screen>
      <Screen.Header title="Schedule" animated back />
      <Screen.Content>
        <WithData
          showLoadingIf={(data) =>
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

const renderSchedule = (schedule) => {
  const scheduleMap = transformSchedule(schedule);
  return (
    <SequenceAnimator>
      {Object.keys(scheduleMap).map((key) => {
        const coursesArray = scheduleMap[key];
        return (
          <Section key={key} style={{ marginBottom: 8 }} title={capitalize(key)}>
            {coursesArray.map((course) => (
              <Card key={course.course.name} course={course} />
            ))}
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

export default Schedule;
