export function onDeleteWork(partyWorkId) {
	const databaseObject = openDatabase();
	return new Promise((resolve, reject) => {
		databaseObject.transaction(transactionObject => {
			transactionObject.executeSql(
				`DELETE FROM party_table WHERE id = ?;`,
				[partyWorkId],
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