import color from 'color';
import React, { Fragment } from 'react';
import { Platform, TouchableOpacity, DimensionValue } from 'react-native';
import { Link } from 'react-router-native';
import styled, { useTheme } from 'styled-components/native';

interface ButtonProps {
  primary?: boolean;
  submit?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onPress?: () => void | Promise<void>;
}

// Beginning of super hacky stuff
const ButtonComponent = (props: ButtonProps) => {
  const theme = useTheme();

  const styles = {
    backgroundColor: props.primary
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
    borderRadius: '4px',
    marginBottom: 16,
    ...Platform.select({ web: { outline: 'none' } }),
  };

  return Platform.OS === 'web' && props.submit ? (
    <>
      <TouchableOpacity {...props} style={styles}>
        {props.children}
      </TouchableOpacity>
      <button type="submit" style={{ display: 'none' }} />
    </>
  ) : (
    <TouchableOpacity {...props} style={styles}>
      {props.children}
    </TouchableOpacity>
  );
};

const Button = ButtonComponent;
// End of super hacky stuff

const Title = styled.Text`
  background-color: transparent;
  color: white;
  font-weight: bold;
  font-size: 16.5px;
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
    <>
      <Title>{children.toString().toUpperCase()}</Title>
      {loading ? <LoadingIndicator color={primary ? 'white' : 'rgba(98, 205, 199, 1)'} /> : null}
    </>
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
