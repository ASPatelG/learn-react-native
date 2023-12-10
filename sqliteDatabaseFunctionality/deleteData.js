import { openDatabase } from './openDatabase';

export function deleteParty(party_id) {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(transactionObject => {
			transactionObject.executeSql(
				`DELETE FROM personal_details_table WHERE party_id = ?;`,
				[party_id],
				(transactionObject, results) => {
					deletePayment(party_id);
					deleteWork(party_id);
					const {rowsAffected} = results;
					resolve(`data has been deleted rowsAffected: ${rowsAffected}`);
				},
				(transactionObject, error) => {
					reject(error);
				}
			);
		});
	});
};
export function deletePayment(party_id) {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(transactionObject => {
			transactionObject.executeSql(
				`DELETE FROM payment_details_table WHERE party_id = ?;`,
				[party_id],
				(transactionObject, results) => {
					const {rowsAffected} = results;
					resolve(`data has been deleted rowsAffected: ${rowsAffected}`);
				},
				(transactionObject, error) => {
					reject(error);
				}
			);
		});
	});
};
export function deleteWork(party_id) {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(transactionObject => {
			transactionObject.executeSql(
				`DELETE FROM work_details_table WHERE party_id = ?;`,
				[party_id],
				(transactionObject, results) => {
					const {rowsAffected} = results;
					resolve(`data has been deleted rowsAffected: ${rowsAffected}`);
				},
				(transactionObject, error) => {
					reject(error);
				}
			);
		});
	});
};