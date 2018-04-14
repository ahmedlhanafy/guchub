/* @flow */

import React from 'react';
import color from 'color';
import styled, { withTheme } from 'styled-components/native';
import { Screen } from '../components';

const WhyGUCHub = ({ theme }) => (
  <Screen>
    <Screen.Header to="/settings" title="Why Another GUC App?" animated back />
    <Screen.Content>
      <Container>
        <TextContainer>
          <Text paddingRight={16}>•</Text>
          <Text>
            This project is an extensible medium that fosters creativity, so we keenly encourage all
            contributions. Please send us feedback with any ideas you have in mind. If you are a
            developer, feel free to collaborate with us! 🤗
          </Text>
        </TextContainer>
        <Seperator />
        <TextContainer>
          <Text paddingRight={16}>•</Text>
          <Text>
            Instead of having to deal with the aesthetically antiquated official GUC mobile
            application every day, we offer you a tasteful experience to manage your academic life
            online with elegance and ease ✨
          </Text>
        </TextContainer>
        <Seperator />

        <TextContainer>
          <Text paddingRight={16}>•</Text>
          <Text>
            We heavily secure the transmission of your account's credentials, unlike the official
            GUC mobile application 🔒
          </Text>
        </TextContainer>
        <Seperator />
        <TextContainer>
          <Text paddingRight={16}>•</Text>
          <Text>
            Both the frontend and the backend are open-source projects that you can benefit from and
            directly collaborate to ♻️
          </Text>
        </TextContainer>
        <Seperator />
        <TextContainer>
          <Text paddingRight={16}>•</Text>
          <Text>
            You are already having a hard time dealing with your studies. Let us make it a bit more
            pleasant for you 🙈
          </Text>
        </TextContainer>
      </Container>
    </Screen.Content>
  </Screen>
);

const Container = styled.View`
  padding: 16px 24px;
`;
const TextContainer = styled.View`
  flex-direction: row;
`;

const Text = styled.Text`
  color: ${({ theme }) =>
    color(theme.primaryTextColor)
      .alpha(0.86)
      .rgb()
      .toString()};
  font-size: 16px;
  line-height: 24px;
  padding-right: ${({ paddingRight }) => paddingRight || 0}px;
`;

const Seperator = styled.View`
  height: ${({ height = '16px' }) => height};
`;

export default withTheme(WhyGUCHub);
