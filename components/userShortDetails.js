import {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getAnObjectFromAsyncStorage} from '../javaScriptFunction/asynStorageFunctionality';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import LogoutUI from './LogoutUI';

import { FontAwesome } from '@expo/vector-icons';

export const UserShortDetails = (props)=>{

	let loginUserData  = useSelector((state)=>state.loginUserData);

	useEffect( ()=>{
		const getBusinessUserData = async ()=>{
			if(!loginUserData){
				loginUserData = await getAnObjectFromAsyncStorage('businessUserData');
			}
		}
		getBusinessUserData();
	}, []);

	return(
		<View style={styles.userDetailsContainer}>
			<FontAwesome name="user-circle" size={50} color="#B3B3B3" />
			<View style={styles.userDetails}>
				<Text style={styles.userNameStyle}>{loginUserData.userName}</Text>
				<Text>{loginUserData.mobileNumber}</Text>
			</View>
			<LogoutUI navigation={props.navigation}/>
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
		width:wp('66%'),
	}
});