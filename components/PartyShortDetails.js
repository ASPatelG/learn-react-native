import {memo, useState} from 'react';
import {View, Text, StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import {selectWorkToPrint} from '../learnRedux/actions';

import {confirmationAlert} from '../components/commonAlerts';
import {crossPlatformToast} from './crossPlatformToast';

const PartyShortDetails = (props)=>{
	const dispatchRefrence = useDispatch()		// To send the data in store
	const {partySomeDetails, index, onDeleteWork}  = props;
	const transRef  = useSelector((state)=>state.transRef);
	const [state, setState] = useState({reRenderFlag:null});

	const onPress = (partySomeDetails, index)=>{
		const {navigation} = props;
		navigation.navigate('AddUpdatePartyWorkDetails', {partySomeDetails, activeIndex:index});
	}

	onSelectWork = async ()=>{
		if(!partySomeDetails?.is_selected && !state.reRenderFlag){
			partySomeDetails["is_selected"] = !partySomeDetails?.is_selected;
			setState(previous=>({...previous, reRenderFlag:true}));//to rerender
			dispatchRefrence(selectWorkToPrint({partyData:partySomeDetails, activeIndex:index}));
		}
		else if(partySomeDetails?.is_selected === true){
			partySomeDetails["is_selected"] = !partySomeDetails?.is_selected;
			setState(previous=>({...previous, reRenderFlag:false}));//to rerender
			dispatchRefrence(selectWorkToPrint({partyData:partySomeDetails, activeIndex:index}));
		}
		else{
			crossPlatformToast(transRef.t('selectOnePartyHint'));
			// setState(previous=>({...previous, reRenderFlag:false}));//to rerender
		}
	}

	return(
		<TouchableOpacity
			key={index}
			style={partySomeDetails.is_selectedWork || partySomeDetails.is_selected == 1 ?styles.partySomeDetailsBackground :styles.partySomeDetailsContainer} 	// Since sqlite return 0/1 as boolean value
			onPress={onSelectWork}
		>
			<View style={styles.columnStyle}>
				<Text style={styles.partyNameStyle}>{partySomeDetails.first_name} {partySomeDetails.lastName}</Text>
			</View>
			<View style={styles.columnStyle}>
				<Text style={styles.mobileNumberStyle}>{partySomeDetails.mobile_number}</Text>
			</View>
			<View style={styles.columnStyle}>
				<Text style={styles.columnValueStyle}>{partySomeDetails.pending_amount ?partySomeDetails.pending_amount :'---'}</Text>
			</View>
			<View style={styles.rightColumnStyle}>
				<Pressable
					onPressIn={(nativeEvent)=>onPress(partySomeDetails, index)}
					style={styles.rightContentStyle}
				>
					<AntDesign name="edit" size={22} color="#808080" />
				</Pressable>
				<Pressable
					style={styles.deleteIconStyle}
					onPressIn={(nativeEvent)=>confirmationAlert(transRef.t('workDeletionHint'), onDeleteWork, null, partySomeDetails)}
				>
					<MaterialIcons name="delete-outline" size={30} color="#ff0000" />
				</Pressable>
			</View>
		</TouchableOpacity>
	);
}

export default memo(PartyShortDetails);

const styles = StyleSheet.create({
	columnStyle:{
		paddingVertical:15,
		paddingHorizontal:3,
		width:wp('25.07%'),
		borderLeftWidth:1,
		borderLeftColor:'#B3B3B3',
		flexDirection:'row',
		alignItems:'center',
	},
	partySomeDetailsContainer:{
		width:wp('100%'),
		flexDirection:'row',
		justifyContent:'space-between',
		alignSelf:'center',
		borderBottomWidth:1,
		borderBottomColor:'#D3D3D3',
	},
	partySomeDetailsBackground:{
		width:wp('100%'),
		flexDirection:'row',
		justifyContent:'space-between',
		alignSelf:'center',
		borderBottomWidth:1,
		borderBottomColor:'#D3D3D3',
		backgroundColor:'#D3D3D3',
	},
	columnValueStyle:{
		fontSize:15,
		fontWeight:'bold',
		color:'#808080',
		width:wp('21.5%'),
		textAlign:'center',
	},
	partyNameStyle:{
		fontSize:15,
		fontWeight:'bold',
		color:'#38C6F4',
		width:wp('21.5%'),
		textAlign:'center',
	},
	mobileNumberStyle:{
		fontSize:14,
		fontWeight:'bold',
		color:'#FFC107',
		width:wp('21.5%'),
		textAlign:'center',
	},
	rightColumnStyle:{
		flexWrap:'wrap',
		paddingVertical:15,
		paddingHorizontal:15,
		justifyContent:'space-between',
		width:wp('25.07%'),
		borderLeftWidth:1,
		borderLeftColor:'#B3B3B3',
		flexDirection:'row',
		alignItems:'center',
	},
	deleteIconStyle:{
		marginLeft:8,
	},
	rightContentStyle:{
		flexDirection:'row',
	},
});