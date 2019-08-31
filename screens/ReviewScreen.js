import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  Image,
  Modal,
  AsyncStorage,
  FlatList,
  ScrollView,
  I18nManager,ActivityIndicator,
} from "react-native";
var date= new Date();
var dat=new Date();
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Picker,
  StyleProvider,
  ListItem,
  Text,
  Card,
  Radio,
  Label
} from "native-base";
import MyAddressStyle from '../css/MyAddressStyle';
import {addItem} from '../actions/AddToOrder'

import { connect } from "react-redux";
import { CLEAR_CART } from "../actions/types";
import client from "../api/constant";
import getTheme from "../native-base-theme/components";
import variables from "../native-base-theme/variables/variables";
import styles from "../css/styles";
import { showMessage, hideMessage } from "react-native-flash-message";
import * as AddOrderAction from "../actions/AddToOrder";
import { OrderedItem } from "../UI_Commponents/OrderedItem";
import { Localization } from "expo-localization";
import Expo from "expo";
import DatePicker from "react-native-datepicker";
let lang;

import i18n from "i18n-js";
var timesArr = [
  "9 am - 10 am",
  "10 am - 11 am",
  "11 am - 12 pm",
  "12 pm - 1 pm",
  "1 pm - 2 pm",
  "2 pm - 3 pm",
  "3 pm - 4 pm",
  "4 pm - 5 pm",
  "5 pm - 6 pm"
];
const en = {
  home: 'Home',
  wishlist: 'Favorite',
  settings:'Settings',
  drugStore:'Drug Store : ',

  orders:'Orders',
        retailLocator:'Retail Locator',
  description:'Description',
 addToCart:'ADD TO CART',
 callNow:'CALL NOW',
 buyNow:'BUY NOW',
 addedSuccessfully:'Added Successfully',
 qty:'QTY:',
 bonus:'Bonus: ',
 profitMargin:'Profit Value: ',
 cost:'Cost: ',
 public:'Public: ',
 profitMarginRatio:'Profit Margin Ratio: ',
 jod:'JOD',
 agent:'Others',
 verify: 'Verify',
 cancel:'Cancel',
 latterBooking:'Later Booking',
 urgent:'Urgent',
 deffult:'Default',
 check_out:'Check Out',
 cod:'Credit',
 name:'Name',
 email:'Email',
 pharmacyName:'Pharmacy Name',
 country:'Country',
 jordan:'Jordan',
 makePurchase:'MAKE PURCHASE',
 paymentAmount:'PAYMENT AMOUNT',
 checkOut:'CHECK OUT',
 inCart:'IN CART',
 enterYourBonus:'Enter Your Bonus',
 customizeYourBonus:'Customize Your Bonus',
 per:' per ',
 to:'to',

 done:'Done',
 Unit : 'Unit', 
 type : 'Type', 
 tax : 'Tax',  
 Referencenumber:' Reference Number',
 DrugStore:'Drug Store: ',
 SubAgent:'Sub Agent: ',
 checkout:'CHECKOUT',
 jordan:'Jordan',
 minimumOrder:"Minimum Order : ",
 totalProduct:"Total of Products : ",
numberOfProducts:"Number of Products : ",
approved:"Approved",
notApproved:"Not Approved",
qty:'QTY : ',
bonus:'Bonus : ',
cartReview:"Cart Review",
SubAgent:'Sub Agent: ',



 


  
  
 
};
const ar = {
  checkout:'الدفع',

checkOut:'الدفع',
drugStore:'اسم المستودع : ',
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
qty:'الكمية: ',
bonus:'بونص',
profitMargin:'هامش الربح: ',
cost:'التكلفة: ',
public:'سعر البيع : ',
profitMarginRatio:'نسبة هامش الربح: ',
jod:'دينار',
agent:'أخرى',
verify: 'تأكيد',

cancel:'الغاء',
latterBooking:'حجز لاحق',
urgent:'مستعجل',
deffult:'افتراضي',
check_out:'الدفع',
cod:'ذمم',
name:'الاسم',
email:'الايميل',
pharmacyName:'اسم الصيدلية',
country:'البلد',
jordan:'الاردن',
makePurchase:'ادفع الان',
paymentAmount:'المجموع',
inCart:'تمت الاضافة',
enterYourBonus:' البونص',
customizeYourBonus:'ادخال بونص معين',
per:' لكل ',
to:'الى',
done:'تم',

Unit: 'الوحدة: ', 
type: 'النوع: ', 
tax: 'ضريبة المبيعات: ',  
Referencenumber:'الرقم المرجعي',
DrugStore:'مستودع الادوية',
 SubAgent:'الوكيل: ',
 jordan:'الاردن',
 minimumOrder:"الحد الادنى : ",
 totalProduct:"مجموع المنتجات : ",
 numberOfProducts:"عدد المنتجات : ",
 approved:"موافق عليه",
 notApproved:"غير موافق عليه",
 qty:'الكمية : ',
 bonus:'بونص : ',
 cartReview:"عرض السلة",
 SubAgent:'الوكيل: '

 






};
let aApproved = [];
let aUnApproved=[];
let BaseURL = 'https://smortec.com/';
var paymentMethod=['Visa Payment on Delivery','Cash on Delivery']

const {
  textInputStyle,
  checkOutText,
  mainContainerCheckOut,
  firstViewInCheckOut,
  pickerContinerInCheckOut,
  iosPickerIconStyle,
  pickerStyle,
  makePurchaseContainer,
  makePurchaseTouchable,
  makePurchaseText,
  itemTextStyleICheckoutPicker,
  textStyleInCheckoutPicker,
  continerViewInRow,
  textinRowShipping
} = styles;
let a = [];
class ReviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvedArr:[],
      notApprovedArr:[],
      fetching_from_server:false,
      count:this.props.navigation.state.params.count,
      singleItem:this.props.navigation.state.params.singleItem,
     
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
        count:1,
        value: 1,
        isRedeem:true,
       
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
        likeImg: require( '../assets/images/hartempty.png'),
        userID:'1',
        myLang: AsyncStorage.getItem("myLang").then((value) => {
          this.setState({ "myLang": value })
      }).done()
      ,
  
    };
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

  addUnApprovedProducts=(arr)=>{
    console.log("arr",arr)
for(let i=0;i<=arr.length;i++){
    console.log("arr[i]",arr[i])
    // let test=0;
    //   for(let i=0;i<=this.state.bounsArr.length;i++){
    
    //     if(this.state.bounsArr[i]!=undefined){ 
    //       console.log('test array=:',this.state.bounsArr[i])
    
    //          console.log('test=:',this.state.bounsArr[i].type)
    // if(this.state.count==''||this.state.count==""){
    //     if(1>=this.state.bounsArr[i].qty_from){
    //       if(this.state.bounsArr[i].type=='percent'){
    //         console.log('test= in percent:',this.state.bounsArr[i].type)
    //         console.log('test=:',this.state.bounsArr[i].bounces)
    
    //         test=this.state.bounsArr[i].bounces;
    // test=(this.state.bounsArr[i].bounces)/100
    //       }else{
    //               test=this.state.bounsArr[i].bounces;
    //               console.log('test type=:',this.state.bounsArr[i].type)
    
    //               console.log('test= in pice:',this.state.bounsArr[i].bounces)
    
    //       }
    //       this.setState({bounsNum:this.state.bounsArr[i].bounces})
    //       console.log('bouuuuns number is:',this.state.bounsNum)
    //     }
    //   }else{
    //     if(this.state.count>=this.state.bounsArr[i].qty_from){
    //       if(this.state.bounsArr[i].type=='percent'){
    //         console.log('test= in percent:',this.state.bounsArr[i].type)
    //         console.log('test=:',this.state.bounsArr[i].bounces)
    
    //         test=this.state.bounsArr[i].bounces;
    // test=(this.state.bounsArr[i].bounces)/100*this.state.count
    //       }else{
    //               test=this.state.bounsArr[i].bounces;
    //               console.log('test type=:',this.state.bounsArr[i].type)
    
    //               console.log('test= in pice:',this.state.bounsArr[i].bounces)
    
    //       }
    //       this.setState({bounsNum:this.state.bounsArr[i].bounces})
    //       console.log('bouuuuns number is:',this.state.bounsNum)
    //     }
    //   }
    //   }
    // }
    // if(this.state.custmizeBonusNum>0){
    //   test=this.state.custmizeBonusNum
    // }
      
    //   let{ isModalVisible} = this.props;
    //   let BaseURL = 'https://smortec.com';
    //   let testTaxF=0;
    //   let testTaxS=0;
    //   let testTaxE=0;
    //   let ppp=0;
    //   if(this.state.singleItem.tax_description=='4%'){
    
      
    //    testTaxF= 0.04*parseFloat(this.state.singleItem.products_price);
    // }else  if(this.state.singleItem.tax_description=='8%'){
    
      
    //    testTaxE= 0.08*parseFloat(this.state.singleItem.products_price);
    // } else  if(this.state.singleItem.tax_description=='16%'){
    
      
    //    testTaxS= 0.16*parseFloat(this.state.singleItem.products_price);
    // }
    //     if(this.state.singleItem.new_price !=null && this.state.singleItem.new_price !=''){
    //       ppp= parseFloat(this.state.singleItem.new_price)
          
    //     }else{
    //       ppp=parseFloat(this.state.singleItem.cost_price)
    //     }
    
        
       
    
    //     console.log('teeest is:',test);
    //     console.log('bounsnum is:',this.state.bounsNum)
    //     console.log('bounsnum in staaate is:',this.state.custmizeBonusNum)
    // let profitmarginratio=0;
    // let profitmargion=0;
    // if(this.state.count==''||this.state.count==""){
  
    //     let totalSell=this.state.singleItem.products_price*(1+parseInt(test))
    //     profitmargion= totalSell-(ppp*1)
    //     let margin=ppp*(1+parseInt(test)) 
    //          profitmarginratio=(parseFloat(profitmargion / margin)*100).toFixed(3)
  
    // }else{
    //   let totalSell=this.state.singleItem.products_price*(this.state.count+parseInt(test))
    //   profitmargion= totalSell-(ppp*this.state.count)
    //   let margin=ppp*(this.state.count+parseInt(test)) 
    //        profitmarginratio=(parseFloat(profitmargion / margin)*100).toFixed(3)
  
    // }
    // let test1=1
    // if(this.state.count!=""&&this.state.count!=''){
    //   test1=this.state.count
    // }
    // else{
    //   test1=1
    // }
    //     console.log('this.state.singleItem.publicPrice is:',this.state.singleItem.products_price);
    //     console.log('this.state.counte is:',this.state.count);
    //     console.log('ttest is:',parseInt(test));
    //     console.log('ppp is:',ppp*this.state.count);
    // console.log("f",ppp*test1)
    //     console.log('profitmargion is:',profitmargion);
    //     console.log('profitmargion ratiooo is:',profitmarginratio);
    
  if(arr[i]!=undefined)
  {
      let item={
        drug_store:arr[i].drug_store,
        products_id:arr[i].products_id,
        products_name : arr[i].products_name,
        
        final_price:  parseFloat(arr[i].cost_price),
        price: arr[i].cost_price,
        
        customers_basket_quantity: parseFloat(arr[i].qty),
        image: BaseURL + '/' + arr[i].products_image,
        bounsArr:[],
        test:parseInt(arr[i].qtybounces),
        isCustom:false,
        unit:arr[i].units,
        tax:arr[i].tax_description,
        profit_margin: arr[i].profit_margin,
        profit_margin_ratio:parseFloat(arr[i].profit_margin_percent),
        testTaxF:1,
        testTaxE:1,
        testTaxS:1,
        f:parseFloat(arr[i].cost_price*arr[i].qty),
        publicPrice:arr[i].products_price,
        
        redeem:false,
        bounsNum:parseInt(arr[i].qtybounces),
        // testTaxF: this.state.singleItem.tax_description*parseFloat(this.state.singleItem.products_price),
        testTaxF: 0.0,

      }
  
      this.props.addItemToOrder(item)
      showMessage({
        message: i18n.t('addedSuccessfully'),
        type: "success",
      });
    }
      
    }
  }


    



  onOrderNOwPressed=async(a3,a2,a3Agent,a2Agent)=>{
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
    
    console.log("jshskhdksdhshdskhhsdhsdhshdshkd",a3)
    console.log("jshskhdksdhshdskhhsdhsdhshdshkdkhdhdkdkjdkdkdkjdkdjdkjdkjdjkdddddddda333333",a3Agent)
    console.log("mmmmy ddddate",this.props.navigation.state.params.chosenDate)

     this.setState({fetching_from_server:true})
    if(this.props.navigation.state.params.screen=='item'){

    let test=0;
    for(let i=0;i<=this.state.bounsArr.length;i++){
     
      if(this.state.bounsArr[i]!=undefined){
      if(this.state.count>=this.state.bounsArr[i].qty_from){
        test=this.state.bounsArr[i].bounces;
        this.setState({bounsNum:this.state.bounsArr[i].bounces})
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
    }else{
      finalPri=parseFloat(this.state.singleItem.cost_price)
    }
  
    if(this.state.singleItem.tax_description=='4%'){
      finaltaxF= 0.04*parseFloat(this.state.count);
    }
  else  if(this.state.singleItem.tax_description=='8%'){
    finaltaxE= 0.08*parseFloat(this.state.count);
  
  }else  if(this.state.singleItem.tax_description=='16%'){
    finaltaxS= 0.16*parseFloat(this.state.count);
  
  }
    this.setState({popUpModal:false})

console.log("1111111")
    let itemId = this.props.navigation.state.params.itemId
    client.post(`/app/addtoorder?customers_id=${this.state.userID}&customers_telephone=${this.state.phone}&products[]&products[0][products_id]=${itemId}&products[0][customers_basket_quantity]=${this.props.navigation.state.params.count}&products[0][bounces]=${this.props.navigation.state.params.bonus}&type=${this.props.navigation.state.params.type1}&shipping_date=${this.props.navigation.state.params.chosenDate}&language_1d=${lang}&total=${finalPri*this.props.navigation.state.params.count}&tax=${((parseFloat(finaltaxF)+parseFloat(finaltaxE)+parseFloat(finaltaxS)).toFixed(3))}`).then((res) => {
  if(res.data.status==200){
    this.setState({fetching_from_server:true})
  
  
      if(res.data.status==200) {
    this.props.navigation.navigate("OrderAddedSuccesfully",{fromCart:'item'});
  
    showMessage({

      message: res.data.message,
      type: "success",
    });
    this.setState({fetching_from_server:false})
    
 } }else{
  this.setState({fetching_from_server:false})
    showMessage({
      
      message: res.data.message,
      type: "danger",
    });
  }
    })
  }else{

    console.log("this.state.userID",this.state.userID)
    console.log("this.state.type",this.state.type)
    console.log("lang",lang)
    console.log("this.state.chosenDate",this.state.chosenDate)
    console.log("this.props.navigation.state.params.tota",this.props.navigation.state.params.tota)
    console.log("this.props.navigation.state.params.taxes",this.props.navigation.state.params.taxes)
    console.log("this.state.phone",this.state.phone)
    console.log("this.props.navigation.state.params.orderArr",this.props.navigation.state.params.orderArr)
aApproved=[]
let allArr=[]
for (let i = 0; i < a3.length; i++) {

  for (let j = 0; j < a3[i].products.length; j++) {

allArr.push(a3[i].products[j])

  }
}
let allArrAgent=[]
for (let i = 0; i < a3Agent.length; i++) {

  for (let j = 0; j < a3Agent[i].products.length; j++) {

allArrAgent.push(a3Agent[i].products[j])

  }
}
var allArrAll=allArr.concat(allArrAgent)
//}
for(var k=0;k<allArrAll.length;k++){
    aApproved.push(
 `products[${k}][products_id]=${
  allArrAll[k].products_id
 }&products[${k}][customers_basket_quantity]=${
  allArrAll[k].qty
 }
 &products[${k}][bounces]=${
  allArrAll[k].qtybounces
}`
);
}
console.log("allArr",allArr)
let bApproved = aApproved.toString();
bApproved.replace(",", "&");
// aApprovedAgent=[]
// let allArrAgent=[]
// for (let i = 0; i < a3Agent.length; i++) {

//   for (let j = 0; j < a3Agent[i].products.length; j++) {

// allArrAgent.push(a3Agent[i].products[j])

//   }
// }

// for(var k=0;k<allArrAgent.length;k++){
//     aApprovedAgent.push(
//  `products[${k}][products_id]=${
//   allArrAgent[k].products_id
//  }&products[${k}][customers_basket_quantity]=${
//   allArrAgent[k].qty
//  }
//  &products[${k}][bounces]=${
//   allArrAgent[k].qtybounces
// }`
// );
// }
// console.log("allArrAgent",allArrAgent)
// let bApprovedAgent = aApprovedAgent.toString();
// bApprovedAgent.replace(",", "&");
let arrApp=bApproved

   .split(",")
   .join("&")
  //  let arrAppAgent=bApprovedAgent
  //  .split(",")
  //  .join("&")
// let ArrAppFinal=arrApp.concat(arrAppAgent)
   console.log("arrApp99999999999999999999999999999999999999999",arrApp)
//    console.log("arrApp10000000000000000000000000000000000000000",arrAppAgent)
// console.log("ArrApp55555555555555555555555",ArrAppFinal)
    client.post(`/app/addtoorder?customers_id=${this.state.userID}&type=${this.props.navigation.state.params.type1}&language_1d=${lang}&shipping_date=${this.props.navigation.state.params.chosenDate}&total=${this.props.navigation.state.params.tota}&tax=${this.props.navigation.state.params.taxes}&customers_telephone=${this.state.phone}&${arrApp}&products[}`
    )
    .then(res => {
      if(res.data.status==200){
        this.setState({fetching_from_server:true})
      
      if(res.data.status==200) {
        aUnApproved=[]
let allArrUnApproved=[]
for (let i = 0; i < a2.length; i++) {
  for (let j = 0; j < a2[i].products.length; j++) {
 
   allArrUnApproved.push(a2[i].products[j])

  }
}
  let allArrUnApprovedAgent=[]
  for (let i = 0; i < a2Agent.length; i++) {
    for (let j = 0; j < a2Agent[i].products.length; j++) {
   
     allArrUnApprovedAgent.push(a2Agent[i].products[j])
  
    }
  }


console.log("allArrUnApproved",allArrUnApproved)
console.log("allArrUnApprovedAgent",allArrUnApprovedAgent)
var allArrUnApprovedAll=allArrUnApproved.concat(allArrUnApprovedAgent)
console.log("allArrUnApprovedAll",allArrUnApprovedAll)
       this.props.clearCart();
this.addUnApprovedProducts(allArrUnApprovedAll)
   
       this.props.navigation.navigate("OrderAddedSuccesfully",{fromCart:'cart'});
           showMessage({
         message: res.data.message,
         type: "success",
       });
       this.setState({fetching_from_server:false})

       
    } }else{
      this.setState({fetching_from_server:false})
       showMessage({
         message: res.data.message,
         type: "danger",
       });
     }
    });
   
   
  }}
  
} catch (error) {
  // Error retrieving data
  console.log('getstorageitemerrrror',error);
}


  }
  setModalVisible(visible) {
    this.setState({ paymentMethodModalVisibality: visible });
  }
  codPressed() {
    this.setState({
      codSelected: true,
      othersSelected: false,
      visaSelected: false,
      payPalSelected: false
    });
  }
  onValueChangePayment(value,label) {
    this.setState({
        selectedPayment: value,
    });
}
  othersPressed() {
    this.setState({ codSelected: false, othersSelected: true });
    this.setModalVisible(true);
  }
  visaPressed() {
    this.setState({
      codSelected: false,

      visaSelected: true,
      payPalSelected: false
    });
    this.setModalVisible(false);
  }
  payPalPressed() {
    this.setState({
      codSelected: false,

      visaSelected: false,
      payPalSelected: true
    });
    this.setModalVisible(false);
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  canclePressed() {
    this.setModalVisible(false);
    this.codPressed();
  }
  static navigationOptions = {
    header: null
   
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userID');
      const phonevalue = await AsyncStorage.getItem("userPhone");
      const lastName = await AsyncStorage.getItem('lastName');

      const namevalue =  await AsyncStorage.getItem("firstName"); 
      const userEmail = await AsyncStorage.getItem("userEmail");
     const pharmcyNmae = await AsyncStorage.getItem("pharmcyNmae");
      if (value !== null) {
        // We have data!!
        this.setState({userID:value,phone:phonevalue,
          firstNmae:namevalue,
        
          userEmail:userEmail,
          lastName:lastName,
          pharmcyNmae:pharmcyNmae});
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  componentDidMount() {
    // if (I18nManager.isRTL)
    // {
    //   lang=4;
    // }
    // else{
    //   lang=1;
    // }
  
    dat= dat.setDate(dat.getDate() + 30);
    dat=new Date(dat);
    date=date.setDate(date.getDate() + 2);
    date=new Date(date);
    this._retrieveData();
   

    
  }
  onConfiremPressed(date){
  
    this.setState({ chosenDate: date, })
  this.latterBookingPressed();
  }
  registerUser(data) {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(apiResponse => {
        return {
          type: "REGISTER_USER",
          api_response: apiResponse.data
        };
      })
      .catch(function(error) {
        return {
          type: "REGISTER_USER",
          api_response: { success: false }
        };
      });
  }

  _handlePress = async () => { {
    if(paymentMethod[this.state.selectedPayment]==0){
      this.setState({finalPay:'visa_cod'})
    }else{
      this.setState({finalPay:'cod'})
    }

    // for (let i = 0; i < this.state.products.length; i++) {
     
    try {
      const myArray = await AsyncStorage.getItem('@MySuperStore:key');

      if (myArray !== null) {
let fArr=JSON.parse(myArray);
a=[];
        for(let i=0;i<=fArr.length;i++){
          if(fArr[i] !==undefined && fArr[i] !==null){
         a.push(
        `products[${i}][products_id]=${
          this.state.products[i].products_id
        }&products[${i}][products_price]=${
          (this.state.products[i].final_price)/this.state.products[i].customers_basket_quantity
        }&products[${i}][customers_basket_quantity]=${
          this.state.products[i].customers_basket_quantity
        }&products[${i}][products_weight]=${
          this.state.products[i].products_weight
        }&products[${i}][products_shape]=${
          this.state.products[i].products_shape
        }`
      );

    }
  }
  // We have data!!
  console.log(' proooops ordeeeeer cart async arr is',JSON.parse(myArray));
}
} 
catch (error) {
// Error retrieving data
console.log(' proooops ordeeeeer cart async arr is error',error)
}
   // }
    // b = []
    let b = a.toString();
    b.replace(",", "&");
    console.log("33333333")
   client
      .post(
        `/addtoorder?customers_id=${this.state.userID}&language_1d=${lang}&shipping_cost=${this.props.navigation.state.params.zone_price}&
        customers_address_format_id=${
          this.props.navigation.state.params.id
        }&total=${
          this.props.navigation.state.params.finalPrice
        }&payment_method=${this.state.finalPay}&language_id=1& ${b
          .split(",")
          .join("&")}&products[
        }`
      )
      .then(res => {
       
        if (res.data.status === 200) {
          this.props.clearCart();
           


          this.props.navigation.navigate("OrderAddedSuccesfully",{fromCart:'cart'});
        }
      });

    }
  };
  render() {
    console.log("this.props.navigation.state.params.orderArr",this.props.navigation.state.params.orderArr)
console.log("this.props.navigation.state.params.type1",this.props.navigation.state.params.type1)
    console.log("this.props.navigation.state.params.result",this.props.navigation.state.params.result)   
    var a3=[]
    var a2=[] 
for(var i=0;i<this.props.navigation.state.params.result.data.data.length;i++){
if(this.props.navigation.state.params.result.data.data[i].approved=="1"){
  a3.push(this.props.navigation.state.params.result.data.data[i])
}
else if (this.props.navigation.state.params.result.data.data[i].approved=="0"){
  a2.push(this.props.navigation.state.params.result.data.data[i])

}

}
var a3Agent=[]
var a2Agent=[] 
for(var i=0;i<this.props.navigation.state.params.result.data.agent.length;i++){
if(this.props.navigation.state.params.result.data.agent[i].approved=="1"){
  a3Agent.push(this.props.navigation.state.params.result.data.agent[i])
}
else if (this.props.navigation.state.params.result.data.agent[i].approved=="0"){
  a2Agent.push(this.props.navigation.state.params.result.data.agent[i])

}

}
console.log("a3",a3)
console.log("a3agent",a3Agent)

    i18n.fallbacks = true;
    i18n.translations = { ar, en };

    i18n.locale = this.state.myLang;
    var today = new Date();
   var tomorrow = new Date();
   tomorrow.setDate(today.getDate()+1);
    return (
      <StyleProvider style={getTheme(variables)}>
        <Container style={{ backgroundColor: "#FFF" }}>
          <Header style={{ height: 99, backgroundColor: "#8FCFEB" }}>
            <Left style={{}}>
              <Button
                style={{}}
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon
                  style={{
                    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
                  }}
                  name={Platform.OS === "ios" ? `ios-arrow-back` : "arrow-back"}
                />
              </Button>
            </Left>
            <Body style={styles.header}>
              <Title
                style={[
                  styles.header,
                  {
                    fontSize: 25,
                    width: Dimensions.get("window").width / 2.15,
                    fontFamily: "Acens",
                    marginLeft: 0
                  }
                ]}
              >
                {i18n.t("cartReview")}
              </Title>
            </Body>
           
          </Header>
          <Content style={mainContainerCheckOut}>
           

<View style={{width:"100%",justifyContent:"center",alignItems:"center",paddingStart:3,paddingEnd:3,marginBottom:10}}>
<View style={{width:"95%"}}>
  
                
                {/* <Text
       
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
    color: "#777777"}} >{i18n.t('agent')}</Text> */}




    {this.props.navigation.state.params.result.data.data.map((item, key) => {
     
                return (
                  item.store!=undefined?
                  <View style={{width:"100%"}}>
                  <View style={{backgroundColor:"#8FCFEB",width:"100%",height:90,marginTop:10,paddingStart:3,paddingEnd:3}} key={key}>
                                         <View style={{ height: 5 }} />
                                         {/* <View style={{flexDirection:"row",width:"100%"}}>
                                           {item.approved=="1"?
                     <Text style={{fontFamily:"newFont",fontSize:14,color:"green"}}>{i18n.t('approved')}</Text>
                  :
                  <Text style={{fontFamily:"newFont",fontSize:14,color:"red"}}>{i18n.t('notApproved')}</Text>

                }
                                     

                     </View> */}
                     <View style={{ height: 10 }} />

                   <View style={{flexDirection:"row",width:"100%",justifyContent:"space-between"}}>

                     {I18nManager.isRTl?
                     <Text style={{fontFamily:"newFont",fontSize:12,color:"#fff"}}>{i18n.t('drugStore')}{item.store.drugstore_name_ar}</Text>
                     :
                     <Text style={{fontFamily:"newFont",fontSize:12,color:"#fff"}}>{i18n.t('drugStore')}{item.store.drugstore_name}</Text>

                     }
                                          <Text style={{fontFamily:"newFont",fontSize:12,color:"#fff"}}>{i18n.t('minimumOrder')}{item.store.minimum_order}</Text>

                     </View>

    <View style={{ height: 10 }} />
                     <View style={{flexDirection:"row",width:"100%",justifyContent:"space-between"}}>
                     {item.approved=="1"?

                     <Text style={{fontFamily:"newFont",fontSize:12,color:"green"}}>{i18n.t('totalProduct')}{item.sum}{i18n.t('jod')}</Text>
:
<Text style={{fontFamily:"newFont",fontSize:12,color:"red"}}>{i18n.t('totalProduct')}{item.sum}{i18n.t('jod')}</Text>

                    }
                    <Text style={{fontFamily:"newFont",fontSize:12,color:"#fff"}}>{i18n.t('numberOfProducts')}{item.products.length}</Text>


                     </View>
                     <View style={{ height: 2 }} />

                  </View>
                    {item.products.map((item1, key1) => {
                      return (
                        <View style={{backgroundColor:"#fff",width:"100%",height:100,borderWidth:1,borderColor:"#8FCFEB",paddingEnd:3,paddingStart:3}} key={key1}>
                            <View style={{ height: 5 }} />

<View style={{flexDirection:"row",width:"100%",justifyContent:"space-between"}}>
<Image style={{borderRadius:30,width:60,height:60}} source={{uri: BaseURL +item1.products_image}}/>
{I18nManager.isRTl?

<Text style={{fontFamily:"newFont"}}>{item1.scientific_name_ar}</Text>
:
<Text style={{fontFamily:"newFont"}}>{item1.scientific_name}</Text>

}
  </View>
  <View style={{ height: 10 }} />

  <View style={{flexDirection:"row",width:"100%",justifyContent:"space-between"}}>
<Text>{(item1.cost_price*item1.qty).toFixed(3)}{i18n.t('jod')}</Text>
<Text>{i18n.t('qty')}{item1.qty}</Text>
<Text>{i18n.t('bonus')}{item1.qtybounces}</Text>

  </View>
                          </View>
                      )
                    })}
                    </View>
                                    :null

                );
              })}

{this.props.navigation.state.params.result.data.agent.length>0?
<View>

     {this.props.navigation.state.params.result.data.agent.map((item, key) => {
     
     return (
       item.store!=undefined?
       <View style={{width:"100%"}}>
       <View style={{backgroundColor:"#8FCFEB",width:"100%",height:90,marginTop:10,paddingStart:3,paddingEnd:3}} key={key}>
                              <View style={{ height: 5 }} />
                              {/* <View style={{flexDirection:"row",width:"100%"}}>
                                {item.approved=="1"?
          <Text style={{fontFamily:"newFont",fontSize:14,color:"green"}}>{i18n.t('approved')}</Text>
       :
       <Text style={{fontFamily:"newFont",fontSize:14,color:"red"}}>{i18n.t('notApproved')}</Text>

     }
                          

          </View> */}
          <View style={{ height: 10 }} />

        <View style={{flexDirection:"row",width:"100%",justifyContent:"space-between"}}>

          {I18nManager.isRTl?
          <Text style={{fontFamily:"newFont",fontSize:12,color:"#fff"}}>{i18n.t('SubAgent')}{item.store.manufacturers_name_ar}</Text>
          :
          <Text style={{fontFamily:"newFont",fontSize:12,color:"#fff"}}>{i18n.t('SubAgent')}{item.store.manufacturers_name}</Text>

          }
                               <Text style={{fontFamily:"newFont",fontSize:12,color:"#fff"}}>{i18n.t('minimumOrder')}{item.store.minimum_order}</Text>

          </View>

<View style={{ height: 10 }} />
          <View style={{flexDirection:"row",width:"100%",justifyContent:"space-between"}}>
          {item.approved=="1"?

          <Text style={{fontFamily:"newFont",fontSize:12,color:"green"}}>{i18n.t('totalProduct')}{item.sum}{i18n.t('jod')}</Text>
:
<Text style={{fontFamily:"newFont",fontSize:12,color:"red"}}>{i18n.t('totalProduct')}{item.sum}{i18n.t('jod')}</Text>

         }
         <Text style={{fontFamily:"newFont",fontSize:12,color:"#fff"}}>{i18n.t('numberOfProducts')}{item.products.length}</Text>


          </View>
          <View style={{ height: 2 }} />

       </View>
         {item.products.map((item1, key1) => {
           return (
             <View style={{backgroundColor:"#fff",width:"100%",height:100,borderWidth:1,borderColor:"#8FCFEB",paddingEnd:3,paddingStart:3}} key={key1}>
                 <View style={{ height: 5 }} />

<View style={{flexDirection:"row",width:"100%",justifyContent:"space-between"}}>
<Image style={{borderRadius:30,width:60,height:60}} source={{uri: BaseURL +item1.products_image}}/>
{I18nManager.isRTl?

<Text style={{fontFamily:"newFont"}}>{item1.scientific_name_ar}</Text>
:
<Text style={{fontFamily:"newFont"}}>{item1.scientific_name}</Text>

}
</View>
<View style={{ height: 10 }} />

<View style={{flexDirection:"row",width:"100%",justifyContent:"space-between"}}>
<Text>{(item1.cost_price*item1.qty).toFixed(3)}{i18n.t('jod')}</Text>
<Text>{i18n.t('qty')}{item1.qty}</Text>
<Text>{i18n.t('bonus')}{parseFloat(item1.qtybounces).toFixed(3)}</Text>

</View>
               </View>
           )
         })}
         </View>
                         :null

     );
   })}

       {/* {this.props.navigation.state.params.result.data.agent.map((item, key) => {
                return (
                  <View style={{width:"100%"}}>
                  <View style={{backgroundColor:"#8FCFEB",width:"100%",height:20,marginTop:10,paddingStart:3,paddingEnd:3}} key={key}>
             

                  </View>
                  
                        <View style={{backgroundColor:"#fff",width:"100%",height:100,borderWidth:1,borderColor:"#8FCFEB",paddingEnd:3,paddingStart:3}}>
                            <View style={{ height: 5 }} />

<View style={{flexDirection:"row",width:"100%",justifyContent:"space-between"}}>
<Image style={{borderRadius:30,width:60,height:60}} source={{uri: BaseURL +item.products_image}}/>
{I18nManager.isRTl?

<Text style={{fontFamily:"newFont"}}>{item.scientific_name_ar}</Text>
:
<Text style={{fontFamily:"newFont"}}>{item.scientific_name}</Text>

}
  </View>
  <View style={{ height: 10 }} />

  <View style={{flexDirection:"row",width:"100%",justifyContent:"space-between"}}>
<Text>{item.products_price}{i18n.t('jod')}</Text>
<Text>{i18n.t('qty')}{item.qty}</Text>
<Text>{i18n.t('bonus')}{item.qtybounces}</Text>

  </View>
                          </View>
                
                    </View>
                );
              })} */}

  </View>
:null
  }

                   

                                           <View style={{height:10}}/>

 
           
       
        </View>

        </View>
          </Content>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:'100%'}}>
       



{/* <TouchableOpacity
          onPress={()=>{this.onOrderNOwPressed()}}
          disabled={this.state.fetching_from_server ?true:false}
          style={{width:'47.17%',height:45,backgroundColor:this.state.fetching_from_server ?'gray':'#8FCFEB',justifyContent:'center',alignItems:'center',borderRadius:0,
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
letterSpacing: 0, height:this.state.fetching_from_server? 0:27,
color: 'gray'}}>{i18n.t('makePurchase')}</Text>
 
            {this.state.fetching_from_server ? (
              <ActivityIndicator color="white" style={{ marginLeft: -25.5,}} />
            ) : null}
          </TouchableOpacity> */}
          {a3.length>0||a3Agent.length>0?
                    <TouchableOpacity 
                  onPress={()=>this.onOrderNOwPressed(a3,a2,a3Agent,a2Agent)}

          style={{ width:Dimensions.get('window').width/1.15,height:44,backgroundColor:'#8FCFEB',flexDirection:'row',justifyContent:'center',alignItems:'center'
 ,marginTop: 10 ,marginBottom:30,}} 
//  onPress={() => this.props.navigation.navigate('GetCurrentLocation',{finalPrice:p})}
 >
            <Text style={{fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily:'Acens',
    lineHeight: 19,
    letterSpacing: 0.1,
    textAlign: "center",
    color: "#ffffff"}}>{i18n.t('verify')}</Text>
          </TouchableOpacity>
:
<TouchableOpacity 
// onPress={()=>{this.onOrderNOwPressed()}}

style={{ width:Dimensions.get('window').width/1.15,height:44,backgroundColor:'gray',flexDirection:'row',justifyContent:'center',alignItems:'center'
,marginTop: 10 ,marginBottom:30,}} 
//  onPress={() => this.props.navigation.navigate('GetCurrentLocation',{finalPrice:p})}
>
<Text style={{fontSize: 15,
fontWeight: "normal",
fontStyle: "normal",
fontFamily:'Acens',
lineHeight: 19,
letterSpacing: 0.1,
textAlign: "center",
color: "#ffffff"}}>{i18n.t('verify')}</Text>
</TouchableOpacity>
            }

{/* 
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

</TouchableOpacity> */}
</View>
<View style={{height:10}} />
        </Container>
      </StyleProvider>
    );
  }
}


const mapStateToActions = {
  addItemToOrder: addItem

}

const mapStateToProps= state => ({
  Order: state.AddToOrderReducer.Order

});

export default connect(
  mapStateToProps,
  {...AddOrderAction,...mapStateToActions}
)(ReviewScreen);

{
 
}
