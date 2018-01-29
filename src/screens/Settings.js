/* @flow */

import React from 'react';
import { withTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Screen, Section, SmallCard } from '../components';

type Props = {
  changeTheme: string => void,
  changeGlobalTheme: string => void,
  data: {
    theme: { type: string },
  },
};

class Settings extends React.Component<Props> {
  componentDidUpdate(oldProps) {
    if (oldProps.data.theme && oldProps.data.theme.type !== this.props.data.theme.type) {
      this.props.changeGlobalTheme(this.props.data.theme.type);
    }
  }
  _changeTheme = type => () => this.props.changeTheme(type);
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
                <MaterialIcons name="check-circle" size={24} color="white" />
              ) : null}
            </SmallCard>
            <SmallCard
              onPress={this._changeTheme('dark')}
              colors={['rgba(58, 67, 77, 1)', 'rgba(80, 99, 120, 1)']}
              title="Dark">
              {this.props.data.theme && this.props.data.theme.type === 'dark' ? (
                <MaterialIcons name="check-circle" size={24} color="rgba(66, 230, 149, 1)" />
              ) : null}
            </SmallCard>
            <SmallCard
              onPress={this._changeTheme('light')}
              titleStyles={{ color: 'rgb(70,70,70)', textShadowColor: 'transparent' }}
              colors={['rgba(237, 238, 240, 1)', 'rgba(135, 137, 140, 1)']}
              title="Light">
              {this.props.data.theme && this.props.data.theme.type === 'light' ? (
                <MaterialIcons name="check-circle" size={24} color="rgba(66, 230, 149, 1)" />
              ) : null}
            </SmallCard>
          </Section>
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
