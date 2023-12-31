import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
	mainContainer:{
		flex:1,
		backgroundColor:'#ffffff',
		// alignItems:'center',
	},
	screenHeading:{
		fontSize:25,
		fontWeight:'bold',
		textAlign:'center',
		marginTop:25,
		marginBottom:30,
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
	buttonContainer:{
		marginTop:25,
	},
	signupHintStyle:{
		fontSize:20,
		textAlign:'center',
		marginTop:25,
		marginBottom:25,
		color:'#808080',
		paddingHorizontal:8,
	}
});