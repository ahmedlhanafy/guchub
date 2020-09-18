/* @flow */

import React from 'react';
import { AppRegistry, Text } from 'react-native';
import App from './App';
import './styles.css';

AppRegistry.registerComponent('App', () => () => <App />);
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
