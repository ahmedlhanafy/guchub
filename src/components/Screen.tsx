//@TODO: Refactor this file

import * as React from 'react';
import { ActivityIndicator, Animated, View, ScrollView, StyleSheet } from 'react-native';
import styled, { withTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import color from 'color';

import IconButton from './IconButton';
import { Theme } from '../constants/themes';

type Props = {
  scrollable?: boolean,
  children?: React.ReactNode,
  theme?: Theme,
  style?: any,
};

type State = {
  animatedValue: Animated,
};

class Screen extends React.Component<Props, State> {
  static defaultProps = {
    scrollable: true,
  };
  state = { animatedValue: new Animated.Value(0) };
  public static Header = (props: any) => <View {...props} />;
  public static Content = (props: any) => <View style={{ flex: 1 }} {...props} />;

  _renderContent = () => {
    const { children, scrollable, theme } = this.props;

    const header = React.Children.toArray(children).find(Comp => Comp.type === Screen.Header);
    const { animated, back, title, children: headerChildren, loadingState = 7 } = header
      ? header.props
      : {};
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
                  y: this.state.animatedValue,
                },
              },
            },
          ])
        }>
        {staticTitle}
        {React.Children.toArray(children).filter(Comp => Comp.type === Screen.Content)}
      </ScrollView>
    ) : (
      <View style={{ flex: 1 }}>
        {staticTitle}
        {React.Children.toArray(children).filter(Comp => Comp.type === Screen.Content)}
      </View>
    );
  };

  render() {
    const { theme, children, style, ...props } = this.props;

    const header = React.Children.toArray(children).find(Comp => Comp.type === Screen.Header);
    const { animated, back, title, children: headerChildren, to = '/' } = header
      ? header.props
      : {};

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
              opacity: this.state.animatedValue.interpolate({
                inputRange: [0, 40, 80],
                outputRange: [0, 1, 1],
              }),
            }}>
            <HeaderTitle>{title}</HeaderTitle>
          </Header>
        ) : null}
        {this._renderContent()}
      </LinearGradient>
    );
  }
}

const TitleContainer = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;
`;

const Title = styled(Animated.Text)`
  background-color: transparent;
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 34;
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
  font-size: 13;
  font-weight: 300;
  margin-right: 6px;
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
  border-bottom-color: ${({ theme }) =>
    theme.type === 'dark' ? 'rgba(170, 170, 170, 0.05)' : 'rgba(170, 170, 170, 0.14)'};
  border-bottom-width: ${StyleSheet.hairlineWidth};
  background-color: ${({ theme }) =>
    theme.type === 'light'
      ? theme.backgroundColor
      : color(theme.backgroundColor)
          .darken(0.1)
          .rgb()
          .string()};
`;
const HeaderTitle = styled.Text`
  font-size: 18;
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

export default withTheme(Screen) as any;
