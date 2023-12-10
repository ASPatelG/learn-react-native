
import { openDatabase } from './openDatabase';

/* This function will be use to open database  */
export function updateBusinessDetail(ownerData) {
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
		});
	});
};

export function updatePartyDetail(partyData) {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(transactionObject => {
			transactionObject.executeSql(
				`UPDATE personal_details_table SET first_name=?, last_name=?, mobile_number=?, email=? WHERE party_id = ?;`,
				[partyData.firstName, partyData.lastName, partyData.mobileNumber, partyData.email, partyData.party_id],
				(transactionObject, results) => {
					const {rowsAffected} = results;
					resolve(`data has been updated rowsAffected: ${rowsAffected}`);
				},
				(transactionObject, error) => {
					reject(error);
				}
			);
		});
	});
};
export function updateSelectWork(partyData) {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(transactionObject => {
			transactionObject.executeSql(
				`UPDATE personal_details_table SET is_selected=? WHERE id = ?;`,
				[partyData.is_selected, partyData.id],
				(transactionObject, results) => {
					const {rowsAffected} = results;
					resolve(`data has been updated rowsAffected: ${rowsAffected}`);
				},
				(transactionObject, error) => {
					reject(error);
				}
			);
		});
	});
};
