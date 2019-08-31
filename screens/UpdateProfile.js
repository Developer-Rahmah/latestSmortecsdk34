
import React, { Component } from 'react';
import { Drawer, Container, Header, Left, Right, Icon, Body, Title, Content, Button, CheckBox, Segment } from 'native-base';
import { Image, View, Dimensions, I18nManager, AsyncStorage, ScrollView, Platform, StyleSheet, Text, StatusBar, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import styles from '../css/styles'
import client from '../api/constant'
import { showMessage, hideMessage } from "react-native-flash-message";

import { Localization } from 'expo-localization';
import Expo from 'expo';



import i18n from 'i18n-js';

let finaln = '';
let finalp = '';
let finalLN='';
let finalEm='';

const en = {
    profileupdattedsuccessfully:'your profile updated successfully',
    
    currentPassowrd: 'Current Password',
    newPassword: 'New Password',
    confirmnewPassword: 'Confirm a New Password',

    myProfile:'MY ACCOUNT',
    saveChanges:'SAVE CHANGES',
    firstName:'First Name',
    lastName:'Last Name',
    email:'Email',
    userName:'User Name',
    phone:'Phone Number',
    pharmacyName:'pharmacy Name',
    password:'New Passowrd',
    passowrdnotmatches:'Password and confirm password not match',
    oldpassword:'Old Passowrd',
    oldpassowrdnotmatches:'Password and old password not match',


    
   
};
const ar = {
    profileupdattedsuccessfully:'تم تحديث حسابك بنجاح',

    currentPassowrd: 'كلمة المرور الحالية',
    password: 'كلمة مرور جديدة',
    myProfile:'حسابي',
    saveChanges:'حفظ التغييرات',
    firstName:'الاسم الاول',
    lastName:'الاسم الاخير',
    email:'البريد الالكتروني',
    userName:'اسم المستخدم',
    phone:'رقم الهاتف',
    pharmacyName:'اسم الصيدلية',
    confirmnewPassword: 'تأكيد كلمة المرور الجديدة',
    passowrdnotmatches:'كلمة المرور وتأكيد كلمة المرور غير متطابقات',
    oldpassword:'كلمة المرور السابقة',
    oldpassowrdnotmatches:'كلمة المرور و كلمة المرور السابقة غير متطابقات',





};

const { width } = Dimensions.get('window');
const height = width * 0.8


const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

const {  passwordInputStyle, btnImage, visibilityBtn, mainLoginContainer, secondContainerInLogin, emailInputStyle, forgetPassCreateAccountContainer, signupSocailMediaContainer, orContainer, viewInsideOrStyle, loginTextStyleInLoginTab
    , orTextStyle, facebookContainer, loginTouchable, facebookTouchable, socailIconStyle, spaceBtweenSocailIcons, loginWithGoogleTouchable,iAgreeTextStyle,
agreeTerms,passwordAndConfirmContainer,checkBoxStyle } = styles
export default class UpdateProfile extends Component {

    static navigationOptions = {
        header:null
        // left: (<Icon name={'chevron-left'} onPress={() => { goBack() }} />),
        // title: 'My Account',
        // headerStyle: {
        //   backgroundColor: '#8FCFEB', fontFamily: 'Acens', color: 'white', height: 77,
        //   elevation: null
        // },
        // headerTitleStyle: {
        //   fontFamily: 'Acens', color: 'white', fontSize: 25
        // },
       
      };


    constructor(props) {
        super(props);
        this.state = {
            yes:false,
            oldborder:0,
            oldPassowrd:'',
            hidePasswordOld:true,
password:'',
confirmnewPassword:'',


            pharmcyNmae:'',
finalNameState:'',
            hidePassword: true,
            checked: false,
            checkBoxBackgroundColor: 'white',
            hideConfirmPassword: true,
            disable: true,
            userID:'',
            firstNmae:'',

            lastName:'',

            userPhone:'',
            userPassword:'',
            userEmail:'',

            userIDNew:'',
            firstNew:'',
            lastNew:'',
            userPhoneNew:'',
            userPasswordNew:'',
            userEmailNew:'',
            userNewPass:'',

            lastUsName:'',
            lastPhone:'',
            lastPass:'',
            lastEmail:'',

            myLang: AsyncStorage.getItem("myLang").then((value) => {
                this.setState({ "myLang": value })
            }).done()
            ,
            
            
        };
    }
    _retrieveData = async () => {
       
    
        try {
          const value = await AsyncStorage.getItem('userID');
          const lastName = await AsyncStorage.getItem('lastName');

          const namevalue =  await AsyncStorage.getItem("firstName"); 
          const phonevalue = await AsyncStorage.getItem("userPhone");
          const passwvalue = await AsyncStorage.getItem("userPassword");
          const userEmail = await AsyncStorage.getItem("userEmail");
         const pharmcyNmae = await AsyncStorage.getItem("pharmcyNmae");
          
      
          if (value !== null) {
            // We have data!!
            console.log('userid:',value);
            console.log('namevalue:',namevalue);
            console.log('phonevalue:',phonevalue);
            console.log('passwvalue:',passwvalue);
            console.log('userEmail:',userEmail);
            console.log('lastttname:',lastName);

      this.setState({
        userID:value,
        firstNmae:namevalue,
        userPhone:phonevalue,
        userPassword:passwvalue,
        userEmail:userEmail,
        lastName:lastName,
        pharmcyNmae:pharmcyNmae
      })
          
          }
        } catch (error) {
          // Error retrieving data
          console.log('getstorageitemerrrror',error);
        }
        
      };
      componentDidMount() {
        this._retrieveData()
         
//        if(this.state.userNmaeNew !=''|| this.state.userEmailNew != ''||this.state.userPhoneNew !=''|| this.state.userPasswordNew !=''||this.state.userNewPass){
// this.setState({
//     disable:true
// })
//        }
      }
    manageHidenConfirmPasswordVisibility = () => {
        this.setState({ hideConfirmPassword: !this.state.hideConfirmPassword });
    }

    managePasswordVisibilityOld = () => {
        this.setState({ hidePasswordOld: !this.state.hidePasswordOld });
    }
    managePasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
    }
    onCheckPressed() {
        this.setState({ checked: !this.state.checked })
        if (this.state.checked) {
            this.setState({ checkBoxBackgroundColor: 'white' })
        }
        else {
            this.setState({ checkBoxBackgroundColor: '#8FCFEB' })
        }

    }

    _storeData = async (userName,userPhone) => {
        // save the lang in storage
        // await AsyncStorage.setItem("userID", userID+'');
        await AsyncStorage.setItem("userName", userName+''); 
        await AsyncStorage.setItem("userPhone", userPhone+'');
        // await AsyncStorage.setItem("userPassword", userPassword+'');
        // await AsyncStorage.setItem("userEmail", email+'');

        

      
    }
    _storeDataName = async (userName,) => {
       
        await AsyncStorage.setItem("firstName", userName+''); 
        // await AsyncStorage.setItem("userPhone", userPhone+'');
      
    }
    _storeDataLastName = async (userName,) => {
       
        await AsyncStorage.setItem("lastName", userName+''); 
        // await AsyncStorage.setItem("userPhone", userPhone+'');
      
    }

    _storeDataEmail = async (userEmail,) => {
       
        await AsyncStorage.setItem("userEmail", userEmail+''); 
        // await AsyncStorage.setItem("userPhone", userPhone+'');
      
    }
    _storeDataPhone = async (userPhone,) => {
       
        await AsyncStorage.setItem("userPhone", userPhone+''); 
        // await AsyncStorage.setItem("userPhone", userPhone+'');
      
    }


_handlePress2 = async () => {
    // save the lang in storage
    if(this.state.firstNew==''){
        console.log('usernamenew',this.state.firstNew)
        console.log('usernameprev',this.state.firstNew)

        this.setState({firstNew:this.state.firstNmae})
        this._storeDataName(this.state.firstNmae)

    }else{
        this._storeDataName(this.state.firstNew)
        this.setState({userName:this.state.firstNew})
        console.log('usernamenew',this.state.firstNew)

    }
    if(this.state.userNewPass==''){
            this.setState({userNewPass:this.state.userPassword})
        }else{
            this.setState({userNewPass:this.state.userNewPass})
  
        }
   
    if(this.state.userPhoneNew==''){
        console.log('userphonenew',this.state.userPhoneNew)
        console.log('userphoneprev',this.state.userPhone)

        this.setState({userPhoneNew:this.state.userPhone})
        this._storeDataPhone(this.state.userPhone)

    }else{
        this._storeDataPhone(this.state.userPhoneNew)
        this.setState({userPhone:this.state.userPhoneNew})
        console.log('userphonenew',this.state.userPhoneNew)

    }

    if(this.state.lastNew==''){
        console.log('usernamenew',this.state.lastName)
        console.log('usernameprev',this.state.lastNew)

        this.setState({lastNew:this.state.lastName})
        this._storeDataLastName(this.state.lastName)

    }else{
        this._storeDataLastName(this.state.lastNew)
        this.setState({userName:this.state.lastNew})
        console.log('usernamenew',this.state.lastNew)

    }
    

    if(this.state.userEmailNew==''){
        console.log('usernamenew',this.state.userEmail)
        console.log('usernameprev',this.state.userEmailNew)

        this.setState({lastNew:this.state.userEmail})
        this._storeDataEmail(this.state.userEmail)

    }else{
        this._storeDataEmail(this.state.userEmailNew)
        this.setState({userName:this.state.userEmailNew})
        console.log('usernamenew',this.state.userEmailNew)

    }
    
    
  
if((this.state.firstNmae==''&& this.state.firstNew=='') || (this.state.lastName==''&& this.state.lastNew=='')|| (this.state.userPassword=='' &&this.state.userPasswordNew=='')|| (this.state.userEmail=='' && this.state.userEmailNew=='') ){
showMessage({
    message: "something went wrong",
    type: "danger",
  });

    
}else{
    if(this.state.firstNew==''){
        finaln=this.state.firstNmae
        // this.setState({finalNameState:this.state.userName})
    }else{
        // this.setState({finalNameState:this.state.userNmaeNew})
        finaln=this.state.firstNew
    }

    if(this.state.lastNew==''){
        finalLN=this.state.lastName
        // this.setState({finalNameState:this.state.userName})
    }else{
        // this.setState({finalNameState:this.state.userNmaeNew})
        finalLN=this.state.firstNew
    }

    if(this.state.userEmailNew==''){
        finalEm=this.state.userEmail
        // this.setState({finalNameState:this.state.userName})
    }else{
        // this.setState({finalNameState:this.state.userNmaeNew})
        finalEm=this.state.userEmailNew
    }

    if(this.state.userPhoneNew==''){
        finalp=this.state.userPhone
        // this.setState({finalNameState:this.state.userName})
    }else{
        // this.setState({finalNameState:this.state.userNmaeNew})
        finalp=this.state.userPhoneNew
    }
    if(this.state.password.length>0){
        if(this.state.oldPassowrd.length==0){
            this.setState({oldborder:1})
        }else{
            this.setState({oldborder:0})
        // if(this.state.oldPassowrd != this.state.userPassword){
        //     showMessage({
        //         message: i18n.t('oldpassowrdnotmatches'),
        //         type: "danger",
        //       }); 
        // }

     
}

        if(this.state.confirmnewPassword.length==0){
            this.setState({confirmborder:1})
        }else{
            if(this.state.password==this.state.confirmnewPassword){


                this.setState({confirmborder:0})

                var strongRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])");
                if(strongRegex.test(this.state.password) === false&&this.state.password.length<6){
                    showMessage({
                                 message: 'Password should be contain at least one capital letter and numbers ',
                                 type: "danger",
                               }); 
                
                }else{
                    this.setState({yes:true})
                }
                console.log('user old password',this.state.userPassword)
                console.log('user new password',this.state.userPassword)
console.log('post apiiii',`app/updatecustomerinfo?customers_id=${this.state.userID}&
    customers_firstname=${finaln}&customers_telephone=${finalp}&customers_lastname=${finalLN}&email=${finalEm}&new_password=${this.state.password}&old_password=${this.state.userPassword}`)
    if(this.state.yes){
            
    client.post(`/app/updatecustomerinfo?customers_id=${this.state.userID}&
    customers_firstname=${finaln}&customers_telephone=${finalp}&customers_lastname=${finalLN}&email=${finalEm}&new_password=${this.state.password}&old_password=${this.state.oldPassowrd}`).then((res) => {
        console.log('data user update profile',res.data)
        console.log('test',res.data)

        if(res.data.status=='200'){
            console.log('res',res.data)
//             this.setState({lastUsName:res.data.data[0].customers_firstname,
//                 lastPhone:res.data.data[0].customers_telephone,
//                 lastPass:this.state.userNewPass})
//             this._storeData(this.state.lastUsName,this.state.lastPhone,)
// console.log('lasstttupdate',this.state.lastUsName,this.state.lastPhone,this.state.userNewPass)
// this._retrieveData()
showMessage({
    
    message: i18n.t ('profileupdattedsuccessfully'),
    type: "success",
  }); 
    this.props.navigation.navigate("Home") 


        }else{
            showMessage({
                message: res.data.message,
                type: "danger",
              }); 

        }
// if(res.data.message==='Sign Up successfully!'){

    })
    }

            }else{
                showMessage({
                    message: i18n.t ('passowrdnotmatches'),
                    type: "danger",
                  }); 
    
            }
        }
    }else{
        client.post(`/app/updatecustomerinfo?customers_id=${this.state.userID}&
    customers_firstname=${finaln}&customers_telephone=${finalp}&customers_lastname=${finalLN}&email=${finalEm}`).then((res) => {
        console.log('data user update profile',res.data)
        // console.log('test',res.data)

        if(res.status=='200'){
            // console.log('res',res.data)
//             this.setState({lastUsName:res.data.data[0].customers_firstname,
//                 lastPhone:res.data.data[0].customers_telephone,
//                 lastPass:this.state.userNewPass})
//             this._storeData(this.state.lastUsName,this.state.lastPhone,)
// console.log('lasstttupdate',this.state.lastUsName,this.state.lastPhone,this.state.userNewPass)
// this._retrieveData()
showMessage({
    
    message: i18n.t ('profileupdattedsuccessfully'),
    type: "success",
  }); 
this.props.navigation.navigate("Home") 
        }
// if(res.data.message==='Sign Up successfully!'){

    })

    }
   
//     client.post(`/app/updatecustomerinfo?customers_id=${this.state.userID}&
//     customers_firstname=${finaln}&customers_telephone=${finalp}&customers_lastname=${finalLN}&email=${finalEm}`).then((res) => {
//         console.log('data user update profile',res.data)
//         // console.log('test',res.data)

//         if(res.status=='200'){
//             // console.log('res',res.data)
// //             this.setState({lastUsName:res.data.data[0].customers_firstname,
// //                 lastPhone:res.data.data[0].customers_telephone,
// //                 lastPass:this.state.userNewPass})
// //             this._storeData(this.state.lastUsName,this.state.lastPhone,)
// // console.log('lasstttupdate',this.state.lastUsName,this.state.lastPhone,this.state.userNewPass)
// // this._retrieveData()
// this.props.navigation.navigate("Home") 
//         }
// // if(res.data.message==='Sign Up successfully!'){

//     })

// }
// console.log('paswword',this.state.userPassword)

}}
    render() {
        i18n.fallbacks = true;
        i18n.translations = { ar, en };
        //i18n.locale =null;
        console.log('test:' + this.state.myLang);
    
        i18n.locale = this.state.myLang;
        return (
            <Container>
                 {/* <Header style={{height:99,backgroundColor:'#8FCFEB'}}>
        
        <Left style={{}}>
        <Button style={{}} transparent onPress={() => this.props.navigation.goBack()}>
        <Icon style={{  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],}} name={
        Platform.OS === 'ios'
          ? `ios-arrow-back`
          : 'arrow-back'
      }  />
                  </Button>
           
        </Left>
        <Body style={styles.header}>
              <Title style={[styles.header,{fontSize:25,width:Dimensions.get('window').width/1.5,fontFamily:'Acens',marginLeft:0}]}>{i18n.t('myProfile')} </Title>
            </Body>
            <Right style={{width:50,justifyContent:'flex-end',marginRight:-70}} >
              <Body> 
              <TouchableOpacity 
     onPress={() =>
      this.props.navigation.navigate('OrderScreen')

  }
    style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

    <Icon style={{color:'white',}} name={
        Platform.OS === 'ios'
          ? `md-cart`
          : 'md-cart'
      }/>
          
</TouchableOpacity>
                
</Body>
            </Right>
        </Header>  */}
           <Header style={{height:99,backgroundColor:'#8FCFEB'}}>
        
        <Left>
        <Button style={{}} transparent onPress={() => this.props.navigation.goBack()}>
        <Icon
         style={{  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],}}
        name={
        Platform.OS === 'ios'
          ? `ios-arrow-back`
          : 'arrow-back'
      }  />
                  </Button>
           
        </Left>
        <Body style={[styles.header,{width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center'}]}>
              <Title style={[styles.header,{fontSize:25,width:Dimensions.get('window').width/1.5,fontFamily:'Acens',marginStart:0}]}>{i18n.t('myProfile')}</Title>
            </Body>
            <Right style={{width:100,justifyContent:'flex-end',marginRight:-100}} >
              <Body> 
              <View 
//      onPress={() =>
//       this.props.navigation.navigate('OrderScreen')

//   }
    style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

           {/* <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#c1c0c9"}}>Cart</Text> */}
</View>
               
</Body>
            </Right>
        </Header> 
           
            <Content style={{flex:1,}}>

            <View style={mainLoginContainer}>
                <View style={secondContainerInLogin}>


                <Text
                   
                   style={{ 
                    marginTop:20      ,
                               marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 16,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('firstName')}</Text>



                    <TextInput 
                     onChangeText={(text) => this.setState({firstNew:text})}
                    placeholderTextColor='#777777' placeholder={this.state.firstNmae} style={[emailInputStyle,]}/>
                    
                    <Text
                   
                   style={{ 
                    marginTop:7      ,
                               marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 16,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('lastName')}</Text>
                    
                     <TextInput 
                     onChangeText={(text) => this.setState({lastNew:text})}
                    placeholderTextColor='#777777' placeholder={this.state.lastName} style={emailInputStyle}/>

<Text
                   
                   style={{ 
                    marginTop:7      ,
                               marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 16,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('pharmacyName')}</Text>

                   <TextInput 
                    editable={false}  
                    //  onChangeText={(text) => this.setState({userEmailNew:text})}
                    placeholderTextColor='#777777' keyboardType='email-address' placeholder={this.state.pharmcyNmae} style={emailInputStyle}/>
                    

                    <Text
                   
                   style={{ 
                    marginTop:7      ,
                               marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 16,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('email')}</Text>

                    <TextInput 
                    
                      onChangeText={(text) => this.setState({userEmailNew:text})}
                    placeholderTextColor='#777777' keyboardType='email-address' placeholder={this.state.userEmail} style={emailInputStyle}/>
                   
                   <Text
                   
                   style={{ 
                    marginTop:7      ,
                               marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 16,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('phone')}</Text>
                    <TextInput 
                     onChangeText={(text) => this.setState({userPhoneNew:text})}
                    placeholderTextColor='#777777' keyboardType='phone-pad' placeholder={this.state.userPhone} style={emailInputStyle}/>








<Text
                   
                   style={{ 
                    marginTop:7      ,
                               marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 16,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('oldpassword')}</Text>
                    
                    </View>
                    <View style={passwordAndConfirmContainer}>
                        <TextInput
                         onChangeText={(text) => this.setState({oldPassowrd:text})}
                        underlineColorAndroid="transparent" placeholderTextColor='#777777' placeholder={i18n.t('oldpassword')}  secureTextEntry={this.state.hidePasswordOld} style={[passwordInputStyle,{borderWidth:this.state.oldborder,borderColor:'red', textAlign:I18nManager.isRTL?'right':'left'}]} />
                        <TouchableOpacity activeOpacity={0.8} style={visibilityBtn} onPress={this.managePasswordVisibilityOld}>
                            <Image source={(this.state.hidePasswordOld) ? require('../assets/images/hideeye.png') : require('../assets/images/eye.png')} style={btnImage} />
                        </TouchableOpacity>

</View>
<View style={passwordAndConfirmContainer}>


<Text
                   
                   style={{ 
                    marginTop:7      ,
                               marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 16,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('password')}</Text>
                    
                    </View>
                    <View style={passwordAndConfirmContainer}>
                        <TextInput
                         onChangeText={(text) => this.setState({password:text})}
                        underlineColorAndroid="transparent" placeholderTextColor='#777777' placeholder={i18n.t('password')}  secureTextEntry={this.state.hidePassword} style={[passwordInputStyle,{borderWidth:0,textAlign:I18nManager.isRTL?'right':'left'}]} />
                        <TouchableOpacity activeOpacity={0.8} style={visibilityBtn} onPress={this.managePasswordVisibility}>
                            <Image source={(this.state.hidePassword) ? require('../assets/images/hideeye.png') : require('../assets/images/eye.png')} style={btnImage} />
                        </TouchableOpacity>

</View>
<View style={passwordAndConfirmContainer}>


                        <Text
                   
                   style={{ 
                    marginTop:7      ,
                               marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 16,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('confirmnewPassword')}</Text>
                    
                    </View>
                    <View style={passwordAndConfirmContainer}>
                        <TextInput
                         onChangeText={(text) => this.setState({confirmnewPassword:text})}
                        underlineColorAndroid="transparent" placeholderTextColor='#777777' placeholder={i18n.t('confirmnewPassword')}  secureTextEntry={this.state.hideConfirmPassword} style={[passwordInputStyle,{borderWidth:this.state.confirmborder,borderColor:'red',textAlign:I18nManager.isRTL?'right':'left'}]} />
                        <TouchableOpacity activeOpacity={0.8} style={visibilityBtn} onPress={this.manageHidenConfirmPasswordVisibility}>
                            <Image source={(this.state.hideConfirmPassword) ? require('../assets/images/hideeye.png') : require('../assets/images/eye.png')} style={btnImage} />
                        </TouchableOpacity>
                        {/* </View> */}

<View style={{height:20}}/>
                  

                        {/* <View style={passwordAndConfirmContainer}>

                        <TextInput 
                         onChangeText={(text) => this.setState({userNewPass:text})}
                        underlineColorAndroid="transparent" placeholderTextColor='#777777' placeholder={i18n.t('newPassword')} secureTextEntry={this.state.hideConfirmPassword} style={passwordInputStyle} />
                        <TouchableOpacity activeOpacity={0.8} style={visibilityBtn} onPress={this.manageHidenConfirmPasswordVisibility}>
                            <Image source={(this.state.hideConfirmPassword) ? require('../assets/images/hideeye.png') : require('../assets/images/eye.png')} style={btnImage} />
                        </TouchableOpacity></View> */}
                       


                    
                  
                </View> 
              
                
            </View>
            {/* <View style={agreeTerms}>
                        <TouchableOpacity>
                        <CheckBox
                            style={[checkBoxStyle,{backgroundColor: this.state.checkBoxBackgroundColor}]}
                            checked={this.state.checked}
                            onPress={() => this.onCheckPressed()}
                        />
                                                </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={iAgreeTextStyle}>I agree to the Terms and Conditions</Text>
                        </TouchableOpacity>
                    </View>  */}
                    <View style={{width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity
//  disabled={this.state.disable? true:false}

// disabled={!this.state.userNmaeNew || !this.state.userEmailNew || !this.state.userPhoneNew|| !this.state.userPasswordNew|| !this.state.userNewPass}
                     onPress={() => this._handlePress2()}
                    style={loginTouchable} 
                    // style={[loginTouchable,{backgroundColor:this.state.disable?'gray':'#8FCFEB'}]} 
                    >
                            <Text style={loginTextStyleInLoginTab}>{i18n.t('saveChanges')}</Text>
                        </TouchableOpacity>
                        <View style={{height:20}}/>

                        </View>
                        {/* <View style={orContainer}>
                            <View style={viewInsideOrStyle} />
                            <Text style={orTextStyle}>or</Text>
                            <View style={viewInsideOrStyle} />
                        </View>
                        <View style={facebookContainer}>
                            <TouchableOpacity style={facebookTouchable}>
                                <Image
                                    source={require('../assets/images/facebookicon.png')}
                                    style={socailIconStyle}
                                />
                            </TouchableOpacity>
                            <View style={spaceBtweenSocailIcons} />
                            <TouchableOpacity style={loginWithGoogleTouchable}>
                                <Image
                                    source={require('../assets/images/googleicon.png')}
                                    style={socailIconStyle}
                                />
                            </TouchableOpacity>
                        </View> */}
            </Content>
</Container>
        );
    }
}
