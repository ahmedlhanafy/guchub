/* @flow */

import React from 'react';
import styled from 'styled-components/native';
import { IconButton } from './';

const Row = ({
  text,
  onPress,
  danger = false,
  first = false,
}: {
  danger?: boolean,
  first?: boolean,
  text: string,
  onPress: () => void,
}) => (
  <Container first={first} onPress={onPress}>
    <Text danger={danger}>{text}</Text>
    <IconButton size={20} iconName="keyboard-arrow-right" />
  </Container>
);

const Container = styled.TouchableOpacity`
  padding: 4px 0px;
  border: 2px solid rgba(176, 176, 176, 0.1);
  border-top-width: ${({ first }) => (first ? '2px' : 0)};
  border-left-width: 0;
  border-right-width: 0;
  flex-direction: row;
  align-items: center;
  /* text-decoration: underline; */
`;

const Text = styled.Text`
  color: ${({ theme, danger }) => (danger ? '#ff5858' : theme.sectionTitleColor)};
  font-size: 16px;
  font-weight: 500;
  flex: 1;
`;

export default Row;
