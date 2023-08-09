import {Text, View} from 'react-native';
import {useState} from 'react';

import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{ connectorApp, programingPractis, enterMobilNumber}} = translationValues;

import {TextInputComponent} from '../components/textInputComponent';
import {CommonHeaderComponent} from '../components/commonHeaderComponent';

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

	return(
		<View style={styles.mainContainer}>
			<CommonHeaderComponent/>
			<TextInputComponent
				showFieldLabel={true}
				fieldLabelText={enterMobilNumber}
				value={mobileNumber}
				onChangeInputValue={enteredText => onchangeMobileNumber(enteredText)}
				keyboardType='number-pad'
			/>
		</View>
	);
}