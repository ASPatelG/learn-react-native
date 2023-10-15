import {TouchableOpacity, StyleSheet} from 'react-native';
import {memo} from 'react';

import { AntDesign } from '@expo/vector-icons';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {removeAnObjectFromAsyncStorage} from '../javaScriptFunction/asynStorageFunctionality';

const LogoutUI = (props)=>{
	/* Used to show ui till the app is loading */

	const onPressLogout = ()=>{
		/*
			StackActions.reset--> can't use because, import { StackActions } from 'react-navigation'; react-navigation not support in expo
		*/

		const {navigation} = props;
		removeAnObjectFromAsyncStorage("businessUserData");
		navigation.popToTop();
	}

	return(
		<TouchableOpacity
			style={styles.logoutIconContainer}
			onPress={onPressLogout}
		>
			<AntDesign
				name="logout"
				size={33}
				color="#FCA203"
				style={styles.iconStyle}
			/>
		</TouchableOpacity>
	);
}

export default memo(LogoutUI);

const styles = StyleSheet.create({
	logoutIconContainer:{
		padding:5,
		alignItems:'center',
	},
	iconStyle:{
		// transform: [{ scaleY: 2 }], // Double the height to create a semicircular shape
		transform: [{ rotate: '-90deg' }], // Rotate by 45 degrees
	}
});