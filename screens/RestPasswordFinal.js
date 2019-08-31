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
    signup: 'SIGN UP',
    verificationCode:'Verification Code',
    verify: 'VERIFY',
    password:'PASSWORD',
    confirmPassword:'CONFIRM PASSWORD',
    passowrdnotmatches:'Password and confirm password not match'
   
};
const ar = {
    signup: 'إنشاء حساب',
    verificationCode:'رمز التأكيد',
    verify: 'تأكيد',
    password:'كلمة المرور',
    confirmPassword:'تأكيد كلمة المرور',
    passowrdnotmatches:'كلمة المرور وتأكيد كلمة المرور غير متطابقات'




};


const { passwordInputStyle, btnImage, visibilityBtn, mainLoginContainer, secondContainerInLogin, emailInputStyle, forgetPassCreateAccountContainer, logiSocailMediaContainer, orContainer, viewInsideOrStyle, loginTextStyleInLoginTab
    , orTextStyle, facebookContainer, loginTouchable, facebookTouchable, socailIconStyle, spaceBtweenSocailIcons, loginWithGoogleTouchable
,passwordAndConfirmContainer,creatAccountText ,facebookContairInLogin} = styles

export default class RestPasswordFinal extends Component {

    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            hidePassword: true,
            hideConfirmPassword: true,
            username: '',
            passwordBottomLine:'#F5F5F5',
            confirmPasswordBottomLine:'#F5F5F5',
            password: '',
            confirmPass:'',
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
            verfCodeBottomLine:'#F5F5F5',
            myLang: AsyncStorage.getItem("myLang").then((value) => {
                this.setState({ "myLang": value })
            }).done()
            ,
        }
    }

    // _retrieveData = async () => {
    //     try {
    //       const value = await AsyncStorage.getItem('userID');
    //       const namevalue =  await AsyncStorage.getItem("userName"); 
    //       const phonevalue = await AsyncStorage.getItem("userPhone");
    //       const passwvalue = await AsyncStorage.getItem("userPassword");
    //       const myLang = await AsyncStorage.getItem("myLang")
    //       if(myLang !== null){
    //         this.setState({ myLang: myLang });

    //         I18nManager.forceRTL(myLang === "ar");
    
    //         this.setState({ isRTL: myLang === "ar" });
    
    //         i18n.locale = this.state.myLang;
          
    //       }
  
    //       if (value !== null) {
    //         // We have data!!
    //         console.log('userid:',value);
    //         console.log('namevalue:',namevalue);
    //         console.log('phonevalue:',phonevalue);
    //         console.log('passwvalue:',passwvalue);

    //          this.props.navigation.navigate('Home')
    //       }
    //     } catch (error) {
    //       // Error retrieving data
    //       console.log('getstorageitemerrrror',error);
    //     }
    //   };
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
        this._retrieveData()
    //     if(this.state.myLang=="ar"){
    //         I18nManager.forceRTL(true);

           
    
    //         i18n.locale = this.state.myLang;
    //     }
    //    this._retrieveData()
    //     this.setState({ loading: false });
    //     console.log('willmountaaaa=' + this.state.isRTL)
    
    }
    async  componentDidMount() {
        this._retrieveData()

    //   SplashScreen.preventAutoHide();
    
    }

    manageHidenConfirmPasswordVisibility = () => {
        this.setState({ hideConfirmPassword: !this.state.hideConfirmPassword });
    }


    managePasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
    }

    _storeData = async (userID,userName,userPhone,userPassword,email) => {
        // save the lang in storage
        await AsyncStorage.setItem("userID", userID+'');
        await AsyncStorage.setItem("userName", userName+''); 
        await AsyncStorage.setItem("userPhone", userPhone+'');
        await AsyncStorage.setItem("userPassword", userPassword+'');
        await AsyncStorage.setItem("userEmail", email+'');

        

      
    }
    
    loginBG() {
        this.setState({

            loginBg: '#8FCFEB',
            signupBG: 'white',
            loginFontColor: 'white',
            signupFontColor: '#8FCFEB'
        });
    }
    signupBG() {
        this.setState({
            signupBG: '#8FCFEB',
            loginBg: 'white',
            signupFontColor: 'white',
            loginFontColor: '#8FCFEB'
        });
    }
    onLoginPreesd() {
        this.loginBG();
        this.props.navigation.navigate('ProfileScreen',{
            loginTab:2
        })
    }
    onSignupPreesd() {
        console.log('signupPreesd')
        this.signupBG();
        this.props.navigation.navigate('ProfileScreen')

    }

    _handlePress = async () => {
        // save the lang in storage

        if(this.state.password.length>0&this.state.confirmPass.length>0&(this.state.password==this.state.confirmPass)){
            this.setState({passwordBottomLine:'#F5F5F5'})
        

if( this.state.checked==false ){
    showMessage({
        message: i18n.t('pleaseCheck') ,
        type: "danger",
      });

        
}
else
{
        client.post(`app/changepassword?user_name=${this.props.navigation.state.params.userName}&password=${this.state.password}`).then((res) => {
            console.log('data user signup',res)
if(res.data.message==='Password Changed Successfully.'){
    this._storeData(this.props.navigation.state.params.email
        )
this.props.navigation.navigate('LoginScreen')
    console.log('suceess saved')
    


}
else{
    showMessage({
        message: res.data.message,
        type: "danger",
      });
}
        })


      
           
                   }
    
    
                }else if(this.state.password.length==0){
       
               if(this.state.confirmPass.length>0){
                this.setState({confirmPasswordBottomLine:'#F5F5F5'})
        
               }else{
                this.setState({confirmPasswordBottomLine:'red'}) 
            }
              
         this.setState({passwordBottomLine:'red'})
            }
     


            else if(this.state.confirmPass.length==0){
      
               if(this.state.password.length>0){
                this.setState({passwordBottomLine:'#F5F5F5'})
        
               }else{
                this.setState({passwordBottomLine:'red'}) 
            }
              
         this.setState({confirmPasswordBottomLine:'red'})
            }
            else if(this.state.passowrd!=this.state.confirmPass){
                showMessage({
                    message: i18n.t('passowrdnotmatches'),
                    type: "danger",
                  });
this.setState({confirmPasswordBottomLine:'red'})
            }


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
     
       <Header style={{height:99,backgroundColor:'#8FCFEB',width:Dimensions.get('window').width}}>
         <Left style={{width:40}}>
            <Button style={{height:99,width:50}} transparent onPress={() => this.props.navigation.goBack()}>
            <Icon  style={{  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],}}
             name={
        Platform.OS === 'ios'
          ? `ios-arrow-back`
          : 'arrow-back'
      }  />
                  </Button>
          </Left>
        <Body style={[styles.header,{paddingEnd:100}]}>
              <Title style={[styles.header,{fontSize:25,width:Dimensions.get('window').width/1.1,fontFamily:'Acens',marginLeft:-50,color:'white'}]}>REST PASSWORD</Title>
            </Body>
        </Header> 

            <View style={mainLoginContainer}>

           <View style={{height:10}}/>
                    <View style={passwordAndConfirmContainer}>
                        <TextInput
                         onChangeText={(text) => this.setState({password:text})}
                        underlineColorAndroid="transparent" placeholderTextColor='#777777' placeholder={i18n.t('password')}  secureTextEntry={this.state.hidePassword} style={[passwordInputStyle,{marginTop:20,borderWidth:1,borderColor:this.state.passwordBottomLine, textAlign:I18nManager.isRTL?'right':'left'}]} />
                        <TouchableOpacity activeOpacity={0.8} style={visibilityBtn} onPress={this.managePasswordVisibility}>
                            <Image source={(this.state.hidePassword) ? require('../assets/images/hideeye.png') : require('../assets/images/eye.png')} style={btnImage} />
                        </TouchableOpacity></View>

                        <View style={passwordAndConfirmContainer}>

                        <TextInput textAlign={I18nManager.isRTL?'right':'left'}
                         onChangeText={(text) => this.setState({confirmPass:text})}
                        underlineColorAndroid="transparent" placeholderTextColor='#777777' placeholder={i18n.t('confirmPassword')}  secureTextEntry={this.state.hideConfirmPassword} style={[passwordInputStyle,{marginTop:20,borderWidth:1,borderColor:this.state.confirmPasswordBottomLine}]} />
                        <TouchableOpacity activeOpacity={0.8} style={visibilityBtn} onPress={this.manageHidenConfirmPasswordVisibility}>
                            <Image source={(this.state.hideConfirmPassword) ? require('../assets/images/hideeye.png') : require('../assets/images/eye.png')} style={btnImage} />
                        </TouchableOpacity></View>
                       


                    
                  
                </View> 
                
                <View style={{height:20}}/>

                <View style={{width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity
                       onPress={() =>{ this._handlePress()}}
                    style={loginTouchable}
                   >
                        <Text style={loginTextStyleInLoginTab}>{i18n.t('verify')}</Text>
                    </TouchableOpacity>
                    </View>
               

</Container>
</StyleProvider>

        );
    }



}
