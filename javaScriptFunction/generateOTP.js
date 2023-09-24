export const generateOTP = ()=> {
	const digits = "0123456789";
	let otp = "";
	for (let i = 0; i < 4; i++) {	// To generate 4 length of number(string)
		otp += digits[Math.floor(Math.random() * 10)];
	}
	return otp
}
