/* @flow */

import styled from 'styled-components/native';
import { Platform, Animated } from 'react-native';
import { LinearGradient } from 'expo';
import color from 'color';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const Container = styled(AnimatedLinearGradient)`
  width: 320;
  padding-vertical: 14;
  padding-bottom: 18;
  padding-horizontal: 16;
  height: ${Platform.select({ web: 160, ios: 140, android: 140 })};
  ${({ theme }) =>
    theme.type === 'dark'
      ? `
    shadow-color: black;
    shadow-opacity: 0.2;
    shadow-radius: 4;
    shadow-offset: 2px 0px;
  `
      : `
      border: 1.2px solid rgba(0,0,0,0.14);
      overflow: hidden;
      `};
  border-radius: 4;
  margin-right: 16;
`;

export const TopSection = styled(Animated.View)`
  flex-direction: row;
  flex: 1;
`;

export const TextWrapper = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  background-color: transparent;
  color: ${({ theme }) =>
    color(theme.primaryTextColor)
      .alpha(0.8)
      .rgb()
      .string()};
  font-size: 18;
  font-weight: bold;
  margin-bottom: 4;
`;

export const SecondaryTitle = styled.Text`
  background-color: transparent;
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 15;
`;

export const TimeContainer = styled.View`
  background-color: ${({ theme }) =>
    color(theme.cardBackgroundColor)
      .lighten(theme.type === 'dark' ? 0.06 : 0)
      .darken(theme.type === 'dark' ? 0 : 0.06)
      .alpha(1)
      .rgb()
      .string()};
  ${({ theme }) => theme.type === 'light' && `border: 0.2px solid rgba(0,0,0,0.2);`};
  height: 30;
  justify-content: center;
  padding: 10px;
  border-radius: 4;
`;

export const TimeText = styled.Text`
  background-color: transparent;
  color: ${({ theme }) =>
    color(theme.primaryTextColor)
      .alpha(0.8)
      .rgb()
      .string()};
  font-size: 14;
  font-weight: bold;
`;

export const TagsContainer = styled.View`
  flex-direction: row;
`;

export const Tag = styled(AnimatedLinearGradient)`
  padding: 8px;
  border-radius: 4;
  padding-horizontal: 14;
`;

export const TagTitle = styled.Text`
  color: white;
  font-weight: bold;
  background-color: transparent;
  font-size: 12;
`;
