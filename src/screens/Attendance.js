/* @flow */

import React from 'react';
import gql from 'graphql-tag';
import get from 'lodash.get';
import { graphql } from 'react-apollo';
import { Screen, AttendanceRow, WithData, SequenceAnimator } from '../components';
import { graphqlCredentialsOptions } from '../utils';

const renderRows = (courses: Array<Object>) => (
  <SequenceAnimator animationDelay={50}>
    {[...courses]
      .sort(
        (courseA, courseB) =>
          get(courseA, 'absence.level', 0) < get(courseB, 'absence.level', 0) ? 1 : -1
      )
      .map((course, i) => (
        <AttendanceRow
          severityLevel={get(course, 'absence.level', 0)}
          alternate={i % 2 === 1}
          title={course.name}
        />
      ))}
  </SequenceAnimator>
);

const Attendance = ({ data }) => {
  return (
    <Screen>
      <Screen.Header loadingState={data.networkStatus} title="Attendance" animated back />
      <Screen.Content>
        <WithData
          showLoadingIf={data => get(data, 'authenticatedStudent.courses[0].name', null) === null}
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

export default graphql(QUERY, {
  options: graphqlCredentialsOptions,
})(Attendance);
