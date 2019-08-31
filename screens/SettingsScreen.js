import React, { Component } from 'react';
import { View, Text, Dimensions, ImageBackground, Image, TouchableOpacity, TextInput, AsyncStorage,ScrollView,Platform, Modal} from 'react-native';
import styles from '../css/styles';
import { Font, AppLoading } from 'expo';
import SwitchToggle from 'react-native-switch-toggle';
import client from '../api/constant'

import { I18nManager } from 'react-native';
import { Localization } from 'expo-localization';
import Expo from 'expo';
import { Updates } from 'expo';
import { Avatar, Badge, withBadge } from 'react-native-elements'
import { connect } from "react-redux";

import i18n from 'i18n-js';
const en = {


    language: 'Language',
    notifications: 'Notifications',
    account:' My Account',
    privacy:'Privacy Policy',

    home: 'Home',
    wishlist: 'Favorite',
    settings:'Settings',
    orders:'Orders',
        onlyMe:'Only me',
    logout:'Log Out',
    settingsTitle:'SETTINGS',
    callNow:'CALL NOW'
   

};
const ar = {


    language: 'اللغة',
    notifications: 'التنبيهات',
    account:'الحساب',
    privacy:'الخصوصية',
    home: 'الرئيسية',
    wishlist: 'المفضلة',
    settings:'الاعدادات',
    orders:'الطلبات',
        onlyMe:'انا فقط',
    logout:'تسجيل الخروج',
    settingsTitle:'الاعدادات',
    callNow:'اتصل الآن'
  

};
import { Picker, Icon, Content, Container, Header,
  Title,
  Button,
  Left,
  Right,
  Body,Segment } from "native-base";



const { mainSettingContainer, settingsContainer, rowContainerInSetting, imageContainerInSetting, textContainerInSetting, imageStyleInSetting, fieldTitleStyle, fieldInfoStyle, toggleContainerStyle, circleToggleStyle } = styles

let a = 1;


 class SettingsScreen extends Component {

  static navigationOptions = {
    header:null
  //   title: 'Settings',
  //   headerStyle: {
  //     backgroundColor: '#8FCFEB',fontFamily:'Acens',color:'white',height:77,
  //     elevation: null
  // },
  // headerTitleStyle: {
  //     fontFamily:'Acens',color:'white',fontSize:25
  // }
  };

  constructor(props) {
    super(props);
  //   if (i18n.locale === 'ar') {
  //     a = 2;
  //      I18nManager.forceRTL(true);
  // } else if (i18n.locale === 'en') {
  //     a = 1;
  //     I18nManager.forceRTL(false);
  // } else {
  //     a = 1
  //      I18nManager.forceRTL(false);
  // }
    this.state = {
      points:0,
      selected: "key0",




      switchOn: AsyncStorage.getItem("switchOn").then((value) => {
        this.setState({ "switchOn": JSON.parse(value) })
    }).done(),
      
    
    
    userID:'',
      userNmae:'',
      userPhone:'',
      userPassword:'',
      activePage: a,
      phonCall:'07999999',
      popUpModal: false,
      myLang: AsyncStorage.getItem("myLang").then((value) => {
        this.setState({ "myLang": value })
    }).done()
    ,
    

      // fLang:i18n.locale,

      language: 'Language',

    };
  }
  setModalVisible(visible) {
    this.setState({ popUpModal: visible });
  }
  
  returnBadg()
  {
    if(this.props.Order.length>0){
  return(
    // <Badge style={{ alignItems:'center',justifyContent:'center', marginBottom:-10,borderRadius:8,width:16,height:16,borderColor:'red',borderWidth:1,backgroundColor:'red',color:'red'}}></Badge>
    <View  style={{ width: 10, backgroundColor: 'white' ,height:10,borderRadius:5}}
    >
     
 </View>
    )
    }else{
      return
  (
    <View/>
  );
      
    }
    
  }


//   _onChangeDirection = async (lang) => {
//     // save the lang in storage
//     await AsyncStorage.setItem("myLang", lang);

//     this.setState({ "myLang": lang });

//     // I18nManager.forceRTL(lang === "ar");

//     this.setState({ isRTL: lang === "ar" });

//     i18n.locale = this.state.myLang;
//     // await Updates.fetchUpdateAsync();

//     try {
//       await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(this.props.Order)); 
//         Updates.reloadFromCache();

//     } catch (error) {
//       // Error saving data
//       console.log('errror in saving cart arrrrr',error)
//     }
// }
_onChangeDirection = async (lang) => {
  // save the lang in storage
  await AsyncStorage.setItem("myLang", lang);

  this.setState({ "myLang": lang });

  I18nManager.forceRTL(lang === "ar");

  this.setState({ isRTL: lang === "ar" });

  i18n.locale = this.state.myLang;

  // Updates.reloadFromCache();
  try {
    await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(this.props.Order)); 
      Updates.reloadFromCache();

  } catch (error) {
    // Error saving data
    console.log('errror in saving cart arrrrr',error)
  }
}


  _onDirectionChange = () => {
    AsyncStorage.setItem("myLang", "ar");
 
    AsyncStorage.getItem("myLang").then((value) => {
        this.setState({ "myLang": value });
    }).done();
    // I18nManager.forceRTL(true);
    this.setState({ isRTL: true });

    this.setState({ lng: this.state.myKmyLangey })
   
    i18n.locale = this.state.myLang;

    // Expo.Updates.reloadFromCache();
    Updates.reloadFromCache();

};

_onDirectionChange2 = () => {
    AsyncStorage.setItem("myLang", "en");
    AsyncStorage.getItem("myLang").then((value) => {
        this.setState({ "myLang": value });
    }).done();

    // I18nManager.forceRTL(false);
    this.setState({ isRTL: false });
    this.setState({ lng: this.state.myLang })
    // try {
    //     await AsyncStorage.setItem('lang', 'en');
    //   } catch (error) {
    //     // Error saving data
    //   }
    i18n.locale = this.state.myLang;
    Updates.reloadFromCache();
    // Expo.Updates.reloadFromCache();

};

  selectComponent = () => () => {
    if (this.state.myLang === 'ar') {
        this.setState({activePage: 2 })
    } else {
        this.setState({ activePage: 1 })
    }
}
selectComponent2 = () => () => {
    this.setState({ activePage: 1 })
   this. _onDirectionChangeFinal('ar')
    
    // this.setState({fLang:'en'})
  //  console.log('final lang'+this.state.fLang)
}
selectComponent3 = () => () => {
    this.setState({ activePage: 2 })
    // this.setState({fLang:'ar'})
    // console.log('final lang'+this.state.fLang)
this._onDirectionChange()
}

  onPress2 = () => {
    AsyncStorage.setItem("switchOn",JSON.stringify(!this.state.switchOn))
     this.setState({ switchOn: !this.state.switchOn });

     console.log('test notify me',this.state.switchOn)
     if(this.state.switchOn){


      client.post(`/app/notify_me?is_notify=0&customers_id=${this.state.userID}`
        
      ).then((res) => {
          console.log('cites',res.data.message)
          
    
    })

     }else{
      client.post(`/app/notify_me?is_notify=1&customers_id=${this.state.userID}`
        
      ).then((res) => {
          console.log('cites',res.data.message)
          
    
    })
     }
  }
  async clearStorage() {
    try {
    await AsyncStorage.clear();
    this.props.navigation.navigate('LoginSignupScreen')
    } catch (error) {
    }
    }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userID');
      const namevalue =  await AsyncStorage.getItem("firstName"); 
      const phonevalue = await AsyncStorage.getItem("userPhone");
      const passwvalue = await AsyncStorage.getItem("userPassword");
  
  
      if (value !== null) {

      
        // We have data!!
        console.log('userid:',value);
        console.log('namevalue:',namevalue);
        console.log('phonevalue:',phonevalue);
        console.log('passwvalue:',passwvalue); 
       
  this.setState({
    userID:value,
    userNmae:namevalue,
    userPhone:namevalue,
    userPassword:passwvalue
  })
      
      }
    } catch (error) {
      // Error retrieving data
      console.log('getstorageitemerrrror',error);
    }
    
  };
  componentDidMount() {
    this._retrieveData()
     
  
  }
  componentWillMount(){
   
  }
  render() {
    i18n.fallbacks = true;
    i18n.translations = { ar, en };
    //i18n.locale =null;
    console.log('test:' + this.state.myLang);

    i18n.locale = this.state.myLang;
    this.selectComponent()
    return (
      <Container style={mainSettingContainer}>
        <Header style={{height:99,backgroundColor:'#8FCFEB'}}>
        
        <Left style={{}}>
        <Button style={{}} transparent onPress={() => this.props.navigation.goBack()}>
        <Icon  style={{  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],}}
name={
        Platform.OS === 'ios'
          ? `ios-arrow-back`
          : 'arrow-back'
      }  />
                  </Button>
           
        </Left>
        <Body style={styles.header}>
              <Title style={{fontSize:25,width:Dimensions.get('window').width/2,fontFamily:'Acens',marginLeft:0,color:"#fff"}}>{i18n.t('settingsTitle')}</Title>
            </Body>
            <Right style={{width:50,justifyContent:'flex-end',marginRight:-70}} >
              <Body> 
              <TouchableOpacity 
     onPress={() =>
      this.props.navigation.navigate('OrderScreen')

  }
    style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
{this.returnBadg()}
    <Icon style={{color:'white',}} name={
        Platform.OS === 'ios'
          ? `md-cart`
          : 'md-cart'
      }/>
           {/* <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#c1c0c9"}}>Cart</Text> */}
</TouchableOpacity>
                
</Body>
            </Right>
        </Header> 

      <Content style={{height:'100%',backgroundColor:'#8FCFEB'}}>
        <View style={[settingsContainer,{height:'100%'}]}> 


     

                 <TouchableOpacity onPress={()=>{
                           this.props.navigation.navigate('UpdateProfile')

                 }}>

          <View style={[rowContainerInSetting,{marginTop:0}]}>
            <View style={[imageContainerInSetting,{marginTop:0}]}>
              <Image
                source={require('../assets/images/Account.png')}
                style={imageStyleInSetting}

              />
              <Text style={fieldTitleStyle}>{i18n.t('account')}</Text>
            </View>
            <View style={textContainerInSetting}>
              <Text style={[fieldTitleStyle,{color:'white',opacity:1}]}>{this.state.userNmae}</Text>
            </View>

          </View>
            </TouchableOpacity>
           

        
          <View style={rowContainerInSetting}>
            <View style={imageContainerInSetting}>
              <Image
                source={require('../assets/images/Language.png')}
                style={imageStyleInSetting}

              />
              <Text style={fieldTitleStyle}>{i18n.t('language')}</Text>
            </View>
            <View style={textContainerInSetting}>
            <TouchableOpacity  onPress={() => this._onChangeDirection(this.state.myLang=='ar'?"en":"ar")}>
              <Text style={[fieldTitleStyle,{color:'white',opacity:1}]}>{this.state.myLang=='ar'?'English':'عربي'}</Text>
              </TouchableOpacity>
             
            </View>
          </View>
          <View style={rowContainerInSetting}>
            <View style={imageContainerInSetting}>
              <Image
                source={require('../assets/images/Notifications.png')}
                style={imageStyleInSetting}
              />
              <Text style={fieldTitleStyle}>{i18n.t('notifications')}</Text>
            </View>
            <View style={textContainerInSetting}>
              <SwitchToggle
                containerStyle={toggleContainerStyle}
                circleStyle={circleToggleStyle}
                backgroundColorOn='#71b800'
                backgroundColorOff="rgb(227,227,227)"
                switchOn={this.state.switchOn}
                onPress={this.onPress2}
                circleColorOff='white'
                circleColorOn='white'
                duration={500}
              />
            </View>
          </View>
        
         
        

          <View style={{flexDirection:'column'}}>
          
          </View>
          {/* <TouchableOpacity
           onPress={()=>{this.clearStorage()}}
          style={rowContainerInSetting}>
          
            <Image
                source={require('../assets/images/logout.png')}
                style={imageStyleInSetting}

              />
              <Text style={fieldTitleStyle}>{i18n.t('logout')}</Text>

            <View style={textContainerInSetting}>
            </View>
          </TouchableOpacity> */}
       
        </View>
        {/* <View  style={{ width:Dimensions.get('window').width,height:44,backgroundColor:'#8FCFEB',flexDirection:'row',justifyContent:'center',alignItems:'center'
 }} >
           
          </View> */}
        </Content>
        
        <View style={{
    justifyContent: 'center',
    alignItems: 'center',}}>
 
 <View >
        <View style={{ shadowColor: "black",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  , width: Dimensions.get('window').width,justifyContent:'space-between',alignItems:'center',paddingEnd:15,paddingStart:15,
    height: 60,flexDirection:'row',
    backgroundColor: 'white',borderTopColor:'gray',borderTopWidth:0.3
    
    }} >
    <TouchableOpacity 
      onPress={() =>
        this.props.navigation.navigate('Home')

    }
    style={{ width: Dimensions.get('window').width/6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
     <Icon style={{color:'#c1c0c9',}} name={
        Platform.OS === 'ios'
          ? `md-home`
          : 'md-home'
      }/> 
      <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#c1c0c9"}}>{i18n.t('home')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: Dimensions.get('window').width/6, flexDirection:'column',justifyContent:'center',alignItems:'center'}}
         onPress={() =>
          this.props.navigation.navigate('WishListScreen')

      }
        >

    <Icon style={{color:'#c1c0c9',}} name={
        Platform.OS === 'ios'
          ? `md-heart`
          : 'md-heart'
      }/>
       <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#c1c0c9"}}>{i18n.t('wishlist')}</Text>
      </TouchableOpacity>
       
        {/* <View style={{width: Dimensions.get('window').width/4,
    height: 130,
    backgroundColor: 'white',
    borderTopEndRadius:80,borderTopStartRadius:80,justifyContent:'center',alignItems:'center'
    
    }} >
       <TouchableOpacity
     onPress={() => {
      this.setModalVisible(!this.state.popUpModal);
  }}
     style={{ borderRadius:35,height:70,width:70,borderColor:'#8FCFEB',borderWidth:5,backgroundColor:'white',justifyContent:'center',alignItems:'center',marginTop:-35}}>
            <Image style={{width:50,height:50,resizeMode:'contain'}} source={require('../assets/images/logo.png')}/></TouchableOpacity>

    </View> */}
  
<TouchableOpacity 
//  onPress={()=>{this._callShowDirections() }}
// onPress={

// Platform.select({
//     ios: () => {
//         Linking.openURL('http://maps.apple.com/maps?daddr=32.004734,%2035.861525');
//     },
//     android: () => {
//         Linking.openURL('http://maps.google.com/maps?daddr=32.004734,%2035.861525');
//     }
// })}
onPress={() =>
  this.props.navigation.navigate('OrdersScreenOfTabs')

}
 style={{width: Dimensions.get('window').width/6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

   <Icon style={{color:'#c1c0c9',}} name={
        Platform.OS === 'ios'
          ? `md-paper`
          : 'md-paper'
      }/>
      <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#c1c0c9"}}>{i18n.t('orders')}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
     
     style={{width: Dimensions.get('window').width/6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
 
     <Icon style={{color:'#8FCFEB',}}  name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}/>
            <Text style={{ fontFamily: "newFont",
   fontSize: 10,
   fontWeight: "normal",
   fontStyle: "normal",
   letterSpacing: 0,
   color: "#8FCFEB"}}>{i18n.t('settings')}</Text>
 </TouchableOpacity>
       
</View>

      </View>   
    </View>
      </Container>
    );
  }
}


const mapStateToProps = state => ({
  Items: state.CategoryItemsReducer.CtegoryItems,
  Order: state.AddToOrderReducer.Order

});
export default connect(mapStateToProps)(SettingsScreen)
