/* @flow */

import React from 'react';
import { AppRegistry } from 'react-native';
// import iconFont from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';

import App from '../../src/App';

const runApp = () => {
  AppRegistry.runApplication('App', {
    initialProps: {},
    rootTag: document.getElementById('root'),
  });
};

(() => {
  if (process.env.NODE_ENV === 'development') {
    /* This is done to avoid shipping redbox-react and react-hot-loader in the final bundle */
    Promise.all([import('redbox-react'), import('react-hot-loader')]).then(
      ([Redbox, HotLoader]) => {
        const { AppContainer } = HotLoader;
        const CustomErrorReporter = ({ error }: { error: Object }) => <Redbox error={error} />;
        const render = App =>
          AppRegistry.registerComponent('App', () => () => (
            <AppContainer errorReporter={CustomErrorReporter}>
              <App />
            </AppContainer>
          ));
        render(App);
        runApp();

        if (module.hot) {
          import('../../src/App').then(() => render(App));
        }
      }
    );
  } else {
    AppRegistry.registerComponent('App', () => () => <App />);
    runApp();
  }
})();

// const iconFontStyles = `@font-face {
//   src: url(${iconFont});
//   font-family: Material Icons;
// }`;

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
