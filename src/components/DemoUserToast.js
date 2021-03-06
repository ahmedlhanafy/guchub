import React from 'react';
import { withRouter } from 'react-router-native';
import Toast from './Toast';

const DemoUserToast = ({ isDemoUser, history }) =>
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
