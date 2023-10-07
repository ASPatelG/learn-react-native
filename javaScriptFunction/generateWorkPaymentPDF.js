import {View} from 'react-native';
import * as Print from 'expo-print';

import {translationValues} from '../staticDataFiles/translationValues';
const {en} = translationValues		// Destructure the translation value

export const generateWorkPaymentPDF = async (dataToAddInPDF) => {
	// Define the HTML content with the table data

	let totalAmount = dataToAddInPDF.reduce((accumulator, currentObject)=> {
		return accumulator + Number(currentObject.amount)
	}, 0);
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
					<h3>${en.partyName+"--> "} ${"Anil Kumar Patel"}</h3>
					<h3>${en.connectorName+"--> "} ${"Anil Kumar Patel"}</h3>
				</div>
				<div class="container">
					<h3>${en.mobile+'--> '} ${'8349587093'}</h3>
					<h3>${en.mobile+'--> '} ${'8349587093'}</h3>
				</div>
				<table>
					<tr>
						<th>${en.length}</th>
						<th>${en.width}</th>
						<th>${en.height}</th>
						<th>${en.totalArea}</th>
						<th>${en.workRate}</th>
						<th>${en.amount}</th>
					</tr>
					${dataToAddInPDF.map(
						(item) =>`<tr>
							<td>${item.length}</td>
							<td>${item.width}</td>
							<td>${item.height}</td>
							<td>${item.totalArea}</td>
							<td>${item.rate}</td>
							<td>${item.amount}</td>
						</tr>`)
						.join('')
					}
					<tr>
						<td colspan=${2}>${en.totalAmount}</td>
						<td>${totalAmount}</td>
						<td colspan=${2}>${en.discount}</td>
						<td>${totalDiscount}</td>
					</tr>
					<tr>
						<td colspan=${3}>${en.payableAmount}</td>
						<td colspan=${3}>${totalPayableAmount}</td>
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