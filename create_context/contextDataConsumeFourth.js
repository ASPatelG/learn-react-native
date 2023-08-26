import {useEffect} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{ connectorApp }} = translationValues;
import {crossPlatformToast} from '../components/crossPlatformToast';

export const contextDataConsumerFourth = (props)=>{
	/* Used to show ui till the app is loading */

	const {navigation} = props;

	useEffect(()=>{
	}, []);

	function onPressButton(){
		// Functionality imaplementaion till now pending
		console.log(`Functionality imaplementaion till now pending`);
	}


	return(
		<Pressable
			style={styles.pressableButtonStyle}
			onPressIn={({nativeEvent})=> onPressButton()}
		>
			<Text style={styles.buttonTitle}>Context Data Consume Fourth</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	pressableButtonStyle:{
		backgroundColor:'#175491',
		width:wp('80%'),
		paddingVertical:15,
		paddingHorizontal:5,
		borderRadius:5,
		marginTop:10,
		alignSelf:'center',
	},
	buttonTitle:{
		textAlign:'center',
		fontSize:14,
		fontWeight:'bold',
		color:'#ffffff',
	}
});