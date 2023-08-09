
import { openDatabase } from './openDatabase';

/* This function will be use to open database  */
export function insertData(ownerData) {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(transactionObject => {
			transactionObject.executeSql(
				'INSERT INTO busines_owner (owner_name, owner_mobile) VALUES (?, ?)',
				[ownerData.owner_name, ownerData.owner_mobile],
				(transactionObject, results) => {
					const insertedId = results.insertId;
					resolve(`data has been created with id: ${insertedId}`);
				},
				(transactionObject, error) => {
					reject(error);
				}
			);
			// databaseObject.closeAsync();		// to close database but unusable
		});
	});
};
