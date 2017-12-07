/* @flow */

import React, { PureComponent } from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import LinesEllipsis from 'react-lines-ellipsis';
import { LinearGradient } from 'expo';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type Props = {
  title: string,
  onPress: ?func,
  venue: string,
};

class Card extends PureComponent<Props> {
  state = {
    textAnimatedValue: new Animated.Value(0),
    tagAnimatedValue: new Animated.Value(0),
  };
  componentDidMount() {
    Animated.timing(this.state.textAnimatedValue, {
      toValue: 1,
      duration: 1600,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
    Animated.timing(this.state.tagAnimatedValue, {
      toValue: 1,
      duration: 1300,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  }

  render() {
    const { title, onPress, venue, type } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <AnimatedLinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['rgba(190,190,190,0.5)', 'rgba(160,160,160,0.3)']}
          style={[styles.container]}>
          <Animated.View style={[styles.topSection, { opacity: this.state.textAnimatedValue }]}>
            <View style={styles.textWrapper}>
              {Platform.OS === 'web' ? (
                <View style={styles.title}>
                  <LinesEllipsis
                    text={title}
                    maxLine="2"
                    ellipsis="..."
                    trimRight
                    basedOn="letters"
                  />
                </View>
              ) : (
                <Text style={styles.title} numberOfLines={2}>
                  {title}
                </Text>
              )}
              <Text style={styles.profName}>Prof. Nettie Mathis</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>19:25 - 20:05</Text>
            </View>
          </Animated.View>
          {(venue || type) && (
            <View style={styles.tagsContainer}>
              <TouchableOpacity onPress={onPress}>
                <AnimatedLinearGradient
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  colors={venue ? ['#C4E0E5', '#4CA1AF'] : ['#FFC371', '#FF5F6D']}
                  style={[
                    styles.tag,
                    {
                      opacity: this.state.textAnimatedValue,
                      transform: [{ scale: this.state.tagAnimatedValue }],
                    },
                  ]}>
                  <Text style={styles.tagText}>{venue || type}</Text>
                </AnimatedLinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </AnimatedLinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    paddingVertical: 14,
    paddingBottom: 18,
    paddingHorizontal: 16,
    height: Platform.select({ web: 160, ios: 140, android: 140 }),
    borderRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
      width: 0,
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
