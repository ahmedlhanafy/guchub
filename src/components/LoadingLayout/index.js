 

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SmallCardLoading from './SmallCardLoading';
import CardLoading from './CardLoading';

export default () => (
  <View style={{ flex: 1 }}>
    <View style={styles.container}>
      <Text style={styles.title}>Today Classes</Text>
      <View style={styles.wrapper}>
        <CardLoading />
        <CardLoading />
        <CardLoading />
      </View>
    </View>
    <View style={styles.container}>
      <Text style={styles.title}>Schedule</Text>
      <View style={styles.wrapper}>
        <CardLoading />
        <CardLoading />
        <CardLoading />
      </View>
    </View>
    <View style={styles.container}>
      <Text style={styles.title}>Actions</Text>
      <View style={styles.wrapper}>
        <SmallCardLoading />
        <SmallCardLoading />
        <SmallCardLoading />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { marginTop: 8 },
  title: {
    paddingLeft: 16,
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.8)',
    fontSize: 19,
    fontWeight: 'bold',
  },
  wrapper: { paddingLeft: 16, paddingVertical: 16, flexDirection: 'row' },
});
