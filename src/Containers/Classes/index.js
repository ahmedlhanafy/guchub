/* @flow */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import gql from 'graphql-tag';
import Card from './Card';
import { SequenceAnimator } from '../../components';

const Container = styled.View`
  margin-top: 16;
`;

const Title = styled.Text`
  padding-left: 16;
  background-color: transparent;
  color: ${({ theme }) => theme.sectionTitleColor};
  font-size: 19;
  font-weight: bold;
`;

const Classes = ({ data, title }) => (
  <Container>
    <Title>{title}</Title>
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainerStyle}
      horizontal>
      <SequenceAnimator>
        {data.map(({ course: { name }, venue, type }, index) => (
          <Card key={index} title={name} venue={venue} type={type} />
        ))}
      </SequenceAnimator>
    </ScrollView>
  </Container>
);

const styles = StyleSheet.create({
  scrollViewContainerStyle: { paddingLeft: 16, paddingVertical: 16 },
});

Classes.fragments = {
  schedule: gql`
    fragment Schedule on Student {
      schedule {
        course {
          name
        }
        type
        venue
      }
    }
  `,
  examsSchedule: gql`
    fragment ExamsSchedule on Student {
      examsSchedule {
        course
        dateTime
        seat
        venue
      }
    }
  `,
};

export default Classes;
