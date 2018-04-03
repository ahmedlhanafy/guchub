/* @flow */

import React from 'react';
import gql from 'graphql-tag';
import get from 'lodash.get';
import graphql from 'react-apollo/graphql';
import { Screen, AttendanceRow, WithData } from '../components';
import { graphqlCredentialsOptions } from '../utils';

const renderRows = (courses: Array<Object>) =>
  [...courses]
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
    ));

const Attendance = ({ data }) => {
  return (
    <Screen>
      <Screen.Header title="Attendance" animated back />
      <Screen.Content>
        <WithData
          showLoadingIf={data => get(data, 'student.courses[0].name', null) === null}
          data={data}
          selector="student.courses"
          render={renderRows}
        />
      </Screen.Content>
    </Screen>
  );
};

const QUERY = gql`
  query AttendanceQuery($username: String!, $password: String!) {
    student(username: $username, password: $password) {
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
