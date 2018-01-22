/* @flow */

import React from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { Link } from 'react-router-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type Props = {
  title: string,
  colors: string[],
  onPress?: () => void,
  index?: number,
};

const Container = styled(AnimatedLinearGradient)`
  width: 180;
  height: 100;
  padding-bottom: 14;
  padding-horizontal: 16;
  border-radius: 4;
  ${({ theme }) =>
    theme.type === 'dark'
      ? `
    shadow-color: black;
    shadow-opacity: 0.2;
    shadow-radius: 4;
    shadow-offset: 2px 0px;
  `
      : `
      border: 1.2px solid rgba(0,0,0,0.2);
      overflow: hidden;
      `};
  margin-right: 16;
  justify-content: flex-end;
`;

const Title = styled.Text`
  background-color: transparent;
  color: rgba(255, 255, 255, 0.8);
  font-size: 18;
  font-weight: bold;
  margin-bottom: 4;
  text-shadow-color: rgba(0, 0, 0, 0.2);
  text-shadow-radius: 1;
  text-shadow-offset: 2px 0px;
`;

const Card = ({ title, colors, onPress, to }: Props) =>
  to ? (
    <Link to={to} component={TouchableOpacity}>
      <Container start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={colors}>
        <Title>{title}</Title>
      </Container>
    </Link>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <Container start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={colors}>
        <Title>{title}</Title>
      </Container>
    </TouchableOpacity>
  );

export default Card;
