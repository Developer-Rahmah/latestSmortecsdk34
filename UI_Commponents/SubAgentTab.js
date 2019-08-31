import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, Image,Dimensions,TouchableOpacity,ImageBackground ,Platform,AsyncStorage,Modal,I18nManager} from 'react-native';
import getTheme from '../native-base-theme/components';
import variables from '../native-base-theme/variables/variables';
import { connect } from "react-redux";
import { requestCategoryItem } from '../actions/getCategoryItemsAction';
import { SubAgentCardItem } from '../UI_Commponents/SubAgentCardItem';
import AddToCartModal from '../UI_Commponents/AddToCartModal';
import client from '../api/constant';
import { FlatGrid } from 'react-native-super-grid';
// import Modal from "react-native-modal";
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
  Content, Card, CardItem,
} from "native-base";
import { Avatar, Badge, withBadge } from 'react-native-elements'

import { Localization } from 'expo-localization';
import Expo from 'expo';



import i18n from 'i18n-js';
let lang;

const en = {
    home: 'Home',
    wishlist: 'Wishlist',
    settings:'Settings',
    whereToBuy:'Where To Buy',
    noRecordFound:'No Record Found',
    wishListTitle:'WISH LIST',
    callNow:'CALL NOW'
    
   
};
const ar = {
  home: 'الرئيسية',
  wishlist: 'المفضلة',
  settings:'الاعدادات',
  whereToBuy:'اماكن التواجد',
  noRecordFound:'القائمة فارغة',
  wishListTitle:'المفضلة',
  callNow:'اتصل الآن'


};

const arr=[{products_name:'allopathy',products_image:'http://www.sloviapharma.com/wp-content/uploads/2017/11/AllopathyIcon-150x150.png'},{products_name:'homeopathy',products_image:'https://cdn1.iconfinder.com/data/icons/medical-health-care-blue-series-set-4/64/b-88-512.png'},{products_name:'skin care',products_image:'https://cdn.iconscout.com/icon/premium/png-256-thumb/skin-care-11-1176415.png'},{products_name:'Baby Care',products_image:'https://pngimage.net/wp-content/uploads/2018/06/poussette-dessin-png-4.png'}]
class SubAgentTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang:1,
      catArr:[],
      isModalVisible: false,
      isLoading:true,
      wishListArr:[],
      testArr:[],
      wish:[],
      loading: true,
      success:'0',
      status:200,



    
      fetching_from_server: false,
      phonCall:'07999999',


      userID:'',
      popUpModal: false,
      myLang: AsyncStorage.getItem("myLang").then((value) => {
        this.setState({ "myLang": value })
    }).done()
    ,

    }
    this._toggleModal = this._toggleModal.bind(this);
    this.Navigate = this.Navigate.bind(this)
  }
  setModalVisible(visible) {
    this.setState({ popUpModal: visible });
  }
  
  Navigate(itemId,image,name,total_products) {
    
    console.log('catid',itemId)
    this.props.navigation.navigate('SubAgentListing', {
      itemId: itemId,
      image:image,
      name:name,
      total_products:total_products

    })
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  setItem = (item) =>
    this.setState({ item })

  static navigationOptions = {
    title: null,
    drawerLabel: 'Home',backgroundColor:'red'
  };
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
  async componentWillMount() {
    if ( await AsyncStorage.getItem("myLang")=='ar'){
      this.setState({lang:4}) 
    }
    else{
      this.setState({lang:1}) 
    }
  
    this._retrieveData()
    
   
  }
  static navigationOptions = {
    header:null
  
};

_retrieveData = async () => {
  this.setState({loading:true})
  try {
    const value = await AsyncStorage.getItem('userID');
    const myLang = await AsyncStorage.getItem('myLang');


    if (value !== null) {
      // We have data!!
      if(myLang=='ar'){
        lang=4;
      }else{
        lang=1;
      }
      console.log('userid:',value);
      this.setState({ fetching_from_server_topseller: true }, () => {

      client.post(`/app/getallproducts?type=wishlist&customers_id=${value}&language_id=${lang}`).then((res) => {
        console.log('wishlist array',res.data)
        // if(res.data.status==200){
        //   this.setState({status:200})
        // }else{
        //   this.setState({status:204})        }
        if(res.data.message=='Returned all products.'){
          this.setState({success:'1'})
        for (let i=0;i<res.data.product_data.length;i++){
          this.setState({
            wish: [...this.state.wish, (res.data.product_data[i]).products_id], 
          })
        }
        console.log('wish arrrray',this.state.wishListArr)
        for (let i=0;i<this.props.Order.length;i++){
          console.log('order of idssssssss',this.props.Order[i].products_id)
  
          // this.setState({ testArr: this.props.Order[i].products_id})
          this.setState({
            testArr: [...this.state.testArr, (this.props.Order[i]).products_id]
          })
        }
       if(res.data.product_data.length>0){
        this.setState({
          
          wishListArr: res.data.product_data,
          isLoading:false,loading: false,fetching_from_server:false
        })}
      
      }
      }
      )})
      client.post(`app/getagent?language_id=${lang}`).then((res) => {
        console.log('all categoraies array',res.data)
        if(res.data.status==200){
          this.setState({status:200})
          if(res.data.data.length>0){
            this.setState({
              
              catArr: res.data.data,
              // isLoading:false,loading: false,fetching_from_server:false
            })}
        }else{
          this.setState({status:204})        }
        
      }
      )

this.setState({
  userID:value
  
})

    }
  } catch (error) {
    // Error retrieving data
    console.log('getstorageitemerrrror',error);
  }
  
};

componentDidMount(){
 
  
}
  render() {
    i18n.fallbacks = true;
    i18n.translations = { ar, en };
    //i18n.locale =null;
    console.log('testwishlist:' + this.state.myLang);

    i18n.locale = this.state.myLang;
    const  Items  = this.state.wishListArr;
    
if(this.state.fetching_from_server){

}

    return (
    
         
          <Content>
        
              {this.state.isModalVisible &&
                <AddToCartModal
                  _toggleModal={this._toggleModal}
                  isModalVisible={this.state.isModalVisible}
                  setItem={this.setItem}
                  item={this.state.item}
                />
              }
                  {this.state.status==200 ?(
          this.state.catArr.length > 0 ? (
                 
              <FlatGrid
                itemDimension={130}
                items={this.state.catArr}
                style={styles.gridView}
                renderItem={({ item, index }) => (
                  <SubAgentCardItem
                    navigate={this.Navigate}
                    _toggleModal={this._toggleModal}
                    setItem={this.setItem}
                    index={index}
                    item={item}
                    Order={this.state.testArr}
                    wish={this.state.wish}
                    lang={lang}
                    />
                    )}
                    // ItemSeparatorComponent={() => <View style={styles.separator} />}
                    // ListFooterComponent={this.renderFooterDefult.bind(this)}
                    //Adding Load More button as footer component
                  />
                               ) : 
                  <ActivityIndicator color='#8FCFEB' size="large"  style={{color:'#8FCFEB',marginTop:20}}/>

         ):

        
         <View style={{justifyContent:'center',alignItems:'center',width:'100%'}}>
         <Text style={{fontFamily: "Acens",
  fontSize: 15,marginTop:100,
 fontWeight: "normal",
 fontStyle: "normal",
 letterSpacing: 0,
 textAlign: "left",
 color: "#777777"}} >{i18n.t('noRecordFound')}</Text>
     </View>
 

              }
            
          

         {/* {this.state.status==200 ?( */}
          {/* {this.state.catArr.length > 0 ? (
                 
              <FlatGrid
                itemDimension={130}
                items={this.state.catArr}
                style={styles.gridView}
                renderItem={({ item, index }) => (
                  <SubAgentCardItem
                    navigate={this.Navigate}
                    _toggleModal={this._toggleModal}
                    setItem={this.setItem}
                    index={index}
                    item={item}
                    Order={this.state.testArr}
                    wish={this.state.wish}
                    />
                    )}
                    // ItemSeparatorComponent={() => <View style={styles.separator} />}
                    // ListFooterComponent={this.renderFooterDefult.bind(this)}
                    //Adding Load More button as footer component
                  />
                               ) : 
                  <ActivityIndicator color='#8FCFEB' size="large"  style={{color:'#8FCFEB'}}/>

//          ):

        
//          <View style={{justifyContent:'center',alignItems:'center',width:'100%'}}>
//          <Text style={{fontFamily: "Acens",
//   fontSize: 15,marginTop:100,
//  fontWeight: "normal",
//  fontStyle: "normal",
//  letterSpacing: 0,
//  textAlign: "left",
//  color: "#777777"}} >{i18n.t('noRecordFound')}</Text>
//      </View>
  

              }
             */}
          
           
          </Content>
         
         
      
    )
  }
}


const mapStateToActions = {
  getCategoryItem: requestCategoryItem
}

const mapStateToProps = state => ({
  Items: state.CategoryItemsReducer.CtegoryItems,
  Order: state.AddToOrderReducer.Order

});
export default connect(mapStateToProps, mapStateToActions)(SubAgentTab)

const styles = StyleSheet.create({
  cardText: {
    position: 'absolute',
    top: 80,
    left: 50,
    right: 50,
    bottom: 0, 
    fontFamily: "Acens",
  fontSize: 26,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 42,
  letterSpacing: 0,
  textAlign: "center",
  color: "#ffffff",
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:1,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: 350,
    left: 150
  },
})




// import React from 'react';
// import { ScrollView, StyleSheet,View , ActivityIndicator,Dimensions,Platform,TouchableOpacity,Image,ImageBackground} from 'react-native';
// import {
//   Container,
//   Header,
//   Title,
//   Content,
//   Button,
//   Icon,
//   List,
//   ListItem,
//   Text,
//   Thumbnail,
//   Left,
//   Body,
//   Right,
//   StyleProvider
// } from "native-base";
// import Counter from "react-native-counters";
// import {connect} from "react-redux";
// import getTheme from '../native-base-theme/components';
// import variables from '../native-base-theme/variables/variables';
// import { FlatGrid } from 'react-native-super-grid';

// import NumericInput from 'react-native-numeric-input'

// import { getWishListAction } from '../actions/WishListActions';

// class WishListScreen extends React.Component {
//   static navigationOptions = {
//     title: null,
//   };
//   constructor(props){
//     super(props)
//     this.state = {
//       Price: 100,
//       count:1,
//       value: 1,

//       val: 1,
//       minColor: 'white',
//       isModalVisible: false
//     }
// }
// componentDidMount() {
//   console.log('didmountcatitem',this.props.getWishListAction())
//   this.props.getWishListAction()
// }
// setItem = (item) =>
//     this.setState({ item })
//   onChange(number) {
//     let price = 100;
//     price = parseFloat(price);
//     this.setState({
//       Price : price * number,
//       count: number
//     })
//   }
//   _toggleModal = () =>
//   this.setState({ isModalVisible: !this.state.isModalVisible });
  
//   static navigationOptions = {
//    header:null
// };
//   render() {
//     console.log('wishlissssst',this.props)
//     const  Items = this.props.wishList;
//     if(!Items.length){
//       return ( <ActivityIndicator style={styles.loader} size="large" color="#8FCFEB" /> )
//     } 
//     return (
//       <StyleProvider style={getTheme(variables)}>
//       <Container>
     
//     <Content>
//     <View style={{ flex: 1 }}>
//     {this.state.isModalVisible &&
//       <AddToCartModal
//         _toggleModal={this._toggleModal}
//         isModalVisible ={this.state.isModalVisible}
//         item={this.state.item}
//       /> 
//       }
//     <FlatGrid
//         itemDimension={130}
//         items={Items}
//         style={styles.gridView}
//         renderItem={({ item, index }) => (
//           <ItemCard
//           navigate={this.Navigate}
//           _toggleModal ={this._toggleModal}
//           setItem={this.setItem}
//           index ={index}
//           item= {item}
//           />
//           )}
//       />
//       </View>
//       </Content>
     
    
  
//         <View style={{
//     justifyContent: 'center',
//     alignItems: 'center',}}>
 
//  <View >
//         <View style={{ shadowColor: "black",
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     shadowOffset: {
//       height: 1,
//       width: 0
//     }
//   , width: Dimensions.get('window').width,justifyContent:'space-between',alignItems:'center',paddingEnd:15,paddingStart:15,
//     height: 80,flexDirection:'row',
//     backgroundColor: 'white',
    
//     }} >
//     <TouchableOpacity 
//      onPress={() =>
//       this.props.navigation.navigate('Home')

//   }
//     style={{ width: Dimensions.get('window').width/6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
//      <Icon style={{color:'#c1c0c9',}} name={
//         Platform.OS === 'ios'
//           ? `md-home`
//           : 'md-home'
//       }/> 
//       <Text style={{ fontFamily: "newFont",
//   fontSize: 10,
//   fontWeight: "normal",
//   fontStyle: "normal",
//   letterSpacing: 0,
//   color: "#c1c0c9"}}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//          onPress={() =>
//           this.props.navigation.navigate('WishListScreen')

//       }
//         style={{width: Dimensions.get('window').width/6, flexDirection:'column',justifyContent:'center',alignItems:'center'}}
        
//         >

//     <Icon style={{color:'#c1c0c9',}} name={
//         Platform.OS === 'ios'
//           ? `md-heart`
//           : 'md-heart'
//       }/>
//        <Text style={{ fontFamily: "newFont",
//   fontSize: 10,
//   fontWeight: "normal",
//   fontStyle: "normal",
//   letterSpacing: 0,
//   color: "#c1c0c9"}}>Wishlist</Text>
//       </TouchableOpacity>
//        <View style={{flexDirection:'row'}}>
      
//         <View style={{width: Dimensions.get('window').width/4,
//     height: 130,
//     backgroundColor: 'white',
//     borderTopEndRadius:80,borderTopStartRadius:80,justifyContent:'center',alignItems:'center'
    
//     }} >
//      <View style={{ borderRadius:35,height:70,width:70,borderColor:'#8FCFEB',borderWidth:5,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
//             <Image style={{width:50,height:50,resizeMode:'contain'}} source={require('../assets/images/logo.png')}/></View>

// </View>
//     </View>
//     <View style={{width: Dimensions.get('window').width/6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

//     <Icon style={{color:'#8FCFEB',}} name={
//         Platform.OS === 'ios'
//           ? `md-cart`
//           : 'md-cart'
//       }/>
//            <Text style={{ fontFamily: "newFont",
//   fontSize: 10,
//   fontWeight: "normal",
//   fontStyle: "normal",
//   letterSpacing: 0,
//   color: "#8FCFEB"}}>Cart</Text>
// </View>
// <View style={{width: Dimensions.get('window').width/6,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

//    <Icon style={{color:'#c1c0c9',}} name={
//         Platform.OS === 'ios'
//           ? `md-pin`
//           : 'md-pin'
//       }/>
//       <Text style={{ fontFamily: "newFont",
//   fontSize: 10,
//   fontWeight: "normal",
//   fontStyle: "normal",
//   letterSpacing: 0,
//   color: "#c1c0c9"}}>Where to Buy</Text>
//       </View>
       
// </View>

//       </View>   
//     </View>
//       </Container>
//       </StyleProvider>
//     );
//   }
// }




// const mapStateToActions = {
//   getWishListAction: getWishListAction
// }

// const mapStateToProps= state => ({
//   wishList: state.WishListReducer.wishList
// });
// export default connect(mapStateToProps, mapStateToActions)(WishListScreen)

// const styles = StyleSheet.create({
//   image : {
//     borderWidth: 1,
//     borderRadius: 2,
//     borderColor: '#ddd',
//     borderBottomWidth: 0,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 1,
//     marginLeft: 5,
//     marginRight: 5,
//     marginTop: 10,
//   },
//   counterWraper:{
//     borderWidth: 1,
//     borderColor: '#8FCFEB',
//   },
//   itemORGPrice:{
//     fontSize: 20,
//     color: 'black',
//     fontWeight: 'bold'
//   },
//   itemOriginal: {
//     fontFamily: "Acens",
//     fontSize: 17,
//     fontWeight: "normal",
//     fontStyle: "normal",
//     letterSpacing: 0,
//     textAlign: "left",
//     color: "#8FCFEB"
//   }
// });
