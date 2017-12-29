/* @flow */

import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { LinearGradient, Svg } from 'expo';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';

export default () => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    colors={['rgba(190,190,190,0.5)', 'rgba(160,160,160,0.3)']}
    style={styles.container}>
    <SvgAnimatedLinearGradient
      primaryColor="#bdbdbd"
      secondaryColor="#a9a9a9">
      <Svg.Rect x="0" y="4" rx="4" ry="4" width="150" height="10" />
      <Svg.Rect x="0" y="24" rx="3" ry="4" width="180" height="10" />
      <Svg.Rect x="0" y="80" rx="5" ry="5" width="80" height="30" />
    </SvgAnimatedLinearGradient>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    width: 320,
    paddingVertical: 14,
    paddingBottom: 14,
    paddingHorizontal: 16,
    height: Platform.select({ web: 160, ios: 140, android: 140 }),
    borderRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    marginRight: 16,
  },
});
