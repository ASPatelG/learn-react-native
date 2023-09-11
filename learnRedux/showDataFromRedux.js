import {memo} from 'react';
import {Text, View} from 'react-native';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';		// shallowEqual to check skip unwanted rerendering

import { FontAwesome } from '@expo/vector-icons'; 

import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{ connectorApp, programingPractis, enterMobilNumber, submit}} = translationValues;
import {constantValues} from '../staticDataFiles/constantValues';
import {ButtonComponent} from '../components/buttonComponent';

import {addValueWithInitial, changeSelectedLanguage} from './actions';

import {styles} from '../screens/screens.styles/homeScreenStyles';

import { NativeModules } from 'react-native'


export const ShowDataFromRedux = ((props)=>{ 	// props used to get user props and default props
	/* Used to show ui till the app is loading */
	const givenDigitValue = useSelector((state)=> state.givenDigitValue);		// to get data from store
	const transRef  = useSelector((state)=>state.transRef);
	const dispatchrefrence = useDispatch()		// To send the data in store

	function onPressIncrement(onPressNativeEvent){
		dispatchrefrence(addValueWithInitial({data:givenDigitValue+5}));		// Passed data will be in payload
		dispatchrefrence(changeSelectedLanguage({languageCod:'en'}));
	}


	return(
		<View style={styles.mainContainer}>
			<Text style={{textAlign:'center'}}>Value is: {givenDigitValue} {transRef.t('offlineSuccess')}</Text>
			<ButtonComponent
				title={'Press To Incremeant'}
				onPressIn={onPressIncrement}
			/>
		</View>
	);
});