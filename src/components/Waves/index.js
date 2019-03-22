 

import React, { PureComponent } from 'react';
import { Dimensions, Animated } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class Waves extends PureComponent<{}, { value: Object }> {
  state = { value: new Animated.Value(0) };
  componentDidMount() {
    Animated.loop(
      Animated.timing(this.state.value, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
  }
  render() {
    const commonProps = {
      position: 'absolute',
      width: screenWidth * 3,
    };
    const imageSrc = require('../../assets/wave.png');
    const altImageSrc = require('../../assets/wave-alt.png');
    return [
      <Animated.Image
        style={{
          ...commonProps,
          bottom: -30,
          opacity: 0.6,
          transform: [
            {
              translateX: this.state.value.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [-1 * screenWidth, screenWidth, -1 * screenWidth],
              }),
            },
            {
              translateY: this.state.value.interpolate({
                inputRange: [0, 0.3, 0.4, 0.5, 0.6, 0.7, 1],
                outputRange: [0, 10, 15, 20, 15, 10, 0],
              }),
            },
          ],
        }}
        source={imageSrc}
      />,
      <Animated.Image
        style={{
          ...commonProps,
          bottom: -60,
          opacity: 0.6,
          transform: [
            {
              translateX: this.state.value.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [-1 * (screenWidth / 2), 0, -1 * (screenWidth / 2)],
              }),
            },
            {
              translateY: this.state.value.interpolate({
                inputRange: [0, 0.3, 0.4, 0.5, 0.6, 0.7, 1],
                outputRange: [0, 15, 20, 15, 20, 15, 0],
              }),
            },
          ],
        }}
        source={imageSrc}
      />,
      <Animated.Image
        style={{
          ...commonProps,
          bottom: -30,
          opacity: 0.4,
          transform: [
            {
              translateX: this.state.value.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [screenWidth, -1 * (screenWidth / 2), screenWidth],
              }),
            },
            {
              translateY: this.state.value.interpolate({
                inputRange: [0, 0.15, 0.3, 0.4, 0.5, 0.6, 0.7, 0.85, 1],
                outputRange: [0, 20, 40, 45, 40, 45, 40, 20, 0],
              }),
            },
          ],
        }}
        source={imageSrc}
      />,
      <Animated.Image
        style={{
          ...commonProps,
          bottom: -120,
          opacity: 0.4,
          transform: [
            {
              translateX: this.state.value.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [-1 * screenWidth / 2, screenWidth / 3, -1 * screenWidth / 2],
              }),
            },
            {
              translateY: this.state.value.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, -40, 0],
              }),
            },
          ],
        }}
        source={altImageSrc}
      />,
    ];
  }
}
