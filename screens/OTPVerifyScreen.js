import {Text, ScrollView, Image} from 'react-native';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import { FontAwesome } from '@expo/vector-icons'; 

import {constantValues} from '../staticDataFiles/constantValues';
import {TextInputComponent} from '../components/textInputComponent';
import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import {ButtonComponent} from '../components/buttonComponent';
import {crossPlatformToast} from '../components/crossPlatformToast';
import {changeLoginUserData} from '../learnRedux/actions';

import {styles} from './screens.styles/OTPVerifyStyles';

export const OTPVerifyScreen = (props)=>{
	/* Used to show ui till the app is loading */
	const {route:{params}} = props;

	const [otp, setOTP] = useState('');
	const transRef  = useSelector((state)=>state.transRef);
	const dispatchrefrence = useDispatch()		// To send the data in store

	function onchangeOTP(enteredText){
		const regularExpression = /^[0-9]+$/;
		if(regularExpression.test(enteredText) || enteredText === ''){
			setOTP(enteredText);
		}
		else{
			null
		}
	}

	function onPressVerify(nativeEvent){
		const {navigation} = props;
		if(otp === params.otp){
			crossPlatformToast(transRef.t('loginSuccess'));
			navigation.navigate('CostEstimationCalculator');
		}
		else{
			crossPlatformToast(transRef.t('wronOTP'));
		}
	}

	return(
		<ScrollView style={styles.mainContainer} keyboardShouldPersistTaps={'always'}>
			<CommonHeaderComponent/>
			<Text style={styles.screenHeading}>{transRef.t('otpVerify')}</Text>
			<Image source={require('../appImage/homeIcon.jpg')}  style={styles.loginIcon} />
			<Text style={styles.otpTitleStyle}>{transRef.t('otpSentTo')}</Text>
			<Text style={styles.mobileNumberStyle}>{params.mobileNumber}</Text>
			<TextInputComponent
				value={otp}
				onChangeText={enteredText => onchangeOTP(enteredText)}
				keyboardType='number-pad'
				inputIcon={()=>(<FontAwesome name="mobile-phone" size={24} color="black" />)}
				maxLength={4}
				placeholdar={transRef.t('phoneNumber')}
			/>
			<ButtonComponent
				title={transRef.t('verifyOTP')}
				onPressIn={onPressVerify}
				disabled={otp.length < 4}
				mainContainer={styles.buttonContainer}
			/>
			<Text style={styles.signupHintStyle}>{transRef.t('signupHint')}</Text>
		</ScrollView>
	);
}