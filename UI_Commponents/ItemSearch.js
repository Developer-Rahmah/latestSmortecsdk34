
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

export const ItemSearch = ({...props}) => {
    let BaseURL = 'http://delico.qiotic.info';
    let item = props.item;
    return (



      <Card cardBorderRadius={5}>
      <TouchableOpacity
        onPress={() =>{
          props.navigate(props.item.products_id)
          }}
      >
          {/* <CardItem cardBody >
            <Image source={{uri: BaseURL + '/' + item.products_image}} style={{height: 100, width: null, flex: 1}}/>
          </CardItem> */}
          <CardItem style={{backgroundColor:'transparent'}} style={{justifyContent:'center',alignItems:'center'}}>
             {/* <Left style={{backgroundColor:'transparent',width:'100%'}}> */}
                 <Text style={[styles.itemText,{marginTop:0,marginBottom:0}]}>{item.products_name}</Text>
              {/* </Left>
              <Right>
                 <Button transparent>
                 <Image source={item.isLiked ? require('../assets/images/hart.png') : require('../assets/images/hartempty.png')} style={{width:17,height:23,marginEnd:5,resizeMode:'contain'}} />
                 </Button>
               </Right>
             </CardItem>
          <CardItem>
            <Left>
              <Text style={[styles.itemPrice,{marginBottom:5}]}>{item.products_price}</Text>
            </Left> */}
            {/* <Right>
              <Button transparent>
                <Icon style={styles.grey} name="md-share" />
              </Button>
            </Right> */}
            </CardItem>
            </TouchableOpacity>
            {/* <CardItem>
              <Body>
              <Button  block onPress={()=>{
              props._toggleModal()
              props.setItem(item)
              }}>
<Text style={{fontFamily: "Acens",
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#ffffff"
}}>{I18nManager.isRTL?'أضف الى السلة':'Add to Cart'}</Text>      
    </Button>
          </Body>
            </CardItem> */}
        </Card>


//         <Card cardBorderRadius={5}>
//         <TouchableOpacity
//           onPress={() =>{
//             props.navigate(props.item.products_id,props.item.products_name)
//             }}
//         >


//             <CardItem cardBody >
//               <ImageBackground source={{uri: BaseURL + '/' + item.products_image}} style={{height: 150, width: '100%', flex: 1,resizeMode:'cover',paddingTop:80}}>
//             <CardItem style={{backgroundColor:'transparent'}} >
//               <Left style={{backgroundColor:'transparent',width:'100%'}}>
//                 <Text style={[styles.itemText,{marginTop:0,width:150,marginBottom:-5}]}>{item.products_name}</Text>
//               </Left>
//               <Right>
//                 <Button transparent>
//                 <Image source={item.isLiked ? require('../assets/images/hart.png') : require('../assets/images/hartempty.png')} style={{width:17,height:23,marginEnd:5,resizeMode:'contain'}} />
//                 </Button>
//               </Right>
//             </CardItem>
//             <CardItem style={{marginTop:0,backgroundColor: 'transparent'}}>
//               <Left style={{backgroundColor:'transparent'}}>
//                 <Text style={styles.itemPrice}>{item.products_price}</Text>
//               </Left>
            
//               </CardItem>
//               </ImageBackground>
//               </CardItem>
//               </TouchableOpacity>
//               <CardItem>
//                 <Body>
//                 <Button  block onPress={()=>{
//                 props._toggleModal()
//                 props.setItem(item)
//                 }}>
//               <Text style={{fontFamily: "Acens",
//   fontSize: 12,
//   fontWeight: "normal",
//   fontStyle: "normal",
//   letterSpacing: 0,
//   color: "#ffffff"
// }}>{I18nManager.isRTL?'أضف الى السلة':'Add to Cart'}</Text>
//             </Button>
//             </Body>
//               </CardItem>
//           </Card>
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
      lineHeight: 13,
      letterSpacing: 0,
      color: "#4d4d4d",
      backgroundColor:'transparent'
      },
})