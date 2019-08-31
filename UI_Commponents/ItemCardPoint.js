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

export const ItemCardPoint = ({...props}) => {
    let BaseURL = 'http://delico.qiotic.info';
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
          props.navigate(props.item.products_id)
          }}
      >
      <View style={{flexDirection:'column',height:250}}>
          <View  style={{justifyContent:'center',alignItems:'center',height:190}} >
            <Image source={{uri: BaseURL + '/' + item.products_image}} style={{height: 190, width: '100%', flex: 1,resizeMode:'contain'}}/>
          </View>
          <View style={{marginEnd:5,marginStart:5}}>
          <Text   numberOfLines={2}
 style={[styles.itemText,{marginTop:0,width:150,marginBottom:0,}]}>{item.products_name}</Text>
              <View style={{height:5}}/>
              <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',marginBottom:15,alignItems:'center'}}>
              <View style={{alignItems:'flex-end'}}>  
              <Text style={styles.itemPrice}>{ item.points}{I18nManager.isRTL?'نقطة':'Points'}</Text></View>
              {/* <Image source={wish.includes(item.products_id) ? require('../assets/images/hart.png') : require('../assets/images/hartempty.png')} style={{width:17,height:23,marginBottom:10,resizeMode:'contain',}}/> */}
              {wish.includes(item.products_id) ? 
                <Icon name="md-heart" style={{fontSize:25,color:"red",alignSelf:"center"}} />
                :
                <Icon name="md-heart" style={{fontSize:25,color:"#8FCFEB",alignSelf:"center"}} />

                }
</View>
               </View>
          {/* <CardItem style={{backgroundColor:'transparent'}} > */}
          </View>
             {/* <Left style={{backgroundColor:'transparent',width:'100%'}}>
                 <Text style={[styles.itemText,{marginTop:0,width:150,marginBottom:-5}]}>{item.products_name}</Text>
              </Left>
              <Right>
                 <Button transparent>
                 <Image source={wish.includes(item.products_id) ? require('../assets/images/hart.png') : require('../assets/images/hartempty.png')} style={{width:17,height:23,marginEnd:5,resizeMode:'contain',marginBottom:-32}}/>
                 </Button>
               </Right>
             </CardItem>
          <CardItem>
            <Left>
              <Text style={[styles.itemPrice,{marginBottom:5}]}>{item.products_price}JOD</Text>
            </Left> */}
            {/* <Right>
              <Button transparent>
                <Icon style={styles.grey} name="md-share" />
              </Button>
            </Right> */}
            {/* </CardItem> */}
            </TouchableOpacity>
            <CardItem style={{
              // display: Order.includes(item.products_id)?'none':'flex'
              }}>
              <Body>
              <Button 
              disabled={ Order.includes(item.products_id)? true:false}
              style={{height:30,backgroundColor:Order.includes(item.products_id)?'gray':'#8FCFEB'}} block onPress={()=>{
              // props._toggleModal()
              // props.setItem(item)
            
                props.navigate(props.item.products_id)
                
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
            </CardItem>
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
      letterSpacing: 0,
      color: "#4d4d4d",
      backgroundColor:'transparent'
      },
})