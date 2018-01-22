/* @flow */

import React from 'react';
import { AppRegistry } from 'react-native';
import Redbox from 'redbox-react';
import App from './App';

AppRegistry.registerComponent('App', () => () => <App />);
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});

// const runApp = () => {
//   AppRegistry.runApplication('App', {
//     initialProps: {},
//     rootTag: document.getElementById('root'),
//   });
// };
// if (process.env.NODE_ENV === 'development') {
//   /* This is done to avoid shipping redbox-react and react-hot-loader in the final bundle */
// //   const CustomErrorReporter = ({ error }: { error: Object }) => <Redbox error={error} />;
//   AppRegistry.registerComponent('App', () => () => <App />);
//   runApp();
// } else {
// }

// const iconFontStyles = `@font-face {
//     src: url(${iconFont});
//     font-family: Material Icons;
//   }`;

// // Create stylesheet
// const style = document.createElement('style');
// style.type = 'text/css';
// if (style.styleSheet) {
//   style.styleSheet.cssText = iconFontStyles;
// } else {
//   style.appendChild(document.createTextNode(iconFontStyles));
// }

// // Inject stylesheet
// document.head.appendChild(style);
