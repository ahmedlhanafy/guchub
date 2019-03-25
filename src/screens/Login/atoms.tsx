import * as React from 'react';
import { Platform, View } from 'react-native';
import { TextField, TextFieldProps } from 'react-native-material-textfield';
import styled, { withTheme } from 'styled-components/native';
import { Theme } from '../../constants/themes';

export const Form = (props: any) =>
  Platform.OS === 'web' ? <form {...props} /> : <View {...props} />;

export const Logo = styled.Image`
  width: 120;
  height: 120;
  margin-bottom: 20;
`;

export const TextInput = withTheme((props: { theme?: Theme } & TextFieldProps) => (
  <TextField
    tintColor="rgba(98, 205, 199, 1)"
    textColor={props.theme && props.theme.primaryTextColor}
    baseColor={props.theme && props.theme.secondaryTextColor}
    style={{ ...Platform.select({ web: { outline: 'none' } }) } as any}
    {...props}
  />
));
