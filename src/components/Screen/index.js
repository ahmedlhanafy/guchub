/* @flow */

import React, { Children, PureComponent } from 'react';
import { Animated, View, ScrollView } from 'react-native';
import styled, { withTheme } from 'styled-components/native';
import { LinearGradient } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import color from 'color';

const Title = styled(Animated.Text)`
  background-color: transparent;
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 34;
  font-weight: bold;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 16px;
  padding-top: 48px;
`;

const Header = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 56;
  z-index: 2;
  justify-content: center;
  align-items: center;
  border-bottom-color: rgba(170, 170, 170, 0.05);
  border-bottom-width: ${StyleSheet.hairlineWidth};
  background-color: ${({ theme }) =>
    color(theme.backgroundColor)
      .darken(0.1)
      .rgb()
      .string()};
`;
const HeaderTitle = styled.Text`
  font-size: 18;
  font-weight: 500;
  color: white;
`;

const BackIconContainer = styled.TouchableOpacity`
  position: absolute;
  top: 14;
  left: 16;
  z-index: 5;
`;
const BackIcon = styled(MaterialIcons)`
  background-color: transparent;
  color: ${({ theme }) => theme.primaryTextColor};
`;

class Screen extends PureComponent {
  state = { animatedValue: new Animated.Value(0) };
  render() {
    const { theme, children, style, scrollable = true, ...props } = this.props;
    const { animated, onBackPress, title } = Children.toArray(children).find(
      ({ props }) => props.Header
    )
      ? Children.toArray(children).find(({ props }) => props.Header).props
      : {};
    const titleAnimation = {
      paddingTop: onBackPress ? 48 : 48 - 24,
      transform: animated && [
        {
          translateY: this.state.animatedValue.interpolate({
            inputRange: [0, 80],
            outputRange: [0, -80],
          }),
        },
      ],
    };
    return (
      <LinearGradient
        start={{ x: 0.2, y: 0.2 }}
        end={{ x: 1, y: 1 }}
        colors={[
          theme.backgroundColor,
          color(theme.backgroundColor)
            .darken(theme.type === 'dark' ? 0.3 : 0.1)
            .rgb()
            .string(),
        ]}
        style={[{ flex: 1, overflow: 'hidden' }, style]}
        {...props}>
        {onBackPress ? (
          <BackIconContainer onPress={onBackPress}>
            <BackIcon size={28} name="keyboard-backspace" />
          </BackIconContainer>
        ) : null}
        {animated ? (
          <Header
            style={{
              opacity: this.state.animatedValue.interpolate({
                inputRange: [0, 40, 80],
                outputRange: [0, 1, 1],
              }),
            }}>
            <HeaderTitle>{title}</HeaderTitle>
          </Header>
        ) : null}
        <Title style={titleAnimation}>{title}</Title>
        {scrollable ? (
          <ScrollView
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingTop: onBackPress ? 110 : 110 - 24,
            }}
            onScroll={
              animated &&
              Animated.event([
                {
                  nativeEvent: {
                    contentOffset: {
                      y: this.state.animatedValue,
                    },
                  },
                },
              ])
            }>
            {Children.toArray(children).filter(({ props }) => props.Content)}
          </ScrollView>
        ) : (
          <View style={{ flex: 1 }}>
            {Children.toArray(children).filter(({ props }) => props.Content)}
          </View>
        )}
      </LinearGradient>
    );
  }
}

Screen.Header = props => <View {...props} />;
Screen.Content = props => <View style={{ flex: 1 }} {...props} />;

export default withTheme(Screen);
