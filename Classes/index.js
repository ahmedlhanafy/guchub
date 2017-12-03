/* @flow */

import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Card from './Card';

const Classes = ({ data, loading, error }) => (
  <View style={{ marginTop: 24 }}>
    <Text
      style={{
        paddingLeft: 16,
        backgroundColor: 'transparent',
        color: 'rgba(255,255,255,0.8)',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 16,
      }}
    >
      Today Classes
    </Text>
    {(!data || !data.student) && <ActivityIndicator />}
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingLeft: 16 }}
      horizontal
    >
      {data &&
        data.student &&
        data.student.examsSchedule.map(({ course }, index) => (
          <Card key={index} title={course} />
        ))}
    </ScrollView>
  </View>
);

const SCHEDULE_QUERY = gql`
  {
    student(username: "ahmed.elhanafy", password: "Mymy12345") {
      examsSchedule {
        course
        dateTime
      }
    }
  }
`;

export default graphql(SCHEDULE_QUERY)(Classes);
