import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Linking, ScrollView,Image, AppState, Platform} from 'react-native';
import { CommonActions, DrawerActions } from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import ScreenUILoading from '../components/ScreenUILoading';

import {removeAnObjectFromAsyncStorage} from '../javaScriptFunction/asynStorageFunctionality';

function DrawerContentComponent(props){
	const [state, setState] = useState({
		isLoading: false,
	});
	const transRef  = useSelector((state)=>state.transRef);

	navigateToScreen = ( route ) =>(
		() => {
		// props.navigation.dispatch(
		// 	CommonActions.navigate({
		// 		name:route,
		// 		params:{
		// 			'loginUserData':global.userTokenData
		// 		},
		// 		merge:true
		// 	})
		// )
		const {navigation} = props;
		navigation.navigate('ChangeLanguageUI');
		props.navigation.dispatch(DrawerActions.closeDrawer())
	})
	
	onPressYesLogout  = async () => {
		const {navigation} = props;
		await removeAnObjectFromAsyncStorage("businessUserData");
		navigation.navigate('LoginScreen');
	}

	logoutPermission = async () => {
		Alert.alert(
			transRef.t('appName'),
			transRef.t('logout_message'),
			[
				{text: transRef.t('cancel')},
				{text:  transRef.t('yes'), onPress: () => onPressYesLogout()},
			],
			{ cancelable: false }
		)
	};

	if(state.isLoading){
		return(
			<ScreenUILoading
				showLoadingIndicator={state.isLoading}
			/>
		)
	}
	else{
		const { routes, index } = props.state; 
		const focusedRoute = routes[index].name;
		return (
			<View style={{flex:1}}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View>
						<TouchableOpacity 
							style={[styles.screenStyle, (focusedRoute==='ChooseLanguage') ? styles.activeBackgroundColor : null]}
							onPress={navigateToScreen('ChooseLanguage')}
						>
							<View style={styles.commonIconContainer}>
								<FontAwesome
									name="language"
									style={focusedRoute==='ChooseLanguage' ?styles.selectedIconStyle : styles.screenIcon}
									size={23}
								/>
							</View>
							<Text
								style={focusedRoute==='ChooseLanguage' ?styles.selectedTextStyle : styles.screenTextStyle}
							>{transRef.t('choose_language')}</Text>
						</TouchableOpacity>
						<TouchableOpacity 
							style={styles.screenStyle} 
							onPress={logoutPermission}
						>
								<View style={styles.commonIconContainer}>
									<Ionicons name="md-log-out" style={{ color: '#175491',opacity:0.62,marginLeft:10}} size={24} />
								</View>
								<Text style={{fontWeight: 'bold',marginLeft:10}}>{transRef.t('logout')}</Text>
						</TouchableOpacity>	
					</View>
					<View style={styles.callUsContainerStyle}>
						<View style={styles.commonIconContainer}>
							<Ionicons name="md-call" style={styles.contactIconStyle} size={24} />
						</View>
						<Text style={styles.contactTitleStyle}>{transRef.t('call_us')}</Text>
					</View>
					<View style={styles.mobileNumbersContainer}>
						<Text onPress={()=>Linking.openURL(`tel:${+918349587093}`)} style={styles.secondMobileNumberText}>83495-87093</Text>
						<Text onPress={()=>Linking.openURL(`tel:${+918518070885}`)} style={styles.firstMobileNumberText}>85180-70885</Text>
					</View>
				</ScrollView>
			</View>
		)
	}
}
export default DrawerContentComponent;

const styles = StyleSheet.create({
	commonIconContainer:{
		width:wp('10%')
	},
	screenStyle: {
		flexDirection:'row',
		alignItems:'center',
		padding:10,
	},
	screenIcon:{
		color: '#175491',
		opacity:0.62,
		marginLeft:10,
	},
	selectedIconStyle:{
		color:'#175491',
		marginLeft:10,
	},
	screenTextStyle:{
		fontWeight: 'bold',
		marginLeft:10
	},
	selectedTextStyle: {
		color:'#2196f3',
		opacity:0.87,
		fontWeight: 'bold',
		marginLeft:10,
		marginRight:10,
	},
	activeBackgroundColor: {
		backgroundColor: '#E2E2E2'
	},
	contactIconStyle:{
		color: '#175491',
		alignItems:'center',
		opacity:0.62,
		marginLeft:10,
		marginTop:-10,
	},
	contactTitleStyle:{
		fontWeight: 'bold',
		marginLeft:10, 
		marginTop:-10,
	},
	mobileNumbersContainer:{
		flexDirection:'row',
		marginLeft:50,
		marginBottom:15,
		alignItems:'center',
	},
	firstMobileNumberText:{
		fontWeight: 'bold',
		textDecorationLine:'underline',
		marginLeft:10,
	},
	secondMobileNumberText:{
		fontWeight: 'bold',
		textDecorationLine:'underline',
		marginLeft:20,
	},
	callUsContainerStyle: {
		flexDirection:'row',
		alignItems:'center',
		padding:10,
		marginTop:5,
	},
});