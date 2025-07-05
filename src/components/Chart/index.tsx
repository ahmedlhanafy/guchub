import color from 'color';
import React from 'react';
import { View, Platform } from 'react-native';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Text } from 'recharts';
import { useTheme } from 'styled-components/native';

import Section from '../Section';

interface ChartProps {
  grades: { year: string; gpa: number }[];
}

const Chart = ({ grades }: ChartProps) => {
  const theme = useTheme();
  
  // Only render charts on web platform since recharts is web-only
  if (Platform.OS !== 'web') {
    return null;
  }
  
  const axesTextColor = color(theme.secondaryTextColor).alpha(0.1).rgb().string();
  const labelsTextColor = color(theme.secondaryTextColor).alpha(0.5).rgb().string();

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
            <Line type="basis" dataKey="gpa" dot={false} stroke="url(#colorUv)" strokeWidth={2.8} />
            <XAxis
              tickLine={false}
              padding={{ left: 10, right: 10 }}
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
              tick={{ fill: labelsTextColor, fontSize: '13px' }}
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
};

const CustomizedAxisTick = (props: {
  x?: number;
  y?: number;
  payload?: any;
  index?: number;
  labelsTextColor: string;
  length: number;
}) => {
  const { x, y, payload, index, labelsTextColor, length } = props;

  return index === 0 || index === length ? (
    <Text x={index === length ? x - 24 : x} y={y + 16} fill={labelsTextColor} fontSize="13px">
      {payload.value}
    </Text>
  ) : null;
};

export default Chart;
