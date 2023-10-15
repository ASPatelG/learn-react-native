import {memo} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import {useDispatch} from 'react-redux';
// import { markEmployeeAsStar} from '../redux/actions';

const PartyShortDetails = (props)=>{
	const dispatchRefrence = useDispatch()		// To send the data in store
	const {partySomeDetails, index}  = props;

	const onPress = (partySomeDetails, index)=>{
		const {navigation} = props;
		navigation.navigate('AddUpdatePartyWorkDetails', {partySomeDetails, activeIndex:index});
	}

	return(
		<View
			key={index}
			style={styles.partySomeDetailsContainer}
		>
			<View style={styles.columnStyle}>
				<Text style={styles.partyNameStyle}>{partySomeDetails.first_name} {partySomeDetails.lastName}</Text>
			</View>
			<View style={styles.columnStyle}>
				<Text style={styles.mobileNumberStyle}>{partySomeDetails.mobile_number}</Text>
			</View>
			<View style={styles.columnStyle}>
				<Text style={styles.columnValueStyle}>{partySomeDetails.amount}</Text>
			</View>
			<Pressable
				onPressIn={(nativeEvent)=>onPress(partySomeDetails, index)}
				style={styles.columnStyle}
			>
				<Text style={styles.rightColumnValueStyle}>{partySomeDetails.work_type}</Text>
				<AntDesign name="right" size={26} color="#808080" />
			</Pressable>
		</View>
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
	},
	partySomeDetailsContainer:{
		width:wp('100%'),
		flexDirection:'row',
		justifyContent:'space-between',
		alignSelf:'center',
		borderBottomWidth:1,
		borderBottomColor:'#D3D3D3',
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
	rightColumnValueStyle:{
		fontSize:15,
		fontWeight:'bold',
		color:'#00CF35',
		width:wp('13%'),
		textAlign:'center',
	}
});