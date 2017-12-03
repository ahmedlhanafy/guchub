/* @flow */

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import Card from './Card';

const Actions = () => (
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
      Actions
    </Text>
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingLeft: 16 }}
      horizontal
    >
      <Card title="My Grades" colors={['#FCD5AC', '#F1837B']} />
      <Card title="Schedule" colors={['#49B4F1', '#8863F0']} />
      <Card title="Transcript" colors={['#F4A9D3', '#A00EC0']} />
    </ScrollView>
  </View>
);

export default Actions;
