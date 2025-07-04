import { useQuery, useMutation } from '@apollo/client';
import { MaterialIcons } from '@expo/vector-icons';
import gql from 'graphql-tag';
import get from 'lodash.get';
import React from 'react';
import { Linking } from 'react-native';
import { useNavigate } from 'react-router-native';
import styled from 'styled-components/native';

import { Screen, Section, SmallCard, SequenceAnimator, SettingsRow } from '../components';
import { updateSettings } from '../utils';

const Footer = styled.View`
  width: 100%;
`;

const CheckedIcon = ({ color = 'rgba(66, 230, 149, 1)' }: { color?: string }) => (
  <MaterialIcons name="check-circle" size={24} color={color} />
);

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

const Settings = () => {
  const [saveThemeMutation] = useMutation(UPDATE_THEME_MUTATION);
  const navigate = useNavigate();

  const { data } = useQuery(QUERY);
  const activeTheme = get(data, 'theme.type');

  const changeTheme = (type: string) => () => {
    saveThemeMutation({ variables: { type } });
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
                onPress={changeTheme('automatic')}
                colors={['rgba(66, 230, 149, 1)', 'rgba(59, 178, 184, 1)']}
                title="Automatic">
                {activeTheme === 'automatic' ? <CheckedIcon color="white" /> : null}
              </SmallCard>
              <SmallCard onPress={changeTheme('dark')} colors={['#2b2f35', '#585b60']} title="Dark">
                {activeTheme === 'dark' ? <CheckedIcon /> : null}
              </SmallCard>
              <SmallCard
                onPress={changeTheme('light')}
                titleStyles={{ color: 'rgb(70,70,70)', textShadowColor: 'transparent' }}
                colors={['rgba(237, 238, 240, 1)', 'rgba(135, 137, 140, 1)']}
                title="Light">
                {activeTheme === 'light' ? <CheckedIcon /> : null}
              </SmallCard>
            </SequenceAnimator>
          </Section>
          <Section title="Info">
            <Footer>
              <SettingsRow first text="About" onPress={() => navigate('/about')} />
              <SettingsRow text="Why Another GUC App?" onPress={() => navigate('/why-guchub')} />
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
              <SettingsRow text="Logout" danger onPress={() => navigate('/login')} />
            </Footer>
          </Section>
        </SequenceAnimator>
      </Screen.Content>
    </Screen>
  );
};

export default Settings;
