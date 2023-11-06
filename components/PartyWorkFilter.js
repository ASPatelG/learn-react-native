import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	Modal
} from 'react-native';
import {memo, useState} from 'react';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import TextInputComponent from '../components/textInputComponent';

import {useSelector} from 'react-redux';
import ButtonComponent from './buttonComponent';
import { Entypo } from '@expo/vector-icons';
import {regularExpressionOnlyDigit} from '../staticDataFiles/constantValues';

const PartyWorkFilter = (props)=>{
	const {disablePress, onPressCross, RBSheetRef, filterData, onPressApply, isOpenFilterUI} = props;
	const [filterScreenData, setFilterScreenData] = useState({mobileNumber:filterData.mobileNumber ?? '', workType:filterData.workType ?? ""});
	const transRef  = useSelector((state)=>state.transRef);

	const disableButton = ()=>{
		if(filterScreenData.mobileNumber && filterScreenData?.mobileNumber?.length === 10){
			return false;
		}
		else{
			return true;
		}
	}

	const onChangeMobileNumber = (enteredText)=>{
		if(regularExpressionOnlyDigit.test(enteredText) || enteredText === ''){
			setFilterScreenData((previous)=>({
				...previous,
				mobileNumber:enteredText,
			}));
		}
		else{
			null
		}
	}

	const onChangWorkType = (enteredText)=>{
		setFilterScreenData((previous)=>({
			...previous,
			workType:enteredText,
		}));
	}

	const onClearFilter = ()=>{
		setFilterScreenData({
			mobileNumber:'',
			workType:'',
		});
	}

	return(
		<Modal//To Show Filter Options
			transparent={true}
			animationType="slide"
			onRequestClose={onPressCross}
			visible={isOpenFilterUI}
		><View style={styles.bottomSheetContainer}>
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
				<TextInputComponent
					showFieldLabel={true}
					fieldLabelText={transRef.t('enterMobilNumber')}
					value={filterScreenData.mobileNumber}
					onChangeText={onChangeMobileNumber}
					maxLength={10}
					isItRequired={true}
					inputBoxStyle={styles.inputBoxStyle}
					keyboardType={'number-pad'}
				/>
				<TextInputComponent
					showFieldLabel={true}
					fieldLabelText={transRef.t('workType')}
					value={filterScreenData.workType}
					onChangeText={onChangWorkType}
					maxLength={30}
					inputBoxStyle={styles.inputBoxStyle}
				/>
			</ScrollView>
			<View style={styles.RBSheetBottomView}>
				<TouchableOpacity
					onPress={props.clearAllFilterState}
					delayPressIn={0}
					opacity={disableButton() ?0.1 :null}
					disabled={disableButton()}
					onPressIn={onClearFilter}
				>
					<Text style={ disableButton() ?styles.disableClearAll :styles.enableClearAllText }>{transRef.t('clearAll')}</Text>
				</TouchableOpacity>
				<ButtonComponent
					title={transRef.t('apply')}
					disabledButtonStyle={styles.disabledButtonStyle}
					pressableButtonStyle={styles.pressableButtonStyle}
					disabled={disableButton()}
					onPressIn={(nativeEvent)=>onPressApply(filterScreenData)}
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
	bottomSheetContainer:{
		maxHeight:hp('45%'),
		position:'absolute',
		bottom:0,
		background:'transparent',
		width:wp('100%'),
		borderRadius:30,
		borderWidth:0.8,
		borderColor:'#808080',
		backgroundColor:'#FFFFFF',
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
	disableClearAll:{
		fontSize:20,
		fontWeight:'bold',
		width:wp('42%'),
		textAlign:'center',
		color:'#D3D3D3'
	},
	inputBoxStyle:{
		borderRadius:5,
		borderColor:'#D3D3D3',
		borderWidth:1,
		width:wp('90%'),
		alignSelf:'center',
		alignItems:'flex-start',
		marginTop:15,
	},
	pressableButtonStyle:{
		backgroundColor:'#175491',
		width:wp('48%'),
		paddingVertical:12,
		alignItems:'center',
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
		alignItems:'center',
		paddingVertical:5,
		paddingHorizontal:5,
		borderRadius:5,
		marginTop:10,
		alignSelf:'center',
	}
});