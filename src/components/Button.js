/* @flow */

import React, { Fragment } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';
import styled, { withTheme } from 'styled-components/native';
import color from 'color';

const styles = ({ primary, theme }) => ({
  backgroundColor: primary
    ? 'rgba(98, 205, 199, 1)'
    : color('#767A80')
        .alpha(theme.type === 'light' ? 1.0 : 0.3)
        .rgb()
        .string(),
  margin: 0,
  height: 42,
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 4,
  marginBottom: 16,
  ...Platform.select({ web: 'outline: none;' }),
});

// Beginning of super hacky stuff
const Button = withTheme(
  props =>
    Platform.OS === 'web' && props.submit ? (
      <Fragment>
        <TouchableOpacity {...props} style={styles(props)}>
          {props.children}
        </TouchableOpacity>
        <button type="submit" style={{ display: 'none' }} />
      </Fragment>
    ) : (
      <TouchableOpacity {...props} style={styles(props)} />
    )
);
// End of super hacky stuff

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
  primary = false,
  submit,
  ...props
}: {
  onPress?: () => void | Promise<void>,
  children: any,
  to?: string,
  loading?: boolean,
  submit?: boolean,
  primary?: boolean,
}) => {
  const content = (
    <Fragment>
      <Title>{children.toString().toUpperCase()}</Title>
      {loading ? <LoadingIndicator color={primary ? 'white' : 'rgba(98, 205, 199, 1)'} /> : null}
    </Fragment>
  );

  return to ? (
    <Link component={() => <Button submit={submit} primary {...props} />} to={to}>
      {content}
    </Link>
  ) : (
    <Button submit={submit} onPress={onPress} primary={primary} {...props}>
      {content}
    </Button>
  );
};
