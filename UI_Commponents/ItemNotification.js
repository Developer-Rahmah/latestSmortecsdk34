
import React, {Component} from 'react';
import {   Card, CardItem, Left, Right, Text, Button, Body,Icon } from 'native-base';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,Share,ImageBackground,I18nManager

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

export const ItemNotification = ({...props}) => {
    let BaseURL = 'http://delico.qiotic.info';
    let item = props.item;
    let index=props.index;
    console.log('ntify prrops',item)
    return (



      <Card cardBorderRadius={5} style={{height:45,justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity
       
      >
        
          <View style={{backgroundColor:'transparent',justifyContent:'space-between',alignItems:'center'}} >
             <View style={{justifyContent:'space-between',alignItems:'center',width:'97%',flexDirection:'row',}}>
                          <View style={{flexDirection:'row',alignItems:'center'}}>
<View style={{width:20}}/>
             <Icon name='md-notifications'  color='black' style={{color:'black',}} />  
             <View style={{width:5}}/>
                 <Text style={[styles.itemText,{marginTop:0,marginBottom:0,width:"70%"}]}>{item.text}</Text>
                 </View>
                 <TouchableOpacity onPress={() =>  props.onDelete(index,item)}>

                                                  <Icon name='ios-trash'  color='black' style={{color:'black',marginEnd:17}}  /> 
                                                  <View style={{width:5}}/>
 
</TouchableOpacity>
</View>
            
            </View>
            </TouchableOpacity>
            
        </Card>


       
    )
}

const styles = StyleSheet.create({
    itemText:{
      fontSize: 13,
      fontWeight: "normal",
      fontStyle: "normal",
      letterSpacing: 0,
      color: "#8FCFEB",fontFamily: "newFont"
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
      lineHeight: 13,
      letterSpacing: 0,
      color: "#4d4d4d",
      backgroundColor:'transparent'
      },
})