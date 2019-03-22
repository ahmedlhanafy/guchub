import React from 'react';
import { TouchableOpacity, Linking } from 'react-native';
import { withTheme } from 'styled-components/native';
import { Screen } from '../../components';
import { Theme } from '../../constants';
import { Container, Text, Image, Bold, GithubIcon, Seperator } from './atoms.ts';

const About = ({ theme }: { theme: Theme }) => (
  <Screen>
    <Screen.Header to="/settings" title="About" animated back />
    <Screen.Content>
      <Container>
        <Text>
          We are two computer science majors who believe that GUCians deserve a better experience
          managing their academic life online.
        </Text>
        <Image
          resizeMode="contain"
          source={{
            uri:
              theme.type === 'light'
                ? 'https://user-images.githubusercontent.com/11808903/38215343-d80321de-36c7-11e8-8c0d-1431604d9ed5.png'
                : 'https://user-images.githubusercontent.com/11808903/38647866-bc04ab00-3dee-11e8-8403-9301ba3775de.png',
          }}
        />
        <Bold>Ahmed Elhanafy</Bold>
        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/ahmedlhanafy')}>
          <GithubIcon
            source={{
              uri:
                'https://user-images.githubusercontent.com/11808903/38215477-4d4e2c68-36c8-11e8-8240-73779aaab9c1.png',
            }}
          />
        </TouchableOpacity>
        <Seperator />
        <Image
          resizeMode="contain"
          source={{
            uri:
              theme.type === 'light'
                ? 'https://user-images.githubusercontent.com/11808903/38215351-e34a803c-36c7-11e8-87fa-0e578262c8df.png'
                : 'https://user-images.githubusercontent.com/11808903/38647860-b1c70a98-3dee-11e8-9210-67a738d9761e.png',
          }}
        />
        <Bold>Abdelrahman Maged</Bold>
        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/ar-maged')}>
          <GithubIcon
            source={{
              uri:
                'https://user-images.githubusercontent.com/11808903/38215477-4d4e2c68-36c8-11e8-8240-73779aaab9c1.png',
            }}
          />
        </TouchableOpacity>
        <Seperator />
        <Bold center={false}>Disclaimers</Bold>
        <Seperator height={8} />
        <Text center={false}>
          We assume no responsibility or liability for any loss or damage suffered by any person as
          a result of the use or misuse of any of the information or content on this app. We assume
          or undertake <Bold>NO LIABILITY</Bold> for any loss or damage suffered as a result of the
          use, misuse or reliance on the information and content on this app.
        </Text>
        <Seperator />
        <Text center={false}>
          We do not collect or store any usernames or passwords. Our code is open source on GitHub
          and readily available for inspection at all times.
        </Text>
      </Container>
    </Screen.Content>
  </Screen>
);

export default withTheme(About);
