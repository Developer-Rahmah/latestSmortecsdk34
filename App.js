import React from 'react';
import {Provider} from 'react-redux'
import { Asset } from 'expo-asset';

import { Platform, StatusBar, StyleSheet, View,Dimensions,Image,Text ,AsyncStorage,I18nManager} from 'react-native';
import { AppLoading, Font, Icon,SplashScreen,Permissions, Notifications,Constants } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import AppNavigatorSplash from './navigation/AppNavigatorSplash';
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer';
import {rootSaga} from './saga/rootSaga';
import {compineCategorySaga} from './saga/Saga'
import FlashMessage from "react-native-flash-message";
// import OneSignal from 'react-native-onesignal'; // Import package from node modules
import AppNavigatorHome from './navigation/AppNavigatorHome';
import i18n from 'i18n-js';

const sagaMidlleware = createSagaMiddleware()
const initialState = {};

const middleWare = compose (
    applyMiddleware(sagaMidlleware)
)

const store = createStore(rootReducer, initialState, middleWare);
sagaMidlleware.run(rootSaga);

export default class App extends React.Component {

//   constructor(props) {
//     super(props);
//     state = {
//     isReady: false,
//     isLoadingComplete: false
//     };
//     OneSignal.init("1a4bc4f6-8e96-4590-82e3-cc7f4825d4d6");

//     OneSignal.addEventListener('received', this.onReceived);
//     OneSignal.addEventListener('opened', this.onOpened);
//     OneSignal.addEventListener('ids', this.onIds);
//   }
  // componentWillUnmount() {
  
  //   OneSignal.removeEventListener('received', this.onReceived);
  //   OneSignal.removeEventListener('opened', this.onOpened);
  //   OneSignal.removeEventListener('ids', this.onIds);
  // }

  onReceived(notification) {
    console.log("Notification received: ", notification);
    
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

constructor(props) {
  super(props);
  this.state = {
    isReady: false,
    isLoadingComplete: false,
    userID:'test',
    token:'',
    notification: {},
  };

  // OneSignal.init("1a4bc4f6-8e96-4590-82e3-cc7f4825d4d6");

  //     OneSignal.addEventListener('received', this.onReceived);
  //     OneSignal.addEventListener('opened', this.onOpened);
  //     OneSignal.addEventListener('ids', this.onIds);
}
async componentWillMount(){

  this.registerForPushNotificationsAsync();
  this._retrieveData()
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
  let platform=Constants.platform
  await AsyncStorage.setItem("deviceToken", token+'');
  await AsyncStorage.setItem("devicePlatform", platform+'');

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  this.setState({token:token})
  console.log('tokeeen:'+token)


  this._notificationSubscription = Notifications.addListener(this._handleNotification);

  
}
_handleNotification = (notification) => {
  this.setState({notification: notification});
  if(notification.screen === 'SettingsScreen'){
    this.props.navigation.navigate('SettingsScreen')

  }
  
};
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
//     if(switchOn !==null){
// this.setState({switchOn:switchOn})
//     }
    

      // if(myLang !== null){
      //   this.setState({ myLang: myLang });
  
      //   I18nManager.forceRTL(myLang === "ar");
  
      //   this.setState({ isRTL: myLang === "ar" });
  
      //   i18n.locale = this.state.myLang;
      
      // }
      if(myLang ==="ar"){
        if(I18nManager.isRTL != true){
          await AsyncStorage.setItem("myLang", "ar");
          I18nManager.forceRTL(true);
          i18n.locale =myLang;
          alert("ar "+I18nManager.isRTL);
          Updates.reload();
        }
      }
        if(myLang ==="en"){
   
        await AsyncStorage.setItem("myLang", "en");
        I18nManager.forceRTL(false);
        I18nManager.allowRTL(false);
        i18n.locale =myLang;
        if(I18nManager.isRTL != false){
        Updates.reload();
      }
    }

      // I18nManager.forceRTL(myLang === "ar");
    //   if(I18nManager.isRTL){
    //     I18nManager.allowRTL(!(myLang === "ar"))

    //   }else{
    //     I18nManager.forceRTL(myLang === "ar");
    //   }
    //   this.setState({ isRTL: myLang === "ar" });
    //   console.log('is arabic in iiif', I18nManager.isRTL)

    //   i18n.locale = myLang;
    //   console.log('mmmmmmy laaaaaang iiiis ', i18n.locale)

    // }else{
    //   await AsyncStorage.setItem("myLang", "en");
    //   // I18nManager.forceRTL(false);
    //   I18nManager.allowRTL(false)
    //   this.setState({ myLang: "en" });

    //         i18n.locale = "en";

    //   console.log('is arabic in else', I18nManager.isRTL)

    // }

    if (value !== null) {
      console.log('my device token iiiis',token);
      console.log('my device platfooorm iiiis',platform);

      // We have data!!
      console.log('userid:',value);
      console.log('namevalue:',namevalue);
      console.log('phonevalue:',phonevalue);
      console.log('passwvalue:',passwvalue);
      console.log('ordeeer async arr newww',JSON.parse(myArray));
this.setState({userID:value})
      //  this.props.navigation.navigate('Home')
    }
    else{
      this.setState({userID:null})

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


  _cacheResourcesAsync = async () => {
    SplashScreen.hide();
    const images = [
        require('./assets/images/logo.png'),
        require('./assets/images/logo.png'),
    ];
  
    const cacheImages = images.map((image) => {
        return Asset.fromModule(image).downloadAsync();
    });
    await Promise.all(cacheImages);
    this.setState({ isReady: true });
  }
  render() {
    console.log('userid iiiis in render rahhhhhmah:',this.state.userID);

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } 
    if (!this.state.isReady) {


      return (
          <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width,backgroundColor:'white' }}>

              <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center', }}
                  >
                  <View style={{ height: Dimensions.get('window').height / 5,flexDirection:'column' }}>
                  </View>
                  <Image
                        source={require('./assets/images/logo.png')}
                        style={{
                            resizeMode:'contain'
                            // width: Dimensions.get('window').width/1.5,
                            // height: Dimensions.get('window').width/2.5, paddingTop: 2,
                            
                        }}
                                            onLoad={this._cacheResourcesAsync}

                    />
                      <View style={{ height: Dimensions.get('window').height / 2.5 ,flexDirection:'column'}}/>
                      <Text style={{fontFamily:'smortecFont',color:'gray',textAlign:'center'}} >©SMORTEC 2019</Text> 
                    {/* <Image

                  {/* <Image
                      source={require('./assets/images/smorteclogo.png')}
                      style={{
                          width: Dimensions.get('window').width/1.5,
                          height: Dimensions.get('window').width/2.5, paddingTop: 2,
                          // resizeMode: 'contain'
                      }}
                      onLoad={this._cacheResourcesAsync}
                  />
                  <View style={{ height: Dimensions.get('window').height / 2.5 ,flexDirection:'column'}}>
<Text style={{fontSize:30,fontFamily:'Acens',color:'#8FCFEB',textAlign:'center'}}>SMORTEC</Text>
<Text style={{fontSize:30,fontFamily:'Acens',color:'gray',textAlign:'center'}}>We are the future</Text>

                  </View>
                  <Text style={{fontFamily:'Acens',color:'gray',textAlign:'center'}} >©SMORTEC 2019</Text> */}

              </View>

          </View>
      );
   }

    if(this.state.userID =='test'){
       return (
        <Provider store={store}>
        <View style={styles.container}>
          <AppNavigatorSplash />
          <FlashMessage position="top" style={{justifyContent:'center',alignItems:'center'}} animated={true} />

        </View>
        </Provider>
      );
    }
    else if(this.state.userID ==null || this.state.userID==undefined || this.state.userID==''){
      return (
       <Provider store={store}>
       <View style={styles.container}>
         <AppNavigator />
         <FlashMessage position="top" style={{justifyContent:'center',alignItems:'center'}} animated={true} />

       </View>
       </Provider>
     );
   }
    else if(this.state.userID>0){
      return (
        <Provider store={store}>
        <View style={styles.container}>
          <AppNavigatorHome />
          <FlashMessage position="top" style={{justifyContent:'center',alignItems:'center'}} animated={true} />

        </View>
        </Provider>
      );
    }
     
    
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),

      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            // newFont: require("./assets/fonts/newFont.ttf"),
            // newFont:require("./assets/fonts/newFont.otf"),
            // newFont:require("./assets/fonts/newFont.ttf"),
            smortecFont:require("./assets/fonts/Acens.ttf"),
            numFont:require("./assets/fonts/Montserrat-Regular.otf"),

            Acens:!(I18nManager.isRTL) ?require("./assets/fonts/Acens.ttf"):require("./assets/fonts/geflow.otf"),
            // Poppins:require("./assets/fonts/PoppinsRegular.ttf"),
            newFont:!(I18nManager.isRTL)?require("./assets/fonts/Montserrat-Regular.otf"):require("./assets/fonts/geflow.otf")
      }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
