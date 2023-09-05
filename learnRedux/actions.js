import {addGivenValue} from './actionsType';

/* File to map the action and data */

export const addValueWithInitial = (data)=>({
	type:addGivenValue,
	payload:data
});