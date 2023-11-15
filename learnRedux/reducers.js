import { I18n } from 'i18n-js';
import {translationValues} from '../staticDataFiles/translationValues';

const transRef = new I18n(translationValues)
transRef.locale = 'hi';	// By default set english
transRef.enableFallback = true;	// When a value is missing from a language it'll fall back to another language with the key present.

const initialValue = {
	givenDigitValue:0,
	transRef:transRef,
	loginUserData:'',
	partyDetails:[],
}

export const reducers = (state = initialValue, action)=>{
	switch(action.type){
		case "addGivenValue":{
			return { ...state, givenDigitValue:state.givenDigitValue + 1}
		}
		case "changeLanguage":{
			const {languageCod} = action.payload;
			return {...state, transRef:{...state.transRef, locale:languageCod}};
		}
		case "saveLoginUserData":{
			const {loginUserData} = action.payload;
			return { ...state, loginUserData:loginUserData}
		}
		case "addParty":{
			const {partyData} = action.payload;
			return {...state, partyDetails:[...state.partyDetails, partyData]}
		}
		case "addPartyTableData":{
			const {partyData} = action.payload;
			return {...state, partyDetails:[...state.partyDetails, ...partyData]}
		}
		case "updateParty":{
			const {partyData, activeIndex} = action.payload;
			const {partyDetails} = state;
			partyDetails[activeIndex] = partyData;
			return {...state, partyDetails:[...partyDetails]}
		}
		case "selectPrintableWork":{
			const {partyData, activeIndex} = action.payload;
			const {partyDetails} = state;
			partyDetails[activeIndex] = partyData;
			return {...state, partyDetails:[...partyDetails]}
		}
		default:{
			return state;
		}
	}
}