//@TODO: Refactor this file

import { MaterialIcons } from '@expo/vector-icons';
import color from 'color';
import { LinearGradient } from 'expo-linear-gradient';
import React, { Children, useRef } from 'react';
import { ActivityIndicator, Animated, View, ScrollView, StyleSheet } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

import IconButton from './IconButton';

type Props = {
  scrollable?: boolean;
  children?: any;
  style?: any;
};

interface HeaderProps {
  animated?: boolean;
  back?: boolean;
  title?: string;
  children?: any;
  loadingState?: number;
  to?: string;
}

// Helper function to check if a child is a React element
const isReactElement = (child: any): child is React.ReactElement => {
  return React.isValidElement(child);
};

const Screen = ({ scrollable = true, children, style, ...props }: Props) => {
  const theme = useTheme();
  const animatedValue = useRef(new Animated.Value(0));

  const renderContent = () => {
    const header = Children.toArray(children).find(
      (Comp) => isReactElement(Comp) && Comp.type === Screen.Header
    ) as React.ReactElement | undefined;

    const {
      animated,
      back,
      title,
      children: headerChildren,
      loadingState = 7,
    } = (header?.props || {}) as HeaderProps;
    let loadingText = '';
    if (loadingState === 1) loadingText = 'Loading...';
    else if (loadingState === 8) loadingText = 'Viewing outdated data';

    const staticTitle = (
      <TitleContainer>
        <Title>{title}</Title>
        <LoadingContainer>
          <LoadingText>{loadingText}</LoadingText>
          {loadingState === 1 ? (
            <ActivityIndicator size={14} color={theme.secondaryTextColor} />
          ) : null}
          {loadingState === 8 ? (
            <MaterialIcons name="error-outline" size={16} color={theme.secondaryTextColor} />
          ) : null}
        </LoadingContainer>
        {!animated ? headerChildren : null}
      </TitleContainer>
    );
    return scrollable ? (
      <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingTop: back ? 32 : 32 - 24,
        }}
        onScroll={
          animated &&
          Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: animatedValue.current,
                },
              },
            },
          ])
        }>
        {staticTitle}
        {Children.toArray(children).filter(
          (Comp) => isReactElement(Comp) && Comp.type === Screen.Content
        )}
      </ScrollView>
    ) : (
      <View style={{ flex: 1 }}>
        {staticTitle}
        {Children.toArray(children).filter(
          (Comp) => isReactElement(Comp) && Comp.type === Screen.Content
        )}
      </View>
    );
  };

  const header = Children.toArray(children).find(
    (Comp) => isReactElement(Comp) && Comp.type === Screen.Header
  ) as React.ReactElement | undefined;

  const {
    animated,
    back,
    title,
    children: headerChildren,
    to = '/',
  } = (header?.props || {}) as HeaderProps;

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
      {back && (
        <IconsContainer>
          {back ? <IconButton to={to} iconName="keyboard-backspace" /> : null}
          {animated ? headerChildren : null}
        </IconsContainer>
      )}
      {animated ? (
        <Header
          style={{
            opacity: animatedValue.current.interpolate({
              inputRange: [0, 40, 80],
              outputRange: [0, 1, 1],
            }),
          }}>
          <HeaderTitle>{title}</HeaderTitle>
        </Header>
      ) : null}
      {renderContent()}
    </LinearGradient>
  );
};

Screen.Header = (props) => <View {...props} />;
Screen.Content = (props) => <View style={{ flex: 1 }} {...props} />;

const TitleContainer = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;
`;

const Title = styled(Animated.Text)`
  background-color: transparent;
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 34px;
  font-weight: bold;
`;

const LoadingContainer = styled.View`
  flex: 1;
  align-self: flex-end;
  flex-direction: row;
  margin-left: 12px;
  margin-bottom: 6px;
`;

const LoadingText = styled.Text`
  background-color: transparent;
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 13px;
  font-weight: 300;
  margin-right: 6px;
`;

const Header = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  z-index: 2;
  justify-content: center;
  align-items: center;
  border-bottom-color: ${({ theme }) =>
    theme.type === 'dark' ? 'rgba(170, 170, 170, 0.05)' : 'rgba(170, 170, 170, 0.14)'};
  border-bottom-width: ${StyleSheet.hairlineWidth};
  background-color: ${({ theme }) =>
    theme.type === 'light'
      ? theme.backgroundColor
      : color(theme.backgroundColor).darken(0.1).rgb().string()};
`;
const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryTextColor};
`;

const IconsContainer = styled.View`
  padding: 0px 16px;
  height: 56px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  z-index: 4;
`;

export default Screen;
