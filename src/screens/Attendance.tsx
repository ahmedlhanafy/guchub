import React from 'react';
import gql from 'graphql-tag';
import get from 'lodash.get';
import { Screen, AttendanceRow, SequenceAnimator } from '../components/index';
import { useQuery } from '../utils';

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

type Course = {
  name: string;
  absence: {
    level: string;
    severity: string;
  };
};

type Query = {
  authenticatedStudent: {
    isAuthorized: boolean;
    courses: Course[];
  };
};

const Attendance = ({ token }: { token: string }) => {
  const { data, networkStatus, loadingComp } = useQuery<Query, { token: string }>(
    QUERY,
    {
      fetchPolicy: 'cache-and-network',
      variables: { token },
    },
    { isLoading: (data: Query) => get(data, 'authenticatedStudent.courses[0].name', null) === null }
  );

  return (
    <Screen>
      <Screen.Header loadingState={networkStatus} title="Attendance" animated back />
      <Screen.Content>
        {loadingComp ? (
          loadingComp
        ) : (
          <SequenceAnimator animationDelay={50}>
            {data
              ? [...data.authenticatedStudent.courses]
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
                  ))
              : null}
          </SequenceAnimator>
        )}
      </Screen.Content>
    </Screen>
  );
};

export default Attendance;
