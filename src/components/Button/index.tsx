import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Link } from 'react-router-native';
import { Title, LoadingIndicator, RNButton } from './atoms';

type Props = {
  children: any;
  loading?: boolean;
  submit?: boolean;
  primary?: boolean;
  to?: string;
  onPress?: () => void | Promise<void>;
} & TouchableOpacityProps;

const Button = ({ onPress, children, to, loading, primary = false, submit, ...props }: Props) => {
  const content = (
    <>
      <Title>{children.toString().toUpperCase()}</Title>
      {loading ? <LoadingIndicator color={primary ? 'white' : 'rgba(98, 205, 199, 1)'} /> : null}
    </>
  );

  return to ? (
    <Link component={() => <RNButton submit={submit} primary {...props} />} to={to}>
      {content}
    </Link>
  ) : (
    <RNButton submit={submit} onPress={onPress} primary={primary} {...props}>
      {content}
    </RNButton>
  );
};

export default Button;
