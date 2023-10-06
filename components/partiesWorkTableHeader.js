import {memo} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

const PartiesWorkTableHeader = (props)=>{
	const transRef  = useSelector((state)=>state.transRef);
	return(
		<View style={styles.tableHeadingContainer}>
			<Text style={styles.headingTextStyle}>{transRef.t('partyName')}</Text>
			<Text style={styles.headingTextStyle}>{transRef.t('mobile')}</Text>
			<Text style={styles.headingTextStyle}>{transRef.t('amount')}</Text>
			<Text style={styles.headingTextStyle}>{transRef.t('workType')}</Text>
		</View>
	);
}

export default memo(PartiesWorkTableHeader);

const styles = StyleSheet.create({
	tableHeadingContainer:{
		width:wp('100%'),
		flexDirection:'row',
		alignItems:'center',
		borderWidth:0.9,
		borderColor:'#D1D1D1',
		justifyContent:'space-between',
		alignSelf:'center',
		marginTop:8,
	},
	headingTextStyle:{
		width:wp('25%'),
		paddingVertical:15,
		paddingHorizontal:3,
		borderLeftColor:'#d3d3d3',
		borderLeftWidth:1,
		textAlign:'center',
	},
});