/* @flow */

import React from 'react';
import gql from 'graphql-tag';
import { SequenceAnimator, Card, Section } from '../components';
import type { Course } from '../types/Course';

type Props = {
  schedule: Array<Course>,
  title: string,
};

const slotsTiming = {
  '1': '8:15 - 9:45',
  '2': '10:00 - 11-30',
  '3': '11:45 - 2:15',
  '4': '2:45 - 4:15',
  '5': '4:30 - 6:00',
};

const Classes = ({ schedule = [], title }: Props) => (
  <Section title={title}>
    <SequenceAnimator>
      {schedule.map(({ course: { name }, type, number, venue }, index) => (
        <Card
          key={name + index}
          timeText={slotsTiming[number]}
          title={name}
          tags={[`Slot ${number}`, venue, type]}
        />
      ))}
    </SequenceAnimator>
  </Section>
);

Classes.fragments = {
  schedule: gql`
    fragment Schedule on Student {
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
  `,
  examsSchedule: gql`
    fragment ExamsSchedule on Student {
      examsSchedule {
        course
        dateTime
        seat
        venue
      }
    }
  `,
};

export default Classes;
