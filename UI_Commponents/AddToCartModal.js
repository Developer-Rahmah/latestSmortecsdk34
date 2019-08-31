import React, { Component } from "react";
import { Text, TouchableOpacity, View , StyleSheet, Image,Dimensions,Alert,AsyncStorage} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Right, Toast, 
} from "native-base";
import Modal from "react-native-modal";
import {connect} from "react-redux";
import {addItem} from '../actions/AddToOrder'
import { showMessage, hideMessage } from "react-native-flash-message";
import client from '../api/constant';

import { Localization } from 'expo-localization';
  import Expo from 'expo';
  
  
  
  import i18n from 'i18n-js';
  
  
  const en = {
      confirm: 'CONFIRM',
      jod: 'JOD',
      addedSuccessfully:'Added Successfully'
    
     
  };
  const ar = {
    confirm: 'تأكيد',
      jod: 'دينار',
      addedSuccessfully:'تمت اضافة العنصر بنجاح'
  };


 class AddToCartModal extends Component {
    constructor(props){
        super(props)
        console.log('ppppriiiice',this.props.item.new_price !=null &&this.props.item.new_price !=''?parseFloat(this.props.item.new_price): parseFloat(this.props.item.cost_price))
        this.state = {
          bounsNum:0,

          // Price: this.props.item.products_price,
          // Price:this.props.finalPrice ==undefined? parseFloat(this.props.item.products_price):parseFloat(this.props.finalPrice),
        Price:this.props.item.new_price !=null &&this.props.item.new_price !=''?parseFloat(this.props.item.new_price): parseFloat(this.props.item.cost_price)
          ,count:1,
          value: 1,
          testArr:[],

          message: null ,

          val: 1,
          minColor: 'white',
          myLang: AsyncStorage.getItem("myLang").then((value) => {
            this.setState({ "myLang": value })
        }).done()
        ,
        }
        const messages = [
          { text: 'FYI' },
          { text: 'Hooray!', styles: ToastStyles.success },
          { text: 'Eek', styles: ToastStyles.warning },
          { text: 'Oh noe!', styles: ToastStyles.error }
        ]
        messages.forEach((message, i) => {
          setTimeout(() => this.setState({ message }), i * 1000)
        })
    }

    componentDidMount() {
     
      
      client.post(`app/getallproducts?products_id=${this.props.item.products_id}&language_id=${1}`).then((res) => {
       
        for (let i=0;i<this.props.Order.length;i++){
          console.log('order of idssssssss',this.props.Order[i].products_id)
  
          // this.setState({ testArr: this.props.Order[i].products_id})
          this.setState({
            testArr: [...this.state.testArr, (this.props.Order[i]).products_id]
          })
  
        }
  
        
        this.setState({
          singleItem: res.data.product_data[0]
        })
        
      })

     
    }
    onPlusPressed(qty){
      
      let price=this.props.item.new_price !=null &&this.props.item.new_price !=''?parseFloat(this.props.item.new_price): parseFloat(this.props.item.cost_price);
console.log('stok',this.props.item)
      price = parseFloat(price);
      this.setState({
        Price :  (price *(qty+1)).toFixed(2),
        count: qty+1
      })
   
    }
    onMainusPressed(qty){

      let price=this.props.item.new_price !=null &&this.props.item.new_price !=''?parseFloat(this.props.item.new_price): parseFloat(this.props.item.cost_price);

      price = parseFloat(price);
      if(qty>1){
      this.setState({
        Price : (price *(qty-1)).toFixed(2),
        count: qty-1
      })}
    
    }
  
   async addToOrder(){
     console.log('iteeeeem',this.props.item)
      // let{ isModalVisible} = this.props;
      // let BaseURL = 'https://smortec.com';
      // let item={
      //   products_id:this.props.item.products_id,
      //   products_name : this.props.item.products_name,
      //   final_price: this.state.Price,
      //   price:this.props.finalPrice ==undefined? parseFloat(this.props.item.products_price):parseFloat(this.props.finalPrice),
      //   customers_basket_quantity: this.state.count,
      //   image: BaseURL + '/' + this.props.item.products_image,
      //   products_weight:(this.props. products_weight),
      //   products_shape:this.props.products_shape,
      //   products_finalWeightPrice:this.props.products_finalWeightPrice,
      //   redeem:this.props.redeem,

      // }


      let test=0;
      for(let i=0;i<=this.props.item.bounce.length;i++){
    
        if(this.props.item.bounce[i]!=undefined){ 
          console.log('test array=:',this.props.item.bounce[i])
    
             console.log('test=:',this.props.item.bounce[i].type)
    
        if(this.state.count>=this.props.item.bounce[i].qty_from){
          if(this.props.item.bounce[i].type=='percent'){
            console.log('test= in percent:',this.props.item.bounce[i].type)
            console.log('test=:',this.props.item.bounce[i].bounces)
    
            test=this.props.item.bounce[i].bounces;
    test=(this.props.item.bounce[i].bounces)/100*this.state.count
          }else{
                  test=this.props.item.bounce[i].bounces;
                  console.log('test type=:',this.props.item.bounce[i].type)
    
                  console.log('test= in pice:',this.props.item.bounce[i].bounces)
    
          }
          this.setState({bounsNum:this.props.item.bounce[i].bounces})
          // console.log('bouuuuns number is:',this.state.bounsNum)
        }
      }
    }
    // if(this.state.custmizeBonusNum>0){
    //   test=this.state.custmizeBonusNum
    // }
      
      // let{ isModalVisible} = this.props;
      let BaseURL = 'https://smortec.com';
      let testTaxF=0;
      let testTaxS=0;
      let testTaxE=0;
      let ppp=0;
      if(this.props.item.tax_description=='4%'){
    
      
       testTaxF= 0.04*parseFloat(this.props.item.products_price);
    }else  if(this.props.item.tax_description=='8%'){
    
      
       testTaxE= 0.08*parseFloat(this.props.item.products_price);
    } else  if(this.props.item.tax_description=='16%'){
    
      
       testTaxS= 0.16*parseFloat(this.props.item.products_price);
    }
        if(this.props.item.new_price !=null && this.props.item.new_price !=''){
          ppp= parseFloat(this.props.item.new_price)
          
        }else{
          ppp=parseFloat(this.props.item.cost_price)
        }
    
        
       
    
        console.log('teeest is:',test);
        console.log('bounsnum is:',this.state.bounsNum)
        // console.log('bounsnum in staaate is:',this.state.custmizeBonusNum)
    let profitmarginratio=0;
    let profitmargion=0;
    
        let totalSell=this.props.item.products_price*(this.state.count+parseInt(test))
        profitmargion= totalSell-(ppp*this.state.count)
        let margin=ppp*(this.state.count+parseInt(test))
        profitmarginratio=(parseFloat(profitmargion / margin)*100).toFixed(3)
    
        console.log('this.state.singleItem.publicPrice is:',this.props.item.products_price);
        console.log('this.state.counte is:',this.state.count);
        console.log('ttest is:',parseInt(test));
        console.log('ppp is:',ppp);
    
        console.log('profitmargion is:',profitmargion);
        console.log('profitmargion ratiooo is:',profitmarginratio);
    
    
      let item={
        products_id:this.props.item.products_id,
        products_name : this.props.item.products_name,
        
        final_price:  ppp,
        // price: this.props.item.new_price !=null &&this.props.item.new_price !=''?parseFloat(this.props.item.new_price): parseFloat(this.props.item.cost_price),
        price: this.state.price,

        customers_basket_quantity: this.state.count,
        image: BaseURL + '/' +this.props.item.products_image,
        bounsArr:this.props.item.bounce,
        test:parseInt(test),
        unit:this.props.item.units,
        tax:this.props.item.tax_description,
        profit_margin: parseFloat(profitmargion),
        profit_margin_ratio:(profitmarginratio),
        testTaxF:testTaxF,
        testTaxE:testTaxE,
        testTaxS:testTaxS,
        f:ppp*this.state.count,
        publicPrice:this.props.item.products_price,
        isCustom:false,
        redeem:this.props.redeem,
        bounsNum:this.state.bounsNum,
        testTaxF: this.props.item.tax_description*parseFloat(this.props.item.products_price),
      }    


      this.props.addItemToOrder(item)
      this.props._toggleModal()
      showMessage({
        message: i18n.t('addedSuccessfully'),
        type: "success",
      });
    
      // MessageBarManager.showAlert({
      //   title: 'Your alert title goes here',
      //   message: 'Your alert message goes here',
      //   alertType: 'success',
      
      // });
    //  {
    //  this.fetchData()
    //   }     
    // this._storeData()
    }
    
    fetchData(){
     
        this.dropdown.alertWithType('error', 'Error', 'ggggggg');
      
    };
    onChange(number) {
        // let price = this.props.item.products_price;
     let price=   parseFloat(this.props.finalPrice) ==undefined? parseFloat(this.props.item.products_price):parseFloat(this.props.finalPrice);
        price = parseFloat(price);
        this.setState({
          Price : price * number,
          count: number
        })
        // this.setState({val:this.state.val+1})
      }
  render() {
    i18n.fallbacks = true;
    i18n.translations = { ar, en };
    //i18n.locale =null;
    console.log('test:' + this.state.myLang);

    i18n.locale = this.state.myLang;
    let BaseURL = 'https://smortec.com';
    let{ isModalVisible} = this.props;
    let image = BaseURL + '/' + this.props.item.products_image
    let {products_name } = this.props.item
    console.log('addtocartmodal',this.props.item)
    return (
        <Modal isVisible={isModalVisible}>
        <Card  style={{ borderTopStartRadius:20 ,borderTopEndRadius: 20 ,alignItems:'center'}}>
            <CardItem  style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 , padding:10}}>
              <Left>
                <Body>
                  <Text style={styles.itemText}>{products_name}</Text>
                </Body>
              </Left>
              <Right>
                <Button transparent onPress={()=>{
                  this.props._toggleModal()
                }}>
                    <Icon style={{color:'#b13132',width:25,height:25}} name="close" />
                  </Button>
              </Right>
            </CardItem>

            {/* <CardItem cardBody style={{width:'50%',height:'50%'}}> */}
              <Image
                 style={[styles.image,{width:'50%',height:'50%' }]}
                source={{uri: image}}
              />

            {/* </CardItem> */}
              <View style={{height:20}}/>

            <CardItem style={{ paddingVertical: 0,marginEnd:10,marginStart:10 }}>
              <Left>
                <Button transparent>
                  <Text style={styles.itemPrice}>{`${parseFloat(this.state.Price).toFixed(3)}${i18n.t('jod')}`}</Text>
                </Button>
              </Left>
              <Right>
             
<View style={{width:100,flexDirection:'row',borderWidth:1,borderRadius:2,borderColor:'#8FCFEB',justifyContent:'space-between'}}>
                  
<TouchableOpacity 
                    onPress={()=>{this.onMainusPressed(this.state.count)}}
                  style={{width:25,height:25,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center',}}><Text style={{color:'white'}}>-</Text></TouchableOpacity>

                
                 
                <View style={{justifyContent:'center',alignItems:'center',}}> 
                 <Text style={{textAlign:'center'}}>{this.state.count}</Text>
                 </View>
                 <TouchableOpacity style={{width:25,height:25,backgroundColor:'#8FCFEB',justifyContent:'center',alignItems:'center',}}
                  onPress={()=>{this.onPlusPressed(this.state.count)}}
                  ><Text style={{color:'white'}}>+</Text></TouchableOpacity>
                
                  </View>


              </Right>
            </CardItem>
           
          </Card>
         
                <Button style={{ borderBottomStartRadius: 20, borderBottomEndRadius: 20,marginTop:-5,backgroundColor:'#8FCFEB',display: this.state.testArr.includes(this.props.item.products_id)?'none':'flex'}}  block 
                onPress={()=>{
                   this.addToOrder()
                 
                  
                }}>
              <Text style={styles.confiremText}>{i18n.t('confirm')}</Text>
            </Button>
            {/* </Body>
              </CardItem> */}
              
               <View >
        {/* <DropdownAlert ref={ref => this.dropdown = ref} /> */}


      </View>
        </Modal>
        
    );
  }
}

const mapStateToActions = {
  addItemToOrder: addItem
}
const mapStateToProps= state => ({
  dumyItem: state.CategoryItemsReducer.CtegoryItems,
  Order: state.AddToOrderReducer.Order

});
export default connect(mapStateToProps,mapStateToActions)(AddToCartModal)
export class DropDownHolder {
  static dropDown;
  static setDropDown(dropDown) {
      this.dropDown = dropDown;
  }
  static getDropDown() {
      return this.dropDown;
  }}
const styles = StyleSheet.create({
  image : {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    // marginLeft: 5,
    // marginRight: 5,
    // marginTop: 10,
   
    // resizeMode:'contain',
  },
  Card:{
     borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  itemText:{
    fontFamily: "helivet",
    fontSize: 19,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#8FCFEB"
  },
  confiremText:{
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    fontFamily: "helivet",
    color: "#ffffff"
  },
  itemPrice:{
    fontFamily: "newFont",
    fontSize: 19,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#4d4d4d",
    fontFamily: "newFont",
  fontSize: 19,
  fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 23,
  letterSpacing: 0,
  color: "#4d4d4d"
  }
})