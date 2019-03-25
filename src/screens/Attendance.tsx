import React from 'react';
import gql from 'graphql-tag';
import get from 'lodash.get';
import { Screen, AttendanceRow, SequenceAnimator } from '../components/index';
import { Course } from '../types/Course';
import { useQuery } from '../hooks';

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

type Query = {
  authenticatedStudent: {
    isAuthorized: boolean;
    courses: Course[];
  };
};

export default Attendance;
