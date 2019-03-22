 

import React, { PureComponent, Fragment } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import color from 'color';
import styled from 'styled-components/native';

type Props = {
  text: string,
  actions?: Array<any>,
  disappearing?: boolean,
  hideAfter?: number,
  shown: boolean,
  handleHiding?: () => void,
};

type State = {
  animatedValue: Object,
};

export default class Toast extends PureComponent<Props, State> {
  duration = 600;
  static defaultProps = {
    disappearing: true,
    hideAfter: 4000,
  };
  static Action = ({ text, onPress }: { text: string, onPress: () => void }) => (
    <Fragment>
      <ToastSeperator />
      <TouchableOpacity onPress={onPress}>
        <ToastAction>{text.toUpperCase()}</ToastAction>
      </TouchableOpacity>
    </Fragment>
  );
  state = { animatedValue: new Animated.Value(this.props.shown ? 1 : 0) };

  componentWillReceiveProps(newProps: Props) {
    if (newProps.shown !== this.props.shown) {
      if (newProps.shown)
        this.animate({ toValue: 1 }).start(() => {
          if (this.props.disappearing)
            this.animate({ delay: this.props.hideAfter, toValue: 0 }).start(
              this.props.handleHiding
            );
        });
      else {
        // This gets triggered when the toast gets automatically hidden, which shouldn't be the case
        this.animate({ toValue: 0 }).start();
      }
    }
  }

  animate = ({ toValue, delay }: { toValue: number, delay?: number }) =>
    Animated.timing(this.state.animatedValue, {
      toValue,
      delay,
      duration: this.duration,
      useNativeDriver: true,
    });

  render() {
    const { text, actions } = this.props;
    return (
      <ToastWrapper style={{ opacity: this.state.animatedValue }}>
        <ToastContainer>
          <ToastText>{text}</ToastText>
          {actions}
        </ToastContainer>
      </ToastWrapper>
    );
  }
}

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
  background-color: ${({ theme }) =>
    color('#767A80')
      .alpha(0.8)
      .rgb()
      .string()};
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
