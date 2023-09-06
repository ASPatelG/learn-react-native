import { I18n } from 'i18n-js';
import {translationValues} from '../staticDataFiles/translationValues';

const transRef = new I18n(translationValues)
transRef.locale = 'hi';	// By default set english
transRef.enableFallback = true;	// When a value is missing from a language it'll fall back to another language with the key present.
// To see the fallback mechanism uncomment the line below to force the app to use the Hindi language.
// i18n.locale = 'hi';

const initialValue = {
	givenDigitValue:0,
	transRef:transRef,
}

export const reducers = (state = initialValue, action)=>{
	switch(action.type){
		case "addGivenValue":{
			return { ...state, givenDigitValue:state.givenDigitValue + 1}
		}
		case "changeLanguage":{
			const {languageCod} = action.payload;
			return { ...state, transRef:{...state.transRef, local:languageCod}}
		}
		default:{
			return state;
		}
	}
}