/* @flow */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as shape from 'd3-shape';
import { withTheme } from 'styled-components/native';
import { Svg } from 'expo';
import color from 'color';
import { LineChart, YAxis, XAxis } from 'react-native-svg-charts';

import Section from '../Section';
import Line from './Line';

const { LinearGradient, Stop } = Svg;

export default withTheme(({ theme: { secondaryTextColor }, grades }) => {
  const axesTextColor = color(secondaryTextColor)
    .alpha(0.1)
    .rgb()
    .string();
  const labelsTextColor = color(secondaryTextColor)
    .alpha(0.5)
    .rgb()
    .string();

  return (
    <Section title="Grades Average" scrollable={false} style={{ maxWidth: 800 }}>
      <View
        style={{
          height: 200,
          flexDirection: 'row',
          padding: 16,
        }}>
        <YAxis
          numberOfTicks={3}
          dataPoints={grades.map(x => x.gpa)}
          labelStyle={[styles.axisLabel, { color: labelsTextColor }]}
          formatLabel={value => value}
        />
        <View style={{ flex: 1, transform: [{ scaleY: -1 }] }}>
          <LineChart
            showGrid={false}
            numberOfTicks={3}
            style={{ flex: 1, marginLeft: 16 }}
            dataPoints={grades.map(x => -1 * x.gpa)}
            svg={{
              strokeWidth: 3,
            }}
            shadowSvg={{
              stroke: 'rgba(100,100,100,.04)',
              strokeWidth: 6,
            }}
            renderGradient={({ id }) => (
              <LinearGradient id={id} x1={'0%'} y={'0%'} x2={'100%'} y2={'100%'}>
                <Stop offset={'0%'} stopColor={'#66B6F0'} stopOpacity={1} />
                <Stop offset={'100%'} stopColor={'#8168E8'} stopOpacity={1} />
              </LinearGradient>
            )}
            curve={shape.curveBasis}
            gridProps={{
              stroke: 'rgba(200, 200, 200, 0.3)',
              strokeDasharray: [4, 8],
              strokeWidth: 2,
            }}
            extras={[
              Line({ horizontal: true, color: axesTextColor }),
              Line({ horizontal: false, color: axesTextColor }),
            ]}
            renderExtra={({ item, ...args }) => item(args)}
          />
        </View>
      </View>
      <XAxis
        style={styles.xAxis}
        values={[grades[0].year, grades[grades.length - 1].year]}
        formatLabel={value => value}
        labelStyle={[styles.axisLabel, { color: labelsTextColor }]}
      />
    </Section>
  );
});

const styles = StyleSheet.create({
  xAxis: {
    paddingVertical: 16,
    paddingHorizontal: 22,
    paddingLeft: 42,
  },
  axisLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
});
