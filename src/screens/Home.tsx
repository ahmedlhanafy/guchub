import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import get from 'lodash.get';
import React from 'react';

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
import { getSchedule } from '../utils';

const GET_AUTH = gql`
  {
    auth @client {
      token
    }
  }
`;

const Home = () => {
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
      <Screen.Header title="Feed">
        <IconButton hasOutline to="/settings" iconName="settings" />
      </Screen.Header>
      <Screen.Content>
        <WithData
          showLoadingIf={(data) =>
            get(data, 'authenticatedStudent.schedule[0].course.name', null) === null
          }
          data={data}
          selector="authenticatedStudent"
          render={renderFeed}
        />
      </Screen.Content>
    </Screen>
  );
};

const renderFeed = (authenticatedStudent) => {
  const scheduleData = getSchedule(get(authenticatedStudent, 'schedule', []));

  return (
    <SequenceAnimator>
      {scheduleData && scheduleData.schedule.length > 0 && (
        <Section title={`${scheduleData.label} Classes`}>
          <SequenceAnimator>
            {scheduleData.schedule.map((course, index) => (
              <Card course={course} key={index} />
            ))}
          </SequenceAnimator>
        </Section>
      )}
      <Actions />
      {get(authenticatedStudent, 'transcript.semesters', null) ? (
        <Chart grades={get(authenticatedStudent, 'transcript.semesters')} />
      ) : null}
    </SequenceAnimator>
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

export default Home;
