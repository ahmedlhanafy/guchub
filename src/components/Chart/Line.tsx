import React from 'react';
import { Line as SvgLine } from 'react-native-svg';

type Props = {
  x: (a: number) => number;
  y: (a: number) => number;
};

const Line =
  ({ horizontal, color }: { horizontal: boolean; color: string }) =>
  ({ x, y }: Props) => (
    <SvgLine
      x1={horizontal ? x(0) : '0%'}
      x2={horizontal ? x(0) : '100%'}
      y1={!horizontal ? y(0) : '0%'}
      y2={!horizontal ? y(0) : '100%'}
      stroke={color}
      strokeWidth={4}
    />
  );

export default Line;
