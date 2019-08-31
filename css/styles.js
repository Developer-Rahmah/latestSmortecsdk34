import React, { StyleSheet, Dimensions, Platform } from 'react-native';
import { select } from 'redux-saga/effects';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = 200;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = viewportWidth;

const entryBorderRadius = 8;


export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};
export default StyleSheet.create({



    /////// Main Screen Styles

    mainScreenMainContainer: {
        // resizeMode: 'cover',
         flexDirection: 'column', justifyContent: 'flex-start', height: Dimensions.get('window').height, width: Dimensions.get('window').width,
    },

    mainScreenLoginSignupContainer: {
        flexDirection: 'column', height: Dimensions.get('window').height / 2, width: Dimensions.get('window').width, justifyContent: 'flex-end', alignItems: 'center'
    },
    loginContainer: {
        marginBottom: 20, flexDirection: 'row', borderRadius: 5, width: Dimensions.get('window').width / 1.15, height: 50, alignItems: 'center', justifyContent: 'center'
    },
    loginTextStyle: {
        textAlign: 'center',
        alignItems: 'center', fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal", 
        lineHeight: 19,
        fontFamily: "Acens",
    },
    signUpContainer: {
        marginBottom: 20, flexDirection: 'row', borderRadius: 5, width: Dimensions.get('window').width / 1.15, height: 50, alignItems: 'center', justifyContent: 'center'
    },

    signUpTextStyle: {
        textAlign: 'center',
        alignItems: 'center', fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal", 
        lineHeight: 19,
        fontFamily: "Acens",
    },
    logoContainer: {
        flexDirection: 'column', justifyContent: 'center', marginTop: Dimensions.get('window').width / 2.7, alignItems: 'center', height: 114
    },
    mainView:
        { flexDirection: 'column', },
    imageLogo: {
        marginBottom: 25,
        width: 47.4,
        height: 47,
        resizeMode: 'contain'
    },
    delicoLogo: {
        width: 153,
        height: 64,
        resizeMode: 'contain'
    },
    logoStyle:{
        fontFamily: "Acens",
        fontSize: 53,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 67,
        letterSpacing: 0,
        color: "#ffffff"  
    },



    /////// check out screen styles
    textInputStyle:{
        marginBottom:20.5, 
        marginTop:0,
        width:Dimensions.get('window').width/1.2,
        height:50,alignItems:'center',
        borderBottomColor:'#c1c0c9',borderBottomWidth:1,
        fontSize: 16,fontFamily:'newFont',
  fontWeight: "normal",
  fontStyle: "normal",
//   lineHeight: 11,
  letterSpacing: 0,
  color: "#777777"
    },
    checkOutText:{
        width: Dimensions.get('window').width / 1.2,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        fontFamily:'newFont',
        fontSize:17,
        color: "#777777" },
        mainContainerCheckOut:{
            flexDirection: 'column' , width: Dimensions.get('window').width, marginTop: 50
        },firstViewInCheckOut:{
    flexDirection: 'column', height: Dimensions.get('window').height / 1.1, width: Dimensions.get('window').width, alignItems: 'center' 
},
pickerContinerInCheckOut:{
    backgroundColor: '#8FCFEB', marginTop: 14, marginBottom: 41, height: 44 ,width:Dimensions.get('window').width/1.5
},
iosPickerIconStyle:{
    color: "#7e7e7e", height:'100%',marginTop:-5,
}
,
pickerStyle:{
    width: Dimensions.get('window').width / 1.2, height: 44, backgroundColor: '#8FCFEB', color: 'white'
},
makePurchaseContainer:{
    justifyContent: 'center', alignItems: 'flex-end', width: Dimensions.get('window').width / 1.2
},
makePurchaseTouchable:{
        backgroundColor: '#8FCFEB', height: 44, justifyContent: 'center', alignItems: 'center', padding: 5
    },
    makePurchaseText:{
    color: 'white', textAlign: 'center' ,fontFamily:'Acens',
},
itemTextStyleICheckoutPicker:{
    fontSize: 13,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: "black",fontFamily:"newFont" 
},
textStyleInCheckoutPicker:{
    fontSize: 13,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: "#ffffff",fontFamily:"newFontBold" 
},


        ////// settings Screen style
        mainSettingContainer:{
            flexDirection: 'column', height: Dimensions.get('window').height , width: Dimensions.get('window').width,
        }
,
settingsContainer:{
    backgroundColor:'#8FCFEB', flexDirection: 'column', height: Dimensions.get('window').height , width: Dimensions.get('window').width, alignItems: 'center',paddingTop:20
},
rowContainerInSetting:{
    flexDirection:'row',width:Dimensions.get('window').width/1.07,borderBottomColor:'#c1c0c9',borderBottomWidth:1,
}
,
imageContainerInSetting:{
    width:Dimensions.get('window').width/2.2,height:71,alignItems:'center',flexDirection:'row'
},
textContainerInSetting:{
    flexDirection:'row',width:Dimensions.get('window').width/2.21,justifyContent:'flex-end',alignItems:'center'
},
imageStyleInSetting:{
    width: 20,
    marginEnd:14,
                                height: 20,
                                resizeMode: 'contain'
},
fieldTitleStyle:{
    fontFamily:'Acens',
    fontFamily:'Acens',
opacity: 0.57,fontFamily:'Acens',
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.14,
    color: "#ffffff"
},



fieldInfoStyle:{
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff"
  
},
toggleContainerStyle:{
    marginTop: 16,
    marginStart:5,
    width: 32,

    height: 20,

    borderRadius: 20,
    backgroundColor: '#71b800',
    padding: 2,
},
circleToggleStyle:{
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#ffa387',
},

///// tabs screen styles
imageBackgroundStyle:{
    resizeMode: 'cover', flexDirection: 'column', justifyContent: 'flex-end', height: Dimensions.get('window').height, width: Dimensions.get('window').width,

},

selectedTabTextStyle:{
    fontSize: 34,
    fontFamily:'Acens',
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 45,
  letterSpacing: 0.27,
  textAlign: "left",
  color: "#ffffff"
},
tabStyle:{
    justifyContent:'center', alignItems: 'center', marginTop: 10, width: Dimensions.get('window').width/2, backgroundColor: null, borderColor: null, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderRightWidth: 0, borderLeftWidth: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0, borderTopWidth: 0, borderBottomWidth: 0
},
tabsContainerStyle:{
    width: Dimensions.get('window').width ,
    borderWidth: 0,height:Dimensions.get('window').height-Dimensions.get('window').height/1.3,
    backgroundColor: null, borderColor: null,justifyContent:'center',alignItems:'center'
 
},
passwordTextInputStyle:
      {        
fontSize:15, width:Dimensions.get('window').width/1.2,marginStart:5,lineHeight: 14, fontWeight: "300",
fontStyle: "normal",color:'black'},
      smallInputContainer:{
        backgroundColor:'white',borderWidth:2,marginTop:5,marginBottom:20,
        color:'#bdbfbf',
        borderColor:'#9d9da2',
        width: (Dimensions.get('window').width)/2.07,
        height: 40,flexDirection:'row',marginStart:15,
        borderRadius: 50, alignItems:'center',paddingStart:15,
      },
      btnImage:
      {
        resizeMode: 'contain',
        height: '100%',
        width: '100%'
      },
      visibilityBtn:
  {
    position: 'absolute',
    left: Dimensions.get('window').width/1.4,
    height: 40,
    width: 35,
    padding: 5
  },
  alreadyHavAccountTextStyle:{
    fontFamily: "newFont",
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: "center",
    color: "#9b9b9b" 
  },loginTextInTabsScreen:{
    fontFamily: "newFont",
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: "center",
    color: "#8FCFEB" 
  },

  /////// login tab styles
  mainLoginContainer:{
    width:Dimensions.get('window').width,backgroundColor:'white',alignItems:'center',
  },
  secondContainerInLogin:{
    width:Dimensions.get('window').width/1.2,backgroundColor:'white',alignItems:'center',
  },
  emailInputStyle:{
    marginBottom:10.5, width:Dimensions.get('window').width/1.2,height:50,
    fontSize: 13,fontFamily:'newFont',backgroundColor:'#F5F5F5',
fontWeight: "normal",paddingStart:7,
fontStyle: "normal",
fontFamily:'Acens',
borderRadius: 5,
letterSpacing: 0,
color: "#777777"
  },passwordInputStyle:{
    fontFamily:'Acens',  marginBottom:10.5, width:Dimensions.get('window').width/1.2,height:50,marginTop:5,backgroundColor:'#F5F5F5',borderRadius:5,paddingStart:7,
    fontSize: 13,fontFamily:'Acens',
fontWeight: "normal",
fontStyle: "normal",
lineHeight: 11,paddingEnd:45,
letterSpacing: 0,
color: "#777777"
  },
  forgetPassCreateAccountContainer:{color: "#777777",
    flexDirection:'row',width:Dimensions.get('window').width/1.2,justifyContent:'space-between',marginTop:13
  },forgetPasswordText:{
    fontFamily: "newFont",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#777777"
  },creatAccountText:{
    fontFamily: "newFont",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#777777"
  },
  facebookContairInLogin:{
    width:Dimensions.get('window').width,alignItems:'center',justifyContent:'center',flexDirection:'row',marginBottom:35
  },
  logiSocailMediaContainer:{
    justifyContent:'flex-end'
  },
  orContainer:{
    width:Dimensions.get('window').width,height:40,flexDirection:'row',justifyContent:'center',alignItems:'center'
  },
  viewInsideOrStyle:{
    width:35,height:2,backgroundColor:'#b3262628'
  },
  loginTextStyleInLoginTab:{
    fontSize: 15,
    borderRadius: 5,
    fontWeight: "normal",
    fontStyle: "normal",
    fontFamily:'Acens',
    lineHeight: 19,
    letterSpacing: 0.1,
    textAlign: "center",
    color: "black"
  },
  orTextStyle:{
    fontFamily:'newFont',
    marginEnd:5,marginStart:5
  },
  facebookContainer:{
    width:Dimensions.get('window').width,alignItems:'center',justifyContent:'center',flexDirection:'row',marginBottom:15
  },loginTouchable:{
    borderRadius: 5,width:Dimensions.get('window').width/1.15,backgroundColor:'#8FCFEB',height:48,alignItems:'center',justifyContent:'center'
  },
  touchableFacebook:{
    width:Dimensions.get('window').width,backgroundColor:'#8FCFEB',height:48,alignItems:'center',justifyContent:'center'
  
},
facebookTouchable:{
    width:40,height:29.4,backgroundColor:'#2672cb',borderRadius:5,justifyContent:'center',alignItems:'center'
},
socailIconStyle:{
    resizeMode:'contain' ,width:15,height:25
},spaceBtweenSocailIcons:{
    width:11
},
loginWithGoogleTouchable:{
    width:40,height:29.4,backgroundColor:'#fc3850',borderRadius:5,justifyContent:'center',alignItems:'center'
},
/////// signup tab styles
agreeTerms:{
    color: "#777777",
    flexDirection:'row',width:Dimensions.get('window').width/1.11,paddingBottom:10,
    ...Platform.select({
        ios: {
            marginTop:5,
            marginBottom:5,
        },
        android: {
            marginTop:5,
            marginBottom:5,
        },
      }),
    
  
},checkBoxStyle:{
    width: 20, height: 20, color: 'white', borderColor: '#9d9da2',marginEnd:15,marginStart:16
},
signupSocailMediaContainer:{
    height:Dimensions.get('window').height/4,justifyContent:'flex-end'
  },
  iAgreeTextStyle:{
    fontFamily: "newFont",
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#8FCFEB"
  },
  passwordAndConfirmContainer:{
    flexDirection: 'row', alignItems: 'center',width:Dimensions.get('window').width/1.2
  },
  ///////// product details
  mainContainerInProductDetails:{
    width:Dimensions.get('window').width,paddingTop:0
},
rowContainerInProductDetails:{
    flexDirection:'row',width:Dimensions.get('window').width/1.07,justifyContent:'center'

},

rowContainerPriceAndQtyInProductDetails:{
    flexDirection:'row',width:Dimensions.get('window').width,justifyContent:'center',marginTop:27

},
detailsContainer:{
    backgroundColor:'white', flexDirection: 'column'  , marginBottom:20, width: Dimensions.get('window').width, alignItems: 'center',paddingTop:20
},
modalContainer:{
    marginTop: 100, marginEnd: (Dimensions.get('window').width - Dimensions.get('window').width / 1.3) / 2, marginStart: (Dimensions.get('window').width - Dimensions.get('window').width / 1.3) / 2, flexDirection: 'column', flexDirection: 'column', width: Dimensions.get('window').width / 1.3, height: Dimensions.get('window').height / 1.9, backgroundColor: 'white',borderTopEndRadius:20,borderTopStartRadius:20 
},
secondModalContainer:{
    flexDirection: 'row', width: Dimensions.get('window').width / 1.5, justifyContent: 'center', paddingTop: 30
},
productContainerInModal:{
    width: Dimensions.get('window').width / 1.3, height: Dimensions.get('window').height / 3.83, justifyContent: 'center', alignItems: 'center', marginTop: 50, 
},
productImageInModal:{
    height: '100%', width: 150, borderRadius: 20, borderColor: '#8FCFEB', borderWidth: 0.5 ,
                                shadowColor: '#8FCFEB',
                                shadowColor: "#000000",
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                shadowOffset: {
                                  height: 1,
                                  width: 0
                                }
},
confirmTouchableContainer:{
    marginEnd: (Dimensions.get('window').width - Dimensions.get('window').width / 1.3) / 2, marginStart: (Dimensions.get('window').width - Dimensions.get('window').width / 1.3) / 2, flexDirection: 'column', flexDirection: 'column', width: Dimensions.get('window').width / 1.3,
    borderBottomEndRadius:20,borderBottomStartRadius:20
},
productNameContainer:{
    width:Dimensions.get('window').width/2.2,height:35,alignItems:'center',flexDirection:'row',justifyContent:'flex-start'

},
productNameContainerInModal:{
    width:Dimensions.get('window').width/2.5,height:35,alignItems:'center',flexDirection:'row',justifyContent:'center',paddingStart:37

},
productPriceContainerInModal:{
    width:Dimensions.get('window').width/3,height:35,alignItems:'center',flexDirection:'row',justifyContent:'flex-start',

},
imageContainerInProductDetails:{
    width:Dimensions.get('window').width/2.2,height:35,alignItems:'center',flexDirection:'row',justifyContent:'flex-end'
},imageContainerInProductDetailsInModal:{
    width:Dimensions.get('window').width/2.7,height:35,alignItems:'center',flexDirection:'row',justifyContent:'flex-end'
},qtyContainerInProductDetailsInModal:{
    width:Dimensions.get('window').width/4,height:35,alignItems:'center',flexDirection:'row',justifyContent:'flex-end'
},
productNameStyleInProductDetails:{
    fontFamily: "Acens",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    // textAlign: "left",
    color: "#8FCFEB"
},
productTitleDesc:{
    fontFamily: "Acens",
    fontSize: 19,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#8FCFEB"
},
productPrice:{
    fontFamily: "newFont",
    fontSize: 19,
    // fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#4d4d4d",
    fontFamily: "newFont",
  fontSize: 19,
//   fontWeight: "500",
  fontStyle: "normal",
  lineHeight: 23,
  letterSpacing: 0,
  color: "#4d4d4d"
},
underLineText:{
    fontFamily: "Acens",
    textDecorationLine: 'underline', 
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#8FCFEB"
},
separater:{
    width:Dimensions.get('window').width,height:1,backgroundColor:'#30707070',opacity:0.2,
},
descContainer:{
    flexDirection:'column',width:Dimensions.get('window').width/1.07,justifyContent:'flex-start',paddingTop:15,paddingBottom:10
},
addToCartTextStyle:{
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    fontFamily: "Acens",
    color: "#ffffff"
},
addToCartIcon:{
    width: 25,marginTop:-6,

    marginEnd:7,
                                height: 23,
                                resizeMode: 'contain'
},
addToCartTouchable:{
    width:Dimensions.get('window').width/1.15,height:44,backgroundColor:'#8FCFEB',flexDirection:'row',justifyContent:'center',alignItems:'center'
},confirmTouchable:{ borderBottomEndRadius:20,borderBottomStartRadius:20 ,
    width:'100%',height:60,backgroundColor:'#8FCFEB',flexDirection:'row',justifyContent:'center',alignItems:'center'
},
descBodyStyle:{
    fontFamily: "newFont",
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    // letterSpacing: 0.03,
    color: "#777777"
},
  slideInnerContainer: {
    width: itemWidth,
    height: Dimensions.get('window').height/3,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18 // needed for shadow
},

shadow: {
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius
},
imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    width:350,height:350
},
imageContainerEven: {
    backgroundColor: 'white', width:350,height:350
},
image: {
    // ...StyleSheet.absoluteFillObject,
    // resizeMode: 'contain',
    // borderRadius: IS_IOS ? entryBorderRadius : 0,
    // borderTopLeftRadius: entryBorderRadius,
    // borderTopRightRadius: entryBorderRadius,
    width:'100%',height:'100%'

},imageinPopup: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    width:185,
    height:205
},
// image's border radius is buggy on iOS; let's hack it!
radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: 'white'
},
radiusMaskEven: {
    backgroundColor: colors.black
},
textContainer: {
    justifyContent: 'center',
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
},
textContainerEven: {
    backgroundColor: colors.black
},
title: {
    color: colors.black,
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5
},
titleEven: {
    color: 'white'
},
subtitle: {
    marginTop: 6,
    color: colors.gray,
    fontSize: 12,
    fontStyle: 'italic'
},
subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)'
}

,
//carousel

safeArea: {
      
    backgroundColor: colors.black,
},
container: {
  
    backgroundColor: colors.background1
},
gradient: {
    ...StyleSheet.absoluteFillObject
},
scrollview: {
    flex: 1
},
exampleContainer: {
    paddingVertical: 50,marginTop:-60,height:250,width:"100%",backgroundColor:'red',marginEnd:0,marginStart:-20,marginBottom:0
},
exampleContainerDark: {
    backgroundColor: colors.black
},
exampleContainerLight: {
    backgroundColor: 'white'
},
title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
},
titleDark: {
    color: colors.black
},
subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center'
},
slider: {
    height:249,
    marginTop: 0,
    overflow: 'visible' // for custom animations
},
sliderContentContainer: {
    height:'100%',
    paddingVertical: 0 // for custom animation
},
sliderContentContainer2: {
    paddingVertical: -10 // for custom animation
},
paginationContainer: {
    paddingVertical: -80,
    marginTop:-50
},
paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: -20
},sliderContainer:{
    height:'100%',flexDirection:'column',
},
shareTouchableStyle:{
    justifyContent:'flex-start',alignItems:'flex-end',paddingTop:15,paddingEnd:10
},
shareIconstyle:{
    width:15,height:15,resizeMode:'contain',
},
sliderTitleContainerStyle:{
    justifyContent:'center',alignItems:'center',height:'50%'
},
sliderTitleTextStyle:{
    fontFamily: "Acens",
  fontSize: 33,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 42,
  letterSpacing: 0,
  textAlign: "left",
  color: "#ffffff"
},
continerViewInRow:
{
    flexDirection:'row',borderBottomColor:'#c1c0c9',borderBottomWidth:1, width:Dimensions.get('window').width/1.2,
        height:50,alignItems:'center',
},
textinRowShipping:
{
    fontSize: 16,fontFamily:'newFont',
                  fontWeight: "normal",
                  fontStyle: "normal",color:'#777777'
}

});