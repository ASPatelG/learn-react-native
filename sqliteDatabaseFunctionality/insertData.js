
import { openDatabase } from './openDatabase';

/* This function will be use to open database  */
export function insertBusinessDetail(ownerData) {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(transactionObject => {
			transactionObject.executeSql(
				'INSERT INTO business_table (owner_name, owner_mobile) VALUES (?, ?)',
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

export function insertPartyDetail(partyData) {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(transactionObject => {
			transactionObject.executeSql(
				'INSERT INTO party_table (first_name, last_name, mobile_number, emai, work_type, length, width, height, total_area, amount, discount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
				[partyData.firstName, partyData.lastName, partyData.mobileNumber, partyData.emai, partyData.workType, partyData.length, partyData.width, partyData.height, partyData.totalArea, partyData.amount, partyData.discount],
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
