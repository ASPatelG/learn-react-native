import {useEffect, useState, useCallback} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{ connectorApp, programingPractis, offlineCheck, checkContext, offlineSuccess}} = translationValues;
import {crossPlatformToast} from '../components/crossPlatformToast';

import { createTable } from '../offlineFunctionality/createTable';
import { getData } from '../offlineFunctionality/getData';
import { insertData } from '../offlineFunctionality/insertData';

import {contractorContext} from '../createContext/createdContext';
// import {CreateContractor} from '../createContext/createContractor';

import {ContextDataConsume} from '../createContext/contextDataConsume';
import {ContextDataConsumeFourth} from '../createContext/contextDataConsumeFourth';
import ButtonComponent from '../components/buttonComponent';

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

	const contractorInitialDetails = {
		contractorName:'',
		address:'',
		qualification:'',
		setMobileNumber:'',
	}
	const [contractorDetails, setContractorDetails] = useState(contractorInitialDetails);
	const [count, setCount] = useState(0);
	const [value, SetValue]= useState(0);

	const setContractorAllDetails = useCallback((contractorAllDetails)=> {	// To set all contractor details
		setContractorDetails({contractorAllDetails});
	}, []);

	const setContractorAddress = useCallback((address)=> {
		setContractorDetails({...contractorDetails, address});		// To set contractor address
	}, []);

	const setContractorName = useCallback((contractorName)=> {
		let setContractorNameData = {...contractorDetails, contractorName};
		setContractorDetails(setContractorNameData);
	}, []);

	const onPressButton = useCallback(()=>{
		// Functionality imaplementaion till now pending
		crossPlatformToast(`Functionality imaplementaion till now pending`);
	}, []);

	const contractorInformationChange = {setContractorAllDetails, setContractorAddress,setContractorName };

	const onPressIncrement = useCallback((onPressNativeEvent)=>{
		setCount(count+1);
	}, [count]);

	const onPressDecrement = useCallback((onPressNativeEvent)=>{
		SetValue(value+1);
	}, [value]);

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
			<contractorContext.Provider value={{contractorDetails, contractorInformationChange}}>
				<ContextDataConsume/>
			</contractorContext.Provider>
			<ButtonComponent
				title={'Press To Incremeant'}
				onPressIn={onPressIncrement}
				count={count}
				isRerender={false}
			/>
			<ButtonComponent
				title={'Press To DeCremeant'}
				onPressIn={onPressDecrement}
				value={value}
				isRerender={false}
			/>
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