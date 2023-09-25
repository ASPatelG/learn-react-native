import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
	mainContainer:{
		flex:1,
		backgroundColor:'#ffffff',
		alignitems:'center',
		// justifyContent:'center',
	},
	aploadingTextStyle:{
		width:wp('90%'),
		fontWeight:'bold',
		fontSize:25,
		textAlign:'center',
		alignSelf:'center',
		marginVertical:45,
	},
	loginIcon:{
		height:230,
		width:230,
		borderRadius:65,
		borderWidth:2,
		borderColor:'#D1D1D1',
		marginBottom:45,
		alignSelf:'center',
	},
});