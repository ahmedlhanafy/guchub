/* @flow */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import gql from 'graphql-tag';
import Card from './Card';
import { SequenceAnimator } from '../../components';

const Classes = ({ data, title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainerStyle}
      horizontal>
      <SequenceAnimator>
        {data.map(({ course: { name }, venue, type }, index) => (
          <Card key={index} title={name} venue={venue} type={type} />
        ))}
      </SequenceAnimator>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: { marginTop: 24 },
  title: {
    paddingLeft: 16,
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.8)',
    fontSize: 19,
    fontWeight: 'bold',
  },
  scrollViewContainerStyle: { paddingLeft: 16, paddingVertical: 16 },
});

Classes.fragments = {
  schedule: gql`
    fragment Schedule on Student {
      schedule {
        course {
          name
        }
        type
        venue
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
