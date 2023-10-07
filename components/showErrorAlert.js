import { Alert } from 'react-native';

import {constantValues} from '../staticDataFiles/constantValues';
const {alertTitle} = constantValues;

import {translationValues} from '../staticDataFiles/translationValues';
const {en} = translationValues;

export const showErrorAlert = (errorText='errorText..?', alertTitleText=alertTitle) => {
	Alert.alert(
		alertTitleText,
		errorText,
		[
			{ text: en.ok, onPress: () => {} },
			// Add more buttons as needed
		],
		{ cancelable: false }
	);
};