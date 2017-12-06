/* @flow */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';

const NotificationsBtn = ({ onPress }: { onPress: func }) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={['rgba(190,190,190,0.3)', 'rgba(160,160,160,0.25)']}
      style={styles.container}
    >
      <MaterialIcons size={22} style={styles.icon} name="notifications-none" />
      <View style={styles.dot} />
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.7)',
  },
  dot: {
    backgroundColor: '#1abc9c',
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    position: 'absolute',
    top: -5,
    right: -5,
    borderWidth: 3,
    borderColor: 'black',
  },
});

export default NotificationsBtn;
