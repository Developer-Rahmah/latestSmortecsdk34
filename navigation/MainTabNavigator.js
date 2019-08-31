import React from 'react';
import { Platform ,Image,View,Dimensions} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import OrderScreen from '../screens/OrderScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WishListScreen from '../screens/WishListScreen';
import {ScreenNavigator} from './StackNavigatore';
// import HeaderNavigationBar from './HeaderNavigationBar'




// const HomeStack = createStackNavigator({

//   Home: HeaderNavigationBar,
// },
// { headerMode: 'none'});

// HomeStack.navigationOptions = {
//   tabBarLabel: 'Home',

//   tabBarOptions: {
//     activeTintColor :'#8FCFEB',
//    style: {
//     backgroundColor: 'white',
//     borderTopColor: "transparent"
//     // height:100,
//   },},
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-home`
//           : 'md-home'
//       }
//     />
//   ),
// };

const WishListStack = createStackNavigator({
  WishList : WishListScreen,
})

WishListStack.navigationOptions = {
  tabBarLabel: 'WishList',
  tabBarOptions: {
    activeTintColor :'#8FCFEB',
   style: {
    backgroundColor: 'white',
    // height:100,
    borderTopColor: "transparent"
    },},
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
    />
  ),
};

const OrderStack = createStackNavigator({
  Order: OrderScreen,
},{ headerMode: 'none'});

OrderStack.navigationOptions = {
  tabBarLabel: 'Cart',
  tabBarOptions: {
    activeTintColor :'#8FCFEB',
   style: {
    backgroundColor: 'white',
    borderTopColor: "transparent"
    // height:100,
  },},
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'md-appstore' : 'md-appstore'}
    />
  ),
};

const logoStack = createStackNavigator({
  logo: HomeScreen,
},{ headerMode: 'none'});

logoStack.navigationOptions = {
   tabBarLabel: '   ',
  tabBarOptions: {
    activeTintColor :'white',
   style: {
   

    backgroundColor: 'white',
    borderTopColor: "transparent"
    // height:100,

  } ,labelStyle: {
  },},
  tabBarIcon: ({ focused }) => (
    
    <View style={{width:50,height:100}}
      // focused={focused}
    >
        <Image source={require('../assets/images/logo.png')}
            style={{
                width: (Dimensions.get('window').width) / 5,marginLeft:-20,
                resizeMode: 'contain',
                height: (Dimensions.get('window').width) / 5,
                marginBottom:-20

            }}
        />
    </View>
  ),
};


const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarOptions: {
    activeTintColor :'#8FCFEB',
   style: {
    backgroundColor: 'white',
    borderTopColor: "transparent"
    // height:100,
  },},
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  // HomeStack,
  WishListStack,
  logoStack,
  OrderStack,
  SettingsStack,
  
});
