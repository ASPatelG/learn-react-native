import { openDatabase } from './openDatabase';

/*	!! Note--> oflline table will be deleted if user clear the app storage !!	*/

/* This function will be use to create table */
export const createOwnerTable = () => {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(tx => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS business_table (id INTEGER PRIMARY KEY AUTOINCREMENT, owner_name TEXT, owner_mobile INTEGER)',
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

export const createPartyTable = () => {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(tx => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS party_table (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, mobile_number INTEGER, email TEXT, work_type TEXT, length INTEGER, width INTEGER, height INTEGER, rate INTEGER, total_area INTEGER, amount INTEGER, discount INTEGER, is_selected BOOLEAN DEFAULT 0)',
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

export const createPersonalDetailTable = () => {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(tx => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS personal_details_table (id INTEGER PRIMARY KEY AUTOINCREMENT, mobile_number INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT, is_selected BOOLEAN DEFAULT 0)',
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

export const createPartyWorkTable = () => {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(tx => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS work_details_table (mobile_number INTEGER PRIMARY KEY, work_type TEXT, length INTEGER, width INTEGER, height INTEGER, rate INTEGER, total_area INTEGER, amount INTEGER)',
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

export const createPaymentTable = () => {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(tx => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS payment_details_table (mobile_number INTEGER PRIMARY KEY, amount INTEGER, date text, discount INTEGER)',
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
