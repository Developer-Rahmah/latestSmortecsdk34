import { Platform, StyleSheet, Dimensions } from 'react-native';
import { Fonts, Metrics, Colors } from '../Themes/';

const MyAddressStyle = StyleSheet.create({
	container: {
		height: Metrics.HEIGHT,
		width: Metrics.WIDTH,
		backgroundColor: Colors.snow,
	},

	header: {
		backgroundColor: '#0e1130',
		height: Metrics.HEIGHT * 0.1,
		borderBottomWidth: 0,
		...Platform.select({
			ios: {
				paddingTop: Metrics.HEIGHT * 0.02,
			},
			android: {
				paddingTop: Metrics.WIDTH * 0.04,
			},
		}),
		elevation: 0,
		paddingLeft: Metrics.WIDTH * 0.05,
		paddingRight: Metrics.WIDTH * 0.05,
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
		backgroundColor: Colors.transparent,
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
			ios: {},
			android: {
				paddingTop: Metrics.WIDTH * 0.02,
			},
		}),
	},

	shippingAddressView: {
		backgroundColor: '#f3f3f3',
		...Platform.select({
			ios: {
				paddingTop: Metrics.HEIGHT * 0.007,
				paddingBottom: Metrics.HEIGHT * 0.007,
			},
			android: {
				paddingTop: Metrics.HEIGHT * 0.01,
				paddingBottom: Metrics.HEIGHT * 0.01,
			},
		}),
		paddingLeft: Metrics.WIDTH * 0.05,
		paddingRight: Metrics.WIDTH * 0.05,
	},

	shippingAddressText: {
		color: '#959595',
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.newFontNeueLight,
		textAlign: 'left',
	},

	shippingAddressDivider: {
		height: Metrics.HEIGHT * 0.003,
		backgroundColor: '#e1e1e1',
	},

	addressText: {
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.newFontNeueLight,
		textAlign: 'left',
	},

	addressDivider: {
		height: Metrics.HEIGHT * 0.001,
		backgroundColor: '#e1e1e1',
		marginLeft: Metrics.HEIGHT * 0.022,
		marginRight: Metrics.HEIGHT * 0.022,
	},

	rowMain: {
		padding: Metrics.HEIGHT * 0.022,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	chBox: {
		width: Metrics.WIDTH * 0.08,
		height: Metrics.WIDTH * 0.08,
	},

	addressTextBg: {
		width: Metrics.WIDTH * 0.85,
	},
	modalOpenView: {
		flexDirection: 'column',
		height: Metrics.HEIGHT * 0.6,
		width: Metrics.WIDTH,
		alignItems: 'center',
	},
	modalView: {
		width: Metrics.WIDTH * 0.4,
		height: Metrics.HEIGHT * 0.3,
		backgroundColor: 'green',
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
	},
	model: {
		paddingTop:30,
		paddingBottom:30,
		height: Metrics.HEIGHT/1.05,
		width: Metrics.WIDTH,
		backgroundColor: '#0006',
		justifyContent: 'center',
		alignSelf: 'center',
	},

	modell: {
		width: Metrics.WIDTH * 0.94,
		alignSelf: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	modalHeader: {
		backgroundColor: '#ebebeb',
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingBottom: Metrics.WIDTH * 0.024,
		paddingTop: Metrics.WIDTH * 0.024,
		paddingLeft: Metrics.WIDTH * 0.03,
		// paddingRight: Metrics.WIDTH * 0.03,
		paddingRight:7,

		borderTopLeftRadius: 5,
		// marginRight:7,
		borderTopRightRadius: 5,
	},
	cancelApplyTxt: {
		color: '#ffc700',
		fontSize: Fonts.moderateScale(15),
		fontFamily: Fonts.type.sfuiDisplayLight,
	},
	cancelApplyTxtt: {
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: Metrics.WIDTH * 0.23,
		color: '#ffc700',
	},
	cancelApplyTxttt: {
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: Metrics.WIDTH * 0.24,
		color: '#0e1130',
	},
	name: {
		width: Metrics.WIDTH * 0.8,
		position: 'absolute',
		top: 70,
		borderBottomWidth: 2,
		borderColor: '#ebebeb',
		paddingTop: 5,
		fontSize: Fonts.moderateScale(16),
		marginLeft: 15,
		color: '#ebebeb',
	},
	num: {
		width: Metrics.WIDTH * 0.65,
		position: 'absolute',
		top: 120,
		left: 10,
		borderBottomWidth: 2,
		borderColor: '#ebebeb',
		paddingTop: 5,
		fontSize: Fonts.moderateScale(16),
		marginLeft: 15,
		color: '#ebebeb',
	},
	add: {
		width: Metrics.WIDTH * 0.65,
		position: 'absolute',
		top: 170,
		left: 10,
		borderBottomWidth: 2,
		borderColor: '#ebebeb',
		paddingTop: 5,
		fontSize: Fonts.moderateScale(16),
		marginLeft: 15,
		color: '#ebebeb',
	},

	floatingView: {
		alignSelf: 'center',
		width:( Metrics.WIDTH * 0.85),
		justifyContent: 'center',
		paddingTop: Metrics.HEIGHT * 0.03,
		marginBottom: Metrics.HEIGHT * 0.04,
	},
});

export default MyAddressStyle;
