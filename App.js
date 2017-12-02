/* @flow */

import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo';
import Header from './Header';

export default class App extends React.Component {
  render() {
    return (
      <LinearGradient
        start={[0.2, 0.2]}
        colors={['rgba(200,200,200,0.2)', 'transparent']}
        style={styles.container}
      >
        <StatusBar barStyle="light-content" />
        <Header
          title="Ahmed Elhanafy"
          position="Engineering Student"
          profilePicUrl="https://randomuser.me/api/portraits/men/27.jpg"
        >
          <Header.NotificationsBtn />
        </Header>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B333E',
  },
});
