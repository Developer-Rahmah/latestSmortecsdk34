import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Root } from "native-base";

import MainTabNavigator from './MainTabNavigator';
import {StackNavigatorHome} from './StackNavigatorHome'
// import HeaderNavigationBar from './HeaderNavigationBar'

export default createAppContainer(createSwitchNavigator({
  // Main: MainTabNavigator,
  StackNavigatorHome: StackNavigatorHome,
  // HeaderNavigationBar: HeaderNavigationBar
}));