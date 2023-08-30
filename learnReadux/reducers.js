export reducers = (state, action)=>{
	switch(action.type){
		case addGivenValue:{
			return state.initialDigit =+ state.givenDigitValue; 
		}
		default:{
			return state;
		}
	}
}