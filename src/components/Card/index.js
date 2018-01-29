/* @flow */

import React, { PureComponent } from 'react';
import { Platform, TouchableOpacity, Animated, Easing } from 'react-native';
import LinesEllipsis from 'react-lines-ellipsis';
import color from 'color';
import { withTheme } from 'styled-components/native';
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
} from './Components';

type Props = {
  title: string,
  onPress: ?() => void,
  tags: Array<string>,
  theme: Object,
  timeText: string,
  secondaryTitle?: string,
};

type State = {
  textAnimatedValue: Object,
  tagAnimatedValue: Object,
};

class Card extends PureComponent<Props, State> {
  static defaultProps = {
    tags: [],
  };
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
    const { title, onPress, theme, tags, timeText, secondaryTitle } = this.props;
    const colors = [
      ['#F2994A', '#F2C94C'],
      ['#00ACCF', '#78ffd6'],
      ['rgba(242, 153, 74, 1)', 'rgba(235, 87, 87, 1)'],
      ['rgba(242, 153, 74, 1)', 'rgba(235, 87, 87, 1)'],
    ];
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
              {secondaryTitle && <SecondaryTitle>{secondaryTitle}</SecondaryTitle>}
            </TextWrapper>
            <TimeContainer>
              <TimeText>{timeText}</TimeText>
            </TimeContainer>
          </TopSection>
          <TagsContainer>
            {tags.map((tag, index) => (
              <Tag
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                colors={colors[index]}
                style={{
                  opacity: this.state.textAnimatedValue,
                  transform: [{ scale: this.state.tagAnimatedValue }],
                }}>
                <TagTitle>{tag}</TagTitle>
              </Tag>
            ))}
          </TagsContainer>
        </Container>
      </TouchableOpacity>
    );
  }
}

export default withTheme(Card);
