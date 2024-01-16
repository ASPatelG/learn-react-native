import {View} from 'react-native';
import * as Print from 'expo-print';

import transRef from '../learnRedux/reducers';
import { getPartyWorkDetails, getPartyPaymenDetails } from '../sqliteDatabaseFunctionality/getData';

export const generateWorkPaymentPDF = async (dataToAddInPDF) => {
	// Define the HTML content with the table data
	let totalAmount = 0;
	const partyShortDetails = dataToAddInPDF;
	if(partyShortDetails.last_name){
		null;
	}
	else{
		partyShortDetails.last_name = '';
	}
	let pendingAmount = 0;
	if(dataToAddInPDF?.pending_amount <= 0){
		pendingAmount = (dataToAddInPDF.pending_amount * -1) + ' ₹ Advance';
	}
	else{
		pendingAmount = dataToAddInPDF.pending_amount + ' ₹ Pending';
	}
	const partyWorkDetais = await getPartyWorkDetails(dataToAddInPDF.party_id);
	const totalWrokAmount = partyWorkDetais.reduce((accumulator, currentObject)=> {
		return accumulator + Number(currentObject.amount)
	}, 0);
	
	const partyPaymentDetails = await getPartyPaymenDetails(dataToAddInPDF.party_id);
	const totalPaidAmount = partyPaymentDetails.reduce((accumulator, currentObject)=> {
		return accumulator + Number(currentObject.amount)
	}, 0);

	// let totalDiscount = dataToAddInPDF.reduce((accumulator, currentObject)=> accumulator + Number(currentObject.discount), 0);
	let totalDiscount = 0;
	// let totalPayableAmount = totalAmount - totalDiscount;
	let totalPayableAmount = 0;

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
						<td colspan=${7}>${transRef.t('workDetails')}</td>
					</tr>
					<tr>
						<th>${transRef.t('workType')}</th>
						<th>${transRef.t('length')}</th>
						<th>${transRef.t('width')}</th>
						<th>${transRef.t('height')}</th>
						<th>${transRef.t('totalArea')}</th>
						<th>${transRef.t('workRate')}</th>
						<th>${transRef.t('amount')}</th>
					</tr>
					${partyWorkDetais.map(
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
						<td colspan=${7}>${transRef.t('paymentDetails')}</td>
					</tr>
					<tr>
						<th colspan=${3}>${transRef.t('paymentDate')}</th>
						<th colspan=${4}>${transRef.t('amount')}</th>
					</tr>
					${partyPaymentDetails.map(
						(paymentDetails) =>`<tr>
							<td colspan=${3}>${paymentDetails.payment_date}</td>
							<td colspan=${4}>${paymentDetails.amount}</td>
						</tr>`)
						.join('')
					}
					<tr>
						<td colspan=${2}>${transRef.t('totalWorkAmount')}</td>
						<td colspan=${2}>${totalWrokAmount+' ₹'}</td>
						<td colspan=${2}>${transRef.t('totalPaidAmount')}</td>
						<td>${totalPaidAmount+' ₹'}</td>
					</tr>
					<tr>
						<td colspan=${4}>${transRef.t('remainingAmount')}</td>
						<td colspan=${3}>${pendingAmount}</td>
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