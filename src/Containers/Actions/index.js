/* @flow */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Card from './Card';
import { SequenceAnimator } from '../../components';

const Actions = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Actions</Text>
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainer}
      horizontal>
      <SequenceAnimator>
        <Card title="My Grades" colors={['#FCD5AC', '#F1837B']} />
        <Card title="Schedule" colors={['#49B4F1', '#8863F0']} />
        <Card title="Transcript" colors={['pink', 'purple']} />
      </SequenceAnimator>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: { marginTop: 8 },
  scrollViewContainer: { paddingLeft: 16, marginVertical: 16 },
  title: {
    paddingLeft: 16,
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.8)',
    fontSize: 19,
    fontWeight: 'bold',
  },
});

export default Actions;
