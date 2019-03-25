import React from 'react';
import { Linking } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import gql from 'graphql-tag';
import { History } from 'history';
import { useMutation } from 'react-apollo-hooks';
import { Screen, Section, SmallCard, SequenceAnimator, SettingsRow } from '../components';
import { updateSettings } from '../utils';
import { useQuery } from '../hooks';

enum THEME_TYPE {
  AUTOMATIC = 'automatic',
  DARK = 'dark',
  LIGHT = 'light',
}

type Props = {
  history: History;
};

const Settings = (props: Props) => {
  const { data } = useQuery<{
    theme?: { type: THEME_TYPE };
  }>(QUERY);

  const changeTheme = useMutation(UPDATE_THEME_MUTATION);

  if (data === undefined) return null;

  const checkedIcon = data.theme ? (
    <CheckedIcon color={data.theme.type === THEME_TYPE.AUTOMATIC ? 'white' : undefined} />
  ) : null;

  const handleChangeTheme = (type: THEME_TYPE) => {
    changeTheme({ variables: { type } });
    updateSettings({ theme: type });
  };

  return (
    <Screen>
      <Screen.Header title="Settings" animated back />
      <Screen.Content>
        <SequenceAnimator>
          <Section title="Theme">
            <SequenceAnimator>
              <SmallCard
                onPress={() => handleChangeTheme(THEME_TYPE.AUTOMATIC)}
                colors={['rgba(66, 230, 149, 1)', 'rgba(59, 178, 184, 1)']}
                title="Automatic">
                {checkedIcon}
              </SmallCard>
              <SmallCard
                onPress={() => handleChangeTheme(THEME_TYPE.DARK)}
                colors={['#2b2f35', '#585b60']}
                title="Dark">
                {checkedIcon}
              </SmallCard>
              <SmallCard
                onPress={() => handleChangeTheme(THEME_TYPE.LIGHT)}
                titleStyles={{ color: 'rgb(70,70,70)', textShadowColor: 'transparent' }}
                colors={['rgba(237, 238, 240, 1)', 'rgba(135, 137, 140, 1)']}
                title="Light">
                {checkedIcon}
              </SmallCard>
            </SequenceAnimator>
          </Section>
          <Section title="Info">
            <Footer>
              <SettingsRow first text="About" onPress={() => props.history.push('/about')} />
              <SettingsRow
                text="Why Another GUC App?"
                onPress={() => props.history.push('/why-guchub')}
              />
              <SettingsRow
                text="Leave Feedback"
                onPress={() =>
                  Linking.openURL('mailto:ahmed.elhanafy95@gmail.com?subject=GUC Hub Feedback')
                }
              />
              <SettingsRow
                text="Source Code"
                onPress={() => Linking.openURL('https://github.com/ahmedlhanafy/guchub')}
              />
              <SettingsRow text="Logout" danger onPress={() => props.history.push('/login')} />
            </Footer>
          </Section>
        </SequenceAnimator>
      </Screen.Content>
    </Screen>
  );
};

const UPDATE_THEME_MUTATION = gql`
  mutation changeTheme($type: String) {
    changeTheme(type: $type) @client
  }
`;

const QUERY = gql`
  {
    theme @client {
      type
    }
  }
`;

const Footer = styled.View`
  width: 100%;
`;

const CheckedIcon = ({ color = 'rgba(66, 230, 149, 1)' }: { color?: string }) => (
  <MaterialIcons name="check-circle" size={24} color={color} />
);

export default Settings;
