/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View,Image,Platform} from 'react-native';
import {Icon} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  } 

  render () {
    return (
        <LinearGradient style={styles.container}
        colors={['#c9bf9223', '#8FCFEB']}>
        <ScrollView>
          <View style={{width:'100%',height:100,backgroundColor:'#8FCFEB',justifyContent:'center',flexDirection:'column',paddingStart:10}}>
          <Text style={{fontSize: 19,fontFamily:'newFontBold',
  fontWeight: "normal",
  fontStyle: "normal",
  
  letterSpacing: 0,
  textAlign: "left",
  color: "#ffffff"}} >login and register</Text>
          <Text style={{ fontFamily: "newFont",
      fontSize: 16,
      fontWeight: "normal",
      fontStyle: "normal",
      letterSpacing: 0,
      color: "white"}} >please login or create account</Text>

          </View>
          <View>
           
            <View style={styles.navSectionStyle}>
            <View style={{flexDirection:'row',borderBottomColor:'gray',borderBottomWidth:1,height:50,alignItems:'center',}}>
            <Icon style={{color:'gray',marginStart:10,}} name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }/>
            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Home')}>
              Home
              </Text>
              
              </View>
              <View style={{flexDirection:'row',borderBottomColor:'gray',borderBottomWidth:1,height:50,alignItems:'center',}}>
            <Icon style={{color:'gray',marginStart:10,}} name={
        Platform.OS === 'ios'
          ? `md-person`
          : 'md-person'
      }/>
            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('ProfileScreen')}>
                My Profile
              </Text>
              
              </View>
              <View style={{flexDirection:'row',borderBottomColor:'gray',borderBottomWidth:1,height:50,alignItems:'center',}}>
            <Icon style={{color:'gray',marginStart:10,}} name={
        Platform.OS === 'ios'
          ? `md-reorder`
          : 'md-reorder'
      }/>
            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('OrderScreen')}>
               My Order
              </Text>
              
              </View>

              <View style={{flexDirection:'row',borderBottomColor:'gray',borderBottomWidth:1,height:50,alignItems:'center',}}>
            <Icon style={{color:'gray',marginStart:10,}} name={
        Platform.OS === 'ios'
          ? `md-heart`
          : 'md-heart'
      }/>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('OfferScreen')}>
             OfferScreen
              </Text>
              
              </View>
             
            
            </View>
          </View>
        </ScrollView>
       
      </LinearGradient>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;