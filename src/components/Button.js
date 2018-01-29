/* @flow */

import React from 'react';
import { Platform } from 'react-native';
import { Link } from 'react-router-native';
import styled from 'styled-components/native';
import color from 'color';

const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) =>
    color('#767A80')
      .alpha(theme.type === 'light' ? 1.0 : 0.3)
      .rgb()
      .string()};
  height: 42;
  justify-content: center;
  align-items: center;
  border-radius: 4;
  ${Platform.select({ web: 'outline: none;' })};
`;

const Title = styled.Text`
  background-color: transparent;
  color: white;
  font-weight: bold;
  font-size: 16.5;
`;

export default ({ onPress, children, to, ...props }) =>
  to ? (
    <Link activeOpacity={0.8} to={to} {...props}>
      <Button {...props}>
        <Title>{children.toString().toUpperCase()}</Title>
      </Button>
    </Link>
  ) : (
    <Button onPress={onPress} {...props}>
      <Title>{children.toString().toUpperCase()}</Title>
    </Button>
  );
