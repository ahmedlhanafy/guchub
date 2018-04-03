/* @flow */

import React from 'react';
import { withTheme } from 'styled-components/native';
import { compose } from 'react-apollo';
import graphql from 'react-apollo/graphql';
import get from 'lodash.get';
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
import { getSchedule, graphqlCredentialsOptions } from '../utils';
import { FEED_QUERY } from '../constants';

const Home = ({ data, theme, toggleTheme }) => {
  return (
    <Screen>
      <Screen.Header title="Feed">
        <IconButton hasOutline to="/settings" iconName="settings" />
      </Screen.Header>
      <Screen.Content>
        <WithData data={data} selector="student" render={renderFeed} />
      </Screen.Content>
    </Screen>
  );
};

const renderFeed = student => {
  const scheduleData = getSchedule(get(student, 'schedule', []));

  return (
    <SequenceAnimator>
      {scheduleData &&
        scheduleData.schedule.length > 0 && (
          <Section title={`${scheduleData.label} Classes`}>
            <SequenceAnimator>
              {scheduleData.schedule.map((course, index) => <Card course={course} key={index} />)}
            </SequenceAnimator>
          </Section>
        )}
      <Actions />
      <Chart grades={student.transcript.semesters} />
    </SequenceAnimator>
  );
};

export default compose(
  graphql(FEED_QUERY, {
    options: graphqlCredentialsOptions,
  }),
  withTheme
)(Home);
