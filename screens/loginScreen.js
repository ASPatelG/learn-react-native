import {Text, View, Image} from 'react-native';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import { FontAwesome } from '@expo/vector-icons'; 

import {constantValues} from '../staticDataFiles/constantValues';
import {TextInputComponent} from '../components/textInputComponent';
import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import {ButtonComponent} from '../components/buttonComponent';
import {crossPlatformToast} from '../components/crossPlatformToast';
import {changeLoginUserData} from '../learnRedux/actions';

import {styles} from './screens.styles/loginScreenStyle';

export const LoginScreen = (props)=>{
	/* Used to show ui till the app is loading */
	const [mobileNumber, setMobileNumber] = useState('');
	const [showGetOtp] = useState(true);
	const transRef  = useSelector((state)=>state.transRef);
	const dispatchrefrence = useDispatch()		// To send the data in store

	function onchangeMobileNumber(enteredText){
		const regularExpression = /^[0-9]+$/;
		if(regularExpression.test(enteredText) || enteredText === ''){
			setMobileNumber(enteredText);
		}
		else{
			null
		}
	}

	function onPressSubmit(nativeEvent){
		const {navigation} = props;
		if(constantValues.registeredMobileNumber === mobileNumber){
			dispatchrefrence(changeLoginUserData({loginUserData:{mobileNumber, userName:constantValues.registeredUserName}}));
			navigation.navigate('CostEstimationCalculator');
		}
		else{
			crossPlatformToast(transRef.t('notRegistered'));
		}
	}

	return(
		<View style={styles.mainContainer}>
			<CommonHeaderComponent/>
			<Text style={styles.screenHeading}>{transRef.t('login')}</Text>
			<Image source={require('../appImage/homeIcon.jpg')}  style={styles.loginIcon} />
			<TextInputComponent
				showFieldLabel={true}
				fieldLabelText={transRef.t('enterMobilNumber')}
				value={mobileNumber}
				onChangeText={enteredText => onchangeMobileNumber(enteredText)}
				keyboardType='number-pad'
				inputIcon={()=>(<FontAwesome name="mobile-phone" size={24} color="black" />)}
				maxLength={10}
				placehodar={transRef.t('phoneNumber')}
			/>
			<ButtonComponent
				title={transRef.t('submit')}
				onPressIn={onPressSubmit}
				disabled={mobileNumber.length < 10}
				mainContainer={styles.buttonContainer}
			/>
		</View>
	);
}