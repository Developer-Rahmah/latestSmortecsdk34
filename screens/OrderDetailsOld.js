import React, { Component } from "react";
import { Images, Fonts, Metrics, Colors } from '../Themes';

import { StyleSheet,View,TouchableOpacity ,TextInput,Dimensions,Platform,Image,Modal,AsyncStorage,FlatList,ScrollView,I18nManager,ActivityIndicator} from 'react-native'
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
    Form,Picker,
    StyleProvider,ListItem,
    Text,Card,Radio,Label
} from "native-base";
import MyOrdersStyles from '../css/MyOrdersStyles';
import {connect} from "react-redux";
import {CLEAR_CART} from '../actions/types';
import client from '../api/constant';
import getTheme from '../native-base-theme/components';
import variables from '../native-base-theme/variables/variables';
import styles from '../css/styles'
import { showMessage, hideMessage } from "react-native-flash-message";
import * as AddOrderAction from '../actions/AddToOrder';
import { OrderedItem } from '../UI_Commponents/OrderedItem';
import { Localization } from 'expo-localization';
import Expo from 'expo';
import DatePicker from 'react-native-datepicker'



import i18n from 'i18n-js';
let lang;
var timesArr=['9 am - 10 am','10 am - 11 am','11 am - 12 pm' ,'12 pm - 1 pm','1 pm - 2 pm','2 pm - 3 pm', '3 pm - 4 pm','4 pm - 5 pm', '5 pm - 6 pm']
const en = {
    home: 'Home',
    wishlist: 'Wishlist',
    settings:'Settings',
    whereToBuy:'Where To Buy',
    checkout:'CHECK OUT',
    orderNow:'ORDER NOW',
    orderId:'Order ID',
    date:'Date',
    price:'Price',
    status:'Status',
    jod:'JOD',
    qty:'Qty',
    cancel:'CANCEL',
    name:'Name',
    orderDetails:'ORDER DETAILS',
    productImage:'Product Image',
    proceed:'proceed',
    bounces:'bounces',
    complete:'Complete',
    filter:'Filter',
    pending:'Pending',
    approved:'Approved',
    rejected:'Rejected',
    canceled:'Canceled',
    proceed:'Proceed',
    filterOrders:'Filter Orders',
    noResult:'No Result Found',
    shippingDate:'Sending Date'

   
    
   
};
const ar = {
  home: 'الرئيسية',
  wishlist: 'المفضلة',
  settings:'الاعدادات',
  whereToBuy:'اماكن التواجد',
  checkout:'الدفع',
  orderNow:'اطلب الآن',
  orderId:'رقم الطلب',
  date:'التاريخ',
  price:'السعر',
  status:'حالة الطلب',
  jod:'دينار',
  qty:'الكمية',
  cancel:'الغاء',
  name:'الاسم',
  orderDetails:'تفاصيل الطلب',
  productImage:'صورة المنتج',
  proceed:'بدء العملية',
  bounces:'البونص',
  complete:'اتمام',
  filter:'فلتر',
  pending:'بانتظار الموافقة',
 approved:'تمت الموافقة',
 rejected:'المرفوض',
 canceled:'تم الالغاء',
 proceed:'قيد التحضير',
 filterOrders:'فلترة الطلبات',
 noResult:'لا يوجد نتائج',
 shippingDate:'تاريخ الارسال'




};
let BaseURL = 'https://smortec.com/';


const { textInputStyle,checkOutText,mainContainerCheckOut,firstViewInCheckOut,pickerContinerInCheckOut,iosPickerIconStyle,pickerStyle,makePurchaseContainer,makePurchaseTouchable,makePurchaseText,itemTextStyleICheckoutPicker,textStyleInCheckoutPicker } = styles
let a=[];
class OrderDetailsOld extends Component {
    constructor (props){
        super(props);
        loading=false
        this.state ={
            isModalSortVisible: false,
            statusArr:[],
            canceldArr:[],
            proccedArr:[],
            proccedCancelinallOrder:false,
            caceld:false,
            orderDetailsArr:[],
            data: [
				{
					id: 1,
					OrderID: '#101238646',
					Date: '08/05/2015',
					Product: 'W-Faux Leather With Quilted Sleeve',
					Price: '$160.00',
					Status: 'Complete',
				},
				{
					id: 2,
					OrderID: '#101897696',
					Date: '08/05/2016',
					Product: 'Customized Amato Racing Leather Jacket with Artwork',
					Price: '$180.00',
					Status: 'Cancel',
				},
				{
					id: 3,
					OrderID: '#201345690',
					Date: '11/04/2017',
					Product: 'Fashionable Denim & Leather Jacket',
					Price: '$120.00',
					Status: 'Complete',
				},
			],
            paymentMethod: null,
            myLang: AsyncStorage.getItem("myLang").then((value) => {
                this.setState({ "myLang": value })
            }).done()
            ,
        
selected:1,
paymentMethodModalVisibality: false,
codSelected:true,
othersSelected:false,
payPalSelected:false,
visaSelected:false,
userID:'',
username: '',
city: '',
address:'',
email:'',
phone:'',
chosenDate: new Date(),

userCity:'',
userAddress:'',
cityBottomColor:'#c1c0c9',
addressBottomColor:'#c1c0c9',
products:this.props.Order,

// finalArr:[ 

//     {
//         products_id
//     },
//     {
//         products_name
//     },
//     {
//         price
//     },
//     {
//         customers_basket_quantity
//     },
//     {final_price
//     }
// ]

        }
    }
    setModalVisible(visible) {
        this.setState({ paymentMethodModalVisibality: visible });
    }
codPressed(){
    this.setState({codSelected:true,
    othersSelected:false,
    visaSelected:false,
    payPalSelected:false})
}
othersPressed(){
    this.setState({codSelected:false,
    othersSelected:true})
    this.setModalVisible(true)
}
visaPressed(){
    this.setState({codSelected:false,
    
visaSelected:true,
payPalSelected:false})
this.setModalVisible(false)
}
payPalPressed(){
    this.setState({codSelected:false,
   
visaSelected:false,
payPalSelected:true})
this.setModalVisible(false)

}
    onValueChange(value) {
        this.setState({
            selected: value
        });
    }
    canclePressed(){
        this.setModalVisible(false)
      this.codPressed()
    }
    static navigationOptions = {
        header:null
        // title: 'Check out',
        // headerStyle: {
        //     backgroundColor: '#86764f',fontFamily:'helivet',color:'white',height:77,
        //     elevation: null
        // },
        // headerTitleStyle: {
        //     fontFamily:'helivet',color:'white',fontSize:25
        // }
    };

    _retrieveData = async () => {
        this.setState({loading:true})
        console.log('all states',this.state)
        try {
          const value = await AsyncStorage.getItem('userID');
          const namevalue =  await AsyncStorage.getItem("userName"); 
          const phonevalue = await AsyncStorage.getItem("userPhone");
          const passwvalue = await AsyncStorage.getItem("userPassword");
          const userEmail = await AsyncStorage.getItem("userEmail");
          const userCity = await AsyncStorage.getItem('userCity');
          const userAddress = await AsyncStorage.getItem('userAddress');
          console.log('new data',userCity,',',userAddress)
          const myLang = await AsyncStorage.getItem('myLang');
      
      
          if(myLang=='ar'){
            lang=4;
          }else{
            lang=1;
          }
          if (value !== null) {
            // We have data!!
            console.log('userid:',value);
            console.log('namevalue:',namevalue);
            console.log('phonevalue:',phonevalue);
            console.log('passwvalue:',passwvalue);
            console.log('userEmail:',userEmail);

      this.setState({
        userID:value,
        username:namevalue,
        phone:phonevalue,
        // userPassword:passwvalue,
        email:userEmail,
        userCity:userCity,
        userAddress:userAddress

      })
         
      console.log("hereeeeeeeeeeeeeeeeeeeeeeee",loading)
      client.post(`app/oldorders?customers_id=${value}`
        
      ).then((res) => {
          this.setState({loading:false})
          console.log('all orders3333333',res.data.data)
          console.log('all orders in index'+ res.data.data[this.props.navigation.state.params.index ].data+'is',)

         this.setState({orderDetailsArr:res.data.data[this.props.navigation.state.params.index].data})
         console.log('all orders in orderDetailsArr',this.state.orderDetailsArr)

    for(let i=0;i<=this.state.orderDetailsArr.length;i++){
        // if(res.data.data[this.props.navigation.state.params.index ].data[i].status==4 || res.data.data[this.props.navigation.state.params.index ].data[i].status==5 ){
        //     this.setState({proccedCancelinallOrder:true})
        // }else{
        //     this.setState({proccedCancelinallOrder:false})
        // }
        console.log('iiiiiiii',this.state.orderDetailsArr[i].status)


        if(this.state.orderDetailsArr[i].status==4){
            this.setState({
                canceldArr: [...this.state.canceldArr, this.state.orderDetailsArr[i].status_name]
              })
              console.log('canceldArr res',this.state.orderDetailsArr[i].status_name)

            }else  if(this.state.orderDetailsArr[i].status==5){
                this.setState({
                    proccedArr: [...this.state.proccedArr, this.state.orderDetailsArr[i].status_name]
                  })
                  console.log('procced res',this.state.orderDetailsArr[i].status_name)

                }
                

    }
    console.log('canceldArr state',this.state.canceldArr)
    console.log('proccedArr state',this.state.proccedArr)

    })


          }
        } catch (error) {
            this.setState({loading:false})
            // Error retrieving data
          console.log('getstorageitemerrrror',error);
        }
        
      };
      componentWillMount() {
        // if (I18nManager.isRTL)
        // {
        //   lang=4;
        // }
        // else{
        //   lang=1;
        // }
        //     this._retrieveData()
        //     if(this.props.Order.length>0){
              
          
        //     }
            
        this._retrieveData()
        // for(let i=0;i<=this.state.ExperienceArr.length;i++){

        // }
         
       
      }
       registerUser(data){
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
        })
        .then(res => res.json())
        .then((apiResponse)=>{ 
            console.log("api response", apiResponse) 
            return {
                type: "REGISTER_USER",
                api_response: apiResponse.data
            }
        })
        .catch(function (error) {
            return {
                type: "REGISTER_USER",
                api_response: {success: false}
            }
        })
}


handelCompleted(){
    return(
        <View style={MyOrdersStyles.rowField}>
        {/* <Text style={MyOrdersStyles.fieldLabelTxt}></Text> */}
        {/* <TouchableOpacity
        onPress={() => this.DeleteOrder(item.orders_products_id,index,1) }
        // onpress={()=>{this.DeleteProduct(item.products_id,item.orders_id)}}
         style={{width:'49.5%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center'}}> 
        <Text style={{textAlign:'center',color:'white'}} >{i18n.t('proceed')} </Text>
        </TouchableOpacity> */}
    <View style={{width:5}}/>
        <TouchableOpacity
        onPress={() => this.DeleteOrder(item.orders_products_id,index,0) }
        // onpress={()=>{this.DeleteProduct(item.products_id,item.orders_id)}}
         style={{width:'100%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center'}}> 
        <Text style={{textAlign:'center',color:'white'}} >{i18n.t('complete')} </Text>
        </TouchableOpacity>
    </View>  

    )
}

    _handlePress = async () => {
        // save the lang in storage
//         if(this.state.city.length>0&this.state.address.length>0){
//             this.setState({cityBottomColor:'#c1c0c9'})
//             this.setState({addressBottomColor:'#c1c0c9'})
// if(this.state.username==''|| this.state.city=='' || this.state.email==''|| this.state.address==''){
//     showMessage({
//         message: "something went wrong",
//         type: "danger",
//       });

        
// }else{
       
        for(let i=0;i<this.state.products.length;i++){
        //  a=`products[${i}][products_id]=${this.state.products[i].products_id} &
        //  products[${i}][customers_basket_quantity]=${this.state.products[i].customers_basket_quantity}`
a.push(`products[${i}][products_id]=${this.state.products[i].products_id}&products[${i}][products_price]=${this.state.products[i].final_price}&products[${i}][customers_basket_quantity]=${this.state.products[i].customers_basket_quantity}`)
    }
//}
    console.log('cheeeeckout array',a)
    console.log('str arr',a.toString())
    let b=a.toString()
    b.replace(",","&")
    console.log('str after replacing',b.split(",").join("&"))
    console.log('all params','userid',this.state.userID,
    'username',this.state.username,
    'phone',this.state.phone,
    'address',this.state.userAddress,
   'city', this.state.userCity,
   'finalprice',this.props.navigation.state.params.finalPrice,
   'array',b.split(",").join("&"))
console.log('final final request',`/addtoorder?customers_id=${this.state.userID}&delivery_firstname=${this.state.username}&customers_telephone=${this.state.phone}
&delivery_street_address=${this.state.userAddress}&delivery_city=${this.state.userCity}&total=${this.props.navigation.state.params.finalPrice}&products[]&
&payment_method=cod&language_id=${lang}&${b.split(",").join("&")}`)
    // client.post(`/addtoorder?customers_id=${this.state.userID}&delivery_firstname=${this.state.username}&customers_telephone=${this.state.phone}
    //     &delivery_street_address=${this.state.userAddress}&delivery_city=${this.state.userCity}&total=${this.props.navigation.state.params.finalPrice}&products[]&
    // &payment_method=cod&language_id=1&${b.split(",").join("&")}`)
        client.post(`/addtoorder?customers_id=${this.state.userID}&delivery_firstname=${this.state.username}&customers_telephone=${this.state.phone}&delivery_city=${this.state.userCity}&total=${this.props.navigation.state.params.finalPrice}&payment_method=cod&language_id=${lang}& ${b.split(",").join("&")}&products[&city_id=1&billing_street_address=${this.state.userAddress}`)
        .then((res) => {
            console.log('shipning address',res)
             if(res.data.message==='Order has been placed successfully.'){
                 console.log('order arr before removing',this.props.Order)
                 this.props.clearCart();
                 console.log('order arr afteeer removing',this.props)

                this.props.navigation.navigate('OrderAddedSuccesfully')  
            }

  })


    }
    setSortModalVisible(visible) {
        this.setState({ isModalSortVisible: visible });
      } 
DeleteProduct(orders_products_id,index,type){ 
    let newItem = this.state.orderDetailsArr;
    console.log(' ondelet preesed ')

    client.post(`/app/cancelproduct?orders_products_id=${orders_products_id}&type=${type}`
        
    ).then((res) => {
        console.log('cancelproduct id ',res)
       if(res.data.status==200){
        client.post(`app/getorders?customers_id=${this.state.userID}`
        
        ).then((res) => {
            console.log('all orders44444',res.data.data)
          console.log('all orders in index'+ res.data.data[this.props.navigation.state.params.index ].data+'is',)

         this.setState({orderDetailsArr:res.data.data[this.props.navigation.state.params.index].data})
         console.log('all orders in orderDetailsArr',this.state.orderDetailsArr)

    for(let i=0;i<=this.state.orderDetailsArr.length;i++){
        // if(res.data.data[this.props.navigation.state.params.index ].data[i].status==4 || res.data.data[this.props.navigation.state.params.index ].data[i].status==5 ){
        //     this.setState({proccedCancelinallOrder:true})
        // }else{
        //     this.setState({proccedCancelinallOrder:false})
        // }

        if(this.state.orderDetailsArr[i].status==4){
            this.setState({
                canceldArr: [...this.state.canceldArr, this.state.orderDetailsArr[i].status_name]
              })
              console.log('canceldArr res',this.state.orderDetailsArr[i].status_name)

            }else  if(this.state.orderDetailsArr[i].status==5){
                this.setState({
                    proccedArr: [...this.state.proccedArr, this.state.orderDetailsArr[i].status_name]
                  })
                  console.log('procced res',this.state.orderDetailsArr[i].status_name)

                }
                

    }
    console.log('canceldArr state',this.state.canceldArr)
    console.log('proccedArr state',this.state.proccedArr)

    })
  
  
        console.log('cancelproduct id ',res)
        if(type=0){
           this.setState({caceld:true})
 
        }else{
            this.setState({caceld:false})

        }
       
        // newItem.splice(index, 1)
        // this.setState({ orderDetailsArr: newItem })

        // this.props.navigation.navigate('Home')
       }
       console.log(' afteeeer delet preesed ',this.state.orderDetailsArr)
  
  })

}
statusSort(statusVal) {
    this.setState({loading:true})
    this.setState({data:[]})
    this.setSortModalVisible(false)
   
client.post(`app/oldorders?customers_id=${this.state.userID}&status=${statusVal}`
        
).then((res) => {
    this.setState({loading:false})

    console.log('all orders555555',res.data.data)
    console.log('all orders in index'+ res.data.data[this.props.navigation.state.params.index ].data+'is',)

   this.setState({orderDetailsArr:res.data.data[this.props.navigation.state.params.index].data})
   console.log('all orders in orderDetailsArr11111',this.state.orderDetailsArr)

for(let i=0;i<=this.state.orderDetailsArr.length;i++){
  // if(res.data.data[this.props.navigation.state.params.index ].data[i].status==4 || res.data.data[this.props.navigation.state.params.index ].data[i].status==5 ){
  //     this.setState({proccedCancelinallOrder:true})
  // }else{
  //     this.setState({proccedCancelinallOrder:false})
  // }
  console.log('iiiiiiii',this.state.orderDetailsArr[i].status)


  if(this.state.orderDetailsArr[i].status==4){
      this.setState({
          canceldArr: [...this.state.canceldArr, this.state.orderDetailsArr[i].status_name]
        })
        console.log('canceldArr res',this.state.orderDetailsArr[i].status_name)

      }else  if(this.state.orderDetailsArr[i].status==5){
          this.setState({
              proccedArr: [...this.state.proccedArr, this.state.orderDetailsArr[i].status_name]
            })
            console.log('procced res',this.state.orderDetailsArr[i].status_name)

          }
          

}
console.log('canceldArr state',this.state.canceldArr)
console.log('proccedArr state',this.state.proccedArr)

})
}
  
DeleteOrder(orders_id,type){ 
    let newItem = this.state.orderDetailsArr;
    console.log(' ondelet preesed ')

    client.post(`/app/proceedorder?orders_id=${orders_id}&type=${type}`
        
    ).then((res) => {
        console.log('cancelproduct id ',res)
       if(res.data.status==200){
        client.post(`app/getorders?customers_id=${this.state.userID}`
        
        ).then((res) => {
            console.log('all orders222222222',res.data.data)
          console.log('all orders in index'+ res.data.data[this.props.navigation.state.params.index ].data+'is',)

         this.setState({orderDetailsArr:res.data.data[this.props.navigation.state.params.index].data})
         console.log('all orders in orderDetailsArr',this.state.orderDetailsArr)

    for(let i=0;i<=this.state.orderDetailsArr.length;i++){
        // if(res.data.data[this.props.navigation.state.params.index ].data[i].status==4 || res.data.data[this.props.navigation.state.params.index ].data[i].status==5 ){
        //     this.setState({proccedCancelinallOrder:true})
        // }else{
        //     this.setState({proccedCancelinallOrder:false})
        // }
console.log('iiiiiiii',this.state.orderDetailsArr[i])
        if(this.state.orderDetailsArr[i].status==4){
            this.setState({
                canceldArr: [...this.state.canceldArr, this.state.orderDetailsArr[i].status_name]
              })
              console.log('canceldArr res',this.state.orderDetailsArr[i].status_name)

            }else  if(this.state.orderDetailsArr[i].status==5){
                this.setState({
                    proccedArr: [...this.state.proccedArr, this.state.orderDetailsArr[i].status_name]
                  })
                  console.log('procced res',this.state.orderDetailsArr[i].status_name)

                }
                

    }
    console.log('canceldArr state',this.state.canceldArr)
    console.log('proccedArr state',this.state.proccedArr)

    })
  
  
        console.log('cancelproduct id ',res)
        if(type=0){
           this.setState({caceld:true})
 
        }else{
            this.setState({caceld:false})

        }
       
        // newItem.splice(index, 1)
        // this.setState({ orderDetailsArr: newItem })

        // this.props.navigation.navigate('Home')
       }
       console.log(' afteeeer delet preesed ',this.state.orderDetailsArr)
  
  })

}

handeleAllOrderAction(){
    // for(let i=0;i<=this.state.orderDetailsArr.length;i++){
    //     if(i)
    // }
// if(this.state.proccedCancelinallOrder){
if(this.state.canceldArr.length>0 && this.state.proccedArr.length>0){


    return(
        <View style={MyOrdersStyles.rowField}>
            {/* <Text style={MyOrdersStyles.fieldLabelTxt}></Text> */}
            <TouchableOpacity
            onPress={() => this.DeleteOrder(this.props.navigation.state.params.orders_id,1) }
            // onpress={()=>{this.DeleteProduct(item.products_id,item.orders_id)}}
             style={{width:'49.5%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center'}}> 
            <Text style={{textAlign:'center',color:'white'}} >{i18n.t('proceed')} </Text>
            </TouchableOpacity>
        <View style={{width:5}}/>
            <TouchableOpacity
            onPress={() => this.DeleteOrder(this.props.navigation.state.params.orders_id,0) }
            // onpress={()=>{this.DeleteProduct(item.products_id,item.orders_id)}}
             style={{width:'49.5%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center'}}> 
            <Text style={{textAlign:'center',color:'white'}} >{i18n.t('cancel')} </Text>
            </TouchableOpacity>
        </View>    
    )
} else if(this.state.canceldArr.length>0&& this.state.proccedArr.length==0){
    return(
        <View style={MyOrdersStyles.rowField}>
            {/* <Text style={MyOrdersStyles.fieldLabelTxt}></Text> */}
            {/* <TouchableOpacity
            onPress={() => this.DeleteOrder(item.orders_products_id,index,1) }
            // onpress={()=>{this.DeleteProduct(item.products_id,item.orders_id)}}
             style={{width:'49.5%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center'}}> 
            <Text style={{textAlign:'center',color:'white'}} >{i18n.t('proceed')} </Text>
            </TouchableOpacity>
        <View style={{width:5}}/> */}
            <TouchableOpacity
            onPress={() => this.DeleteOrder(this.props.navigation.state.params.orders_products_id,0) }
            // onpress={()=>{this.DeleteProduct(item.products_id,item.orders_id)}}
             style={{width:'49.5%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center'}}> 
            <Text style={{textAlign:'center',color:'white'}} >{i18n.t('cancel')} </Text>
            </TouchableOpacity>
        </View>    
    )
}else if(this.state.canceldArr.length==0&& this.state.proccedArr.length==0){
    return(
        <View style={MyOrdersStyles.rowField}>
            {/* <Text style={MyOrdersStyles.fieldLabelTxt}></Text> */}
            {/* <TouchableOpacity
            onPress={() => this.DeleteOrder(item.orders_products_id,index,1) }
            // onpress={()=>{this.DeleteProduct(item.products_id,item.orders_id)}}
             style={{width:'49.5%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center'}}> 
            <Text style={{textAlign:'center',color:'white'}} >{i18n.t('proceed')} </Text>
            </TouchableOpacity>
        <View style={{width:5}}/> */}
            <TouchableOpacity
            onPress={() => this.DeleteOrder(this.props.navigation.state.params.orders_products_id,0) }
            // onpress={()=>{this.DeleteProduct(item.products_id,item.orders_id)}}
             style={{width:'49.5%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center'}}> 
            <Text style={{textAlign:'center',color:'white'}} >{i18n.t('cancel')} </Text>
            </TouchableOpacity>
        </View>    
    )
}
// }else{
//     return(
//         null
//     )
// }
}


handelButtons(item,index){
    if(item.status==1){
return(
    <View style={MyOrdersStyles.rowField}>
    {/* <Text style={MyOrdersStyles.fieldLabelTxt}></Text> */}
    {/* <TouchableOpacity
    onPress={() => this.DeleteProduct(item.products_id,item.orders_id,index,1) }
    // onpress={()=>{this.DeleteProduct(item.products_id,item.orders_id)}}
     style={{width:'49.5%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center'}}> 
    <Text style={{textAlign:'center',color:'white'}} >{i18n.t('proceed')} </Text>
    </TouchableOpacity>
<View style={{width:5}}/> */}
    <TouchableOpacity
    onPress={() => this.DeleteProduct(item.orders_products_id,index,0) }
    // onpress={()=>{this.DeleteProduct(item.products_id,item.orders_id)}}
     style={{width:'49.5%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center'}}> 
    <Text style={{textAlign:'center',color:'white'}} >{i18n.t('cancel')} </Text>
    </TouchableOpacity>
</View>  
);
    }else if(item.status==2){
        return(
            <View style={MyOrdersStyles.rowField}>
            {/* <Text style={MyOrdersStyles.fieldLabelTxt}></Text> */}
            <TouchableOpacity
            onPress={() => this.DeleteProduct(item.orders_products_id,index,1) }
            // onpress={()=>{this.DeleteProduct(item.products_id,item.orders_id)}}
             style={{width:'49.5%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center'}}> 
            <Text style={{textAlign:'center',color:'white'}} >{i18n.t('proceed')} </Text>
            </TouchableOpacity>
        <View style={{width:5}}/>
            <TouchableOpacity
            onPress={() => this.DeleteProduct(item.orders_products_id,index,0) }
            // onpress={()=>{this.DeleteProduct(item.products_id,item.orders_id)}}
             style={{width:'49.5%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center'}}> 
            <Text style={{textAlign:'center',color:'white'}} >{i18n.t('cancel')} </Text>
            </TouchableOpacity>
        </View>    
        );
        
    }else if(item.status==3){
        return(
            <View style={MyOrdersStyles.rowField}>
            {/* <Text style={MyOrdersStyles.fieldLabelTxt}></Text> */}
            {/* <TouchableOpacity
            onPress={() => this.DeleteProduct(item.products_id,item.orders_id,index,1) }
            // onpress={()=>{this.DeleteProduct(item.products_id,item.orders_id)}}
             style={{width:'49.5%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center'}}> 
            <Text style={{textAlign:'center',color:'white'}} >{i18n.t('proceed')} </Text>
            </TouchableOpacity>
        <View style={{width:5}}/> */}
            <TouchableOpacity
            onPress={() => this.DeleteProduct(item.orders_products_id,index,0) }
            // onpress={()=>{this.DeleteProduct(item.products_id,item.orders_id)}}
             style={{width:'49.5%',height:45,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center'}}> 
            <Text style={{textAlign:'center',color:'white'}} >{i18n.t('cancel')} </Text>
            </TouchableOpacity>
        </View>  
        );
    }else if(item.status==4){
        return(
            null
        );

    }
    else if(item.status==5){
        return(
            null
        );
    }
}

    render() {
        i18n.fallbacks = true;
        i18n.translations = { ar, en };
        //i18n.locale =null;
        console.log('test:' + this.state.myLang);
    
        i18n.locale = this.state.myLang;
        console.log("hereee",this.props)
        // console.log('order array final',this.state.products[1].products_id)
        return (
            <StyleProvider style={getTheme(variables)}>
                <Container style={{ backgroundColor: "#FFF"}}>
                {/* <Header style={{height:99,backgroundColor:'#8FCFEB'}}>
        
        <Left style={{}}>
        <Button style={{}} transparent onPress={() => this.props.navigation.goBack()}>
        <Icon
         style={{  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],}}
        name={
        Platform.OS === 'ios'
          ? `ios-arrow-back`
          : 'arrow-back'
      }  />
                  </Button>
           
        </Left>
        <Body style={[styles.header,{width:Dimensions.get('window').width/1.2,justifyContent:'center',alignItems:'center'}]}>
              <Title style={[styles.header,{fontSize:25,width:Dimensions.get('window').width/1.4,fontFamily:'helivet',marginStart:-40}]}>{i18n.t('orderDetails')}</Title>
            </Body>
          
        </Header>  */}

<Header style={{height:99,backgroundColor:'#8FCFEB'}}>
        
        <Left>
        <Button style={{}} transparent onPress={() => this.props.navigation.goBack()}>
        <Icon
         style={{  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],}}
        name={
        Platform.OS === 'ios'
          ? `ios-arrow-back`
          : 'arrow-back'
      }  />
                  </Button>
           
        </Left>
        <Body style={[styles.header,{width:Dimensions.get('window').width,justifyContent:'center',alignItems:'center'}]}>
              <Title style={[styles.header,{fontSize:25,width:Dimensions.get('window').width/1.5,fontFamily:'Acens',marginStart:0}]}>{i18n.t('orderDetails')}</Title>
            </Body>
            <Right style={{width:100,justifyContent:'flex-end',marginRight:-100}} >
              <Body> 
              <View 
//      onPress={() =>
//       this.props.navigation.navigate('OrderScreen')

//   }
    style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

           {/* <Text style={{ fontFamily: "newFont",
  fontSize: 10,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  color: "#c1c0c9"}}>Cart</Text> */}
</View>
               
</Body>
            </Right>
        </Header> 

        <Content style={MyOrdersStyles.content}>
        <View style={{
            backgroundColor: '#f3f3f3',
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
                  fontFamily: "Acens",
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
{!this.state.loading?
this.state.orderDetailsArr.length>0?
				        <View>
        {this.state.orderDetailsArr.map((item, index) => {
            console.log("iteeeeem",item)
						return (
							<View
								style={
									item.orders_id === 1
										? [MyOrdersStyles.rowBg, { marginTop: 50 }]
										: MyOrdersStyles.rowBg
								}
								key={index}>
                                  <View style={[MyOrdersStyles.rowField]}>
                                  <Image source={{uri: BaseURL +item.image}} style={{ 	width: 300,height: 300}}/>
                                </View>
								<View style={[MyOrdersStyles.rowListDivider,{marginTop:0}]} />
								<View style={MyOrdersStyles.rowField}>
									<Text style={MyOrdersStyles.fieldLabelTxt}>{i18n.t('orderId')}</Text>
									<Text style={MyOrdersStyles.fieldDescriptionTxt}>{item.orders_id}</Text>
								</View>
								<View style={MyOrdersStyles.rowListDivider} />

								<View style={MyOrdersStyles.rowField}>
									<Text style={MyOrdersStyles.fieldLabelTxt}>{i18n.t('name')}</Text>
									<Text style={MyOrdersStyles.fieldDescriptionTxt}>{item.products_name}</Text>
								</View>
                                <View style={MyOrdersStyles.rowListDivider} />

                             
								<View style={MyOrdersStyles.rowField}>
									<Text style={MyOrdersStyles.fieldLabelTxt}>{i18n.t('price')}</Text>
									<Text style={[MyOrdersStyles.fieldDescriptionTxt,{fontFamily: 'numFont'}]}>{item.products_price}{i18n.t('jod')}</Text>
								</View>
                                <View style={MyOrdersStyles.rowListDivider} />

<View style={MyOrdersStyles.rowField}>
    <Text style={MyOrdersStyles.fieldLabelTxt}>{i18n.t('shippingDate')}</Text>
    <Text style={MyOrdersStyles.fieldDescriptionTxt}>{this.props.navigation.state.params.shipping_date} </Text>
</View>
								<View style={MyOrdersStyles.rowListDivider} />

                                <View style={MyOrdersStyles.rowField}>
									<Text style={[MyOrdersStyles.fieldLabelTxt,{fontFamily: 'numFont'}]}>{i18n.t('qty')}</Text>
									<Text style={MyOrdersStyles.fieldDescriptionTxt}>{item.products_quantity}</Text>
								</View>

                                <View style={MyOrdersStyles.rowListDivider} />

<View style={MyOrdersStyles.rowField}>
    <Text style={[MyOrdersStyles.fieldLabelTxt,{fontFamily: 'numFont'}]}>{i18n.t('bounces')}</Text>
    {item.bounces!=""&&item.bounces!=null?
    <Text style={MyOrdersStyles.fieldDescriptionTxt}>{item.bounces}</Text>
    :
    <Text style={MyOrdersStyles.fieldDescriptionTxt}>0</Text>

                            }
</View>

								<View style={MyOrdersStyles.rowListDivider} />


								<View style={MyOrdersStyles.rowField}>

									<Text style={MyOrdersStyles.fieldLabelTxt}>{i18n.t('status')}</Text>
									<Text
										style={
											item.Status == 'Complete'
												? [MyOrdersStyles.fieldDescriptionTxt, { color: '#00ff00' }]
                                                : [MyOrdersStyles.fieldDescriptionTxt, { color: '#f0b949' }]
                                                
                                                
										}>
                                        {this.state.caceld?'canceled':item.status_name}
									</Text>
								</View>
                                <View style={MyOrdersStyles.rowListDivider} />


                              
                          {/* {  this.handelButtons(item,index)} */}
                        
                        
								<View style={MyOrdersStyles.rowListDivider} />
                            
                          

                                                </View>

						);
                    })}
                    </View>
                    :
<View style={{justifyContent:"center",alignItems:"center",marginTop:70}}>
    <Text style={{fontFamily:"newFont",color:"#787878"}}>{i18n.t('noResult')}</Text>
</View>
                :
                <View style={{justifyContent:"center",alignItems:"center",marginTop:70}}>
      <ActivityIndicator style={styles.loader} size="large" color="#8FCFEB" />
</View>
                }
                
							{/* <View
								style={
								
										 [MyOrdersStyles.rowBg, { marginTop: Metrics.WIDTH * 0.05 }]
										
								}
								>
								<View style={MyOrdersStyles.rowField}>
									<Text style={MyOrdersStyles.fieldLabelTxt}>Order ID</Text>
									<Text style={MyOrdersStyles.fieldDescriptionTxt}>{this.props.navigation.state.params.id}</Text>
								</View>
								<View style={MyOrdersStyles.rowListDivider} />


                                <View style={MyOrdersStyles.rowField}>
									<Text style={MyOrdersStyles.fieldLabelTxt}>Product Name</Text>
									<Text style={MyOrdersStyles.fieldDescriptionTxt}>{this.props.navigation.state.params.name}</Text>
								</View>
								<View style={MyOrdersStyles.rowListDivider} />

                              
							</View>
                 */}


<Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.isModalSortVisible}
                        onRequestClose={() => {
                            this.setSortModalVisible(false);
                        }}>
                        <View style={{ marginTop: 50, marginEnd: 20, marginStart: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Card style={{ borderRadius: 0 }}>
                                {/* <View style={{ paddingEnd: 10, paddingStart: 10, paddingTop: 5, paddingBottom: 10 }}>


                                    <TouchableOpacity
                                    style={{alignItems:'flex-start'}}
                                        onPress={() => {
                                            this.setModalVisible(!this.state.forgetPasswordModalVisibal);
                                        }}>
                                        <Text style={{ fontSize: 25, color: 'rgba(161, 161, 161, 1)', fontFamily: 'newFont',}}>x</Text>

                                    </TouchableOpacity> */}

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
                                    {/* <Text style={{width:30,height:30,fontSize: 23, color: 'white', marginEnd:-20,marginStart:10,marginTop:-5}}>x</Text> */}
                                    </TouchableOpacity>
                                        <Text style={{ fontSize: 20, color: 'white', fontFamily: 'Acens',width:Dimensions.get('window').width/1.67,textAlign:'center' }}>{i18n.t('filterOrders')}</Text>
                                        {/* <TouchableOpacity 
     onPress={ () => { this.defultSort() } }>  
 <Image style={{width:22,height:22,marginLeft:0}} 
 source={require('../assets/images/clearefilter.png')}
 />
                                    </TouchableOpacity> */}
                                   
                                       </View>
                                       </View>
                                       <View style={{height:Dimensions.get('window').height/2,justifyContent:'center',alignItems:'center'}}>
                                       {/* <TextInput 
                 onChangeText={(text) => this.setState({emailForfet:text})}
                placeholderTextColor='#777777' placeholder='EMAIL' style={[emailInputStyle,{width:Dimensions.get('window').width/1.5}]}>

                </TextInput> */}
                {/* <TouchableOpacity
                onPress={ () => { this.statusSort(1) } }
                style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>
             

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
                  {i18n.t('pending')}
                </Text>
                </TouchableOpacity>
                <View style={{width:'100%',height:4,backgroundColor:'black'}}/>
                <TouchableOpacity
                 onPress={ () => { this.statusSort(2)} }
                style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
                  {i18n.t('approved')}
                </Text>
                </TouchableOpacity>
                <View style={{width:'100%',height:1,backgroundColor:'black'}}/> */}
                <TouchableOpacity  onPress={ () => { this.statusSort(3)} } style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
              {i18n.t('rejected')}
                </Text>
                </TouchableOpacity>

                <View style={{width:'100%',height:1,backgroundColor:'black'}}/>
                <TouchableOpacity  onPress={ () => { this.statusSort(5) } } style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
                {i18n.t('canceled')}
                </Text>
                </TouchableOpacity>

                {/* <View style={{width:'100%',height:1,backgroundColor:'black'}}/>
                <TouchableOpacity  onPress={ () => { this.statusSort(4) } } style={{width:'100%',height:44,justifyContent:'center',alignItems:'center'}}>

                <Text style={{fontFamily: "Acens",
  fontSize: 16,
  fontWeight: "bold",
  fontStyle: "normal",}}>
               {i18n.t('proceed')}
                </Text>
                </TouchableOpacity> */}
                
<View style={{width:Dimensions.get('window').width/1.37,alignItems:'flex-end',justifyContent:'flex-end',paddingTop:30}}>
{/* <TouchableOpacity
onPress={()=>{this.setSortModalVisible(false)}}
style={{width:70,height:37,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center'}}><Text style={{fontSize: 12, color: 'white', fontFamily: 'Acens', }} >Cancel</Text></TouchableOpacity> */}
</View>
</View>
                                    </View>
                                {/* </View> */}
                            </Card>
                        </View>

                    </Modal>
                
				 </Content>
                </Container>
               
            </StyleProvider>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#FFF"
//     }
// });

// export default CheckoutScreen;
const mapStateToActions = {
    getCategories: {}
  }
  
  const mapStateToProps = state => ({
    Order: state.AddToOrderReducer.Order
  });
  
  export default connect(mapStateToProps, AddOrderAction)(OrderDetailsOld)
  

 {/* <Picker
                            mode="dialog"
                            iosHeader={this.state.selected}
                            iosIcon={<Icon name="arrow-dropdown-circle" style={iosPickerIconStyle} />}
                            style={pickerStyle}
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                            itemTextStyle={itemTextStyleICheckoutPicker}
                            textStyle={textStyleInCheckoutPicker}
                        >
                            <Picker.Item label="Choose a Payment Method" value="key0"  />
                            <Picker.Item label="test text" value="key1" />
                            <Picker.Item label="testttt " value="key2" />
                            <Picker.Item label="test " value="key3" />
                        </Picker> */}