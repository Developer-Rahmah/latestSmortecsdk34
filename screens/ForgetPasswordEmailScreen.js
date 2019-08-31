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
  import { showMessage } from "react-native-flash-message";



import i18n from 'i18n-js';
import client from '../api/constant';

const en = {
    signup: 'SIGN UP',
    verificationCode:'Verification Code',
    verify: 'VERIFY',
    key:'+962',
    phoneNumber:'PHONE NUMBER',
   
};
const ar = {
    signup: 'إنشاء حساب',
    verificationCode:'رمز التأكيد',
    verify: 'تأكيد',
    phoneNumber:'رقم الهاتف', 
    key:'+٩٦٢',
       



};

const { passwordAndConfirmContainer, btnImage, visibilityBtn, mainLoginContainer, secondContainerInLogin, emailInputStyle, forgetPassCreateAccountContainer, logiSocailMediaContainer, orContainer, viewInsideOrStyle, loginTextStyleInLoginTab
    , orTextStyle, facebookContainer, loginTouchable, facebookTouchable, socailIconStyle, spaceBtweenSocailIcons, loginWithGoogleTouchable
,forgetPasswordText,creatAccountText ,facebookContairInLogin} = styles

export default class ForgetPasswordEmailScreen extends Component {

    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            userName:'',
            userNamePBottomLine:'#F5F5F5',
            loginBg: 'white',
            signupBG: 'white',
            signupFontColor: '#86764f',
            loginFontColor: '#86764f',
            loading: true,
            isReady: false,
            isSplashReady: false,
            myLang: 'en',
            userID:'',
            userEmail:'',
            phone:'',
            phoneBottomLine:'#F5F5F5',

            email:0,
            isRTL:false,
            EMAILBottomLine:'#F5F5F5',
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
        this._retrieveData()
    
    
    }
    async  componentDidMount() {
        this._retrieveData()

    
    
    
   
    
    
    }

    returnPhone(){
        if( I18nManager.isRTL){
         return(
             <View style={{flexDirection:'row',alignItems:'center',paddingStart:7}}>
               <TextInput textAlign={I18nManager.isRTL?'right':'left'}
                 onChangeText={(text) => this.setState({phone:text})}
                 placeholderTextColor='#777777' keyboardType='phone-pad' placeholder={i18n.t('phoneNumber')}  style={{ fontFamily:'newFont', 
                 fontSize: 13,fontFamily:'Acens',
             fontWeight: "normal",
             fontStyle: "normal",
             paddingStart:0,
             letterSpacing: 0,
             width:Dimensions.get('window').width/1.4,
             color: "#777777"
             }} />
             <Text style={{width:40, fontSize: 13,fontFamily:'Acens',
             fontWeight: "normal",marginLeft:10,
             fontStyle: "normal",backgroundColor:'#F5F5F5',
             color: "#777777"}}>{i18n.t('key')} </Text>
                
 </View>
         )}
         else{
             return(
                 <View style={{flexDirection:'row',alignItems:'center',paddingStart:7}}>
                  
                 <Text style={{width:40, fontSize: 13,fontFamily:'Acens',
                 fontWeight: "normal",
                 fontStyle: "normal",
                 color: "#777777"}}>{i18n.t('key')} </Text>
                     <TextInput textAlign={I18nManager.isRTL?'right':'left'}
                     onChangeText={(text) => this.setState({phone:text})}
                     placeholderTextColor='#777777' keyboardType='phone-pad' placeholder={i18n.t('phoneNumber')}  style={{ fontFamily:'newFont', 
                     fontSize: 13,fontFamily:'Acens',
                 fontWeight: "normal",
                 fontStyle: "normal",
                 paddingEnd:45,
                 paddingStart:5,
                 letterSpacing: 0,
                 width:Dimensions.get('window').width/1.3,
                 color: "#777777"
                 }} />
     </View>
             )}
         
     }


    _storeData = async (userID,userName,userPhone,userPassword,email) => {
        // save the lang in storage
        await AsyncStorage.setItem("userID", userID+'');
        await AsyncStorage.setItem("firstName", userName+''); 
        await AsyncStorage.setItem("userPhone", userPhone+'');
        await AsyncStorage.setItem("userPassword", userPassword+'');
        await AsyncStorage.setItem("userEmail", email+'');

        

      
    }
    
    loginBG() {
        this.setState({

            loginBg: '#86764f',
            signupBG: 'white',
            loginFontColor: 'white',
            signupFontColor: '#86764f'
        });
    }
    signupBG() {
        this.setState({
            signupBG: '#86764f',
            loginBg: 'white',
            signupFontColor: 'white',
            loginFontColor: '#86764f'
        });
    }
  

    _handlePress = async () => {
    
    if(this.state.userName.length>0){
        this.setState({userNamePBottomLine:'#F5F5F5'})
       
    
        client.post(`/app/processforgotpassword?user_name=${this.state.userName}`).then((res) => {
            console.log('send email forgeet pass',res.data)
           
            if(res.data.status=='200'){
                 showMessage({
                        message: res.data.message,
                        type: "success",
                      });
                      this.props.navigation.navigate("RestPassword",{userName:this.state.userName}) 
    
            }else if(res.data.status=='400'){
                showMessage({
                    message: res.data.message,
                    type: "danger",
                  });
            

}else{
    showMessage({
        message: res.data.message,
        type: "danger",
      });
}
        })

    
     } else{
this.setState({userNamePBottomLine:'red'})
    }
    }
    render() {
        i18n.fallbacks = true;
        i18n.translations = { ar, en };
        console.log('test:' + this.state.myLang);

        i18n.locale = this.state.myLang;

     

        return (
<StyleProvider style={getTheme(variables)}>
      <Container >
     
       <Header style={{height:99,backgroundColor:'#8FCFEB'}}>
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
        <Body style={styles.header}>
              <Title style={[styles.header,{fontSize:25,width:Dimensions.get('window').width/2,fontFamily:'Acens',marginLeft:-10,color:'white'}]}>LOG IN</Title>
            </Body>
        </Header> 

            <View style={mainLoginContainer}>

            <View style={secondContainerInLogin}>
<View style={{height:20}}/>


<TextInput textAlign={I18nManager.isRTL?'right':'left'}
                                onChangeText={(text) => this.setState({userName:text})}
                               placeholderTextColor='#777777'  placeholder='USER NAME'  style={[emailInputStyle,{borderColor:this.state.userNamePBottomLine,borderWidth:1}]}/>
           
           
                                  

                <View style={{height:20}}/>

                <View style={{width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity
                       onPress={() =>{ this._handlePress()}}
                    style={loginTouchable}
                   >
                        <Text style={loginTextStyleInLoginTab}>SEND</Text>
                    </TouchableOpacity>
                    </View>
               

              </View>
        </View>
</Container>
</StyleProvider>

        );
    }



}
