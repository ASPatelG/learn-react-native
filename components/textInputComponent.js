import {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{ enterMobilNumber}} = translationValues;


const TextInputComponent = (props)=> {
	/* Used to show ui till the app is loading */
	const {maxLength, showFieldLabel, fieldLabelText, value, onChangeText, inputIcon, ...restProps} = props;

	return(
		<View style={styles.inputBoxStyle}>
			{/* To show the text input */}
			{ showFieldLabel
				?<Text style={styles.inputFieldLabel}>{fieldLabelText}</Text>
				: null
			}
			<View style={{flexdirectiono:'row'}}>
				{/*{inputIcon
					? <inputIcon/>
					: null
				}*/}
				<TextInput
					style={styles.textInputStyle}
					value={value}
					maxLength={maxLength}
					{...restProps}	// To remaingin props
					onChangeText={(enteredText)=> onChangeText(enteredText)}
				/>
			</View>
		</View>
	);
}

export default TextInputComponent;

const styles = StyleSheet.create({
	textInputStyle:{
		paddingLeft:15,
		paddingRight:5,
		paddingTop:15,
		paddingBottom:16,
		marginTop:-10,
		width:wp('87%'),
		fontWeight:'bold',
		fontSize:18,
		color:'#808080',
	},
	inputBoxStyle:{
		borderRadius:5,
		bordrColor:'D3D3D3',
		borderWidth:1,
		width:wp('90%'),
		alignSelf:'center',
		alignItems:'flex-start',
	},
	inputFieldLabel:{
		marginTop:-10,
		fontSize:14,
		fontWeight:'bold',
		marginLeft:10,
		paddingHorizontal:5,
		backgroundColor:'#ffffff',
	},
});


TextInputComponent.defaultProps = {
	maxLength:20,
	fieldLabelText:'Enter Value'
}