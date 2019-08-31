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
 typeOfOrder:'Type Of Order',
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
 jordan:'Jordan'

 


  
  
 
};
const ar = {
  checkout:'الدفع',

checkOut:'الدفع',

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
typeOfOrder:'نوع الطلب',
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
 jordan:'الاردن'






};
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
class CheckoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  console.log('rahmah choosedate',this.state.chosenDate)
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

  onOrderNOwPressedUrgent(){
    console.log('rrrahmah choosedate',this.state.chosenDate)
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
    client.post(`/app/addtoorder?customers_id=${this.state.userID}&customers_telephone=${this.state.phone}&products[]&products[0][products_id]=${itemId}&products[0][customers_basket_quantity]=${this.props.navigation.state.params.count}&products[0][bounces]=${this.props.navigation.state.params.bonus}&type=${this.state.type}&shipping_date=${this.state.chosenDate}&language_1d=${lang}&total=${finalPri*this.props.navigation.state.params.count}&tax=${((parseFloat(finaltaxF)+parseFloat(finaltaxE)+parseFloat(finaltaxS)).toFixed(3))}`).then((res) => {
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

//}



   
    client.post(`/app/addtoorder?customers_id=${this.state.userID}&type=${this.state.type}&language_1d=${lang}&shipping_date=${this.state.chosenDate}&total=${this.props.navigation.state.params.tota}&tax=${this.props.navigation.state.params.taxes}&customers_telephone=${this.state.phone}&${this.props.navigation.state.params.orderArr}&products[}`
    )
    .then(res => {
      if(res.data.status==200){
        this.setState({fetching_from_server:true})
      
      if(res.data.status==200) {
       this.props.clearCart();
   
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
   
   
  }
  
    
  }

  onOrderNOwPressed(){
    console.log('rrrahmah choosedate',this.state.chosenDate)

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


    let itemId = this.props.navigation.state.params.itemId
console.log("this.props.navigation.state.params.count}&products[0][bounces]=${this.props.navigation.state.params.bonus111111111111111111111111",this.props.navigation.state.params.bonus)
    client.post(`/app/proceedproducts?products[]&products[0][products_id]=${itemId}&products[0][customers_basket_quantity]=${this.props.navigation.state.params.count}&products[0][bounces]=${this.props.navigation.state.params.bonus}`).then((res) => {
      console.log("resss for single product",res)
  if(res.data.status==200){
    this.setState({fetching_from_server:true})
  
  
      if(res.data.status==200) {
    // this.props.navigation.navigate("OrderAddedSuccesfully",{fromCart:'item'});
     this.props.navigation.navigate("ReviewScreen",{result:res,screen:this.props.navigation.state.params.screen,
      totalAfterTax:this.props.navigation.state.params.totalAfterTax,orderArr:this.props.navigation.state.params.orderArr,
      taxes:this.props.navigation.state.params.taxes,count:this.props.navigation.state.params.count,
      singleItem:this.props.navigation.state.params.singleItem,itemId:this.props.navigation.state.params.itemId,
      bonus:this.props.navigation.state.params.bonus,tota:this.props.navigation.state.params.tota,
      zone_price:this.props.navigation.state.params.zone_price,id:this.props.navigation.state.params.id,
      finalPrice:this.props.navigation.state.params.finalPrice,type1:this.state.type,
      chosenDate:this.state.chosenDate
     });

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
    console.log("this.props.navigation.state.params.count}&products[0][bounces]=${this.props.navigation.state.params.bonus2222222222222222222",this.props.navigation.state.params.orderArr)

    client
    .post(
      `/app/proceedproducts?products[]&${this.props.navigation.state.params.orderArr}`
    )
    .then(res => {
      console.log("resssssssssssssssssss",res)
      if(res.data.status==200){
        this.setState({fetching_from_server:true})
      
      if(res.data.status==200) {
      //  this.props.clearCart();
      this.props.navigation.navigate("ReviewScreen",{result:res,screen:this.props.navigation.state.params.screen,
        totalAfterTax:this.props.navigation.state.params.totalAfterTax,orderArr:this.props.navigation.state.params.orderArr,
        taxes:this.props.navigation.state.params.taxes,count:this.props.navigation.state.params.count,
        singleItem:this.props.navigation.state.params.singleItem,itemId:this.props.navigation.state.params.itemId,
        bonus:this.props.navigation.state.params.bonus,tota:this.props.navigation.state.params.tota,
        zone_price:this.props.navigation.state.params.zone_price,id:this.props.navigation.state.params.id,
        finalPrice:this.props.navigation.state.params.finalPrice,type1:this.state.type,
        chosenDate:this.state.chosenDate

       });
      //  this.props.navigation.navigate("OrderAddedSuccesfully",{fromCart:'cart'});
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
    console.log("1111111111111111")

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
   client
      .post(
        `/proceedproducts? ${b
          .split(",")
          .join("&")}&products[]
        }`
      )
      .then(res => {
       console.log("resssss",res)
        if (res.data.status === 200) {
          this.props.clearCart();
           


          this.props.navigation.navigate("OrderAddedSuccesfully",{fromCart:'cart'});
        }
      });

    }
  };
  render() {
    console.log("this.state.type",this.state.type)
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
                {i18n.t("checkout")}
              </Title>
            </Body>
           
          </Header>
          <Content style={mainContainerCheckOut}>
           


<View style={[MyAddressStyle.floatingView,{paddingTop:0}]}>
                
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
fontFamily: "newFont",
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
minDate={tomorrow}
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
<Text style={{fontFamily: 'numFont',
fontSize: 13,
fontWeight: 'bold',
fontStyle: "normal",
letterSpacing: 0,
color: 'white'}}>{this.props.navigation.state.params.totalAfterTax}{i18n.t('jod')}</Text>

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

           
          </Content>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',width:'100%'}}>
        
        <View 

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
<Text style={{fontFamily: ' numFont',
fontSize: 13,
fontWeight: 'bold',
fontStyle: "normal",
letterSpacing: 0,
color: 'gray'}}>{this.props.navigation.state.params.totalAfterTax}{' '+i18n.t('jod')}</Text>

</View>
<View style={{height:45,width:1,opacity:0.01,backgroundColor:'gray'}}/>


{this.state.type!=2?
<TouchableOpacity
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
    {/* <Image  style={{ height:this.state.fetching_from_server? 0:27,width:27}}  source={require('../assets/images/loadmore.png')}/> */}
            {this.state.fetching_from_server ? (
              <ActivityIndicator color="white" style={{ marginLeft: -25.5,}} />
            ) : null}
          </TouchableOpacity>
          :
          <TouchableOpacity
          onPress={()=>{this.onOrderNOwPressedUrgent()}}
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
    {/* <Image  style={{ height:this.state.fetching_from_server? 0:27,width:27}}  source={require('../assets/images/loadmore.png')}/> */}
            {this.state.fetching_from_server ? (
              <ActivityIndicator color="white" style={{ marginLeft: -25.5,}} />
            ) : null}
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
  getCategories: {}
};

const mapStateToProps = state => ({
  Order: state.AddToOrderReducer.Order
});

export default connect(
  mapStateToProps,
  AddOrderAction
)(CheckoutScreen);

{
 
}
