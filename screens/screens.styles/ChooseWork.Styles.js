import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
	mainContainer:{
		flex:1,
		alignitems:'center',
	},
	pressableButtonStyle:{
		backgroundColor:'#175491',
		width:80,
		paddingVertical:5,
		paddingHorizontal:5,
		borderRadius:5,
		marginTop:35,
		alignSelf:'center',
	},
	buttonTitle:{
		textAlign:'center',
		fontSize:14,
		fontWeight:'bold',
		color:'#ffffff',
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
		alignSelf:'center',
	},
});