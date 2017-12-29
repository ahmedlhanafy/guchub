/* @flow */

import React from 'react';
import { StatusBar, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';
import gql from 'graphql-tag';
import graphql from 'react-apollo/graphql';
import { Header, LoadingLayout, SequenceAnimator } from '../components';
import Classes from '../containers/Classes';
import Actions from '../containers/Actions';

export default graphql(gql`
  {
    student(username: "ahmed.elhanafy", password: "Mymy12345") {
      ...Schedule
    }
  }
  ${Classes.fragments.schedule}
`)(({ data: { loading, student } }) => (
  <LinearGradient
    start={{ x: 0.2, y: 0.2 }}
    end={{ x: 1, y: 1 }}
    colors={['rgba(200,200,200,0.3)', 'transparent']}
    style={styles.container}>
    <StatusBar barStyle="light-content" />
    <ScrollView>
      <Header
        title="Abdelrahman Maged"
        position="Engineering Student"
        profilePicUrl="https://randomuser.me/api/portraits/men/10.jpg">
        <Header.NotificationsBtn />
      </Header>
      {loading ? <LoadingLayout /> : null}
      {student ? (
        <SequenceAnimator animationDelay={900}>
          <Classes data={student.schedule} title="Today Classes" />
          {/*<Classes data={student.examsSchedule} title="Exams Schedule" />*/}
          <Actions />
        </SequenceAnimator>
      ) : null}
    </ScrollView>
  </LinearGradient>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
