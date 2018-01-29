/* @flow */

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import styled, { withTheme } from 'styled-components/native';
import { LinearGradient } from 'expo';
import color from 'color';
import { MaterialIcons } from '@expo/vector-icons';

const IconButtonContainer = styled(LinearGradient)`
  width: 40;
  height: 40;
  border-radius: 6;
  justify-content: center;
  align-items: ${({ center }) => (center ? 'center' : 'flex-start')};
`;

const Icon = styled(MaterialIcons)`
  background-color: transparent;
  color: ${({ theme }) =>
    color(theme.primaryTextColor)
      .alpha(0.9)
      .rgb()
      .string()};
`;

const IconButtonIndicator = styled.View`
  background-color: red;
  width: 16;
  height: 16;
  border-radius: ${16 / 2};
  position: absolute;
  top: -5;
  right: -5;
  border-width: 3;
  border-color: ${({ theme }) =>
    color(theme.backgroundColor)
      .darken(0.25)
      .rgb()
      .string()};
`;

const IconButton = withTheme(
  ({
    onPress,
    theme,
    hasIndicator,
    hasOutline,
    iconName,
    style,
    to,
  }: {
    onPress?: () => void,
    theme: Object,
    hasIndicator?: boolean,
    hasOutline?: boolean,
    iconName: string,
    style: any,
    to?: string,
  }) => {
    const content = (
      <TouchableOpacity style={style} onPress={onPress}>
        <IconButtonContainer
          center={hasOutline}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[
            color(theme.cardBackgroundColor)
              .darken(0.3)
              .alpha(hasOutline ? 0.4 : 0)
              .rgb()
              .string(),
            color(theme.cardBackgroundColor)
              .darken(0.2)
              .alpha(hasOutline ? 0.3 : 0)
              .rgb()
              .string(),
          ]}>
          <Icon size={hasOutline ? 22 : 28} name={iconName} />
          {hasIndicator ? <IconButtonIndicator /> : null}
        </IconButtonContainer>
      </TouchableOpacity>
    );
    return to ? (
      <Link style={{ textDecoration: 'none', zIndex: 5 }} to={to}>
        {content}
      </Link>
    ) : (
      content
    );
  }
);

export default IconButton;
