import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
	mainContainer:{
		flex:1,
		backgroundColor:'#ffffff',
	},
	loginIcon:{
		height:40,
		width:40,
		borderRadius:23,
		borderWidth:2,
		borderColor:'#D1D1D1',
		alignSelf:'center',
	},
	centerContent:{
		width:'64%',
		alignItems:'center',
		justifyContent:'center',
	},
	screenChangeContent:{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
		paddingRight:8,
	},
	dropDownContainer:{
		paddingHorizontal:5,
		borderRadius:5,
		borderColor:'#D1D1D1',
		borderWidth:1,
		marginTop:10,
		marginHorizontal:5,
		width:wp('83%'),
	},
	dropdownStyle:{
		alignItems:'center',
		width:wp('81%'),
		paddingTop:10,
	},
	downloadIconContainer:{
		elevation:3,
		borderWidth:0.3,
		borderColor:'#D3D3D3',
		borderRadius:5,
		padding:4,
		marginRight:10,
	},
	menuIconContainer:{
		padding:4,
		marginLeft:5,
		alignItems:'center',
	},
	buttonContainer:{
		marginVertical:5,
	},
	flatlistContainer:{
		height:hp('77%'),
	},
	noFilterPartyData:{
		color:'#808080',
		fontSize:18,
		fontWeight:'bold',
		paddingHorizontal:10,
		textAlign:'center',
	},
	pressableButtonStyle:{
		backgroundColor:'#175491',
		width:wp('60%'),
		paddingVertical:12,
		alignItems:'center',
		paddingVertical:5,
		paddingHorizontal:5,
		borderRadius:5,
		marginTop:5,
		alignSelf:'center',
	},
	disabledButtonStyle:{
		backgroundColor:'#D1D1D1',
		width:wp('60%'),
		paddingVertical:12,
		alignItems:'center',
		paddingVertical:5,
		paddingHorizontal:5,
		borderRadius:5,
		marginTop:5,
		alignSelf:'center',
	}
});