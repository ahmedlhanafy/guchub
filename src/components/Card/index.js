/* @flow */

import React, { PureComponent } from 'react';
import gql from 'graphql-tag';
import { Platform, Animated, Easing } from 'react-native';
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
import type { Course } from '../../types/Course';

type Props = {
  theme: Object,
  secondaryTitle?: string,
  course: Course,
};

type State = {
  textAnimatedValue: Object,
};

const slotsTiming = {
  '1': '8:15 - 9:45',
  '2': '10:00 - 11-30',
  '3': '11:45 - 1:15',
  '4': '1:45 - 3:15',
  '5': '3:45 - 5:15',
};

class Card extends PureComponent<Props, State> {
  static fragment = gql`
    fragment CourseFragment on Slot {
      course {
        name
        absence {
          level
          severity
        }
      }
      number
      type
      venue {
        room
        building
      }
    }
  `;
  static defaultProps = {
    tags: [],
  };
  state = {
    textAnimatedValue: new Animated.Value(0),
  };
  componentDidMount() {
    Animated.timing(this.state.textAnimatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }

  render() {
    const { theme, secondaryTitle, course } = this.props;
    const tags = [`Slot ${course.number}`, course.venue.room, course.type];
    const colors = [
      ['#F2994A', '#F2C94C'],
      ['#00ACCF', '#78ffd6'],
      ['rgba(242, 153, 74, 1)', 'rgba(235, 87, 87, 1)'],
    ];
    return (
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
                  text={course.course.name}
                  maxLine="2"
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                />
              </Title>
            ) : (
              <Title numberOfLines={2}>{course.course.name}</Title>
            )}
            {secondaryTitle && <SecondaryTitle>{secondaryTitle}</SecondaryTitle>}
          </TextWrapper>
          <TimeContainer>
            <TimeText>{slotsTiming[course.number]}</TimeText>
          </TimeContainer>
        </TopSection>
        <TagsContainer>
          {tags.map((tag, index) => (
            <Tag start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={colors[index]}>
              <TagTitle>{tag}</TagTitle>
            </Tag>
          ))}
        </TagsContainer>
      </Container>
    );
  }
}

export default withTheme(Card);
