import React, { Component } from 'react';
import { View, Text, Dimensions, ImageBackground, Image, TouchableOpacity,AsyncStorage,I18nManager ,TextInput,Platform} from 'react-native';
import styles from '../css/styles';
import {
    Container,
    Header,
    Title,
    Content,
  Icon,
    Left,Button,Right,
    Body,
  StyleProvider
  } from "native-base";
  import getTheme from '../native-base-theme/components';
  import variables from '../native-base-theme/variables/variables';
  import { showMessage, hideMessage } from "react-native-flash-message";

import { Font, AppLoading, SplashScreen, Notifications } from 'expo';
import { Localization } from 'expo-localization';
import Expo from 'expo';

// import i18n from '../config/i18n';

import i18n from 'i18n-js';
import client from '../api/constant';

const en = {
    done: 'DONE',
    orderHasBeenAdddedSucc: 'Order Sent!',
    backToHome:'BACK TO HOME',
    thankYou:'Thank You',
    back:'Home Page'

   
};
const ar = {
    done: 'تم بنجاح!',
    orderHasBeenAdddedSucc: 'تمت اضافة طلبك بنجاح',
    backToHome:'عودة الى الرئيسية',
    thankYou:'شكراً لك',
    back:'الصفحة الرئيسية'


   




};

const { passwordInputStyle, btnImage, visibilityBtn, mainLoginContainer, secondContainerInLogin, emailInputStyle, forgetPassCreateAccountContainer, logiSocailMediaContainer, orContainer, viewInsideOrStyle, loginTextStyleInLoginTab
    , orTextStyle, facebookContainer, loginTouchable, facebookTouchable, socailIconStyle, spaceBtweenSocailIcons, loginWithGoogleTouchable
,forgetPasswordText,creatAccountText ,facebookContairInLogin} = styles

export default class OrderAddedSuccesfully extends Component {

    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            loginBg: 'white',
            signupBG: 'white',
            signupFontColor: '#8FCFEB',
            loginFontColor: '#8FCFEB',
            loading: true,
            isReady: false,
            isSplashReady: false,
            myLang: 'en',
            userID:'',
            userEmail:'',
            verfCode:0,
            isRTL:false,
            myLang: AsyncStorage.getItem("myLang").then((value) => {
                this.setState({ "myLang": value })
            }).done()
            ,
        
        }
    }

   
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('userEmail');
          if (value !== null) {
            // We have data!!
            this.setState({userEmail:value})
          
            console.log('useremaiiiiiiiiil',this.state.userEmail);

           
          }
        } catch (error) {
          // Error retrieving data
          console.log('getstorageitemerrrror',error);
        }
        
      };
    async componentWillMount() {
        if(this.props.navigation.state.params.fromCart){
            await AsyncStorage.removeItem('@MySuperStore:key');

        }
       
    }
    async  componentDidMount() {
      
   
    
    
    }
  
   
    render() {
        
        i18n.fallbacks = true;
        i18n.translations = { ar, en };
        //i18n.locale =null;
        console.log('test:' + this.state.myLang);

        i18n.locale = this.state.myLang;

     

        return (
<StyleProvider style={getTheme(variables)}>
      <Container >
     
       <Header style={{height:99,backgroundColor:'#8FCFEB'}}>
        
        <Body style={styles.header}>
              <Title style={[styles.header,{fontSize:25,width:Dimensions.get('window').width,fontFamily:'Acens',color:'white',textAlign:'center'}]}>{i18n.t('done')}</Title>
            </Body>
        </Header> 

            <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',height:Dimensions.get('window').height/1.5}}>

<View style={{height:20}}/>
<Image
                source={require('../assets/images/smrtcdone.png')}
                style={{width:70,height:70,resizeMode:'contain'}}

              />
                <View style={{height:20}}/>
<Text style={{ fontSize:23,
   fontFamily: "newFont",
   fontWeight: "bold",
   fontStyle: "normal",
  color: "#888888"}}>{i18n.t('orderHasBeenAdddedSucc')}</Text>
  <View style={{height:10}}/>

<Text style={{ fontSize: 23,
     opacity: 0.73,
     fontFamily: "newFont",
     fontWeight: "normal",
    color: "#888888"}}>{i18n.t('thankYou')}</Text>
  <View style={{height:Dimensions.get('window').height/5.5,marginTop:-40}}/>

                {/* <View style={{justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity
                       onPress={() =>{  this.props.navigation.navigate('Home')}}
                   >
                    <Icon  color='#888888' style={{color:'#888888',}}
             name={
        Platform.OS === 'ios'
          ? `md-close`
          : 'md-close'
      }  />
                    </TouchableOpacity>
                    </View> */}
                            {/* <View style={{justifyContent:'center',flexDirection:'row',width:'95%',alignItems:'center'}}> */}
          <TouchableOpacity 
                                 onPress={() =>{  this.props.navigation.navigate('Home')}}

style={{width:'48%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center',borderRadius:5,
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,}}>
<Text style={{fontFamily: 'Acens',
fontSize: 13,
fontWeight: "bold",
fontStyle: "normal",
lineHeight: 20,
letterSpacing: 0,
color: "white"}}>{i18n.t('back')}</Text>

</TouchableOpacity>

         {/* </View> */}
               

              </View>
</Container>
</StyleProvider>

        );
    }



}
