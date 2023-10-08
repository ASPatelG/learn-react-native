import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveAnObjectInAsyncStorage = async (keyName, value) =>{//To store data in asynstorage
	if(value === null || value === undefined){	// If falue will be null or undefined --> not save
		// Don't do any things
	}
	else if( typeof(value) === 'string'){	//It will save the string value
		await AsyncStorage.setItem(keyName, value);
	}
	else {	//It will save the object, 0, false, true
		const JSONValue = JSON.stringify(value);//To convert in JSON from javascript(Object)
		await AsyncStorage.setItem(keyName, JSONValue);
	}
}

export const getAnObjectFromAsyncStorage = async (keyName)=>{//To fetch data from asynstorage
	const value = await AsyncStorage.getItem(keyName);
	if(value && typeof(value) === 'string'){
		return value;
	}
	else{
		const javaScriptObject = JSON.parse(value);//To convert in javascript(Object) from JSON
		return javaScriptObject
	}
}

export const removeAnObjectFromAsyncStorage = async (keyName)=>{//To fetch data from asynstorage
	const fetchedObjectFromAsyncstorage = await getAnObjectFromAsyncStorage(keyName);
	if(fetchedObjectFromAsyncstorage){//Key will exist then remove
		await AsyncStorage.removeItem(keyName);
	}
	else{ null }
}