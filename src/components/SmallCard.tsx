import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { Link } from 'react-router-native';
import styled from 'styled-components/native';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type Props = {
  title: string;
  colors: readonly [string, string, ...string[]];
  onPress?: () => void;
  index?: number;
  to?: string;
  titleStyles?: any;
  children?: any;
};

const Container = styled(AnimatedLinearGradient)`
  width: 180px;
  height: 100px;
  padding-bottom: 14px;
  padding-horizontal: 16px;
  border-radius: 4px;
  flex-direction: row;
  ${({ theme }) =>
    theme.type === 'dark'
      ? `
    shadow-color: black;
    shadow-opacity: 0.2;
    shadow-radius: 4px;
    shadow-offset: 2px 0px;
  `
      : `
      border: 0.5px solid rgba(120,120,120,0.3);
      `};
  margin-right: 16px;
  align-items: flex-end;
  justify-content: center;
`;

const Title = styled.Text`
  background-color: transparent;
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
  text-shadow-color: rgba(0, 0, 0, 0.2);
  text-shadow-radius: 1px;
  text-shadow-offset: 2px 0px;
  flex: 1;
`;

const SmallCard = ({ title, titleStyles, colors, onPress, to, children }: Props) => {
  const element = (
    <Container start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={colors}>
      <Title style={titleStyles}>{title}</Title>
      {children}
    </Container>
  );
  return to ? (
    <TouchableOpacity>
      <Link to={to}>{element}</Link>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress}>{element}</TouchableOpacity>
  );
};

export default SmallCard;
