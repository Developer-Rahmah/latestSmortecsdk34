import React, { Component } from 'react';
import { View, Text, Dimensions, ImageBackground, Image, TouchableOpacity, ScrollView,AsyncStorage,I18nManager } from 'react-native';
import styles from '../css/styles';
import { Font, AppLoading } from 'expo';
import { Content, Segment, Button } from 'native-base';

import { Localization } from 'expo-localization';
import Expo from 'expo';


import i18n from 'i18n-js';
const en = {
    signup: 'SIGN UP',
    login: 'LOG IN',
    alreadyHaveAnAccount:'Already have an account?'
   
   
};
const ar = {
    signup: 'إنشاء حساب',
    login: 'تسجيل الدخول',
    alreadyHaveAnAccount:'هل لديك حساب بالفعل؟'

   



};

const { selectedTabTextStyle, imageBackgroundStyle, tabStyle, tabsContainerStyle, alreadyHavAccountTextStyle, loginTextInTabsScreen } = styles
export default class ProfileScreen extends Component {

  static navigationOptions = {
    header: null,

  };

  constructor (props) {
    super(props);
    this.state = {
       
    activePage: 1,
    selected: 1,
    myLang: AsyncStorage.getItem("myLang").then((value) => {
      this.setState({ "myLang": value })
  }).done()
  ,
  isRTL:false


  };
}
  selectComponent = (activePage) => () => this.setState({ activePage })
  _renderComponent = () => {
    if (this.state.activePage === 1)
      return <SignUpTab  navigation={this.props.navigation} />

    if (this.state.activePage === 2)
      return <LoginTab   navigation={this.props.navigation}/>

  }
  componentWillMount(){
    const { navigation } = this.props;
        const loginTab = navigation.getParam('loginTab');
        if (loginTab===2){
          this.setState({activePage:2,selected:2})
        }
  }

  returnText = () => {
    if (this.state.activePage === 1)
      return (
        <View style={{ height: 50, backgroundColor: 'transform', alignItems: 'center', justifyContent: 'center',marginBottom:50 }}>
          <View style={{ flexDirection: 'row', width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center' }}>
            <Text>
              <Text style={alreadyHavAccountTextStyle}>{i18n.t('alreadyHaveAnAccount')} </Text>
              <Text onPress={() =>
                this.setState({ activePage :2})
              } style={loginTextInTabsScreen}>{i18n.t('login')}</Text>

            </Text>
          </View>
        </View>
      )

    if (this.state.activePage === 2)
      return (
        <View style={{ height: 50, backgroundColor: 'transform',marginBottom:50 }}>

        </View>
      )
  }
  render() {
    i18n.fallbacks = true;
    i18n.translations = { ar, en };
    //i18n.locale =null;
    console.log('test:' + this.state.myLang);

    i18n.locale = this.state.myLang;

    return (
      <ImageBackground style={imageBackgroundStyle}
        source={require('../assets/images/background.png')}>
        <Segment style={tabsContainerStyle}>
          <Button
            active={this.state.activePage === 1}
            onPress={this.selectComponent(1)}
            style={{
              justifyContent:'center', alignItems: 'center', marginTop: 10, width: Dimensions.get('window').width/2, 
              backgroundColor: null, borderColor: null, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightWidth: 0, 
              borderLeftWidth: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0, borderTopWidth: 0, borderBottomWidth: 0

            }}
          >
            <View style={{ height: 40, flexDirection: 'column' }}>
              <Text style={[ selectedTabTextStyle,{ opacity: this.state.activePage === 1 ? 1 : 0.2, fontSize:I18nManager.isRTL?25:34}]}>{i18n.t('signup')}</Text>
            </View>
          </Button>
          <Button
            active={this.state.activePage === 2}
            onPress={this.selectComponent(2)}
            style={{
              justifyContent:'center', alignItems: 'center', marginTop: 10, 
              width: Dimensions.get('window').width/2, backgroundColor: null, 
              borderColor: null, borderTopLeftRadius: 0, borderBottomLeftRadius: 0,
               borderRightWidth: 0, borderLeftWidth: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0, borderTopWidth: 0, borderBottomWidth: 0

            }}
          >
            <View style={{ height: 40, flexDirection: 'column' }}>

              <Text style={[ selectedTabTextStyle,{ opacity: this.state.activePage === 2 ? 1 : 0.2 ,fontSize:I18nManager.isRTL?25:34}]}>{i18n.t('login')}</Text>
            </View>
          </Button>
        </Segment>
        <Content style={{width:Dimensions.get('window').width,backgroundColor:'white',flex:1,height:1000}}> 
                {this._renderComponent()}

            
                </Content>
               {this.returnText()}
      </ImageBackground>
    );
  }
}
