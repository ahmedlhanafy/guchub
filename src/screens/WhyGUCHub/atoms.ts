import color from 'color';
import styled from 'styled-components/native';
import { Theme } from '../../constants/themes';

export const Container = styled.View`
  padding: 16px 24px;
`;
export const TextContainer = styled.View`
  flex-direction: row;
`;

type TextProps = {
  theme?: Theme;
  paddingRight?: number;
};

export const Text = styled.Text`
  color: ${({ theme }: TextProps) =>
    color(theme && theme.primaryTextColor)
      .alpha(0.86)
      .rgb()
      .toString()};
  font-size: 18px;
  line-height: 24px;
  padding-right: ${({ paddingRight = 0 }: TextProps) => paddingRight}px;
`;

export const Seperator = styled.View`
  height: ${({ height = 16 }: { height?: number }) => height}px;
`;
