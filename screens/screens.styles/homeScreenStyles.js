import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
	mainContainer:{
		flex:1,
		backgroundColor:'#ffffff',
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
		marginTop:8,
	},
	buttonContainer:{
		marginVertical:5,
	},
	// containerWithSpacebetween:{
	// 	justifyContent:'space-between',
	// 	height:hp('50%'),
	// },
	// containerWithoutSpacebetween:{
	// 	justifyContent:'center',
	// 	height:hp('50%'),
	// }
});