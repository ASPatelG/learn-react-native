import {useEffect} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{ connectorApp, programingPractis, offlineCheck, checkContext, offlineSuccess}} = translationValues;
import {crossPlatformToast} from '../components/crossPlatformToast';

import { createTable } from '../offlineFunctionality/createTable';
import { getData } from '../offlineFunctionality/getData';
import { insertData } from '../offlineFunctionality/insertData';

import {ContextDataConsume} from '../create_context/contextDataConsume';

export const ProgramingPractiseRoot = (props)=>{
	/* Used to show ui till the app is loading */

	const {navigation} = props;

	useEffect(()=>{		// is as didmount,willunmount create async function here
		// async function createGetOfflineData() {
		// 	const createTableOutput = await createTable();
		// 	let ownerData = {owner_name:'Anil singh patel', owner_mobile:'8349587093'};
		// 	const isertDataOutput = await insertData(ownerData);
		// 	const getDataOutput = await getData();
		// }
		// createGetOfflineData();  // to check offline functionality
		// crossPlatformToast(offlineSuccess);
	}, []);

	function onPressButton(){
		// Functionality imaplementaion till now pending
		console.log(`Functionality imaplementaion till now pending`);
		crossPlatformToast(`Functionality imaplementaion till now pending`);
	}


	return(
		<View style={{flex:1}}>
			<Pressable
				style={styles.pressableButtonStyle}
				onPressIn={({nativeEvent})=> onPressButton()}
			>
				<Text style={styles.buttonTitle}>{offlineCheck}</Text>
			</Pressable>

			<Pressable
				style={styles.pressableButtonStyle}
				onPressIn={({nativeEvent})=> onPressButton()}
			>
				<Text style={styles.buttonTitle}>{checkContext}</Text>
			</Pressable>
			<ContextDataConsume/>
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