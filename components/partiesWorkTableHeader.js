import {memo} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import { Entypo } from '@expo/vector-icons';
import {useSelector} from 'react-redux';
// import { markEmployeeAsStar} from '../redux/actions';

const PartiesWorkTableHeader = (props)=>{
	const transRef  = useSelector((state)=>state.transRef);
	return(
		<View style={styles.employeeDetailsContainer}>
			<Text>{transRef.t('partyName')}</Text>
			<Text style={styles.eployeeNameStyle}>{transRef.t('mobile')}</Text>
			<Text>{transRef.t('amount')}</Text>
			<Text>{transRef.t('workType')}</Text>
		</View>
	);
}

export default memo(PartiesWorkTableHeader);

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