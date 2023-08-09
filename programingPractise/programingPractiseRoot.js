import {useEffect} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{ connectorApp, programingPractis}} = translationValues;

import { createTable } from '../offlineFunctionality/createTable';
import { getData } from '../offlineFunctionality/getData';
import { insertData } from '../offlineFunctionality/insertData';

export const ProgramingPractiseRoot = (props)=>{
	/* Used to show ui till the app is loading */

	const {navigation} = props;

	useEffect(()=>{		// is as didmount,willunmount create async function here
		async function createGetOfflineData() {
			const createTableOutput = await createTable();
			let ownerData = {owner_name:'Anil singh patel', owner_mobile:'8349587093'};
			const isetDataOutput = await insertData(ownerData);
			const getDataOutput = await getData();
		}
		createGetOfflineData();
	}, []);

	function onPressButton(){
	}


	return(
		<View style={{flex:1}}>
			<Pressable
				style={styles.pressableButtonStyle}
				onPressIn={({nativeEvent})=> onPressButton()}
			>
				<Text style={styles.buttonTitle}>OpenOfflineDatabase</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	pressableButtonStyle:{
		backgroundColor:'#175491',
		width:80,
		paddingVertical:5,
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