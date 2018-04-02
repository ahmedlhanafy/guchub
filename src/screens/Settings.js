/* @flow */

import React from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import styled, { withTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Screen, Section, SmallCard } from '../components';

type Props = {
  changeTheme: string => void,
  data: {
    theme: { type: string },
  },
};

const Seperator = styled.View`
  background-color: rgba(176, 176, 176, 0.1);
  height: 2px;
  margin: 16px;
`;

const CenteredLayout = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Link = styled.Text`
  background-color: transparent;
  color: ${({ theme }) => theme.sectionTitleColor};
  font-size: 16px;
  font-weight: 500;
  margin: 0px 6px;
  text-decoration: underline;
`;

const CheckedIcon = ({ color = 'rgba(66, 230, 149, 1)' }: { color?: string }) => (
  <MaterialIcons name="check-circle" size={24} color={color} />
);

class Settings extends React.Component<Props> {
  _changeTheme = type => () => {
    this.props.changeTheme(type);
  };
  render() {
    return (
      <Screen>
        <Screen.Header title="Settings" animated back />
        <Screen.Content>
          <Section title="Theme">
            <SmallCard
              onPress={this._changeTheme('automatic')}
              colors={['rgba(66, 230, 149, 1)', 'rgba(59, 178, 184, 1)']}
              title="Automatic">
              {this.props.data.theme && this.props.data.theme.type === 'automatic' ? (
                <CheckedIcon color="white" />
              ) : null}
            </SmallCard>
            <SmallCard
              onPress={this._changeTheme('dark')}
              colors={['rgba(58, 67, 77, 1)', 'rgba(80, 99, 120, 1)']}
              title="Dark">
              {this.props.data.theme && this.props.data.theme.type === 'dark' ? (
                <CheckedIcon />
              ) : null}
            </SmallCard>
            <SmallCard
              onPress={this._changeTheme('light')}
              titleStyles={{ color: 'rgb(70,70,70)', textShadowColor: 'transparent' }}
              colors={['rgba(237, 238, 240, 1)', 'rgba(135, 137, 140, 1)']}
              title="Light">
              {this.props.data.theme && this.props.data.theme.type === 'light' ? (
                <CheckedIcon />
              ) : null}
            </SmallCard>
          </Section>
          <Seperator />
          <Footer />
        </Screen.Content>
      </Screen>
    );
  }
}

const Footer = () => (
  <CenteredLayout>
    <TouchableOpacity>
      <Link>About</Link>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() =>
        Linking.openURL('mailto:ahmed.elhanafy95@gmail.com?subject=GUC Assistant Feedback')
      }>
      <Link>Leave Feedback</Link>
    </TouchableOpacity>
  </CenteredLayout>
);

const QUERY = gql`
  {
    theme @client {
      type
    }
  }
`;

const UPDATE_NETWORK_STATUS = gql`
  mutation changeTheme($type: String) {
    changeTheme(type: $type) @client
  }
`;

export default compose(
  graphql(UPDATE_NETWORK_STATUS, {
    props: ({ mutate }) => ({
      changeTheme: type => mutate({ variables: { type } }),
    }),
  }),
  graphql(QUERY),
  withTheme
)(Settings);
