import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';

const Card = ({ title }: { title: string }) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    colors={['rgba(190,190,190,0.5)', 'rgba(160,160,160,0.3)']}
    style={styles.container}
  >
    <View style={styles.topSection}>
      <View style={styles.textWrapper}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.profName}>Prof. Nettie Mathis</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>19:25 - 20:05</Text>
      </View>
    </View>
    <View style={styles.tagsContainer}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        colors={['#EFC7DE', '#B77EF1']}
        style={styles.tag}
      >
        <Text style={styles.tagText}>PROJECT</Text>
      </LinearGradient>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
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
  },
  topSection: { flexDirection: 'row', flex: 1 },
  textWrapper: { flex: 1 },
  title: {
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profName: {
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    fontSize: 15,
  },
  timeContainer: {
    backgroundColor: 'rgba(190, 190, 190, 0.38)',
    height: 30,
    justifyContent: 'center',
    padding: 10,
    borderRadius: 4,
  },
  time: {
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tagsContainer: { flexDirection: 'row' },
  tag: {
    padding: 8,
    borderRadius: 4,
    paddingHorizontal: 14,
  },
  tagText: {
    color: 'rgba(255,255,255,0.8)',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    fontSize: 12,
  },
});

export default Card;
