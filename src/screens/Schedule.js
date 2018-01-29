/* @flow */

import React from 'react';
import { ActivityIndicator } from 'react-native';
import { withTheme } from 'styled-components/native';
import gql from 'graphql-tag';
import get from 'lodash.get';
import capitalize from 'lodash.capitalize';
import { graphql, compose } from 'react-apollo';
import { Screen, Section, Card } from '../components';
import transformSchedule from '../utils/transformSchedule';
import type { Course } from '../types/Course';

const slotsTiming = {
  '1': '8:15 - 9:45',
  '2': '10:00 - 11-30',
  '3': '11:45 - 2:15',
  '4': '2:45 - 4:15',
  '5': '4:30 - 6:00',
};

type Props = {
  data: {
    loading: boolean,
    student?: {
      schedule: Array<Course>,
    },
  },
};

class Schedule extends React.Component<Props> {
  render() {
    const schedule = get(this.props, 'data.student.schedule', []);
    const scheduleMap = transformSchedule(schedule);

    return (
      <Screen>
        <Screen.Header title="Schedule" animated back />
        <Screen.Content>
          {this.props.data.loading ? (
            <ActivityIndicator size="large" />
          ) : (
            Object.keys(scheduleMap).map(key => {
              const courseArray = scheduleMap[key];
              return (
                <Section style={{ marginBottom: 8 }} title={capitalize(key)}>
                  {courseArray.map(({ course: { name }, venue, type, number }, index) => (
                    <Card
                      key={name + index}
                      timeText={slotsTiming[number]}
                      title={name}
                      tags={[`Slot ${number}`, venue, type]}
                    />
                  ))}
                </Section>
              );
            })
          )}
        </Screen.Content>
      </Screen>
    );
  }
}
const QUERY = gql`
  {
    student(username: "ahmed.elhanafy", password: "Fyfy12345") {
      schedule {
        course {
          name
        }
        number
        type
        venue
        weekday
      }
    }
  }
`;

export default compose(withTheme, graphql(QUERY))(Schedule);
