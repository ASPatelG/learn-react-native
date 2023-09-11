import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
	mainContainer:{
		flex:1,
		backgroundColor:'#ffffff',
	},
	dropDownContainer:{
		padding:5,
		borderRadius:5,
		borderColor:'#D1D1D1',
		borderWidth:1,
		marginTop:10,
		marginHorizontal:5,
	}
});