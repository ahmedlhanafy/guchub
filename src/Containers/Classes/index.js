/* @flow */

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Card from './Card';

const Classes = () => (
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
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingLeft: 16 }}
      horizontal
    >
      <Card title={'Artificial Intelligence'} />
      <Card title={'Human Computer Interaction'} />
      <Card title={'Natural Language Processing'} />
    </ScrollView>
  </View>
);

// const SCHEDULE_QUERY = gql`
//   {
//     student(username: "ahmed.elhanafy", password: "Mymy12345") {
//       examsSchedule {
//         course
//         dateTime
//       }
//     }
//   }
// `;

export default Classes;
