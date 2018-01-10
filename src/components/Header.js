/* @flow */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import styled, { withTheme } from 'styled-components/native';
import { Constants, LinearGradient } from 'expo';
import color from 'color';
import { MaterialIcons } from '@expo/vector-icons';

const NotificationsButton = withTheme(({ onPress, theme }: { onPress: func, theme: Object }) => (
  <TouchableOpacity onPress={onPress}>
    <NotificationsContainer
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[
        color(theme.cardBackgroundColor)
          .darken(0.3)
          .alpha(0.3)
          .rgb()
          .string(),
        color(theme.cardBackgroundColor)
          .darken(0.2)
          .alpha(0.2)
          .rgb()
          .string(),
      ]}>
      <NotificationsIcon size={22} name="notifications-none" />
      <NotificationsDot />
    </NotificationsContainer>
  </TouchableOpacity>
));

const NotificationsContainer = styled(LinearGradient)`
  width: 40;
  height: 40;
  border-radius: 6;
  justify-content: center;
  align-items: center;
`;

const NotificationsIcon = styled(MaterialIcons)`
  background-color: transparent;
  color: ${({ theme }) =>
    color(theme.primaryTextColor)
      .alpha(0.7)
      .rgb()
      .string()};
`;

const NotificationsDot = styled.View`
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

const Header = styled.View`
  flex-direction: row;
  padding: 8px 16px 8px 16px;
  justify-content: center;
  margin-top: ${Constants.statusBarHeight + 10};
`;

const HeaderTitle = styled.Text`
  flex: 1;
  background-color: transparent;
  color: ${props => props.theme.primaryTextColor};
  font-size: 34;
  font-weight: bold;
`;

Header.title = HeaderTitle;
Header.notifBtn = NotificationsButton;

export default Header;
