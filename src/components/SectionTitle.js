/* @flow */

import styled from 'styled-components/native';

const SectionTitle = styled.Text`
  background-color: transparent;
  color: ${({ theme }) => theme.sectionTitleColor};
  font-size: 19;
  font-weight: bold;
  margin-top: 16;
  margin-bottom: 18;
`;

export default SectionTitle;
