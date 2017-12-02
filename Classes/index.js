/* @flow */

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
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
      <Card />
      <Card />
      <Card />
    </ScrollView>
  </View>
);

export default Classes;
