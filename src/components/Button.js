/* @flow */

import React, { Fragment } from 'react';
import { Platform } from 'react-native';
import { Link } from 'react-router-native';
import styled from 'styled-components/native';
import color from 'color';

const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) =>
    color('#767A80')
      .alpha(theme.type === 'light' ? 1.0 : 0.3)
      .rgb()
      .string()};
  height: 42;
  justify-content: center;
  align-items: center;
  border-radius: 4;
  ${Platform.select({ web: 'outline: none;' })};
`;

const Title = styled.Text`
  background-color: transparent;
  color: white;
  font-weight: bold;
  font-size: 16.5;
`;

const LoadingIndicator = styled.ActivityIndicator`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 16px;
`;

export default ({
  onPress,
  children,
  to,
  loading,
  ...props
}: {
  onPress?: () => void | Promise<void>,
  children: any,
  to?: string,
  loading?: boolean,
}) => {
  const content = (
    <Fragment>
      <Title>{children.toString().toUpperCase()}</Title>
      {loading ? <LoadingIndicator color="rgba(98, 205, 199, 1)" /> : null}
    </Fragment>
  );

  return to ? (
    <Link component={Button} to={to}>
      {content}
    </Link>
  ) : (
    <Button onPress={onPress} {...props}>
      {content}
    </Button>
  );
};
