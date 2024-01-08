import {memo, useState, useEffect} from 'react';
import {StyleSheet, Pressable, Text, View, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';

import { getPartyWorkDetails } from '../sqliteDatabaseFunctionality/getData';
// import {selectWorkToPrint} from '../learnRedux/actions';

// import {confirmationAlert} from '../components/commonAlerts';

function PartyWorkHistory (props){
	const {partyId} = props;
    const [state, setState] = useState({workDetailsArray:[]});
	const getPartyWorks = async () => {
		let tablePartyWorks = await getPartyWorkDetails(partyId);
		setState(previous=>({...previous, workDetailsArray:tablePartyWorks}));
	}
	useEffect(() => {
		getPartyWorks();
		// To remove event on onmount
		return () => { }
	}, []);
    return(
        <View>
           <WorkDetailsTableHead/> 
            { state?.workDetailsArray?.length > 0
                ? state.workDetailsArray.map((item, index)=>(
                    <WorkShortDetails
						key={index}
                        workSomeDetails={item}
                        index={index}
                    />
                ))
                : null
            }
        </View>
    )

}
export default memo(PartyWorkHistory);

const WorkDetailsTableHead = (props)=>{
	const transRef  = useSelector((state)=>state.transRef);
	return(
		<View style={styles.tableHeadingContainer}>
			<Text style={styles.headingTextStyle}>{transRef.t('workType')}</Text>
			<Text style={styles.headingTextStyle}>{transRef.t('totalArea')}</Text>
			<Text style={styles.headingTextStyle}>{transRef.t('totalAmount')}</Text>
			<Text style={styles.headingTextStyle}>{transRef.t('actions')}</Text>
		</View>
	);
}

function WorkShortDetails(props){
	const {workSomeDetails} = props;
	const dispatchRefrence = useDispatch()		// To send the data in store
	const {partyId, index}  = props;
	const transRef  = useSelector((state)=>state.transRef);
	const [state, setState] = useState({reRenderFlag:null});

	onSelectWork = async ()=>{
		workSomeDetails["is_selected"] = !workSomeDetails?.is_selected;
		dispatchRefrence(selectWorkToPrint({partyData:workSomeDetails, activeIndex:index}));
		setState(previous=>({...previous, reRenderFlag:''}));//to rerender
	}

	return(
		<View
			key={index}
			style={workSomeDetails.is_selectedWork || workSomeDetails.is_selected == 1 ?styles.workSomeDetailsBackground :styles.workSomeDetailsContainer} 	// Since sqlite return 0/1 as boolean value
		>
			<View style={styles.leftColumnStyle}>
				<Text style={styles.partyNameStyle}>{workSomeDetails.work_type}</Text>
			</View>
			<View style={styles.columnStyle}>
				<Text style={styles.mobileNumberStyle}>{workSomeDetails.total_area}</Text>
			</View>
			<View style={styles.columnStyle}>
				<Text style={styles.mobileNumberStyle}>{workSomeDetails.amount}</Text>
			</View>
			<View style={styles.columnStyle}>
				<Pressable
					// onPressIn={(nativeEvent)=>onPress(partySomeDetails, index)}
					style={styles.rightContentStyle}
				>
					<AntDesign name="edit" size={22} color="#808080" />
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	tableHeadingContainer:{
		width:wp('97%'),
		flexDirection:'row',
		alignItems:'center',
		borderTopWidth:0.9,
		borderColor:'#D1D1D1',
		justifyContent:'space-between',
		alignSelf:'center',
		marginTop:8,
	},
	headingTextStyle:{
		width:wp('25%'),
		paddingVertical:15,
		paddingHorizontal:3,
		borderLeftColor:'#B3B3B3',
		borderLeftWidth:1,
		textAlign:'center',
		fontWeight:'bold',
		fontSize:15,
	},


	columnStyle:{
		paddingVertical:15,
		paddingHorizontal:3,
		width:wp('25.07%'),
		borderLeftWidth:1,
		borderLeftColor:'#B3B3B3',
		flexDirection:'row',
		alignItems:'center',
	},
	leftColumnStyle:{
		paddingVertical:15,
		paddingHorizontal:3,
		width:wp('25.07%'),
		flexDirection:'row',
		alignItems:'center',
	},
	workSomeDetailsContainer:{
		width:wp('96%'),
		flexDirection:'row',
		justifyContent:'space-between',
		alignSelf:'center',
		borderBottomWidth:1,
		borderBottomColor:'#D3D3D3',
	},
	workSomeDetailsBackground:{
		width:wp('96%'),
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