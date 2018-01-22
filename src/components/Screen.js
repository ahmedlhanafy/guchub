/* @flow */
import React from 'react';
import { withTheme } from 'styled-components/native';
import { LinearGradient } from 'expo';
import color from 'color';

const Screen = ({ theme, children, style, ...props }) => (
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
    style={[{ flex: 1 }, style]}
    {...props}>
    {children}
  </LinearGradient>
);

export default withTheme(Screen);
