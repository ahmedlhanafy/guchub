/* @flow */

import React from 'react';
import { AppRegistry } from 'react-native';
import iconFont from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
import Redbox from 'redbox-react';
import { AppContainer } from 'react-hot-loader';
import App from '../../src/App';

const CustomErrorReporter = ({ error }: { error: Object }) => <Redbox error={error} />;

const render = App =>
  AppRegistry.registerComponent('App', () => () => (
    <AppContainer errorReporter={CustomErrorReporter}>
      <App />
    </AppContainer>
  ));

render(App);

if (module.hot) {
  import('../../src/App').then(() => render(App));
}

AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});

const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: Material Icons;
}`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);
