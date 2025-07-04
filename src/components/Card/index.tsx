import color from 'color';
import gql from 'graphql-tag';
import React, { useRef, useEffect } from 'react';
import { Platform, Animated, Easing } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

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
  secondaryTitle?: string;
  course: Course;
};

const slotsTiming = {
  '1': '8:15 - 9:45',
  '2': '10:00 - 11-30',
  '3': '11:45 - 1:15',
  '4': '1:45 - 3:15',
  '5': '3:45 - 5:15',
};

// CSS-based multi-line text truncation for web
const TruncatedTitle = styled(Title)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Card = ({ secondaryTitle, course }: Props) => {
  const theme = useTheme();
  const textAnimatedValue = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(textAnimatedValue.current, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }, []);

  const tags = [`Slot ${course.number}`, course.venue.room, course.type];
  const colors: readonly [string, string][] = [
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
      <TopSection style={{ opacity: textAnimatedValue.current }}>
        <TextWrapper>
          {Platform.OS === 'web' ? (
            <TruncatedTitle>{course.course.name}</TruncatedTitle>
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
          <Tag key={index} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={colors[index]}>
            <TagTitle>{tag.toUpperCase()}</TagTitle>
          </Tag>
        ))}
      </TagsContainer>
    </Container>
  );
};

Card.fragment = gql`
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

export default Card;
