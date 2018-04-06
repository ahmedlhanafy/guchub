/* @flow */

import React from 'react';
import { Linking } from 'react-native';
import styled, { withTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Screen, Section, SmallCard, SequenceAnimator, SettingsRow } from '../components';

type Props = {
  changeTheme: string => void,
  data: {
    theme: { type: string },
  },
  history: Object,
};

const Footer = styled.View`
  width: 100%;
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
          <SequenceAnimator>
            <Section title="Theme">
              <SequenceAnimator>
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
              </SequenceAnimator>
            </Section>
            <Section title="Info">
              <Footer>
                <SettingsRow first text="About" onPress={() => this.props.history.push('/about')} />
                <SettingsRow
                  text="Why Another GUC App?"
                  onPress={() => this.props.history.push('/about')}
                />
                <SettingsRow
                  text="Leave Feedback"
                  onPress={() =>
                    Linking.openURL(
                      'mailto:ahmed.elhanafy95@gmail.com?subject=GUC Assistant Feedback'
                    )
                  }
                />
                <SettingsRow
                  text="Logout"
                  danger
                  onPress={() => this.props.history.push('/login')}
                />
              </Footer>
            </Section>
          </SequenceAnimator>
        </Screen.Content>
      </Screen>
    );
  }
}

const QUERY = gql`
  {
    theme @client {
      type
    }
  }
`;

const UPDATE_THEME_MUTATION = gql`
  mutation changeTheme($type: String) {
    changeTheme(type: $type) @client
  }
`;

export default compose(
  graphql(UPDATE_THEME_MUTATION, {
    props: ({ mutate }) => ({
      changeTheme: type => mutate({ variables: { type } }),
    }),
  }),
  graphql(QUERY),
  withTheme
)(Settings);
