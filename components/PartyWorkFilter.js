import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	Modal
} from 'react-native';
import {memo} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import {useSelector} from 'react-redux';
import ButtonComponent from './buttonComponent';
import { Entypo } from '@expo/vector-icons';

const PartyWorkFilter = (props)=>{
	const {disablePress, onPressCross, RBSheetRef, filterData} = props;
	const transRef  = useSelector((state)=>state.transRef);
	return(
		<Modal//To Show Filter Options
			transparent={true}
			animationType="slide"
			onRequestClose={onPressCross}
			visible={filterData.isOpenFilterUI}
		><View style={{maxHeight:hp('45%'), position:'absolute', bottom:0, background:'transparent'}}>
			<ScrollView>
				<View style={styles.filterHeadingView}>
					<Text style={styles.filterTextStyle}>{transRef.t('filterBy')}</Text>
					<TouchableOpacity
						onPress={()=> onPressCross()}
						activeOpacity={0.1}
						delayPressIn={0}
					>
						<Entypo name="circle-with-cross" size={33} color="#b3b3b3" />
					</TouchableOpacity>
				</View>
				<View style={styles.filterInnerView}>
					<View style={styles.CustomerTypeMainView}>
						<View style={styles.groupHeadingView}>
							<Text style={styles.selectCustomerTypeStyle}>{transRef.t('selectCustomerType')}</Text>
						</View>
						<View 
							style={styles.customerTypeContainer}
						>
							
						</View>
					</View>
				</View>
			</ScrollView>
			<View style={styles.RBSheetBottomView}>
				<TouchableOpacity
					onPress={props.clearAllFilterState}
					delayPressIn={0}
					opacity={disablePress ?0.1 :null}
				>
					<Text style={ styles.enableClearAllText }>{transRef.t('clearAll')}</Text>
				</TouchableOpacity>
				<ButtonComponent
					title={transRef.t('apply')}
					disabledButtonStyle={styles.disabledButtonStyle}
					pressableButtonStyle={styles.pressableButtonStyle}
					// onPressIn={props.onPressAddWork}
				/>
			</View>
		</View></Modal>
	)
}

export default PartyWorkFilter;

const styles = StyleSheet.create({
	RBSheetScrollView:{
		borderTopLeftRadius:20,
		borderTopRightRadius:20,
		backgroundColor:'#EDF7F7',
	},
	filterHeadingView:{
		flexDirection:'row',
		justifyContent:'space-between',
		borderTopLeftRadius:30,
		borderTopRightRadius:30,
		backgroundColor:'#EDF7F7',
		paddingHorizontal:25,
		paddingVertical:15
	},
	filterTextStyle:{
		color: "#175491",
		fontSize: 16,
		fontWeight:'bold',
		marginTop:5
	},
	filterInnerView:{
		borderColor:'#EDF7F7',
		backgroundColor:'#FFFFFF',
		borderLeftWidth:10,
		borderRightWidth:10,
		borderBottomWidth:10,
		width:wp('100%'),
		borderRadius:15
	},
	RBSheetBottomView:{
		flexDirection:'row',
		justifyContent:'space-around',
		paddingVertical:8,
		alignItems:'center',
		paddingLeft:10,
		paddingRight:5,
		backgroundColor:'#FFFFFF'
	},
	enableClearAllText:{
		fontSize:20,
		fontWeight:'bold',
		width:wp('42%'),
		textAlign:'center',
		color:'#175491'
	},
	applyButtontTitle:{
		fontSize:20,
		fontWeight:'bold',
		marginTop:-5
	},
	pressableButtonStyle:{
		backgroundColor:'#175491',
		width:wp('48%'),
		paddingVertical:12,
		alignitems:'center',
		paddingVertical:5,
		paddingHorizontal:5,
		borderRadius:5,
		marginTop:10,
		alignSelf:'center',
	},
	disabledButtonStyle:{
		backgroundColor:'#D1D1D1',
		width:wp('48%'),
		paddingVertical:12,
		alignitems:'center',
		paddingVertical:5,
		paddingHorizontal:5,
		borderRadius:5,
		marginTop:10,
		alignSelf:'center',
	}
});