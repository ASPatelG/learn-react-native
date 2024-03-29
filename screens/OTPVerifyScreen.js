import {Text, ScrollView, Image} from 'react-native';
import {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';

import { FontAwesome } from '@expo/vector-icons'; 

import {constantValues} from '../staticDataFiles/constantValues';
const {registeredUserData} = constantValues;

import BoxOTPInput from '../components/boxOTPInput';
import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import ButtonComponent from '../components/buttonComponent';
import {crossPlatformToast} from '../components/crossPlatformToast';
import {changeLoginUserData} from '../learnRedux/actions';
import {saveAnObjectInAsyncStorage} from '../javaScriptFunction/asynStorageFunctionality';
import {sendSMS} from '../javaScriptFunction/sendSMS';

import {styles} from './screens.styles/OTPVerifyStyles';

export const OTPVerifyScreen = (props)=>{
	/* Used to show ui till the app is loading */
	const {route:{params}} = props;

	const [otp, setOTP] = useState(params.otp);
	const transRef  = useSelector((state)=>state.transRef);
	const [otpValueArray, setOtpValueArray] = useState(['', '', '', '']); 	// To fill generated otp automatically

	useEffect(()=>{
		const openSMSApp = async ()=>{
			console.log('generatedOTP: ', otp);
			const otpSMSText = `Generated OTP --> ${otp} On ASPatel App`;
			const sendSMSResponse = await sendSMS(params.mobileNumber, otpSMSText);
		}
		openSMSApp();
	}, []);

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
	}

	const myRefsArray = Array(4).fill(null).map(() => useRef());

	const onchangeBoxValue = (value, index)=>{
		const regularExpression = /^[0-9]+$/;
		if(regularExpression.test(value) || value === ''){
			otpValueArray[index] = value;
			setOtpValueArray([...otpValueArray]);
			if(myRefsArray[index+1]?.current && value){
				myRefsArray[index+1]?.current.focus();
			}
		}
		else{
			null
		}
	}

	const onFocusTextInput = (index)=>{
		let localOtpValueArray = otpValueArray;
		if(otpValueArray[index]){
			for(index; index < otpValueArray?.length; index++){
				localOtpValueArray[index] = '';
			}
			setOtpValueArray([...localOtpValueArray]);
		}
	}


	const onPressVerify = (nativeEvent)=>{
		const {navigation} = props;
		const enteredOTP = otpValueArray.join('');
		if(otp === enteredOTP){
			let finedData = registeredUserData.find(element => element.mobileNumber === params?.mobileNumber?.slice(3, params?.mobileNumber?.length));		// slice used to remove countrycode
			if(finedData){
				saveAnObjectInAsyncStorage(
					'businessUserData',
					{
						mobileNumber:finedData?.userName,
						userName:finedData?.mobileNumber
					}
				);
			}
			else{
				saveAnObjectInAsyncStorage(
					'businessUserData',
					{
						mobileNumber:params?.mobileNumber,
						userName:params?.mobileNumber
					}
				);
			}
			/* userData has set from constant because i will register user before creating build */

			navigation.navigate('CostEstimationCalculator');
		}
		else{
			crossPlatformToast(transRef.t('wrongOTP'));
		}
	};

	const disableVerifyButton = ()=> {
		let disableButton = otpValueArray.some(item => item === '');
		return disableButton
	};

	return(
		<ScrollView style={styles.mainContainer} keyboardShouldPersistTaps={'always'}>
			<CommonHeaderComponent/>
			<Text style={styles.screenHeading}>{transRef.t('otpVerify')}</Text>
			<Image source={require('../assets/images/homeIcon.jpg')}  style={styles.loginIcon} />
			<Text style={styles.otpTitleStyle}>{transRef.t('otpSentTo')}</Text>
			<Text style={styles.mobileNumberStyle}>{params.mobileNumber}</Text>
			<BoxOTPInput
				onchangeBoxValue={onchangeBoxValue}
				otpValueArray={otpValueArray}
				myRefsArray={myRefsArray}
				boxValueLength = {1}
				otpMaxLength = {4}
				onFocusTextInput={onFocusTextInput}
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