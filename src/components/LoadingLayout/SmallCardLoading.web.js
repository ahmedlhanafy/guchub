/* @flow */

import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';
import color from 'color';
import ContentLoader from 'react-content-loader';

export default () => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    colors={[
      '#767A80',
      color('#3B4149')
        .alpha(0.7)
        .rgb()
        .string(),
    ]}
    style={styles.container}>
    <ContentLoader
      speed={100}
      primaryColor="#bdbdbd"
      secondaryColor="#969696"
      height="100%"
      style={{ height: '100%' }}>
      <rect x="0" y="70" rx="4" ry="4" width="80" height="10" />
    </ContentLoader>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 100,
    paddingBottom: 14,
    paddingHorizontal: 16,
    borderRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    marginRight: 16,
    justifyContent: 'flex-end',
  },
});
