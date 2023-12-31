import {View} from 'react-native';
import * as Print from 'expo-print';

import transRef from '../learnRedux/reducers';

export const generateWorkPaymentPDF = async (dataToAddInPDF) => {
	// Define the HTML content with the table data

	let totalAmount = dataToAddInPDF.reduce((accumulator, currentObject)=> {
		return accumulator + Number(currentObject.amount)
	}, 0);

	const partyShortDetails = dataToAddInPDF[0];
	if(partyShortDetails.last_name){
		null;
	}
	else{
		partyShortDetails.last_name = '';
	}

	let totalDiscount = dataToAddInPDF.reduce((accumulator, currentObject)=> accumulator + Number(currentObject.discount), 0);

	let totalPayableAmount = totalAmount - totalDiscount;

	const htmlContent = `
		<html>
			<head>
				<style>
					table {
						width: 100%;
						border-collapse: collapse;
					}
					th, td {
						border: 1px solid black;
						padding: 8px;
						text-align: left;
					}
					.container {
						display: grid;
						grid-template-columns: 1fr 1fr; /* Two equal-width columns */
						gap: 10px; /* Optional: Add gap between contents */
					}
				</style>
			</head>
			<body>
				<h1>Work Details With Payment</h1>
				<div class="container">
					<h3>${transRef.t('partyName')+"--> "} ${partyShortDetails.first_name+" "+partyShortDetails.last_name}</h3>
					<h3>${transRef.t('connectorName')+"--> "} ${"Anil Kumar Patel"}</h3>
					<h3>${transRef.t('mobile')+'--> '} ${partyShortDetails.mobile_number}</h3>
					<h3>${transRef.t('mobile')+'--> '} ${'8349587093'}</h3>
				</div>
				<table>
					<tr>
						<th>${transRef.t('workType')}</th>
						<th>${transRef.t('length')}</th>
						<th>${transRef.t('width')}</th>
						<th>${transRef.t('height')}</th>
						<th>${transRef.t('totalArea')}</th>
						<th>${transRef.t('workRate')}</th>
						<th>${transRef.t('amount')}</th>
					</tr>
					${dataToAddInPDF.map(
						(item) =>`<tr>
							<th>${item.work_type}</th>
							<td>${item.length}</td>
							<td>${item.width}</td>
							<td>${item.height}</td>
							<td>${item.total_area}</td>
							<td>${item.rate}</td>
							<td>${item.amount}</td>
						</tr>`)
						.join('')
					}
					<tr>
						<td colspan=${2}>${transRef.t('totalAmount')}</td>
						<td colspan=${2}>${totalAmount+' ₹'}</td>
						<td colspan=${2}>${transRef.t('discount')}</td>
						<td>${totalDiscount}</td>
					</tr>
					<tr>
						<td colspan=${4}>${transRef.t('payableAmount')}</td>
						<td colspan=${3}>${totalPayableAmount+' ₹'}</td>
					</tr>
				</table>
			</body>
		</html>
	`;

	try {
		// Generate the PDF from HTML content
		const { uri } = await Print.printToFileAsync({ html: htmlContent });
		// Open the generated PDF in Expo's PDF viewer
		await Print.printAsync({ uri });
	}
	catch (error) {
		console.error('Error generating PDF:', error);
	}
};