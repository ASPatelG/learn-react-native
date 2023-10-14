import {Text, ScrollView, Image} from 'react-native';
import {useState, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import { FontAwesome } from '@expo/vector-icons'; 

import {constantValues} from '../staticDataFiles/constantValues';

import TextInputComponent from '../components/textInputComponent';
import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import ButtonComponent from '../components/buttonComponent';
import {crossPlatformToast} from '../components/crossPlatformToast';

import {changeLoginUserData} from '../learnRedux/actions';

import {generateOTP} from '../javaScriptFunction/generateOTP';
import {sendSMS} from '../javaScriptFunction/sendSMS';
import {getAnObjectFromAsyncStorage, saveAnObjectInAsyncStorage} from '../javaScriptFunction/asynStorageFunctionality';

import {styles} from './screens.styles/loginScreenStyle';

export const LoginScreen = (props)=>{
	/* Used to show ui till the app is loading */
	const [mobileNumber, setMobileNumber] = useState('');
	const [countryCode, setContryCode] = useState('+91');
	const [showOTPUI] = useState(true);		// to otp send ui(by default used mobileNumber)
	const transRef  = useSelector((state)=>state.transRef);
	const dispatchrefrence = useDispatch()		// To send the data in store

	useEffect(()=>{
		const nagigateOnHomeScreen = async ()=>{	// It will navigate on home screen if businessUserData will exist in async Storage
			const businessUserData = await getAnObjectFromAsyncStorage('businessUserData');
			if(businessUserData){
				const {navigation} = props;
				navigation.navigate('CostEstimationCalculator');
			}
		}
		nagigateOnHomeScreen();
	}, [])

	function onchangeMobileNumber(enteredText){
		const regularExpression = /^[0-9]+$/;
		if(regularExpression.test(enteredText) || enteredText === ''){
			setMobileNumber(enteredText);
		}
		else{
			null
		}
	}

	// useCallback hook used to avoid rerendering of component if not changed props
	const onPressSubmit = async(nativeEvent)=>{
		const {navigation} = props;
		if(constantValues.registeredMobileNumber === mobileNumber || showOTPUI){
			dispatchrefrence(changeLoginUserData({
				loginUserData:{
					mobileNumber:constantValues.registeredMobileNumber,
					userName:constantValues.registeredUserName
				}
			}));
			if(showOTPUI){
				let generatedOTP = generateOTP();
				console.log('generatedOTP: ', generatedOTP);
				const mobileNumbersArray = [constantValues.registeredMobileNumber];
				const otpSMSText = `Generated OTP --> ${generatedOTP} On ASPatel App`;
				const sendSMSResponse = await sendSMS(mobileNumbersArray, otpSMSText);
				navigation.navigate('OTPVerifyScreen', {
					mobileNumber:countryCode+' '+mobileNumber,
					otp:generatedOTP,
				});
				setMobileNumber('');
			}
			else{
				saveAnObjectInAsyncStorage(
					'businessUserData',
					{
						mobileNumber:constantValues.registeredMobileNumber,
						userName:constantValues.registeredUserName
					}
				);
				setMobileNumber('');
				navigation.navigate('CostEstimationCalculator');
			}
		}
		else{
			crossPlatformToast(transRef.t('notRegistered'));
		}
	}

	return(
		<ScrollView style={styles.mainContainer} keyboardShouldPersistTaps={'always'}>
			<CommonHeaderComponent/>
			<Text style={styles.screenHeading}>{transRef.t('login')}</Text>
			<Image source={require('../appImage/homeIcon.jpg')}  style={styles.loginIcon} />
			<TextInputComponent
				showFieldLabel={true}
				fieldLabelText={transRef.t('enterMobilNumber')}
				value={mobileNumber}
				onChangeText={onchangeMobileNumber}
				keyboardType='number-pad'
				inputIcon={()=>(<FontAwesome name="mobile-phone" size={24} color="black" />)}
				maxLength={10}
				placehodar={transRef.t('phoneNumber')}
			/>
			<ButtonComponent
				title={showOTPUI ?transRef.t('getOTP') :transRef.t('submit')}
				onPressIn={onPressSubmit}
				disabled={mobileNumber.length < 10}
				mainContainer={styles.buttonContainer}
			/>
			{
				showOTPUI
				? <Text style={styles.signupHintStyle}>{transRef.t('signupHint')}</Text>
				: null
			}
		</ScrollView>
	);
}