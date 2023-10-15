import React from 'react';
import { Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {useSelector} from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CommonGuiToApplyFilter = (props)=>{
	/*Use To:- to show applied filter text in tag form and clear icon
	*/
	const transRef  = useSelector((state)=>state.transRef);
	return(
		<TouchableOpacity
			style={styles.filterItemTouchableContainer}
			onPress={()=>props.onClearFilter()}
		>
			<Text
				style={styles.filterAppliedText}
			>{transRef.t('clearFilter')}</Text>
			<Entypo name="circle-with-cross" size={26} color="#5154B5" />
		</TouchableOpacity>
	)
}
export default CommonGuiToApplyFilter

const styles = StyleSheet.create({
	filterItemTouchableContainer:{
		flexDirection:'row',
		alignItems:'center',
		paddingLeft:5,
		paddingRight:5,
		marginRight:10,
		marginVertical:5,
		backgroundColor:'#f2f5f7',
		borderWidth:1,
		borderColor:'#f2f5f7',
		borderRadius:5,
		flexWrap:'wrap',
		justifyContent:'space-evenly',
		alignSelf:'center'
	},
	filterAppliedText:{
		color:'#5154B5',
		fontSize:16,
		fontWeight:'bold',
		paddingRight:5
	}
})