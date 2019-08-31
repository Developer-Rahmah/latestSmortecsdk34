
import React, { Component } from 'react';
import { Drawer, Container, Header, Left, Right, Icon, Body, Title, Content, Button, Text, CheckBox } from 'native-base';
import { View, Dimensions, ImageBackground, Image, TouchableOpacity, TouchableHighlight, I18nManager, AsyncStorage, BackHandler, TextInput, ScrollView } from 'react-native';
import styles from '../../../assets/css/styles';
import { SocialIcon } from 'react-native-elements';
// import CheckBox from 'react-native-checkbox';
import { Font, AppLoading, SplashScreen, Notifications } from 'expo';
import { Localization } from 'expo-localization';
import Expo from 'expo';
import NavigationDrawer from '../NavigationDrawer';
import ReCAPTCHA from "react-google-recaptcha";

import i18n from 'i18n-js';



const { inputContainer, textInputStyle, smallInputContainer,btnImage,visibilityBtn ,passwordTextInputStyle} = styles

export default class LoginScreen extends Component {

    static navigationOptions = {
        header: null,
    };
    state = {
        checked: false,
        checkBoxBackgroundColor: 'white',
        hidePassword: true,
        hideConfirmPassword:true,
    };
    onChange(value) {
        console.log("Captcha value:", value);
    }
    managePasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
    }

    manageHidenConfirmPasswordVisibility = () => {
        this.setState({ hideConfirmPassword: !this.state.hideConfirmPassword });
    }
    closeDrawer = () => {
        this._drawer._root.close();
    }
    openDrawer = () => {

        this._drawer._root.open();
    }
    onCheckPressed() {
        this.setState({ checked: !this.state.checked })
        if (this.state.checked) {
            this.setState({ checkBoxBackgroundColor: 'white' })
        }
        else {
            this.setState({ checkBoxBackgroundColor: '#d9001a' })
        }

    }

    render() {




        return (
            <Drawer
                style={{ shadowOpacity: 0, elevation: 0 }}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                ref={(ref) => { this._drawer = ref; }}
                content={<NavigationDrawer />} >
                <View style={{ flexDirection: 'row', backgroundColor: '#d9001a', height: 100, alignItems: 'center' }}>

                    <Button style={{ marginTop: 30, alignItems: 'center', justifyContent: 'center' }} transparent onPress={this.openDrawer.bind(this)}>
                        <Icon name='menu' style={{ color: 'white', width: 28, height: 28 }} />
                    </Button>
                    <Text style={{
                        fontSize: 17, width: Dimensions.get('window').width / 1.3,
                        fontWeight: "600",
                        fontStyle: "normal",
                        letterSpacing: -0.41,
                        textAlign: "center",
                        color: "#ffffff", fontFamily: 'seProFont'
                    }}>SIGN IN</Text>
                </View>
                <Content>
                    <View style={{ backgroundColor: 'white', alignItems: 'center', paddingTop: 30 }}>
                        <View style={inputContainer}>
                            <Image source={require('../../../assets/images/Email.png')}
                                style={{

                                    width: 28,
                                    height: 28,
                                    resizeMode: 'contain'
                                }} />
                            <TextInput underlineColorAndroid="transparent" placeholderTextColor={'rgb(157,157,162)'} placeholder="Email" style={textInputStyle} ></TextInput>
                        </View>
                        
                        <View style={inputContainer}>
                            <Image source={require('../../../assets/images/Password.png')}
                                style={{

                                    width: 28,
                                    height: 28,
                                    resizeMode: 'contain'
                                }} />
                            {/* <TextInput underlineColorAndroid="transparent" placeholderTextColor={'rgb(157,157,162)'} placeholder="New Password" style={textInputStyle} ></TextInput> */}
                            <View style={{flexDirection:'row',alignItems:'center',}}> 

                            <TextInput underlineColorAndroid="transparent" placeholderTextColor={'rgb(157,157,162)'} placeholder="Password"  secureTextEntry={this.state.hidePassword} style={passwordTextInputStyle} />
                                                    <TouchableOpacity activeOpacity={0.8} style={visibilityBtn} onPress={this.managePasswordVisibility}>
                                                        <Image source={(this.state.hidePassword) ? require('../../../assets/images/hideeye.png') : require('../../../assets/images/eye.png')} style={btnImage} />
                                                    </TouchableOpacity></View>
                        </View>
                        
                      



                    </View>
                    
                    <View style={{ marginStart: 10, flexDirection: 'row', width: Dimensions.get('window').width / 1.3, alignItems: 'flex-start',}}>
                        <CheckBox
                            style={{ width: 20, height: 20, color: 'white', backgroundColor: this.state.checkBoxBackgroundColor, borderColor: '#9d9da2' }}
                            checked={this.state.checked}
                            onPress={() => this.onCheckPressed()}
                        /><View style={{ width: 17 }} />

                       <View style={{flexDirection:'row',width:Dimensions.get('window').width/1.2,justifyContent:'space-between'}}>
                            <Text style={{
                                fontFamily: 'MontserratRegular', fontSize: 14,
                                fontWeight: "300",
                                fontStyle: "normal",
                                lineHeight: 17,
                                letterSpacing: 0,
                                color: "#0e0001",
                            }}>Remember Me</Text>
                            <Text onPress={() => this.props.navigation.navigate('ForgetPassword')}  style={{
                                color: '#d9001a',  fontFamily: 'MontserratRegular', fontSize: 14,
                                fontWeight: "300",
                                fontStyle: "normal",
                                lineHeight: 17,
                                letterSpacing: 0,
                            }}>Forgot Password?</Text>
                            </View>

                    </View>
                    <View style={{ width: Dimensions.get('window').width, flexDirection: 'column', alignItems: 'center' }}>
                        <TouchableOpacity style={{
                            backgroundColor: '#d9001a', marginTop: 32, marginBottom: 30,
                            color: '#bdbfbf', justifyContent: 'center',
                            width: (Dimensions.get('window').width) / 1.07,
                            height: 48, flexDirection: 'row',
                            borderRadius: 50, alignItems: 'center', paddingStart: 15, fontWeight: "normal",
                            fontStyle: "normal",
                            lineHeight: 24,
                        }}>
                            <Text style={{
                                color: 'white',
                                fontSize: 18, fontFamily: 'MontserratRegular'
                            }}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: Dimensions.get('window').width, alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: "300",
                            fontStyle: "normal",
                            lineHeight: 17, marginBottom: 21,
                            letterSpacing: 0,
                            color: "#9d9da2"
                        }}>or Sign Up With</Text></View>

                    <View style={{ flexDirection: 'row', width: Dimensions.get('window').width, justifyContent: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 20, borderRadius: 50, backgroundColor: 'rgba(59, 89, 152, 1)', width: Dimensions.get('window').width / 2.4, height: 48, alignItems: 'center' }}>

                            <SocialIcon type='facebook' style={{ width: 36, height: 36, elevation: 0, backgroundColor: null }} />
                            <Text style={{
                                width: Dimensions.get('window').width / 1.05, alignItems: 'center', fontSize: 16,
                                fontWeight: "normal",marginStart:-3,
                                fontStyle: "normal",
                                lineHeight: 19, color: 'white', fontFamily: 'MontserratRegular'
                            }}>FACEBOOK</Text>
                        </TouchableOpacity>

                        <View style={{ width: 14 }} />
                        <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 20, borderRadius: 50, backgroundColor: '#f24a38', width: Dimensions.get('window').width / 2.4, height: 48, alignItems: 'center' }}>

                            <Image
                                source={require('../../../assets/images/google.png')}
                                style={{
                                    width: 36,
                                    height: 36, marginEnd: 7, marginStart: 7,
                                    resizeMode: 'contain'
                                }} />
                            <Text style={{
                                width: Dimensions.get('window').width / 1.05, alignItems: 'center', fontSize: 16,
                                fontWeight: "normal", fontFamily: 'MontserratRegular',
                                fontStyle: "normal", fontFamily: 'MontserratRegular',
                                lineHeight: 19, color: 'white'
                            }}>Gmail</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 42, marginTop: 32, flexDirection: 'row', width: Dimensions.get('window').width, justifyContent: 'center' }}>
                        <Text>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: "300",
                                fontStyle: "normal",
                                lineHeight: 17,
                                letterSpacing: 0,
                                textAlign: "left", fontFamily: 'MontserratRegular',
                                color: "#0e0001"
                            }}>NOT REGISTERED? </Text>
                            <Text onPress={() => this.props.navigation.navigate('SignUpScreen')} style={{
                                fontSize: 14,
                                fontWeight: "300",
                                fontStyle: "normal",
                                lineHeight: 17,
                                letterSpacing: 0,
                                textAlign: "left", fontFamily: 'MontserratRegular',
                                color: '#d9001a', textDecorationLine: 'underline'
                            }}> SIGN UP</Text>
                           

                        </Text>
                    </View>
                </Content>
            </Drawer>

        );
    }



}
