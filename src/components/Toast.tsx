import color from 'color';
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { TouchableOpacity, Animated, Platform } from 'react-native';
import styled from 'styled-components/native';

type Props = {
  text: string;
  actions?: any[];
  disappearing?: boolean;
  hideAfter?: number;
  shown: boolean;
  handleHiding?: () => void;
};

const Toast = ({
  text,
  actions,
  disappearing = true,
  hideAfter = 4000,
  shown,
  handleHiding,
}: Props) => {
  const duration = 600;
  const animatedValue = useRef(new Animated.Value(shown ? 1 : 0));
  const [isInitialized, setIsInitialized] = useState(false);

  const animate = ({ toValue, delay }: { toValue: number; delay?: number }) =>
    Animated.timing(animatedValue.current, {
      toValue,
      delay,
      duration,
      useNativeDriver: Platform.OS !== 'web',
    });

  useEffect(() => {
    // Skip the first render to avoid initial animation
    if (!isInitialized) {
      setIsInitialized(true);
      return;
    }

    if (shown) {
      animate({ toValue: 1 }).start(() => {
        if (disappearing) {
          animate({ delay: hideAfter, toValue: 0 }).start(handleHiding);
        }
      });
    } else {
      animate({ toValue: 0 }).start();
    }
  }, [shown, disappearing, hideAfter, handleHiding, isInitialized]);

  return (
    <ToastWrapper style={{ opacity: animatedValue.current }}>
      <ToastContainer>
        <ToastText>{text}</ToastText>
        {actions}
      </ToastContainer>
    </ToastWrapper>
  );
};

Toast.displayName = 'Toast';

Toast.Action = ({ text, onPress }: { text: string; onPress: () => void }) => (
  <>
    <ToastSeperator />
    <TouchableOpacity onPress={onPress}>
      <ToastAction>{text.toUpperCase()}</ToastAction>
    </TouchableOpacity>
  </>
);

export default Toast;

const ToastWrapper = styled(Animated.View)`
  z-index: 20;
  position: fixed;
  bottom: 16%;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

const ToastContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 12px 28px;
  border-radius: 20px;
  background-color: ${({ theme }) => color('#767A80').alpha(0.8).rgb().string()};
`;

const ToastText = styled.Text`
  color: white;
  font-weight: 500;
`;

const ToastSeperator = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  width: 1.8px;
  height: 20px;
  margin: 0px 8px;
`;

const ToastAction = styled.Text`
  color: white;
  font-weight: bold;
`;
