
import { openDatabase } from './openDatabase';

/* This function will be use to open database  */
export function getData(ownerData) {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(transaction => {
			transaction.executeSql(
				'SELECT * FROM busines_owner',
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
