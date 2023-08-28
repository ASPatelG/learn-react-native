import {useEffect} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{ connectorApp }} = translationValues;
import {crossPlatformToast} from '../components/crossPlatformToast';

import {}

export const ContextDataConsumeTwo = (props)=>{
	/* Used to show ui till the app is loading */

	const {navigation} = props;

	useEffect(()=>{	
	}, []);

	function onPressButton(){
		crossPlatformToast(`Functionality imaplementaion till now pending`);
	}

	return(
		<View style={{flex:1}}>
			<Pressable
				style={styles.pressableButtonStyle}
				onPressIn={({nativeEvent})=> onPressButton()}
			>
				<Text style={styles.buttonTitle}>Context Data Consume First</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	pressableButtonStyle:{
		backgroundColor:'#175491',
		width:wp('80%'),
		paddingVertical:15,
		paddingHorizontal:5,
		borderRadius:5,
		marginVertical:10,
		alignSelf:'center',
	},
	buttonTitle:{
		textAlign:'center',
		fontSize:14,
		fontWeight:'bold',
		color:'#ffffff',
	}
});