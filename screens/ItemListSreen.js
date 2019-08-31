import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, Image, Dimensions, TouchableOpacity, ImageBackground, Alert,Platform,ScrollView,I18nManager,AsyncStorage } from 'react-native';
import getTheme from '../native-base-theme/components';
import variables from '../native-base-theme/variables/variables';
import { connect } from "react-redux";
import { requestCategoryItem } from '../actions/getCategoryItemsAction';
import { ItemCard } from '../UI_Commponents/ItemCard';
import AddToCartModal from '../UI_Commponents/AddToCartModal';
import { SinglePickerMaterialDialog } from 'react-native-material-dialog';
import axios from 'axios';
import FlashMessage from "react-native-flash-message";
import client from '../api/constant'
import { Avatar, Badge, withBadge } from 'react-native-elements'
import { showMessage, hideMessage } from "react-native-flash-message";
import {addItem} from '../actions/AddToOrder'

import { FlatGrid } from 'react-native-super-grid';
import Modal from "react-native-modal";
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
  Content, Card, CardItem,Radio,
} from "native-base";

import { Localization } from 'expo-localization';
import Expo from 'expo';

let lang;

import i18n from 'i18n-js';


const en = {
    home: 'Home',
    wishlist: 'Favorite',
    settings:'Settings',
    orders:'Orders',
        filter:'Filter',
    atoz:'A-Z',
    ztoa:'Z-A',
    hightolow:'High to Low',
    lowtohigh:'Low to High',
    topseller:'Top Seller',
    mostLiked:'Most Liked',
    filterProducts:'Filter Products',
    callNow:'CALL NOW',
    qty:'QTY',
    bonus:'Bonus',
    profitMargin:'Profit Margin',
    cost:'Cost',
    public:'Public',
    profitMarginRatio:'Profit Margin',
    noRecordFound:'No Record Found',
    addedSuccessfully:'Added Successfully',
    inCart:'Added to Cart',
    addToCart:'ADD TO CART',
    addedToWishList:'Added to Wishlist',
    removedFromWishList:"Removed from Wishlist",


};
const ar = {
  addedToWishList:'تمت الاضافة الى المفضلة',
  removedFromWishList:"تم الحذف من المفضلة",
  home: 'الرئيسية',
  wishlist: 'المفضلة',
  settings:'الاعدادات',
  orders:'الطلبات',
    filter:'فلتر',
  atoz:'ا-ي',
  ztoa:'ي-ا',
  hightolow:'من الاعلى الى الاقل',
  lowtohigh:'من الاقل الى الاعلى',
  topseller:'الأكثر مبيعاً',
  mostLiked:'الأكثر اعجاباً',
  filterProducts:'ترتيب المنتجات',
  callNow:'اتصل الآن',
  qty:'الكمية',
    bonus:'زيادة مجانية',
    profitMargin:'هامش الربح',
    cost:'التكلفة',
    public:'العام',
    profitMarginRatio:'نسبة هامش الربح',
    noRecordFound:'القائمة فارغة',
    addedSuccessfully:'تمت اضافة العنصر بنجاح',
    inCart:'تمت الاضافة',
    addToCart:'أضف إلى السلة',

};


class ItemListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item:null,

      btnVisabilty:false,
      btnVisabilty_defult:false,
      btnVisabilty_ztoa:false,
      btnVisabilty_hightolow:false,
      btnVisabilty_lowtohignt:false,
      btnVisabilty_topseller:false,
      btnVisabilty_mostliked:false,



      count:1,
      value: 1,
      testArr:[],

      message: null ,

      val: 1,
      minColor: 'white',

      loading: true,
      loading_defult: true,
      loading_ztoa:true,
      loading_hightolow:true,
      loading_lowtohight: true,
      loading_topseller: true,
      loading_mostliked: true,



      //Loading state used while loading the data for the first time
      serverData: [],
      //Data Source for the FlatList
      fetching_from_server: false,
      fetching_from_server_defult: false,
      fetching_from_server_ztoa: false,
      fetching_from_server_hightolow: false,
      fetching_from_server_lowtohight: false,
      fetching_from_server_topseller: false,
      fetching_from_server_mostliked: false,


      btnDisabled:false,
      
      //Loading state used while loading more data
      isModalVisible: false,
      isModalSortVisible: false,
      filter: 'defult',
      status:200,
      defultArr:[],
      aToZArr: [],
      zToAArr:[],
      highToLowArr:[],
      lowToHightArr:[],
      topSellerArr:[],
      mostlikedArr:[],
      phonCall:'07999999',
      wish:[],
      popUpModal: false,
      testArr:[],
      wish:[],
      userID:'',
      singlePickerSelectedItem:'A To Z',
      singlePickerVisible: false,
      
      myLang: AsyncStorage.getItem("myLang").then((value) => {
        this.setState({ "myLang": value })
    }).done()
    ,




    }
    this.offset = 0;
    this.offset_defult = 0;
    this.offset_ztoa = 0;
this.offset_hightolow=0;
this.offset_lowtohight=0;
this.offset_topseller=0;
this.offset_mostliked=0;


    //Index of the offset to load from web API
    this._toggleModal = this._toggleModal.bind(this);
    this.Navigate = this.Navigate.bind(this)

  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userID');
      const myLang = await AsyncStorage.getItem('myLang');
      if (value !== null) {
        // We have data!!
        if(myLang=='ar')
        {
          lang=4;
        }else{
          lang=1;
        }
        // We have data!!
        this.setState({userID:value})
        console.log('user item in itemscreen',value);
        client.post(`/app/getallproducts?type=wishlist&customers_id=${value}&language_id=${lang}`).then((res) => {
          for (let i=0;i<res.data.product_data.length;i++){
          this.setState({
            wish: [...this.state.wish, (res.data.product_data[i]).products_id]
          })
        }
        
        
       
          console.log('wishlist array',this.state.wish)

         
         
        })
      }





   

    client.post(`/app/getallproducts?page_number=${this.offset_defult}&categories_id=${this.props.navigation.state.params.itemId}&language_id=${lang}`).then((res) => {
      console.log('filter a to z', res.data)
      console.log('filter a to z', res.data.product_data)
      if(res.data.status==200){
        this.setState({status:200})
      }else{
        this.setState({status:204})        }
      if(res.data.message=='Returned all products.'){
      this.offset_defult = this.offset_defult + 1;

      this.setState({ defultArr: res.data.product_data, loading_defult: false, })
      if(this.state.defultArr.length==res.data.total_record){
        this.setState({btnVisabilty_defult:false})
      }else{
        this.setState({btnVisabilty_defult:true})
      }
  
      for (let i=0;i<this.props.Order.length;i++){
        console.log('order of idssssssss',this.props.Order[i].products_id)
this.setState({
      testArr: [...this.state.testArr, (this.props.Order[i]).products_id],

      
    })
      
      }

     
      console.log('order of idssssssss',this.state.testArr)
    }
    
    
    })


    client.post(`/app/getallproducts?page_number=${this.offset}&categories_id=${this.props.navigation.state.params.itemId}&language_id=${lang}&type=a to z`).then((res) => {
      console.log('filter a to z', res.data)
      console.log('filter a to z', res.data.product_data)
      if(res.data.message=='Returned all products.'){
      this.offset = this.offset + 1;

      this.setState({ aToZArr: res.data.product_data, loading: false, })
      if(this.state.aToZArr.length==res.data.total_record){
        this.setState({btnVisabilty:false})
      }else{
        this.setState({btnVisabilty:true})
      }
  
      for (let i=0;i<this.props.Order.length;i++){
        console.log('order of idssssssss',this.props.Order[i].products_id)
  this.setState({
      testArr: [...this.state.testArr, (this.props.Order[i]).products_id],

      
    })
      
      }

     
      console.log('order of idssssssss',this.state.testArr)
    }
  
    
    })


    

    client.post(`/app/getallproducts?page_number=${this.offset_ztoa}&categories_id=${this.props.navigation.state.params.itemId}&language_id=${lang}&type=z to a`).then((res) => {
      console.log('filter z to a', res.data.product_data)
      if(res.data.message=='Returned all products.'){
        
        this.offset_ztoa = this.offset_ztoa + 1;
  
        this.setState({ zToAArr: res.data.product_data, loading_ztoa: false, })
  
        for (let i=0;i<this.props.Order.length;i++){
          console.log('order of idssssssss',this.props.Order[i].products_id)
  
          this.setState({
            testArr: [...this.state.testArr, (this.props.Order[i]).products_id],
      
            
          })
        }}
if(this.state.zToAArr.length==res.data.total_record){
  this.setState({btnVisabilty_ztoa:false})
}else{
  this.setState({btnVisabilty_ztoa:true})
}
    })

    client.post(`/app/getallproducts?page_number=${this.offset_hightolow}&categories_id=${this.props.navigation.state.params.itemId}&language_id=${lang}&type=high to low`).then((res) => {
      console.log('filter high to low', res.data.product_data)
      if(res.data.message=='Returned all products.'){
        this.offset_hightolow = this.offset_hightolow + 1;
  
        this.setState({ highToLowArr: res.data.product_data, loading_hightolow: false, })
  
        for (let i=0;i<this.props.Order.length;i++){
          console.log('order of idssssssss',this.props.Order[i].products_id)
          this.setState({
            testArr: [...this.state.testArr, (this.props.Order[i]).products_id],
      
            
          })
        
        }
  
      
        console.log('order of idssssssss',this.state.testArr)
      }
      if(this.state.highToLowArr.length==res.data.total_record){
        this.setState({btnVisabilty_hightolow:false})
      }else{
        this.setState({btnVisabilty_hightolow:true})
      }
    })
    client.post(`/app/getallproducts?page_number=${this.offset_lowtohight}&categories_id=${this.props.navigation.state.params.itemId}&language_id=${lang}&type=low to high`).then((res) => {
      console.log('filter high to low', res.data.product_data)
      if(res.data.message=='Returned all products.'){
        this.offset_lowtohight = this.offset_lowtohight+ 1;
  
        this.setState({ lowToHightArr: res.data.product_data, loading_lowtohight: false, })
  
        for (let i=0;i<this.props.Order.length;i++){
          console.log('order of idssssssss',this.props.Order[i].products_id)
  
          this.setState({
            testArr: [...this.state.testArr, (this.props.Order[i]).products_id],
      
            
          })
        }}
        if(this.state.lowToHightArr.length==res.data.total_record){
          this.setState({btnVisabilty_lowtohignt:false})
        }else{
          this.setState({btnVisabilty_lowtohignt:true})
        }
    })
    client.post(`/app/getallproducts?page_number=${this.offset_topseller}&categories_id=${this.props.navigation.state.params.itemId}&language_id=${lang}&type=top seller`).then((res) => {
      console.log('filter top seller', res.data.product_data)
      if(res.data.message=='Returned all products.'){
        this.offset_topseller = this.offset_topseller+ 1;
  
        this.setState({ topSellerArr: res.data.product_data, loading_topseller: false, })
  
        for (let i=0;i<this.props.Order.length;i++){
          console.log('order of idssssssss',this.props.Order[i].products_id)
          this.setState({
            testArr: [...this.state.testArr, (this.props.Order[i]).products_id],
      
            
          })
        
        }}
        if(this.state.topSellerArr.length==res.data.total_record){
          this.setState({btnVisabilty_topseller:false})
        }else{
          this.setState({btnVisabilty_topseller:true})
        }
    })
    client.post(`/app/getallproducts?page_number=${this.offset_mostliked}&categories_id=${this.props.navigation.state.params.itemId}&language_id=${lang}&type=most liked`).then((res) => {
      console.log('filter most liked', res.data.product_data)
      if(res.data.message=='Returned all products.'){
        this.offset_mostliked = this.offset_mostliked+ 1;
  
        this.setState({ mostlikedArr: res.data.product_data, loading_mostliked: false, })
  
        for (let i=0;i<this.props.Order.length;i++){
          console.log('order of idssssssss',this.props.Order[i].products_id)
          this.setState({
            testArr: [...this.state.testArr, (this.props.Order[i]).products_id],
      
            
          })
        
        }}
        if(this.state.mostlikedArr.length==res.data.total_record){
          this.setState({btnVisabilty_mostliked:false})
        }else{
          this.setState({btnVisabilty_mostliked:true})
        }
    })
    } catch (error) {
      // Error retrieving data
      console.log('getstorageitemerrrror',error);
    }
    if(this.state.testArr.includes(item.products_id)){
      this.setState({btnColor:'gray',txtColr:'#8FCFEB',btnDisabled:true,checkDisplay:'flex'})

}
  };
  setModalVisible(visible) {
    this.setState({ popUpModal: visible });
}
setSortModalVisible(visible) {
  this.setState({ isModalSortVisible: visible });
} 

  returnBadg()
  
  {

    
    if(this.props.Order.length>0){
  return(
    // <Badge style={{ alignItems:'center',justifyContent:'center', marginBottom:-10,borderRadius:8,width:16,height:16,borderColor:'red',borderWidth:1,backgroundColor:'red',color:'red'}}></Badge>
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
  onSelect = data => {
    this.setState(data);
  };

  Navigate(itemId,title) {
    const { Items } = this.props;
    const { Order } = this.props;

    this.props.navigation.navigate('ItemScreen', {
      itemId: itemId,
      title: title,
      onSelect: this.onSelect , 

    })
  }
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  setItem = (item) =>
    this.setState({ item })

  static navigationOptions = {
    title: null,
    drawerLabel: 'Home', backgroundColor: 'red'
  };
  async componentWillMount(){
  //   Image.getSize(this.props.uri, (width, height) => {
  //     if (this.props.width && !this.props.height) {
  //         this.setState({
  //             width: this.props.width,
  //             height: height * (this.props.width / width)
  //         });
  //     } else if (!this.props.width && this.props.height) {
  //         this.setState({
  //             width: width * (this.props.height / height),
  //             height: this.props.height
  //         });
  //     } else {
  //         this.setState({ width: width, height: height });
  //     }
  // });
  //   if (I18nManager.isRTL)
  //   {
  //     lang=4;
  //   }
  //   else{
  //     lang=1;
  //   }
  // }
  }
  async componentDidMount() {
   
    this._retrieveData()
    if(this.props.Order.length>0){
      
  
    }
    

    this.props.getCategoryItem()

    let itemId = this.props.navigation.state.params.itemId
    let image = this.props.navigation.state.params.image
    console.log('my category', this.props.Items)
  

  }
  static navigationOptions = {

    header:null
   
  };
  showDialog(){
    LIST=['A To Z','Z To A']
    return(
      <SinglePickerMaterialDialog
  title={'Pick one element!'}
  items={LIST.map((row, index) => ({ value: index, label: row }))}
  visible={this.state.singlePickerVisible}
  selectedItem={this.state.singlePickerSelectedItem}
  onCancel={() => this.setState({ singlePickerVisible: false })}
  onOk={result => {
    this.setState({ singlePickerVisible: false });
    this.setState({ singlePickerSelectedItem: result.selectedItem });
  }}
/>
    )
  }





  loadMoreData = () => {
console.log('in load moreeee')
    //On click of Load More button We will call the web API again
    this.setState({ fetching_from_server: true }, () => {

    client.post(`/app/getallproducts?page_number=${this.offset}&categories_id=${this.props.navigation.state.params.itemId}&language_id=${lang}&type=a to z`).then((res) => {
      console.log('filter a to z', res.data)
      console.log('filter a to z', res.data.product_data)
      if(res.data.message=='Returned all products.'){
        this.offset = this.offset + 1;
        for (let i=0;i<res.data.product_data.length;i++){
          console.log("final retail array",res.data.product_data[i])
         
          this.setState({
            aToZArr: [...this.state.aToZArr,res.data.product_data[i]],fetching_from_server: false
          })
          if(this.state.aToZArr.length==res.data.total_record){
            this.setState({btnVisabilty:false})
          }else{
            this.setState({btnVisabilty:true})
          }
      
          
          console.log("final retail array with setstate",this.state.aToZArr)
  
        }
       
  
      }
     

    })

  });
    };



    loadMoreDataDefult = () => {
      console.log('in load moreeee')
          //On click of Load More button We will call the web API again
          this.setState({ fetching_from_server_defult: true }, () => {
      
          client.post(`/app/getallproducts?page_number=${this.offset_defult}&categories_id=${this.props.navigation.state.params.itemId}&language_id=${lang}`).then((res) => {
            console.log('filter a to z', res.data)
            console.log('filter a to z', res.data.product_data)
            if(res.data.message=='Returned all products.'){
              this.offset_defult = this.offset_defult + 1;
              for (let i=0;i<res.data.product_data.length;i++){
                console.log("final retail array",res.data.product_data[i])
               
                this.setState({
                  defultArr: [...this.state.defultArr,res.data.product_data[i]],fetching_from_server_defult: false
                })
                if(this.state.defultArr.length==res.data.total_record){
                  this.setState({btnVisabilty_defult:false})
                }else{
                  this.setState({btnVisabilty_defult:true})
                }
            
                
        
              }
            
        
            }
           
      
          })
      
        });
          };

    loadMoreDatamostliked = () => {
      console.log('in load moreeee')
          //On click of Load More button We will call the web API again
          this.setState({ fetching_from_server_mostliked: true }, () => {

          client.post(`/app/getallproducts?page_number=${this.offset_mostliked}&categories_id=${this.props.navigation.state.params.itemId}&language_id=${lang}&type=most liked`).then((res) => {
            console.log('filter a to z', res.data)
            console.log('filter a to z', res.data.product_data)
            if(res.data.message=='Returned all products.'){
              this.offset_mostliked = this.offset_mostliked + 1;
              for (let i=0;i<res.data.product_data.length;i++){
                console.log("final retail array",res.data.product_data[i])
               
                this.setState({
                  mostlikedArr: [...this.state.mostlikedArr,res.data.product_data[i]],fetching_from_server: false
                })
                if(this.state.mostlikedArr.length==res.data.total_record){
                  this.setState({btnVisabilty_mostliked:false})
                }else{
                  this.setState({btnVisabilty_mostliked:true})
                }
            
        
              }
            
        
            }
           
      
         
    })

  });
      
          };
      


    loadMoreDataztoa = () => {
      console.log('in load moreeee')
          //On click of Load More button We will call the web API again
          this.setState({ fetching_from_server_ztoa: true }, () => {

          client.post(`/app/getallproducts?page_number=${this.offset_ztoa}&categories_id=${this.props.navigation.state.params.itemId}&language_id=${lang}&type=z to a`).then((res) => {
            console.log('filter a to z', res.data)
            console.log('filter a to z', res.data.product_data)
            if(res.data.message=='Returned all products.'){
              this.offset_ztoa = this.offset_ztoa + 1;
              for (let i=0;i<res.data.product_data.length;i++){
               
                this.setState({
                  zToAArr: [...this.state.zToAArr,res.data.product_data[i]],fetching_from_server_ztoa: false
                })
                if(this.state.zToAArr.length==res.data.total_record){
                  this.setState({btnVisabilty_ztoa:false})
                }else{
                  this.setState({btnVisabilty_ztoa:true})
                }
            
        
              }
             
        
            }
           
      
    })

  });
      
          };
          loadMoreDatahightolow = () => {
            this.setState({ fetching_from_server_hightolow: true }, () => {

                //On click of Load More button We will call the web API again
                client.post(`/app/getallproducts?page_number=${this.offset_hightolow}&categories_id=${this.props.navigation.state.params.itemId}&language_id=${lang}&type=high to low`).then((res) => {
                  console.log('filter a to z', res.data)
                  console.log('filter a to z', res.data.product_data)
                  if(res.data.message=='Returned all products.'){
                    this.offset_hightolow = this.offset_hightolow + 1;
                    for (let i=0;i<res.data.product_data.length;i++){
                     
                      this.setState({
                        highToLowArr: [...this.state.highToLowArr,res.data.product_data[i]],fetching_from_server_hightolow: false
                      })
                      if(this.state.highToLowArr.length==res.data.total_record){
                        this.setState({btnVisabilty_hightolow:false})
                      }else{
                        this.setState({btnVisabilty_hightolow:true})
                      }
                  
              
                    }
                   
              
                  }
                 
            
               
    })

  });
                };

                loadMoreDatalowtohight = () => {
                  console.log('in load moreeee')
                  this.setState({ fetching_from_server_lowtohight: true }, () => {

                      //On click of Load More button We will call the web API again
                      client.post(`/app/getallproducts?page_number=${this.offset_lowtohight}&categories_id=${this.props.navigation.state.params.itemId}&language_id=${lang}&type=low to high`).then((res) => {
                        console.log('filter a to z', res.data)
                        console.log('filter a to z', res.data.product_data)
                        if(res.data.message=='Returned all products.'){
                          this.offset_lowtohight = this.offset_lowtohight + 1;
                          for (let i=0;i<res.data.product_data.length;i++){
                            console.log("final retail array",res.data.product_data[i])
                           
                            this.setState({
                              lowToHightArr: [...this.state.lowToHightArr,res.data.product_data[i]],fetching_from_server_lowtohight: false
                            })
                            if(this.state.lowToHightArr.length==res.data.total_record){
                              this.setState({btnVisabilty_lowtohignt:false})
                            }else{
                              this.setState({btnVisabilty_lowtohignt:true})
                            }
                        
                            console.log("final retail array with setstate",this.state.lowToHightArr)
                    
                          }
                         
                    
                        }
                       
                  
                    
    })

  });
                  
                      };


                      loadMoreDatatopseller = () => {
                        console.log('in load moreeee')
                        this.setState({ fetching_from_server_topseller: true }, () => {

                            //On click of Load More button We will call the web API again
                            client.post(`/app/getallproducts?page_number=${this.offset_topseller}&categories_id=${this.props.navigation.state.params.itemId}&language_id=${lang}&type=top seller`).then((res) => {
                              console.log('filter a to z', res.data)
                              console.log('filter a to z', res.data.product_data)
                              if(res.data.message=='Returned all products.'){
                                this.offset_topseller = this.offset_topseller + 1;
                                for (let i=0;i<res.data.product_data.length;i++){
                                  console.log("final retail array",res.data.product_data[i])
                                 
                                  this.setState({
                                    topSellerArr: [...this.state.topSellerArr,res.data.product_data[i]],fetching_from_server_topseller: false
                                  })
                                  if(this.state.topSellerArr.length==res.data.total_record){
                                    this.setState({btnVisabilty_topseller:false})
                                  }else{
                                    this.setState({btnVisabilty_topseller:true})
                                  }
                              
                                  console.log("final retail array with setstate",this.state.topSellerArr)
                          
                                }
                               
                          
                              }
                             
                        
                          
    })

  });
                        
                            };
                        
                        


   
    renderFooter() {
      if(this.state.btnVisabilty){

      
      return (
      //Footer View with Load More button
        <View style={{ padding: 10,width:Dimensions.get('window').width,backgroundColor:'white',
          justifyContent: 'center',height:80,paddingBottom:60,
          
          alignItems: 'center',
          flexDirection: 'row',}}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this.loadMoreData}

            style={{padding: 10,
              backgroundColor: 'white',shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              
              elevation: 5,
              
              borderRadius: 4,
              flexDirection: 'row',
              justifyContent: 'center',width:50,height:50,borderRadius:25,
              alignItems: 'center',}}>
           
    <Image  style={{ height:this.state.fetching_from_server? 0:27,width:27}}  source={require('../assets/images/loadmore.png')}/>
            {this.state.fetching_from_server ? (
              <ActivityIndicator color="#8FCFEB" style={{ marginLeft: -25.5,}} />
            ) : null}
          </TouchableOpacity>
        </View>
      );
            } else{
              return(
                null
              )
            }
           
    }


    renderFooterDefult() {
      if(this.state.btnVisabilty_defult){

      
      return (
      //Footer View with Load More button
        <View style={{ padding: 10,width:Dimensions.get('window').width,backgroundColor:'white',
          justifyContent: 'center',height:80,paddingBottom:60,
          
          alignItems: 'center',
          flexDirection: 'row',}}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this.loadMoreDataDefult}

            style={{padding: 10,
              backgroundColor: 'white',shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              
              elevation: 5,
              
              borderRadius: 4,
              flexDirection: 'row',
              justifyContent: 'center',width:50,height:50,borderRadius:25,
              alignItems: 'center',}}>
            
    <Image  style={{ height:this.state.fetching_from_server_defult? 0:27,width:27}}  source={require('../assets/images/loadmore.png')}/>
            {this.state.fetching_from_server_defult ? (
              <ActivityIndicator color="#8FCFEB" style={{ marginLeft: -25.5,}} />
            ) : null}
          </TouchableOpacity>
        </View>
      );
            } else{
              return(
                null
              )
            }
           
    }



    renderFootermostliked() {
      if(this.state.btnVisabilty_mostliked){

      return (
      //Footer View with Load More button
      <View style={{ padding: 10,width:Dimensions.get('window').width,backgroundColor:'white',
      justifyContent: 'center',height:80,paddingBottom:60,
      
      alignItems: 'center',
      flexDirection: 'row',}}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.loadMoreDatamostliked}

        style={{padding: 10,
          backgroundColor: 'white',shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          
          elevation: 5,
          
          borderRadius: 4,
          flexDirection: 'row',
          justifyContent: 'center',width:50,height:50,borderRadius:25,
          alignItems: 'center',}}>
     
<Image  style={{ height:this.state.fetching_from_server_mostliked? 0:27,width:27}}  source={require('../assets/images/loadmore.png')}/>
        {this.state.fetching_from_server_mostliked ? (
          <ActivityIndicator color="#8FCFEB" style={{ marginLeft: -25.5,}} />
        ) : null}
      </TouchableOpacity>
    </View>
      );
            }
      else{
        return(
          null
        )
      }
    }



    renderFooterztoa() {
      if(this.state.btnVisabilty_ztoa){

      return (
      //Footer View with Load More button
      <View style={{ padding: 10,width:Dimensions.get('window').width,backgroundColor:'white',
      justifyContent: 'center',height:80,paddingBottom:60,
      
      alignItems: 'center',
      flexDirection: 'row',}}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.loadMoreDataztoa}

        style={{padding: 10,
          backgroundColor: 'white',shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          
          elevation: 5,
          
          borderRadius: 4,
          flexDirection: 'row',
          justifyContent: 'center',width:50,height:50,borderRadius:25,
          alignItems: 'center',}}>
       
<Image  style={{ height:this.state.fetching_from_server_ztoa? 0:27,width:27}}  source={require('../assets/images/loadmore.png')}/>
        {this.state.fetching_from_server_ztoa ? (
          <ActivityIndicator color="#8FCFEB" style={{ marginLeft: -25.5,}} />
        ) : null}
      </TouchableOpacity>
    </View>
      );
            }
            else{
              return(
                null
              )
            }
    }


    renderFooterhightolow() {
      if(this.state.btnVisabilty_hightolow){

      return (
      //Footer View with Load More button
      <View style={{ padding: 10,width:Dimensions.get('window').width,backgroundColor:'white',
      justifyContent: 'center',height:80,paddingBottom:60,
      
      alignItems: 'center',
      flexDirection: 'row',}}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.loadMoreDatahightolow}

        style={{padding: 10,
          backgroundColor: 'white',shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          
          elevation: 5,
          
          borderRadius: 4,
          flexDirection: 'row',
          justifyContent: 'center',width:50,height:50,borderRadius:25,
          alignItems: 'center',}}>
       
<Image  style={{ height:this.state.fetching_from_server_hightolow? 0:27,width:27}}  source={require('../assets/images/loadmore.png')}/>
        {this.state.fetching_from_server_hightolow ? (
          <ActivityIndicator color="#8FCFEB" style={{ marginLeft: -25.5,}} />
        ) : null}
      </TouchableOpacity>
    </View>
      );
            } else{
              return(
                null
              )
            }
    }

    renderFooterlowtohight() {
      if(this.state.btnVisabilty_lowtohignt){

      return (
      //Footer View with Load More button
      <View style={{ padding: 10,width:Dimensions.get('window').width,backgroundColor:'white',
      justifyContent: 'center',height:80,paddingBottom:60,
      
      alignItems: 'center',
      flexDirection: 'row',}}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.loadMoreDatalowtohight}

        style={{padding: 10,
          backgroundColor: 'white',shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          
          elevation: 5,
          
          borderRadius: 4,
          flexDirection: 'row',
          justifyContent: 'center',width:50,height:50,borderRadius:25,
          alignItems: 'center',}}>
       
<Image  style={{ height:this.state.fetching_from_server_lowtohight? 0:27,width:27}}  source={require('../assets/images/loadmore.png')}/>
        {this.state.fetching_from_server_lowtohight ? (
          <ActivityIndicator color="#8FCFEB" style={{ marginLeft: -25.5,}} />
        ) : null}
      </TouchableOpacity>
    </View>
      );
            } else{
              return(
                null
              )
            }
    }
    likedPress(products_id){
      // if(this.state.wish.includes() !=undefined){
if(this.state.wish.includes(products_id)){
  client.post(`/app/unlikeproduct?liked_products_id=${products_id}&liked_customers_id=${this.state.userID}`).then((res) => {
    console.log('wishlist',res)
    // this.setState({wish:[]})
  if(res.data.status==200){
    Alert.alert(
      `${i18n.t('removedFromWishList')}`,
      `${i18n.t('removedFromWishList')}`,
      [
        
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
     this.setState({wish:[]})

    client.post(`/app/getallproducts?type=wishlist&customers_id=${this.state.userID}&language_id=${lang}`).then((res) => {
      for (let i=0;i<res.data.product_data.length;i++){
        this.setState({
          wish: [...this.state.wish, (res.data.product_data[i]).products_id]
        })       }

    })
  }
  })
  
}else{

  client.post(`/app/likeproduct?liked_products_id=${products_id}&liked_customers_id=${this.state.userID}`).then((res) => {
    console.log('wishlist',res)
    console.log('wishlist user id',this.state.userID)
      console.log('wishlist item id',products_id)
      if(res.data.status==200){




        Alert.alert(
          `${i18n.t('addedToWishList')}`,
          `${i18n.t('addedToWishList')}`,
          [
            
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );


        // showMessage({
        //   message: i18n.t('addedToWishList'),
        //   type: "success",
        // });
        client.post(`/app/getallproducts?type=wishlist&customers_id=${this.state.userID}&language_id=${lang}`).then((res) => {
          for (let i=0;i<res.data.product_data.length;i++){
          this.setState({
            wish: [...this.state.wish, (res.data.product_data[i]).products_id]
          })      }
  
        })}
  })
}
}
    //}

    renderFootertopseller() {
      if(this.state.btnVisabilty_topseller){

      return (
      //Footer View with Load More button
      <View style={{ padding: 10,width:Dimensions.get('window').width,backgroundColor:'white',
          justifyContent: 'center',height:80,paddingBottom:60,
          
          alignItems: 'center',
          flexDirection: 'row',}}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this.loadMoreDatatopseller}

            style={{padding: 10,
              backgroundColor: 'white',shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              
              elevation: 5,
              
              borderRadius: 4,
              flexDirection: 'row',
              justifyContent: 'center',width:50,height:50,borderRadius:25,
              alignItems: 'center',}}>
          
    <Image  style={{ height:this.state.fetching_from_server_topseller? 0:27,width:27}}  source={require('../assets/images/loadmore.png')}/>
            {this.state.fetching_from_server_topseller ? (
              <ActivityIndicator color="#8FCFEB" style={{ marginLeft: -25.5,}} />
            ) : null}
          </TouchableOpacity>
        </View>
      );
            } else{
              return(
                null
              )
            }
    }

    handelAddToOrder(item){
      this.setState({testArr: this.state.testArr.concat(item.products_id)});
      let test=0;
      for(let i=0;i<=item.bounce.length;i++){
    
        if(item.bounce[i]!=undefined){ 

        if(this.state.count>=item.bounce[i].qty_from){
          if(item.bounce[i].type=='percent'){
    
            test=item.bounce[i].bounces;
            console.log("testttttttt00000000000-1-1-1-1,",test)

    test=parseInt((item.bounce[i].bounces)/100*this.state.count)
    console.log("testttttttt00000000000,",test)
          }else{
                  parseInt(test=item.bounce[i].bounces);
                  console.log("testttttttt00000000000888888888,",test)

          }
          this.setState({bounsNum:item.bounce[i].bounces})
        }
      }
    }
      let BaseURL = 'https://smortec.com';
      let testTaxF=0;
      let testTaxS=0;
      let testTaxE=0;
      let ppp=0;
      if(item.tax_description=='4%'){
    
      
       testTaxF= 0.04*parseFloat(item.products_price);
    }else  if(item.tax_description=='8%'){
    
      
       testTaxE= 0.08*parseFloat(item.products_price);
    } else  if(item.tax_description=='16%'){
    
      
       testTaxS= 0.16*parseFloat(item.products_price);
    }
        if(item.new_price !=null && item.new_price !=''){
          ppp= parseFloat(item.new_price)
          
        }else{
          ppp=parseFloat(item.cost_price)
        }
    
        
       
    
    let profitmarginratio=0;
    let profitmargion=0;
    
        let totalSell=item.products_price*(this.state.count+parseInt(test))
        profitmargion= totalSell-(ppp*this.state.count)
        let margin=ppp*(this.state.count+parseInt(test))
        profitmarginratio=(parseFloat(profitmargion / margin)*100).toFixed(3)
        let price = item.new_price !=null && item.new_price !=''?parseFloat(item.new_price): parseFloat(item.cost_price);

      let itemss={
        drug_store:item.drug_store,
        products_id:item.products_id,
        products_name : item.products_name,
        
        final_price:  ppp,
        // price: item.new_price !=null &&item.new_price !=''?parseFloat(item.new_price): parseFloat(item.cost_price),
        price: item.new_price !=null && item.new_price !=''?parseFloat(item.new_price): parseFloat(item.cost_price),

        customers_basket_quantity: this.state.count,
        image: BaseURL + '/' +item.products_image,
        bounsArr:item.bounce,
        test:parseInt(test),
        unit:item.units,
        tax:item.tax_description,
        profit_margin: parseFloat(profitmargion),
        profit_margin_ratio:(profitmarginratio),
        testTaxF:testTaxF,
        testTaxE:testTaxE,
        testTaxS:testTaxS,
        f:ppp,
        publicPrice:item.products_price,
        isCustom:false,
        redeem:this.props.redeem,
        bounsNum:this.state.bounsNum,
        testTaxF: item.tax_description*parseFloat(item.products_price),
      }    


      this.props.addItemToOrder(itemss)
      showMessage({
        message: i18n.t('addedSuccessfully'),
        type: "success",
      });
  
    }

    
 
  returnArray() {
    const { Items } = this.props;
    console.log('listingarray',Items)
    let BaseURL = 'https://smortec.com/';
    if (this.state.filter === 'defult') {
      return (
        <Content>
          <View style={{ flex: 1 }}>
            {this.state.isModalVisible &&
              <AddToCartModal
                _toggleModal={this._toggleModal}
                isModalVisible={this.state.isModalVisible}
                setItem={this.setItem}
                item={this.state.item}
              />
            }
           
         {this.state.status==200 ?(
          this.state.defultArr.length > 0 ? (
              <FlatGrid
              itemDimension={130}
              items={this.state.defultArr}
              style={styles.gridView}
              renderItem={({ item, index }) => (
                // <ItemCard
                //   navigate={this.Navigate}
                //   _toggleModal={this._toggleModal}
                //   setItem={this.setItem}
                //   index={index}
                //   item={item}
                //   Order={this.state.testArr}
                //   wish={this.state.wish}

                // />


                <Card cardBorderRadius={5}>     
                <View
                   
                    
                   >
             
             
                   
                   <View>
                  <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                 <TouchableOpacity  style={{ width: '100%', flex: 1,flex:1,height:Dimensions.get('window').height/3.7,
    alignItems: 'stretch'}} onPress={() =>{
                             this.Navigate (item.products_id,item.products_name)
                             }}> 
                  <Image resizeMode={'stretch'}
                              source={{uri: BaseURL +item.products_image}}  style={{  position: 'absolute',
                              top: 0,height:null,
                              flex:1,
                              left: 0,
                              bottom: 0,
                              right: 0,}}/>
                   </TouchableOpacity> 
                   <View style={{justifyContent:'flex-start',width:'85%',flexDirection:'column',alignItems:'flex-start',padding:3}}>
             
              <Text   numberOfLines={1}
              style={{  fontSize: 13,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily:"newFont",marginTop:5,marginBottom:5,color:'#8FCFEB'}}>{item.products_name}</Text>
                 {/* <Text   numberOfLines={2}
              style={[styles.itemText,{marginTop:0,marginBottom:0,color:'gray',fontFamily:'#newFont'}]}>{item.products_description}</Text> */}
                
               
                 </View>
                
                 {/* <Text   numberOfLines={1}
                  
              style={[styles.itemText,{marginTop:0,marginBottom:0,color:'#383838',}]}>{item.new_price} JOD</Text>
                 */}
                 <View style={{justifyContent:'space-between',width:'85%',flexDirection:'row',alignItems:'center'}}>
                
                
                 {item.new_price !=null &&item.new_price !=''?(
                  <Text   numberOfLines={1}
                  
              style={{  fontSize: 10,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'#383838',textDecorationLine: 'line-through',color:'gray'}}>{item.cost_price} JOD</Text>
                
                 ):
                 <Text   numberOfLines={1}
                  
                 style={{  fontSize: 12,
                  fontWeight: "normal",
                  fontStyle: "normal",
                  letterSpacing: 0,
                  color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'#383838'}}>{item.cost_price} JOD </Text>

                  
                 }  

{item.new_price !=null &&item.new_price !=''?(
                   
                   <Text   numberOfLines={2}
              style={{  fontSize: 12,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'black'}}> - {item.new_price}JOD</Text>
               
                ):
                null}
                 <TouchableOpacity onPress={()=>{this.likedPress(item.products_id)}}>
                {/* <Image source={this.state.wish.includes(item.products_id) ? require('../assets/images/hart.png') : require('../assets/images/hartempty.png')} style={{width:17,height:23,marginBottom:10,resizeMode:'contain',}}/> */}
                {this.state.wish.includes(item.products_id) ? 
                <Icon name="md-heart" style={{fontSize:25,color:"red",alignSelf:"center"}} />
                :
                <Icon name="md-heart" style={{fontSize:25,color:"#8FCFEB",alignSelf:"center"}} />

                }
             </TouchableOpacity> 
                 </View>
                  </View>
                 
                
                   </View>
                  
                          
                         </View>
                         <View style={{width:'100%'}}>
                             <Body style={{width:'100%'}}>
                             <Button style={{width:'100%'}}
                              onPress={() =>{
                                this.handelAddToOrder(item)

                              //  this.Navigate (item.products_id,item.products_name)
                               }}
                               disabled={ this.state.testArr.includes(item.products_id)||item.in_stock==0? true:false}

                             // disabled={ Order.includes(item.products_id)? true:false}
                             style={{height:30,backgroundColor:this.state.testArr.includes(item.products_id)||item.in_stock==0?'gray':'#8FCFEB',borderBottomEndRadius:7,borderBottomStartRadius:7,justifyContent:'center',alignItems:'center'}} 
                             block 
                            //onPress={()=>{
                             
                           
                            //    props.navigate(props.item.products_id)
                               
                            //  }}
                             >
               <Text style={{fontFamily: "Acens",
                 fontSize: 12,textAlign:'center',
                 fontWeight: "normal",
                 fontStyle: "normal",
                 letterSpacing: 0,
                 color: "#ffffff"
               }}>{I18nManager.isRTL?'أضف الى السلة':'Add to Cart'}</Text>      
                   </Button>
                         </Body>
                           </View>
                         {/* <View style={{height:20}}/> */}
                     </Card>

              )}
              ListFooterComponent={this.renderFooterDefult.bind(this)}
            />
            ) : 
            <ActivityIndicator color='#8FCFEB' size="large"  style={{color:'#8FCFEB',marginTop:50}}/>

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
        
          </View>
        </Content>
      
    
       ) } else if (this.state.filter === 'AtoZ') {


      
      return (
        <Content>
          <View style={{ flex: 1 }}>
            {this.state.isModalVisible &&
              <AddToCartModal
                _toggleModal={this._toggleModal}
                isModalVisible={this.state.isModalVisible}
                setItem={this.setItem}
                item={this.state.item}
              />
            }
             {this.state.loading ? (
          <ActivityIndicator color='#8FCFEB' size="large"  style={{color:'#8FCFEB'}}/>
        ) : (
            <FlatGrid
              itemDimension={130}
              items={this.state.aToZArr}
              style={styles.gridView}
              renderItem={({ item, index }) => (
                // <ItemCard
                //   navigate={this.Navigate}
                //   _toggleModal={this._toggleModal}
                //   setItem={this.setItem}
                //   index={index}
                //   item={item}
                //   Order={this.state.testArr}
                //   wish={this.state.wish}

                // />




                <Card cardBorderRadius={5}>     
                <View
                   
                    
                   >
             
             
                   
                   <View>
                  <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                 <TouchableOpacity  style={{ width: '100%', flex: 1,flex:1,height:Dimensions.get('window').height/3.7,
    alignItems: 'stretch'}} onPress={() =>{
                             this.Navigate (item.products_id,item.products_name)
                             }}> 
                  <Image resizeMode={'stretch'}
                              source={{uri: BaseURL +item.products_image}}  style={{  position: 'absolute',
                              top: 0,height:null,
                              flex:1,
                              left: 0,
                              bottom: 0,
                              right: 0,}}/>
                   </TouchableOpacity> 
                   <View style={{justifyContent:'flex-start',width:'85%',flexDirection:'column',alignItems:'flex-start',padding:3}}>
             
              <Text   numberOfLines={1}
              style={{  fontSize: 13,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily: "Acens",marginTop:5,marginBottom:5,color:'#8FCFEB'}}>{item.products_name}</Text>
                 {/* <Text   numberOfLines={2}
              style={[styles.itemText,{marginTop:0,marginBottom:0,color:'gray',fontFamily:'#newFont'}]}>{item.products_description}</Text> */}
                
               
                 </View>
                
                 {/* <Text   numberOfLines={1}
                  
              style={[styles.itemText,{marginTop:0,marginBottom:0,color:'#383838',}]}>{item.new_price} JOD</Text>
                 */}
                 <View style={{justifyContent:'space-between',width:'85%',flexDirection:'row',alignItems:'center'}}>
                  
                 {item.new_price !=null &&item.new_price !=''?(
                    <Text   numberOfLines={1}
                  
                    style={{  fontSize: 10,
                      fontWeight: "normal",
                      fontStyle: "normal",
                      letterSpacing: 0,
                      color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'#383838',textDecorationLine: 'line-through',color:'gray'}}>{item.cost_price} JOD</Text>
                      
                       ):
                       <Text   numberOfLines={1}
                        
                       style={{  fontSize: 12,
                        fontWeight: "normal",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'#383838'}}>{item.cost_price} JOD </Text>
      
                        
                       }  
      
      {item.new_price !=null &&item.new_price !=''?(
                         
                         <Text   numberOfLines={2}
                    style={{  fontSize: 12,
                      fontWeight: "normal",
                      fontStyle: "normal",
                      letterSpacing: 0,
                      color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'black'}}> - {item.new_price}JOD</Text>
                     
                      ):
                      null}

                 <TouchableOpacity onPress={()=>{this.likedPress(item.products_id)}}>
                {/* <Image source={this.state.wish.includes(item.products_id) ? require('../assets/images/hart.png') : require('../assets/images/hartempty.png')} style={{width:17,height:23,marginBottom:10,resizeMode:'contain',}}/> */}
                {this.state.wish.includes(item.products_id)? 
                <Icon name="md-heart" style={{fontSize:25,color:"red",alignSelf:"center"}} />
                :
                <Icon name="md-heart" style={{fontSize:25,color:"#8FCFEB",alignSelf:"center"}} />

                }
             </TouchableOpacity> 
                 </View>
                  </View>
                 
                
                   </View>
                  
                          
                         </View>
                         <View style={{width:'100%'}}>
                             <Body style={{width:'100%'}}>
                             <Button style={{width:'100%'}}
                              onPress={() =>{
                                this.handelAddToOrder(item)

                              //  this.Navigate (item.products_id,item.products_name)
                               }}
                               disabled={ this.state.testArr.includes(item.products_id)||item.in_stock==0? true:false}

                             // disabled={ Order.includes(item.products_id)? true:false}
                             style={{height:30,backgroundColor:this.state.testArr.includes(item.products_id)||item.in_stock==0?'gray':'#8FCFEB',borderBottomEndRadius:7,borderBottomStartRadius:7,justifyContent:'center',alignItems:'center'}} 
                             block 
                            //onPress={()=>{
                             
                           
                            //    props.navigate(props.item.products_id)
                               
                            //  }}
                             >
               <Text style={{fontFamily: "Acens",
                 fontSize: 12,textAlign:'center',
                 fontWeight: "normal",
                 fontStyle: "normal",
                 letterSpacing: 0,
                 color: "#ffffff"
               }}>{I18nManager.isRTL?'أضف الى السلة':'Add to Cart'}</Text>      
                   </Button>
                         </Body>
                           </View>
                         {/* <View style={{height:20}}/> */}
                     </Card>

              )}
              ListFooterComponent={this.renderFooter.bind(this)}
              //Adding Load More button as footer component
            />
        )}
          </View>
        </Content>
      );
    }

    else if (this.state.filter === 'ZtoA') {


      
      return (
        <Content>
          <View style={{ flex: 1 }}>
            {this.state.isModalVisible &&
              <AddToCartModal
                _toggleModal={this._toggleModal}
                isModalVisible={this.state.isModalVisible}
                setItem={this.setItem}
                item={this.state.item}
                

              />
            }
             {this.state.loading_ztoa ? (
          <ActivityIndicator color='#8FCFEB' size="large"  style={{color:'#8FCFEB'}}/>
        ) : (
            <FlatGrid
              itemDimension={130}
              items={this.state.zToAArr}
              style={styles.gridView}
              renderItem={({ item, index }) => (
                // <ItemCard
                //   navigate={this.Navigate}
                //   _toggleModal={this._toggleModal}
                //   setItem={this.setItem}
                //   index={index}
                //   item={item}
                //   Order={this.state.testArr}
                //   wish={this.state.wish}

                // />



                <Card cardBorderRadius={5}>     
                <View
                   
                    
                   >
             
             
                   
                   <View>
                  <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                 <TouchableOpacity  style={{ width: '100%', flex: 1,flex:1,height:Dimensions.get('window').height/3.7,
    alignItems: 'stretch'}} onPress={() =>{
                             this.Navigate (item.products_id,item.products_name)
                             }}> 
                  <Image resizeMode={'stretch'}
                              source={{uri: BaseURL +item.products_image}}  style={{  position: 'absolute',
                              top: 0,height:null,
                              flex:1,
                              left: 0,
                              bottom: 0,
                              right: 0,}}/>
                   </TouchableOpacity> 
                   <View style={{justifyContent:'flex-start',width:'85%',flexDirection:'column',alignItems:'flex-start',padding:3}}>
             
              <Text   numberOfLines={1}
              style={{  fontSize: 13,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily: "Acens",marginTop:5,marginBottom:5,color:'#8FCFEB'}}>{item.products_name}</Text>
                 {/* <Text   numberOfLines={2}
              style={[styles.itemText,{marginTop:0,marginBottom:0,color:'gray',fontFamily:'#newFont'}]}>{item.products_description}</Text> */}
                
               
                 </View>
                
                 {/* <Text   numberOfLines={1}
                  
              style={[styles.itemText,{marginTop:0,marginBottom:0,color:'#383838',}]}>{item.new_price} JOD</Text>
                 */}
                 <View style={{justifyContent:'space-between',width:'85%',flexDirection:'row',alignItems:'center'}}>
                  
                 {item.new_price !=null &&item.new_price !=''?(
                    <Text   numberOfLines={1}
                  
                    style={{  fontSize: 10,
                      fontWeight: "normal",
                      fontStyle: "normal",
                      letterSpacing: 0,
                      color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'#383838',textDecorationLine: 'line-through',color:'gray'}}>{item.cost_price} JOD</Text>
                      
                       ):
                       <Text   numberOfLines={1}
                        
                       style={{  fontSize: 12,
                        fontWeight: "normal",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'#383838'}}>{item.cost_price} JOD </Text>
      
                        
                       }  
      
      {item.new_price !=null &&item.new_price !=''?(
                         
                         <Text   numberOfLines={2}
                    style={{  fontSize: 12,
                      fontWeight: "normal",
                      fontStyle: "normal",
                      letterSpacing: 0,
                      color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'black'}}> - {item.new_price}JOD</Text>
                     
                      ):
                      null}


                 <TouchableOpacity onPress={()=>{this.likedPress(item.products_id)}}>
                {/* <Image source={this.state.wish.includes(item.products_id) ? require('../assets/images/hart.png') : require('../assets/images/hartempty.png')} style={{width:17,height:23,marginBottom:10,resizeMode:'contain',}}/> */}
                {this.state.wish.includes(item.products_id)? 
                <Icon name="md-heart" style={{fontSize:25,color:"red",alignSelf:"center"}} />
                :
                <Icon name="md-heart" style={{fontSize:25,color:"#8FCFEB",alignSelf:"center"}} />

                }
             </TouchableOpacity> 
                 </View>
                  </View>
                 
                
                   </View>
                  
                          
                         </View>
                         <View style={{width:'100%'}}>
                             <Body style={{width:'100%'}}>
                             <Button style={{width:'100%'}}
                              onPress={() =>{
                                this.handelAddToOrder(item)

                              //  this.Navigate (item.products_id,item.products_name)
                               }}
                               disabled={ this.state.testArr.includes(item.products_id)||item.in_stock==0? true:false}

                             // disabled={ Order.includes(item.products_id)? true:false}
                             style={{height:30,backgroundColor:this.state.testArr.includes(item.products_id)||item.in_stock==0?'gray':'#8FCFEB',borderBottomEndRadius:7,borderBottomStartRadius:7,justifyContent:'center',alignItems:'center'}} 
                             block 
                            //onPress={()=>{
                             
                           
                            //    props.navigate(props.item.products_id)
                               
                            //  }}
                             >
               <Text style={{fontFamily: "Acens",
                 fontSize: 12,textAlign:'center',
                 fontWeight: "normal",
                 fontStyle: "normal",
                 letterSpacing: 0,
                 color: "#ffffff"
               }}>{I18nManager.isRTL?'أضف الى السلة':'Add to Cart'}</Text>      
                   </Button>
                         </Body>
                           </View>
                         {/* <View style={{height:20}}/> */}
                     </Card>

              )}
              ListFooterComponent={this.renderFooterztoa.bind(this)}
              />
        )}
          </View>
        </Content>
      );
    }

    else if (this.state.filter === 'hightolow') {


      
      return (
        <Content>
          <View style={{ flex: 1 }}>
            {this.state.isModalVisible &&
              <AddToCartModal
                _toggleModal={this._toggleModal}
                isModalVisible={this.state.isModalVisible}
                setItem={this.setItem}
                item={this.state.item}
              />
            }
             {this.state.loading_hightolow? (
          <ActivityIndicator color='#8FCFEB' size="large"  style={{color:'#8FCFEB'}}/>
        ) : (
            <FlatGrid
              itemDimension={130}
              items={this.state.highToLowArr}
              style={styles.gridView}
              renderItem={({ item, index }) => (
                // <ItemCard
                //   navigate={this.Navigate}
                //   _toggleModal={this._toggleModal}
                //   setItem={this.setItem}
                //   index={index}
                //   item={item}
                //   Order={this.state.testArr}
                //   wish={this.state.wish}

                // />



                <Card cardBorderRadius={5}>     
                <View
                   
                    
                   >
             
             
                   
                   <View>
                  <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                 <TouchableOpacity  style={{ width: '100%', flex: 1,flex:1,height:Dimensions.get('window').height/3.7,
    alignItems: 'stretch'}} onPress={() =>{
                             this.Navigate (item.products_id,item.products_name)
                             }}> 
                  <Image resizeMode={'stretch'}
                              source={{uri: BaseURL +item.products_image}}  style={{  position: 'absolute',
                              top: 0,height:null,
                              flex:1,
                              left: 0,
                              bottom: 0,
                              right: 0,}}/>
                   </TouchableOpacity> 
                   <View style={{justifyContent:'flex-start',width:'85%',flexDirection:'column',alignItems:'flex-start',padding:3}}>
             
              <Text   numberOfLines={1}
              style={{  fontSize: 13,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily:"newFont",marginTop:5,marginBottom:5,color:'#8FCFEB'}}>{item.products_name}</Text>
                 {/* <Text   numberOfLines={2}
              style={[styles.itemText,{marginTop:0,marginBottom:0,color:'gray',fontFamily:'#newFont'}]}>{item.products_description}</Text> */}
                
               
                 </View>
                
                 {/* <Text   numberOfLines={1}
                  
              style={[styles.itemText,{marginTop:0,marginBottom:0,color:'#383838',}]}>{item.new_price} JOD</Text>
                 */}
                 <View style={{justifyContent:'space-between',width:'85%',flexDirection:'row',alignItems:'center'}}>
                
                
                 {item.new_price !=null &&item.new_price !=''?(
                  <Text   numberOfLines={1}
                  
              style={{  fontSize: 10,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'#383838',textDecorationLine: 'line-through',color:'gray'}}>{item.cost_price} JOD</Text>
                
                 ):
                 <Text   numberOfLines={1}
                  
                 style={{  fontSize: 12,
                  fontWeight: "normal",
                  fontStyle: "normal",
                  letterSpacing: 0,
                  color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'#383838'}}>{item.cost_price} JOD </Text>

                  
                 }  

{item.new_price !=null &&item.new_price !=''?(
                   
                   <Text   numberOfLines={2}
              style={{  fontSize: 12,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'black'}}> - {item.new_price}JOD</Text>
               
                ):
                null}
                 <TouchableOpacity onPress={()=>{this.likedPress(item.products_id)}}>
                {/* <Image source={this.state.wish.includes(item.products_id) ? require('../assets/images/hart.png') : require('../assets/images/hartempty.png')} style={{width:17,height:23,marginBottom:10,resizeMode:'contain',}}/> */}
                {this.state.wish.includes(item.products_id) ? 
                <Icon name="md-heart" style={{fontSize:25,color:"red",alignSelf:"center"}} />
                :
                <Icon name="md-heart" style={{fontSize:25,color:"#8FCFEB",alignSelf:"center"}} />

                }
             </TouchableOpacity> 
                 </View>
                  </View>
                 
                
                   </View>
                  
                          
                         </View>
                         <View style={{width:'100%'}}>
                             <Body style={{width:'100%'}}>
                             <Button style={{width:'100%'}}
                              onPress={() =>{
                                this.handelAddToOrder(item)

                              //  this.Navigate (item.products_id,item.products_name)
                               }}
                               disabled={ this.state.testArr.includes(item.products_id)||item.in_stock==0? true:false}

                             // disabled={ Order.includes(item.products_id)? true:false}
                             style={{height:30,backgroundColor:this.state.testArr.includes(item.products_id)||item.in_stock==0?'gray':'#8FCFEB',borderBottomEndRadius:7,borderBottomStartRadius:7,justifyContent:'center',alignItems:'center'}} 
                             block 
                            //onPress={()=>{
                             
                           
                            //    props.navigate(props.item.products_id)
                               
                            //  }}
                             >
               <Text style={{fontFamily: "Acens",
                 fontSize: 12,textAlign:'center',
                 fontWeight: "normal",
                 fontStyle: "normal",
                 letterSpacing: 0,
                 color: "#ffffff"
               }}>{I18nManager.isRTL?'أضف الى السلة':'Add to Cart'}</Text>      
                   </Button>
                         </Body>
                           </View>
                         {/* <View style={{height:20}}/> */}
                     </Card>

              )}
              ListFooterComponent={this.renderFooterhightolow.bind(this)}
              />
        )}
          </View>
        </Content>
      );
    }
    else if (this.state.filter === 'lowtohigh') {


      
      return (
        <Content>
          <View style={{ flex: 1 }}>
            {this.state.isModalVisible &&
              <AddToCartModal
                _toggleModal={this._toggleModal}
                isModalVisible={this.state.isModalVisible}
                setItem={this.setItem}
                item={this.state.item}
              />
            }
             {this.state.loading_lowtohight ? (
          <ActivityIndicator color='#8FCFEB' size="large"  style={{color:'#8FCFEB'}}/>
        ) : (
            <FlatGrid
              itemDimension={130}
              items={this.state.lowToHightArr}
              style={styles.gridView}
              renderItem={({ item, index }) => (
                // <ItemCard
                //   navigate={this.Navigate}
                //   _toggleModal={this._toggleModal}
                //   setItem={this.setItem}
                //   index={index}
                //   item={item}
                //   Order={this.state.testArr}
                //   wish={this.state.wish}

                // />


                <Card cardBorderRadius={5}>     
                <View
                   
                    
                   >
             
             
                   
                   <View>
                  <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                 <TouchableOpacity  style={{ width: '100%', flex: 1,flex:1,height:Dimensions.get('window').height/3.7,
    alignItems: 'stretch'}} onPress={() =>{
                             this.Navigate (item.products_id,item.products_name)
                             }}> 
                  <Image resizeMode={'stretch'}
                              source={{uri: BaseURL +item.products_image}}  style={{  position: 'absolute',
                              top: 0,height:null,
                              flex:1,
                              left: 0,
                              bottom: 0,
                              right: 0,}}/>
                   </TouchableOpacity> 
                   <View style={{justifyContent:'flex-start',width:'85%',flexDirection:'column',alignItems:'flex-start',padding:3}}>
             
              <Text   numberOfLines={1}
              style={{  fontSize: 13,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily:"newFont",marginTop:5,marginBottom:5,color:'#8FCFEB'}}>{item.products_name}</Text>
                 {/* <Text   numberOfLines={2}
              style={[styles.itemText,{marginTop:0,marginBottom:0,color:'gray',fontFamily:'#newFont'}]}>{item.products_description}</Text> */}
                
               
                 </View>
                
                 {/* <Text   numberOfLines={1}
                  
              style={[styles.itemText,{marginTop:0,marginBottom:0,color:'#383838',}]}>{item.new_price} JOD</Text>
                 */}
                 <View style={{justifyContent:'space-between',width:'85%',flexDirection:'row',alignItems:'center'}}>
                
                
                 {item.new_price !=null &&item.new_price !=''?(
                  <Text   numberOfLines={1}
                  
              style={{  fontSize: 10,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'#383838',textDecorationLine: 'line-through',color:'gray'}}>{item.cost_price} JOD</Text>
                
                 ):
                 <Text   numberOfLines={1}
                  
                 style={{  fontSize: 12,
                  fontWeight: "normal",
                  fontStyle: "normal",
                  letterSpacing: 0,
                  color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'#383838'}}>{item.cost_price} JOD </Text>

                  
                 }  

{item.new_price !=null &&item.new_price !=''?(
                   
                   <Text   numberOfLines={2}
              style={{  fontSize: 12,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'black'}}> - {item.new_price}JOD</Text>
               
                ):
                null}
                 <TouchableOpacity onPress={()=>{this.likedPress(item.products_id)}}>
                {/* <Image source={this.state.wish.includes(item.products_id) ? require('../assets/images/hart.png') : require('../assets/images/hartempty.png')} style={{width:17,height:23,marginBottom:10,resizeMode:'contain',}}/> */}
                {this.state.wish.includes(item.products_id) ? 
                <Icon name="md-heart" style={{fontSize:25,color:"red",alignSelf:"center"}} />
                :
                <Icon name="md-heart" style={{fontSize:25,color:"#8FCFEB",alignSelf:"center"}} />

                }
             </TouchableOpacity> 
                 </View>
                  </View>
                 
                
                   </View>
                  
                          
                         </View>
                         <View style={{width:'100%'}}>
                             <Body style={{width:'100%'}}>
                             <Button style={{width:'100%'}}
                              onPress={() =>{
                                this.handelAddToOrder(item)

                              //  this.Navigate (item.products_id,item.products_name)
                               }}
                               disabled={ this.state.testArr.includes(item.products_id)||item.in_stock==0? true:false}

                             // disabled={ Order.includes(item.products_id)? true:false}
                             style={{height:30,backgroundColor:this.state.testArr.includes(item.products_id)||item.in_stock==0?'gray':'#8FCFEB',borderBottomEndRadius:7,borderBottomStartRadius:7,justifyContent:'center',alignItems:'center'}} 
                             block 
                            //onPress={()=>{
                             
                           
                            //    props.navigate(props.item.products_id)
                               
                            //  }}
                             >
               <Text style={{fontFamily: "Acens",
                 fontSize: 12,textAlign:'center',
                 fontWeight: "normal",
                 fontStyle: "normal",
                 letterSpacing: 0,
                 color: "#ffffff"
               }}>{I18nManager.isRTL?'أضف الى السلة':'Add to Cart'}</Text>      
                   </Button>
                         </Body>
                           </View>
                         {/* <View style={{height:20}}/> */}
                     </Card>

              )}
              ListFooterComponent={this.renderFooterlowtohight.bind(this)}
              />
        )}
          </View>
        </Content>
      );
    }

    else if (this.state.filter === 'topseller') {


      
      return (
        <Content>
          <View style={{ flex: 1 }}>
            {this.state.isModalVisible &&
              <AddToCartModal
                _toggleModal={this._toggleModal}
                isModalVisible={this.state.isModalVisible}
                setItem={this.setItem}
                item={this.state.item}
              />
            }
             {this.state.loading_topseller? (
          <ActivityIndicator color='#8FCFEB' size="large"  style={{color:'#8FCFEB'}}/>
        ) : (
            <FlatGrid
              itemDimension={130}
              items={this.state.topSellerArr}
              style={styles.gridView}
              renderItem={({ item, index }) => (
                // <ItemCard
                //   navigate={this.Navigate}
                //   _toggleModal={this._toggleModal}
                //   setItem={this.setItem}
                //   index={index}
                //   item={item}
                //   Order={this.state.testArr}
                //   wish={this.state.wish}

                // />

                <Card cardBorderRadius={5}>     
                <View
                   
                    
                   >
             
             
                   
                   <View>
                  <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                 <TouchableOpacity  style={{ width: '100%', flex: 1,flex:1,height:Dimensions.get('window').height/3.7,
    alignItems: 'stretch'}} onPress={() =>{
                             this.Navigate (item.products_id,item.products_name)
                             }}> 
                  <Image resizeMode={'stretch'}
                              source={{uri: BaseURL +item.products_image}}  style={{  position: 'absolute',
                              top: 0,height:null,
                              flex:1,
                              left: 0,
                              bottom: 0,
                              right: 0,}}/>
                   </TouchableOpacity> 
                   <View style={{justifyContent:'flex-start',width:'85%',flexDirection:'column',alignItems:'flex-start',padding:3}}>
             
              <Text   numberOfLines={1}
              style={{  fontSize: 13,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily:"newFont",marginTop:5,marginBottom:5,color:'#8FCFEB'}}>{item.products_name}</Text>
                 {/* <Text   numberOfLines={2}
              style={[styles.itemText,{marginTop:0,marginBottom:0,color:'gray',fontFamily:'#newFont'}]}>{item.products_description}</Text> */}
                
               
                 </View>
                
                 {/* <Text   numberOfLines={1}
                  
              style={[styles.itemText,{marginTop:0,marginBottom:0,color:'#383838',}]}>{item.new_price} JOD</Text>
                 */}
                 <View style={{justifyContent:'space-between',width:'85%',flexDirection:'row',alignItems:'center'}}>
                
                
                 {item.new_price !=null &&item.new_price !=''?(
                  <Text   numberOfLines={1}
                  
              style={{  fontSize: 10,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'#383838',textDecorationLine: 'line-through',color:'gray'}}>{item.cost_price} JOD</Text>
                
                 ):
                 <Text   numberOfLines={1}
                  
                 style={{  fontSize: 12,
                  fontWeight: "normal",
                  fontStyle: "normal",
                  letterSpacing: 0,
                  color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'#383838'}}>{item.cost_price} JOD </Text>

                  
                 }  

{item.new_price !=null &&item.new_price !=''?(
                   
                   <Text   numberOfLines={2}
              style={{  fontSize: 12,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'black'}}> - {item.new_price}JOD</Text>
               
                ):
                null}
                 <TouchableOpacity onPress={()=>{this.likedPress(item.products_id)}}>
                {/* <Image source={this.state.wish.includes(item.products_id) ? require('../assets/images/hart.png') : require('../assets/images/hartempty.png')} style={{width:17,height:23,marginBottom:10,resizeMode:'contain',}}/> */}
                {this.state.wish.includes(item.products_id) ? 
                <Icon name="md-heart" style={{fontSize:25,color:"red",alignSelf:"center"}} />
                :
                <Icon name="md-heart" style={{fontSize:25,color:"#8FCFEB",alignSelf:"center"}} />

                }
             </TouchableOpacity> 
                 </View>
                  </View>
                 
                
                   </View>
                  
                          
                         </View>
                         <View style={{width:'100%'}}>
                             <Body style={{width:'100%'}}>
                             <Button style={{width:'100%'}}
                              onPress={() =>{
                                this.handelAddToOrder(item)

                              //  this.Navigate (item.products_id,item.products_name)
                               }}
                               disabled={ this.state.testArr.includes(item.products_id)||item.in_stock==0? true:false}

                             // disabled={ Order.includes(item.products_id)? true:false}
                             style={{height:30,backgroundColor:this.state.testArr.includes(item.products_id)||item.in_stock==0?'gray':'#8FCFEB',borderBottomEndRadius:7,borderBottomStartRadius:7,justifyContent:'center',alignItems:'center'}} 
                             block 
                            //onPress={()=>{
                             
                           
                            //    props.navigate(props.item.products_id)
                               
                            //  }}
                             >
               <Text style={{fontFamily: "Acens",
                 fontSize: 12,textAlign:'center',
                 fontWeight: "normal",
                 fontStyle: "normal",
                 letterSpacing: 0,
                 color: "#ffffff"
               }}>{I18nManager.isRTL?'أضف الى السلة':'Add to Cart'}</Text>      
                   </Button>
                         </Body>
                           </View>
                         {/* <View style={{height:20}}/> */}
                     </Card>

              )}
              ListFooterComponent={this.renderFootertopseller.bind(this)}
              />
        )}
          </View>
        </Content>
      );
    }


    else if (this.state.filter === 'mostliked') {


      
      return (
        <Content>
          <View style={{ flex: 1 }}>
            {this.state.isModalVisible &&
              <AddToCartModal
                _toggleModal={this._toggleModal}
                isModalVisible={this.state.isModalVisible}
                setItem={this.setItem}
                item={this.state.item}
              />
            }
             {this.state.loading_mostliked ? (
          <ActivityIndicator color='#8FCFEB' size="large"  style={{color:'#8FCFEB'}}/>
        ) : (
            <FlatGrid
              itemDimension={130}
              items={this.state.mostlikedArr}
              style={styles.gridView}
              renderItem={({ item, index }) => (
                // <ItemCard
                //   navigate={this.Navigate}
                //   _toggleModal={this._toggleModal}
                //   setItem={this.setItem}
                //   index={index}
                //   item={item}
                //   Order={this.state.testArr}
                //   wish={this.state.wish}

                // />


                <Card cardBorderRadius={5}>     
                <View
                   
                    
                   >
             
             
                   
                   <View>
                  <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                 <TouchableOpacity  style={{ width: '100%', flex: 1,flex:1,height:Dimensions.get('window').height/3.7,
    alignItems: 'stretch'}} onPress={() =>{
                             this.Navigate (item.products_id,item.products_name)
                             }}> 
                  <Image resizeMode={'stretch'}
                              source={{uri: BaseURL +item.products_image}}  style={{  position: 'absolute',
                              top: 0,height:null,
                              flex:1,
                              left: 0,
                              bottom: 0,
                              right: 0,}}/>
                   </TouchableOpacity> 
                   <View style={{justifyContent:'flex-start',width:'85%',flexDirection:'column',alignItems:'flex-start',padding:3}}>
             
              <Text   numberOfLines={1}
              style={{  fontSize: 13,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily:"newFont",marginTop:5,marginBottom:5,color:'#8FCFEB'}}>{item.products_name}</Text>
                 {/* <Text   numberOfLines={2}
              style={[styles.itemText,{marginTop:0,marginBottom:0,color:'gray',fontFamily:'#newFont'}]}>{item.products_description}</Text> */}
                
               
                 </View>
                
                 {/* <Text   numberOfLines={1}
                  
              style={[styles.itemText,{marginTop:0,marginBottom:0,color:'#383838',}]}>{item.new_price} JOD</Text>
                 */}
                 <View style={{justifyContent:'space-between',width:'85%',flexDirection:'row',alignItems:'center'}}>
                
                
                 {item.new_price !=null &&item.new_price !=''?(
                  <Text   numberOfLines={1}
                  
              style={{  fontSize: 10,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'#383838',textDecorationLine: 'line-through',color:'gray'}}>{item.cost_price} JOD</Text>
                
                 ):
                 <Text   numberOfLines={1}
                  
                 style={{  fontSize: 12,
                  fontWeight: "normal",
                  fontStyle: "normal",
                  letterSpacing: 0,
                  color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'#383838'}}>{item.cost_price} JOD </Text>

                  
                 }  

{item.new_price !=null &&item.new_price !=''?(
                   
                   <Text   numberOfLines={2}
              style={{  fontSize: 12,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#8FCFEB",fontFamily: 'numFont',marginTop:0,marginBottom:0,color:'black'}}> - {item.new_price}JOD</Text>
               
                ):
                null}
                 <TouchableOpacity onPress={()=>{this.likedPress(item.products_id)}}>
                {/* <Image source={this.state.wish.includes(item.products_id) ? require('../assets/images/hart.png') : require('../assets/images/hartempty.png')} style={{width:17,height:23,marginBottom:10,resizeMode:'contain',}}/> */}
                {this.state.wish.includes(item.products_id) ? 
                <Icon name="md-heart" style={{fontSize:25,color:"red",alignSelf:"center"}} />
                :
                <Icon name="md-heart" style={{fontSize:25,color:"#8FCFEB",alignSelf:"center"}} />

                }
             </TouchableOpacity> 
                 </View>
                  </View>
                 
                
                   </View>
                  
                          
                         </View>
                         <View style={{width:'100%'}}>
                             <Body style={{width:'100%'}}>
                             <Button style={{width:'100%'}}
                              onPress={() =>{
                                this.handelAddToOrder(item)

                              //  this.Navigate (item.products_id,item.products_name)
                               }}
                               disabled={ this.state.testArr.includes(item.products_id)||item.in_stock==0? true:false}

                             // disabled={ Order.includes(item.products_id)? true:false}
                             style={{height:30,backgroundColor:this.state.testArr.includes(item.products_id)||item.in_stock==0?'gray':'#8FCFEB',borderBottomEndRadius:7,borderBottomStartRadius:7,justifyContent:'center',alignItems:'center'}} 
                             block 
                            //onPress={()=>{
                             
                           
                            //    props.navigate(props.item.products_id)
                               
                            //  }}
                             >
               <Text style={{fontFamily: "Acens",
                 fontSize: 12,textAlign:'center',
                 fontWeight: "normal",
                 fontStyle: "normal",
                 letterSpacing: 0,
                 color: "#ffffff"
               }}>{I18nManager.isRTL?'أضف الى السلة':'Add to Cart'}</Text>      
                   </Button>
                         </Body>
                           </View>
                         {/* <View style={{height:20}}/> */}
                     </Card>


              )}
              ListFooterComponent={this.renderFootermostliked.bind(this)}
              />
        )}
          </View>
        </Content>
      );
    }
    // const mapStateToActions = {
    //   addItemToOrder: addItem
    // }
    // const mapStateToProps= state => ({
    //   dumyItem: state.CategoryItemsReducer.CtegoryItems,
    //   Order: state.AddToOrderReducer.Order
    
    // });
    // export default connect(mapStateToProps,mapStateToActions)(AddToCartModal)
  }

  
  defultSort() {
    this.setSortModalVisible(false)
    this.setState({ filter: 'defult' })
    console.log("defult",this.state. defultArr)
  }
  aToz() {
    this.setSortModalVisible(false)
    this.setState({ filter: 'AtoZ' })
    console.log("atoz",this.state. aToZArr)
  }
  zToa() {
    this.setSortModalVisible(false)

    this.setState({ filter: 'ZtoA' })
  }
  highToLow() {
    this.setSortModalVisible(false)

    this.setState({ filter: 'hightolow' })
  }
  
  lowToHight(){
    this.setSortModalVisible(false)

    this.setState({ filter: 'lowtohigh' })

  }
  topseller(){
    this.setSortModalVisible(false)

    this.setState({ filter: 'topseller' })

  }
  mostliked(){
    this.setSortModalVisible(false)

    this.setState({ filter: 'mostliked' })

  }
  popup() { }
  render() {
   console.log("defultArrssssssss",this.state.defultArr)
    i18n.fallbacks = true;
    i18n.translations = { ar, en };
    console.log('test:' + this.state.myLang);

    i18n.locale = this.state.myLang;
    const { Items } = this.props;
    let BaseURL = 'http://delico.qiotic.info';
   

    return (
      <StyleProvider style={getTheme(variables)}>
        <Container>
        <Header style={{height:99,backgroundColor:'#8FCFEB'}}>
        
        <Left style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Button style={{}} transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={{  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],}}
               name={
        Platform.OS === 'ios'
          ? `ios-arrow-back`
          : 'arrow-back'
      }  />
            </Button>
            <View style={{width:15}}/>
            <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('SearchScreen')}}>
                  <Icon name="search" style={{ color:'white',}}/>
                  </TouchableOpacity> 
        </Left>
        <Body style={styles.header}>
              <Title style={{fontSize:25,width:Dimensions.get('window').width/1.5,fontFamily:'Acens',marginLeft:0,color:"#fff"}}>SMORTEC</Title>
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
          
</TouchableOpacity>
              
</Body>
            </Right>
        </Header> 

          <ScrollView>
         

          <View style={{
            backgroundColor: 'white',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
           
          }}>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '50%', alignItems: 'center' }}>
            
               
              
                <Text style={{
                  fontFamily: "newFont",
                  fontSize: 15,
                  fontWeight: "normal",
                  fontStyle: "normal",
                  lineHeight: 17,
                  letterSpacing: 0,
                  color: "#909090",marginStart: 15, marginEnd: 13
                }}>{this.props.navigation.state.params.name}
                <Text style={{
                  fontFamily: "numFont",
                  fontSize: 15,
                  fontWeight: "normal",
                  fontStyle: "normal",
                  lineHeight: 17,
                  letterSpacing: 0,
                  color: "#8FCFEB",marginStart: 15, marginEnd: 13
                }}> ({this.props.navigation.state.params.total_products}) </Text>
                </Text>
            </View>
</View>


          <View style={{
            backgroundColor: '#E8E8E8',
            height: 47,marginBottom:-15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: -6
          }}>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '50%', alignItems: 'center' }}>
              <TouchableOpacity
              style={{flexDirection: 'row', justifyContent: 'flex-start', width: '50%', alignItems: 'center'}}
              onPress={() => {
                this.setSortModalVisible(!this.state.setSortModalVisible);
            }}
               
              >
                <Image
                  source={require('../assets/images/bluefilter.png')}
                  style={{ width: 20, height: 20, marginStart: 15, marginEnd: 13 }}
                />
             
              
                <Text style={{
                  fontFamily: "newFont",
                  fontSize: 15,
                  fontWeight: "normal",
                  fontStyle: "normal",
                  lineHeight: 17,
                  letterSpacing: 0,
                  color: "#787878"
                }}>{i18n.t('filter')}</Text>
              </TouchableOpacity>
            </View>


         

          </View>
          {this.returnArray()}
          </ScrollView>
        

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.isModalSortVisible}
                        onRequestClose={() => {
                            this.setSortModalVisible(false);
                        }}>
                        <View style={{ marginTop: 50, marginEnd: 20, marginStart: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Card style={{ borderRadius: 0 }}>
                               

                                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
                                    <View style={{width:Dimensions.get('window').width/1.3,backgroundColor:'#8FCFEB',height:50,alignItems:'center',justifyContent:'center'}}>
                                    <View style={{flexDirection:'row',width:'100%',}}>
                                    <View  style={{width:10, justifyContent:'flex-end'}}  />
                                  <TouchableOpacity 
                                 onPress={()=>{this.setSortModalVisible(false)}}
>  
 <Icon style={{color:'white',}} name={
        Platform.OS === 'ios'
          ? `md-close`
          : 'md-close'
      }/>
                                    </TouchableOpacity>
                                        <Text style={{ fontSize: 20, color: 'white', fontFamily: 'Acens',width:Dimensions.get('window').width/1.67,textAlign:'center' }}>Filter Products</Text>
                                        <TouchableOpacity 
     onPress={ () => { this.defultSort() } }>  
 <Image style={{width:22,height:22,marginLeft:0}} 
 source={require('../assets/images/clearefilter.png')}
 />
                                    </TouchableOpacity>
                                   
                                       </View>
                                       </View>
                                       <View style={{height:Dimensions.get('window').height/2,justifyContent:'center',alignItems:'center'}}>
                                     
                <TouchableOpacity
                onPress={ () => { this.aToz() } }
                style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>
               
                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
                  {i18n.t('atoz')}
                </Text>
                </TouchableOpacity>
                <View style={{width:'100%',height:4,backgroundColor:'black'}}/>
                <TouchableOpacity
                 onPress={ () => { this.zToa() } }
                style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
                  {i18n.t('ztoa')}
                </Text>
                </TouchableOpacity>
                <View style={{width:'100%',height:1,backgroundColor:'black'}}/>
                <TouchableOpacity  onPress={ () => { this.highToLow() } } style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
              {i18n.t('hightolow')}
                </Text>
                </TouchableOpacity>

                <View style={{width:'100%',height:1,backgroundColor:'black'}}/>
                <TouchableOpacity  onPress={ () => { this.lowToHight() } } style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
                {i18n.t('lowtohigh')}
                </Text>
                </TouchableOpacity>

                <View style={{width:'100%',height:1,backgroundColor:'black'}}/>
                <TouchableOpacity  onPress={ () => { this.topseller() } } style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
               {i18n.t('topseller')}
                </Text>
                </TouchableOpacity>
                <View style={{width:'100%',height:1,backgroundColor:'black'}}/>
                <TouchableOpacity  onPress={ () => { this.mostliked() } } style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
               {i18n.t('mostLiked')}
                </Text>
                </TouchableOpacity>
<View style={{width:Dimensions.get('window').width/1.37,alignItems:'flex-end',justifyContent:'flex-end',paddingTop:30}}>

</View>
</View>
                                    </View>
                            </Card>
                        </View>

                    </Modal>

<View style={{
    justifyContent: 'center',
    alignItems: 'center',}}>
 
 <View >
        <View style={{  width: Dimensions.get('window').width,justifyContent:'space-between',alignItems:'center',paddingEnd:15,paddingStart:15,
    height: 60,flexDirection:'row',
    backgroundColor: 'white',borderTopColor:'gray',borderTopWidth:0.3,
    
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
    )
  }
}

const mapStateToActions = {
  getCategoryItem: requestCategoryItem,
  addItemToOrder: addItem
}

const mapStateToProps = state => ({
  Items: state.CategoryItemsReducer.CtegoryItems,
  Order: state.AddToOrderReducer.Order,
  dumyItem: state.CategoryItemsReducer.CtegoryItems,
  Order: state.AddToOrderReducer.Order

});

export default connect(mapStateToProps, mapStateToActions)(ItemListScreen)

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
    zIndex: 1,
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