
import { openDatabase } from './openDatabase';

/* This function will be use to create table */
export const createTable = () => {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(tx => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS busines_owner (id INTEGER PRIMARY KEY AUTOINCREMENT, owner_name TEXT, owner_mobile INTEGER)',
				[],
				(tx, results) => {
					resolve('Table created successfully');
				},
				error => {
					reject(`Error creating table:  ${error}`);
				}
			);
		});
	});
}
