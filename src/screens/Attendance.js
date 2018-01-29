import React from 'react';
import { withTheme } from 'styled-components/native';
import { Screen, Section, SmallCard } from '../components';

class Attendance extends React.Component {
  render() {
    const cardProps = {
      colors: ['rgba(66, 230, 149, 1)', 'rgba(59, 178, 184, 1)'],
    };
    const altCardProps = {
      colors: ['rgba(93, 104, 116, 1)', 'rgba(227, 227, 227, 1)'],
      // titleStyles: { color: 'rgb(20,20,20)', textShadowColor: 'transparent' },
    };
    return (
      <Screen>
        <Screen.Header title="Attendance" animated back />
        <Screen.Content>
          <Section title="Artifical Inteligence">
            <SmallCard title={'Thu 1/20\nSlot 2'} {...cardProps} />
            <SmallCard title={'Thu 1/20\nSlot 2'} {...cardProps} />
            <SmallCard title={'Thu 1/20\nSlot 2'} {...altCardProps} />
            <SmallCard title={'Thu 1/20\nSlot 2'} {...cardProps} />
          </Section>
          <Section title="Advanced Computer Lab">
            <SmallCard title={'Thu 1/20\nSlot 2'} {...altCardProps} />
            <SmallCard title={'Thu 1/20\nSlot 2'} {...cardProps} />
            <SmallCard title={'Thu 1/20\nSlot 2'} {...altCardProps} />
            <SmallCard title={'Thu 1/20\nSlot 2'} {...cardProps} />
          </Section>
          <Section title="Computer Vision">
            <SmallCard title={'Thu 1/20\nSlot 2'} {...cardProps} />
            <SmallCard title={'Thu 1/20\nSlot 2'} {...cardProps} />
            <SmallCard title={'Thu 1/20\nSlot 2'} {...altCardProps} />
            <SmallCard title={'Thu 1/20\nSlot 2'} {...cardProps} />
          </Section>
          <Section title="Natural Langauge Processing">
            <SmallCard title={'Thu 1/20\nSlot 2'} {...cardProps} />
            <SmallCard title={'Thu 1/20\nSlot 2'} {...cardProps} />
            <SmallCard title={'Thu 1/20\nSlot 2'} {...altCardProps} />
            <SmallCard title={'Thu 1/20\nSlot 2'} {...cardProps} />
          </Section>
        </Screen.Content>
      </Screen>
    );
  }
}

export default withTheme(Attendance);
