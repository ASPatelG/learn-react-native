import {
	addGivenValue,
	changeLanguage,
	saveLoginUserData,
	addParty,
	updateParty,
	addPartyTableData,
} from './actionsType';

import {getPartyData} from '../sqliteDatabaseFunctionality/getData';

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

export const addPartyDetails = (data)=>({
	type:addParty,
	payload:data
});

export const setPartyTableDataInStore = (data)=>({
	type:addPartyTableData,
	payload:data
});

export const updatePartyDetails = (data)=>({
	type:updateParty,
	payload:data
});