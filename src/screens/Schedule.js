/* @flow */

import React from 'react';
import { withTheme } from 'styled-components/native';
import gql from 'graphql-tag';
import capitalize from 'lodash.capitalize';
import { graphql, compose } from 'react-apollo';
import { Screen, Section, Card, WithData, SequenceAnimator } from '../components';
import { transformSchedule } from '../utils/transformSchedule';
import type { Course } from '../types/Course';

type Props = {
  data: {
    loading: boolean,
    student?: {
      schedule: Array<Course>,
    },
  },
};

const Schedule = ({ data }: Props) => {
  return (
    <Screen>
      <Screen.Header title="Schedule" animated back />
      <Screen.Content>
        <WithData data={data} selector={data => data.student.schedule} render={renderSchedule} />
      </Screen.Content>
    </Screen>
  );
};

const renderSchedule = schedule => {
  const scheduleMap = transformSchedule(schedule);
  return (
    <SequenceAnimator>
      {Object.keys(scheduleMap).map(key => {
        const coursesArray = scheduleMap[key];
        return (
          <Section style={{ marginBottom: 8 }} title={capitalize(key)}>
            {coursesArray.map((course, index) => <Card key={index} course={course} />)}
          </Section>
        );
      })}
    </SequenceAnimator>
  );
};

const QUERY = gql`
  {
    student(username: "ahmed.elhanafy", password: "Zyzy12345") {
      schedule {
        weekday
        ...CourseFragment
      }
    }
  }
  ${Card.fragment}
`;

export default compose(withTheme, graphql(QUERY))(Schedule);
