/* @flow */

import React, { PureComponent } from 'react';
import { Platform, TouchableOpacity, Animated, Easing } from 'react-native';
import LinesEllipsis from 'react-lines-ellipsis';
import color from 'color';
import { withTheme } from 'styled-components';
import {
  Container,
  SecondaryTitle,
  Tag,
  TagsContainer,
  TagTitle,
  TextWrapper,
  TimeContainer,
  TimeText,
  Title,
  TopSection,
} from './CardComponents';

type Props = {
  title: string,
  onPress: ?func,
  venue: string,
  theme: Object,
};

class Card extends PureComponent<Props> {
  state = {
    textAnimatedValue: new Animated.Value(0),
    tagAnimatedValue: new Animated.Value(0),
  };
  componentDidMount() {
    Animated.timing(this.state.textAnimatedValue, {
      toValue: 1,
      duration: 1600,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
    Animated.timing(this.state.tagAnimatedValue, {
      toValue: 1,
      duration: 1300,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  }

  render() {
    const { title, onPress, venue, type, theme } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <Container
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[
            theme.cardBackgroundColor,
            color(theme.cardBackgroundColor)
              .alpha(theme.type === 'dark' ? 0.7 : 1)
              .rgb()
              .string(),
          ]}>
          <TopSection style={{ opacity: this.state.textAnimatedValue }}>
            <TextWrapper>
              {Platform.OS === 'web' ? (
                <Title>
                  <LinesEllipsis
                    text={title}
                    maxLine="2"
                    ellipsis="..."
                    trimRight
                    basedOn="letters"
                  />
                </Title>
              ) : (
                <Title numberOfLines={2}>{title}</Title>
              )}
              <SecondaryTitle>Prof. Nettie Mathis</SecondaryTitle>
            </TextWrapper>
            <TimeContainer>
              <TimeText>19:25 - 20:05</TimeText>
            </TimeContainer>
          </TopSection>
          {(venue || type) && (
            <TagsContainer>
              <TouchableOpacity onPress={onPress}>
                <Tag
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  colors={venue ? ['#C4E0E5', '#4CA1AF'] : ['#FFC371', '#FF5F6D']}
                  style={{
                    opacity: this.state.textAnimatedValue,
                    transform: [{ scale: this.state.tagAnimatedValue }],
                  }}>
                  <TagTitle>{venue || type}</TagTitle>
                </Tag>
              </TouchableOpacity>
            </TagsContainer>
          )}
        </Container>
      </TouchableOpacity>
    );
  }
}

export default withTheme(Card);
