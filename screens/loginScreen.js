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
import {getAnObjectFromAsyncStorage, saveAnObjectInAsyncStorage} from '../javaScriptFunction/asynStorageFunctionality';

import {styles} from './screens.styles/loginScreenStyle';

export const LoginScreen = (props)=>{
	/* Used to show ui till the app is loading */
	const [state, setState] = useState({
		mobileNumber:'',
		countryCode:'+91',
		showOTPUI:true,		// to otp send ui(by default used mobileNumber)
		isLoading:true,
	});
	const transRef  = useSelector((state)=>state.transRef);
	const dispatchrefrence = useDispatch()		// To send the data in store

	useEffect(()=>{
		const {navigation} = props;
		const willFocusSubscription = navigation.addListener('focus', ()=> {
			nagigateOnHomeScreen();
		});

		const nagigateOnHomeScreen = async ()=>{	// It will navigate on home screen if businessUserData will exist in async Storage
			const businessUserData = await getAnObjectFromAsyncStorage('businessUserData');
			if(businessUserData){
				const {navigation} = props;
				navigation.navigate('CostEstimationCalculator');
			}
			else{
				setState(previous=>({...previous, isLoading:false}));
			}
		}
		return ()=> {
			willFocusSubscription();
		}
	}, [])

	function onchangeMobileNumber(enteredText){
		const regularExpression = /^[0-9]+$/;
		if(regularExpression.test(enteredText) || enteredText === ''){
			setState(previous=>({...previous, mobileNumber:enteredText}));
		}
		else{
			null
		}
	}

	// useCallback hook used to avoid rerendering of component if not changed props
	const onPressSubmit = async(nativeEvent)=>{
		const {mobileNumber, showOTPUI} = state;
		const {navigation} = props;
		if(constantValues.registeredMobileNumber === mobileNumber || showOTPUI){
			dispatchrefrence(changeLoginUserData({
				loginUserData:{
					mobileNumber:constantValues.registeredMobileNumber,
					userName:constantValues.registeredUserName
				}
			}));
			if(showOTPUI){
				const {countryCode} = state;
				let generatedOTP = generateOTP();
				const mobileNumbersArray = [constantValues.registeredMobileNumber];
				navigation.navigate('OTPVerifyScreen', {
					mobileNumber:countryCode+' '+mobileNumber,
					otp:generatedOTP,
				});
				setState(previous=>({...previous, mobileNumber:""}));
			}
			else{
				saveAnObjectInAsyncStorage(
					'businessUserData',
					{
						mobileNumber:constantValues.registeredMobileNumber,
						userName:constantValues.registeredUserName
					}
				);
				setState(previous=>({...previous, mobileNumber:''}));
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
				value={state?.mobileNumber}
				onChangeText={onchangeMobileNumber}
				keyboardType='number-pad'
				inputIcon={()=>(<FontAwesome name="mobile-phone" size={24} color="black" />)}
				maxLength={10}
				placehodar={transRef.t('phoneNumber')}
			/>
			<ButtonComponent
				title={state.showOTPUI ?transRef.t('getOTP') :transRef.t('submit')}
				onPressIn={onPressSubmit}
				disabled={state?.mobileNumber.length < 10}
				mainContainer={styles.buttonContainer}
			/>
			{
				state.showOTPUI
				? <Text style={styles.signupHintStyle}>{transRef.t('signupHint')}</Text>
				: null
			}
		</ScrollView>
	);
}