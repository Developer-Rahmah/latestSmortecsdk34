import React, {Component} from 'react';
import {   Card, CardItem, Left, Right, Text, Button, Body,Icon } from 'native-base';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,Share,ImageBackground,I18nManager,Dimensions,

} from 'react-native';
import { Localization } from 'expo-localization';
  import Expo from 'expo';
  
  
  
  import i18n from 'i18n-js';
  
  
  const en = {
      confirm: 'Confirm',
      jod: 'JOD',
    
     
  };
  const ar = {
    confirm: 'تأكيد',
      jod: 'دينار',
  };

export const Tag = ({...props}) => {
  console.log('tag id',props.item.id)

    let BaseURL = 'http://delico.qiotic.info';
    let item = props.item;

    console.log('iteeems',item)
    return (



        <TouchableOpacity
        onPress={() =>{
          props.navigate(props.item.id)
          }}
        // onPress={this.onFirstPreessed.bind(this)}
        style={{marginBottom: 20, flexDirection: 'row', borderRadius: 3, width: Dimensions.get('window').width / 3.7, height: 40, alignItems: 'center', justifyContent: 'center',backgroundColor: '#E8E8E8',marginEnd:3}}>

        <Text style={
           {  textAlign: 'center',
           alignItems: 'center', fontSize: 13,
           fontWeight: "normal",
           fontStyle: "normal", 
           fontFamily: "Acens",color: '#8FCFEB'}
        }>{item.name}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemText:{
      fontSize: 13,
      fontWeight: "normal",
      fontStyle: "normal",
      letterSpacing: 0,
      color: "#8FCFEB",fontFamily: "Acens"
      },
    red : {
        color: 'red',
        padding: 8
      },
      
    grey:{
        color: 'grey',
        padding: 8
      },
    itemPrice:{
      
      fontFamily: "newFont",
      fontSize: 12,
      fontWeight: "500",
      fontStyle: "normal",
      letterSpacing: 0,
      color: "#4d4d4d",
      backgroundColor:'transparent'
      },
})