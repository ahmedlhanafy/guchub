/* @flow */
import React, { PureComponent, Children } from 'react';
import { Animated, Easing } from 'react-native';

type State = {
  animation: Object,
};

type Props = {
  delay: number,
  delayMultiplier: number,
  children: any,
};

class OpacityAnimation extends PureComponent<Props, State> {
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
      <Animated.View style={{ opacity: this.state.animation }}>{this.props.children}</Animated.View>
    );
  }
}

const SequenceAnimator = ({
  animationDelay = 100,
  children,
}: {
  animationDelay?: number,
  children: any,
}) =>
  Children.map(children, (child, index) => (
    <OpacityAnimation key={index} delay={animationDelay} delayMultiplier={index}>
      {child}
    </OpacityAnimation>
  ));

export default SequenceAnimator;
