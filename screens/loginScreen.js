import {Text, View} from 'react-native';
import {useState} from 'react';

import { FontAwesome } from '@expo/vector-icons'; 

import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{ connectorApp, programingPractis, enterMobilNumber, submit}} = translationValues;
import {constantValues} from '../staticDataFiles/constantValues';

import {TextInputComponent} from '../components/textInputComponent';
import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import {ButtonComponent} from '../components/buttonComponent';

import {styles} from './screens.styles/loginScreenStyle';


export const LoginScreen = ()=>{
	/* Used to show ui till the app is loading */
	const [mobileNumber, setMobileNumber] = useState('');

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
		if(constantValues.registeredMobileNumber === mobileNumber){
			// Pending the process
		}
	}

	return(
		<View style={styles.mainContainer}>
			<CommonHeaderComponent/>
			<TextInputComponent
				showFieldLabel={true}
				fieldLabelText={enterMobilNumber}
				value={mobileNumber}
				onChangeText={enteredText => onchangeMobileNumber(enteredText)}
				keyboardType='number-pad'
				inputIcon={()=>(<FontAwesome name="mobile-phone" size={24} color="black" />)}
				maxLength={10}
			/>
			<ButtonComponent
				title={submit}
				onPressIn={onPressSubmit}
				disabled={mobileNumber.length < 10}
			/>
		</View>
	);
}