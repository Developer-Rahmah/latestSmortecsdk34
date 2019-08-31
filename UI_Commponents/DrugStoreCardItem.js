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

export const DrugStoreCardItem = ({...props}) => {
    let BaseURL = 'https://smortec.com/';
    let item = props.item;
    let Order=props.Order;
    let wish=props.wish;
    console.log('ordersin add tocart',Order)
    console.log('test includes',Order.includes(item.products_id));
    console.log('wishin add tocart',wish)

    // console.log(Order.filter(Order, { products_id: 2 }));
    // console.log('teeeeeest',Order.find(x => x.products_id === 2))
    

    return (



      <Card cardBorderRadius={5}>
      <TouchableOpacity
        onPress={() =>{
            
          props.navigate(props.item.drugstore_id,props.item.drugstore_image,props.lang==1?item.drugstore_name:item.drugstore_name_ar,props.item.total)
          }}
      >
      <View style={{flexDirection:'column',height:Dimensions.get('window').width/2.07,justifyContent:'center',alignItems:'center'}}>
      {/* <Image source={{uri: BaseURL + '/' + item.products_image}} style={{height: '50%', width: '60%', flex: 1,resizeMode:'contain'}}/> */}

      <Image source={{uri:BaseURL + item.drugstore_image}} style={{height: '30%', width: '45%', resizeMode:'contain'}}/>
      <View  style={{justifyContent:'center',alignItems:'center',}} >
      <Text   numberOfLines={2}
 style={[styles.itemText,{marginTop:7,marginBottom:0,color:'#707070'}]}>{props.lang==1?item.drugstore_name:item.drugstore_name_ar}</Text>
 </View>
          {/* <View  style={{justifyContent:'center',alignItems:'center',height:190}} >
            <Image source={{uri: BaseURL + '/' + item.products_image}} style={{height: 190, width: '100%', flex: 1,resizeMode:'contain'}}/>
          </View>
          <View style={{marginEnd:5,marginStart:5}}>
          <Text   numberOfLines={2}
 style={[styles.itemText,{marginTop:0,width:150,marginBottom:0,}]}>{item.products_name}</Text>
              <View style={{height:5}}/>
              <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',marginBottom:15,alignItems:'center'}}>
              <View style={{alignItems:'flex-end'}}>  
              <Text style={styles.itemPrice}>{ item.products_weight_unit=='Piece'? parseFloat(item.products_price).toFixed(2):parseFloat(item.products_price*2).toFixed(2)}{I18nManager.isRTL?'دينار':'JOD'}</Text></View>
              <Image source={wish.includes(item.products_id) ? require('../assets/images/hart.png') : require('../assets/images/hartempty.png')} style={{width:17,height:23,marginBottom:10,resizeMode:'contain',}}/>
</View>
               </View> */}
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
      letterSpacing: 0,
      color: "#4d4d4d",
      backgroundColor:'transparent'
      },
})