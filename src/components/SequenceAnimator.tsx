import React, { useRef, useEffect, Children } from 'react';
import { Animated, Easing } from 'react-native';

type Props = {
  delay: number;
  delayMultiplier: number;
  children: any;
};

const OpacityAnimation = ({ delay, delayMultiplier, children }: Props) => {
  const animation = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: 1,
      duration: 400,
      delay: delayMultiplier * delay,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }, [delay, delayMultiplier]);

  return <Animated.View style={{ opacity: animation.current }}>{children}</Animated.View>;
};

const SequenceAnimator = ({
  animationDelay = 200,
  children,
}: {
  animationDelay?: number;
  children: any;
}) =>
  Children.map(children, (child, index) => (
    <OpacityAnimation key={index} delay={animationDelay} delayMultiplier={index}>
      {child}
    </OpacityAnimation>
  ));

export default SequenceAnimator;
