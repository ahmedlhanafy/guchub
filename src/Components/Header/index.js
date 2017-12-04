/* @flow */

import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import NotificationsBtn from './NotificationsBtn';

const Header = ({
  title,
  position,
  profilePicUrl,
  children,
}: {
  title: string,
  position: string,
  profilePicUrl: string,
  children: React.Element<*>,
}) => (
  <View style={styles.container}>
    <Image source={{ uri: profilePicUrl }} style={styles.avatar} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.position}>{position}</Text>
    </View>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    marginTop: Constants.statusBarHeight + 10,
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 52 / 2,
    borderColor: 'rgb(200,200,200)',
    borderWidth: 1.5,
    marginRight: 22,
  },
  textContainer: { flex: 1, justifyContent: 'center' },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  position: {
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    fontSize: 15,
  },
});

Header.NotificationsBtn = NotificationsBtn;

export default Header;
