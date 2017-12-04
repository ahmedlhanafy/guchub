import React from 'react';
import { View, Text, Platform } from 'react-native';
import { LinearGradient } from '../../Components';

const Card = ({ title }) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    colors={['rgba(190,190,190,0.5)', 'rgba(160,160,160,0.3)']}
    style={{
      width: 320,
      paddingVertical: 14,
      paddingBottom: 18,
      paddingHorizontal: 16,
      height: Platform.select({ web: 160, ios: 140, android: 140 }),
      borderRadius: 4,
      shadowColor: 'black',
      shadowOpacity: 0.3,
      shadowRadius: 4,
      shadowOffset: {
        height: 2,
      },
      marginRight: 16,
    }}
  >
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            backgroundColor: 'transparent',
            color: 'rgba(255,255,255,0.8)',
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 4,
          }}
          numberOfLines={2}
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
          Prof. Nettie Mathis
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'rgba(190, 190, 190, 0.38)',
          height: 30,
          justifyContent: 'center',
          padding: 10,
          borderRadius: 4,
        }}
      >
        <Text
          style={{
            backgroundColor: 'transparent',
            color: 'rgba(255,255,255,0.8)',
            fontSize: 14,
            fontWeight: 'bold',
          }}
        >
          19:25 - 20:05
        </Text>
      </View>
    </View>
    <View style={{ flexDirection: 'row' }}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        colors={['#EFC7DE', '#B77EF1']}
        style={{
          padding: 8,
          borderRadius: 4,
          paddingHorizontal: 14,
        }}
      >
        <Text
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontWeight: 'bold',
            backgroundColor: 'transparent',
            fontSize: 12,
          }}
        >
          PROJECT
        </Text>
      </LinearGradient>
    </View>
  </LinearGradient>
);

export default Card;
