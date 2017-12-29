/* @flow */

import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type Props = {
  title: string,
  colors: string[],
  onPress: ?func,
  index: number,
};

const Card = ({ title, colors, onPress }: Props) => (
  <TouchableOpacity onPress={onPress}>
    <AnimatedLinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      colors={colors}
      style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </AnimatedLinearGradient>
  </TouchableOpacity>
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
  title: {
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowRadius: 1,
    textShadowOffset: {
      height: 2,
      width: 0,
    },
  },
});

export default Card;
