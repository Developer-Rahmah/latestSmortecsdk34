import React from 'react';
import { connect } from "react-redux";
import { requestCategories } from '../actions/getCategoriesActions';
import client from '../api/constant'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,AsyncStorage,
  Dimensions,
  ActivityIndicator,Linking,
  WebView,ImageBackground,Modal,Alert,BackHandler,TextInput,I18nManager
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import * as AddOrderAction from "../actions/AddToOrder";
import {
  Container,
  Header,
  Title,
  Button,
  Left,
  Right,
  Icon,
  Body,
  Text,
  StyleProvider,
  Content, Card, CardItem,Segment
} from "native-base";
import {addItem} from '../actions/AddToOrder'
import { LinearGradient } from 'expo-linear-gradient';

import { DrawerActions } from 'react-navigation';
import getTheme from '../native-base-theme/components';
import variables from '../native-base-theme/variables/variables';
import { Font, AppLoading, SplashScreen, Notifications,Location } from 'expo';
import * as Permissions from 'expo-permissions';

import DrugStoreTab from '../UI_Commponents/DrugStoreTab';
import CategoriesTab from '../UI_Commponents/CategoriesTab';
import SubAgentTab from '../UI_Commponents/SubAgentTab';
import HotOffersListingTab from './HotOffersListingTab';
import ProfileScreen from './ProfileScreen'
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { DIMENSIONS } from 'react-native-numeric-input';

import { Avatar, Badge, withBadge } from 'react-native-elements'


import { Localization } from 'expo-localization';
import {FileSystem} from 'expo';

import Carousel ,{ Pagination } from 'react-native-snap-carousel';


import i18n from 'i18n-js';
let lang;


const en = {
    home: 'Home',
    wishlist: 'Favorite',
    settings:'Settings',
    orders:'Orders',
        callNow:'CALL NOW',
    readMore:'READ MORE',
    SearchByName:'Search By Name',
    hotOffers:'HOT OFFRES',
    subAgent:'SUB AGENT',
    drugStores:'DRUG STORES',
    categories:'CATEGORIES',
    Notifications:'Notifications',
    TermsandConditions:'Terms and Conditions',
    FQA:'FAQs',
    Logout:'Logout',
    aboutUs:'About Us'

    
   
};
const ar = {
  aboutUs:'من نحن',

  home: 'الرئيسية',
  wishlist: 'المفضلة',
  settings:'الاعدادات',
  orders:'الطلبات',
    callNow:'اتصل الآن',
    readMore:'قراءة المزيد',
  SearchByName:'البحث عن طريق الاسم',
  hotOffers:'اخر العروض',
  subAgent:'الوكلاء',
  drugStores:'مستودعات الادوية',
  categories:'الاقسام',
  Notifications:'الاشعارات',
  TermsandConditions:'الشروط والاحكام',
  FQA:'الأسئلة الأكثر شيوعاً',
  Logout:'خروج'
  

};


const yosemite = { latitude:31.995513, longitude:  35.859667 };
 
const facebookHQ = { latitude: 37.4847, longitude: 122.1477 };

let BaseURL = 'https://smortec.com/';
const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 200;
class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      slider1ActiveSlide:1,
      notification: null,
      messageText: '',
      imagePopupUrl:'',
      status:200,
      Banner: [],
      activeSlide:1,
      catArr:[],
      carouselItems: [
        {
            title:"Item 1"
        },
        {
            title:"Item 2"
        },
        {
            title:"Item 3"
        },
        {
            title:"Item 4"
        },
        {
            title:"Item 5"
        }
    ],
      loading: true,
      isReady: false,
      isSplashReady: false,
      location: null,
      errorMessage: null,
      popUpModal: false,
      showImageModal:false,
      activePage:1,

      phonCall:'07999999',
      ExperienceArr:this.props.Order,
      myLang: AsyncStorage.getItem("myLang").then((value) => {
        this.setState({ "myLang": value })
    }).done()
    ,

    }
    this.N360= this.N360.bind(this)
    this.Navigate = this.Navigate.bind(this)
    this.NavigateProductDetails = this.NavigateProductDetails.bind(this)

  }
  handleNotification = (notification) => {
    this.setState({ notification });
  }
  _retrieveData = async () => {
    try {
      const myLang = await AsyncStorage.getItem('myLang');
  
      if(myLang !=null){

        if(myLang=='ar'){
          lang=4;
          // I18nManager.forceRTL(true);
          // I18nManager.allowRTL(true)

          console.log('is arabic in arrr', I18nManager.isRTL)

        }else{
          // I18nManager.allowRTL(false)
          // I18nManager.forceRTL(false);
          lang=1;

          console.log('is arabic in enn', I18nManager.isRTL)

        }
        // We have data!!
        console.log('is arabic', I18nManager.isRTL)

    
    

  
        client.get('/app/getbanners').then((res)=>{
          console.log('banner',res)
          if(res.data.status==200){
            this.setState({status:200,Banner:res.data.data})
         
          }
          
    
    
    
        })
        
    
        try {
          const myArray = await AsyncStorage.getItem('@MySuperStore:key');
          console.log('arrrrr is',myArray)

          if (myArray !== null) {
    let fArr=JSON.parse(myArray);
            for(let i=0;i<=fArr.length;i++){
              if(fArr[i] !==undefined && fArr[i] !==null){
              client.post(`/app/getallproducts?products_id=${fArr[i].products_id}&language_id=${lang}`).then((res) => {
              
     fArr[i].products_name=res.data.product_data[0].products_name
    //  console.log(' this.props.addItemToOrder (fArr[i])', this.props.addItemToOrder (fArr[i]))

              this.props.addItemToOrder (fArr[i])
               console.log('single product arr is',res.data)
    
              console.log('each item in assssyyyync aaaar',(fArr[i]))
            
              
              })
                }
            }
            // We have data!!
            console.log('cart async arr is',JSON.parse(myArray));
          }
         } 
         catch (error) {
          // Error retrieving data
          console.log('cart async arr is error',error)
        }
    
    
    
        client.post(`app/allcategories?language_id=${lang}`).then((res) => {
          console.log('wishlist array',res.data)
          if(res.data.status==200){
            this.setState({status:200})
          }else{
            this.setState({status:204})        }
          if(res.data.message=='Returned all categories.'){
         
          
          
         if(res.data.data.length>0){
          this.setState({
            
            catArr: res.data.data,
          })}
        
        }
        }
        )
      }
        else{
      
          await AsyncStorage.setItem("myLang", "en");
          // I18nManager.forceRTL(false);
          console.log('is arabic in else', I18nManager.isRTL)
  
        }
        } 
        
        catch (error) {
      // Error retrieving data
      console.log('getstorageitemerrrror',error);
    }
    
  };
  handleChangeText = (text) => {
    this.setState({ messageText: text });
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
    // this.setState({token:token}).bind(this);
    console.log('tokeeen:'+token)
  
  
  
    
  }


  renderNotification() {
    return(
      <View style={styles.container}>
        <Text style={styles.label}>A new message was recieved!</Text>
        <Text>{this.state.notification.data.message}</Text>
      </View>
    )
  }

  get pagination () {
    const { Banner, activeSlide } = this.state;
    return (
        <Pagination
          dotsLength={Banner.length}
          activeDotIndex={activeSlide}
          containerStyle={{ backgroundColor: 'transform' }}
          dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: 'gray'
          }}
          inactiveDotStyle={{
              // Define styles for inactive dots here
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
    );
}

  setModalVisible(visible) {
    this.setState({ popUpModal: visible });
}
setShowImageModalVisible(visible) {
  this.setState({ showImageModal: visible });
}



 componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
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

  async componentWillMount() {
    // if (I18nManager.isRTL)
    // {
    //   lang=4;
    // }
    // else{
    //   lang=1;
    // }
    console.log('cat array', this.props.CategoriesData)

    this.props.getCategories();
  this._retrieveData()


    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    this.setState({ loading: false });
    console.log('willmountaaaa=' + this.state.isRTL)
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }
 


async  componentDidMount() {
    this.registerForPushNotificationsAsync();

    this._notificationSubscription = Notifications.addListener(this._handleNotification);
 
  SplashScreen.preventAutoHide();



  


}
_handleNotification = (notification) => {
  this.setState({ notification: notification });
  if(notification.data.screen=='OrderDetails'){
    this.props.navigation.navigate('OrderDetails',{orderId:notification.data.id})
  }else if(notification.data.screen=='NotificationList'){
    this.props.navigation.navigate('NotificationList')
  }
  else if(notification.data.screen=='NotificationList'){
    this.setState({activePage:4})

  }else if(notification.data.screen=='ItemScreen'){
    this.props.navigation.navigate('ItemScreen',{itemId:notification.data.id})
  }
  else if(notification.data.screen=='HotOffersListingTab'){
    // this.props.navigation.navigate('ItemScreen',{itemId:notification.data.id})
    this.setState({activePage:4})
  }
  
};



  Navigate(itemId,image,name) {
    
    console.log('catid',itemId)
    this.props.navigation.navigate('ItemListScreen', {
      itemId: itemId,
      image:image,
      name:name

    })
  }

  N360() {
    this.props.navigation.navigate('WebView360')
  }
 

  static navigationOptions = {
    header:null
 };


handleOnNavigateBack = (foo) => {
  this.setState({
    foo
  })
}


returnBadg()
{
  if(this.props.Order.length>0){
return(
  <View  style={{ width: 10, backgroundColor: 'white' ,height:10,borderRadius:5}}
                               >
                                
                            </View>

  )
  }else{
    return
(
  <View/>
);
    
  }
  
}
_renderItem({item,index}){
  return (


    <View style={{flex:1,justifyContent:'center',alignItems:'center',height:BannerHeight,flexDirection:'column',width:Dimensions.get('window').width}}> 
        
        
    <ImageBackground style={{  flex:1,width: BannerWidth, height: BannerHeight,marginTop:-3,marginBottom:4, }}
    source={{ uri: BaseURL + '/' + item.image }} 
     >
<View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
<Text style={{ fontFamily: "Acens",
fontSize: 28,
fontWeight: "normal",
fontStyle: "normal",
lineHeight: 31,
letterSpacing: 0,
textAlign: "center",
color: "#ffffff"}}>{item.title}</Text>

<Text style={{  fontFamily: "newFont",
fontSize: 13,
fontWeight: "normal",
fontStyle: "normal",
lineHeight: 14,
letterSpacing: 0.03,
textAlign: "center",
color: "#ffffff"}}>{item.description}</Text>
<TouchableOpacity 
onPress={()=>{this.NavigateProductDetails(item.id)}}
style={{width:97,height:27,backgroundColor:'white',justifyContent:'center',alignItems:'center',marginTop:10,borderRadius:3,
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,}}>
<Text style={{fontFamily: 'Acens',
fontSize: 9,
fontWeight: "normal",
fontStyle: "normal",
lineHeight: 11,
letterSpacing: 0,
color: "#8FCFEB"}}>{i18n.t('readMore')}</Text>

</TouchableOpacity>
</View>
    </ImageBackground>
</View>


     
  )
}

  renderPage(banner, index) {
    
    return (
      
      <TouchableOpacity onPress={()=>{   this.NavigateProductDetails(banner.type ,banner.url,banner.image)}} style={{flex:1,justifyContent:'center',alignItems:'center',height:BannerHeight,flexDirection:'column'}}> 
        
        
            <ImageBackground resizeMode= 'cover' style={{  flex:1,width: BannerWidth,marginTop:-3,marginBottom:4, }}
             source={{ uri: BaseURL + '/' + banner.image }} 
             >
<View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
  <Text style={{ fontFamily: "Acens",
  fontSize: 28,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 31,
  letterSpacing: 0,
  textAlign: "center",
  color: "#ffffff"}}>{banner.title}</Text>
  
    <Text style={{  fontFamily: "newFont",marginEnd:20,marginStart:20,
  fontSize: 13,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 14,
  letterSpacing: 0.03,
  textAlign: "center",
  color: "#ffffff"}}>{banner.description}</Text>
  {/* <TouchableOpacity 
  onPress={()=>{   this.NavigateProductDetails(banner.type ,banner.url,banner.image)}}
  style={{width:97,height:27,backgroundColor:'white',justifyContent:'center',alignItems:'center',marginTop:10,borderRadius:3,shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  
  elevation: 5,}}>
  <Text style={{fontFamily: "Acens",
  fontSize: 9,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 11,
  letterSpacing: 0,
  color: "#8FCFEB"}}>{i18n.t('readMore')}</Text>

  </TouchableOpacity> */}
</View>
            </ImageBackground>
        </TouchableOpacity>
    );
}


termsAndConditions(){
  this.setModalVisible(false)
  this.props.navigation.navigate('PrivacyPolicy',{param:'terms-services'})
}
openNotificationList(){
  this.setModalVisible(false)
  this.props.navigation.navigate('NotificationList')
}

faq(){
  this.setModalVisible(false)
  this.props.navigation.navigate('FaqsPage')
}
aboutUs(){
  this.setModalVisible(false)
  this.props.navigation.navigate('AboutUs')
}

NavigateProductDetails(type,itemId,image) {
  if(type=='agent'){
    client.post(`/app/getallproducts?language_id=${lang}&agentId=${itemId}`).then((res) => {
      
    this.props.navigation.navigate('SubAgentListing', {
      itemId: itemId,
      total_products:res.data.total_record
  
    })
  })


  }else if(type=='category'){

    client.post(`/app/getallproducts?products_id=${itemId}&language_id=${lang}`).then((res) => {
      
    this.props.navigation.navigate('ItemListSreen', {
      itemId: itemId,
      total_products:res.data.total_record
  
    })
  })

  }
  else if(type=='product'){
    this.props.navigation.navigate('ItemScreen', {
      itemId: itemId,
      
  
    })
  }
  else if(type=='drugstore'){

    client.post(`/app/getallproducts?drugstore_id=${itemId}&language_id=${lang}`).then((res) => {
      this.props.navigation.navigate('DrugStoreListing', {
      itemId: itemId,
      total_products:res.data.total_record
      
  
    })
      })
    
    

    
  }
  else if(type=='hotoffers'){
    this.setState({activePage:4})
   
    
    

    
  }
   else if(type=='image'){
    this.setState({imagePopupUrl:BaseURL+image})
    this.setShowImageModalVisible(true)
  
}

  
}
selectComponent = (activePage) => () => this.setState({ activePage })

_renderComponent = () => {
  if (this.state.activePage === 1)
      return <CategoriesTab navigation={this.props.navigation}/>
  if (this.state.activePage === 2)
      return <DrugStoreTab navigation={this.props.navigation} />
  if (this.state.activePage === 3)
      return <SubAgentTab navigation={this.props.navigation} />
      if (this.state.activePage === 4)
      return <HotOffersListingTab  navigation={this.props.navigation}/>
}

async clearStorage() {
  
  try {
    // this.props.clearCart();

  //  AsyncStorage.setItem('@MySuperStore:key',d)
  // await AsyncStorage.removeItem('@MySuperStore:key')

  //  AsyncStorage.setItem('@MySuperStore:key', JSON.stringify((d)));
  this.props.clearCart();

  await AsyncStorage.removeItem('userID')
  await AsyncStorage.removeItem('firstName')
  await AsyncStorage.removeItem('lastName')
  await AsyncStorage.removeItem('userPhone')
  await AsyncStorage.removeItem('pharmcyNmae')
  await AsyncStorage.removeItem('userEmail')
  await AsyncStorage.removeItem('userPassword')


  this.setModalVisible(false)
  this.props.navigation.navigate('LoginSignupScreen')
  } catch (error) {
  }
  }


  render() {
    console.log('order  array',this.props.Order)
    if(this.props.Order.length>0){
         try {
          console.log('try order  array',this.props.Order)

      AsyncStorage.setItem('@MySuperStore:key', JSON.stringify((this.props.Order)));
     console.log('  saving async arrray',JSON.stringify((this.props.Order)));
 
   } 
   catch (error) {
     // Error saving data
     console.log('errror when saving async arrray',error)
   }
    }
 
    i18n.fallbacks = true;
    i18n.translations = { ar, en };
    console.log('test:' + this.state.myLang);

    i18n.locale = this.state.myLang;
    const images = this.state.Banner
    console.log('images  rahmah', this.state.Banner )
    console.log('home screen array',this.props.CategoriesData)


    return (
      <StyleProvider style={getTheme(variables)}>
        <Container>
        <Header style={{height:130,backgroundColor:'#8FCFEB'}}>
        
        <Left style={{marginTop:-50}}>
        <TouchableOpacity 
onPress={() => {
  this.setModalVisible(!this.state.popUpModal);
}}        >
                  <Icon name="ios-menu" style={{ color:'white', }}/>
                  </TouchableOpacity> 
        </Left>
       
              <View style={{flexDirection:'column',width:Dimensions.get('window').width/1.21,justifyContent:'center',alignItems:'center',marginTop:0}}>
              <View style={{flexDirection:'column',width:Dimensions.get('window').width/1.5,justifyContent:'center',alignItems:'center'}}>



              <Text style={{color:'#606060',fontFamily:'smortecFont',fontSize:25}}>SMORTEC</Text>
              <Text style={{color:'#606060',fontFamily:'smortecFont',}}>We are the future</Text> 
              <View style={{height:5}}/>
              
              <TouchableOpacity 
              onPress={()=>{ this.props.navigation.navigate('SearchScreen')}}
              style={{flexDirection:'row',width:Dimensions.get('window').width/1.2,backgroundColor:'white',height:43,borderRadius:5,alignItems:'center',justifyContent:'center',}}>
              <TextInput textAlign={I18nManager.isRTL?'right':'left'}
              editable={false}
                 onChangeText={(text) => this.setState({username:text})}
                placeholderTextColor='#E8E8E8'  style={{width:'70%',fontFamily:'newFont'}}     
                placeholder={i18n.t('SearchByName')}>

                </TextInput>
<View style={{width:1,height:'90%',backgroundColor:'#E8E8E8',margin:3}}/>
                <TouchableOpacity style={{width:'20%',alignItems:'center',justifyContent:'center'}}
        >
                  <Icon name="search" style={{ color:'#E8E8E8',marginEnd:3 }}/>
                  </TouchableOpacity>
              </TouchableOpacity>
             
              
              </View>
</View> 
           
        </Header> 

        
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
{this.state.Banner.length>0?
(
<View>
                        <Carousel
                        style={{height:BannerHeight}}
                         loop={true}
                         loopClonesPerSide={2}
                         autoplay={true}
                         autoplayDelay={500}
                         autoplayInterval={3000}
                        onSnapToItem={(index) => this.setState({ activeSlide: index }) }
              ref={(c) => { this._carousel = c; }}
              data={this.state.Banner}
              sliderWidth={ BannerWidth}
              itemWidth={BannerWidth}
              renderItem={({ item, index }) => (
                this.renderPage(item,index)
               
              )}
            />
{this.pagination}
           
          </View>

):
<Image style={{  flex:1,width: BannerWidth, height: BannerHeight,marginTop:-3,marginBottom:4, }}
              source={require('../assets/images/preloader.gif')}/>              }

            
             
    <View style={{width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center'}}>
              <Segment style={{
                        width: Dimensions.get('window').width / 1.2,
                        borderWidth: 0,
                        backgroundColor: 'transparent', borderColor: 'transparent'
                    }}>
                      <View style={{width:0,}}/>
                        <TouchableOpacity
                            active={this.state.activePage === 1}
                            onPress={this.selectComponent(1)}
                            style={{alignItems: 'center', marginTop: 10, borderColor: 'transparent', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightWidth: 0, borderLeftWidth: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0, borderTopWidth: 0, borderBottomWidth: this.state.activePage === 1 ? 1 : 0,borderBottomColor: this.state.activePage === 1 ? '#8FCFEB' : 'transparent', }}
                        >
                            <View style={{ height: 30, flexDirection: 'column' }}>



                          

                                <Text style={{
                                    fontFamily: "newFont",
                                    fontSize: 10, textAlign: 'center', 
                                    color: this.state.activePage === 1 ? '#8FCFEB' : 'gray'
                                }}>{i18n.t('categories')}</Text>
                                <View style={{  backgroundColor: this.state.activePage === 1 ? "white" : 'transparent', height: 5 }}></View>
                            </View>
                        </TouchableOpacity>
                        { i18n.locale=='ar'?(
                        <View style={{width:25}}/>
                        ):
                        <View style={{width:20}}/>

                        }
                        <TouchableOpacity
                            active={this.state.activePage === 2}
                            onPress={this.selectComponent(2)}
                            style={{ marginTop: 10,  alignItems: 'center', backgroundColor: this.state.activePage === 2 ? 'transparent' : 'transparent', borderColor: '#f4f4f4', borderColor: 'transparent', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightWidth: 0, borderLeftWidth: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0, borderTopWidth: 0, borderBottomWidth: 0 ,borderBottomWidth: this.state.activePage === 2 ? 1 : 0,borderBottomColor: this.state.activePage === 2 ? '#8FCFEB' : 'transparent', }}
                        >
                            <View style={{ height: 30, flexDirection: 'column' }}>

                                <Text style={{
                                    color: this.state.activePage === 2 ? '#8FCFEB' : 'gray',
                                    fontFamily: "newFont",
                                    fontSize: 10, 
                                }}>{i18n.t('drugStores')}</Text>
                                <View style={{  backgroundColor: this.state.activePage === 2 ? "white" : 'transparent', height: 5 }}></View>
                            </View>
                        </TouchableOpacity>
                        { i18n.locale=='ar'?(
                        <View style={{width:25}}/>
                        ):
                        <View style={{width:20}}/>

                        }
                        <TouchableOpacity
                            active={this.state.activePage === 3}
                            onPress={this.selectComponent(3)}
                            style={{ marginTop: 10,  backgroundColor: this.state.activePage === 3 ? null : 'transparent', borderColor: 'transparent', borderColor: 'transparent', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightWidth: 0, borderLeftWidth: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0, borderTopWidth: 0, borderBottomWidth: 0,borderBottomWidth: this.state.activePage === 3 ? 1 : 0,borderBottomColor: this.state.activePage === 3 ? '#8FCFEB' : 'transparent',  }}
                        >
                            <View style={{ height: 30, flexDirection: 'column' }}>

                                <Text style={{
                                    color: this.state.activePage === 3 ? '#8FCFEB' : 'gray',
                                    fontFamily: "newFont",
                                    fontSize: 10, 
                                }}>{i18n.t('subAgent')}</Text>
                                <View style={{  backgroundColor: this.state.activePage === 3 ? "white" : 'transparent', height: 5 }}></View>
                            </View>
                        </TouchableOpacity>
                        { i18n.locale=='en'?(
                        <View style={{width:20}}/>
                        ):
                        <View style={{width:25}}/>

                        }
                        <TouchableOpacity
                            active={this.state.activePage === 4}
                            onPress={this.selectComponent(4)}
                            style={{ marginTop: 10,   backgroundColor: this.state.activePage === 4 ? 'transparent' : 'transparent', borderColor: 'transparent', borderColor: 'transparent', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightWidth: 0, borderLeftWidth: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0, borderTopWidth: 0, borderBottomWidth: 0,borderBottomWidth: this.state.activePage === 4 ? 1 : 0,borderBottomColor: this.state.activePage === 4 ? '#8FCFEB' : 'transparent',  }}
                        >
                            <View style={{ height: 30, flexDirection: 'column' }}>

                                <Text style={{
                                    color: this.state.activePage === 4 ? 'red' : 'gray',
                                    fontFamily: "newFont",
                                    fontSize: 10, 
                                }}>{i18n.t('hotOffers')}</Text>
                                <View style={{  backgroundColor: this.state.activePage === 4 ? "white" : 'transparent', height: 5 }}></View>
                            </View>
                        </TouchableOpacity>


                        <View style={{width:0}}/>

                    </Segment>
                    </View>
            <Content style={{flex:1}} >
            
           

                    {this._renderComponent()}





              </Content>
           
           
          </ScrollView>


          <Modal
                        style={{
                            height: Dimensions.get('window').height, width: Dimensions.get('window').width, marginTop: 100, paddingTop: 100, backgroundColor: 'rgba(0,0,0,0.0.75)'

                        }}
                        animationType="slide"

                        
                        transparent={true}
                        visible={this.state.showImageModal}
                        onRequestClose={() => {
                          this.setShowImageModalVisible(false);
                      }}>

                        <View style={{
                            height: Dimensions.get('window').height, width: Dimensions.get('window').width, backgroundColor: 'rgba(0,0,0,0.75)'

                        }}>

                            <TouchableOpacity

                                style={{ paddingTop: 30, paddingLeft: Dimensions.get('window').width / 1.1 }}
                                onPress={() => {
                                    this.setShowImageModalVisible(false);
                                }}>
  <Icon style={{color:'white',height:30}} name={
        Platform.OS === 'ios'
          ? `md-close`
          : 'md-close'
      }/>
                            </TouchableOpacity>

                            <Image style={{
                                width: Dimensions.get('window').width,
                                height: Dimensions.get('window').height/1.5,
                                marginTop: Dimensions.get('window').height/15, 
                                paddingTop: Dimensions.get('window').height/15
                            }}

                                source={{
                                    uri: this.state.imagePopupUrl
                                }}


                            />
                        </View>

                    </Modal>


          <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.popUpModal}
                        onRequestClose={() => {
                            this.setModalVisible(false);
                        }}>
                         <LinearGradient style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, justifyContent: 'flex-start', alignItems: 'flex-start',flexDirection:'column' }}
                        colors={['#f5fafb', '#a8daef', '#8fcfeb']}>

<View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',width:Dimensions.get('window').width,height:30}}>
        <Button style={{}} transparent onPress={() =>  this.setModalVisible(false)}>
              <Icon style={{  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],color:'#7a7a7a',}}
               name={
        Platform.OS === 'ios'
          ? `ios-arrow-back`
          : 'arrow-back'
      }  />
            </Button>
         
           <View style={{height:70}}/>
        </View>
        <View style={{width:Dimensions.get('window').width,justifyContent:'center',height:120,alignItems:'center',paddingTop:50,flexDirection:'column'}}>
           <Image
                            source={require('../assets/images/logo.png')}
                            style={{
                              marginStart:-10,
                              resizeMode:'contain', paddingTop: 2,
                            }}
                        />
                         {/* <View style={{ height: Dimensions.get('window').height / 20 ,flexDirection:'column',width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center',}}>
<Text style={{fontSize:15,fontFamily:'Acens',color:'#8FCFEB',textAlign:'center'}}>SMORTEC</Text>
<Text style={{fontSize:15,fontFamily:'Acens',color:'gray',textAlign:'center'}}>We are the future</Text>

            </View> */}
           </View>
           <View style={{height:105}}/>
           <View style={{width:Dimensions.get('window').width/1.1,justifyContent:'flex-start',paddingStart:20}}>
           <TouchableOpacity 
           onPress={()=>{this.openNotificationList()}}
           style={{ flexDirection:'row',alignItems:'center'}}>
     <Icon style={{color:'#7a7a7a',}} name={
        Platform.OS === 'ios'
          ? `md-notifications`
          : 'md-notifications'
      }/> 
      <View style={{width:10}}/>
      <Text style={{ fontFamily: "newFont",
  fontSize: 15,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#7a7a7a"}}>{i18n.t('Notifications')}</Text>
        </TouchableOpacity>
        <View style={{height:15}}/>
        <TouchableOpacity  onPress={() =>this.termsAndConditions()}  style={{ flexDirection:'row',alignItems:'center'}}>
     <Icon style={{color:'#7a7a7a',}} name={
        Platform.OS === 'ios'
          ? `ios-paper`
          : 'ios-paper'
      }/> 
      <View style={{width:10}}/>
      <Text style={{ fontFamily: "newFont",
  fontSize: 15,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#7a7a7a"}}>{i18n.t('TermsandConditions')} </Text>
        </TouchableOpacity>

        <View style={{height:15}}/>
        <TouchableOpacity onPress={() =>this.faq()}   style={{ flexDirection:'row',alignItems:'center'}}>
     <Icon style={{color:'#7a7a7a',}} name={
        Platform.OS === 'ios'
          ? `md-help-circle`
          : 'md-help-circle'
      }/> 
      <View style={{width:10}}/>
      <Text style={{ fontFamily: "newFont",
  fontSize: 15,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#7a7a7a"}}>{i18n.t('FQA')}</Text>
        </TouchableOpacity>


        <View style={{height:15}}/>
        <TouchableOpacity onPress={() =>this.aboutUs()}   style={{ flexDirection:'row',alignItems:'center'}}>
     <Icon style={{color:'#7a7a7a',}} name={
        Platform.OS === 'ios'
          ? `ios-information-circle`
          : 'ios-information-circle'
      }/> 
      <View style={{width:10}}/>
      <Text style={{ fontFamily: "newFont",
  fontSize: 15,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#7a7a7a"}}>{i18n.t('aboutUs')}</Text>
        </TouchableOpacity>


        <View style={{height:15}}/>
        <TouchableOpacity 
           onPress={()=>{this.clearStorage()}}
        style={{ flexDirection:'row',alignItems:'center'}}>
     <Icon style={{color:'#7a7a7a',}} name={
        Platform.OS === 'ios'
          ? `md-power`
          : 'md-power'
      }/> 
      <View style={{width:10}}/>
      <Text style={{ fontFamily: "newFont",
  fontSize: 15,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#7a7a7a"}}>{i18n.t('Logout')}</Text>
        </TouchableOpacity>
        </View>
                       </LinearGradient>

                    </Modal>
          <View style={{
    justifyContent: 'center',
    alignItems: 'center',}}>
 
 <View >
        <View style={{ shadowColor: "black",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  , width: Dimensions.get('window').width,justifyContent:'space-between',alignItems:'center',paddingEnd:15,paddingStart:15,
    height: 60,flexDirection:'row',
    backgroundColor: 'white',borderTopColor:'gray',borderTopWidth:0.3
    
    }} >
    <TouchableOpacity style={{ width: Dimensions.get('window').width/6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
     <Icon style={{color:'#8FCFEB',}} name={
        Platform.OS === 'ios'
          ? `md-home`
          : 'md-home'
      }/> 
      <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#8FCFEB"}}>{i18n.t('home')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width: Dimensions.get('window').width/6, flexDirection:'column',justifyContent:'center',alignItems:'center'}}
         onPress={() =>
          this.props.navigation.navigate('WishListScreen')

      }
        >

    <Icon style={{color:'#c1c0c9',}} name={
        Platform.OS === 'ios'
          ? `md-heart`
          : 'md-heart'
      }/>
       <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#c1c0c9"}}>{i18n.t('wishlist')}</Text>
      </TouchableOpacity>
       
       
    
<TouchableOpacity 

onPress={() =>
  this.props.navigation.navigate('OrdersScreenOfTabs')

}
 style={{width: Dimensions.get('window').width/6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

   <Icon style={{color:'#c1c0c9',}} name={
        Platform.OS === 'ios'
          ? `md-paper`
          : 'md-paper'
      }/>
      <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,textAlign:'center',
  color: "#c1c0c9"}}>{i18n.t('orders')}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
     onPress={() =>
      this.props.navigation.navigate('SettingsScreen')

  }
    style={{width: Dimensions.get('window').width/6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

    <Icon style={{color:'#c1c0c9',}}  name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}/>
           <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#c1c0c9"}}>{i18n.t('settings')}</Text>
</TouchableOpacity>
</View>

      </View>   
    </View>

        




         
        </Container>

      </StyleProvider>
    );
  }
}


// const mapStateToActions = {
//   getCategories: requestCategories,
 
// }

// const mapStateToProps = state => ({
//   CategoriesData: state.CategoryReducers.Category,
//   Order: state.AddToOrderReducer.Order,
//  addItemToOrder: addItem

// });

// export default connect(mapStateToProps, AddOrderAction)(withNavigationFocus(HomeScreen));



const mapStateToActions = {
  getCategories: requestCategories,
  addItemToOrder: addItem
}

const mapStateToProps = state => ({
  CategoriesData: state.CategoryReducers.Category,
  Order: state.AddToOrderReducer.Order

});

export default connect(mapStateToProps, {...mapStateToActions,...AddOrderAction})(withNavigationFocus(HomeScreen));
const styles = StyleSheet.create({
  cardText: {
    position: 'absolute',
    top: 80,
    left: 50,
    right: 50,
    bottom: 0, 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:1,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  itemOriginal: {
    fontSize: 20,
    color: '#8FCFEB',
    fontWeight: 'bold'
  },
  itemORGPrice: {
    fontSize: 20,
    color: '#8FCFEB',
    fontWeight: 'bold'
  },
  itemText: {
    fontSize: 12,
    color: '#8FCFEB',
    fontWeight: 'bold'
  },
  itemPrice: {
    fontSize: 8,
    color: 'black',
    fontWeight: 'bold'
  },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  cardText: {
    position: 'absolute',
    top: 40,
    left: 110,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  cardSepratorHorizntal: {
    position: 'absolute',
    top: 110,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: 'white',
    width: 500,
    height: 5
  },
  cardSepratorVertical: {
    position: 'absolute',
    top: 114,
    left: 180,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: 'white',
    width: 5,
    height: 110
  },
  loader: {
    position: 'absolute',
    top: 350,
    left: 150
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
