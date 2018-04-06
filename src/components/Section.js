/* @flow */

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  margin-top: 8px;
`;

const Title = styled.Text`
  background-color: transparent;
  color: ${({ theme }) => theme.sectionTitleColor};
  font-size: 19px;
  font-weight: bold;
  margin-left: 16px;
`;

const Section = ({
  children,
  title,
  scrollable = true,
  ...props
}: {
  children: any,
  scrollable?: boolean,
  title: string,
}) => (
  <Container {...props}>
    <Title>{title}</Title>
    {scrollable ? (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
        horizontal>
        {children}
      </ScrollView>
    ) : (
      <View style={styles.wrapper}>{children}</View>
    )}
  </Container>
);

const styles = StyleSheet.create({
  wrapper: { paddingLeft: 16, marginVertical: 18, width: '100%' },
});

export default Section;
