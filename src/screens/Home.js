/* @flow */

import React from 'react';
import { StatusBar, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';
import { withTheme } from 'styled-components/native';
import gql from 'graphql-tag';
import graphql from 'react-apollo/graphql';
import color from 'color';
import { LoadingLayout, SequenceAnimator, Header, Chart } from '../components';
import Classes from '../containers/Classes';
import Actions from '../containers/Actions';

const QUERY = gql`
  {
    student(username: "ahmed.elhanafy", password: "Fyfy12345") {
      ...Schedule
      courses {
        name
        exam {
          venue
          seat
        }
      }
      transcript {
        semesters {
          year
          gpa
        }
      }
    }
  }
  ${Classes.fragments.schedule}
`;

const Home = ({ data: { loading, student }, theme, toggleTheme }) => (
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
    style={styles.container}>
    <StatusBar barStyle={theme.type === 'light' ? 'dark-content' : 'light-content'} />
    <Header>
      <Header.title>Feed</Header.title>
      <Header.notifBtn onPress={toggleTheme} />
    </Header>
    <ScrollView>
      {/* <Header
        title="Abdelrahman Maged"
        position="Engineering Student"
        profilePicUrl="https://randomuser.me/api/portraits/men/10.jpg">
        <Header.NotificationsBtn />
      </Header> */}
      {loading ? <LoadingLayout /> : null}
      {student ? (
        <SequenceAnimator animationDelay={900}>
          {student.schedule.length > 0 && (
            <Classes schedule={student.schedule} title="Today Classes" />
          )}
          {student.courses.length > 0 && <Classes exams={student.courses} title="Exams Schedule" />}
          <Actions />
          <Chart grades={student.transcript.semesters} />
        </SequenceAnimator>
      ) : null}
    </ScrollView>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default graphql(QUERY)(withTheme(Home));
