import { Alert } from 'react-native';

import {constantValues} from '../staticDataFiles/constantValues';
const {alertTitle} = constantValues;

import transRef from '../learnRedux/reducers';

export const showErrorAlert = (errorText='errorText..?', alertTitleText=alertTitle) => {
	Alert.alert(
		alertTitleText,
		errorText,
		[
			{ text: transRef.t('ok'), onPress: () => {} },
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
			{ text: transRef.t('cancel'), onPress: () => {
				if(onCancel){
					onCancel(extraData);
				}
			} },
			{ text: transRef.t('ok'), onPress: () => {
				if(onConfirm){
					onConfirm(extraData);
				}
			} },
			// Add more button according to need
		],
		{ cancelable: false }
	);
}