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
import { DrawerActions } from 'react-navigation';
import getTheme from '../native-base-theme/components';
import variables from '../native-base-theme/variables/variables';
import { Font, AppLoading, SplashScreen, Notifications,Location } from 'expo';
// import Carousel ,{ Pagination } from 'react-native-snap-carousel';
import MyPriviousOrdersTab from './MyPriviousOrdersTab';
import MyCurrentOrdersTab from './MyCurrentOrdersTab';
// import SubAgentTab from '../UI_Commponents/SubAgentTab';
// import HotOffersListingTab from './HotOffersListingTab';
import ProfileScreen from './ProfileScreen'
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { DIMENSIONS } from 'react-native-numeric-input';
// import LaunchNavigator from 'react-native-launch-navigator';

import { Avatar, Badge, withBadge } from 'react-native-elements'


import { Localization } from 'expo-localization';
import Expo from 'expo';

// import Carousel from 'react-native-snap-carousel';


import i18n from 'i18n-js';
let lang;

const en = {
    home: 'Home',
    wishlist: 'Favorite',
    settings:'Settings',
    orders:'Orders',
        callNow:'CALL NOW',
    readMore:'READ MORE',
    myCurrentOrders:'My Current Orders',
    MyPriviousOrders:'My Previous Orders',
    myOrders:'MY ORDERS'
    
   
};
const ar = {
  home: 'الرئيسية',
  wishlist: 'المفضلة',
  settings:'الاعدادات',
  orders:'الطلبات',
    callNow:'اتصل الآن',
  readMore:'قراءة المزيد',
  myCurrentOrders:'طلباتي الحالية',
  MyPriviousOrders:'طلباتي السابقة',
  myOrders:'طلباتي'

};


const yosemite = { latitude:31.995513, longitude:  35.859667 };
 
const facebookHQ = { latitude: 37.4847, longitude: 122.1477 };

let BaseURL = 'http://delico.store';
const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;
class OrdersScreenOfTabs extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      status:200,
      Banner: [],
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
      activePage:2,

      phonCall:'07999999',
      ExperienceArr:this.props.Order,
      myLang: AsyncStorage.getItem("myLang").then((value) => {
        this.setState({ "myLang": value })
    }).done()
    ,

    }
    this.N360= this.N360.bind(this)
    this.Navigate = this.Navigate.bind(this)
     this.NavigateOld = this.NavigateOld.bind(this)

  }
  onSelect = data => {
    this.setState(data);
  };
  get pagination () {
    const { Banner, activeSlide } = this.state;
    return (
        <Pagination
          dotsLength={Banner.length}
          activeDotIndex={activeSlide}
          containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
          dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.92)'
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


componentWillUnmount() {
}


  async componentWillMount() {


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
        // isLoading:false,loading: false,fetching_from_server:false
      })}
    
    }
    }
    )




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
  // _getLocationAsync = async () => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== 'granted') {
  //     this.setState({
  //       errorMessage: 'Permission to access location was denied',
  //     });
  //   }

  //   let location = await Location.getCurrentPositionAsync({});
  //   this.setState({ location });
  // };

_goToYosemite() {
  openMap({ latitude: 31.995513, longitude:  35.859667 });
}

async  componentDidMount() {
  // if (I18nManager.isRTL)
  // {
  //   lang=4;
  // }
  // else{
  //   lang=1;
  // }
      this._retrieveData()
      if(this.props.Order.length>0){
        
    
      }
      
  SplashScreen.preventAutoHide();



  


}


  // Navigate(itemId,image,name) {
    
  //   console.log('catid',itemId)
  //   this.props.navigation.navigate('ItemListScreen', {
  //     itemId: itemId,
  //     image:image,
  //     name:name

  //   })
  // }

  N360() {
    this.props.navigation.navigate('WebView360')
  }
 
  componentDidMount() {
    client.get(`/sitesetting`).then((res) => {
      console.log('phone num',res.data.data[0].value)
    this.setState({phonCall:res.data.data[0].value})
    
      
    })
    console.log('cat array', this.props.CategoriesData)

    this.props.getCategories();
    client.get('/app/getbanners').then((res)=>{
      console.log('banner',res)
      for (let i = 0; i < res.data.data.length; i++) {
        this.state.Banner.push(res.data.data[i]);
        
       }



    })


  }

  static navigationOptions = {
    header:null
 };

//   static navigationOptions = {
    
    
//   title: 'DELICO',
//   headerStyle: {
//       backgroundColor: '#8FCFEB',fontFamily:'Acens',color:'white',height:77,
//       elevation: null
//   },
//   headerTitleStyle: {
//       fontFamily:'Acens',color:'white',fontSize:25
//   },
//   headerRight: (
//     <Icon name="search" style={{ color:'white',marginEnd:20}}/>
      
    
//   ),
// };
handleOnNavigateBack = (foo) => {
  this.setState({
    foo
  })
}
_callShowDirections = () => {
  const startPoint = this.state.location

  const endPoint = {
    longitude: 35.859667,
    latitude:  31.995513
  }

  const transportPlan = 'w';

 
}
openMap= () =>  {
  console.log('open directions')
  Platform.select({
      ios: () => {
          Linking.openURL('http://maps.apple.com/maps?daddr=32.004734,%2035.861525');
      },
      android: () => {
          Linking.openURL('http://maps.google.com/maps?daddr=32.004734,%2035.861525');
      }
  });
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

  
NavigateOld(id,name,orderArr,index, shipping_date
  ) {

  this.props.navigation.navigate('OrderDetailsOld', {
    id: id,
    name:name,
    orderArr,
    index,
    shipping_date
    

  })
  
}

Navigate(id,name,orderArr,index,shipping_date,agent,drug_store) {

  this.props.navigation.navigate('OrderDetails', {
    id: id,
    name:name,
    orderArr,
    index,
    shipping_date,
    agent,
    drug_store,
    onSelect: this.onSelect

  })
}
selectComponent = (activePage) => () => this.setState({ activePage })

_renderComponent = () => {
  if (this.state.activePage === 1)
      return <MyPriviousOrdersTab navigate={this.NavigateOld} />
  if (this.state.activePage === 2)
      return <MyCurrentOrdersTab navigate={this.Navigate} />
//   if (this.state.activePage === 3)
//       return <SubAgentTab navigation={this.props.navigation} />
//       if (this.state.activePage === 4)
//       return <HotOffersListingTab  navigation={this.props.navigation}/>
}
  render() {
    console.log('order  array',this.props.Order)

    i18n.fallbacks = true;
    i18n.translations = { ar, en };
    //i18n.locale =null;
    console.log('test:' + this.state.myLang);

    i18n.locale = this.state.myLang;
    const images = this.state.Banner
    console.log('images  rahmah', this.state.Banner )
    console.log('home screen array',this.props.CategoriesData)

//    if (!this.state.isReady) {


//       return (
//         <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width,backgroundColor:'white' }}>
      
//         <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center', }}
//             >
//             <View style={{ height: Dimensions.get('window').height / 5,flexDirection:'column' }}>
//             </View>

//             <Image
//                 source={require('../assets/images/smorteclogo.png')}
//                 style={{
//                     width: Dimensions.get('window').width/1.5,
//                     height: Dimensions.get('window').width/2.5, paddingTop: 2,marginBottom:-10,
//                     // resizeMode: 'contain'
//                 }}
//                 onLoad={this._cacheResourcesAsync}
//             />
//             <View style={{ height: Dimensions.get('window').height / 2.5 ,flexDirection:'column'}}>
// <Text style={{fontSize:30,fontFamily:'Acens',color:'#8FCFEB',textAlign:'center'}}>SMORTEC</Text>
// <Text style={{fontSize:30,fontFamily:'Acens',color:'gray',textAlign:'center'}}>We are the future</Text>

//             </View>
//             <Text style={{fontFamily:'Acens',color:'gray',textAlign:'center'}} >©SMORTEC 2019</Text>

//         </View>

//     </View>
//       );
//   }
  if (this.state.loading) {
      return <Expo.AppLoading />;
  }

    // if (!this.props.CategoriesData.length) {
    //   return (
    //     <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,justifyContent:'center',alignItems:'center'}}>
     
    //   <ActivityIndicator  size="large" color="#8FCFEB" />
    //   </View>
    //   )
    // } else {
    //   this.props.CategoriesData.length = 10;
    // }
// if(this.props.CategoriesData.length==0){
//   return(

//     <View>
//       <Text> NO DATA</Text>
//     </View>
//   )
// }
    return (
      <StyleProvider style={getTheme(variables)}>
        <Container>
        <Header style={{height:99,backgroundColor:'#8FCFEB'}}>
        
        <Left style={{}}>
        <Button style={{}} transparent onPress={() => this.props.navigation.goBack()}>
        <Icon  style={{  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],}}
name={
        Platform.OS === 'ios'
          ? `ios-arrow-back`
          : 'arrow-back'
      }  />
                  </Button>
           
        </Left>
        <Body style={styles.header}>
              <Title style={[styles.header,{fontSize:25,width:Dimensions.get('window').width/2,fontFamily:'Acens',marginLeft:0}]}>{i18n.t('myOrders')}</Title>
            </Body>
            <Right style={{width:50,justifyContent:'flex-end',marginRight:-70}} >
              <Body> 
              <TouchableOpacity 
     onPress={() =>
      this.props.navigation.navigate('OrderScreen')

  }
    style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
{this.returnBadg()}
    <Icon style={{color:'white',}} name={
        Platform.OS === 'ios'
          ? `md-cart`
          : 'md-cart'
      }/>
           {/* <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#c1c0c9"}}>Cart</Text> */}
</TouchableOpacity>
                
</Body>
            </Right>
        </Header> 

        
                        {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}

        

             
                <View style={{width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center'}}>
              <Segment style={{
                        width: Dimensions.get('window').width / 1.2,
                        borderWidth: 0,
                        backgroundColor: null, borderColor: null
                    }}>
                    {/* <View style={{width:50}}/> */}
                        <Button
                            active={this.state.activePage === 1}
                            onPress={this.selectComponent(1)}
                            style={{ justifyContent:'flex-end',alignItems: 'center', marginTop: 10,  borderColor: null, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightWidth: 0, borderLeftWidth: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0, borderTopWidth: 0, borderBottomWidth: this.state.activePage === 1 ? 1 : 0,borderBottomColor: this.state.activePage === 1 ? '#8FCFEB' : null, }}
                        >
                            <View style={{ height: 30, flexDirection: 'column' }}>





                                <Text style={{
                                    fontFamily: "newFont",
                                    fontSize: 15, textAlign: 'center', 
                                    color: this.state.activePage === 1 ? '#8FCFEB' : 'gray'
                                }}>{i18n.t('MyPriviousOrders')}</Text>
                                <View style={{  backgroundColor: this.state.activePage === 1 ? "white" : null, height: 5 }}></View>
                            </View>
                        </Button>
                        {/* <View style={{ width: 10 }}><Text></Text></View> */}
                        <Button
                            active={this.state.activePage === 2}
                            onPress={this.selectComponent(2)}
                            style={{ marginTop: 10,  alignItems: 'center', backgroundColor: this.state.activePage === 2 ? null : null, borderColor: '#f4f4f4', borderColor: null, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightWidth: 0, borderLeftWidth: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0, borderTopWidth: 0, borderBottomWidth: 0 ,borderBottomWidth: this.state.activePage === 2 ? 1 : 0,borderBottomColor: this.state.activePage === 2 ? '#8FCFEB' : null, }}
                        >
                            <View style={{ height: 30, flexDirection: 'column' }}>

                                <Text style={{
                                    color: this.state.activePage === 2 ? '#8FCFEB' : 'gray',
                                    fontFamily: "newFont",
                                    fontSize: 15, 
                                }}>{i18n.t('myCurrentOrders')}</Text>
                                <View style={{  backgroundColor: this.state.activePage === 2 ? "white" : null, height: 5 }}></View>
                            </View>
                        </Button>
                        {/* <View style={{ width: 10 }}><Text></Text></View> */}

                      
                            
                    </Segment>
                    </View>
            <Content style={{flex:1}} >
            
          

                    {this._renderComponent()}





              </Content>
           
           
          {/* </ScrollView> */}
         
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
    <TouchableOpacity
      onPress={() =>
        this.props.navigation.navigate('Home')

    }
    style={{ width: Dimensions.get('window').width/6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
     <Icon style={{color:'#c1c0c9',}} name={
        Platform.OS === 'ios'
          ? `md-home`
          : 'md-home'
      }/> 
      <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#c1c0c9"}}>{i18n.t('home')}</Text>
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
       
        {/* <View style={{width: Dimensions.get('window').width/4,
    height: 130,
    backgroundColor: 'white',
    borderTopEndRadius:80,borderTopStartRadius:80,justifyContent:'center',alignItems:'center'
    
    }} >
     <TouchableOpacity
     onPress={() => {
      this.setModalVisible(!this.state.popUpModal);
  }}
     style={{ borderRadius:35,height:70,width:70,borderColor:'#8FCFEB',borderWidth:5,backgroundColor:'white',justifyContent:'center',alignItems:'center',marginTop:-35}}>
            <Image style={{width:50,height:50,resizeMode:'contain'}} source={require('../assets/images/logo.png')}/></TouchableOpacity>


    </View> */}
    
<TouchableOpacity 
//  onPress={()=>{this._callShowDirections() }}
// onPress={

// Platform.select({
//     ios: () => {
//         Linking.openURL('http://maps.apple.com/maps?daddr=32.004734,%2035.861525');
//     },
//     android: () => {
//         Linking.openURL('http://maps.google.com/maps?daddr=32.004734,%2035.861525');
//     }
// })}
// onPress={() =>
//   this.props.navigation.navigate('MapViewScreen')

// }
 style={{width: Dimensions.get('window').width/6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

   <Icon style={{color:'#8FCFEB',}} name={
        Platform.OS === 'ios'
          ? `md-paper`
          : 'md-paper'
      }/>
      <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,textAlign:'center',
  color: "#8FCFEB"}}>{i18n.t('orders')}</Text>
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

          {/* <ImageBackground
      source={require('../assets/images/cutmypic.png')}
      style={{
        // resizeMode: 'contain',
        height: 150,
        paddingTop:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',
        width: Dimensions.get('window').width
      }}
   >
   
   <Icon style={{color:'#c1c0c9',marginStart:10,}} name={
        Platform.OS === 'ios'
          ? `md-home`
          : 'md-home'
      }/>   
    <Icon style={{color:'#c1c0c9',marginStart:10,}} name={
        Platform.OS === 'ios'
          ? `md-heart`
          : 'md-heart'
      }/>
      <View style={{borderRadius:30,height:60,width:60,borderColor:'#8FCFEB',borderWidth:3,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
            <Image style={{width:40,height:40,resizeMode:'contain'}} source={require('../assets/images/logo.png')}/></View>

      <Image style={{width:27,height:23}} source={require('../assets/images/shoppingbasket-24.png')}/>
      <Icon style={{color:'#c1c0c9',marginStart:10,marginRight:15}} name={
        Platform.OS === 'ios'
          ? `md-pin`
          : 'md-pin'
      }/>
   </ImageBackground> */}
          {/* <ImageBackground 
           source={require('../assets/images/logobackground.png')}
          style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width, height: 20 }}>


<View style={{ flexDirection: 'column', width: (Dimensions.get('window').width) / 2.4, backgroundColor: 'white', height: 20 }}>

    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', paddingTop: (Dimensions.get('window').height) / 400, backgroundColor: '#f4f4f4', borderTopColor: 'rgb(228,228,228)', borderTopWidth: 2 }}>

        <TouchableOpacity
           

        >
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    </View>
            </View></TouchableOpacity>
        <View style={{ width: (Dimensions.get('window').width) / 7, backgroundColor: 'white' }}></View>
        <TouchableOpacity
            

        >
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

               
                <View>
                    </View></View>
        </TouchableOpacity>



    </View>

</View>

<View style={{ flexDirection: 'column' ,height: (Dimensions.get('window').width) / 4.5,backgroundColor:'white',borderTopLeftRadius: 40,width:(Dimensions.get('window').width) / 4.5,
 borderTopRightRadius: 40, backgroundColor: 'white' ,
//  borderTopColor:'gray',borderTopWidth:1,borderLeftColor:'gray',borderRightColor:'gray',borderRightWidth:1,borderLeftWidth:1
 }}>
    <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: 'white' ,borderTopColor:'gray',}}>
        <Image
         source={require('../assets/images/logobackground.png')}
            style={{
                width: (Dimensions.get('window').width) / 3.5,marginLeft:-5,
                resizeMode: 'contain',
                height: (Dimensions.get('window').width) / 5,
                // marginBottom:-20

            }}
        /></View>
    <View style={{
        height: 40, backgroundColor: 'white',  marginBottom:-20
    }}></View>

</View>

<View style={{ flexDirection: 'column', width: (Dimensions.get('window').width) / 2.3, backgroundColor: 'white', height: 20 }}>

    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', paddingTop: (Dimensions.get('window').height) / 300, backgroundColor: '#f4f4f4', borderTopColor: 'rgb(228,228,228)', borderTopWidth: 2 }}>

        <TouchableOpacity
           

        >

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                

             


                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    </View>
            </View>
        </TouchableOpacity>
        <View style={{ width: (Dimensions.get('window').width) / 7, backgroundColor: 'white' }}></View>


        <TouchableOpacity
           

        >
            <View style={{ paddingRight: 10 }}>
               
                <View>
                    </View>
            </View>
        </TouchableOpacity>
    </View>

</View>
</ImageBackground> */}





          {/* <View style={{width:'100%',height:50,backgroundColor:'white',flexDirection:'row'}}>
             <View style={{width:'34%',height:40,backgroundColor:'white',borderTopWidth:2,borderTopColor:'gray'}}></View>
             <View style={{width:'34%',height:50,backgroundColor:'white',borderTopEndRadius:'30%',borderTopStartRadius:'30%',borderTopWidth:2,borderTopColor:'gray'}}></View>

             <View style={{width:'34%',height:40,backgroundColor:'white',borderTopWidth:2,borderTopColor:'gray'}}></View>
</View> */}
        </Container>

      </StyleProvider>
    );
  }
}
const mapStateToActions = {
  getCategories: requestCategories
}

const mapStateToProps = state => ({
  CategoriesData: state.CategoryReducers.Category,
  Order: state.AddToOrderReducer.Order

});

// export default connect(mapStateToProps, mapStateToActions)(HomeScreen)
export default connect(mapStateToProps, mapStateToActions)(withNavigationFocus(OrdersScreenOfTabs));
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
