import {useEffect, useContext} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {translationValues} from '../staticDataFiles/translationValues';
const {hi:{ connectorApp}} = translationValues;
import {crossPlatformToast} from '../components/crossPlatformToast';
import {contractorContext} from '../createContext/createdContext';
import {ContextDataConsumeFourth} from './contextDataConsumeFourth';

export const ContextDataConsume = (props)=>{
	/* Used to show ui till the app is loading */


	const {contractorDetails, contractorInformationChange} = useContext(contractorContext);
	console.log('contractorDetails: ', contractorDetails);
	console.log('contractorInformationChange: ', contractorInformationChange);

	const {navigation} = props
	useEffect(()=>{
	}, []);

	function onPressButton(){
		// Functionality imaplementaion till now pending
		contractorInformationChange.setContractorName('Anil singh parihar ji');
		console.log("contractorDetails after change the data: ", contractorDetails);
		crossPlatformToast(`Functionality imaplementaion till now pending but customer name is: ${contractorDetails.contractorName}`);
	}


	return(
		<>
			<Pressable
				style={styles.pressableButtonStyle}
				onPressIn={({nativeEvent})=> onPressButton()}
			>
				<Text style={styles.buttonTitle}>Context Data Consume</Text>
			</Pressable>
			{/*<contractorContext.Consumer>
				{(consumerData)=>{
					// This is the old way to read
					(<>
						<Text>New way to consume data</Text>
					</>)
				}}
			</contractorContext.Consumer>*/}
			{/*<ContextDataConsumeFourth/>*/}
		</>
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