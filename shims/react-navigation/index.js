/*
 * @flow
 */

/* eslint global-require: 0 */

/*:: export type * from 'TypeDefinition'; */

module.exports = {
  // Core
  get createNavigationContainer() {
    return require('../../node_modules/react-navigation/src/createNavigationContainer')
      .default;
  },
  get StateUtils() {
    return require('../../node_modules/react-navigation/src/StateUtils')
      .default;
  },
  get addNavigationHelpers() {
    return require('../../node_modules/react-navigation/src/addNavigationHelpers')
      .default;
  },
  get NavigationActions() {
    return require('../../node_modules/react-navigation/src/NavigationActions')
      .default;
  },

  // Navigators
  get createNavigator() {
    return require('../../node_modules/react-navigation/src/navigators/createNavigator')
      .default;
  },
  get StackNavigator() {
    return require('../../node_modules/react-navigation/src/navigators/StackNavigator')
      .default;
  },
  get TabNavigator() {
    return require('../../node_modules/react-navigation/src/navigators/TabNavigator')
      .default;
  },
  get DrawerNavigator() {
    return require('../../node_modules/react-navigation/src/navigators/DrawerNavigator')
      .default;
  },

  // Routers
  get StackRouter() {
    return require('../../node_modules/react-navigation/src/routers/StackRouter')
      .default;
  },
  get TabRouter() {
    return require('../../node_modules/react-navigation/src/routers/TabRouter')
      .default;
  },

  // Views
  get Transitioner() {
    return require('../../node_modules/react-navigation/src/views/Transitioner')
      .default;
  },
  get CardStackTransitioner() {
    return require('../../node_modules/react-navigation/src/views/CardStack/CardStackTransitioner')
      .default;
  },
  get CardStack() {
    return require('../../node_modules/react-navigation/src/views/CardStack/CardStack')
      .default;
  },
  get Card() {
    return require('../../node_modules/react-navigation/src/views/CardStack/Card')
      .default;
  },
  get SafeAreaView() {
    return require('../../node_modules/react-navigation/src/views/SafeAreaView')
      .default;
  },

  // Header
  get Header() {
    return require('../../node_modules/react-navigation/src/views/Header/Header')
      .default;
  },
  get HeaderTitle() {
    return require('../../node_modules/react-navigation/src/views/Header/HeaderTitle')
      .default;
  },
  get HeaderBackButton() {
    return require('../../node_modules/react-navigation/src/views/Header/HeaderBackButton')
      .default;
  },

  // DrawerView
  get DrawerView() {
    return require('../../node_modules/react-navigation/src/views/Drawer/DrawerView')
      .default;
  },
  get DrawerItems() {
    return require('../../node_modules/react-navigation/src/views/Drawer/DrawerNavigatorItems')
      .default;
  },

  // TabView
  get TabView() {
    return require('../../node_modules/react-navigation/src/views/TabView/TabView')
      .default;
  },
  get TabBarTop() {
    return require('../../node_modules/react-navigation/src/views/TabView/TabBarTop')
      .default;
  },
  get TabBarBottom() {
    return require('../../node_modules/react-navigation/src/views/TabView/TabBarBottom')
      .default;
  },

  // HOCs
  get withNavigation() {
    return require('../../node_modules/react-navigation/src/views/withNavigation')
      .default;
  },
};
