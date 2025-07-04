import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import get from 'lodash.get';
import React from 'react';

import { Screen, AttendanceRow, WithData, SequenceAnimator } from '../components';

const GET_AUTH = gql`
  {
    auth @client {
      token
    }
  }
`;

const renderRows = (courses: any[]) => (
  <SequenceAnimator animationDelay={50}>
    {[...courses]
      .sort((courseA, courseB) =>
        get(courseA, 'absence.level', 0) < get(courseB, 'absence.level', 0) ? 1 : -1
      )
      .map((course, i) => (
        <AttendanceRow
          severityLevel={get(course, 'absence.level', 0)}
          alternate={i % 2 === 1}
          title={course.name}
          key={i}
        />
      ))}
  </SequenceAnimator>
);

const Attendance = () => {
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
      <Screen.Header loadingState={data?.networkStatus} title="Attendance" animated back />
      <Screen.Content>
        <WithData
          showLoadingIf={(data) => get(data, 'authenticatedStudent.courses[0].name', null) === null}
          data={data}
          selector="authenticatedStudent.courses"
          render={renderRows}
        />
      </Screen.Content>
    </Screen>
  );
};

const QUERY = gql`
  query AttendanceQuery($token: String!) {
    authenticatedStudent(token: $token) {
      isAuthorized
      courses {
        name
        absence {
          level
          severity
        }
      }
    }
  }
`;

export default Attendance;
