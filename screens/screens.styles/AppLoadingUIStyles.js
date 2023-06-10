import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
	mainContainer:{
		flex:1,
		backgroundColor:'#ffffff',
		alignitems:'center',
		justifyContent:'center',
	},
	aploadingTextStyle:{
		width:wp('90%'),
		fontWeight:'bold',
		fontSize:16,
	}
});