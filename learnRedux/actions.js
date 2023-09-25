import {addGivenValue, changeLanguage, saveLoginUserData} from './actionsType';

/* File to map the action and data */

export const addValueWithInitial = (data)=>({
	type:addGivenValue,
	payload:data
});

export const changeSelectedLanguage = (data)=>({
	type:changeLanguage,
	payload:data
});

export const changeLoginUserData = (data)=>({
	type:saveLoginUserData,
	payload:data
});

export const changeWorkType = (data)=>({
	type:changeWorkType,
	payload:data
});