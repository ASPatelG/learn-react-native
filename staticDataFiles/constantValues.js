export const constantValues = {
	registeredMobileNumber:'8349587093',	// To stop login by other number after share the app
	registeredUserName:'Anil Singh',
	crossPlatformToastBackground:'#B1E9E7',		// Toast styles and value
	crossPlatformToastTextColor:'#175491',
	crossPlatformToastPosition: -70,
	crossPlatformToastDelay: 0,
	crossPlatformToastOpacity:1,
	crossPlatformToastShadow: true,
	crossPlatformToastAnimation: false,
	crossPlatformToastHideOnPress: false,
	crossPlatformToastDuration:1500,
	workTypes:[
		{
			label:'all',
			value:'all',
		},
		{
			label:'roof',
			value:'roof',
		},
		{
			label:'beem',
			value:'beem',
		},
		{
			label:'wall',
			value:'wall',
		},
		{
			label:'floor',
			value:'floor',
		}
	],
	alertTitle:'Anil Developer',
}

export const regularExpressionOnlyDigit = /^\d+$/;
export const regularExpressionDecimal = /^\d*\.?\d+$/;
/*
	^: Asserts the start of the string.
	\d*: Matches zero or more digits (before the decimal point for integers).
	\.: Matches the decimal point.
	\d+: Matches one or more digits after the decimal point (for floating-point numbers).
	$: Asserts the end of the string.
*/