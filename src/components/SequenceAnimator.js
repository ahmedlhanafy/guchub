/* @flow */
import React, { PureComponent, Children } from 'react';
import { Animated, Easing } from 'react-native';

class OpacityAnimation extends PureComponent {
  state = { animation: new Animated.Value(0) };
  componentDidMount() {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 1400,
      delay: this.props.delayMultiplier * this.props.delay,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }
  render() {
    return (
      <Animated.View style={[{ opacity: this.state.animation }]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

const SequenceAnimator = ({ animationDelay = 500, children }) =>
  Children.map(children, (child, index) => (
    <OpacityAnimation delay={animationDelay} delayMultiplier={index}>
      {child}
    </OpacityAnimation>
  ));

export default SequenceAnimator;
