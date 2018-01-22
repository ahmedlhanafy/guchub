/* @react */

import React from 'react';
import { Platform, TouchableOpacity, Text } from 'react-native';
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

export default ({ onPress, children, ...props }) => (
  <Button onPress={onPress} {...props}>
    <Title>{children.toString().toUpperCase()}</Title>
  </Button>
);
