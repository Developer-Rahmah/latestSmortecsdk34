import React from 'react';
import { createDrawerNavigator , DrawerItems, SafeAreaView} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import OrderScreen from '../screens/OrderScreen';
import ItemListScreen from '../screens/ItemListSreen';
import ItemScreen from '../screens/ItemScreen';
import {Icon} from 'native-base';
import ProfileScreen from '../screens/ProfileScreen'
import {ScreenNavigator} from './StackNavigatore';
import MainTabNavigator from './MainTabNavigator'
import SideMenu from './SideMenu';

import {DrawerNavigator} from 'react-navigation';

export default createDrawerNavigator({
    Home: {
            screen: HomeScreen,
          },
          ProfileScreen: {
             screen: ProfileScreen
          },
         
}, {
  contentComponent: SideMenu,
  drawerWidth: 300
});

