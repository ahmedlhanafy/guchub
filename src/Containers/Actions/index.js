/* @flow */

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Card from './Card';
import { SequenceAnimator } from '../../components';

const Title = styled.Text`
  padding-left: 16;
  background-color: transparent;
  color: ${({ theme }) => theme.sectionTitleColor};
  font-size: 19;
  font-weight: bold;
`;

const Actions = () => (
  <View style={styles.container}>
    <Title>Actions</Title>
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainer}
      horizontal>
      <SequenceAnimator>
        <Card title="My Grades" colors={['#FCD5AC', '#F1837B']} />
        <Card title="Attendance" colors={['#49B4F1', '#8863F0']} />
        <Card title="Transcript" colors={['pink', 'purple']} />
      </SequenceAnimator>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: { marginTop: 8 },
  scrollViewContainer: { paddingLeft: 16, marginVertical: 16 },
});

export default Actions;
