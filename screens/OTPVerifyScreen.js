import {Text, ScrollView, Image} from 'react-native';
import {useState, useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';

import { FontAwesome } from '@expo/vector-icons'; 

import {constantValues} from '../staticDataFiles/constantValues';
import BoxOTPInput from '../components/boxOTPInput';
import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import ButtonComponent from '../components/buttonComponent';
import {crossPlatformToast} from '../components/crossPlatformToast';
import {changeLoginUserData} from '../learnRedux/actions';

import {styles} from './screens.styles/OTPVerifyStyles';

export const OTPVerifyScreen = (props)=>{
	/* Used to show ui till the app is loading */
	const {route:{params}} = props;

	const [otp, setOTP] = useState(params.otp);
	const transRef  = useSelector((state)=>state.transRef);
	const [focusInputBoxIndex, setfocusInputBoxIndex] = useState(null);
	// let focusInputBoxIndex = null;
	const [otpValueArray, setOtpValueArray] = useState(params.otp.toString().split('')); 	// To fill generated otp automatically

	function onchangeOTP(enteredText){
		const regularExpression = /^[0-9]+$/;
		if(regularExpression.test(enteredText) || enteredText === ''){
			setOTP(enteredText);
		}
		else{
			null
		}
	}

	const clearValueOnFocus = (index)=>{
		otpValueArray.fill('', index, otpValueArray.length - 1);
		setfocusInputBoxIndex(index);
	}

	// const onFocusBox = (index)=>{
	// 	focusInputBoxIndex = index;
	// }

	const onchangeBoxValue = (value, index)=>{
		const regularExpression = /^[0-9]+$/;
		if(regularExpression.test(value) || value === ''){
			otpValueArray[index] = value;
			// focusInputBoxIndex = focusInputBoxIndex + 1;
			setfocusInputBoxIndex(index + 1)
			setOtpValueArray([...otpValueArray]);
		}
		else{
			null
		}
	}


	const onPressVerify = useCallback((nativeEvent)=>{
		const {navigation} = props;
		const enteredOTP = otpValueArray.join('');
		if(otp === enteredOTP){
			crossPlatformToast(transRef.t('loginSuccess'));
			navigation.navigate('CostEstimationCalculator');
		}
		else{
			crossPlatformToast(transRef.t('wrongOTP'));
		}
	}, []);

	const disableVerifyButton = ()=> {
		let disableButton = otpValueArray.some(item => item === '');
		return disableButton
	};

	return(
		<ScrollView style={styles.mainContainer} keyboardShouldPersistTaps={'always'}>
			<CommonHeaderComponent/>
			<Text style={styles.screenHeading}>{transRef.t('otpVerify')}</Text>
			<Image source={require('../appImage/homeIcon.jpg')}  style={styles.loginIcon} />
			<Text style={styles.otpTitleStyle}>{transRef.t('otpSentTo')}</Text>
			<Text style={styles.mobileNumberStyle}>{params.mobileNumber}</Text>
			<BoxOTPInput
				focusInputBoxIndex={focusInputBoxIndex}
				onchangeBoxValue={onchangeBoxValue}
				otpValueArray={otpValueArray}
				// onFocusBox={onFocusBox}
				boxValueLength = {1}
				otpMaxLength = {4}
			/>
			<ButtonComponent
				title={transRef.t('verifyOTP')}
				onPressIn={onPressVerify}
				disabled={disableVerifyButton()}
				mainContainer={styles.buttonContainer}
			/>
			<Text style={styles.signupHintStyle}>{transRef.t('signupHint')}</Text>
		</ScrollView>
	);
}