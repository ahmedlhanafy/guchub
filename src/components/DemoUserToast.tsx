import React from 'react';
import { withRouter } from 'react-router-native';
import Toast from './Toast';

interface Props {
  isDemoUser: boolean;
  history: {
    push: (path: string) => void;
  };
}

const DemoUserToast = ({ isDemoUser, history }: Props) =>
  isDemoUser ? (
    <Toast
      shown
      text="You're viewing a demo user!"
      actions={[
        <Toast.Action
          key="login"
          onPress={() => {
            history.push('/login');
          }}
          text="LOGIN"
        />,
      ]}
      disappearing={false}
    />
  ) : null;

export default withRouter(DemoUserToast); 