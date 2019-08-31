import { Platform, StyleSheet, Dimensions } from 'react-native';
import {  Fonts,Metrics, Colors } from '../Themes/';

const MyOrdersStyles = StyleSheet.create({

	container: {
		height: Metrics.HEIGHT,
		width: Metrics.WIDTH,
		backgroundColor: '#f3f3f3'
	},

	header: {
    backgroundColor: "#0e1130",
		height: Metrics.HEIGHT * 0.1,
		borderBottomWidth: 0,
		...Platform.select({
      ios: {
				paddingTop: (Metrics.HEIGHT * 0.02),
			},
      android: {
        paddingTop: Metrics.WIDTH * 0.05
      }
    }),
		elevation: 0,
		paddingLeft: (Metrics.WIDTH * 0.05),
		paddingRight: (Metrics.WIDTH * 0.05),
  },

	left: {
		flex: 0.5,
		backgroundColor: Colors.transparent,
  },

	backArrow: {
		justifyContent: 'center',
		alignItems: 'center',
  },

	body: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: Colors.transparent
  },

	textTitle: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(20),
    alignSelf: 'center',
		fontFamily: Fonts.type.newFontNeueLight,
  },

	right: {
    flex: 0.5,
		backgroundColor: Colors.transparent,
    alignItems: 'center',
		...Platform.select({
      ios: {
			},
      android: {
        paddingTop: Metrics.WIDTH * 0.02
      }
    }),
  },

	alertBg: {
		width: Metrics.WIDTH * 0.03,
		height: Metrics.WIDTH * 0.03,
		borderRadius: Metrics.WIDTH * 0.015,
		backgroundColor: '#ff0000',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: -(Metrics.WIDTH * 0.018),
	},

	alertTxt: {
		fontSize: Fonts.moderateScale(8),
		fontFamily: Fonts.type.sfuiDisplayMedium,
		color: Colors.snow,
	},

	content: {
		height: Metrics.HEIGHT * 0.9,
		width: Metrics.WIDTH,
		backgroundColor: '#f3f3f3'
	},

	bagIcon: {
		marginLeft: Metrics.WIDTH * 0.04,
		color: Colors.snow
	},

	heartIcon: {
		color: Colors.snow,
		alignSelf: 'center'
	},

	heartBg: {
		width: Metrics.WIDTH * 0.054,
		height: Metrics.WIDTH * 0.054,
		borderRadius: Metrics.WIDTH * 0.027,
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: Colors.snow,
		alignItems: 'center',
		justifyContent: 'center',
	},

	rowBg: {
		width: Metrics.WIDTH * 0.9,
		alignSelf: 'center',
		backgroundColor: Colors.snow,
		marginBottom: (Metrics.WIDTH * 0.05),
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#ebebeb"
	},

	rowField: {
		flexDirection: 'row',
		marginLeft: Metrics.WIDTH * 0.03,
		marginRight: Metrics.WIDTH * 0.03,
		marginTop: Metrics.WIDTH * 0.04,
		marginBottom: Metrics.WIDTH * 0.04,
	},

	rowListDivider: {
		width: Metrics.WIDTH * 0.87,
		height: 1,
		backgroundColor: "#E1E1E1",
		marginLeft: Metrics.WIDTH * 0.03
	},

	fieldLabelTxt: {
		color: "#959595",
		fontSize: Fonts.moderateScale(15),
		fontFamily: "newFont",
		width: Metrics.WIDTH * 0.25,
		textAlign: 'left'
	},

	fieldDescriptionTxt: {
		color: "#111111",
		fontSize: Fonts.moderateScale(15),
		fontFamily: Fonts.type.newFontNeueLight,
		width: Metrics.WIDTH * 0.55,
		marginLeft: Metrics.WIDTH * 0.03,
		textAlign: 'right',
	}


});


export default MyOrdersStyles;
