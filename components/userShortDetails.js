import {View, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import { FontAwesome } from '@expo/vector-icons';

export const UserShortDetails = (props)=>{

	const loginUserData  = useSelector((state)=>state.loginUserData);

	return(
		<View style={styles.userDetailsContainer}>
			<FontAwesome name="user-circle" size={50} color="#B3B3B3" />
			<View style={styles.userDetails}>
				<Text style={styles.userNameStyle}>{loginUserData.userName}</Text>
				<Text>{loginUserData.mobileNumber}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	userDetailsContainer:{
		flexDirection:'row',
		paddingHorizontal:10,
		alignItems:'center',
		borderWidth:0.3,
		borderColor:'#D1D1D1',
	},
	userDetails:{
		marginLeft:10,
		paddingVertical:8,
	},
	userNameStyle:{
		fontSize:20,
		fontWeight:'bold',
		color:'#175491',
		marginBottom:11,
	}
});