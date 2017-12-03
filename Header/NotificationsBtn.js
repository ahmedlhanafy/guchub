import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';

const NotificationsBtn = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      start={[0, 0]}
      colors={['rgba(190,190,190,0.3)', 'rgba(160,160,160,0.25)']}
      style={{
        width: 40,
        height: 40,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: '#4CE4CA',
          width: 16,
          height: 16,
          borderRadius: 16 / 2,
          position: 'absolute',
          top: -5,
          right: -5,
          borderWidth: 3,
          borderColor: '#38434F',
        }}
      />
      <MaterialIcons
        size={22}
        style={{
          backgroundColor: 'transparent',
          color: 'rgba(255,255,255,0.7)',
        }}
        name="notifications-none"
      />
    </LinearGradient>
  </TouchableOpacity>
);

export default NotificationsBtn;
