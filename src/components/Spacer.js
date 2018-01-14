/* @flow */

import React from 'react';
import styled from 'styled-components/native';

type Size = 'small' | 'medium' | 'large';

type Props = {
  size: Size,
  horizontal?: boolean,
};

const getSize = (horizontal: boolean = true) => (size: Size) =>
  size === 'small' ? 4 : size === 'medium' ? 8 : 16;

const generateSizeFromProps = ({ size, horizontal }) => getSize(horizontal)(size);

const Spacer = styled.View`
  width: ${generateSizeFromProps};
  min-width: ${generateSizeFromProps};
  max-width: ${generateSizeFromProps};
  height: ${generateSizeFromProps};
  min-height: ${generateSizeFromProps};
  max-height: ${generateSizeFromProps};
`;

export default (props: Props) => <Spacer {...props} />;
