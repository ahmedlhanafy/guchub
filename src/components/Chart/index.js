import React from 'react';
import { View } from 'react-native';
import { withTheme } from 'styled-components/native';
import color from 'color';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Text } from 'recharts';

import Section from '../Section.tsx';

export default withTheme(
  ({ theme: { secondaryTextColor }, grades }: { theme?: Theme, grades: any[] }) => {
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
          }}>
          <ResponsiveContainer>
            <LineChart data={grades} margin={{ top: 12, left: -22, right: 30 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="5%" stopColor="#66B6F0" stopOpacity={1} />
                  <stop offset="95%" stopColor="#8168E8" stopOpacity={1} />
                </linearGradient>
              </defs>
              <Line
                type="basis"
                dataKey="gpa"
                dot={false}
                stroke="url(#colorUv)"
                strokeWidth={2.8}
              />
              <XAxis
                tickLine={false}
                padding={{ top: 100 }}
                tick={
                  <CustomizedAxisTick
                    //Rename me
                    length={grades.length - 1}
                    labelsTextColor={labelsTextColor}
                  />
                }
                stroke={axesTextColor}
                dataKey="year"
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: labelsTextColor, fontSize: 13 }}
                tickLine={false}
                stroke={axesTextColor}
                interval={1}
              />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </View>
      </Section>
    );
  }
);

const CustomizedAxisTick = (props: {
  x?: number,
  y?: number,
  payload?: any,
  index?: number,
  labelsTextColor: string,
  length: number,
}) => {
  const { x, y, payload, index, labelsTextColor, length } = props;

  return index === 0 || index === length ? (
    <Text x={index === length ? x - 24 : x} y={y + 16} fill={labelsTextColor} fontSize={13}>
      {payload.value}
    </Text>
  ) : null;
};
