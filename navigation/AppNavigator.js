import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Root } from "native-base";

import MainTabNavigator from './MainTabNavigator';
import {ScreenNavigator} from './StackNavigatore'
// import HeaderNavigationBar from './HeaderNavigationBar'

export default createAppContainer(createSwitchNavigator({
  // Main: MainTabNavigator,
  ScreenNavigator: ScreenNavigator,
  // HeaderNavigationBar: HeaderNavigationBar
}));