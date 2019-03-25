import color from 'color';
import styled from "styled-components/native";
import { Theme } from '../../constants/themes';

export const Container = styled.View`
  align-items: center;
  padding: 16px 24px;
`;

export const Text = styled.Text`
  text-align: ${({ center = true }: { center?: boolean }) => (center ? 'center' : 'start')};
  color: ${({ theme }) =>
    color(theme.primaryTextColor)
      .alpha(0.86)
      .rgb()
      .toString()};
  width: 100%;
  font-size: 16px;
`;

type BoldProps = {
  theme?: Theme;
  center?: boolean;
};

export const Bold = styled.Text`
  color: ${({ theme }: BoldProps) =>
    color(theme && theme.primaryTextColor)
      .alpha(0.86)
      .rgb()
      .toString()};
  width: 100%;
  text-align: ${({ center = true }: BoldProps) => (center ? 'center' : 'start')};
  font-weight: bold;
  font-size: 16px;
`;

export const Image = styled.Image`
  width: 125px;
  height: 125px;
`;

export const GithubIcon = styled.Image`
  margin-top: 12px;
  width: 20px;
  height: 20px;
`;

export const Seperator = styled.View`
  height: ${({ height = 16 }: { height?: number }) => height}px;
`;
