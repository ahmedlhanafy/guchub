import * as React from 'react';
import { Animated, Easing } from 'react-native';

type Props = {
  delay: number;
  delayMultiplier: number;
  children: React.ReactNode;
};

const OpacityAnimation = ({ children, delayMultiplier, delay }: Props) => {
  const animation = React.useRef(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(animation.current, {
      toValue: 1,
      duration: 400,
      delay: delayMultiplier * delay,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }, []);

  return <Animated.View style={{ opacity: animation.current }}>{children}</Animated.View>;
};

const SequenceAnimator = ({
  animationDelay = 200,
  children,
}: {
  animationDelay?: number;
  children: React.ReactNode;
}) =>
  React.Children.map(children, (child, index) => (
    <OpacityAnimation key={index} delay={animationDelay} delayMultiplier={index}>
      {child}
    </OpacityAnimation>
  ));

export default SequenceAnimator;
