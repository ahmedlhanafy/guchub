/* @flow */

import React from 'react';
import { SequenceAnimator, SmallCard, Section } from '../components';

const Actions = () => (
  <Section title="Actions">
    <SequenceAnimator>
      <SmallCard to="/schedule" title="Schedule" colors={['#FCD5AC', '#F1837B']} />
      <SmallCard to="/attendance" title="Attendance" colors={['#49B4F1', '#8863F0']} />
      <SmallCard to="/transcript" title="Transcript" colors={['pink', 'purple']} />
    </SequenceAnimator>
  </Section>
);

export default Actions;
