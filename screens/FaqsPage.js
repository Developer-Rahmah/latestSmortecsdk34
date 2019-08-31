import React, { Component } from "react";
import { StyleSheet,View,TouchableOpacity ,TextInput,Dimensions,Platform,Image,Modal,AsyncStorage,FlatList,ScrollView,I18nManager} from 'react-native'
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
    Text,Card,Radio
} from "native-base";
import {connect} from "react-redux";
import {CLEAR_CART} from '../actions/types';
import client from '../api/constant';
import getTheme from '../native-base-theme/components';
import variables from '../native-base-theme/variables/variables';
import styles from '../css/styles'
import { showMessage, hideMessage } from "react-native-flash-message";
import { OrderedItem } from '../UI_Commponents/OrderedItem';
let lang;

const { textInputStyle,checkOutText,mainContainerCheckOut,firstViewInCheckOut,pickerContinerInCheckOut,iosPickerIconStyle,pickerStyle,makePurchaseContainer,makePurchaseTouchable,makePurchaseText,itemTextStyleICheckoutPicker,textStyleInCheckoutPicker } = styles
let a=[];
class FaqsPage extends Component {
    constructor (props){
        super(props);
        this.state ={
            paymentMethod: null,
            privacyTxt:'',
selected:"key0",
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
title:'',
userCity:'',
userAddress:'',
cityBottomColor:'#c1c0c9',
addressBottomColor:'#c1c0c9',
products:this.props.Order,


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
       
    };
    _retrieveData = async () => {
        try {
          const myLang = await AsyncStorage.getItem('myLang');
      
      
            if(myLang=='ar'){
              lang=4;
            }else{
              lang=1;
            }
            // We have data!!
        


        client.post(`/app/getallpages?language_id=${lang}`).then((res) => {
            console.log('didmount response ',res.data. pages_data[0].description)

     this.setState({privacyTxt:res.data. pages_data[6].description, title:I18nManager.isRTL?'الأسئلة الأكثر شيوعاً':'FAQs'})

      
        })
        } catch (error) {
          // Error retrieving data
          console.log('getstorageitemerrrror',error);
        }
        
      };
      
   async componentDidMount() {
       
            this._retrieveData()
            if(this.props.Order.length>0){
              
          
            }
       console.log('didmount')
       
       
       
      }

    
    render() {
      
        return (
            <StyleProvider style={getTheme(variables)}>
                <Container style={{ backgroundColor: "#FFF"}}>
                <Header style={{height:99,backgroundColor:'#8FCFEB',width:Dimensions.get('window').width}}>
        
        <Left style={{width:30}}>
        <Button style={{  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],}} transparent onPress={() => this.props.navigation.goBack()}>
        <Icon name={
        Platform.OS === 'ios'
          ? `ios-arrow-back`
          : 'arrow-back'
      }  />
                  </Button>
           
        </Left>
        <Body style={styles.header}>
              <Title style={[styles.header,{fontSize:25,width:Dimensions.get('window').width/1.3,fontFamily:'Acens',marginLeft:-50}]}>{this.state.title}</Title>
            </Body>
          
        </Header> 
                    <Content style={[mainContainerCheckOut,{paddingEnd:7,paddingStart:7,marginTop: 0}]}>
               <Text>{this.state.privacyTxt}</Text>
                   </Content>
                </Container>
               
            </StyleProvider>
        );
    }
}


const mapStateToActions = {
    getCategories: {}
  }
  
  const mapStateToProps = state => ({
    Order: state.AddToOrderReducer.Order
  });
  
  export default connect(mapStateToProps)(FaqsPage)
  

