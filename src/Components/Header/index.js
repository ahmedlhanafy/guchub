import React from 'react';
import { Text, View, Image } from 'react-native';
// import { Constants } from 'expo';
import NotificationsBtn from './NotificationsBtn';

const Header = ({ title, position, profilePicUrl, children }) => (
  <View
    style={{
      paddingHorizontal: 16,
      paddingVertical: 8,
      flexDirection: 'row',
      marginTop: 22 + 10,
      alignItems: 'center',
    }}
  >
    <Image
      source={{ uri: profilePicUrl }}
      style={{
        width: 52,
        height: 52,
        borderRadius: 52 / 2,
        borderColor: 'rgb(200,200,200)',
        borderWidth: 1.5,
        marginRight: 22,
      }}
    />
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text
        style={{
          backgroundColor: 'transparent',
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 4,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          backgroundColor: 'transparent',
          color: 'rgba(255,255,255,0.6)',
          fontSize: 15,
        }}
      >
        {position}
      </Text>
    </View>
    {children}
  </View>
);

Header.NotificationsBtn = NotificationsBtn;

export default Header;
