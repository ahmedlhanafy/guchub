import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo';

const Card = () => (
  <LinearGradient
    start={[0, 0]}
    colors={['rgba(190,190,190,0.5)', 'rgba(160,160,160,0.3)']}
    style={{
      width: 320,
      paddingVertical: 14,
      paddingBottom: 18,
      paddingHorizontal: 16,
      height: 140,
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
        >
          Photography
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
        start={[0, 1]}
        locations={[0, 1]}
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
