import * as SMS from 'expo-sms';

export const sendSMS = (mobileNumber, smsText) => {
	return new Promise( async (resolve, reject) => {
		const isAvailable = await SMS.isAvailableAsync();
		if (isAvailable) {
			const { result } = await SMS.sendSMSAsync(
				mobileNumber,
				smsText
			);

			if (result === SMS?.SentStatus?.SENT) {
				resolve('SMS sent successfully!');
			}
			else {
				resolve('Failed to send SMS');
			}
		}
		else {
			resolve('SMS is not available on this device.');
		}
	});
};