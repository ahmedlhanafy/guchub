/* @flow */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Card from './Card';

const Classes = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Today Classes</Text>
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainerStyle}
      horizontal
    >
      <Card title="Artificial Intelligence" />
      <Card title="Human Computer Interaction" />
      <Card title="Natural Language Processing" />
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
