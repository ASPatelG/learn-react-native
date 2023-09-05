const initialValue = {
	givenDigitValue:0
}

export const reducers = (state = initialValue, action)=>{
	switch(action.type){
		case "addGivenValue":{
			return { ...state, givenDigitValue:state.givenDigitValue + 1} // We can use action.data to set
		}
		default:{
			return state;
		}
	}
}