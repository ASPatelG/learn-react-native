import {addGivenValue, changeLanguage} from './actionsType';

/* File to map the action and data */

export const addValueWithInitial = (data)=>({
	type:addGivenValue,
	payload:data
});

export const changeSelectedLanguage = (data)=>({
	type:changeLanguage,
	payload:data
});