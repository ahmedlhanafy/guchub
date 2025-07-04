import React from 'react';
import { useNavigate } from 'react-router-native';

import Toast from './Toast';

interface Props {
  isDemoUser: boolean;
}

const DemoUserToast = ({ isDemoUser }: Props) => {
  const navigate = useNavigate();

  return isDemoUser ? (
    <Toast
      shown
      text="You're viewing a demo user!"
      actions={[
        <Toast.Action
          key="login"
          onPress={() => {
            navigate('/login');
          }}
          text="LOGIN"
        />,
      ]}
      disappearing={false}
    />
  ) : null;
};

export default DemoUserToast;
