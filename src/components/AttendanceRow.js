 

import React from 'react';
import styled, { withTheme } from 'styled-components/native';
import { LinearGradient } from 'expo';
import color from 'color';

type Props = {
  title: string,
  severityLevel: 0 | 1 | 2 | 3,
  alternate?: boolean,
  theme: Object,
};

const Row = ({ title, severityLevel, alternate = false, theme }: Props) => (
  <Container
    start={{ x: 0, y: 0.5 }}
    end={{ x: 1, y: 0.5 }}
    colors={
      alternate
        ? [
            color(theme.cardBackgroundColor)
              .alpha(0.4)
              .darken(theme.type === 'light' ? 0.16 : 0)
              .rgb()
              .string(),
            color(theme.cardBackgroundColor)
              .alpha(0.1)
              .darken(theme.type === 'light' ? 0.16 : 0)
              .rgb()
              .string(),
          ]
        : ['transparent', 'transparent']
    }>
    <Avatar
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      colors={
        {
          '0': ['#00ACCF', '#78ffd6'],
          '1': ['#ffe259', '#ffa751'],
          '2': ['#fe8c00', '#F86800'],
          '3': ['#e43a15', '#e65245'],
        }[severityLevel]
      }>
      <AvatarText>{severityLevel}</AvatarText>
    </Avatar>
    <Title>{title}</Title>
  </Container>
);

const Container = styled(LinearGradient)`
  min-height: 72px;
  padding: 0px 16px;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  font-weight: 600;
  line-height: normal;
  font-size: 18px;
  color: ${({ theme }) => theme.primaryTextColor};
`;

const Avatar = styled(LinearGradient)`
  height: 42px;
  width: 42px;
  border-radius: 50%;
  background: #6fcf97;
  margin-right: 18px;
  justify-content: center;
  align-items: center;
`;

const AvatarText = styled.Text`
  font-weight: 600;
  line-height: normal;
  font-size: 19px;
  color: #ffffff;
`;

export default withTheme(Row);
