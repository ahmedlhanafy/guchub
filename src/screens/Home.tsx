import React from 'react';
import gql from 'graphql-tag';
import get from 'lodash.get';
import { SequenceAnimator, Chart, Screen, IconButton, Card, Section, Actions } from '../components';
import { getSchedule } from '../utils';
import { useQuery } from '../hooks';

const Home = ({ token }: { token: string }) => {
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

  const scheduleData = getSchedule(get(data, 'authenticatedStudent.schedule', []));

  const chart = get(data, 'authenticatedStudent.transcript.semesters', null) ? (
    <Chart grades={get(data, 'authenticatedStudent.transcript.semesters')} />
  ) : null;

  return (
    <Screen>
      <Screen.Header title="Feed">
        <IconButton hasOutline to="/settings" iconName="settings" />
      </Screen.Header>
      <Screen.Content>
        {loadingComp ? (
          loadingComp
        ) : (
          <SequenceAnimator>
            {scheduleData &&
              scheduleData.schedule.length > 0 && (
                <Section title={`${scheduleData.label} Classes`}>
                  <SequenceAnimator>
                    {scheduleData.schedule.map((course, index) => (
                      <Card course={course} key={index} />
                    ))}
                  </SequenceAnimator>
                </Section>
              )}
            <Actions />
            {chart}
          </SequenceAnimator>
        )}
      </Screen.Content>
    </Screen>
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

type Query = {
  authenticatedStudent: {
    isAuthorized: boolean;
    schedule: any[];
    transcript: {
      semesters: any[];
    };
  };
};

export default Home;
