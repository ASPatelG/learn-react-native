import {Text, View} from 'react-native';
import {useState} from 'react';

import { FontAwesome } from '@expo/vector-icons'; 

import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{ connectorApp, programingPractis, enterMobilNumber, submit}} = translationValues;
import {constantValues} from '../staticDataFiles/constantValues';

import {TextInputComponent} from '../components/textInputComponent';
import {CommonHeaderComponent} from '../components/commonHeaderComponent';
import {ButtonComponent} from '../components/buttonComponent';

import {styles} from './screens.styles/homeScreenStyles';


export const HomeScreen = (props)=>{ 	// props used to get user props and default props
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
		</View>
	);
}