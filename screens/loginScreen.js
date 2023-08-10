import {Text, View} from 'react-native';
import {useState} from 'react';

import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{ connectorApp, programingPractis, enterMobilNumber}} = translationValues;
import {contantValues} from '../staticDataFiles/constantValues';

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

	return(
		<View style={styles.mainContainer}>
			<CommonHeaderComponent/>
			<TextInputComponent
				showFieldLabel={true}
				fieldLabelText={enterMobilNumber}
				value={mobileNumber}
				onChangeText={enteredText => onchangeMobileNumber(enteredText)}
				keyboardType='number-pad'
			/>
			<ButtonComponent
				// pressableProps={}
				// texProps={}
			/>
		</View>
	);
}