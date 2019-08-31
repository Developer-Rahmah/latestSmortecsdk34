import axios from 'axios';
import * as Permissions from 'expo-permissions';

import { Font, AppLoading, SplashScreen, Notifications } from 'expo';
import {Expo} from 'expo';
//const deviceId = DeviceInfo.getDeviceId();
let token = 'tttoken';
async function  registerForPushNotificationsAsync() {
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
     token = await Notifications.getExpoPushTokenAsync();
  
    // POST the token to your backend server from where you can retrieve it to send push notifications.
    // this.setState({token:token}).bind(this);
    console.log('tokeeen:'+token)
}
const client= axios.create({
// baseURL: 'http://delico.qiotic.info/app',
baseURL:'https://smortec.com',

});

client.defaults.headers.common['consumer-key'] = '6df56cf915318431043dd7a75d';
client.defaults.headers.common['consumer-secret'] ='95032b42153184310488f5fb8f';
client.defaults.headers.common['consumer-nonce'] = 'afczxcfasd';
client.defaults.headers.common['consumer-device-id'] =getToken();
registerForPushNotificationsAsync();
async function getToken(){
  let ttoken = await Notifications.getExpoPushTokenAsync();
  console.log('myyyyyy tooooken iiis firrst:',ttoken)
return ttoken
}
 
 console.log('myyyyyy tooooken iiis seccond:',getToken())

// getToken()

export default client;