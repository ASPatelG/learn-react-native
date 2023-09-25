import {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const BoxOTPInput = (props)=> {
	/* Used to show ui till the app is loading */
	const { otpValueArray, onchangeBoxValue, focusInputBoxIndex, otpMaxLength, boxValueLength, ...restProps} = props;
	return(
		<View style={styles.inputBoxContainer}>
			{otpValueArray.map((item, index)=>
				<TextInput
					key={index}
					autoFocus={index === focusInputBoxIndex}
					style={styles.textInputStyle}
					value={otpValueArray[index]}
					maxLength={boxValueLength}
					keyboardType='number-pad'
					onChangeText={(enteredText)=> onchangeBoxValue(enteredText, index)}
					// {...restProps}	// To remaingin props
				/>
			)}
		</View>
	)
}

export default BoxOTPInput;

const styles = StyleSheet.create({
	textInputStyle:{
		padding:5,
		width:50,
		fontWeight:'bold',
		fontSize:18,
		color:'#808080',
		borderColor:'#d3d3d3',
		borderWidth:1,
		borderRadius:8,
		textAlign:'center',
	},
	inputBoxContainer:{
		alignSelf:'center',
		justifyContent:'space-evenly',
		flexDirection:'row',
		width:wp('80%')
	},
});


BoxOTPInput.defaultProps = {
	maxLength:1,
}