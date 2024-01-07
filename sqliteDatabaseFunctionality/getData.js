import { openDatabase } from './openDatabase';

/* This function will be use to open database  */
export function getBusinessData(ownerData) {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(transaction => {
			transaction.executeSql(
				'SELECT * FROM business_table',
				[],
				(_tx, results) => {
					const data = [];
					for (let i = 0; i < results.rows.length; i++) {
						data.push(results.rows.item(i));
					}
					resolve(data);
				},
				(_tx, error) => {
					reject(error);
				}
			);
			// databaseObject.close();
		});
	});
};

/* This function will be use to open database  */
export function getPartyData() {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(transaction => {
			transaction.executeSql(
				'SELECT * FROM personal_details_table',
				[],
				(_tx, results) => {
					const data = [];
					for (let i = 0; i < results.rows.length; i++) {
						data.push(results.rows.item(i));
					}
					resolve(data);
				},
				(_tx, error) => {
					resolve([]);
					// reject(error);
				}
			);
		});
	});
};

export function filterPartyData(filterData) {
	const databaseObject = openDatabase();
	if(filterData.workType){
		return new Promise((resolve, reject) => {
			databaseObject.transaction(transaction => {
				transaction.executeSql(
					'SELECT * FROM party_table WHERE mobile_number=? AND work_type=?',
					[filterData.mobileNumber, filterData.workType],
					(_tx, results) => {
						const data = [];
						for (let i = 0; i < results.rows.length; i++) {
							data.push(results.rows.item(i));
						}
						resolve(data);
					},
					(_tx, error) => {
						reject(error);
					}
				);
			});
		});
	}
	else{
		return new Promise((resolve, reject) => {
			databaseObject.transaction(transaction => {
				transaction.executeSql(
					'SELECT * FROM party_table WHERE mobile_number=?',
					[filterData.mobileNumber],
					(_tx, results) => {
						const data = [];
						for (let i = 0; i < results.rows.length; i++) {
							data.push(results.rows.item(i));
						}
						resolve(data);
					},
					(_tx, error) => {
						reject(error);
					}
				);
			});
		});
	}
};

export function getPartyWorkDetails(partyId) {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(transaction => {
			transaction.executeSql(
				'SELECT * FROM payment_details_table where party_id=?',
				[partyId],
				(_tx, results) => {
					const data = [];
					for (let i = 0; i < results.rows.length; i++) {
						data.push(results.rows.item(i));
					}
					resolve(data);
				},
				(_tx, error) => {
					resolve([]);
					// reject(error);
				}
			);
		});
	});
};

export function getPartyPaymenDetails(partyId) {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(transaction => {
			transaction.executeSql(
				'SELECT * FROM work_details_table where party_id=?',
				[partyId],
				(_tx, results) => {
					const data = [];
					for (let i = 0; i < results.rows.length; i++) {
						data.push(results.rows.item(i));
					}
					resolve(data);
				},
				(_tx, error) => {
					resolve([]);
					// reject(error);
				}
			);
		});
	});
};