import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Root } from "native-base";

import MainTabNavigator from './MainTabNavigator';
import {StackNavigatorSplash} from './StackNavigatorSplash'
// import HeaderNavigationBar from './HeaderNavigationBar'

export default createAppContainer(createSwitchNavigator({
  // Main: MainTabNavigator,
  StackNavigatorSplash: StackNavigatorSplash,
  // HeaderNavigationBar: HeaderNavigationBar
}));