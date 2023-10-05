import {memo} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';
import {useDispatch} from 'react-redux';
// import { markEmployeeAsStar} from '../redux/actions';

const PartyShortDetails = (props)=>{
	const dispatchRefrence = useDispatch()		// To send the data in store
	const {partySomeDetails, index}  = props;
	const onPressStar = (isStarEmployee, index)=>{
		dispatchRefrence(markEmployeeAsStar({
			isStarEmployee:isStarEmployee,
			index,
		}));
	}

	return(
		<View style={styles.employeeDetailsContainer}>
			<View style={partySomeDetails?.lastName ?styles.leftAvtarStyle :styles.oneCharacterLeftAvtar}>
				<Text>{partySomeDetails?.firstName?.charAt(0)}{partySomeDetails?.lastName?.charAt(0)}</Text>
			</View>
			<View style={styles.leftContainer}>
				<View style={styles.eployeeDetails}>
					<Text style={styles.eployeeNameStyle}>{partySomeDetails?.firstName} {partySomeDetails?.lastName}</Text>
					<Text>{partySomeDetails?.jobTitle}</Text>
				</View>
			</View>
			<Pressable
				onPressIn={(nativeEvent)=>onPressStar(partySomeDetails.isStarEmployee, index)}
			>
				<Entypo name={partySomeDetails.isStarEmployee === true ?'star' :"star-outlined"} size={45} color={partySomeDetails.isStarEmployee === true ?"#F5EC42" :"#808080"} />
			</Pressable>
		</View>
	);
}

export default memo(PartyShortDetails);

const styles = StyleSheet.create({
	leftAvtarStyle:{
		backgroundColor:'#B3B3B3',
		borderRadius:25,
		padding:15,
	},
	oneCharacterLeftAvtar:{
		backgroundColor:'#B3B3B3',
		borderRadius:25,
		paddingVertical:15,
		paddingHorizontal:20,
	},
	employeeDetailsContainer:{
		width:wp('97%'),
		flexDirection:'row',
		paddingVertical:10,
		paddingHorizontal:15,
		alignItems:'center',
		borderWidth:0.3,
		borderColor:'#D1D1D1',
		justifyContent:'space-between',
		alignSelf:'center',
		elevation:3,
		borderRadius:15,
		marginTop:10,
	},
	leftContainer:{
		flexDirection:'row',
		width:wp('65%'),
	},
	eployeeDetails:{
		marginLeft:10,
		paddingVertical:10,
	},
	eployeeNameStyle:{
		fontSize:20,
		fontWeight:'bold',
		color:'#00CF35',
		marginBottom:11,
		width:wp('62%'),
	}
});