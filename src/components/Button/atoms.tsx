import * as React from 'react';
import styled, { withTheme, css } from 'styled-components/native';
import { Platform } from 'react-native';
import { Theme } from '../../constants/themes';
import color from 'color';

// Beginning of super hacky stuff
export const RNButton = withTheme(
  (props: any) =>
    Platform.OS === 'web' && props.submit ? (
      <>
        <ButtonWrapper {...props}>{props.children}</ButtonWrapper>
        <button type="submit" style={{ display: 'none' }} />
      </>
    ) : (
      <ButtonWrapper {...props} />
    )
) as any;
// End of super hacky stuff

const ButtonWrapper = styled.TouchableOpacity`
  ${(props: { primary: boolean }) => generateBtnStyles(props)};
`;

export const Title = styled.Text`
  background-color: transparent;
  color: white;
  font-weight: bold;
  font-size: 16.5;
`;

export const LoadingIndicator = styled.ActivityIndicator`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 16px;
`;

const generateBtnStyles = ({ primary }: { primary: boolean }) => css`
  background-color: ${({ theme }: { theme: Theme }) =>
    primary
      ? 'rgba(98, 205, 199, 1)'
      : color('#767A80')
          .alpha(theme.type === 'light' ? 1.0 : 0.3)
          .rgb()
          .string()};
  margin: 0px;
  height: 42px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 16px;
  ${Platform.select({ web: "outline: 'none'" })};
`;
