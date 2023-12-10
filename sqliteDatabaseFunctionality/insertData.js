
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
				'INSERT INTO party_table (first_name, last_name, mobile_number, email, work_type, length, width, height, rate, total_area, amount, discount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
				[partyData.firstName, partyData.lastName, partyData.mobileNumber, partyData.email, partyData.workType, partyData.length, partyData.width, partyData.height, partyData.rate, partyData.totalArea, partyData.amount, partyData.discount],
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

export const insertPersonalDetail = (personalDetail) => {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(tx => {
			tx.executeSql(
				'INSERT INTO personal_details_table (first_name, last_name, mobile_number, email) VALUES (?, ?, ?, ?)',
				[personalDetail.firstName, personalDetail.lastName, personalDetail.mobileNumber, personalDetail.email],
				(tx, results) => {
					const insertedId = results.insertId;
					resolve(`data has been created with id: ${insertedId}`);
				},
				error => {
					reject(`Error creating table:  ${error}`);
				}
			);
		});
	});
}

export const insertWorkDetails = (workDetails) => {
	console.log('insertWorkDetails function called: ', workDetails);
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(tx => {
			tx.executeSql(
				'INSERT INTO work_details_table (party_id, work_type, length, width, height, rate, total_area, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
				[workDetails.party_id, workDetails.work_type, workDetails.length, workDetails.width, workDetails.height, workDetails.rate, workDetails.totalArea, workDetails.amount],
				(tx, results) => {
					const insertedId = results.insertId;
					resolve(`data has been created with id: ${insertedId}`);
				},
				error => {
					console.log('error:      {{{{{: ', error);
					reject(`Error creating table:  ${error}`);
				}
			);
		});
	});
}

export const insertPaymentDetails = (paymentDetails) => {
	console.log('insertPaymentDetails function called: ', paymentDetails);
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(tx => {
			tx.executeSql(
				'INSERT INTO payment_details_table (party_id, amount, payment_date) VALUES (?, ?, ?)',
				[paymentDetails.party_id, paymentDetails.payableAmount, paymentDetails.paymentDate],
				(tx, results) => {
					const insertedId = results.insertId;
					resolve(`data has been created with id: ${insertedId}`);
				},
				error => {
					reject(`Error creating table:  ${error}`);
				}
			);
		});
	});
}

