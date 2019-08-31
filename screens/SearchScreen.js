import React, { Component } from 'react';
import { View, Text, Dimensions, ImageBackground,I18nManager,Platform, Image, TouchableOpacity, TextInput, AsyncStorage,FlatList,ActivityIndicator } from 'react-native';
import styles from '../css/styles';
import { Font, AppLoading } from 'expo';
import getTheme from '../native-base-theme/components';
import variables from '../native-base-theme/variables/variables';
import {ListItem, SearchBar } from 'react-native-elements';
import { ItemSearch } from '../UI_Commponents/ItemSearch';
import { connect } from "react-redux";
import { requestCategoryItem } from '../actions/getCategoryItemsAction';

import { Picker, Content,List,
  Icon,Header,
  Title,
  Button,
 
  Left,
  Body,
  Right,
  Container,StyleProvider } from "native-base";

import client from '../api/constant'
import { Localization } from 'expo-localization';
import Expo from 'expo';


let lang;

import i18n from 'i18n-js';

const en = {
    searchTitle: 'SEARCH',
    
    
   
};
const ar = {
  searchTitle: 'البحث',
    

};

const { mainSettingContainer, settingsContainer, rowContainerInSetting, imageContainerInSetting, textContainerInSetting, imageStyleInSetting, fieldTitleStyle, fieldInfoStyle, toggleContainerStyle, circleToggleStyle } = styles
 class SearchScreen extends Component {

  static navigationOptions = {
   header:null
  };

  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        data: [],
        error: null,
        value:'', 
        myLang: AsyncStorage.getItem("myLang").then((value) => {
          this.setState({ "myLang": value })
      }).done()
      ,
      };
  
      this.arrayholder = [];
      this.Navigate = this.Navigate.bind(this)

    }
    componentDidMount() {
     
      // if (I18nManager.isRTL)
      // {
      //   lang=4;
      // }
      // else{
      //   lang=1;
      // }
          if(this.props.Order.length>0){
            
        
          }
          
        this.makeRemoteRequest();
      }
    //   makeRemoteRequest = () => {
    //     const url = `https://randomuser.me/api/?&results=20`;
    //     this.setState({ loading: true });
    
    //     fetch(url)
    //       .then(res => res.json())
    //       .then(res => {
    //         this.setState({
    //           data: res.results,
    //           error: res.error || null,
    //           loading: false,
    //         });
    //         this.arrayholder = res.results;
    //       })
    //       .catch(error => {
    //         this.setState({ error, loading: false });
    //       });
    //   };
    makeRemoteRequest = async() => {
      const myLang = await AsyncStorage.getItem('myLang');
      if (myLang !== null) {
        // We have data!!
        if(myLang=='ar')
        {
          lang=4;
        }else{
          lang=1;
        }

          
            client.post(`/app/getallproducts?language_id=${lang}`).then((res) => {
                console.log('searcharr',res.data.product_data)
              this.setState({
                data: res.data.product_data,
                loading:false,
                // error:  null,

              })

        
            this.arrayholder = res.data.data;
            this.setState({  loading: false });
            })
          


      }};
    searchChange=async(text)=>{
      const myLang = await AsyncStorage.getItem('myLang');
      if (myLang !== null) {
        // We have data!!
        if(myLang=='ar')
        {
          lang=4;
        }else{
          lang=1;
        }
        client.post(`/app/getallproducts?language_id=${lang}&nameFilter=${text}`).then((res) => {
            console.log('searcharr',res.data.product_data)
        
         if(res.data.product_data.length>0){
             this.setState({
            data: res.data.product_data,
            loading:false,
            // error:   null,

          }) 
         }
           

    
        // this.arrayholder = res.data.data;
        // this.setState({ error, loading: false });
        })
      
    }}
    
      searchFilterFunction = text => {
        this.setState({
          value: text,
        });
    
        const newData = this.arrayholder.filter(item => {
          const itemData = `${item.name.toUpperCase()} ${item.name.toUpperCase()} ${item.name.toUpperCase()}`;
          const textData = text.toUpperCase();
    
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          data: newData,
        });
      };
      setItem = (item) =>
      this.setState({ item })
  
      renderHeader = () => {
        return (
<StyleProvider style={getTheme(variables)}>
      <View >
          <Header style={{height:99,backgroundColor:'#8FCFEB',width:'100%',}}>
        
          <Left style={{}}>
          <Button style={{}} transparent onPress={() => this.props.navigation.goBack()}>
          <Icon style={{  transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],}}
           name={
          Platform.OS === 'ios'
            ? `ios-arrow-back`
            : 'arrow-back'
        }  />
                    </Button>
             
          </Left>
          <Body style={styles.header}>
                <Title style={[styles.header,{ fontSize:25,width:Dimensions.get('window').width/2.3,fontFamily:'Acens',marginLeft:0}]}>{i18n.t('searchTitle')}</Title>
              </Body>
              {/* <Right style={{width:50,justifyContent:'flex-end',marginRight:-70}} >
                <Body> 
                <TouchableOpacity 
       onPress={() =>
        this.props.navigation.navigate('OrderScreen')
  
    }
      style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
  
      <Icon style={{color:'white',}} name={
          Platform.OS === 'ios'
            ? `md-cart`
            : 'md-cart'
        }/>
             
  </TouchableOpacity>
                  
  </Body>
              </Right> */}
          </Header> 


          <View style={{width:Dimensions.get('window').width,height:70,justifyContent:'center',alignItems:'center',}}>
          <View style={{borderWidth:1,borderColor:'gray',justifyContent:'center',alignItems:'center',width:Dimensions.get('window').width/1.17,height:40,flexDirection:'row',borderRadius:30}}>
         
          
          <TextInput 
          style={{width:Dimensions.get('window').width/1.3,height:'70%',textAlign:'center'}}
          // lightTheme
            // round     
                   // value={this.state.value}

            // placeholder="Type Here..."
           
            // onChangeText={text => this.searchFilterFunction(text)}
            // autoCorrect={false}
            onChange={(event) => {
    this.searchChange(event.nativeEvent.text)
  }}
  returnKeyType='search'
  autoFocus={true}
  value={ this.props.searchName }
  selectionColor='black'
//   onSubmitEditing={this.searchSubmit}
  clearButtonMode="while-editing"
          />
          <TouchableOpacity onPress={()=>{this.searchChange()}}>
           <Icon style={{color:'gray',}} name={
        Platform.OS === 'ios'
          ? `md-search`
          : 'md-search'
      }/>
      </TouchableOpacity>
          </View>
          </View>
          </View>
          </StyleProvider>
        );
      };
    
  searchFilterFunction = text => {    
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.name.toUpperCase()}   
      `;
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });    
    this.setState({ data: newData });  
  };
  onPress2 = () => {
    this.setState({ switchOn: !this.state.switchOn });
  }
  Navigate(itemId) {
    // const { Items } = this.props;
// const { navigate} = this.props.navigation;

    this.props.navigation.navigate('ItemScreen', {
      itemId: itemId,
    //   title: title

    })
  }
  render() {
    i18n.fallbacks = true;
    i18n.translations = { ar, en };
    //i18n.locale =null;
    console.log('test:' + this.state.myLang);

    i18n.locale = this.state.myLang;
    if (this.state.loading) {
        return (
          
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          
            <ActivityIndicator />
          </View>
        );
      }
      return (
        <View style={{ flex: 1 ,paddingTop:0}}>



          <FlatList
            data={this.state.data}
            renderItem={({ item ,index}) => (
            //   <ListItem
            //     // leftAvatar={{ source: { uri: item.picture.thumbnail } }}
            //     title={`${item.name} ${item.name}`}
            //     // subtitle={item.email}
                
            //   />
            <ItemSearch
                  navigate={this.Navigate}
                  setItem={this.setItem}
                  index={index}
                  item={item}
                />
            )}
            // keyExtractor={item => item.email}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
          />
        </View>

      
    );
  }
}
const mapStateToActions = {
    getCategoryItem: requestCategoryItem
  }
const mapStateToProps = state => ({
    Items: state.CategoryItemsReducer.CtegoryItems,
    Order: state.AddToOrderReducer.Order
  
  });
  
  export default connect(mapStateToProps, mapStateToActions)(SearchScreen)
  
