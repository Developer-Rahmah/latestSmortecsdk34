
import React, { Component } from 'react';
import { Drawer, Container, Header, Left, Right, Icon, Body, Title, Content, Button, CheckBox, Segment } from 'native-base';
import { Image, View, Dimensions, I18nManager, AsyncStorage, ScrollView, Platform, StyleSheet, Text, StatusBar, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import styles from '../css/styles'
import client from '../api/constant'
import { showMessage, hideMessage } from "react-native-flash-message";

import { Localization } from 'expo-localization';
import Expo from 'expo';

// import i18n from '../config/i18n';

import i18n from 'i18n-js';
const en = {
    signup: 'SIGN UP',
    login: 'LOG IN',
    fullNmae:'FULL NAME',
    email:'EMAIL',
    password:'PASSWORD',
    phoneNumber:'PHONE NUMBER',
    confirmPassword:'CONFIRM PASSWORD',
    key:'+962',
    or:'OR',
    iAgreeToTermsAndCondations:'I Agree The Terms And Conditions',
    pleaseCheck:'Please Check If You Agree',
    passowrdnotmatches:'Password and confirm password not match',
    
    firstName:'FIRST NAME',
    lastName:'LAST NAME',
    email:'EMAIL',
    pharmacyName:'PHARMACY NAME',
    jordan:'JORDAN',
    userName:'USER NAME',
    CreatingAnAccount:"Creating an account mean you're okay with our ",
    termsAndCodi:'Terms and Conditions',
    and:'and',
    privacyPolicy:'Privacy Policy',
    AlreadyHaveanAccount:'Already Have an Account? ',
    alogin:'Login'

    
   
};
const ar = {
    signup: 'إنشاء حساب',
    login: 'تسجيل الدخول',
    fullNmae:'الاسم الكامل',
    email:'البريد الالكتروني',
    password:'كلمة المرور',
    phoneNumber:'رقم الهاتف',
    confirmPassword:'تأكيد كلمة المرور',
    key:'+962',
    or:'او',
    iAgreeToTermsAndCondations:'اوافق على الشروط والاحكام',
    pleaseCheck:'الرجاء الموافقة على الشروط والأحكام',
    passowrdnotmatches:'كلمة المرور وتأكيد كلمة المرور غير متطابقات',

    firstName:'الاسم الاول',
    lastName:'الاسم الاخير',
    email:'البريد الالكتروني',
    pharmacyName:'اسم الصيدلية',
    jordan:'الاردن',
    userName:'اسم المستخدم',
    CreatingAnAccount:" تسجيلك هذا يعني انك موافق على",
    termsAndCodi:' الشروط و الأحكام',
    and:'و ',
    privacyPolicy:'سياسة الخصوصية',
    AlreadyHaveanAccount:'لديك حساب مسبق ؟  ',
    alogin:'تسجيل دخول'




};
const { width } = Dimensions.get('window');
const height = width * 0.8



const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

const {  passwordInputStyle, btnImage, visibilityBtn, mainLoginContainer, secondContainerInLogin, emailInputStyle, forgetPassCreateAccountContainer, signupSocailMediaContainer, orContainer, viewInsideOrStyle, loginTextStyleInLoginTab
    , orTextStyle, facebookContainer, loginTouchable, facebookTouchable, socailIconStyle, spaceBtweenSocailIcons, loginWithGoogleTouchable,iAgreeTextStyle,
agreeTerms,passwordAndConfirmContainer,checkBoxStyle } = styles
export default class SignUpScreen extends Component {

    static navigationOptions = {
        header: null,
    };


    constructor(props) {
        super(props);
        this.state = {
            userNameP:'',
            userNamePBottomLine:'#F5F5F5',

            userNameBottomLine:'#F5F5F5',
            passwordBottomLine:'#F5F5F5',
            emailBottomLine:'#F5F5F5',
            phoneBottomLine:'#F5F5F5',
            passwordBottomLine:'#F5F5F5',
            confirmPasswordBottomLine:'#F5F5F5',
            firstNameBottomLine:'#F5F5F5',
            lastNameBottomLine:'#F5F5F5',
            pharmacyNmaeBottomLine:'#F5F5F5',
            countryBottomLine:'#F5F5F5',

          
            checked: true,
            checkBoxBackgroundColor: 'white', 
             hidePassword: true,
            hideConfirmPassword: true,
            username: '',
            firstNmae:'',
            lastNmae:'',
            pharmcyNmae:'',
            country:'Jordan',

            password: '',
            confirmPass:'',
            email:'',
            phone:'', myLang: AsyncStorage.getItem("myLang").then((value) => {
                this.setState({ "myLang": value })
            }).done()
            ,

        
            
        };
    }

    manageHidenConfirmPasswordVisibility = () => {
        this.setState({ hideConfirmPassword: !this.state.hideConfirmPassword });
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

    _storeData = async (email) => {
        // save the lang in storage
       
        await AsyncStorage.setItem("userEmail", email+'');

        

      
    }

    _handlePress = async () => {
        // save the lang in storage

        if(this.state.firstNmae.length>0&&this.state.password.length>0&&this.state.lastNmae.length>0&&this.state.pharmcyNmae.length>0&&this.state.userNameP.length>0&&this.state.country>0
            &&this.state.email.length>0&&this.state.phone.length>0&&this.state.password.length>0
            &&this.state.confirmPass.length>0&&(this.state.password==this.state.confirmPass)){
            this.setState({firstNameBottomLine:'#F5F5F5'})
            this.setState({lastNameBottomLine:'#F5F5F5'})
            this.setState({emailBottomLine:'#F5F5F5'})
            this.setState({phoneBottomLine:'#F5F5F5'})
            this.setState({pharmacyNmaeBottomLine:'#F5F5F5'})
            this.setState({passwordBottomLine:'#F5F5F5'})
            this.setState({countryBottomLine:'#F5F5F5'})
            this.setState({confirmPasswordBottomLine:'#F5F5F5'})
            this.setState({userNamePBottomLine:'#F5F5F5'})


           
            console.log(' IN REG API')


       
    
        }else if(this.state.firstNmae.length==0){
            if(this.state.lastNmae.length>0){
                this.setState({lastNameBottomLine:'#F5F5F5'})
        
               }else{
                   this.setState({lastNameBottomLine:'red'}) 
               }
               if(this.state.pharmcyNmae.length>0){
                this.setState({pharmacyNmaeBottomLine:'#F5F5F5'})
        
               }else{
                   this.setState({pharmacyNmaeBottomLine:'red'}) 
               }
               if(this.state.userNameP.length>0){
                this.setState({userNamePBottomLine:'#F5F5F5'})
        
               }else{
                   this.setState({userNamePBottomLine:'red'}) 
               }
               if(this.state.country.length>0){
                this.setState({countryBottomLine:'#F5F5F5'})
        
               }else{
                   this.setState({countryBottomLine:'red'}) 
               }
            if(this.state.password.length>0){
             this.setState({passwordBottomLine:'#F5F5F5'})
     
            }else{
                this.setState({passwordBottomLine:'red'}) 
            }
            if(this.state.email.length>0){
                this.setState({emailBottomLine:'#F5F5F5'})
        
               }else{
                this.setState({emailBottomLine:'red'}) 
            }
              
               if(this.state.confirmPass.length>0){
                this.setState({confirmPasswordBottomLine:'#F5F5F5'})
        
               }else{
                this.setState({confirmPasswordBottomLine:'red'}) 
            }
               if(this.state.phone.length>0){
                this.setState({phoneBottomLine:'#F5F5F5'})
        
               }else{
                this.setState({phoneBottomLine:'red'}) 
            }
     this.setState({firstNameBottomLine:'red'})


        
    
    
            }else if(this.state.email.length==0){

                if(this.state.lastNmae.length>0){
                    this.setState({lastNameBottomLine:'#F5F5F5'})
            
                   }else{
                       this.setState({lastNameBottomLine:'red'}) 
                   }
                   if(this.state.pharmcyNmae.length>0){
                    this.setState({pharmacyNmaeBottomLine:'#F5F5F5'})
            
                   }else{
                       this.setState({pharmacyNmaeBottomLine:'red'}) 
                   }
                   if(this.state.userNameP.length>0){
                    this.setState({userNamePBottomLine:'#F5F5F5'})
            
                   }else{
                       this.setState({userNamePBottomLine:'red'}) 
                   }
                   if(this.state.country.length>0){
                    this.setState({countryBottomLine:'#F5F5F5'})
            
                   }else{
                       this.setState({countryBottomLine:'red'}) 
                   }

                if(this.state.firstNmae.length>0){
                    this.setState({firstNameBottomLine:'#F5F5F5'})
            
                   }else{
                    this.setState({firstNameBottomLine:'red'}) 
                }
                   if(this.state.password.length>0){
                       this.setState({passwordBottomLine:'#F5F5F5'})
               
                      }else{
                        this.setState({passwordBottomLine:'red'}) 
                    }
                      
                      if(this.state.confirmPass.length>0){
                       this.setState({confirmPasswordBottomLine:'#F5F5F5'})
               
                      }else{
                        this.setState({confirmPasswordBottomLine:'red'}) 
                    }
                      if(this.state.phone.length>0){
                       this.setState({phoneBottomLine:'#F5F5F5'})
               
                      }else{
                        this.setState({phoneBottomLine:'red'}) 
                    }
                this.setState({emailBottomLine:'red'})
                   }




                else if(this.state.lastNmae.length==0){

                    if(this.state.email.length>0){
                        this.setState({emailBottomLine:'#F5F5F5'})
                
                       }else{
                           this.setState({emailBottomLine:'red'}) 
                       }
                       if(this.state.pharmcyNmae.length>0){
                        this.setState({pharmacyNmaeBottomLine:'#F5F5F5'})
                
                       }else{
                           this.setState({pharmacyNmaeBottomLine:'red'}) 
                       }
                       if(this.state.userNameP.length>0){
                        this.setState({userNamePBottomLine:'#F5F5F5'})
                
                       }else{
                           this.setState({userNamePBottomLine:'red'}) 
                       }
                       if(this.state.country.length>0){
                        this.setState({countryBottomLine:'#F5F5F5'})
                
                       }else{
                           this.setState({countryBottomLine:'red'}) 
                       }
    
                    if(this.state.firstNmae.length>0){
                        this.setState({firstNameBottomLine:'#F5F5F5'})
                
                       }else{
                        this.setState({firstNameBottomLine:'red'}) 
                    }
                       if(this.state.password.length>0){
                           this.setState({passwordBottomLine:'#F5F5F5'})
                   
                          }else{
                            this.setState({passwordBottomLine:'red'}) 
                        }
                          
                          if(this.state.confirmPass.length>0){
                           this.setState({confirmPasswordBottomLine:'#F5F5F5'})
                   
                          }else{
                            this.setState({confirmPasswordBottomLine:'red'}) 
                        }
                          if(this.state.phone.length>0){
                           this.setState({phoneBottomLine:'#F5F5F5'})
                   
                          }else{
                            this.setState({phoneBottomLine:'red'}) 
                        }
                    this.setState({lastNameBottomLine:'red'})
                       }





                    else if(this.state.country.length==0){

                        if(this.state.email.length>0){
                            this.setState({emailBottomLine:'#F5F5F5'})
                    
                           }else{
                               this.setState({emailBottomLine:'red'}) 
                           }
                           if(this.state.pharmcyNmae.length>0){
                            this.setState({pharmacyNmaeBottomLine:'#F5F5F5'})
                    
                           }else{
                               this.setState({pharmacyNmaeBottomLine:'red'}) 
                           }
                           if(this.state.userNameP.length>0){
                            this.setState({userNamePBottomLine:'#F5F5F5'})
                    
                           }else{
                               this.setState({userNamePBottomLine:'red'}) 
                           }
                           if(this.state.country.length>0){
                            this.setState({countryBottomLine:'#F5F5F5'})
                    
                           }else{
                               this.setState({countryBottomLine:'red'}) 
                           }
        
                        if(this.state.firstNmae.length>0){
                            this.setState({firstNameBottomLine:'#F5F5F5'})
                    
                           }else{
                            this.setState({firstNameBottomLine:'red'}) 
                        }
                           if(this.state.password.length>0){
                               this.setState({passwordBottomLine:'#F5F5F5'})
                       
                              }else{
                                this.setState({passwordBottomLine:'red'}) 
                            }
                              
                              if(this.state.confirmPass.length>0){
                               this.setState({confirmPasswordBottomLine:'#F5F5F5'})
                       
                              }else{
                                this.setState({confirmPasswordBottomLine:'red'}) 
                            }
                              if(this.state.phone.length>0){
                               this.setState({phoneBottomLine:'#F5F5F5'})
                       
                              }else{
                                this.setState({phoneBottomLine:'red'}) 
                            }
                        this.setState({countryBottomLine:'red'})
                           }




                        else if(this.state.pharmcyNmae.length==0){

                            if(this.state.email.length>0){
                                this.setState({emailBottomLine:'#F5F5F5'})
                        
                               }else{
                                   this.setState({emailBottomLine:'red'}) 
                               }

                               if(this.state.pharmcyNmae.length>0){
                                this.setState({pharmacyNmaeBottomLine:'#F5F5F5'})
                        
                               }else{
                                   this.setState({pharmacyNmaeBottomLine:'red'}) 
                               }
                               if(this.state.userNameP.length>0){
                                this.setState({userNamePBottomLine:'#F5F5F5'})
                        
                               }else{
                                   this.setState({userNamePBottomLine:'red'}) 
                               }
                               if(this.state.country.length>0){
                                this.setState({countryBottomLine:'#F5F5F5'})
                        
                               }else{
                                   this.setState({countryBottomLine:'red'}) 
                               }
            
                            if(this.state.firstNmae.length>0){
                                this.setState({firstNameBottomLine:'#F5F5F5'})
                        
                               }else{
                                this.setState({firstNameBottomLine:'red'}) 
                            }
                               if(this.state.password.length>0){
                                   this.setState({passwordBottomLine:'#F5F5F5'})
                           
                                  }else{
                                    this.setState({passwordBottomLine:'red'}) 
                                }
                                  
                                  if(this.state.confirmPass.length>0){
                                   this.setState({confirmPasswordBottomLine:'#F5F5F5'})
                           
                                  }else{
                                    this.setState({confirmPasswordBottomLine:'red'}) 
                                }
                                  if(this.state.phone.length>0){
                                   this.setState({phoneBottomLine:'#F5F5F5'})
                           
                                  }else{
                                    this.setState({phoneBottomLine:'red'}) 
                                }
                            this.setState({pharmacyNmaeBottomLine:'red'})
                               }


                   else if(this.state.phone.length==0){
                    if(this.state.lastNmae.length>0){
                        this.setState({lastNameBottomLine:'#F5F5F5'})
                
                       }else{
                           this.setState({lastNameBottomLine:'red'}) 
                       }
                       if(this.state.pharmcyNmae.length>0){
                        this.setState({pharmacyNmaeBottomLine:'#F5F5F5'})
                
                       }else{
                           this.setState({pharmacyNmaeBottomLine:'red'}) 
                       }

                       if(this.state.userNameP.length>0){
                        this.setState({userNamePBottomLine:'#F5F5F5'})
                
                       }else{
                           this.setState({userNamePBottomLine:'red'}) 
                       }

                       if(this.state.country.length>0){
                        this.setState({countryBottomLine:'#F5F5F5'})
                
                       }else{
                           this.setState({countryBottomLine:'red'}) 
                       }
                if(this.state.firstNmae.length>0){
                    this.setState({firstNameBottomLine:'#F5F5F5'})
            
                   }else{
                    this.setState({firstNameBottomLine:'red'}) 
                }
                   if(this.state.password.length>0){
                       this.setState({passwordBottomLine:'#F5F5F5'})
               
                      }else{
                        this.setState({passwordBottomLine:'red'}) 
                    }
                      
                      if(this.state.confirmPass.length>0){
                       this.setState({confirmPasswordBottomLine:'#F5F5F5'})
               
                      }else{
                        this.setState({confirmPasswordBottomLine:'red'}) 
                    }
                      if(this.state.email.length>0){
                       this.setState({emailBottomLine:'#F5F5F5'})
               
                      }else{
                        this.setState({emailBottomLine:'red'}) 
                    }
                this.setState({phoneBottomLine:'red'})
                   }
    
    
    else if(this.state.password.length==0){
        if(this.state.lastNmae.length>0){
            this.setState({lastNameBottomLine:'#F5F5F5'})
    
           }else{
               this.setState({lastNameBottomLine:'red'}) 
           }
           if(this.state.pharmcyNmae.length>0){
            this.setState({pharmacyNmaeBottomLine:'#F5F5F5'})
    
           }else{
               this.setState({pharmacyNmaeBottomLine:'red'}) 
           }
           if(this.state.userNameP.length>0){
            this.setState({userNamePBottomLine:'#F5F5F5'})
    
           }else{
               this.setState({userNamePBottomLine:'red'}) 
           }
           if(this.state.country.length>0){
            this.setState({countryBottomLine:'#F5F5F5'})
    
           }else{
               this.setState({countryBottomLine:'red'}) 
           }
         if(this.state.firstNmae.length>0){
             this.setState({firstNameBottomLine:'#F5F5F5'})
     
            }else{
                this.setState({firstNameBottomLine:'red'}) 
            }
            if(this.state.email.length>0){
                this.setState({emailBottomLine:'#F5F5F5'})
        
               }else{
                this.setState({emailBottomLine:'red'}) 
            }
               
               if(this.state.confirmPass.length>0){
                this.setState({confirmPasswordBottomLine:'#F5F5F5'})
        
               }else{
                this.setState({confirmPasswordBottomLine:'red'}) 
            }
               if(this.state.phone.length>0){
                this.setState({phoneBottomLine:'#F5F5F5'})
        
               }else{
                this.setState({phoneBottomLine:'red'}) 
            }
         this.setState({passwordBottomLine:'red'})
            }
     


            else if(this.state.confirmPass.length==0){
                if(this.state.lastNmae.length>0){
                    this.setState({lastNameBottomLine:'#F5F5F5'})
            
                   }else{
                       this.setState({lastNameBottomLine:'red'}) 
                   }
                   if(this.state.pharmcyNmae.length>0){
                    this.setState({pharmacyNmaeBottomLine:'#F5F5F5'})
            
                   }else{
                       this.setState({pharmacyNmaeBottomLine:'red'}) 
                   }
                   if(this.state.userNameP.length>0){
                    this.setState({userNamePBottomLine:'#F5F5F5'})
            
                   }else{
                       this.setState({userNamePBottomLine:'red'}) 
                   }
                   if(this.state.country.length>0){
                    this.setState({countryBottomLine:'#F5F5F5'})
            
                   }else{
                       this.setState({countryBottomLine:'red'}) 
                   }
         if(this.state.firstNmae.length>0){
             this.setState({firstNameBottomLine:'#F5F5F5'})
     
            }else{
                this.setState({firstNameBottomLine:'red'}) 
            }
            if(this.state.email.length>0){
                this.setState({emailBottomLine:'#F5F5F5'})
        
               }else{
                this.setState({emailBottomLine:'red'}) 
            }
               
    //            if(this.state.password.length>0){
    //                let b=0;
    //                let d=0;
    //             for(let i=0;i<this.state.password.length;i++)
    //             {
    //                 if('A' <= this.state.password[i] && this.state.password[i] <= 'Z') // check if you have an uppercase
    //                     b++;
    //                     if('0' <= this.state.password[i] && this.state.password[i] <= '9') // check if you have a numeric
    //         d++;
    // if(b>0&&d>0){
    //     console.log('bb',b)
    //     console.log('dd',d)

    //     this.setState({passwordBottomLine:'#F5F5F5'})
    // }else if(b<=0||d<=0){
    //     // showMessage({
    //     //     message: 'Password should be contain at least one capital letter and numbers ',
    //     //     type: "danger",
    //     //   });
    //       this.setState({passwordBottomLine:'red'})
    // }
                        
              //  }
              if(this.state.password.length>0){
//                 let b=0;
//                 let d=0;
//              for(let i=0;i<this.state.password.length;i++)
//              {
//                  if('A' <= this.state.password[i] && this.state.password[i] <= 'Z') // check if you have an uppercase
//                      b++;
//                      if('0' <= this.state.password[i] && this.state.password[i] <= '9') // check if you have a numeric
//          d++;
//  if(b>0&&d>0){
//      console.log('bb',b)
//      console.log('dd',d)

//      this.setState({passwordBottomLine:'#F5F5F5'})
//  }else if(b<=0||d<=0){
//      showMessage({
//          message: 'Password should be contain at least one capital letter and numbers ',
//          type: "danger",
//        });
//        this.setState({passwordBottomLine:'red'})
//  }
// }  
var strongRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])");
if(strongRegex.test(this.state.password) === false&&this.state.password.length<6){
    showMessage({
                 message: 'Password should be contain at least one capital letter and numbers ',
                 type: "danger",
               }); 
}else{
         this.setState({passwordBottomLine:'#F5F5F5'})

}

               }
               
               
               
               else{
                this.setState({passwordBottomLine:'red'}) 
            }
               if(this.state.phone.length>0){
                this.setState({phoneBottomLine:'#F5F5F5'})
        
               }else{
                this.setState({phoneBottomLine:'red'}) 
            }
         this.setState({confirmPasswordBottomLine:'red'})
            }







            
            else if(this.state.password !=this.state.confirmPass){
                showMessage({
                    message: i18n.t('passowrdnotmatches'),
                    type: "danger",
                    
                  });
this.setState({confirmPasswordBottomLine:'red',passwordBottomLine:'#F5F5F5'})
            }
else{
    this.setState({confirmPasswordBottomLine:'#F5F5F5'})
    this.setState({passwordBottomLine:'#F5F5F5'})
    this.setState({countryBottomLine:'#F5F5F5'})
    this.setState({pharmacyNmaeBottomLine:'#F5F5F5'})
    this.setState({phoneBottomLine:'#F5F5F5'})
this.setState({userNamePBottomLine:'#F5F5F5'})
      console.log('reg apiiiii',`/app/processregistration?customers_firstname=${this.state.firstNmae}&customers_lastname=${this.state.lastNmae}&email=${this.state.email}&password=${this.state.confirmPass}&customers_telephone=+962${this.state.phone}&pharmacy_name=${this.state.pharmcyNmae}&user_name=${this.state.userNameP}`)

    client.post(`/app/processregistration?customers_firstname=${this.state.firstNmae}&customers_lastname=${this.state.lastNmae}&email=${this.state.email}&password=${this.state.confirmPass}&customers_telephone=+962${this.state.phone}&pharmacy_name=${this.state.pharmcyNmae}&user_name=${this.state.userNameP}`).then((res
    
    
    ) => {
        // client.post(`/app/processregistration`,{
        //     customers_firstname:this.state.firstNmae,
        //     customers_lastname:this.state.lastNmae,
        //     email:this.state.email,
        //     password:this.state.confirmPass,
        //     ustomers_telephone:'+962'+this.state.phone,
        //     pharmacy_name:this.state.pharmcyNmae,
        //     user_name:this.state.userNameP,
         
        //   }).then(function(res) {
        console.log('data user signup',res)
if(res.data.message==='Thank you for registration our support team will contact you soon'){
this._storeData(this.state.email
    )
    showMessage({
        message: res.data.message,
        type: "success",
        duration:7000
      });
    
this.props.navigation.navigate("LoginScreen") 
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
            width:Dimensions.get('window').width/1.5,
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
    render() {
        i18n.fallbacks = true;
        i18n.translations = { ar, en };
        //i18n.locale =null;

        i18n.locale = this.state.myLang;

        return (
            <Content disableKBDismissScroll={true} style={{flex:1,}}>

            <View style={mainLoginContainer}>
            <View style={{height:Dimensions.get('window').height/6}}/>
<Text style={{color:'#484848',fontSize:25,fontFamily:'Acens'}}>{i18n.t('signup')}</Text>
<View style={{height:15}}/>
                <View style={secondContainerInLogin}>
<View style={{flexDirection:'row',width:Dimensions.get('window').width/1.2,justifyContent:'space-between'}}>
                    <TextInput textAlign={I18nManager.isRTL?'right':'left'}
                     onChangeText={(text) => this.setState({firstNmae:text})}
                    placeholderTextColor='#777777' placeholder={i18n.t('firstName')} style={[emailInputStyle,{marginTop:20,borderColor:this.state.firstNameBottomLine,borderWidth:1,width:'48.2%' }]}/>
                   <TextInput textAlign={I18nManager.isRTL?'right':'left'}
                     onChangeText={(text) => this.setState({lastNmae:text})}
                    placeholderTextColor='#777777' placeholder={i18n.t('lastName')} style={[emailInputStyle,{marginTop:20,borderColor:this.state.lastNameBottomLine,borderWidth:1,width:'48.2%' }]}/>
                  
                  </View> 
                   <TextInput textAlign={I18nManager.isRTL?'right':'left'}
                     onChangeText={(text) => this.setState({email:text})}
                    placeholderTextColor='#777777' keyboardType='email-address' placeholder={i18n.t('email')}  style={[emailInputStyle,{borderColor:this.state.emailBottomLine,borderWidth:1}]}/>

<TextInput textAlign={I18nManager.isRTL?'right':'left'}
                     onChangeText={(text) => this.setState({pharmcyNmae:text})}
                    placeholderTextColor='#777777'  placeholder={i18n.t('pharmacyName')}  style={[emailInputStyle,{borderColor:this.state.pharmacyNmaeBottomLine,borderWidth:1}]}/>

<TextInput textAlign={I18nManager.isRTL?'right':'left'}
                     onChangeText={(text) => this.setState({userNameP:text})}
                    placeholderTextColor='#777777'  placeholder={i18n.t('userName')}  style={[emailInputStyle,{borderColor:this.state.userNamePBottomLine,borderWidth:1}]}/>


<TextInput editable={false} textAlign={I18nManager.isRTL?'right':'left'}
                     onChangeText={(text) => this.setState({country:text})}
                    placeholderTextColor='#777777'  placeholder={i18n.t('jordan')}  style={[emailInputStyle,{borderColor:this.state.countryBottomLine,borderWidth:1}]}/>

{/*                
                    <TextInput 
                     onChangeText={(text) => this.setState({phone:text})}
                    placeholderTextColor='#777777' keyboardType='phone-pad' placeholder='PHONE NUMBER' style={emailInputStyle}/> */}
  <View style={[passwordAndConfirmContainer,{ marginBottom:10.5, width:Dimensions.get('window').width/1.2,height:50,borderColor:this.state.phoneBottomLine,borderWidth:1,marginTop:5,alignItems:'center',textAlig:I18nManager.isRTL?'right':'left',backgroundColor:'#F5F5F5',borderRadius:5,}]}>
                       
                       
                       {this.returnPhone()}
                        </View>
                    <View style={passwordAndConfirmContainer}>
                        <TextInput
                         onChangeText={(text) => this.setState({password:text})}
                        underlineColorAndroid="transparent" placeholderTextColor='#777777' placeholder={i18n.t('password')}  secureTextEntry={this.state.hidePassword} style={[passwordInputStyle,{borderWidth:1, borderColor:this.state.passwordBottomLine, textAlign:I18nManager.isRTL?'right':'left'}]} />
                        <TouchableOpacity activeOpacity={0.8} style={visibilityBtn} onPress={this.managePasswordVisibility}>
                            <Image source={(this.state.hidePassword) ? require('../assets/images/hideeye.png') : require('../assets/images/eye.png')} style={btnImage} />
                        </TouchableOpacity></View>

                        <View style={passwordAndConfirmContainer}>

                        <TextInput textAlign={I18nManager.isRTL?'right':'left'}
                         onChangeText={(text) => this.setState({confirmPass:text})}
                        underlineColorAndroid="transparent" placeholderTextColor='#777777' placeholder={i18n.t('confirmPassword')}  secureTextEntry={this.state.hideConfirmPassword} style={[passwordInputStyle,{borderWidth:1, borderColor:this.state.confirmPasswordBottomLine}]} />
                        <TouchableOpacity activeOpacity={0.8} style={visibilityBtn} onPress={this.manageHidenConfirmPasswordVisibility}>
                            <Image source={(this.state.hideConfirmPassword) ? require('../assets/images/hideeye.png') : require('../assets/images/eye.png')} style={btnImage} />
                        </TouchableOpacity></View>
                       


                    
                  
                </View> 
              
                
            </View>
            <View style={agreeTerms}>
            <View style={{width:30}}/>
           
                         <Text>
                            <Text style={{
                                fontFamily: 'newFont', fontSize: 14,
                                fontWeight: "300",
                                fontStyle: "normal",
                                lineHeight: 17,
                                letterSpacing: 0,
                                color: "#0e0001",
                            }}>{i18n.t('CreatingAnAccount')}</Text>
                            <Text  onPress={() => this.props.navigation.navigate('PrivacyPolicy',{param:'terms-services'})}  style={{
                                color: '#8FCFEB', textDecorationLine: 'underline', fontFamily: 'newFont', fontSize: 14,
                                fontWeight: "300",
                                fontStyle: "normal",
                                lineHeight: 17,
                                letterSpacing: 0,
                            }}>{i18n.t('termsAndCodi')}{' '}</Text>
                             <Text style={{
                                fontFamily: 'newFont', fontSize: 14,
                                fontWeight: "300",
                                fontStyle: "normal",
                                lineHeight: 17,
                                letterSpacing: 0,
                                color: "#0e0001",
                            }}>{i18n.t('and')} </Text>
   <Text  onPress={() => this.props.navigation.navigate('PrivacyPolicy',{param:'privacy-policy'})}  style={{
                                color: '#8FCFEB', textDecorationLine: 'underline', fontFamily: 'newFont', fontSize: 14,
                                fontWeight: "300",
                                fontStyle: "normal",
                                lineHeight: 17,
                                letterSpacing: 0,
                            }}>{i18n.t('privacyPolicy')}</Text>
                        </Text>
                    </View> 
                    <View style={{width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center'}}>
                    
                    <TouchableOpacity
                     onPress={() => this._handlePress()}
                    style={loginTouchable} >
                            <Text style={loginTextStyleInLoginTab}>{i18n.t('signup')}</Text>
                        </TouchableOpacity>
                        <View style={{height:10}}/>

                        </View>
                        <View style={orContainer}>
                        <View style={{width:Dimensions.get('window').width/1.3,justifyContent:'center',alignItems:'center'}}>
                    <Text>
                            <Text style={{
                                fontFamily: 'newFont', fontSize: 14,
                                fontWeight: "300",
                                fontStyle: "normal",
                                lineHeight: 17,
                                letterSpacing: 0,
                                color: "#777777",
                            }}>{i18n.t('AlreadyHaveanAccount')}</Text>
                            <Text  onPress={() => this.props.navigation.navigate('LoginScreen')}  style={{
                                color: '#8FCFEB', textDecorationLine: 'underline', fontFamily: 'newFont', fontSize: 14,
                                fontWeight: "300",
                                fontStyle: "normal",
                                lineHeight: 17,
                                letterSpacing: 0,
                            }}>{i18n.t('alogin')}</Text>
                             
                        </Text>
                        <View style={{height:10}}/>
                   
                   
                        </View>
                        </View>
                       
            </Content>

        );
    }
}
