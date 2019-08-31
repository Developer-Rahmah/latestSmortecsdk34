import React, { Component } from 'react';
import { View, Text, Dimensions, ImageBackground, Image, TouchableOpacity,AsyncStorage,I18nManager,Platform,Alert,BackHandler, } from 'react-native';
import styles from '../css/styles';
// import { AppLoading, Asset, Font, Icon,SplashScreen,Permissions, Notifications,Constants } from 'expo';
import * as Permissions from 'expo-permissions';


import { Font, AppLoading, SplashScreen, Notifications,Constants } from 'expo';
import { Localization } from 'expo-localization';
import Expo from 'expo';
import {
  Content, 
  Container,
  Header,
  Card,
  Right,
  Left,
  Button,
  CardItem,
  Icon,
  Body,
  Title,
  StyleProvider} from 'native-base';

import i18n from 'i18n-js';
// import Content from '../native-base-theme/components/Content';

const en = {
    signup: 'SIGN UP',
    login: 'LOG IN',
   
};
const ar = {
    signup: 'إنشاء حساب',
    login: 'تسجيل الدخول',
   




};

const { mainScreenMainContainer, mainScreenLoginSignupContainer,loginContainer ,loginTextStyle,signUpContainer,signUpTextStyle,logoContainer,mainView,imageLogo,logoStyle} = styles
export default class LoginSignupScreen extends Component {

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
            switchOn:true,
            isRTL:false
        }
    }
    async  registerForPushNotificationsAsync() {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
      
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
      
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
          return;
        }
      
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
        // let platform=Constants.platform
        await AsyncStorage.setItem("deviceToken", token+'');
       
      
        // POST the token to your backend server from where you can retrieve it to send push notifications.
        // this.setState({token:token})
        console.log('tokeeen:'+token)
       
        
      }
      handleBackButton = () => {
        if (this.props.isFocused) {
          Alert.alert(
            'Exit App',
            'Exiting the application?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
              }
            ],
            {
              cancelable: false
            }
          );
          return true;
        }
      };
      
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      }

    _retrieveData = async () => {
        try {
            const token = await AsyncStorage.getItem("deviceToken");
            const platform = await AsyncStorage.getItem("devicePlatform");

            console.log('my device token iiiis',token);
            console.log('my device platfooorm iiiis',platform);

            console.log('tokeeen:'+token)
            if(Platform.OS === 'ios') {
                console.log(" ios") 
             } else {
                   console.log("android") 
            } 
          const value = await AsyncStorage.getItem('userID');
          const namevalue =  await AsyncStorage.getItem("userName"); 
          const phonevalue = await AsyncStorage.getItem("userPhone");
          const passwvalue = await AsyncStorage.getItem("userPassword");
          const myLang = await AsyncStorage.getItem("myLang")
          const switchOn= await AsyncStorage.getItem("switchOn");
          const myArray = await AsyncStorage.getItem('orderArr');
          if(switchOn !==null){
this.setState({switchOn:switchOn})
          }
          if(myLang !== null){
            this.setState({ myLang: myLang });

            I18nManager.forceRTL(myLang === "ar");
    
            this.setState({ isRTL: myLang === "ar" });
    
            i18n.locale = this.state.myLang;
          
          }else{
          
              await AsyncStorage.setItem("myLang", "en");
              I18nManager.forceRTL(false);
         
            }
          
  
          if (value !== null) {
            console.log('my device token iiiis',token);
            console.log('my device platfooorm iiiis',platform);

            // We have data!!
            console.log('userid:',value);
            console.log('namevalue:',namevalue);
            console.log('phonevalue:',phonevalue);
            console.log('passwvalue:',passwvalue);
            console.log('ordeeer async arr newww',JSON.parse(myArray));

             this.props.navigation.navigate('Home')
          }
        } catch (error) {
          // Error retrieving data
          console.log('getstorageitemerrrror',error);
        }
        // try {
        //     const myArray = await AsyncStorage.getItem('orderArr');
        //     if (myArray !== null) {
        //       // We have data!!
        //       console.log('ordeeer async arr',JSON.parse(myArray));
        //     }
        //   } catch (error) {
        //     // Error retrieving data
        //   }
      };
    async componentWillMount() {
        if(Platform.OS === 'ios') {
            console.log(" ios") 
            await AsyncStorage.setItem("devicePlatform",'ios');
         } else {
               console.log("android") 
               await AsyncStorage.setItem("devicePlatform",'android');
        } 
        
        this.registerForPushNotificationsAsync();
        if(this.state.myLang=="ar"){
            I18nManager.forceRTL(true);

           
    
            i18n.locale = this.state.myLang;
        }
    //    this._retrieveData()
        this.setState({ loading: false });
        console.log('willmountaaaa=' + this.state.isRTL)
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    }
    async  componentDidMount() {
      SplashScreen.preventAutoHide();
    
    
    
      
    
    
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
        this.props.navigation.navigate('LoginScreen',{
            loginTab:2
        })
    }
    onSignupPreesd() {
        console.log('signupPreesd')
        this.signupBG();
        this.props.navigation.navigate('SignUpScreen')

    }


    render() {
        i18n.fallbacks = true;
        i18n.translations = { ar, en };
        //i18n.locale =null;
        console.log('test:' + this.state.myLang);

        i18n.locale = this.state.myLang;

    //      if (!this.state.isReady) {


    //         return (
    //             <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width,backgroundColor:'white' }}>
      
    //                 <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center', }}
    //                     >
    //                     <View style={{ height: Dimensions.get('window').height / 5,flexDirection:'column' }}>
    //                     </View>
      
    //                     <Image
    //                         source={require('../assets/images/smorteclogo.png')}
    //                         style={{
    //                             width: Dimensions.get('window').width/1.5,
    //                             height: Dimensions.get('window').width/2.5, paddingTop: 2,
    //                             // resizeMode: 'contain'
    //                         }}
    //                         onLoad={this._cacheResourcesAsync}
    //                     />
    //                     <View style={{ height: Dimensions.get('window').height / 2.5 ,flexDirection:'column'}}>
    //   <Text style={{fontSize:30,fontFamily:'Acens',color:'#8FCFEB',textAlign:'center'}}>SMORTEC</Text>
    //   <Text style={{fontSize:30,fontFamily:'Acens',color:'gray',textAlign:'center'}}>We are the future</Text>

    //                     </View>
    //                     <Text style={{fontFamily:'Acens',color:'gray',textAlign:'center'}} >©SMORTEC 2019</Text>
      
    //                 </View>
      
    //             </View>
    //         );
    //      }
      
      
       

        return (
            <Content style={{backgroundColor:'white'}}>

            <View style={[mainScreenMainContainer,{backgroundColor:'white'}]}
                // source={require('../assets/images/background.png')}
                >
                <View style={mainView}>

                    <View style={[logoContainer,{}]}>

                    <Image
                        source={require('../assets/images/logo.png')}
                        style={{
                            resizeMode:'contain'
                            // width: Dimensions.get('window').width/1.5,
                            // height: Dimensions.get('window').width/2.5, paddingTop: 2,
                            
                        }}
                       
                    />
                      <View style={{ height: Dimensions.get('window').height / 6 ,flexDirection:'column'}}/>
                    {/* <Image
                        source={require('../assets/images/smorteclogo.png')}
                        style={{
                            width: Dimensions.get('window').width/1.5,
                            height: Dimensions.get('window').width/2.5, paddingTop: 2,
                            
                        }}
                       
                    />
                    <View style={{ height: Dimensions.get('window').height / 2.5 ,flexDirection:'column'}}>
  <Text style={{fontSize:30,fontFamily:'Acens',color:'#8FCFEB',textAlign:'center'}}>SMORTEC</Text>
  <Text style={{fontSize:30,fontFamily:'Acens',color:'gray',textAlign:'center'}}>We are the future</Text>
  
                    </View> */}
  

                    {/* <Image
                            source={require('../assets/images/smorteclogo.png')}
                            style={{
                                width: Dimensions.get('window').width/1.5,
                                height: Dimensions.get('window').width/2.5, paddingTop: 2,
                                // resizeMode: 'contain'
                            }}
                        />
                       
                        </View>
                        <View style={{ height: Dimensions.get('window').height / 20 ,flexDirection:'column'}}>
<Text style={{fontSize:30,fontFamily:'Acens',color:'#8FCFEB',textAlign:'center'}}>SMORTEC</Text>
<Text style={{fontSize:30,fontFamily:'Acens',color:'gray',textAlign:'center'}}>We are the future</Text> */}

            </View>
                    <View style={mainScreenLoginSignupContainer}>
                        <TouchableOpacity

                            onPress={this.onLoginPreesd.bind(this)}
                            style={[loginContainer,{
                                // backgroundColor: this.state.loginBg
                                backgroundColor:'#8FCFEB'
                                }]}>

                            <Text style={[
                              
                               loginTextStyle, {
                                //    color: this.state.loginFontColor
                                color:'black',
                                fontFamily:'Acens'
                                },
                            ]}> {i18n.t('login')} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.onSignupPreesd.bind(this)}
                            style={[signUpContainer,
                            { backgroundColor:'#8FCFEB'
                                //backgroundColor: this.state.signupBG,
                            }]}>

                            <Text style={[signUpTextStyle,{
                                 color:'black',  fontFamily:'Acens'
                                // color: this.state.signupFontColor,
                                }]}> {i18n.t('signup')}</Text>
                        </TouchableOpacity>


                    </View>

                   
                </View>
            </View>
</Content>

        );
    }



}
