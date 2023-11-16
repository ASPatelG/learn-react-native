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

function defaultOnConfirm(extraData){
	console.log('!! do nothing on confirm !!');
}

function defaultOnCancel(extraData){
	console.log('!! do nothing on cancel !!');
}

export function confirmationAlert(confirmationHint='confirmationHint..?', onConfirm=defaultOnConfirm, onCancel=defaultOnCancel, extraData='', alertTitleText=alertTitle){
	Alert.alert(
		alertTitleText,
		confirmationHint,
		[
			{ text: en.ok, onPress: () => {
				if(onConfirm){
					onConfirm(extraData);
				}
			} },
			{ text: en.cancel, onPress: () => {
				if(onCancel){
					onCancel(extraData);
				}
			} },
			// Add more button according to need
		],
		{ cancelable: false }
	);
}