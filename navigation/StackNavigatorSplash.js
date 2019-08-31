import React from 'react';
import { Root } from "native-base";

import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
// import OrderScreen from '../screens/OrderScreen';
import ItemListScreen from '../screens/ItemListSreen';
import ItemScreen from '../screens/ItemScreen';
import  CheckoutScreen from '../screens/CheckoutScreen'
import OrderScreen from '../screens/OrderScreen';
import WishListScreen from '../screens/WishListScreen';
import LoginSignupScreen from '../screens/LoginSignupScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import UpdateProfile from '../screens/UpdateProfile';
import SignUpVerficationScreen from '../screens/SignUpVerficationScreen';
import OrderAddedSuccesfully from '../screens/OrderAddedSuccesfully';
import RestPassword from '../screens/RestPassword';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import RestPasswordFinal from '../screens/RestPasswordFinal';
 import LoginScreen from '../screens/LoginScreen';
 import SignUpScreen from '../screens/SignUpScreen';
 import ForgetPasswordEmailScreen from '../screens/ForgetPasswordEmailScreen';
 import DrugStoreListing from '../screens/DrugStoreListing';
 import SubAgentListing from '../screens/SubAgentListing';
 import OrdersScreenOfTabs from '../screens/OrdersScreenOfTabs';
 import NotificationList from '../screens/NotificationList';
 import FaqsPage from '../screens/FaqsPage';
 import OrderDetails from '../screens/OrderDetails';
 import OrderDetailsOld from '../screens/OrderDetailsOld';
 import Splash from '../screens/Splash';
 import AboutUs from '../screens/AboutUs';
 import ReviewScreen from '../screens/ReviewScreen';

export const StackNavigatorSplash = createStackNavigator({

 
    Splash:{ 
        screen: Splash,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
        }
    },
    Home:{ 
        screen: HomeScreen,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
        }
    },
    LoginSignupScreen:{ 
        screen: LoginSignupScreen,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
        }
    },
    ItemListScreen:{
        screen: ItemListScreen,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
    ItemScreen: {
        screen: ItemScreen,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
    CheckoutScreen:{
        screen: CheckoutScreen,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
   
    OrderScreen: {
        screen : OrderScreen,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
    WishListScreen: {
        screen : WishListScreen,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
    SearchScreen: {
        screen : SearchScreen,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
    
  
    
    ProfileScreen: {
        screen : ProfileScreen,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
    SettingsScreen: {
        screen : SettingsScreen,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
    UpdateProfile: {
        screen : UpdateProfile,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    }, 
  
    SignUpVerficationScreen: {
        screen : SignUpVerficationScreen,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
    OrderAddedSuccesfully: {
        screen : OrderAddedSuccesfully,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
   
    RestPassword:{
        screen : RestPassword,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
    PrivacyPolicy:{
        screen : PrivacyPolicy,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
   
 
    RestPasswordFinal:
    {
        screen : RestPasswordFinal,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
   
   
    LoginScreen: {
        screen : LoginScreen,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
    SignUpScreen:
    {
        screen : SignUpScreen,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
    ForgetPasswordEmailScreen:
    {
        screen : ForgetPasswordEmailScreen,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
    DrugStoreListing:
    {
        screen : DrugStoreListing,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
    SubAgentListing: {
        screen : SubAgentListing,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
    OrdersScreenOfTabs:
    {
        screen : OrdersScreenOfTabs,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
    FaqsPage:
    {
        screen : FaqsPage,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
    NotificationList:
    {
        screen : NotificationList,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    },
    OrderDetails:{
        screen : OrderDetails,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    
    },
    OrderDetailsOld:{
        screen : OrderDetailsOld,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    
    },
    AboutUs:{
        screen : AboutUs,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    
    },
    
    ReviewScreen:{
        screen : ReviewScreen,
        navigationOptions: {
            headerTintColor: 'white', fontFamily:'Acens',//here I mean that the tintColor will be have that value on the CURRENT(!) screen,
            
            }
    
    },
  },
  {initialRouteName: 'Splash'},
  
  
  {
    // initialRouteName: 'LoginSignupScreen'

  }

  
//   {  headerMode: 'none'}
  )
//   _retrieveData = async () => {
//     try {
//       const value = await AsyncStorage.getItem('userID');
//       if (value !== null) {
//         // We have data!!
//         console.log('getstorageitem',value);
//          this.props.navigation.navigate('Home')
//       }
//     } catch (error) {
//       // Error retrieving data
//       console.log('getstorageitemerrrror',error);
//     }
//   };