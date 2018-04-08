/* @flow */

import React from 'react';
import { Svg } from 'expo';

const { Line: SvgLine } = Svg;

type Props = {
  x: number => void,
  y: number => void,
};

const Line = ({ horizontal, color }: { horizontal: boolean, color: string }) => ({
  x,
  y,
}: Props) => (
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
