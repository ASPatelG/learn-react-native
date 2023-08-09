
import * as SQLite from "expo-sqlite";
import {Platform} from 'react-native';

/* This function will be use to open database  */
export const openDatabase = ()=> {
	if (Platform.OS === "web") {
		return {
			transaction: () => {
				return {
					executeSql: () => {},
				};
			},
		};
	}	// If if statement will run the above code will not run

	const db = SQLite.openDatabase("APSinghDB.db");
	return db;
}