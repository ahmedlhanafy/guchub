import React from 'react';
import gql from 'graphql-tag';
import get from 'lodash.get';
import capitalize from 'lodash.capitalize';
import { Screen, Section, Card, SequenceAnimator } from '../components';
import { transformSchedule } from '../utils';
import { Course } from '../types/Course';
import { useQuery } from '../hooks';

const Schedule = ({ token }: { token: string }) => {
  const { data, loadingComp } = useQuery<Query, { token: string }>(
    QUERY,
    {
      fetchPolicy: 'cache-and-network',
      variables: { token },
    },
    {
      isLoading: (data: Query) =>
        get(data, 'authenticatedStudent.schedule[0].course.name', null) === null,
    }
  );

  const scheduleMap = transformSchedule(get(data, 'authenticatedStudent.schedule', []));

  return (
    <Screen>
      <Screen.Header title="Schedule" animated back />
      <Screen.Content>
        {loadingComp ? (
          loadingComp
        ) : (
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
        )}
      </Screen.Content>
    </Screen>
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

type Query = {
  authenticatedStudent?: {
    schedule: Course[];
  };
};

export default Schedule;
