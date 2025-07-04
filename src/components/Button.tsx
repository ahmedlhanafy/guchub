import React, { Fragment } from 'react';
import { Platform, TouchableOpacity, DimensionValue } from 'react-native';
import { Link } from 'react-router-native';
import styled, { withTheme } from 'styled-components/native';
import color from 'color';

interface ButtonProps {
  primary?: boolean;
  theme: any;
  submit?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onPress?: () => void | Promise<void>;
}

const styles = ({ primary, theme }: ButtonProps) => ({
  backgroundColor: primary
    ? 'rgba(98, 205, 199, 1)'
    : color('#767A80')
        .alpha(theme.type === 'light' ? 1.0 : 0.3)
        .rgb()
        .string(),
  margin: 0,
  height: 42,
  width: '100%' as DimensionValue,
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
  borderRadius: 4,
  marginBottom: 16,
  ...Platform.select({ web: { outline: 'none' } }),
});

// Beginning of super hacky stuff
const ButtonComponent = (props: ButtonProps) =>
  Platform.OS === 'web' && props.submit ? (
    <Fragment>
      <TouchableOpacity {...props} style={styles(props)}>
        {props.children}
      </TouchableOpacity>
      <button type="submit" style={{ display: 'none' }} />
    </Fragment>
  ) : (
    <TouchableOpacity {...props} style={styles(props)}>
      {props.children}
    </TouchableOpacity>
  );

const Button = withTheme(ButtonComponent) as React.ComponentType<Omit<ButtonProps, 'theme'>>;
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
  disabled,
  ...props
}: {
  onPress?: () => void | Promise<void>;
  children: any;
  to?: string;
  loading?: boolean;
  submit?: boolean;
  primary?: boolean;
  disabled?: boolean;
}) => {
  const content = (
    <Fragment>
      <Title>{children.toString().toUpperCase()}</Title>
      {loading ? <LoadingIndicator color={primary ? 'white' : 'rgba(98, 205, 199, 1)'} /> : null}
    </Fragment>
  );

  return to ? (
    <TouchableOpacity style={{ zIndex: 5 }}>
      <Link to={to}>
        <Button submit={submit} primary={primary} disabled={disabled} {...props}>
          {content}
        </Button>
      </Link>
    </TouchableOpacity>
  ) : (
    <Button submit={submit} onPress={onPress} primary={primary} disabled={disabled} {...props}>
      {content}
    </Button>
  );
};
