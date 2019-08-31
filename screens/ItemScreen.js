import { SearchBar } from 'react-native-elements';
import {addItem} from '../actions/AddToOrder'

import React, { Component } from 'react';
import client from '../api/constant';
import { View, Text, Dimensions, ImageBackground, Image, TouchableOpacity, TextInput, Platform, Modal,AsyncStorage,ScrollView,I18nManager,FlatList,BackHandler } from 'react-native';
import styles from '../css/styles';
import { Font, AppLoading } from 'expo';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from '../css/styles';
import SliderEntry from '../UI_Commponents/carousel/SliderEntry';
import { ENTRIES1, ENTRIES2 } from '../UI_Commponents/carousel/static/entries';
import AddToCartModal from '../UI_Commponents/AddToCartModal';
import { ActivityIndicator,Share } from 'react-native'
import {addToWishList} from '../actions/WishListActions'
import {connect} from "react-redux";
import { Avatar, Badge, withBadge } from 'react-native-elements'
import { Tag } from '../UI_Commponents/Tag';
import DatePicker from "react-native-datepicker";

import {  Icon, Content,Header,
  Title,
  Button,
 
  Left,
  Body,
  Right,
  Container,StyleProvider,Picker,Card, } from "native-base";
  import getTheme from '../native-base-theme/components';
  import variables from '../native-base-theme/variables/variables';
  import { Localization } from 'expo-localization';
  import Expo from 'expo';
  import { showMessage, hideMessage } from "react-native-flash-message";

  import MyAddressStyle from '../css/MyAddressStyle';

  
  import i18n from 'i18n-js';
  
  let testF=0.0;
  let testE=0.0;
  let testS=0.0;


  let finaltestF=0.0;
  let finaltestE=0.0;
  let finaltestS=0.0;
  const en = {
    select:'- Select -',
    
      home: 'Home',
      wishlist: 'Favorite',
      settings:'Settings',
      orders:'Orders',
            retailLocator:'Retail Locator',
      description:'Description',
     addToCart:'ADD TO CART',
     callNow:'CALL NOW',
     buyNow:'BUY NOW',
     addedSuccessfully:'Added Successfully',
     qty:'QTY :',
     bonus:'Bonus : ',
     profitMargin:'Profit Value : ',
     cost:'Cost : ',
     public:'Public : ',
     profitMarginRatio:'Profit Margin Ratio : ',
     jod:' JOD ',
     typeOfOrder:'Type Of Order',
     cancel:'Cancel',
     latterBooking:'Later Booking',
     urgent:'Urgent',
     deffult:'Default',
     check_out:'Check Out',
     cod:'COD',
     name:'Name',
     email:'Email',
     pharmacyName:'Pharmacy Name',
     country:'Country',
     jordan:'Jordan',
     makePurchase:'MAKE PURCHASE',
     paymentAmount:'PAYMENT AMOUNT',
     checkOut:'CHECK OUT',
     inCart:'Added To Cart',
     enterYourBonus:'Enter Your Bonus',
     customizeYourBonus:'Customize Your Bonus',
     per:' per ',
     to:' to ',

     done:'Done',
     Unit : 'Unit : ', 
     type : 'Type : ', 
     tax : 'Tax : ',  
     Referencenumber:' Reference Number : ',
     DrugStore:'Drug Store : ',
     SubAgent:'Sub Agent : ',
     bonusavailable:' Bonus ',
     categotyname:'Category Name : ',
     instock:"In Stock : ",
     available:"Available",
     notavailable:"Not Available",
     availablebonuses:"Available Bonuses",


     
 

      
      
     
  };
  const ar = {
    availablebonuses:"البوانص المتاحة",

    select:'- اختر -',

    checkOut:'الدفع',
    bonusavailable:'البونص',

    home: 'الرئيسية',
    wishlist: 'المفضلة',
    settings:'الاعدادات',
    orders:'الطلبات',
        retailLocator:'موقع المزود',
    description:'الوصف',
    addToCart:'أضف إلى السلة',
    callNow:'اتصل الآن',
    buyNow:'شراء الآن',
    addedSuccessfully:'تمت اضافة العنصر بنجاح',
    qty:'الكمية : ',
    bonus:' بونص : ',
    profitMargin:'هامش الربح : ',
    cost:'التكلفة : ',
    public:'سعر البيع : ',
    profitMarginRatio:'نسبة هامش الربح : ',
    jod:' دينار ',
    typeOfOrder:'نوع الطلب',
    cancel:'الغاء',
    latterBooking:'حجز لاحق',
    urgent:'مستعجل',
    deffult:'افتراضي',
    check_out:'الدفع',
    cod:'الدفع عند التسليم',
    name:'الاسم',
    email:'الايميل',
    pharmacyName:'اسم الصيدلية',
    country:'البلد',
    jordan:'الاردن',
    makePurchase:'شراء',
    paymentAmount:'كمية الدفع',
    inCart:'تمت الاضافة',
    enterYourBonus:' البونص',
    customizeYourBonus:'ادخال بونص معين',
    per:' لكل ',
    to:' الى ' ,
    done:'تم',

    Unit: 'الوحدة : ', 
    type: 'النوع : ', 
    tax: 'ضريبة المبيعات : ',  
    Referencenumber:' الرقم المرجعي :  ',
    DrugStore:' مستودع الادوية :  ',
     SubAgent:' الوكيل :  ',
     categotyname:'اسم القسم :',
     instock:"المخزن : ",
     available:"متوفر",
     notavailable:"غير متوفر"






  
  };

  let BaseURL = 'https://smortec.com';


const { textInputStyle, checkOutText, mainContainerCheckOut, firstViewInCheckOut, pickerContinerInCheckOut, iosPickerIconStyle, pickerStyle, makePurchaseContainer, makePurchaseTouchable, makePurchaseText, itemTextStyleICheckoutPicker, textStyleInCheckoutPicker } = styles
const { width } = Dimensions.get('window');
const height = width * 0.8



const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 260;
var options =["Home","Savings","Car","GirlFriend"];

var grmsArr=['50 gm','100 gm','150 gm','200 gm','250 gm','300 gm','350 gm','400 gm','450 gm','500 gm','550 gm','600 gm','650 gm','700 gm','750 gm','800 gm','850 gm','900gm ','950 gm','1000 gm'];
var dat=new Date();
var date= new Date();
var typingBon=0;
let lang;
 class ItemScreen extends Component {



  constructor(props) {
    super(props);
    this.state = {
            selectedGramsCustom:1,

      fetching_from_server:false,
      status:200,
      wishListArr:[],
      finaltestF:0.0,
      finaltestE:0.0,
      finaltestS:0.0,
      profitMarginState:0,
      profitMarginRatioState:0,
      imagesArr:[],

      custmizeBonusNum:0,
      isBounasModalVisible:false,
      btnDisabled:false,
      btnColor:'#8FCFEB',
      txtColr:'gray',
      checkDisplay:'none',

      bounsNum:0,
      bounsArr:[],
      chosenDate: date,
      type:1,
      firstNmae:'',
      lastName:'',
      userEmail:'',
      pharmcyNmae:'',
      addressNameBorder:'#E8E8E8',
      streetBorder:'#E8E8E8',
      name:'',
      email:'',
      phone:'',
      deffultSeclcted:true,
      urgentSelected:false,
      latterBookingSelected:false,

      defaultBackgroundColor:'#8FCFEB',
      defultTextColor:'gray',
      defultTextWeight:"bold",

      urgentBackgroundColor:'white',
      urgentTextColor:'#A9A9A9',
      urgentTextWeight:'normal',

      latterBookingBackgroundColor:'white',
      latterBookingTextColor:'#A9A9A9',
      latteerBookingTextWeight:'normal',

      popUpModal: false,
      popUpModalCalender: false,


      Price:0,
      totalAfterTax:0.0,
      count:1,
      value: 1,
      isRedeem:true,
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      singleItem: null,
      isModalVisible: false,
      modalVisible: false,
      testArr:[],
      firstBg: '#E0E0E0',
      thirdBg:'#E0E0E0',
      secondBg: '#E0E0E0',
      thirdFront:'#8FCFEB',
      secondFront: '#8FCFEB',
      firstFront: '#8FCFEB',
      wish:[],
      activeSlide:0,
      finalGrmSelected:1,
            finalPrice:parseFloat(0),

      finalTagsArr:[],
      phonCall:'07999999',
      tagsArr:[],
      shapesArr:[],
      finalShapesArr:[],

      selected:0,
      selectedGrams:1,

      search: '',
      likeImg: require( '../assets/images/emptyblueheart.png'),
      userID:'1',
      myLang: AsyncStorage.getItem("myLang").then((value) => {
        this.setState({ "myLang": value })
    }).done()
    ,

    }
    this._toggleModal = this._toggleModal.bind(this)
    this.Navigate = this.Navigate.bind(this)

  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  async componentWillMount(){
   
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

  }

  handleBackButton = () => {
    if(this.state.wishListArr.length==0){
      this.setState({  status:204  })
    }else{
      this.setState({  status:200  })

    }
   console.log('likkkkkkkkke')
    console.log('wishlistarrrr:',this.state.wishListArr)

const { navigation } = this.props;
client.post(`/app/getallproducts?type=wishlist&customers_id=${this.state.userID}&language_id=${lang}`).then((res) => {
         
         
  for (let i=0;i<res.data.product_data.length;i++){
  this.setState({
    wish: [...this.state.wish, (res.data.product_data[i]).products_id],
wishListArr: res.data.product_data,

  })
}
console.log('wishlistarrrr:',this.state.wishListArr)

})
  client.post(`/app/getallproducts?type=wishlist&customers_id=${this.state.userID}&language_id=${lang}`).then((res) => {
    for (let i=0;i<res.data.product_data.length;i++){
    this.setState({
      wish: [...this.state.wish, (res.data.product_data[i]).products_id]
    })
  }


  
  // navigation.goBack();
  navigation.state.params.onSelect({ wish: this.state.wish });
  navigation.state.params.onSelectWishArr({ wishListArr: this.state.wishListArr,status:this.state.status });


})

  
   
  };
  
  Navigate(id) {

   
    this.props.navigation.navigate('TagsListing',{id})
  }
  onValueChange(value) {
    this.setState({
        selected: value

    });
    
    
  
}
goBack() {




  
const { navigation } = this.props;
this.setState({wishListArr:[]})
    console.log('wishlistarrrr:',this.state.wishListArr)
client.post(`/app/getallproducts?type=wishlist&customers_id=${this.state.userID}&language_id=${lang}`).then((res) => {
         
         
  for (let i=0;i<res.data.product_data.length;i++){
  this.setState({
    wish: [...this.state.wish, (res.data.product_data[i]).products_id],
wishListArr: res.data.product_data,
  })
}
})
  client.post(`/app/getallproducts?type=wishlist&customers_id=${this.state.userID}&language_id=${lang}`).then((res) => {
    for (let i=0;i<res.data.product_data.length;i++){
    this.setState({
      wish: [...this.state.wish, (res.data.product_data[i]).products_id]
    })
  }

  if(this.state.wishListArr.length==0){
    this.setState({  status:204  })
  }else{
    this.setState({  status:200  })

  }
  
  navigation.goBack();
  navigation.state.params.onSelect({ wish: this.state.wish });
  navigation.state.params.onSelectWishArr({ wishListArr: this.state.wishListArr,status:this.state.status });


})

  
   
}

onValueChangeGramsCustom(value) {
  console.log('value selecteeeeeed',value)
  this.setState({
      selectedGramsCustom: value,

  });
  if(value=='bounses'){
    console.log('value selecteeeeeed',value)

    this.setBounsModalVisibleRef(true)
  }
  
  this.setState({finalPrice:(parseFloat(value+1)*this.state.singleItem.products_price),price:(parseFloat(this.state.singleItem.products_price))})
  
}



onValueChangeGrams(value) {
  console.log('value selecteeeeeed',value)
  this.setState({
      selectedGrams: value,

  });
  if(value=='bounses'){
    console.log('value selecteeeeeed',value)

    this.setBounsModalVisibleRef(true)
  }
  
  this.setState({finalPrice:(parseFloat(value+1)*this.state.singleItem.products_price),price:(parseFloat(this.state.singleItem.products_price))})
  
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
  handelLikeButton() {




    
    client.post(`/app/getallproducts?type=wishlist&customers_id=${this.state.userID}&language_id=${lang}`).then((res) => {
      if(res.data.status==200){
        this.setState({status:200})
      }else{
        this.setState({status:204})        }
         
      for (let i=0;i<res.data.product_data.length;i++){
      this.setState({
        wish: [...this.state.wish, (res.data.product_data[i]).products_id],
wishListArr: res.data.product_data,
      })
    }
    })

    let itemId = this.props.navigation.state.params.itemId

if(this.state.likeImg === require( '../assets/images/emptyblueheart.png')){
this.setState({
  likeImg: require( '../assets/images/newredheart.png') ,
});

client.post(`/app/likeproduct?liked_products_id=${itemId}&liked_customers_id=${this.state.userID}`).then((res) => {
  console.log('wishlist',res)
  console.log('wishlist user id',this.state.userID)
    console.log('wishlist item id',itemId)

  
})

}
else{
  this.setState({wish:[]})
  client.post(`/app/getallproducts?type=wishlist&customers_id=${this.state.userID}&language_id=${lang}`).then((res) => {
    for (let i=0;i<res.data.product_data.length;i++){
    this.setState({
      wish: [...this.state.wish, (res.data.product_data[i]).products_id]
    })
  }
  
  
 
    console.log('wishlist array',this.state.wish)

   
    
  })

  this.setState({
    likeImg: require( '../assets/images/emptyblueheart.png') ,

  });
client.post(`/app/unlikeproduct?liked_products_id=${itemId}&liked_customers_id=${this.state.userID}`).then((res) => {
  console.log('wishlist',res)

})

}
    
}
  addToWishList(){
    console.log('rah prooops',this.state.singleItem)
    let item={
          name : this.state.singleItem.products_name,
          
    }

    this.props.addItemToWishlist(this.state.singleItem)
  }
  updateSearch = search => {
    this.setState({ search });
  };
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userID');
      const phonevalue = await AsyncStorage.getItem("userPhone");
      const lastName = await AsyncStorage.getItem('lastName');

      const namevalue =  await AsyncStorage.getItem("firstName"); 
      const userEmail = await AsyncStorage.getItem("userEmail");
     const pharmcyNmae = await AsyncStorage.getItem("pharmcyNmae");
     const myLang = await AsyncStorage.getItem('myLang');
     if (value !== null) {
       // We have data!!
       if(myLang=='ar')
       {
         lang=4;
       }else{
         lang=1;
       }        // We have data!!
        this.setState({userID:value,phone:phonevalue,
          firstNmae:namevalue,
        
          userEmail:userEmail,
          lastName:lastName,
          pharmcyNmae:pharmcyNmae})
        console.log('user item in itemscreen',value);
        client.post(`/app/getallproducts?type=wishlist&customers_id=${value}&language_id=${lang}`).then((res) => {
         
         
          for (let i=0;i<res.data.product_data.length;i++){
          this.setState({
            wish: [...this.state.wish, (res.data.product_data[i]).products_id]
          })
        }
        if(this.state.wish.includes(this.state.singleItem.products_id)){
           this.setState({
          likeImg: require( '../assets/images/newredheart.png') ,
        });
        }
        else{
          this.setStatethis.setState({
            likeImg: require( '../assets/images/emptyblueheart.png') ,
          });
        }
        if(this.state.testArr.includes(this.state.singleItem.products_id)){
          this.setState({btnColor:'gray',txtColr:'#8FCFEB',btnDisabled:true,checkDisplay:'flex'})

    }
          console.log('wishlist array',this.state.wish)

         
        
        })
      }


      let itemId = this.props.navigation.state.params.itemId
      client.post(`/app/getallproducts?products_id=${itemId}&language_id=${lang}`).then((res) => {
       let ppp;
        if(res.data.product_data[0].new_price !=null && res.data.product_data[0].new_price !=''){
          ppp= parseFloat(res.data.product_data[0].new_price)
          console.log('new price',ppp)
        }else{
          ppp=parseFloat(res.data.product_data[0].cost_price)
          console.log('coost price',ppp)
        }
    
        if(res.data.product_data[0].tax_description=='4%'){
          testF= 0.04*parseFloat(ppp*this.state.count);
          finaltestF=0.04*parseFloat(this.state.count)+ppp;
          this.setState({finaltestF:finaltestF})
          console.log('price 4 tax' ,finaltestF)
        }
  else  if(res.data.product_data[0].tax_description=='8%'){
    testE= 0.08*parseFloat(ppp*this.state.count);
    finaltestE=0.08*parseFloat(this.state.count)+ppp;
    this.setState({finaltestE:finaltestE})
    console.log('price 8 tax' ,finaltestE)
    
  }else  if(res.data.product_data[0].tax_description=='16%'){
    testS= 0.16*parseFloat(ppp*this.state.count);
    finaltestS=0.16*parseFloat(this.state.count)+ppp;
    this.setState({finaltestS:finaltestS})
    console.log('price 16 tax' ,finaltestS)
    
  }
  
  this.setState({totalAfterTax:this.state. finaltestF+this.state.fianltestE+this.state.finaltestS})
        console.log('reesssall imageeeees',res.data.product_data)
  
        this.setState({ imagesArr: []})

        this.setState({ imagesArr: [...this.state.imagesArr, res.data.product_data[0].products_image]})
        if(res.data.product_data[0].images.length>0){
                for (let i = 0; i < res.data.product_data[0].images[0].length; i++) {
                  this.setState({ imagesArr: [...this.state.imagesArr, res.data.product_data[0].images[0][i].image]})
                  console.log('image neww ',res.data.product_data[0].images[0][i].image)
        
                 }
                 console.log('single item data all imageeeees',this.state.imagesArr)
        
              }    
           

              
  
  
        if(this.state.selectedGrams==1){
          console.log('selected gram',this.state.selectedGrams)
          console.log('singleiteeeem gram',res.data.product_data[0].products_price)
  
          this.setState({finalPrice:parseFloat(2*res.data.product_data[0].products_price)})
    
        }
        for (let i=0;i<this.props.Order.length;i++){
          console.log('order of idssssssss',this.props.Order[i].products_id)
  if(this.props.Order[i].products_id==res.data.product_data[0].products_id){
  
  
  
  
    if(this.props.Order[i].redeem){
      this.setState({isRedeem:true})
    
    
    }
    else   {
      this.setState({isRedeem:false})
    }} 
  console.log('yyyyyes')
  
          
          this.setState({
            testArr: [...this.state.testArr, (this.props.Order[i]).products_id]
          })
          
        }
  
        
        this.setState({
          singleItem: res.data.product_data[0],
          profitMarginState:parseFloat(res.data.product_data[0].profit_margin).toFixed(3),
          profitMarginRatioState:parseFloat(res.data.product_data[0].profit_margin_percent).toFixed(3),
          bounsArr:res.data.product_data[0].bounces
        })
     
      })
  
      
  
      let interest =[];
      //client.post(`/tags?product_id=${itemId}`).then((res) => {
    //     console.log('taaags', res.data.data)
        
    //       console.log("final taaags array2222",this.state.tagsArr)
  
    //     for (let i=0;i<res.data.data.length;i++){
    //       console.log("final retail array",res.data.data[i])
         
    //       this.setState({
    //         tagsArr: [...this.state.tagsArr, res.data.data[i]]
    //       })
    //       console.log("final retail array with setstate",this.state.tagsArr)
  
    //     }
    //     console.log("final retail array with setstate22",this.state.tagsArr)
    //     for (let i=0;i<this.state.tagsArr.length;i++){
    //       console.log("final final array",this.state.tagsArr)
          
    //       this.setState({
    //         finalTagsArr: [...this.state.finalTagsArr, this.state.tagsArr[i][0]]
    //       })
    //       console.log("final finallllll retail array with setstate",this.state.finalTagsArr)
  
    //     }
      
  
    //   })
    //   client.post(`/shapes?product_id=${itemId}`
      
    //   ).then((res) => {
    //     console.log('shappes',res.data.data)
    //   if(res.data.data.length>0){
    //   for (let i=0;i<res.data.data.length;i++){
    //     console.log("final shapes array",res.data.data[i])
       
    //     this.setState({
    //       shapesArr: [...this.state.shapesArr, res.data.data[i]]
    //     })
    //     console.log("final shapes with setstate",this.state.shapesArr)
  
    //   }
    //   console.log("final shapes array with setstate22",this.state.shapesArr)
    //   for (let i=0;i<this.state.shapesArr.length;i++){
    //     console.log("final final array",this.state.shapesArr)
        
    //     this.setState({
    //       finalShapesArr: [...this.state.finalShapesArr, this.state.shapesArr[i][0]]
    //     })
    //     console.log("final finallllll shapes array with setstate",this.state.finalShapesArr)
  
    //   }
    // }else{
    //   console.log('no shapes',this.state.shapesArr)
    //   this.setState({finalShapesArr:null})
    // }
    //   })
    } catch (error) {
      // Error retrieving data
      console.log('getstorageitemerrrror',error);
    }
    
  };

onOrderNOwPressed(){
  let test=0;
  for(let i=0;i<=this.state.bounsArr.length;i++){
   
    if(this.state.bounsArr[i]!=undefined){
    if(this.state.count>=this.state.bounsArr[i].qty_from){
      test=this.state.bounsArr[i].bounces;
      this.setState({bounsNum:this.state.bounsArr[i].bounces})
      console.log('bouuuuns number is:',this.state.bounsNum)
    }
  }
}
if(this.state.custmizeBonusNum>0){
  test=this.state.custmizeBonusNum
}

let finalPri;
let finaltaxF=0.0;
let finaltaxE=0.0;
let finaltaxS=0.0;
  if(this.state.singleItem.new_price !=null && this.state.singleItem.new_price !=''){
    finalPri= parseFloat(this.state.singleItem.new_price)
    console.log('new price',finalPri)
  }else{
    finalPri=parseFloat(this.state.singleItem.cost_price)
    console.log('coost price',finalPri)
  }

  if(this.state.singleItem.tax_description=='4%'){
    finaltaxF= 0.04*parseFloat(this.state.count);
    console.log('price 4 tax' ,finaltaxS)
  }
else  if(this.state.singleItem.tax_description=='8%'){
  finaltaxE= 0.08*parseFloat(this.state.count);
  console.log('price 8 tax' ,finaltaxS)

}else  if(this.state.singleItem.tax_description=='16%'){
  finaltaxS= 0.16*parseFloat(this.state.count);
  console.log('price 16 tax' ,finaltaxS)

}
  console.log('in onOrderNOwPressed')
  this.setState({popUpModal:false})
  let itemId = this.props.navigation.state.params.itemId
  client.post(`/app/addtoorder?customers_id=${this.state.userID}&language_1d=${lang}&customers_telephone=${this.state.phone}&products[]&products[0][products_id]=${itemId}&products[0][customers_basket_quantity]=${this.state.count}&products[0][bounces]=${test}&type=${this.state.type}&shipping_date=${this.state.chosenDate}&total=${finalPri*this.state.count}&tax=${((parseFloat(finaltaxF)+parseFloat(finaltaxE)+parseFloat(finaltaxS)).toFixed(3))}`).then((res) => {
console.log(res)   
if(res.data.status==200){
  this.setState({fetching_from_server:true})

if(res.data.message=='Order has been placed successfully.') {
  
  this.props.navigation.navigate("OrderAddedSuccesfully");

  showMessage({
    message: res.data.message,
    type: "success",
  });
  this.setState({fetching_from_server:false})

  
}}else{
  showMessage({
    message: res.data.message,
    type: "danger",
  });
}
  })

  
}
  componentDidMount() {
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
       
    dat= dat.setDate(dat.getDate() + 30);
    dat=new Date(dat);
    date=date.setDate(date.getDate() + 2);
    date=new Date(date);

    this._retrieveData()
   
   
    

   
  }


//Add to cart

onPlusPressed(qty){
  testF=0.0;
  testE=0.0;
  testS=0.0;
  this.setState({bounsNum:0})
  let price= parseFloat(this.state.price).toFixed(3);
  price = parseFloat(price);
  qty=parseInt(qty+1)
  this.setState({
    Price :  (price *(qty)).toFixed(3),
    count: parseInt(qty)
  })
  let ppp;
  if(this.state.singleItem.new_price !=null && this.state.singleItem.new_price !=''){
    ppp= parseFloat(this.state.singleItem.new_price)
    
    console.log('new price',ppp)
  }else{
    ppp=parseFloat(this.state.singleItem.cost_price)
    console.log('coost price',ppp)
  }

  if(this.state.singleItem.tax_description=='4%'){
    testF= 0.04*parseFloat(ppp*qty);
    finaltestF=0.04*parseFloat(qty)+ppp*qty;
    this.setState({finaltestF:finaltestF})
    console.log('price 4 tax' ,finaltestF)
  }
else  if(this.state.singleItem.tax_description=='8%'){
  testE+= 0.08*parseFloat(ppp*qty);
  finaltestE=0.08*parseFloat(qty)+ppp*qty;
this.setState({finaltestE:finaltestE})
console.log('price 8 tax' ,finaltestE)

}else  if(this.state.singleItem.tax_description=='16%'){
  testS= 0.16*parseFloat(ppp*qty);
  finaltestS=0.16*parseFloat(qty)+ppp*qty;
this.setState({finaltestS:finaltestS})
console.log('price 16 tax' ,finaltestS)

}
  // for(let i=0;i<=this.state.bounsArr.length;i++){
   
  //   if(this.state.bounsArr[i]!=undefined){
  //   if(qty>=this.state.bounsArr[i].qty-1){
  //     this.setState({bounsNum:this.state.bounsArr[i].bounces})
  //     console.log('bouuuuns number is:',this.state.bounsNum)
  //   }
  // }

//}

let test=0;
  for(let i=0;i<=this.state.bounsArr.length;i++){
   
    if(this.state.bounsArr[i]!=undefined){
    if(this.state.count>=this.state.bounsArr[i].qty_from){
      if(this.state.bounsArr[i].type=='percent'){
        test=this.state.bounsArr[i].bounces;
test=(this.state.bounsArr[i].bounces)/100*this.state.count
      }else{
              test=this.state.bounsArr[i].bounces;

      }
      this.setState({bounsNum:this.state.bounsArr[i].bounces})
      console.log('bouuuuns number is:',this.state.bounsNum)
    }
  }
}
if(this.state.custmizeBonusNum>0){
  test=this.state.custmizeBonusNum
}

// let totalcost=ppp*(qty+test);
// let totalSell=this.state.singleItem.products_price*(qty+test)
// this.setState({profitMarginState:totalSell-totalcost})
// let margin=(qty+test)*(ppp)
// this.setState({profitMarginRatioState:((totalSell-totalcost)/margin).toFixed(2)})

// data.profit_margin_ratio=(data.profit_margin/margin).toFixed(2)
this.setState({totalAfterTax:this.state. finaltestF+this.state.fianltestE+this.state.finaltestS})

}
onMainusPressed(qty){
  testF=0.0;
  testE=0.0;
  testS=0.0;
   let price= parseFloat(this.state.price).toFixed(3);

  price = parseFloat(price);
  if(qty>1){
  this.setState({
    Price : (price *(qty-1)).toFixed(3),
    count: qty-1
  })}
  let ppp;
  if(this.state.singleItem.new_price !=null && this.state.singleItem.new_price !=''){
    ppp= parseFloat(this.state.singleItem.new_price)
    console.log('new price',ppp)
  }else{
    ppp=parseFloat(this.state.singleItem.cost_price)
    console.log('coost price',ppp)
  }

  if(this.state.singleItem.tax_description=='4%'){
    testF= 0.04*parseFloat(ppp*(qty-1));
    console.log('price 4 tax' ,finaltestF)
    finaltestF=0.04*parseFloat(this.state.count)+ppp;
    this.setState({finaltestF:finaltestF})
  }
else  if(this.state.singleItem.tax_description=='8%'){
testE= 0.08*parseFloat(ppp*(qty-1));
finaltestE=0.08*parseFloat(this.state.count)+ppp;
this.setState({finaltestE:finaltestE})
console.log('price 8 tax' ,finaltestE)

}else  if(this.state.singleItem.tax_description=='16%'){
testS= 0.16*parseFloat(ppp*(qty-1));
finaltestS=0.16*parseFloat(this.state.count)+ppp;
this.setState({finaltestS:finaltestS})
console.log('price 16 tax' ,finaltestS)

}
  
  this.setState({totalAfterTax:this.state. finaltestF+this.state.fianltestE+this.state.finaltestS})

}
onConfiremPressed(date){
  
  this.setState({ chosenDate: date, })
this.latterBookingPressed();
}


async addToOrder(){
  if(this.state.count!=""&&this.state.count!=null&&this.state.count!='null'&&this.state.count!=undefined){
   
    this.setState({count:this.state.count})

   
    console.log('newwww count ',this.state.count)

  }
  else{
    this.setState({count:1})
    console.log('newwww count in else ',this.state.count)

  }
  this.setState({btnColor:'gray',txtColr:'#8FCFEB',btnDisabled:true,checkDisplay:'flex'})
  
  
  let test=0;
    for(let i=0;i<=this.state.bounsArr.length;i++){
  
      if(this.state.bounsArr[i]!=undefined){ 
        console.log('test array=:',this.state.bounsArr[i])
  
           console.log('test=:',this.state.bounsArr[i].type)
  if(this.state.count==''||this.state.count==""){
      if(1>=this.state.bounsArr[i].qty_from){
        if(this.state.bounsArr[i].type=='percent'){
          console.log('test= in percent:',this.state.bounsArr[i].type)
          console.log('test=:',this.state.bounsArr[i].bounces)
  
          test=this.state.bounsArr[i].bounces;
  test=(this.state.bounsArr[i].bounces)/100
        }else{
                test=this.state.bounsArr[i].bounces;
                console.log('test type=:',this.state.bounsArr[i].type)
  
                console.log('test= in pice:',this.state.bounsArr[i].bounces)
  
        }
        this.setState({bounsNum:this.state.bounsArr[i].bounces})
        console.log('bouuuuns number is:',this.state.bounsNum)
      }
    }else{
      if(this.state.count>=this.state.bounsArr[i].qty_from){
        if(this.state.bounsArr[i].type=='percent'){
          console.log('test= in percent:',this.state.bounsArr[i].type)
          console.log('test=:',this.state.bounsArr[i].bounces)
  
          test=this.state.bounsArr[i].bounces;
  test=(this.state.bounsArr[i].bounces)/100*this.state.count
        }else{
                test=this.state.bounsArr[i].bounces;
                console.log('test type=:',this.state.bounsArr[i].type)
  
                console.log('test= in pice:',this.state.bounsArr[i].bounces)
  
        }
        this.setState({bounsNum:this.state.bounsArr[i].bounces})
        console.log('bouuuuns number is:',this.state.bounsNum)
      }
    }
    }
  }
  if(this.state.custmizeBonusNum>0){
    test=this.state.custmizeBonusNum
  }
    
    let{ isModalVisible} = this.props;
    let BaseURL = 'https://smortec.com';
    let testTaxF=0;
    let testTaxS=0;
    let testTaxE=0;
    let ppp=0;
    if(this.state.singleItem.tax_description=='4%'){
  
    
     testTaxF= 0.04*parseFloat(this.state.singleItem.products_price);
  }else  if(this.state.singleItem.tax_description=='8%'){
  
    
     testTaxE= 0.08*parseFloat(this.state.singleItem.products_price);
  } else  if(this.state.singleItem.tax_description=='16%'){
  
    
     testTaxS= 0.16*parseFloat(this.state.singleItem.products_price);
  }
      if(this.state.singleItem.new_price !=null && this.state.singleItem.new_price !=''){
        ppp= parseFloat(this.state.singleItem.new_price)
        
      }else{
        ppp=parseFloat(this.state.singleItem.cost_price)
      }
  
      
     
  
      console.log('teeest is:',test);
      console.log('bounsnum is:',this.state.bounsNum)
      console.log('bounsnum in staaate is:',this.state.custmizeBonusNum)
  let profitmarginratio=0;
  let profitmargion=0;
  if(this.state.count==''||this.state.count==""){

      let totalSell=this.state.singleItem.products_price*(1+parseInt(test))
      profitmargion= totalSell-(ppp*1)
      let margin=ppp*(1+parseInt(test)) 
           profitmarginratio=(parseFloat(profitmargion / margin)*100).toFixed(3)

  }else{
    let totalSell=this.state.singleItem.products_price*(this.state.count+parseInt(test))
    profitmargion= totalSell-(ppp*this.state.count)
    let margin=ppp*(this.state.count+parseInt(test)) 
         profitmarginratio=(parseFloat(profitmargion / margin)*100).toFixed(3)

  }
  let test1=1
  if(this.state.count!=""&&this.state.count!=''){
    test1=this.state.count
  }
  else{
    test1=1
  }
      console.log('this.state.singleItem.publicPrice is:',this.state.singleItem.products_price);
      console.log('this.state.counte is:',this.state.count);
      console.log('ttest is:',parseInt(test));
      console.log('ppp is:',ppp*this.state.count);
  console.log("f",ppp*test1)
      console.log('profitmargion is:',profitmargion);
      console.log('profitmargion ratiooo is:',profitmarginratio);
  

    let item={
      drug_store:this.state.singleItem.drug_store,
      products_id:this.state.singleItem.products_id,
      products_name : this.state.singleItem.products_name,
      
      final_price:  ppp,
      price: this.state.singleItem.new_price !=null &&this.state.singleItem.new_price !=''?parseFloat(this.state.singleItem.new_price): parseFloat(this.state.singleItem.cost_price),
      
      customers_basket_quantity: this.state.count!=""&&this.state.count!=''?this.state.count:1,
      image: BaseURL + '/' + this.state.singleItem.products_image,
      bounsArr:this.state.bounsArr,
      test:parseInt(test),
      isCustom:this.state.custmizeBonusNum>0?true:false,
      unit:this.state.singleItem.units,
      tax:this.state.singleItem.tax_description,
      profit_margin: parseFloat(profitmargion),
      profit_margin_ratio:(profitmarginratio),
      testTaxF:testTaxF,
      testTaxE:testTaxE,
      testTaxS:testTaxS,
      f:ppp*test1,
      publicPrice:this.state.singleItem.products_price,
      
      redeem:this.props.redeem,
      bounsNum:this.state.bounsNum,
      testTaxF: this.state.singleItem.tax_description*parseFloat(this.state.singleItem.products_price),
  
    }
    this.props.addItemToOrder(item)
    showMessage({
      message: i18n.t('addedSuccessfully'),
      type: "success",
    });
  
    
  }
  
  


deffultPressed(){
  this.setState({deffultSeclcted:true,
    type:1,
      latterBookingSelected:false,
      urgentSelected:false,
      orderType:'Deffult',

      defaultBackgroundColor:'#8FCFEB',
      defultTextColor:'gray',
      defultTextWeight:"bold",

      urgentBackgroundColor:'white',
      urgentTextColor:'#A9A9A9',
      urgentTextWeight:'normal',

      latterBookingBackgroundColor:'white',
      latterBookingTextColor:'#A9A9A9',
      latteerBookingTextWeight:'normal'
  })

}

urgentPressed(){
  this.setState({deffultSeclcted:false,
    type:2,
      orderType:'Urgent',
  
urgentSelected:true,
latterBookingSelected:false,

urgentBackgroundColor:'#8FCFEB',
urgentTextColor:'gray',
urgentTextWeight:"bold",

latterBookingBackgroundColor:'white',
latterBookingTextColor:'#A9A9A9',
latteerBookingTextWeight:'normal',

defaultBackgroundColor:'white',
defultTextColor:'#A9A9A9',
defultTextWeight:"normal",
})
}
latterBookingPressed(){ 

  this.setState({deffultSeclcted:false,
    type:3,
      orderType:'office',
 
      urgentSelected:false,
latterBookingSelected:true,

latterBookingBackgroundColor:'#8FCFEB',
latterBookingTextColor:'gray',
latteerBookingTextWeight:"bold",

urgentBackgroundColor:'white',
urgentTextColor:'#A9A9A9',
urgentTextWeight:'normal',

defaultBackgroundColor:'white',
defultTextColor:'#A9A9A9',
defultTextWeight:"normal",


})

}
renderPicker() {
  if (this.state.type==3) {
    return (
      <DatePicker
      style={{
        backgroundColor: "#E8E8E8",
        borderRadius: 0,
        borderRadius: 0,
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("window").width / 1.2,
        borderRadius: 20,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        ...Platform.select({
          ios: {
            paddingLeft: 45
          },
          android: {
            paddingLeft: 20
          }
        }),
        height: 35
      }}
      customStyles={{
        dateInput: {
          borderWidth: 0,
          color: "black",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: "normal",
          fontStyle: "normal",
          fontFamily: "helivet",
          color: "#86764f",
          textAlign: "center",
          fontSize: 13
        },
        placeholderText: {
          fontSize: 13,
          fontWeight: "normal",
          fontStyle: "normal",
          fontFamily: "helivet",
          color: "#86764f"
        },
        dateText: {
          fontSize: 13,
          fontWeight: "normal",
          fontStyle: "normal",
          fontFamily: "helivet",
          color: "#86764f",
          justifyContent: "flex-start"
        }
      }}
      iconSource={null}
      date={this.state.chosenDate}
      mode="date"
      minDate={date}
      maxDate={dat}
      duration={0}
      placeholder="YYYY-MM-DD"
      format="YYYY-MM-DD"
      confirmBtnText="Confirme"
      ref={ref => (this.datePicker = ref)}
      cancelBtnText="Cancle"
      onDateChange={date => {
       this.onConfiremPressed(date);
      }}
      />
    );
  }
}
setBounsModalVisibleRef(visible){
  this.setState({ isBounasModalVisible: visible,selectedGrams:0 });
  

}

setBounsModalVisibleRefExit(visible){
  this.setState({ isBounasModalVisible: visible,selectedGrams:0,custmizeBonusNum:0 });
  

}
setBounsModalVisible(visible) {
  this.setState({ isBounasModalVisible: visible });
}
setPopUpModalVisibleCalender(visible) {
  this.setState({ popUpModalCalender: visible });
}

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
    setPopUpModalVisible(visible) {
      this.setState({ popUpModal: visible });
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  
  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  renderPage(image, index) {
    return (
        <View  
        >
        
            <Image style={{ width: Dimensions.get('window').width,height:width ,resizeMode:'stretch' }}
             source= {{ uri:  BaseURL + '/' + image }} 
             >
           

            </Image>
        </View>
    );
}
static navigationOptions = ({ navigation }) => {
  const title = navigation.getParam('title');

    return ({
      header:null
   
    })


  }


get pagination () {
  const { imagesArr, activeSlide } = this.state;
  console.log("activeSlide",activeSlide)
  return (
      <Pagination
      style={{backgroundColor: 'transparent',         
    }}
        dotsLength={imagesArr.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: 'transparent' }}
       
        dotStyle={{
          width: 10,
          // marginTop:-10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: -5,
          backgroundColor: 'gray'
      }}
      inactiveDotStyle={{
          // Define styles for inactive dots here
      }}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
        // inactiveDotStyle={{
        //     // Define styles for inactive dots here
        // }}
        // inactiveDotOpacity={0.4}
        // inactiveDotScale={0.6}
      />
  );
}

  firstBG() {
    this.setState({

        firstBg: '#8FCFEB',
        secondBg: '#E0E0E0',
        thirdBg:'#E0E0E0',
        firstFront: 'white',
        secondFront: '#8FCFEB',
        thirdFront: '#8FCFEB'

    });
}
secondBG() {
    this.setState({
        secondBg: '#8FCFEB',
        firstBg: '#E0E0E0',
        thirdBg: '#E0E0E0',

        secondFront: 'white',
        firstFront: '#8FCFEB',
        thirdFront: '#8FCFEB'

    });
}
updateInput= (text) =>{
  testF=0.0;
  testE=0.0;
  testS=0.0;
  
  if(text.length>0){
    this.setState({count:parseInt(text)})
    let ppp;
    if(this.state.singleItem.new_price !=null && this.state.singleItem.new_price !=''){
      ppp= parseFloat(this.state.singleItem.new_price)
      console.log('new price',ppp)
    }else{
      ppp=parseFloat(this.state.singleItem.cost_price)
      console.log('coost price',ppp)
    }
  
    if(this.state.singleItem.tax_description=='4%'){
      testF= 0.04*parseFloat(ppp*parseInt(text));
      finaltestF=0.04*parseFloat(this.state.count)+ppp;
      this.setState({finaltestF:finaltestF})
      console.log('price 4 tax' ,finaltestF)
    }
  else  if(this.state.singleItem.tax_description=='8%'){
  testE= 0.08*parseFloat(ppp*parseInt(text));
  finaltestE=0.08*parseFloat(this.state.count)+ppp;
  this.setState({finaltestE:finaltestE})
  console.log('price 8 tax' ,finaltestE)
  
  }else  if(this.state.singleItem.tax_description=='16%'){
  testS= 0.16*parseFloat(ppp*parseInt(text));
  finaltestS=0.16*parseFloat(this.state.count)+ppp;
  this.setState({finaltestS:finaltestS})
  console.log('price 16 tax' ,finaltestS)
  
  }

  }else{
    this.setState({text:1})
    if(text.length>0){
      this.setState({count:parseInt(text)})
      let ppp;
      if(this.state.singleItem.new_price !=null && this.state.singleItem.new_price !=''){
        ppp= parseFloat(this.state.singleItem.new_price)
        console.log('new price',ppp)
      }else{
        ppp=parseFloat(this.state.singleItem.cost_price)
        console.log('coost price',ppp)
      }
    
      if(this.state.singleItem.tax_description=='4%'){
        testF= 0.04*parseFloat(ppp);
        finaltestF=0.04*parseFloat(this.state.count)+ppp;
        this.setState({finaltestF:finaltestF})
        console.log('price 4 tax' ,finaltestF)
      }
    else  if(this.state.singleItem.tax_description=='8%'){
    testE= 0.08*parseFloat(ppp);
    finaltestE=0.08*parseFloat(this.state.count)+ppp;
    this.setState({finaltestE:finaltestE})
    console.log('price 8 tax' ,finaltestE)
    
    }else  if(this.state.singleItem.tax_description=='16%'){
    testS= 0.16*parseFloat(ppp);
    finaltestS=0.16*parseFloat(this.state.count)+ppp;
    this.setState({finaltestS:finaltestS})
    console.log('price 16 tax' ,finaltestS)
    
    }}
  }

  this.setState({totalAfterTax:this.state. finaltestF+this.state.fianltestE+this.state.finaltestS})

}
thirdBG() {
  this.setState({
      thirdBg: '#8FCFEB',
      firstBg: '#E0E0E0',
      secondBg: '#E0E0E0',

      thirdFront: 'white',
      firstFront: '#8FCFEB',
      secondFront: '#8FCFEB'

  });
}
  onFirstPreessed() {
    this.firstBG();
 
}
onSecondPressed() {
    console.log('signupPreesd')
    this.secondBG();

}
handleShapes(){
  if(this.state.finalShapesArr[0]==undefined){
    return(
     null
    )
  }else{
 
    return(
      <View>
      <View  style={styles.imageContainerInProductDetails}>
      <Text style={{  fontFamily: "Acens",
      fontSize: 12,
      fontWeight: "normal",
      fontStyle: "normal",
      letterSpacing: 0,
      textAlign: "left",
      color: "#8FCFEB"}}>Product Format</Text>
      </View>
      <View  style={styles.imageContainerInProductDetails}>
      
      <View style={{height:35,width:Dimensions.get('window').width/3,justifyContent:'center',alignItems:'center',backgroundColor:'#E8E8E8',marginBottom:3,display: this.state.finalShapesArr.length>0?'flex':'none',justifyContent:'center',alignItems:'center',borderRadius:3,}}>






      <Picker
      mode="dialog"
      iosIcon={<Icon name="md-arrow-dropdown" style={iosPickerIconStyle} />}
      style={{width:Dimensions.get('window').width/3,height:35}}
      selectedValue={this.state.selected}
      onValueChange={this.onValueChange.bind(this)}
      itemTextStyle={{fontSize: 13,
        fontWeight: "normal",
        fontStyle: "normal", 
        fontFamily: "Acens",color: '#8FCFEB'}}
        textStyle={{fontSize: 13,
          fontWeight: "normal",
          fontStyle: "normal", 
          fontFamily: "Acens",color: '#8FCFEB'}}

     
  >
   {this.state.finalShapesArr.map((item, index) => {
return (<Picker.Item label={item.shape} value={index} key={index} style={{fontSize: 13,
  fontWeight: "normal",
  fontStyle: "normal", 
  fontFamily: "Acens",color: '#8FCFEB'}}/>) 
})}

    
  </Picker>
  </View>
  </View>
  </View>
    )
  }
}


buyNow(){
  let ppp;
  let tax4=0.0;
  let tax8=0.0;
  let tax16= 0.0;


  if(this.state.singleItem.new_price !=null && this.state.singleItem.new_price !=''){
    ppp= parseFloat(this.state.singleItem.new_price)
    
    console.log('new price',ppp)
  }else{
    ppp=parseFloat(this.state.singleItem.cost_price)
    console.log('coost price',ppp)
  }



  let test=0;
  for(let i=0;i<=this.state.bounsArr.length;i++){
   
    if(this.state.bounsArr[i]!=undefined){
    if(this.state.count>=this.state.bounsArr[i].qty_from){
      test=this.state.bounsArr[i].bounces;
      this.setState({bounsNum:this.state.bounsArr[i].bounces})
      console.log('bouuuuns number is:',this.state.bounsNum)
    }
  }
}
if(this.state.custmizeBonusNum>0){
  test=this.state.custmizeBonusNum
}

let finalPri;
let finaltaxF=0.0;
let finaltaxE=0.0;
let finaltaxS=0.0;
let publicTax=0.0
  if(this.state.singleItem.new_price !=null && this.state.singleItem.new_price !=''){
    finalPri= parseFloat(this.state.singleItem.new_price)
    console.log('new price',finalPri)
  }else{
    finalPri=parseFloat(this.state.singleItem.cost_price)
    console.log('coost price',finalPri)
  }

  if(this.state.singleItem.tax_description=='4%'){
    finaltaxF= 0.04*parseFloat(this.state.count);
    console.log('price 4 tax' ,finaltaxF)
  }
else  if(this.state.singleItem.tax_description=='8%'){
  finaltaxE= 0.08*parseFloat(this.state.count);
  console.log('price 8 tax' ,finaltaxE)

}else  if(this.state.singleItem.tax_description=='16%'){
  finaltaxS= 0.16*parseFloat(this.state.count);
  console.log('price 16 tax' ,finaltaxS)

}


  if(this.state.singleItem.tax_description=='4%'){
    tax4= (0.04*parseFloat(ppp*this.state.count))+(ppp*this.state.count);
    // finaltestF=0.04*parseFloat(qty)+ppp*qty;
    // this.setState({finaltestF:finaltestF})
    this.props.navigation.navigate("CheckoutScreen",{singleItem:this.state.singleItem,
      totalAfterTax: tax4.toFixed(3),
    screen:'item',
    itemId : this.props.navigation.state.params.itemId,
  count:this.state.count,
  bonus:test,
finalTaxesTotal:(parseFloat(finaltaxF)+parseFloat(finaltaxE)+parseFloat(finaltaxS)).toFixed(3)});
    console.log('price 4 tax' ,finaltestF)
  }
else  if(this.state.singleItem.tax_description=='8%'){

  tax8= (0.08*parseFloat(ppp*this.state.count))+(ppp*this.state.count);


this.props.navigation.navigate("CheckoutScreen",{singleItem:this.state.singleItem,
  totalAfterTax: tax8.toFixed(3),
screen:'item',
count:this.state.count,

itemId : this.props.navigation.state.params.itemId,
bonus:test,
finalTaxesTotal:(parseFloat(finaltaxF)+parseFloat(finaltaxE)+parseFloat(finaltaxS)).toFixed(3)});
console.log('price 8 tax' ,finaltestE)

}else  if(this.state.singleItem.tax_description=='16%'){
  tax16= (0.16*parseFloat(ppp*this.state.count))+(ppp*this.state.count);

this.props.navigation.navigate("CheckoutScreen",{singleItem:this.state.singleItem,
  totalAfterTax: tax16.toFixed(3),
screen:'item',
count:this.state.count,
itemId : this.props.navigation.state.params.itemId,
bonus:test,
finalTaxesTotal:(parseFloat(finaltaxF)+parseFloat(finaltaxE)+parseFloat(finaltaxS)).toFixed(3)});

console.log('price 16 tax' ,finaltestS)

}
else {
  publicTax= ((parseFloat(this.state.singleItem.tax_description)/100)*parseFloat(ppp*this.state.count))+(ppp*this.state.count);

this.props.navigation.navigate("CheckoutScreen",{singleItem:this.state.singleItem,
  totalAfterTax: publicTax.toFixed(3),
screen:'item',
count:this.state.count,
itemId : this.props.navigation.state.params.itemId,
bonus:test,
finalTaxesTotal:(parseFloat(publicTax)+parseFloat(finaltaxF)+parseFloat(finaltaxE)+parseFloat(finaltaxS)).toFixed(3)});

console.log('price 16 tax' ,finaltestS)

}


}

handleUnit(){
  if(this.state.singleItem.products_weight_unit==='Piece'){
    return(
      null
    
    )
  }else{
 
    return(
      <View style={{flexDirection:'column'}}>
      <View style={styles.productNameContainer}>
      <View style={{flexDirection:'column',flex: 1}}>
            <Text style={{  fontFamily: "Acens",
            fontSize: 12,
            fontWeight: "normal",
            fontStyle: "normal",
            letterSpacing: 0,
            textAlign: "left",
            color: "#8FCFEB"}}>Product Weight</Text>
      </View>
      </View>
    <View style={styles.productNameContainer}>
      <View style={{flexDirection:'column',flex: 1}}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <View style={{height:35,width:Dimensions.get('window').width/3,justifyContent:'center',alignItems:'center',backgroundColor:'#E8E8E8',borderRadius:3,marginBottom:3}}>
              
      
    
           <Picker
                    mode="dialog"
                    iosIcon={<Icon name="md-arrow-dropdown" style={iosPickerIconStyle} />}
                    style={{width:Dimensions.get('window').width/3,height:35}}
                    selectedValue={this.state.selectedGrams}
                    onValueChange={this.onValueChangeGrams.bind(this)}
                  
                    itemTextStyle={{fontSize: 13,
                      fontWeight: "normal",
                      fontStyle: "normal", 
                      fontFamily: "Acens",color: '#8FCFEB'}}
                      textStyle={{fontSize: 13,
                        fontWeight: "normal",
                        fontStyle: "normal", 
                        fontFamily: "Acens",color: '#8FCFEB'}}
                >
                 {this.state.bounsArr.map((item, index) => {
return (<Picker.Item label={item.bounces+' per '+ item.qty_from+' to '+item.qty_to}  value={index} key={index} style={{fontSize: 13,
  fontWeight: "normal",
  fontStyle: "normal", 
  fontFamily: "Acens",color: '#8FCFEB'}}/>) 
})}

                  
                </Picker>
    </View>
    
    </View>
          </View>
    </View>
     
    </View>
    )
  }
}
onThirdPressed(){
  this.thirdBG();
}

  render() {

  console.log("tetstttttutuw9217291216196",this.state.imagesArr)
   
    console.log('price 16 tax in render' ,this.state.finaltestS)
    console.log('price 8 tax in render' ,this.state.finaltestE)
    console.log('price 4 tax in render' ,this.state.finaltestF)
    let test=0;
    for(let i=0;i<=this.state.bounsArr.length;i++){
  
      if(this.state.bounsArr[i]!=undefined){ 
        console.log('test array=:',this.state.bounsArr[i])
  
           console.log('test=:',this.state.bounsArr[i].type)
  
      if(this.state.count>=this.state.bounsArr[i].qty_from){
        if(this.state.bounsArr[i].type=='percent'){
          console.log('test= in percent:',this.state.bounsArr[i].type)
          console.log('test=:',this.state.bounsArr[i].bounces)
  
          test=this.state.bounsArr[i].bounces;
  test=parseInt((this.state.bounsArr[i].bounces)/100*this.state.count)

        }else{
                test=parseInt(this.state.bounsArr[i].bounces);
                console.log('test type=:',this.state.bounsArr[i].type)
  
                console.log('test= in pice:',this.state.bounsArr[i].bounces)
  
        }
        // this.setState({bounsNum:this.state.bounsArr[i].bounces})
        console.log('bouuuuns number is:',this.state.bounsNum)
      } 
       if(this.state.count>this.state.bounsArr[i].qty_to){
      console.log('  customers_basket_quantity iiiiis ',this.state.count);
      console.log('  this.props.Order[data].bounsArr[this.props.Order[data].bounsArr.length-1].qty_to ',this.state.bounsArr[i].qty_to);
  
      test=0 
    }
    }
  
  }
  if(this.state.custmizeBonusNum>0){
    test=this.state.custmizeBonusNum
  }
    

    i18n.fallbacks = true;
    i18n.translations = { ar, en };
    console.log('test:' + this.state.myLang);

    i18n.locale = this.state.myLang;
    console.log('singleitem',this.state.singleItem)
   
    const images = [
     "https://www.myjewishlearning.com/wp-content/uploads/2009/06/shutterstock_99946823-1342x900.jpg"
  ];

  
    if (!this.state.singleItem) {
      
      return (
        <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator style={styles.loader} size="large" color="#8FCFEB" />
      </View>
      )
    }
    return (
      <StyleProvider style={getTheme(variables)}>

      <Container style={styles.mainContainerInProductDetails}>
      <Header style={{height:99,backgroundColor:'#8FCFEB'}}>
        
        <Left style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Button style={{}} transparent onPress={()=>{this.goBack()}}>
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
              <Title style={[styles.header,{fontSize:25,width:Dimensions.get('window').width/1.5,fontFamily:'Acens',marginLeft:0}]}>
              {this.props.navigation.state.params.title!=null&&this.props.navigation.state.params.title!=undefined&&this.props.navigation.state.params.title!=''?this.props.navigation.state.params.title: this.state.singleItem.products_name}
              </Title>
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
        <Content  disableKBDismissScroll={true} >

      


<Carousel
               onSnapToItem={(index) =>{console.log("indexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",index), this.setState({ activeSlide: index }) }}

                  loop={true}
                  loopClonesPerSide={1}
                  autoplay={true}
                  autoplayDelay={1000}
                  autoplayInterval={3000}
              ref={(c) => { this._carousel = c; }}
              data={this.state.imagesArr}
              sliderWidth={ BannerWidth}
              itemWidth={BannerWidth}
              renderItem={({ item, index }) => (
                this.renderPage(item,index)
               
              )}
            />
  {this.pagination} 

       <View style={{height:15}}/>

          <View style={{flexDirection:'row',justifyContent:'space-between',width:Dimensions.get('window').width,paddingStart:10,marginTop:-10}}>
          <Text style={[styles.productTitleDesc,{marginTop:0,fontFamily:'newFont'}]}>{this.state.singleItem.products_name}</Text>          
          
          <TouchableOpacity 
            style={{marginTop: 50}}
onPress={() => this.handelLikeButton()} 
      >
              <Image
                source=
                {this.state.likeImg}
                style={[styles.imageStyleInSetting,{marginEnd:50,width:30,height:30}]}
              />
            </TouchableOpacity>
          </View>

                   
<View style={{flexDirection:'row',paddingStart:10,marginTop:-50}}>
<Text style={[styles.productPrice,{fontSize:12,fontFamily:'newFont'}]}>{i18n.t('Referencenumber')}</Text>
             
<Text style={[styles.productPrice,{fontSize:12}]}>{this.state.singleItem.reference_number}</Text>   

</View>
<View style={{flexDirection:'row',paddingStart:12}}>
<Text style={[styles.productPrice,{fontSize:12,fontFamily:'newFont'}]}>{i18n.t('categotyname')}</Text>

<Text style={[styles.productPrice,{fontSize:12}]}>{this.state.singleItem.categories[0].categories_name}</Text>


</View>
{this.state.singleItem.drug_store !=''&&this.state.singleItem.drug_store !=null?(
  <View style={{flexDirection:'row',paddingStart:12}}>
  
  <Text style={[styles.productPrice,{fontSize:12,fontFamily:'newFont'}]}>{i18n.t('DrugStore')} </Text>
             
                <Text style={[styles.productPrice,{fontSize:12}]}>{this.state.singleItem.drug_store} </Text>
              
               
</View>

):

<View style={{flexDirection:'row',paddingStart:10}}>
  
<Text style={[styles.productPrice,{fontSize:12,fontFamily:'newFont',}]}>{i18n.t('SubAgent')} </Text>
           
              <Text style={[styles.productPrice,{fontSize:12}]}>{this.state.singleItem.sub_agent} </Text>
            
             
</View>
}
  <View style={{flexDirection:'row',paddingStart:12}}>
  
  <Text style={[styles.productPrice,{fontSize:12,fontFamily:'newFont'}]}>{i18n.t('instock')} </Text>
            {this.state.singleItem.in_stock==1? 
  <Text style={[styles.productPrice,{fontSize:12}]}>{i18n.t('available')} </Text>
   :
   <Text style={[styles.productPrice,{fontSize:12}]}>{i18n.t('notavailable')}</Text>

            }           
               
</View>
          <View style={{width:'100%',height:Dimensions.get('window').height/4.7,justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
          <View style={{justifyContent:'space-between',flexDirection:'row',width:'95%',alignItems:'center'}}>
          <TouchableOpacity 
style={{width:'48%',height:45,backgroundColor:'white',justifyContent:'center',alignItems:'center',borderRadius:5,
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,}}>
<Text style={{fontFamily: 'newFont',
fontSize: 15,
// fontWeight: "bold",
fontStyle: "normal",
lineHeight: 20,
letterSpacing: 0,
color: "#8FCFEB"}}>{i18n.t('cost')}
<Text style={{fontFamily: 'numFont',
fontSize: 15,
// fontWeight: "bold",
fontStyle: "normal",
lineHeight: 20,
letterSpacing: 0,
color: "#8FCFEB"}}>{this.state.singleItem.new_price !=null &&this.state.singleItem.new_price !=''?this.state.singleItem.new_price:(this.state.singleItem.cost_price )}<Text style={{fontFamily:"newFont"}}>{i18n.t('jod')}</Text></Text>
</Text>

</TouchableOpacity>
<TouchableOpacity 
style={{width:'48%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center',borderRadius:5,
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,}}>
<Text style={{fontFamily:'newFont',
fontSize: 15,
// fontWeight: "bold",
fontStyle: "normal",
lineHeight: 20,
letterSpacing: 0,
color: "white"}}>{i18n.t('public')}
<Text style={{fontFamily: 'numFont',
fontSize: 15,
// fontWeight: "bold",
fontStyle: "normal",
lineHeight: 20,
letterSpacing: 0,
color: "white"}}>{this.state.singleItem.products_price}<Text style={{fontFamily:"newFont"}}>{i18n.t('jod')}</Text></Text>

</Text>

</TouchableOpacity>
         </View>
<View style={{height:15}}/>
         <View style={{justifyContent:'space-between',flexDirection:'row',width:'95%',alignItems:'center'}}>
          <TouchableOpacity 
style={{width:'48%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center',borderRadius:5,
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,}}>
<Text style={{fontFamily: 'newFont',
fontSize: 15,
// fontWeight: "bold",
fontStyle: "normal",
lineHeight: 20,
letterSpacing: 0,
color: "white"}}>
{i18n.t('profitMargin')}
<Text  style={{fontFamily: 'numFont',
fontSize: 15,
// fontWeight: "bold",
fontStyle: "normal",
lineHeight: 20,
letterSpacing: 0,
color: "white"}}>
{parseFloat(this.state.singleItem.profit_margin).toFixed(3)}
</Text>
</Text>

</TouchableOpacity>
<TouchableOpacity 
style={{width:'48%',height:45,backgroundColor:'white',justifyContent:'center',alignItems:'center',borderRadius:5,
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,


elevation: 5,}}>
<Text style={{fontFamily: 'newFont',
textAlign:"center",
fontSize: 15,
// fontWeight: "bold",
fontStyle: "normal",
lineHeight: 20,
letterSpacing: 0,
color: "#8FCFEB"}}>{i18n.t('profitMarginRatio')}
<Text  style={{fontFamily: 'numFont',
textAlign:"center",
fontSize: 15,
// fontWeight: "bold",
fontStyle: "normal",
lineHeight: 20,
letterSpacing: 0,
color: "#8FCFEB"}}>
{parseFloat(this.state.singleItem.profit_margin_percent).toFixed(3)}%
</Text>
</Text>

</TouchableOpacity>
         </View>

          </View>
          <View style={{width:'100%',justifyContent:'center',flexDirection:'row'}}>
         
          <View style={{width:'90%',justifyContent:'space-between',flexDirection:'row'}}>

          <Text style={[styles.productNameStyleInProductDetails,{marginTop:11,color:'#4d4d4d',fontFamily:'newFont'}]}>{i18n.t('tax')} <Text style={{fontFamily:'numFont'}}>{this.state.singleItem.tax_description}</Text></Text>
            <Text style={[styles.productNameStyleInProductDetails,{marginTop:11,color:'#4d4d4d',fontFamily:'newFont'}]}>{i18n.t('type')} {this.state.singleItem.products_type}</Text>
            <Text style={[styles.productNameStyleInProductDetails,{marginTop:11,color:'#4d4d4d',fontFamily:'newFont'}]}>{i18n.t('Unit')} {this.state.singleItem.units}</Text>
          </View>
          </View>
          <View style={{height:20}}/>
          <View style={styles.separater} />
          <View style={{flexDirection:'column',width:Dimensions.get('window').width,paddingStart:10,paddingEnd:10,justifyContent:'flex-start',alignItems:'flex-start'}}> 
          
          <Text style={styles.productTitleDesc}>{i18n.t('description')}</Text>
            <Text style={[styles.descBodyStyle,{textAlign: I18nManager.isRTL? 'left':'left', alignSelf: 'stretch',flex:1}]}>{this.state.singleItem.products_description}</Text>
            <View style={{height:3}}/>
              </View>
          <View style={styles.descContainer}>
            
            <View style={{height:20}}/>
          <View style={styles.separater} />


          <View style={{width:'100%',height:Dimensions.get('window').height/7,justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
          <View style={{justifyContent:'space-between',flexDirection:'row',width:'95%',alignItems:'center'}}>
          
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingStart:3}}>
          <Text style={[styles.productPrice,{fontSize:12}]} >{i18n.t('qty')}</Text>
          <View style={{width:5}}/>
          <View style={{width:Dimensions.get('window').width/3.2,flexDirection:'row',borderWidth:1,borderColor:'#E8E8E8',justifyContent:'space-between',borderRadius:3,marginBottom:3}}>
                  
                  <TouchableOpacity 
                                       onPress={()=>{this.onMainusPressed(this.state.count)}}
                                    style={{width:35,height:35,backgroundColor:'white',justifyContent:'center',alignItems:'center',borderEndColor:'#E8E8E8',borderEndWidth:1}}><Text style={{color:'#8FCFEB',fontSize:20}}>-</Text></TouchableOpacity>
                  
                                  
                                   
                                  <View style={{justifyContent:'center',alignItems:'center',}}> 
                                   <TextInput onFocus= {() => this.setState({count : ''})} returnKeyType='done' keyboardType='numeric' onChangeText={val =>this.updateInput(val) }style={{textAlign:'center'}}>{this.state.count}</TextInput>
                                   </View>
                                   <TouchableOpacity style={{width:35,height:35,backgroundColor:'white',justifyContent:'center',alignItems:'center',borderStartColor:'#E8E8E8',borderStartWidth:1}}
                                   onPress={()=>{this.onPlusPressed((this.state.count))}}
                                    ><Text style={{color:'#8FCFEB',fontSize:20}}>+</Text></TouchableOpacity>
                                  
                                    
          </View></View> 
          <View style={{width:3}}/>

                   {this.state.bounsArr.length>0?
                   (

          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingStart:3}}>
          <Text style={[styles.productPrice,{fontSize:12}]}>{i18n.t('bonus')}</Text>
          <View style={{width:3}}/>

      <View style={{flexDirection:'row',alignItems:'center',width:Dimensions.get('window').width/2.5,backgroundColor:'#E8E8E8',height:39}}>
      <View style={{height:35,width:Dimensions.get('window').width/2.7,justifyContent:'flex-start',alignItems:'center',backgroundColor:'#E8E8E8',borderRadius:3,marginBottom:3}}>
              


<Picker
mode="dialog"

iosIcon={<Icon name="md-arrow-dropdown" style={iosPickerIconStyle} />}
style={{width:Dimensions.get('window').width/2.7,height:35, backgroundColor:'#E8E8E8',}}
selectedValue={this.state.selectedGrams}
onValueChange={this.onValueChangeGrams.bind(this)}
itemTextStyle={itemTextStyleICheckoutPicker}
textStyle={textStyleInCheckoutPicker}
itemTextStyle={{fontSize: 12,
  // fontWeight: "normal",
  fontStyle: "normal", 
  fontFamily: "numFont",color: '#8FCFEB',}}
  textStyle={{fontSize: 12,
    // fontWeight: "normal",
    fontStyle: "normal", 
    fontFamily: "numFont",color: '#8FCFEB',width:Dimensions.get('window').width/3}}
    iosHeader={(i18n.t('bonusavailable'))}
    headerStyle={{ backgroundColor: "#8FCFEB" 
    
    }}
    
>
{this.state.bounsArr.map((item, index) => {
  return (<Picker.Item label={item.type=='percent'? item.bounces+'% '+i18n.t('per') +item.qty_from+i18n.t('to')+item.qty_to:item.bounces+i18n.t('per')+ item.qty_from+i18n.t('to')+item.qty_to}  value={index} key={index} style={{fontSize: 13,
    // fontWeight: "normal",
fontStyle: "normal", width:100,
fontFamily: "numFont",color: '#8FCFEB'}}/>) 

})}

<Picker.Item label={i18n.t('customizeYourBonus')} value='bounses' /> 

</Picker>
     
    </View>
    {   Platform.OS=='android'?
    (
    <View style={{height:39,backgroundColor:'#E8E8E8',alignItems:'center',justifyContent:'center'}}>
    <Icon style={{  color:'gray',backgroundColor:'#E8E8E8',height:'100%'}} color='gray'
               name={
        Platform.OS === 'ios'
          ? `md-arrow-dropdown`
          : 'md-arrow-dropdown'
      }  />
      </View>
    ):
    null
    }
    </View>
         
          </View> 
          ):
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingStart:3}}>
          <Text style={[styles.productPrice,{fontSize:12}]}>{i18n.t('bonus')}</Text>
          <View style={{width:3}}/>

      <View style={{flexDirection:'row',alignItems:'center',width:Dimensions.get('window').width/2.5,backgroundColor:'#E8E8E8',height:39}}>
      <View style={{height:35,width:Dimensions.get('window').width/2.7,justifyContent:'flex-start',alignItems:'center',backgroundColor:'#E8E8E8',borderRadius:3,marginBottom:3}}>
              


<Picker
mode="dialog"

iosIcon={<Icon name="md-arrow-dropdown" style={iosPickerIconStyle} />}
style={{width:Dimensions.get('window').width/2.7,height:35, backgroundColor:'#E8E8E8',}}
selectedValue={this.state.selectedGramsCustom}
onValueChange={this.onValueChangeGramsCustom.bind(this)}
itemTextStyle={itemTextStyleICheckoutPicker}
textStyle={textStyleInCheckoutPicker}
itemTextStyle={{fontSize: 12,
  // fontWeight: "normal",
  fontStyle: "normal", 
  fontFamily: "newFont",color: '#8FCFEB',}}
  textStyle={{fontSize: 12,
    // fontWeight: "normal",
    fontStyle: "normal", 
    fontFamily: "newFont",color: '#8FCFEB',width:Dimensions.get('window').width/3}}
    iosHeader={(i18n.t('bonusavailable'))}
    headerStyle={{ backgroundColor: "#8FCFEB" 
    
    }}
    
>
<Picker.Item label={i18n.t('availablebonuses')} value={1} /> 


<Picker.Item label={i18n.t('customizeYourBonus')} value='bounses' /> 

</Picker>
     
    </View>
    {   Platform.OS=='android'?
    (
    <View style={{height:39,backgroundColor:'#E8E8E8',alignItems:'center',justifyContent:'center'}}>
    <Icon style={{  color:'gray',backgroundColor:'#E8E8E8',height:'100%'}} color='gray'
               name={
        Platform.OS === 'ios'
          ? `md-arrow-dropdown`
          : 'md-arrow-dropdown'
      }  />
      </View>
    ):
    null
    }
    </View>
         
          </View> 
    }
          </View>
         
</View>  
{this.state.custmizeBonusNum>0?(
<View style={{flexDirection:'row',alignItems:'center',paddingStart:3}}>
  <View style={{width:3,marginEnd:5}}/>
<Text style={[styles.productPrice,{fontSize:12}]}>{i18n.t('bonus')}</Text>

<Text style={{paddingStart:5}}>{this.state.custmizeBonusNum}</Text>
</View>
):

<View style={{flexDirection:'row',alignItems:'center',paddingStart:3}}>
  <View style={{width:3,marginEnd:5}}/>
<Text style={[styles.productPrice,{fontSize:12}]}>{i18n.t('bonus')}</Text>

<Text style={{paddingStart:5}}>{parseInt(test)}</Text>
</View>

}

<View style={styles.separater} />

          <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height/4.7,justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
          <View style={{justifyContent:'space-between',flexDirection:'row',width:'87%',alignItems:'center'}}>
          
          
           
          {this.state.singleItem.in_stock!=0?
          <TouchableOpacity 
          onPress={() => {
            this.buyNow()
           
        }}
style={{width:'48%',height:45,backgroundColor:'#E8E8E8',justifyContent:'center',alignItems:'center',borderRadius:5,
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,}}>
<Text style={{fontFamily: 'Acens',
fontSize: 13,
fontWeight: "normal",
fontStyle: "normal",
letterSpacing: 0,
color: "#8FCFEB"}}>{i18n.t('buyNow')}</Text>

</TouchableOpacity> 

:
<TouchableOpacity 
disabled={true}
style={{width:'48%',height:45,backgroundColor:'gray',justifyContent:'center',alignItems:'center',borderRadius:5,
shadowOffset: {
width: 0,
height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,}}>
<Text style={{fontFamily: 'Acens',
fontSize: 13,
fontWeight: "normal",
fontStyle: "normal",
letterSpacing: 0,
color: "#8FCFEB"}}>{i18n.t('buyNow')}</Text>

</TouchableOpacity> 
}
          {this.state.singleItem.in_stock!=0?

<TouchableOpacity 
  onPress={()=>{
    this.addToOrder()
  
   
 }}
 disabled={(this.state.testArr.includes(this.state.singleItem.products_id) || this.state.btnDisabled?true:false)}

style={{flexDirection:'row', width:'48%',height:45,
justifyContent:'center',alignItems:'center',borderRadius:5,
backgroundColor:((this.state.testArr.includes(this.state.singleItem.products_id)||(this.state.btnDisabled))?'gray':'#8FCFEB'),

shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5, }}>

  <View  style={{flexDirection:'row',display: (this.state.testArr.includes(this.state.singleItem.products_id)||(this.state.btnDisabled))?'flex':'none'}}>
<Icon name='ios-checkmark-circle'  color='#8FCFEB' height={10} width={10} style={{color:'#8FCFEB',}} />
<View style={{width:5}}/>
</View>
     
<Text style={{fontFamily: 'Acens',
fontSize: 13,
fontWeight: "normal",
fontStyle: "normal",
letterSpacing: 0,
color: (this.state.testArr.includes(this.state.singleItem.products_id )||(this.state.btnDisabled)?'#8FCFEB':'white')}}>{(this.state.testArr.includes(this.state.singleItem.products_id)||(this.state.btnDisabled))?i18n.t('inCart'):i18n.t('addToCart')}</Text>

</TouchableOpacity>
:
<TouchableOpacity 

 disabled={true}

style={{flexDirection:'row', width:'48%',height:45,
justifyContent:'center',alignItems:'center',borderRadius:5,
backgroundColor:'gray',

shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5, }}>

  <View  style={{flexDirection:'row',display: (this.state.testArr.includes(this.state.singleItem.products_id)||(this.state.btnDisabled))?'flex':'none'}}>
<Icon name='ios-checkmark-circle'  color='#8FCFEB' height={10} width={10} style={{color:'#8FCFEB',}} />
<View style={{width:5}}/>
</View>
     
<Text style={{fontFamily: 'Acens',
fontSize: 13,
fontWeight: "normal",
fontStyle: "normal",
letterSpacing: 0,
color: (this.state.testArr.includes(this.state.singleItem.products_id )||(this.state.btnDisabled)?'#8FCFEB':'white')}}>{(this.state.testArr.includes(this.state.singleItem.products_id)||(this.state.btnDisabled))?i18n.t('inCart'):i18n.t('addToCart')}</Text>

</TouchableOpacity>
}
         </View>
         </View>
              </View>
             
         
        {this.state.isModalVisible &&
          <AddToCartModal
            _toggleModal={this._toggleModal}
            isModalVisible={this.state.isModalVisible}
            item={this.state.singleItem}
            finalPrice={parseFloat(this.state.finalPrice)}
            products_weight={grmsArr[this.state.selectedGrams]}
            products_finalWeightPrice={this.state.singleItem.products_weight_unit==='Units' || this.state.singleItem.products_weight_unit==='Weight' || this.state.singleItem.products_weight_unit==='Gram'? (this.state.singleItem.products_price*this.state.selectedGrams):'null'}
            products_shape={this.state.finalShapesArr[0]!=undefined?this.state.finalShapesArr[this.state.selected].id:'null'}
            redeem={false}
            

          />
        }
        </Content>



        <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.isBounasModalVisible}
                        onRequestClose={() => {
                            this.setBounsModalVisibleRefExit(false);
                        }}>
                        <View style={{ marginTop: 90, marginEnd: 20, marginStart: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Card style={{ borderRadius: 0 }}>
                               

                                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
                                    <View style={{width:Dimensions.get('window').width/1.3,backgroundColor:'#8FCFEB',height:50,alignItems:'center',justifyContent:'center'}}>
                                    <View style={{flexDirection:'row',width:'100%',}}>
                                    <View  style={{width:10, justifyContent:'flex-end',alignItems:'center'}}  />
                                  <TouchableOpacity 
                                 onPress={()=>{this.setBounsModalVisibleRefExit(false)}}
>  
 <Icon style={{color:'white',}} name={
        Platform.OS === 'ios'
          ? `md-close`
          : 'md-close'
      }/>
                                  
                                    </TouchableOpacity>
                                        <Text style={{ fontSize: 13, color: 'white', fontFamily: 'Acens',width:Dimensions.get('window').width/1.67,textAlign:'center',marginBottom:-7 }}>{i18n.t('customizeYourBonus')}</Text>
                                      
                                       </View>
                                       </View>
                                       <View style={{height:Dimensions.get('window').height/3.7,paddingTop:20}}>

                                     
              
               
              <Text
                   
                   style={{ 
                    marginTop:7,
                    marginBottom:3,
                      width:Dimensions.get('window').width/1.7,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 16,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('enterYourBonus')}</Text>
                            <TextInput 
                            keyboardType='numeric'
                            returnKeyType='done'
                            placeholder='0'
                          
                             onChangeText={(text)=>this.setState({custmizeBonusNum:text})}

                            style={{height:40,borderWidth:1,borderColor:this.state.addressNameBorder,textAlign:'center',justifyContent:'center',alignItems:'center',borderRadius:3,marginTop:0}} />





                </View>
                
                <TouchableOpacity 
            onPress={() => {
              this.setBounsModalVisibleRef(false);
          }}
          style={{ width:Dimensions.get('window').width/1.7,height:44,backgroundColor:'#8FCFEB',flexDirection:'row',justifyContent:'center',alignItems:'center'
 ,marginTop: 10 ,marginBottom:30,}} 
 >
            <Text style={{fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily:'Acens',
    lineHeight: 19,
    letterSpacing: 0.1,
    textAlign: "center",
    color: "#ffffff"}}>{i18n.t('done')}</Text>
          </TouchableOpacity>


                                    </View>
                                    
                               
                            </Card>
                            
                        </View>

                    </Modal>



        <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.popUpModalCalender}
                        onRequestClose={() => {
                            this.setPopUpModalVisibleCalender(false);
                        }}>
                        <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height/2.2,justifyContent:'center',alignItems:'center'}}>
                        <View style={{ backgroundColor: 'transparent', margin: 5 }}>
<DatePicker

style={{
  backgroundColor: "#E8E8E8",
  borderRadius: 0,
  borderRadius: 0,
  alignItems: "center",
  justifyContent: "center",
  width: '90%',
  borderRadius: 0,
  borderBottomWidth: 0,
  borderLeftWidth: 0,
  ...Platform.select({
    ios: {
      paddingLeft: 45
    },
    android: {
      paddingLeft: 20
    }
  }),
  height: 50
}}
customStyles={{
  dateInput: {
    borderWidth: 0,
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "helivet",
    color: "#86764f",
    textAlign: "center",
    fontSize: 13
  },
  placeholderText: {
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "helivet",
    color: "#86764f"
  },
  dateText: {
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "helivet",
    color: "#86764f",
    justifyContent: "flex-start"
  }
}}
iconSource={null}
date={this.state.chosenDate}
mode="date"
minDate={date}
maxDate={dat}
duration={0}
placeholder="YYYY-MM-DD"
format="YYYY-MM-DD"
confirmBtnText="Confirme"
ref={ref => (this.datePicker = ref)}
cancelBtnText="Cancle"
onDateChange={date => {
 this.onConfiremPressed(date);
}}
/>
</View>
</View>
                       </Modal>


        <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.popUpModal}
                        onRequestClose={() => {
                            this.setPopUpModalVisible(false);
                        }}>
                        <View style={[MyAddressStyle.model,{borderRadius:10,height:Dimensions.get('window').height-150,marginTop:99}]}>
						<View style={[MyAddressStyle.modell,{borderRadius:0}]}>
							<View style={MyAddressStyle.modalHeader}>
								<TouchableOpacity
									onPress={() => {
										this.setState({ popUpModal: false });
									}}>
									<Text style={[MyAddressStyle.cancelApplyTxt,{color:'#8FCFEB',fontFamily: "newFont",}]}>{i18n.t('cancel')}</Text>
								</TouchableOpacity>

								<Text style={[MyAddressStyle.cancelApplyTxttt,{color:'#8FCFEB',fontFamily: "newFont",	paddingLeft: Dimensions.get('window').width/8}]}>{i18n.t('checkOut')}</Text>

								<View
                                style={{flexDirection:'row',marginLeft: Dimensions.get('window').width/5}}
								
                  >
								</View>
							</View>
                            <ScrollView>
                            <View style={MyAddressStyle.floatingView}>
                
                            <View style={{ height: 10 }} />
                            <Text
                   
                   style={{ 
                    marginTop:7,
                    marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 20,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('typeOfOrder')}</Text>

<View style={{width:'100%',justifyContent:'space-between',flexDirection:'row'}}>

<TouchableOpacity 
onPress={()=>{this.deffultPressed()}}

style={{width:'32.5%',height:45,backgroundColor:this.state.defaultBackgroundColor,justifyContent:'center',alignItems:'center',borderRadius:0,
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,}}>
<Text style={{fontFamily: 'newFont',
fontSize: 13,
fontWeight: this.state.defultTextWeight,
fontStyle: "normal",
letterSpacing: 0,
color: this.state.defultTextColor}}>{i18n.t('deffult')}</Text>

</TouchableOpacity>
<TouchableOpacity 
onPress={()=>{this.urgentPressed()}}
style={{width:'32.5%',height:45,backgroundColor:this.state.urgentBackgroundColor,justifyContent:'center',alignItems:'center',borderRadius:0,
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,}}>
<Text style={{fontFamily: 'newFont',
fontSize: 13,
fontWeight: this.state.urgentTextWeight,
fontStyle: "normal",
letterSpacing: 0,
color: this.state.urgentTextColor}}>{i18n.t('urgent')}</Text>

</TouchableOpacity>

<TouchableOpacity 


style={{width:'32.5%',height:45,backgroundColor:this.state.latterBookingBackgroundColor,justifyContent:'center',alignItems:'center',borderRadius:0,
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,}}>
<DatePicker
onPress={()=>{this.latterBookingPressed()}}
style={{
  backgroundColor: this.state.latterBookingBackgroundColor,
  borderRadius: 0,
  borderRadius: 0,
  alignItems: "center",
  justifyContent: "center",
  width: '100%',
  borderRadius: 0,
  borderBottomWidth: 0,
  borderLeftWidth: 0,
  ...Platform.select({
    ios: {
      paddingLeft: 0
    },
    android: {
      paddingLeft: 0
    }
  }),
  height: 45
}}
customStyles={{
  dateInput: {
    borderWidth: 0,
    width:'100%',
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily: "helivet",
    color: "#86764f",
    textAlign: "center",
    fontSize: 13
  },
  placeholderText: {
    fontFamily: 'newFont',
    fontSize: 13,
    fontWeight: this.state.latteerBookingTextWeight,
    fontStyle: "normal",
    letterSpacing: 0,
    color: this.state.latterBookingTextColor
  },
  dateText: {
    fontFamily: 'newFont',
    fontSize: 13,
    fontWeight: this.state.latteerBookingTextWeight,
    fontStyle: "normal",
    letterSpacing: 0,
    color: this.state.latterBookingTextColor
  }
}}
iconSource={null}
date=""
showIcon = {false}
mode="date"
minDate={date}
maxDate={dat}
duration={0}
placeholder={i18n.t('latterBooking')}
format="YYYY-MM-DD"
confirmBtnText="Confirme"
ref={ref => (this.datePicker = ref)}
cancelBtnText="Cancle"
onDateChange={date => {
 this.onConfiremPressed(date);
}}
/>
</TouchableOpacity>

</View>

     
       <View style={{ height: 10 }} />
       <Text
                   
                   style={{ 
                    marginTop:7,
                    marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 20,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('check_out')}</Text>


<View style={{width:'100%',justifyContent:'space-between',flexDirection:'row'}}>

<View 
onPress={()=>{this.latterBookingPressed()}}

style={{width:'95%',height:45,backgroundColor:this.state.latterBookingBackgroundColor,justifyContent:'space-between',alignItems:'center',borderRadius:0,flexDirection:'row',
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,backgroundColor:'#8FCFEB',borderRadius:11,paddingEnd:5,paddingStart:5}}>
<Text style={{fontFamily: 'newFont',
fontSize: 13,
fontWeight:'bold',
fontStyle: "normal",
letterSpacing: 0,
color: 'gray'}}>{i18n.t('cod')}</Text>
<Text style={{fontFamily: 'newFont',
fontSize: 13,
fontWeight: 'bold',
fontStyle: "normal",
letterSpacing: 0,
color: 'white'}}>{this.state.singleItem.products_price}{i18n.t('jod')}</Text>

</View>

</View>

       <Text
                   
                   style={{ 
                    marginTop:7,
                    marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 16,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('name')}</Text>
                            <TextInput 
                            returnKeyType='done'
                            placeholder={this.state.firstNmae +' '+ this.state.lastName}
                            editable={false}
                             onChangeText={(text)=>this.setState({firstName:text,
                                rowData: Object.assign({}, this.state.rowData, { id: 30,address_name:text, })
}) }

                            style={{height:40,borderWidth:1,borderColor:this.state.addressNameBorder,textAlign:'center',justifyContent:'center',alignItems:'center',borderRadius:3,marginTop:0}} />

						

								<View style={{ height: 10 }} />
                              


                               

       <View style={{flexDirection:'column',justifyContent:'flex-start'}}>

						

<View style={{height:10}}/>

       <Text
                   
                   style={{ 
                    marginTop:7,
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
                            returnKeyType='done'
                             placeholder={this.state.userEmail}
                             editable={false}
                             onChangeText={(text)=>this.setState({email:text,
                                rowData: Object.assign({}, this.state.rowData, { id: 30,street_name:text, })
}) }

                            style={{height:40,borderWidth:1,borderColor:this.state.streetBorder,textAlign:'center',justifyContent:'center',alignItems:'center',borderRadius:3,marginTop:0}} />

							

								<View style={{ height: 10 }} />

                                <Text
                   
                   style={{ 
                    marginTop:7,
                    marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 16,fontFamily:'newFont',
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('pharmacyName')}</Text>
                                <TextInput 
                                 placeholder={this.state.pharmcyNmae}
                                 editable={false}
                                onChangeText={(text)=>this.setState({pharmacy_name:text,
                                           rowData: Object.assign({}, this.state.rowData, { id: 30,building:text, })
}) }

                                style={{height:40,borderWidth:1,borderColor:'#E8E8E8',textAlign:'center',justifyContent:'center',alignItems:'center',borderRadius:3}}/>

							
		</View>

<View style={{width:10}}/>

                            <Text
                   
                   style={{ 
                     
                    marginTop:7,
                    marginBottom:3,
                      width:Dimensions.get('window').width/1.2,
                      alignItems:'center',
                      borderBottomColor:'#c1c0c9',
                      fontSize: 16,fontFamily: "newFont",
                fontWeight: "normal",
                fontStyle: "normal",
              
                letterSpacing: 0,
                color: "#777777"}} >{i18n.t('country')}</Text>
                                <TextInput 
                                 placeholder='Jordan'
                                 editable={false}
                                               
                                                onChangeText={(text)=>this.setState({country:text,
                                                    rowData: Object.assign({}, this.state.rowData, { id: 30,apartmentno:text, })
         }) }
                                style={{height:40,borderWidth:1,borderColor:'#E8E8E8',textAlign:'center',justifyContent:'center',alignItems:'center',borderRadius:3,marginTop:0}} />

						
                               

							                                         <View style={{height:30}}/>

							</View>
                            
                        </ScrollView>
                        </View>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:'100%'}}>
                    
                    <TouchableOpacity 

style={{width:'47.17%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center',borderRadius:0,
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,borderBottomStartRadius:7,flexDirection:'column'}}>
<Text style={{fontFamily: 'newFont',
fontSize: 13,
fontWeight: 'bold',
fontStyle: "normal",
letterSpacing: 0,
color: 'gray'}}>{i18n.t('paymentAmount')}</Text>
<Text style={{fontFamily: 'newFont',
fontSize: 13,
fontWeight: 'bold',
fontStyle: "normal",
letterSpacing: 0,
color: 'gray'}}>{((parseFloat(testF)+parseFloat(testE)+parseFloat(testS)).toFixed(3))}{i18n.t('jod')}</Text>

</TouchableOpacity>
<View style={{height:45,width:1,opacity:0.01,backgroundColor:'gray'}}/>
<TouchableOpacity 
onPress={()=>{this.onOrderNOwPressed()}}

style={{width:'47.17%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center',borderRadius:0,
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,borderBottomEndRadius:7,

elevation: 5,}}>
<Text style={{fontFamily: 'newFont',
fontSize: 13,
fontWeight: 'bold',
fontStyle: "normal",
letterSpacing: 0,
color: 'gray'}}>{i18n.t('makePurchase')}</Text>

</TouchableOpacity>
                    </View>
                        </View>

                    </Modal>

        <View style={{
    justifyContent: 'center',
    alignItems: 'center',}}>
 
 <View >
        <View style={{ 
   width: Dimensions.get('window').width,justifyContent:'space-between',alignItems:'center',paddingEnd:15,paddingStart:15,
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

const mapStateToActions = {
  addItemToWishlist: addToWishList,
  addItemToOrder: addItem

}
const mapStateToProps= state => ({
  dumyItem: state.CategoryItemsReducer.CtegoryItems,
  Order: state.AddToOrderReducer.Order

});
export default connect(mapStateToProps,mapStateToActions)(ItemScreen)